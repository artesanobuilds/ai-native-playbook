// @vitest-environment jsdom
import React from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { DownloadFile } from '../components/DownloadFile';

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); document.body.innerHTML = ''; });

it('downloads archive bytes with a filename and reports HTTP failures without creating a file', async () => {
  let downloadedName = '';
  const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function(this: HTMLAnchorElement) { downloadedName = this.download; });
  const blobs: Blob[] = [];
  vi.stubGlobal('URL', Object.assign(URL, {
    createObjectURL: vi.fn((b: Blob) => { blobs.push(b); return 'blob:test'; }),
    revokeObjectURL: vi.fn(),
  }));
  const bytes = new Uint8Array([0, 255, 1]);
  const fetchMock = vi.fn().mockResolvedValue({ok: true, arrayBuffer: async () => bytes.buffer});
  vi.stubGlobal('fetch', fetchMock);
  const host = document.createElement('div'); document.body.appendChild(host);
  const root = createRoot(host);
  await act(async () => root.render(<DownloadFile path="dist/test archive.zip" source={{kind:'workspace', threadId:'remote-thread', environmentId:null, projectId:null}} Original={() => <div>Original</div>} />));
  await act(async () => host.querySelector('button')!.click());
  expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/threads/remote-thread/worktree/files/dist/test%20archive.zip');
  expect(click).toHaveBeenCalledOnce();
  expect(downloadedName).toBe('test archive.zip');
  expect(blobs[0].size).toBe(3);
  fetchMock.mockResolvedValueOnce({ok:false, status:503});
  await act(async () => host.querySelector('button')!.click());
  expect(host.querySelector('[role="alert"]')?.textContent).toContain('503');
  expect(click).toHaveBeenCalledOnce();
  await act(async () => root.unmount());
});
