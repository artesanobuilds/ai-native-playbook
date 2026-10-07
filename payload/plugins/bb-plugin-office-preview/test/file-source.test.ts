import { describe, expect, it } from "vitest";
import { decodeWorkspaceJson, fileExtension, resolveFileRequest, type FileSource } from "../lib/file-source";

const base: FileSource = { kind: "workspace", threadId: null, environmentId: null, projectId: null };

describe("resolveFileRequest", () => {
  it("prefers the thread worktree endpoint and encodes path segments", () => {
    expect(resolveFileRequest("docs/Q3 plan.docx", { ...base, threadId: "thr_1" })).toEqual({
      kind: "raw",
      url: "/api/v1/threads/thr_1/worktree/files/docs/Q3%20plan.docx",
    });
  });
  it("falls back to the environment diff endpoint, then the project endpoint", () => {
    expect(resolveFileRequest("a.pptx", { ...base, environmentId: "env_1" })).toEqual({
      kind: "workspace-json",
      url: "/api/v1/environments/env_1/diff/file?target=uncommitted&path=a.pptx&side=new",
    });
    expect(resolveFileRequest("a.xlsx", { ...base, projectId: "proj_1", experimental_hostId: "h1" })).toEqual({
      kind: "raw",
      url: "/api/v1/projects/proj_1/files/content?path=a.xlsx&hostId=h1",
    });
  });
  it("handles host and thread-storage sources and returns null without a thread", () => {
    expect(resolveFileRequest("/tmp/x.docx", { kind: "host", threadId: "t", environmentId: null, projectId: null })).toEqual({
      kind: "raw",
      url: "/api/v1/threads/t/host-files/content?path=%2Ftmp%2Fx.docx",
    });
    expect(resolveFileRequest("out/x.csv", { kind: "thread-storage", threadId: "t", environmentId: null, projectId: null })).toEqual({
      kind: "raw",
      url: "/api/v1/threads/t/thread-storage/files/out/x.csv",
    });
    expect(resolveFileRequest("x", { kind: "host", threadId: null, environmentId: null, projectId: null })).toBeNull();
    expect(resolveFileRequest("x", base)).toBeNull();
  });
});

describe("decodeWorkspaceJson", () => {
  it("decodes base64 and utf8 bodies and rejects anything else", () => {
    expect(Array.from(decodeWorkspaceJson({ content: "aGk=", contentEncoding: "base64" }))).toEqual([104, 105]);
    expect(Array.from(decodeWorkspaceJson({ content: "hi", contentEncoding: "utf8" }))).toEqual([104, 105]);
    expect(() => decodeWorkspaceJson({ content: 1 })).toThrow(/invalid file response/u);
    expect(() => decodeWorkspaceJson(null)).toThrow(/invalid file response/u);
  });
});

describe("fileExtension", () => {
  it("lowercases and handles dotless names", () => {
    expect(fileExtension("a/B.DOCX")).toBe("docx");
    expect(fileExtension("Makefile")).toBe("");
  });
});
