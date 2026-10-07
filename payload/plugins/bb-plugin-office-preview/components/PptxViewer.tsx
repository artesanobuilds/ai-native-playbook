import type { PluginFileOpenerProps } from "@get-bb/plugin-sdk/app";
import { fileName } from "@/lib/file-source";
import { parsePptx, type PptxResult, type Slide, type SlideBlock } from "@/lib/pptx";
import { ErrorBox, Frame, Spinner, useParsedFile, useResolvedRequest } from "./shared";

function Block({ block }: { block: SlideBlock }) {
  switch (block.kind) {
    case "title":
      return <h2 className="text-lg font-semibold leading-snug text-foreground">{block.text}</h2>;
    case "paragraphs":
      return (
        <ul className="space-y-1 text-sm text-foreground">
          {block.lines.map((line, index) => (
            <li key={index} className="whitespace-pre-wrap">
              {line}
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="office-table text-sm">
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td key={c} className="whitespace-pre-wrap">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "image":
      return <img src={block.url} alt={block.name} className="max-h-96 max-w-full rounded-md border border-border" />;
  }
}

function SlideCard({ slide }: { slide: Slide }) {
  return (
    <section className="rounded-lg border border-border bg-card p-5" aria-label={`Slide ${slide.number}`}>
      <div className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">Slide {slide.number}</div>
      {slide.blocks.length === 0 ? (
        <p className="text-sm text-muted-foreground">No text or images on this slide.</p>
      ) : (
        <div className="space-y-3">
          {slide.blocks.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div>
      )}
      {slide.notes.length > 0 ? (
        <div className="mt-4 border-t border-border pt-3">
          <div className="mb-1 text-xs font-medium text-muted-foreground">Speaker notes</div>
          <div className="space-y-1 text-sm text-muted-foreground">
            {slide.notes.map((line, index) => (
              <p key={index} className="whitespace-pre-wrap">
                {line}
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

const revoke = (result: PptxResult) => result.revoke();

export function PptxViewer({ path, source, Original }: PluginFileOpenerProps) {
  const request = useResolvedRequest(path, source);
  const { state, retry } = useParsedFile(request, parsePptx, revoke);
  if (request === null) return <Original />;
  if (state.status === "loading") return <Spinner label={`Loading ${fileName(path)}…`} />;
  if (state.status === "error") return <ErrorBox title="Failed to open presentation" message={state.message} onRetry={retry} />;
  const { slides } = state.value;
  return (
    <Frame name={fileName(path)} note={`${slides.length} ${slides.length === 1 ? "slide" : "slides"} · content view, layout not preserved`}>
      <div className="mx-auto w-full max-w-3xl space-y-4 px-4 py-4">
        {slides.map((slide) => (
          <SlideCard key={slide.number} slide={slide} />
        ))}
      </div>
    </Frame>
  );
}
