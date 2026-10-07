import { beforeAll, describe, expect, it, vi } from "vitest";
import { docxToHtml } from "../lib/docx";
import { parsePptx, resolveZipPath } from "../lib/pptx";
import { sanitizeHtml } from "../lib/sanitize";
import { columnLabel, parseWorkbook } from "../lib/sheet";
import { makeCsv, makeDocx, makePptx, makeXlsx } from "./fixtures";

beforeAll(() => {
  // jsdom has no object URLs; the pptx parser only needs them to be strings.
  let counter = 0;
  vi.stubGlobal("URL", Object.assign(URL, {
    createObjectURL: vi.fn(() => `blob:test/${counter++}`),
    revokeObjectURL: vi.fn(),
  }));
});

describe("docx", () => {
  it("converts headings and runs and escapes embedded markup", async () => {
    const { html, warnings } = await docxToHtml(await makeDocx());
    expect(html).toContain("<h1>Quarterly plan</h1>");
    expect(html).toContain("Hello <strong>world</strong>");
    expect(html).not.toContain("<script");
    expect(html).toContain("&lt;script&gt;");
    // The fixture has no styles.xml, so mammoth reports the undefined style; warnings must surface.
    expect(warnings).toEqual(["Paragraph style with ID Heading1 was referenced but not defined in the document"]);
  });
});

describe("sanitizeHtml", () => {
  it("drops scripts, handlers and unsafe URLs but keeps data images", () => {
    const html = sanitizeHtml(
      `<p onclick="x()">hi</p><script>bad()</script><a href="javascript:1">j</a><a href="https://a.b">ok</a><img src="data:image/png;base64,AAAA"><img src="https://evil/x.png">`,
    );
    expect(html).not.toContain("script");
    expect(html).not.toContain("onclick");
    expect(html).not.toContain("javascript:");
    expect(html).toContain('href="https://a.b"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('src="data:image/png;base64,AAAA"');
    expect(html).not.toContain("evil");
  });
});

describe("pptx", () => {
  it("keeps slide order from presentation.xml and extracts blocks and notes", async () => {
    const { slides, revoke } = await parsePptx(await makePptx());
    expect(slides.map((slide) => slide.number)).toEqual([1, 2]);
    const [first, second] = slides;
    expect(first.blocks).toEqual([
      { kind: "title", text: "Welcome" },
      { kind: "paragraphs", lines: ["First point", "Second point"] },
      { kind: "image", url: "blob:test/0", name: "image1.png" },
    ]);
    expect(first.notes).toEqual(["Remember to smile"]);
    expect(second.blocks).toEqual([
      { kind: "table", rows: [["Name", "Qty"], ["Apples", "3"]] },
      { kind: "paragraphs", lines: ["Grouped text"] },
    ]);
    expect(second.notes).toEqual([]);
    revoke();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:test/0");
  });

  it("rejects archives that are not presentations", async () => {
    await expect(parsePptx(await makeDocx())).rejects.toThrow(/presentation\.xml/u);
  });

  it("resolves relationship targets relative to the part", () => {
    expect(resolveZipPath("ppt/slides/slide1.xml", "../media/image1.png")).toBe("ppt/media/image1.png");
    expect(resolveZipPath("ppt/presentation.xml", "slides/slide1.xml")).toBe("ppt/slides/slide1.xml");
    expect(resolveZipPath("ppt/slides/slide1.xml", "/ppt/media/x.png")).toBe("ppt/media/x.png");
  });
});

describe("spreadsheets", () => {
  it("reads every sheet of an xlsx as formatted text", () => {
    const sheets = parseWorkbook(makeXlsx(2));
    expect(sheets.map((sheet) => sheet.name)).toEqual(["Inventory", "Notes"]);
    expect(sheets[0].rows).toEqual([["Name", "Qty"], ["Item 1", "10"], ["Item 2", "20"]]);
    expect(sheets[0].columns).toBe(2);
    expect(sheets[0].truncated).toBe(false);
    expect(sheets[1].rows).toEqual([["only"]]);
  });

  it("caps rows and reports the real total", () => {
    const [sheet] = parseWorkbook(makeXlsx(50), { maxRows: 10 });
    expect(sheet.rows).toHaveLength(10);
    expect(sheet.totalRows).toBe(51);
    expect(sheet.truncated).toBe(true);
  });

  it("reads csv text and pads ragged rows", () => {
    const [sheet] = parseWorkbook(makeCsv("a,b,c\n1,2\n"));
    expect(sheet.rows).toEqual([["a", "b", "c"], ["1", "2", ""]]);
  });

  it("labels columns like Excel", () => {
    expect([0, 25, 26, 27, 701, 702].map(columnLabel)).toEqual(["A", "Z", "AA", "AB", "ZZ", "AAA"]);
  });
});
