// Resolve where a fileOpener file lives and fetch its raw bytes through BB's
// authenticated file endpoints. Mirrors the bundled pdf-preview plugin so
// workspace, host, and thread-storage files all work, locally and remotely.
import type { PluginFileOpenerProps } from "@get-bb/plugin-sdk/app";

export type FileSource = PluginFileOpenerProps["source"];

export type FileRequest =
  | { kind: "raw"; url: string }
  | { kind: "workspace-json"; url: string };

function encodePath(path: string): string {
  return path.split("/").map(encodeURIComponent).join("/");
}

function withQuery(url: string, params: Record<string, string>): string {
  return `${url}?${new URLSearchParams(params).toString()}`;
}

/** Null means BB has no live endpoint for this source (delegate to Original). */
export function resolveFileRequest(path: string, source: FileSource): FileRequest | null {
  switch (source.kind) {
    case "workspace":
      if (source.threadId !== null) {
        return {
          kind: "raw",
          url: `/api/v1/threads/${encodeURIComponent(source.threadId)}/worktree/files/${encodePath(path)}`,
        };
      }
      if (source.environmentId !== null) {
        return {
          kind: "workspace-json",
          url: withQuery(
            `/api/v1/environments/${encodeURIComponent(source.environmentId)}/diff/file`,
            { target: "uncommitted", path, side: "new" },
          ),
        };
      }
      if (source.projectId !== null) {
        return {
          kind: "raw",
          url: withQuery(`/api/v1/projects/${encodeURIComponent(source.projectId)}/files/content`, {
            path,
            ...(source.experimental_hostId ? { hostId: source.experimental_hostId } : {}),
          }),
        };
      }
      return null;
    case "host":
      if (source.threadId === null) return null;
      return {
        kind: "raw",
        url: withQuery(`/api/v1/threads/${encodeURIComponent(source.threadId)}/host-files/content`, {
          path,
        }),
      };
    case "thread-storage":
      if (source.threadId === null) return null;
      return {
        kind: "raw",
        url: `/api/v1/threads/${encodeURIComponent(source.threadId)}/thread-storage/files/${encodePath(path)}`,
      };
  }
}

export function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function decodeWorkspaceJson(body: unknown): Uint8Array {
  if (!isRecord(body)) throw new Error("The workspace returned an invalid file response.");
  const { content, contentEncoding } = body;
  if (typeof content !== "string" || (contentEncoding !== "base64" && contentEncoding !== "utf8")) {
    throw new Error("The workspace returned an invalid file response.");
  }
  return contentEncoding === "base64" ? base64ToBytes(content) : new TextEncoder().encode(content);
}

export async function fetchFileBytes(request: FileRequest, signal: AbortSignal): Promise<ArrayBuffer> {
  const response = await fetch(request.url, { credentials: "same-origin", signal });
  if (!response.ok) throw new Error(`File request failed with status ${response.status}.`);
  if (request.kind === "raw") return response.arrayBuffer();
  const bytes = decodeWorkspaceJson(await response.json());
  const copy = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(copy).set(bytes);
  return copy;
}

export function fileName(path: string): string {
  const parts = path.split("/");
  return parts[parts.length - 1] ?? path;
}

export function fileExtension(path: string): string {
  const name = fileName(path);
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot + 1).toLowerCase();
}
