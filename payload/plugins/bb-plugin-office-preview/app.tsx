// bb-plugin-office-preview — frontend entry.
//
// Registers file openers for Office documents so that clicking a .docx,
// .pptx, or spreadsheet link in a thread (or picking it in the file picker)
// renders a readable preview in the right panel instead of raw bytes.
import { definePluginApp } from "@get-bb/plugin-sdk/app";
import { DocxViewer } from "@/components/DocxViewer";
import { PptxViewer } from "@/components/PptxViewer";
import { SheetViewer } from "@/components/SheetViewer";
import "./styles.css";

export const SPREADSHEET_EXTENSIONS = ["xlsx", "xlsm", "xls", "ods", "csv", "tsv"] as const;

export default definePluginApp((app) => {
  app.slots.fileOpener({
    id: "docx",
    title: "Word preview",
    extensions: ["docx"],
    component: DocxViewer,
  });
  app.slots.fileOpener({
    id: "pptx",
    title: "PowerPoint preview",
    extensions: ["pptx"],
    component: PptxViewer,
  });
  app.slots.fileOpener({
    id: "spreadsheet",
    title: "Spreadsheet preview",
    extensions: SPREADSHEET_EXTENSIONS,
    component: SheetViewer,
  });
});
