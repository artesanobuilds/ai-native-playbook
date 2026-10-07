// Word (.docx) → HTML with mammoth, then sanitized.
import mammoth from "mammoth/mammoth.browser.js";
import { sanitizeHtml } from "./sanitize";

export interface DocxResult {
  html: string;
  /** Conversion warnings mammoth reported (unsupported styles, etc.). */
  warnings: string[];
}

export async function docxToHtml(bytes: ArrayBuffer): Promise<DocxResult> {
  const result = await mammoth.convertToHtml(
    { arrayBuffer: bytes },
    {
      styleMap: [
        "p[style-name='Title'] => h1.doc-title:fresh",
        "p[style-name='Subtitle'] => p.doc-subtitle:fresh",
        "p[style-name='Quote'] => blockquote:fresh",
        "p[style-name='Intense Quote'] => blockquote:fresh",
      ],
    },
  );
  const warnings = result.messages
    .filter((message) => message.type === "warning" || message.type === "error")
    .map((message) => message.message);
  return { html: sanitizeHtml(result.value), warnings };
}
