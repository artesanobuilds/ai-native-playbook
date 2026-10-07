# AI Native — portable playbook

Updated 2026-10-07. Start with START-HERE.md. This is the rebuildable setup, with source files and fresh state; credentials, conversations, machine IDs, node_modules and home-directory settings are excluded.

## Original inspiration

This setup began with David Ondrej’s [My Agentic Engineering Workflow (after 6,775 sessions)](https://www.youtube.com/watch?v=c9nRxEy1kUY). Watch it for the reasoning behind the agent workspace, harness choices, skills and persistent context. The steps below describe my adaptation; use the current installation instructions and machine snapshot when rebuilding it.

## 1. Preflight and installation

Supported bootstrap: macOS or Linux (Windows via WSL2). Detect OS and CPU architecture first. Check Python 3.9+, Git, bash, jq, Node and npm. BB's bundled version requires Node 22.19+ in the 22 series, 24.x or 26.x; use 24 LTS if installing afresh. Native npm dependencies may need Xcode command-line tools on macOS or a C/C++ build toolchain and Python on Linux. Install these only if missing. Prefer official platform archives under `tools/` for Node and jq; verify upstream checksums. Use the platform's documented system toolchain installation when necessary and record that exception. Do not blindly run a package-manager recipe for a different OS.

Read bootstrap.py, then run `python3 bootstrap.py --target "$HOME/Coding/AI-native/workstation" --dry-run`. Resolve prerequisites and run `python3 bootstrap.py --target "$HOME/Coding/AI-native/workstation" --install`. Optional `--target /absolute/path` overrides the root. The script verifies the archive manifest, refuses conflicting files, stages sources, creates isolated provider state, installs four pinned CLIs, and runs the standalone guard tests. It does not start the BB server or change shell startup files. If a native build fails, diagnose that error and rerun; do not upgrade every dependency blindly. With npm versions that block dependency scripts, use the installed npm's documented targeted approval for BB's native dependencies, then repeat verification.

BB, Codex and Pi use copied package locks. Claude has a pinned top-level version and generates a package lock on first install; their transitive dependencies are resolved at installation time. Save those generated locks in the target repo. Versions are a tested-source baseline, not a promise they are the newest. Never copy binaries between OS/CPU types.

## 2. Layout and launch environment

`bb/` contains BB and its private `data/`; `claude/`, `codex/`, and `pi/` contain local CLI installs. `bin/` contains wrappers. `state/{claude,codex,pi}/` contains NEW profiles. `hooks/` contains the command guard. `.bb/skills/` contains the selected skills. `plugins/bb-plugin-office-preview/` contains plugin source. `docs/reference/` retains the upstream skills license. Public documentation lives in this source repo; raw historical notes are excluded. `tools/` is for additional binaries; `.cache/` is for downloads/caches.

Run `source ~/Coding/AI-native/workstation/env.sh` in bash/zsh (adjust for a custom root). Add that source line to a shell profile only after inspecting its existing contents and backing it up. Wrappers source it automatically. Authentication lives under the new root through CLAUDE_CONFIG_DIR, CODEX_HOME and PI_CODING_AGENT_DIR. Verify the installed versions honor these variables before login. Do not import the old computer's auth files.

Wrappers unset inherited Anthropic/OpenAI API variables to prefer subscriptions. Shell startup files can re-export them. Inspect relevant startup logic without printing secret values, and guard API exports against BB_THREAD_ID, BB_TERMINAL_SESSION_ID and BB_CLI when needed. Test an actual BB thread AND terminal; report only `key_len=${#ANTHROPIC_API_KEY}` (expected 0), never the key. Do not globally disable unrelated workflows' API keys. This is a local subscription-first setup; provider terms and entitlement still apply.

## 3. Harnesses and login

- **Claude Code:** launch `bin/claude`, complete interactive login. A fresh isolated settings file registers the Bash PreToolUse guard. If settings already exist, bootstrap preserves them; merge this one hook if absent. Validate with the installed Claude hook documentation and a harmless denied sentinel.
- **Codex:** launch `bin/codex`, use its supported ChatGPT login flow. Check `--help` and actual authentication status. The copied guard accepts Claude-shaped JSON; do not assume that writing a historical `hooks.json` integrates with this Codex version. Use its current supported policy/hook mechanism and verify it, or mark the guard integration unavailable. Keep normal sandbox and approval behavior.
- **Pi:** launch `bin/pi`, use `/login`, select the subscribed provider, then `/model`. Current package is `@earendil-works/pi-coding-agent`; older notes use `@mariozechner/...`. Pi is extensible and has different permission behavior: integrate the denylist through a supported tool-call extension, following its current extensions docs, before using it for autonomous shell work. Include edit/write tool limitations in the report; a shell pattern check does not police every tool.
- **Cursor CLI:** use https://cursor.com/docs/cli/installation. Download and inspect the official installer; determine its documented installation destination for the current platform. Keep binaries/state under `cursor/` where supported. If it insists on a home path, use a new symlink to backing storage under this root and document it; preserve any existing installation. Add a `bin/cursor-agent` wrapper. Login interactively. Integrate the guard using the current `beforeShellExecution` schema and the script's `cursor` argument; merge settings, never copy the source computer's config.

For each harness, run its version command and a tiny read-only task after login. Record the model actually selected and whether the subscription is recognized. Missing subscriptions block that provider only, not the rest of setup. Do not invent model IDs from the names in old review skills.

## 4. BB as the main interface

Start using `bb/bb.sh`; open http://localhost:38886. Check for an existing server/port conflict first and preserve it. Run `bb status`, `bb guide`, and relevant `--help` before mutations. Create or reuse an AI-native project pointing at this root using the installed CLI's documented project commands. Add real repositories only when the user identifies them.

Run `bb skill install-cli-skills` after checking help. Discover providers and models in the actual target environment. Confirm Claude, Codex and Pi resolve to the new wrappers (and Cursor once installed). Run one small read-only BB task on each authenticated provider. BB data must remain in `bb/data`; never copy this computer's BB database. Keep BB on localhost; any remote access is a separate authenticated/private-network configuration.

For Office Preview, from `plugins/bb-plugin-office-preview` run `npm ci --include=dev`, `npm test`, and `npm run typecheck`. With env.sh sourced, use the installed `bb plugin build` / `bb plugin install .` help to build and register it. Verify registration, then open the bundled synthetic sample.docx, sample.pptx and sample.xlsx files inside BB. These are generic test fixtures, not personal documents. Markdown/PDF use BB's own viewers. For remote downloads, install the included `plugins/bb-plugin-files-downloads` local Files fork: run `npm ci --include=dev`, `npm run typecheck`, `npm test`, and `bb plugin build` with env.sh sourced, then install that directory using `bb plugin install`. If the marketplace `files-editor` is active, preserve its settings and disable it first (do not remove it); both claim `bb files`. The fork adds Download for every saved workspace file and a download panel for archive links. Its SDK dependency is pinned; validate against the installed BB version. Merge `docs/rules/remote-downloads.md` into `bb instructions get/set`, preserving other instructions. Verify a downloaded ZIP checksum through the actual browser-facing BB origin. Roll back by disabling `files-downloads` and re-enabling `files-editor`. Plugin source is included, compiled output is not.

## 5. Skills, project readiness and daily workflow

Included: ask-then-build; adr-verbatim; decisions; handoff; git-worktree; launch-subagent; total-review; fable-review; gpt-review; global-agent-guardrails; herdr; create-readonly-db-role. The original David Ondrej license is included. These are historical source skills: adapt model IDs and command dependencies deliberately before using them. BB CLI skills come from the installed BB version, not a frozen copy of this machine's runtime.

Make selected skills discoverable in each harness's supported skill directories using local symlinks or settings. For the Claude Code side of the bb handoff, inspect the installer and existing symlinks, then run `CLAUDE_HOME="$CLAUDE_CONFIG_DIR" bash claude-code/move-to-bb/install.sh` (symlinks the `/move-to-bb` skill and its one-line rule into the isolated Claude profile; see its README). Check that each skill's name appears in that harness. Do not install the entire upstream repository by default. `/nagent` is a historical dependency in the reviewer skills: use installed BB thread orchestration documentation if absent, and update the local copies to real provider/model IDs with the user's model choice. An unconfigured review skill is not a verified review workflow.

Daily loop: define the outcome; use ask-then-build when product choices are unclear; isolate implementation in a worktree; run meaningful checks; get one independent review for substantial changes; triage actual issues; fix and verify; leave a handoff. Keep concurrency bounded by machine capacity and clear file ownership. Use ADRs for consequential choices. Use snippets for one-line habits such as “short, plain English”; skills for multi-step workflows.

For each real repo, inspect its build/test commands. Add `.bb-env-setup.sh` appropriate to that repo and a narrow `.worktreeinclude` only for required local files. Never copy production secrets into every worktree by default. Validate a fresh worktree build before declaring readiness. Do not use this tool-stack repo's setup script as a universal application build script.

## 6. Herdr and Ghostty locally

Historical setup notes point to https://github.com/herdrdev/herdr (older notes name ogulcancelik/herdr); verify the current official source before installing. Use official release binaries or a source build under `herdr/`; inspect release assets for the actual OS/CPU and verify published digests. Source builds require Rust and the repository's declared toolchain. Read the current https://herdr.dev/docs configuration and CLI reference for state paths. Put config/data below this root via supported options or absent-home-path symlinks. Add `bin/herdr` to launch it consistently.

Ghostty is the preferred terminal, not a Herdr requirement. On macOS, install the official app bundle under this root and open it there; on Linux follow the official supported distribution/build procedure and record any necessary system-package exception. In headless Linux/WSL2 use the existing terminal rather than trying to install a GUI. Source: https://ghostty.org/docs/install.

Start a dedicated named Herdr session for verification. Discover commands with `herdr --help`. Install its native integrations for the available harnesses using current help. Launch one authenticated agent, observe working/idle/blocked state, detach and reattach. A remote background process can survive an SSH disconnect; a sleeping local laptop does not continue computing, and processes do not survive a reboot. Test restart behavior separately; do not promise uninterrupted execution across reboots. Verify before adopting the included historical Herdr skill's flags.

## 7. Optional additional harnesses and utilities

These were mentioned in the historical reference but are not prerequisites for the local default setup. Install only when requested, using upstream docs and local prefixes/venvs. Add version, auth, state path and guard verification for each. No global npm or pip installs.

- OpenCode: https://opencode.ai/docs — extra provider/harness choice.
- Hermes Agent: https://github.com/NousResearch/hermes-agent — exploratory assistant and reusable skills.
- Prime Intellect's agent tooling: discover the currently supported product from https://www.primeintellect.ai/; the historical “Prime Agent” name is not an install command.
- Grok / ACP-compatible agents: use the target BB provider catalog and vendor documentation to decide availability.
- cmux: https://www.cmux.dev/ — optional macOS terminal UI. The original AI-native repo deliberately used BB terminals instead.
- Raycast/system text replacements and voice dictation: optional personal conveniences, not required for agents to run.
- Corral: mentioned as private in the historical source; do not assume an installable public release.
- DeepAPI and other research/connectors: optional paid integrations. User supplies credentials directly to a gitignored env file or provider login UI, never to a chat transcript.

## 8. VPS / always-on phase (separate authorization)

When requested, choose an existing host or obtain approval for provider, region and recurring cost before purchase. Do not reuse historical price claims. Prefer an ordinary supported Ubuntu host, SSH keys and a non-root agent account. The user provisions SSH access directly. Apply current OS security updates; limit network exposure and use a private overlay or SSH tunnel. Do not expose BB's port publicly.

Transfer this same kit; bootstrap under the remote user's ~/Coding/AI-native. Install Herdr and selected CLI providers, then authenticate on that host. Configure service supervision using the installed tool's documented lifecycle; test logout/reconnect and reboot recovery. Add the remote host from the laptop using the current `herdr machine --help` workflow and the user's chosen SSH host alias. Keep host keys and identity files out of prompts.

Migration of mail assistants, chat bots and scheduled jobs is a separate cutover: inventory schedules, scopes and state; back up; run a read-only validation; disable the old scheduler before enabling the new one; verify exactly one active worker; document rollback. Do not copy this machine's live bot data into the generic kit.

## 9. Production data and measurement (optional)

Use create-readonly-db-role only for a database explicitly authorized by its owner. Verify SELECT-only privileges and default privileges with a test connection; never send credentials through chat or grant write access to simplify setup. Agentic productivity measurement is optional (historical reference: vectal-labs/agentic-productivity); verify its current repository, collection scope and local-only reporting before install. Do not enable telemetry, external notifications or recurring jobs as part of a generic workstation install.

## 10. Completion, recovery and maintenance

Create SETUP-REPORT.md with rows for prerequisites; four core installs; each login; Cursor; BB project/providers; API-key isolation in real threads/terminals; standalone guard tests; per-harness guard invocation; skill discovery; Office Preview; Herdr persistence; Ghostty; and optional VPS. Mark each VERIFIED, BLOCKED (reason), or NOT REQUESTED. Record exact versions and commands, never tokens. End with the actual start commands and any remaining user login actions.

Guard verification: run `bash hooks/test-guard.sh` with jq installed (the existing guard fails open without jq). For runtime integration, add a temporary deny pattern matching a harmless unique `printf` sentinel, ask the harness to execute that sentinel, confirm denial, then remove only the test pattern. Never test using a real destructive command. Test harmless allowed commands too. The standalone suite validates matching; provider invocation must be checked independently.

Installer reruns preserve existing profiles and refuse differing source files. A failed npm install can be retried. To upgrade, back up first, update one component, retain lockfiles, and rerun its checks. Stop the new BB/Herdr processes before undoing setup. Removing the root destroys new sessions and credentials, so obtain explicit confirmation and a backup first; remove only shell-profile lines/symlinks created by this setup. Do not delete existing user profiles.

## 11. Videos and specialist assistants

After the workstation is verified, use `docs/video.md` and `examples/video/README.md` in the source repo for a local media workflow. Use a healthy Python virtual environment, your own model downloads and a tested FFmpeg install. Verify the finished media, not just successful rendering.

Use `docs/agent-team.md` and `templates/agent-contract.md` to create specialist roles with new private state. Connect only your own authorized accounts. Start with manual read-only runs, then define explicit write/delivery permissions and scheduler behavior. No personal agent state or active bot is copied by bootstrap.

## References and provenance

See `docs/evidence.md` and `docs/machine-snapshot.md` in the source repository. The current catalog snapshot supersedes older availability notes. Herdr, Ghostty and VPS remain optional/unverified in the observed machine. Local docs and upstream sources are references, not proof of a fresh installation. Keep the source clone available while completing setup.
