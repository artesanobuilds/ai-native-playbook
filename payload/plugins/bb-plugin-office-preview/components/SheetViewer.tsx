import { useEffect, useState } from "react";
import type { PluginFileOpenerProps } from "@get-bb/plugin-sdk/app";
import { fileName } from "@/lib/file-source";
import { columnLabel, parseWorkbook, type SheetView } from "@/lib/sheet";
import { ErrorBox, Frame, Spinner, useParsedFile, useResolvedRequest } from "./shared";

const parse = async (bytes: ArrayBuffer) => parseWorkbook(bytes);

function Grid({ sheet }: { sheet: SheetView }) {
  if (sheet.rows.length === 0) {
    return <p className="p-4 text-sm text-muted-foreground">This sheet is empty.</p>;
  }
  const headers = Array.from({ length: sheet.columns }, (_, index) => columnLabel(index));
  return (
    <table className="office-grid text-xs">
      <thead>
        <tr>
          <th className="office-grid-corner" />
          {headers.map((label) => (
            <th key={label}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sheet.rows.map((row, r) => (
          <tr key={r}>
            <th className="office-grid-rownum">{r + 1}</th>
            {row.map((cell, c) => (
              <td key={c} title={cell.length > 60 ? cell : undefined}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function SheetViewer({ path, source, Original }: PluginFileOpenerProps) {
  const request = useResolvedRequest(path, source);
  const { state, retry } = useParsedFile(request, parse);
  const [active, setActive] = useState(0);
  useEffect(() => setActive(0), [path]);
  if (request === null) return <Original />;
  if (state.status === "loading") return <Spinner label={`Loading ${fileName(path)}…`} />;
  if (state.status === "error") return <ErrorBox title="Failed to open spreadsheet" message={state.message} onRetry={retry} />;
  const sheets = state.value;
  const sheet = sheets[Math.min(active, sheets.length - 1)];
  if (sheet === undefined) {
    return <ErrorBox title="Failed to open spreadsheet" message="The workbook has no sheets." onRetry={retry} />;
  }
  const note = sheet.truncated
    ? `showing first ${sheet.rows.length.toLocaleString()} of ${sheet.totalRows.toLocaleString()} rows`
    : `${sheet.totalRows.toLocaleString()} ${sheet.totalRows === 1 ? "row" : "rows"}`;
  return (
    <Frame name={fileName(path)} note={note}>
      <div className="flex h-full min-h-0 flex-col">
        {sheets.length > 1 ? (
          <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-border px-2 py-1" role="tablist">
            {sheets.map((candidate, index) => (
              <button
                key={candidate.name}
                type="button"
                role="tab"
                aria-selected={index === active}
                className={
                  index === active
                    ? "rounded-md bg-state-hover px-2 py-1 text-xs font-medium text-foreground"
                    : "rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-state-hover hover:text-foreground"
                }
                onClick={() => setActive(index)}
              >
                {candidate.name}
              </button>
            ))}
          </div>
        ) : null}
        <div className="min-h-0 flex-1 overflow-auto">
          <Grid sheet={sheet} />
        </div>
      </div>
    </Frame>
  );
}
