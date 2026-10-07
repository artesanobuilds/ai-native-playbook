import { describe, expect, it, vi } from 'vitest';
import { Hono } from 'hono';
import type { BbPluginApi } from '@get-bb/plugin-sdk';
import plugin from '../server';
import { downloadUrl, attachmentDisposition } from './download';

function setup(content = Buffer.from([0, 255, 128, 10])) {
  const app = new Hono();
  const read = vi.fn(async (_args: unknown) => ({ content: content.toString('base64'), contentEncoding: 'base64', sizeBytes: content.length }));
  const route = vi.fn((method, path, handler, options) => { expect(options.auth).toBe('local'); app.on(method, path, handler); });
  const api = {
    settings: {define: () => ({get: async () => ({excludedDirectories: ''})})},
    http: {route}, rpc: {register: vi.fn()}, cli: {register: vi.fn()}, log: {warn: vi.fn()},
    sdk: {
      threads: {get: async () => ({environmentId: 'env-remote', projectId: 'project'})},
      environments: {get: async () => ({path: '/remote/work', hostId: 'remote-host', projectId: 'project'})},
      projects: {get: async () => ({name: 'Test', sources: [{isDefault: true, path: '/project', hostId: 'project-host'}]})},
      system: {config: async () => ({dataDir: '/nonexistent-test-path'})},
      hosts: {get: async () => ({name: 'Remote'})}, files: {read},
    },
  };
  plugin(api as unknown as BbPluginApi);
  return {app, read};
}

describe('downloads', () => {
  it('encodes spaces, literal percent, Unicode and reserved characters exactly once', () => {
    const url = downloadUrl({kind:'thread', id:'t'}, 'dist/日本 100% #?.zip');
    expect(new URL(url, 'https://bb.example').searchParams.get('path')).toBe('dist/日本 100% #?.zip');
  });
  it('keeps filenames Unicode without permitting header injection', () => {
    const header = attachmentDisposition('日本"\r\n.zip');
    expect(header).not.toMatch(/[\r\n]/);
    expect(header).toContain("filename*=UTF-8''%E6%97%A5%E6%9C%AC");
  });
  it.each(['thread','environment','project'])('routes %s scope to its owning host and returns exact binary bytes', async kind => {
    const {app, read} = setup();
    const r = await app.request(`/download?kind=${kind}&id=t&path=a.zip`);
    expect(r.status).toBe(200);
    expect(Array.from(new Uint8Array(await r.arrayBuffer()))).toEqual([0,255,128,10]);
    expect(r.headers.get('Content-Disposition')).toContain('attachment;');
    expect(r.headers.get('Cache-Control')).toBe('private, no-store');
    expect(read.mock.calls[0][0]).toMatchObject(kind === 'project' ? {hostId:'project-host', rootPath:'/project', path:'/project/a.zip'} : {hostId:'remote-host', rootPath:'/remote/work', path:'/remote/work/a.zip'});
  });
  it.each(['../secret','a/../../secret','/etc/passwd','C:/secret','a\0b'])('rejects unsafe path %s before reading', async path => {
    const {app, read} = setup();
    const r = await app.request('/download?' + new URLSearchParams({kind:'thread', id:'t', path}));
    expect(r.status).toBe(400); expect(read).not.toHaveBeenCalled();
  });
  it('does not turn a failed host read into a successful attachment', async () => {
    const {app, read} = setup(); read.mockRejectedValueOnce(new Error('host offline'));
    const r = await app.request('/download?kind=thread&id=t&path=a.zip');
    expect(r.status).toBe(502); expect(r.headers.get('Content-Disposition')).toBeNull();
  });
  it('preserves UTF-8 text and refuses incomplete byte responses', async () => {
    const {app, read} = setup();
    const content = '日本 café\n';
    read.mockResolvedValueOnce({content, contentEncoding:'utf8', sizeBytes:Buffer.byteLength(content)});
    const r = await app.request('/download?kind=thread&id=t&path=a.txt');
    expect(await r.text()).toBe(content);
    read.mockResolvedValueOnce({content:'AA==', contentEncoding:'base64', sizeBytes:100});
    expect((await app.request('/download?kind=thread&id=t&path=a.bin')).status).toBe(502);
  });
  it('rejects missing and extra query arguments', async () => {
    const {app, read} = setup();
    expect((await app.request('/download?path=x')).status).toBe(400);
    expect((await app.request('/download?kind=thread&id=t&path=x&root=/')).status).toBe(400);
    expect(read).not.toHaveBeenCalled();
  });
});
