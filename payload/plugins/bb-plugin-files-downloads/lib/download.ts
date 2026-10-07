import type { ScopeRef } from './route';

export function downloadUrl(scope: ScopeRef, path: string): string {
  return `/api/v1/plugins/files-downloads/http/download?${new URLSearchParams({kind: scope.kind, id: scope.id, path})}`;
}

/** Attachment headers never interpolate raw user-controlled filenames. */
export function attachmentDisposition(filename: string): string {
  const clean = filename.replace(/[\x00-\x1f\x7f]/g, '_');
  const fallback = clean.replace(/[^a-zA-Z0-9._ -]/g, '_') || 'download';
  const encoded = encodeURIComponent(clean || 'download').replace(/['()*]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
  return `attachment; filename="${fallback}"; filename*=UTF-8''${encoded}`;
}
