# Make BB fit how you work

**BB is highly customizable.** You can ask a coding agent to extend the workspace itself when your workflow needs something new. My file-viewer setup is a concrete example.

## From a request to a working extension

I started a thread asking for a file viewer in BB so I could open Markdown, PDFs, Word documents and presentations. Then I added that I wanted to explore files from the left side.

The agent inspected what BB already supported, enabled existing browsing plugins and built an Office Preview plugin for the missing formats. The resulting workflow let me browse project files and inspect documents alongside the agent conversation.

| Need | How this setup handles it |
| --- | --- |
| Render Markdown | BB’s built-in preview |
| View PDFs | The bundled PDF preview plugin |
| Read Word files | Custom Office Preview for `.docx` |
| Inspect presentations | Office Preview for `.pptx`: text, tables, images and notes |
| Inspect spreadsheets | Office Preview with sheet tabs and a grid |
| Browse files | A Files sidebar with a file tree, tabs and search |
| Download saved artifacts | The later Files Downloads customization, using BB’s existing connection |

The [Office Preview source](../payload/plugins/bb-plugin-office-preview/README.md) and [Files Downloads source](../payload/plugins/bb-plugin-files-downloads/README.md) are included in this repo. The [setup guide](../PLAYBOOK.md) explains how to build and install them on your own machine.

## Iterate on the experience

The first version enabled both Files and File Editor. Follow-up use revealed that File Editor could take over Markdown opening and show raw text where I wanted a rendered preview, so it was disabled. The current snapshot uses Files Downloads, Office Preview and PDF preview; the older Files Editor and Monaco Editor entries are disabled.

That is the useful customization loop: describe the experience you want, inspect the existing capabilities, add or adapt a plugin, try it in the actual UI, and refine it. You can shape your agent workspace as your work changes.

## Know what a customization delivers

The presentation viewer is a readable content view, not a faithful PowerPoint slide renderer. Spreadsheet previews cap the displayed rows at 1,000. Legacy `.doc` and `.ppt` files need a separate conversion step. These boundaries matter when deciding whether a preview is enough or you need the original application.

For your own extension, give the agent a concrete request such as:

> I want to inspect the artifacts you produce without leaving BB. Check the existing viewers and plugins, add the missing capability, and verify it with sample files in the thread panel. Include source and installation instructions so I can rebuild it.

This example comes from the original file-viewer thread, its setup decision record and the included plugin source. It describes this installation’s evolution; verify compatibility when using another BB version.
