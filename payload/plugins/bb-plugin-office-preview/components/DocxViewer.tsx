import type { PluginFileOpenerProps } from "@get-bb/plugin-sdk/app";
import { docxToHtml } from "@/lib/docx";
import { fileName } from "@/lib/file-source";
import { ErrorBox, Frame, Spinner, Warnings, useParsedFile, useResolvedRequest } from "./shared";

export function DocxViewer({ path, source, Original }: PluginFileOpenerProps) {
  const request = useResolvedRequest(path, source);
  const { state, retry } = useParsedFile(request, docxToHtml);
  if (request === null) return <Original />;
  if (state.status === "loading") return <Spinner label={`Loading ${fileName(path)}…`} />;
  if (state.status === "error") return <ErrorBox title="Failed to open Word document" message={state.message} onRetry={retry} />;
  return (
    <Frame name={fileName(path)} note="Word document · text, headings, lists, tables and images">
      <Warnings items={state.value.warnings} />
      <article
        className="office-doc mx-auto w-full max-w-3xl px-6 py-6"
        // Sanitized in lib/sanitize.ts: no scripts, handlers, or non-image URLs survive.
        dangerouslySetInnerHTML={{ __html: state.value.html }}
      />
    </Frame>
  );
}
