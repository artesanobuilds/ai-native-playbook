// Reduce generated HTML (mammoth output) to inert markup: no scripts, no
// event handlers, no javascript: URLs, only http(s)/mailto links and
// data:image sources. The document is untrusted input.
const DROP_ELEMENTS = new Set([
  "script", "style", "iframe", "object", "embed", "link", "meta", "form",
  "input", "button", "textarea", "select", "base", "noscript", "template",
]);

function safeHref(value: string): boolean {
  const trimmed = value.trim().toLowerCase();
  return (
    trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("mailto:") || trimmed.startsWith("#")
  );
}

/** Images may only be inline data: the document must not phone home. */
function safeImageSrc(value: string): boolean {
  return value.trim().toLowerCase().startsWith("data:image/");
}

export function sanitizeHtml(html: string): string {
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");
  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT);
  const elements: Element[] = [];
  let node = walker.nextNode();
  while (node !== null) {
    elements.push(node as Element);
    node = walker.nextNode();
  }
  for (const element of elements) {
    const tag = element.tagName.toLowerCase();
    if (DROP_ELEMENTS.has(tag)) {
      element.remove();
      continue;
    }
    for (const attribute of Array.from(element.attributes)) {
      const name = attribute.name.toLowerCase();
      if (name.startsWith("on")) {
        element.removeAttribute(attribute.name);
      } else if (name === "href" && !safeHref(attribute.value)) {
        element.removeAttribute(attribute.name);
      } else if (name === "src" && !(tag === "img" && safeImageSrc(attribute.value))) {
        element.removeAttribute(attribute.name);
      } else if (name === "srcset" || name === "style") {
        element.removeAttribute(attribute.name);
      }
    }
    if (tag === "a") {
      element.setAttribute("target", "_blank");
      element.setAttribute("rel", "noopener noreferrer");
    }
  }
  return doc.body.innerHTML;
}
