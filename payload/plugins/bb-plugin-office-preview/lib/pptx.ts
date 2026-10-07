// PowerPoint (.pptx) → ordered slides of text blocks, tables, and images.
// This is a content view, not a layout renderer: it walks each slide's shape
// tree in document order and pulls out what a reader needs.
import JSZip from "jszip/dist/jszip.min.js";

const NS = {
  a: "http://schemas.openxmlformats.org/drawingml/2006/main",
  p: "http://schemas.openxmlformats.org/presentationml/2006/main",
  r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
  rels: "http://schemas.openxmlformats.org/package/2006/relationships",
} as const;

export type SlideBlock =
  | { kind: "title"; text: string }
  | { kind: "paragraphs"; lines: string[] }
  | { kind: "table"; rows: string[][] }
  | { kind: "image"; url: string; name: string };

export interface Slide {
  number: number;
  blocks: SlideBlock[];
  notes: string[];
}

export interface PptxResult {
  slides: Slide[];
  /** Release the object URLs created for slide images. */
  revoke(): void;
}

const IMAGE_MIME: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  bmp: "image/bmp",
  svg: "image/svg+xml",
  webp: "image/webp",
  tif: "image/tiff",
  tiff: "image/tiff",
  emf: "image/emf",
  wmf: "image/wmf",
};

function parseXml(text: string): Document {
  const doc = new DOMParser().parseFromString(text, "application/xml");
  if (doc.getElementsByTagName("parsererror").length > 0) {
    throw new Error("The presentation contains malformed XML.");
  }
  return doc;
}

/** Resolve `target` (a relationship Target) against the directory of `from`. */
export function resolveZipPath(from: string, target: string): string {
  if (target.startsWith("/")) return target.slice(1);
  const base = from.split("/").slice(0, -1);
  for (const segment of target.split("/")) {
    if (segment === "..") base.pop();
    else if (segment !== "." && segment !== "") base.push(segment);
  }
  return base.join("/");
}

async function readRels(zip: JSZip, partPath: string): Promise<Map<string, { target: string; type: string }>> {
  const dir = partPath.split("/").slice(0, -1).join("/");
  const name = partPath.split("/").pop() ?? "";
  const relsPath = `${dir}/_rels/${name}.rels`;
  const file = zip.file(relsPath);
  const rels = new Map<string, { target: string; type: string }>();
  if (file === null) return rels;
  const doc = parseXml(await file.async("string"));
  for (const rel of Array.from(doc.getElementsByTagNameNS(NS.rels, "Relationship"))) {
    const id = rel.getAttribute("Id");
    const target = rel.getAttribute("Target");
    const type = rel.getAttribute("Type") ?? "";
    if (id !== null && target !== null) rels.set(id, { target: resolveZipPath(partPath, target), type });
  }
  return rels;
}

function paragraphText(paragraph: Element): string {
  let text = "";
  for (const child of Array.from(paragraph.childNodes)) {
    if (child.nodeType !== Node.ELEMENT_NODE) continue;
    const element = child as Element;
    if (element.namespaceURI !== NS.a) continue;
    if (element.localName === "br") text += "\n";
    else if (element.localName === "r" || element.localName === "fld") {
      for (const t of Array.from(element.getElementsByTagNameNS(NS.a, "t"))) text += t.textContent ?? "";
    }
  }
  return text;
}

function textBodyLines(container: Element): string[] {
  const body = Array.from(container.children).find(
    (child) => child.namespaceURI === NS.p && child.localName === "txBody",
  );
  if (body === undefined) return [];
  return Array.from(body.getElementsByTagNameNS(NS.a, "p"))
    .map(paragraphText)
    .map((line) => line.replace(/\s+$/u, ""))
    .filter((line) => line.trim() !== "");
}

function placeholderType(shape: Element): string | null {
  const ph = shape.getElementsByTagNameNS(NS.p, "ph")[0];
  return ph === undefined ? null : ph.getAttribute("type") ?? "body";
}

function tableRows(frame: Element): string[][] | null {
  const table = frame.getElementsByTagNameNS(NS.a, "tbl")[0];
  if (table === undefined) return null;
  return Array.from(table.getElementsByTagNameNS(NS.a, "tr")).map((row) =>
    Array.from(row.getElementsByTagNameNS(NS.a, "tc")).map((cell) =>
      Array.from(cell.getElementsByTagNameNS(NS.a, "p")).map(paragraphText).join("\n").trim(),
    ),
  );
}

interface WalkContext {
  zip: JSZip;
  rels: Map<string, { target: string; type: string }>;
  urls: string[];
  blocks: SlideBlock[];
}

async function walkShapes(parent: Element, ctx: WalkContext): Promise<void> {
  for (const child of Array.from(parent.children)) {
    if (child.namespaceURI !== NS.p) continue;
    switch (child.localName) {
      case "sp": {
        const lines = textBodyLines(child);
        if (lines.length === 0) break;
        const type = placeholderType(child);
        if (type === "title" || type === "ctrTitle") ctx.blocks.push({ kind: "title", text: lines.join(" ") });
        else if (type === "sldNum" || type === "ftr" || type === "dt") break;
        else ctx.blocks.push({ kind: "paragraphs", lines });
        break;
      }
      case "graphicFrame": {
        const rows = tableRows(child);
        if (rows !== null && rows.length > 0) ctx.blocks.push({ kind: "table", rows });
        break;
      }
      case "pic": {
        const blip = child.getElementsByTagNameNS(NS.a, "blip")[0];
        const relId = blip?.getAttributeNS(NS.r, "embed");
        const rel = relId ? ctx.rels.get(relId) : undefined;
        const file = rel ? ctx.zip.file(rel.target) : null;
        if (!rel || file === null) break;
        const extension = rel.target.split(".").pop()?.toLowerCase() ?? "";
        const mime = IMAGE_MIME[extension];
        if (mime === undefined) break;
        const blob = new Blob([await file.async("arraybuffer")], { type: mime });
        const url = URL.createObjectURL(blob);
        ctx.urls.push(url);
        ctx.blocks.push({ kind: "image", url, name: rel.target.split("/").pop() ?? rel.target });
        break;
      }
      case "grpSp":
        await walkShapes(child, ctx);
        break;
      default:
        break;
    }
  }
}

async function readNotes(zip: JSZip, rels: Map<string, { target: string; type: string }>): Promise<string[]> {
  const notesRel = Array.from(rels.values()).find((rel) => rel.type.endsWith("/notesSlide"));
  const file = notesRel ? zip.file(notesRel.target) : null;
  if (!notesRel || file === null) return [];
  const doc = parseXml(await file.async("string"));
  const lines: string[] = [];
  for (const shape of Array.from(doc.getElementsByTagNameNS(NS.p, "sp"))) {
    const type = placeholderType(shape);
    if (type === "sldNum" || type === "sldImg" || type === "hdr" || type === "ftr" || type === "dt") continue;
    lines.push(...textBodyLines(shape));
  }
  return lines;
}

export async function parsePptx(bytes: ArrayBuffer): Promise<PptxResult> {
  const zip = await JSZip.loadAsync(bytes);
  const presentationPath = "ppt/presentation.xml";
  const presentationFile = zip.file(presentationPath);
  if (presentationFile === null) throw new Error("Not a PowerPoint file: ppt/presentation.xml is missing.");
  const presentation = parseXml(await presentationFile.async("string"));
  const presentationRels = await readRels(zip, presentationPath);
  const slidePaths = Array.from(presentation.getElementsByTagNameNS(NS.p, "sldId"))
    .map((sldId) => sldId.getAttributeNS(NS.r, "id"))
    .map((relId) => (relId === null ? undefined : presentationRels.get(relId)?.target))
    .filter((path): path is string => path !== undefined);

  const urls: string[] = [];
  const slides: Slide[] = [];
  for (const [index, slidePath] of slidePaths.entries()) {
    const file = zip.file(slidePath);
    if (file === null) continue;
    const doc = parseXml(await file.async("string"));
    const rels = await readRels(zip, slidePath);
    const spTree = doc.getElementsByTagNameNS(NS.p, "spTree")[0];
    const ctx: WalkContext = { zip, rels, urls, blocks: [] };
    if (spTree !== undefined) await walkShapes(spTree, ctx);
    slides.push({ number: index + 1, blocks: ctx.blocks, notes: await readNotes(zip, rels) });
  }
  return {
    slides,
    revoke: () => {
      for (const url of urls) URL.revokeObjectURL(url);
    },
  };
}
