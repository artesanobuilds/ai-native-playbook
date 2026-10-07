// bb-plugin-office-preview — backend entry.
//
// The plugin is frontend-only: the viewer fetches file bytes through BB's own
// authenticated file endpoints (the same ones the bundled pdf-preview plugin
// uses), so there is nothing to register on the server.
import type { BbPluginApi } from "@get-bb/plugin-sdk";

export default function plugin(bb: BbPluginApi) {
  bb.log.info("office-preview loaded");
}
