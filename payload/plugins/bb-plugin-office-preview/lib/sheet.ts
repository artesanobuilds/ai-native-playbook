// Spreadsheets (.xlsx, .xlsm, .xls, .ods, .csv, .tsv) → per-sheet string grids
// with SheetJS. Rows are capped so a huge sheet cannot freeze the panel.
import * as XLSX from "xlsx/xlsx.mjs";

export interface SheetView {
  name: string;
  /** Rows of already-formatted cell text. Ragged rows are padded to `columns`. */
  rows: string[][];
  columns: number;
  totalRows: number;
  truncated: boolean;
}

export const DEFAULT_MAX_ROWS = 1000;
export const DEFAULT_MAX_COLUMNS = 200;

export function parseWorkbook(
  bytes: ArrayBuffer,
  options: { maxRows?: number; maxColumns?: number } = {},
): SheetView[] {
  const maxRows = options.maxRows ?? DEFAULT_MAX_ROWS;
  const maxColumns = options.maxColumns ?? DEFAULT_MAX_COLUMNS;
  const workbook = XLSX.read(bytes, { type: "array", cellDates: false });
  return workbook.SheetNames.map((name) => {
    const sheet = workbook.Sheets[name];
    const grid = sheet
      ? (XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: "", blankrows: false }) as unknown[][])
      : [];
    const totalRows = grid.length;
    const visible = grid.slice(0, maxRows);
    const columns = Math.min(
      maxColumns,
      visible.reduce((width, row) => Math.max(width, row.length), 0),
    );
    const rows = visible.map((row) => {
      const cells: string[] = [];
      for (let i = 0; i < columns; i += 1) {
        const cell = row[i];
        cells.push(cell === undefined || cell === null ? "" : String(cell));
      }
      return cells;
    });
    return { name, rows, columns, totalRows, truncated: totalRows > maxRows };
  });
}

/** Excel-style column label: 0 → A, 25 → Z, 26 → AA. */
export function columnLabel(index: number): string {
  let label = "";
  let n = index;
  do {
    label = String.fromCharCode(65 + (n % 26)) + label;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return label;
}
