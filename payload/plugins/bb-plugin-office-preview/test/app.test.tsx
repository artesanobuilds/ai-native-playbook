import { describe, expect, it } from "vitest";
import { loadPluginApp } from "@get-bb/plugin-sdk/testing/app";

describe("plugin app registration", () => {
  it("registers one opener per Office family with the expected extensions", async () => {
    const captured = await loadPluginApp(() => import("../app"));
    const openers = captured.fileOpeners.map((opener) => [opener.id, [...opener.extensions]]);
    expect(openers).toEqual([
      ["docx", ["docx"]],
      ["pptx", ["pptx"]],
      ["spreadsheet", ["xlsx", "xlsm", "xls", "ods", "csv", "tsv"]],
    ]);
    // pdf stays with the bundled pdf-preview plugin; md stays with BB's preview.
    const claimed = new Set(captured.fileOpeners.flatMap((opener) => [...opener.extensions]));
    expect(claimed.has("pdf")).toBe(false);
    expect(claimed.has("md")).toBe(false);
  });
});
