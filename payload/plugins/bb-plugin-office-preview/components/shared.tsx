import { useEffect, useMemo, useState, type ReactNode } from "react";
import { fetchFileBytes, resolveFileRequest, type FileRequest, type FileSource } from "@/lib/file-source";

export type LoadState<T> =
  | { status: "loading" }
  | { status: "ready"; value: T }
  | { status: "error"; message: string };

export function useResolvedRequest(path: string, source: FileSource): FileRequest | null {
  return useMemo(
    () => resolveFileRequest(path, source),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [path, source.kind, source.threadId, source.environmentId, source.projectId, source.experimental_hostId],
  );
}

/**
 * Fetch the file's bytes and run `parse` on them. `attempt` re-runs the whole
 * pipeline (the Retry button). `dispose` releases parser-owned resources such
 * as object URLs when the value is replaced or the component unmounts.
 */
export function useParsedFile<T>(
  request: FileRequest | null,
  parse: (bytes: ArrayBuffer) => Promise<T>,
  dispose?: (value: T) => void,
): { state: LoadState<T>; retry: () => void } {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<LoadState<T>>({ status: "loading" });
  useEffect(() => {
    if (request === null) return;
    const controller = new AbortController();
    let produced: T | null = null;
    setState({ status: "loading" });
    fetchFileBytes(request, controller.signal)
      .then(parse)
      .then((value) => {
        if (controller.signal.aborted) {
          dispose?.(value);
          return;
        }
        produced = value;
        setState({ status: "ready", value });
      })
      .catch((cause: unknown) => {
        if (controller.signal.aborted) return;
        setState({ status: "error", message: cause instanceof Error ? cause.message : String(cause) });
      });
    return () => {
      controller.abort();
      if (produced !== null) dispose?.(produced);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request, attempt]);
  return { state, retry: () => setAttempt((n) => n + 1) };
}

export function Spinner({ label }: { label: string }) {
  return (
    <div
      className="flex h-full min-h-0 items-center justify-center gap-2 text-sm text-muted-foreground"
      role="status"
      aria-label={label}
    >
      <span className="size-4 animate-spin rounded-full border-2 border-border border-t-foreground" />
      {label}
    </div>
  );
}

export function ErrorBox({ title, message, onRetry }: { title: string; message: string; onRetry: () => void }) {
  return (
    <div className="flex h-full min-h-0 items-center justify-center p-6">
      <div className="max-w-md space-y-3 text-center" role="alert">
        <p className="text-sm text-destructive">
          {title}: {message}
        </p>
        <button
          type="button"
          className="inline-flex h-8 items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground hover:bg-state-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          onClick={onRetry}
        >
          Retry
        </button>
      </div>
    </div>
  );
}

/** Scrolling frame with a slim header line (file name + a note on fidelity). */
export function Frame({ name, note, children }: { name: string; note?: string; children: ReactNode }) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <div className="flex shrink-0 items-center gap-3 border-b border-border px-4 py-1.5 text-xs text-muted-foreground">
        <span className="truncate font-medium text-foreground">{name}</span>
        {note ? <span className="truncate">{note}</span> : null}
      </div>
      <div className="min-h-0 flex-1 overflow-auto">{children}</div>
    </div>
  );
}

export function Warnings({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  const unique = Array.from(new Set(items));
  return (
    <details className="mx-4 mb-3 rounded-md border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
      <summary className="cursor-pointer">
        {unique.length} conversion {unique.length === 1 ? "warning" : "warnings"}
      </summary>
      <ul className="mt-2 list-disc space-y-1 pl-4">
        {unique.slice(0, 20).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </details>
  );
}
