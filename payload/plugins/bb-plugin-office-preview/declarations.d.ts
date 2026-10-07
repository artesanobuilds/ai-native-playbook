// Browser-only entry points of the parser libraries. The bundle targets the
// browser, so we import the self-contained builds explicitly instead of
// relying on the package "browser" field.
declare module "mammoth/mammoth.browser.js" {
  import type mammoth from "mammoth";
  const api: typeof mammoth;
  export default api;
}
declare module "jszip/dist/jszip.min.js" {
  import JSZip from "jszip";
  export default JSZip;
}
declare module "xlsx/xlsx.mjs" {
  export * from "xlsx";
}
