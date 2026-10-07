# Evidence and limitations

## Inspection scope

Snapshot date: 2026-10-07. Sources were the local `AI-native-playbook.zip` in Downloads, current AI-native setup files and ADRs, live BB CLI discovery, installed CLI version output, selected agent definitions, saved media sources and artifacts, and locally accessible transcript archives.

The archive scan parsed **903 Claude Code JSONL files** and **341 Codex JSONL files** with no JSON parse errors during that pass. This is archive coverage, not 1,244 independent human conversations. Archives include subagents, imported context, approval-review sessions and repeated messages. A heuristic filtering/deduplication pass helped locate representative examples; it is not a validated usage analytics pipeline.

All files in those two discovered archives were scanned programmatically. Selected relevant prompts and artifact sources were then read more closely. We did not manually read every line of every transcript. Remote-only sessions, deleted history, other computers and inaccessible app stores are outside the scope. Active sessions can continue changing after the scan.

## Claim ledger

| Claim | Evidence | Limit |
| --- | --- | --- |
| Four harnesses exposed by BB | Provider list and per-provider catalogs | Availability is not successful inference |
| Pi exposes 144 entries here | Saved sanitized catalog: 140 OpenRouter, four xAI | Routes, aliases and variants can overlap |
| Terminal → handoff → BB workflow | Included move-to-bb source and local handoff prompts | Target host still needs working integration |
| Coding and migration work | Selected local user prompts and handoffs | Generalized; private repository content excluded |
| Videos are part of actual use | Narration/render/timing/caption sources and saved MP4s | Source artifacts were not all re-rendered here |
| Visual output needs real inspection | Prompts reporting a video with audio but missing images | Historical correction, not a measured failure rate |
| Research becomes MD plus HTML | Explicit local knowledge-library requests | No claim that every source was fully verified |
| William and collaborators use persistent reports | Local agent definitions and selected history | Current scheduler health was not audited |
| Herdr / VPS are planned | Setup roadmap; no local CLI found in inspected PATH | Does not rule out installation elsewhere |

## Privacy method

The public repo contains rewritten workflow descriptions, selected distributable source, blank templates and narrow catalog/plugin metadata. Raw transcripts and private research notes stay outside it. Personal records, private correspondence, employer code, identities of message recipients, machine IDs and auth state are not publication inputs.

The reference ZIP informed structure and supplied selected source files. Its historical guide, interactive page and raw reference note were not copied into this public repo. Licensed skill and plugin notices are retained.

## Sources for installation drift

- [BB](https://getbb.app/) and the installed `bb guide` / `--help`.
- [Pi upstream](https://github.com/earendil-works/pi): requirements, login, extension model and permission boundary.
- [Claude Code setup](https://code.claude.com/docs/en/setup).
- [Cursor CLI installation](https://cursor.com/docs/cli/installation).
- Codex installation/version behavior was inspected locally; check the installed CLI help when rebuilding.

The web sources above were opened during preparation. Local catalogs, rather than a public marketing list, are authoritative for the recorded model entries. This repo makes no current price, quota or model-quality guarantee.

## Validation scope

See [validation](validation.md) for the checks actually run on this publication. A staged bootstrap and passing source tests are not a clean-machine installation or a successful login on somebody else’s computer.
