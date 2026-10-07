# bb-plugin-office-preview

Preview Word, PowerPoint, and spreadsheet files inside BB's file panel.

| Extension | Viewer | How |
| --- | --- | --- |
| `docx` | Word preview | [mammoth](https://github.com/mwilliamson/mammoth.js) converts to HTML in the browser; output is sanitized (no scripts, handlers, or remote images). |
| `pptx` | PowerPoint preview | Walks each slide's shape tree with JSZip + DOMParser: titles, bullet text, tables, images, speaker notes. Content view, not a layout renderer. |
| `xlsx` `xlsm` `xls` `ods` `csv` `tsv` | Spreadsheet preview | [SheetJS](https://sheetjs.com) reads the workbook; one tab per sheet, Excel-style column labels, first 1,000 rows. |

PDF stays with BB's bundled `pdf-preview` plugin and Markdown stays with BB's built-in preview, so those extensions are not claimed here.

Files are fetched through BB's own authenticated file endpoints (the same ones `pdf-preview` uses), so workspace, host, and thread-storage files all work, including workspaces on another machine. There is no server-side code.

## Develop

```
npm install --include=dev
npm test                 # vitest: parsers, sanitizer, endpoint resolution, registration
npm run typecheck
BB_DATA_DIR=~/Coding/AI-native/bb/data bb plugin build
BB_DATA_DIR=~/Coding/AI-native/bb/data bb plugin install .    # first time
bb plugin reload office-preview                               # after a rebuild
```

`BB_DATA_DIR` keeps the build toolchain under the repo's `bb/data` instead of `~/.bb`.

Regenerate the manual-check files in `samples/` with:

```
node --experimental-strip-types scripts/make-samples.mts
```

Then `bb thread open samples/sample.pptx` from inside a BB thread.

## Layout

- `app.tsx` registers the three `fileOpener` slots.
- `components/` the viewers and the shared fetch-and-parse hook.
- `lib/file-source.ts` resolves the BB endpoint for a file and fetches bytes.
- `lib/docx.ts`, `lib/pptx.ts`, `lib/sheet.ts` parsers; `lib/sanitize.ts` HTML sanitizer.
- `styles.css` document and grid styling built on host theme variables.
- `test/` fixtures are generated in memory, no binary files checked in.
