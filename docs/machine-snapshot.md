# Observed machine snapshot

Captured 2026-10-07 on the local macOS host. This records the source machine; the bootstrap is a cleaned-up rebuild recipe.

| Component | Observation | Rebuild implication |
| --- | --- | --- |
| BB | 0.42.1; root-local npm install; private `bb/data` | Preserve local install and private data layout |
| Claude Code | CLI reports 2.1.292; executable resolves through a home-directory launcher | Fresh recipe pins 2.1.292 under the chosen root |
| Codex | 0.154.0; root-local npm install with a home launcher | Use new isolated CODEX_HOME |
| Pi | 1.0.4; root-local wrapper and `pi/agent` state | Fresh recipe uses `state/pi`; all launchers must agree |
| Cursor | 2026.01.28-fd13201; existing home-directory install | Preserve it or follow current supported install procedure |
| Node | v22.15.0 | Below Pi’s documented 22.19 minimum; do not reproduce this mismatch |
| FFmpeg | Present on PATH outside the tool root | For a new machine, install deliberately and record location |
| Kokoro | Local helper, model files and venv under `tts/` | Rebuild a healthy Python venv; fetch model weights separately |
| Herdr / Ghostty | No CLI found on PATH; no Ghostty app found in `/Applications` | No proof of installation elsewhere; treat as optional/unverified |
| VPS migration | Planned in setup docs; not verified here | No server purchase or assistant migration in bootstrap |

All four BB providers returned model catalogs. Older notes saying Pi is missing or Cursor has no models are superseded by live discovery. Catalog entries alone do not establish successful inference.

## Plugins

The exact sanitized plugin inventory is in [inventory/plugins.json](../inventory/plugins.json).

Enabled/running: Automations, Concurrency limit, Remote access, Custom instructions, Files Downloads, Inline visualization, Keep awake, Office Preview, PDF preview, ACP provider, Claude Code provider, Codex provider, Pi provider, Provider retry, Push notifications, Scheduled send, Secrets and Side chat.

Disabled: Account Pooler, Ask User Question, Files Editor, Monaco Editor, Plugin API docs/tester, Provider usage and Workflows. Disabled components are not part of the running baseline. A running remote-access plugin is not proof that any particular remote client or download URL works.

## Important deviations

The “everything under one root” rule is an installation direction, not a claim that every historical tool obeys it. Existing Claude/Cursor launchers, shell configuration and FFmpeg live elsewhere. The portable recipe isolates new state, retains existing installations and records any unavoidable exception.

The original bootstrap pinned older Claude and Pi versions. This repo updates those to observed versions and includes Pi’s lockfile. Claude’s top-level version is pinned but its transitive dependencies resolve at installation. No clean-machine end-to-end install was performed during publication.
