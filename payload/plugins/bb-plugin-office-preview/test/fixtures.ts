// In-memory Office fixtures built with JSZip / SheetJS so tests need no
// binary files checked in.
import JSZip from "jszip";
import * as XLSX from "xlsx";

const CONTENT_TYPES = (parts: string) => `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Default Extension="png" ContentType="image/png"/>
  ${parts}
</Types>`;

export async function makeDocx(): Promise<ArrayBuffer> {
  const zip = new JSZip();
  zip.file(
    "[Content_Types].xml",
    CONTENT_TYPES(
      `<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>`,
    ),
  );
  zip.file(
    "_rels/.rels",
    `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`,
  );
  zip.file(
    "word/document.xml",
    `<?xml version="1.0" encoding="UTF-8"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p><w:pPr><w:pStyle w:val="Heading1"/></w:pPr><w:r><w:t>Quarterly plan</w:t></w:r></w:p>
    <w:p><w:r><w:t>Hello </w:t></w:r><w:r><w:rPr><w:b/></w:rPr><w:t>world</w:t></w:r></w:p>
    <w:p><w:r><w:t>&lt;script&gt;alert(1)&lt;/script&gt;</w:t></w:r></w:p>
  </w:body>
</w:document>`,
  );
  return zip.generateAsync({ type: "arraybuffer" });
}

const PNG_1x1 = Uint8Array.from(
  atob("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="),
  (c) => c.charCodeAt(0),
);

const P_NS = `xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"`;

function slideXml(body: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?><p:sld ${P_NS}><p:cSld><p:spTree>${body}</p:spTree></p:cSld></p:sld>`;
}

function shape(text: string[], placeholder?: string): string {
  const ph = placeholder ? `<p:nvPr><p:ph type="${placeholder}"/></p:nvPr>` : `<p:nvPr/>`;
  const paragraphs = text.map((line) => `<a:p><a:r><a:t>${line}</a:t></a:r></a:p>`).join("");
  return `<p:sp><p:nvSpPr><p:cNvPr id="1" name="s"/><p:cNvSpPr/>${ph}</p:nvSpPr><p:txBody><a:bodyPr/>${paragraphs}</p:txBody></p:sp>`;
}

export async function makePptx(): Promise<ArrayBuffer> {
  const zip = new JSZip();
  zip.file(
    "[Content_Types].xml",
    CONTENT_TYPES(
      `<Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>`,
    ),
  );
  zip.file(
    "ppt/presentation.xml",
    `<?xml version="1.0" encoding="UTF-8"?><p:presentation ${P_NS}><p:sldIdLst><p:sldId id="256" r:id="rId3"/><p:sldId id="257" r:id="rId2"/></p:sldIdLst></p:presentation>`,
  );
  zip.file(
    "ppt/_rels/presentation.xml.rels",
    `<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide2.xml"/>
<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide1.xml"/>
</Relationships>`,
  );
  // Slide 1: title + two bullets + a picture + a slide number placeholder (ignored) + notes.
  zip.file(
    "ppt/slides/slide1.xml",
    slideXml(
      shape(["Welcome"], "ctrTitle") +
        shape(["First point", "Second point"]) +
        `<p:pic><p:nvPicPr><p:cNvPr id="4" name="Picture"/><p:cNvPicPr/><p:nvPr/></p:nvPicPr><p:blipFill><a:blip r:embed="rId2"/></p:blipFill><p:spPr/></p:pic>` +
        shape(["7"], "sldNum"),
    ),
  );
  zip.file(
    "ppt/slides/_rels/slide1.xml.rels",
    `<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image1.png"/>
<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesSlide" Target="../notesSlides/notesSlide1.xml"/>
</Relationships>`,
  );
  zip.file("ppt/media/image1.png", PNG_1x1);
  zip.file(
    "ppt/notesSlides/notesSlide1.xml",
    `<?xml version="1.0" encoding="UTF-8"?><p:notes ${P_NS}><p:cSld><p:spTree>${shape(["Remember to smile"], "body")}${shape(["1"], "sldNum")}</p:spTree></p:cSld></p:notes>`,
  );
  // Slide 2: a table inside a graphicFrame, plus a group with nested text.
  zip.file(
    "ppt/slides/slide2.xml",
    slideXml(
      `<p:graphicFrame><p:nvGraphicFramePr><p:cNvPr id="5" name="Table"/><p:cNvGraphicFramePr/><p:nvPr/></p:nvGraphicFramePr><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/table"><a:tbl>` +
        `<a:tr><a:tc><a:txBody><a:p><a:r><a:t>Name</a:t></a:r></a:p></a:txBody></a:tc><a:tc><a:txBody><a:p><a:r><a:t>Qty</a:t></a:r></a:p></a:txBody></a:tc></a:tr>` +
        `<a:tr><a:tc><a:txBody><a:p><a:r><a:t>Apples</a:t></a:r></a:p></a:txBody></a:tc><a:tc><a:txBody><a:p><a:r><a:t>3</a:t></a:r></a:p></a:txBody></a:tc></a:tr>` +
        `</a:tbl></a:graphicData></a:graphic></p:graphicFrame>` +
        `<p:grpSp><p:nvGrpSpPr><p:cNvPr id="6" name="g"/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>${shape(["Grouped text"])}</p:grpSp>`,
    ),
  );
  return zip.generateAsync({ type: "arraybuffer" });
}

export function makeXlsx(rows = 3): ArrayBuffer {
  const workbook = XLSX.utils.book_new();
  const data: (string | number)[][] = [["Name", "Qty"]];
  for (let i = 1; i <= rows; i += 1) data.push([`Item ${i}`, i * 10]);
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(data), "Inventory");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([["only"]]), "Notes");
  const out = XLSX.write(workbook, { type: "array", bookType: "xlsx" }) as ArrayBuffer;
  return out;
}

export function makeCsv(text: string): ArrayBuffer {
  const bytes = new TextEncoder().encode(text);
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}
