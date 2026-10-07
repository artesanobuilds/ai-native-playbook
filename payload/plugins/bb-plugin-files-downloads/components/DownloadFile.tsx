import { useEffect, useRef, useState } from 'react';
import type { PluginFileOpenerProps } from '@get-bb/plugin-sdk/app';
import { fetchFileBytes, fileName, resolveFileRequest } from '../lib/file-source';

export function DownloadFile({path, source, Original}: PluginFileOpenerProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const active = useRef<AbortController | null>(null);
  useEffect(() => () => active.current?.abort(), [path, source]);
  const request = resolveFileRequest(path, source);
  if (!request) return <Original />;
  async function download() {
    if (!request || active.current) return;
    const controller = new AbortController();
    active.current = controller;
    setBusy(true); setError(null);
    try {
      const bytes = await fetchFileBytes(request, controller.signal);
      if (controller.signal.aborted) return;
      const url = URL.createObjectURL(new Blob([bytes], { type: 'application/octet-stream' }));
      const link = document.createElement('a');
      link.href = url; link.download = fileName(path);
      document.body.appendChild(link); link.click(); link.remove();
      // Give the browser time to begin consuming the blob before releasing it.
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (e) {
      if (!controller.signal.aborted) setError(e instanceof Error ? e.message : 'Download failed.');
    } finally { active.current = null; setBusy(false); }
  }
  return <div className="flex flex-col items-start gap-3 p-6 text-sm">
    <p className="font-medium">{fileName(path)}</p>
    <p className="text-muted-foreground">Download this file to your computer.</p>
    <button type="button" disabled={busy} onClick={() => void download()} className="rounded border border-border px-3 py-2 hover:bg-accent disabled:opacity-50">{busy ? 'Preparing download…' : 'Download file'}</button>
    {error && <p role="alert">{error}</p>}
  </div>;
}
