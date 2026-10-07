---
name: move-to-bb
description: Hand the current Claude Code session over to a bb thread with everything this session learned. Use when the user says "move this to bb", "hand off to bb", "continue this in bb", or "/move-to-bb". Writes durable context into the repo, writes one handoff brief, commits only its own files after showing you the status, spawns ONE bb thread in the matching project, prints the thread ID and a follow-up command, then stops working the task locally.
---

# Move to bb

bb (getbb.app) is Miguel's agent UI. A bb thread has **no access to Claude Code's
memory, transcript, or scratchpad**. Anything the next agent needs must be written into
the repo first — and committed, because a fresh bb worktree checks out tracked files only.

Do the steps below yourself. Do not narrate them and stop.

## 0. Locate bb

Use the first that exists, in order:

1. `$BB_SH` if set.
2. `$AI_NATIVE_ROOT/bb/bb.sh` if `AI_NATIVE_ROOT` is set.
3. `~/Coding/AI-native/bb/bb.sh`.
4. `bb` on PATH.

Always go through `bb.sh` when it exists — never call `bb-app` directly (it would use the
wrong data dir). Below, `BB` means that command; e.g. `"$BB" cli project list`.

If none is found, stop and say so. Nothing else in this skill works without it.

## 1. Split the context by lifespan

Read the project config first (`.bb/AGENTS.md`, `CLAUDE.md`, or `AGENTS.md`) so you do not
restate what is already there.

**Durable** — rules, conventions, decisions, and repeatable procedures that outlive this
task — goes into the repo, not the brief:

- `.bb/AGENTS.md` — per-project rules bb injects into every thread.
- `docs/adr/NNNN-title.md` — decisions and rejected approaches (context, decision,
  consequences; never edit an old ADR, supersede it).
- `.bb/skills/<name>/SKILL.md` — repeatable procedures.

**Session-specific** — the current task only: what happened, what is half-done, what
failed — goes into ONE file, `docs/handoff-<topic>.md`. Earlier tasks from this session
belong in the durable files if they matter at all, not in the brief.

Write the brief by these rules:

- **State, not instructions.** "Logout is not implemented", never "implement logout".
- **Reference, don't duplicate.** Point at ADRs, plans, diffs, issues by path or URL.
- **Capture the why and the dead ends.** Rejected approaches are the least recoverable
  information.
- **Frame claims as things to verify**, not facts. The last brief in a repo is often stale.
- **Redact secrets.** Reference where a credential lives (`.env.local`, not committed),
  never its value. Never verify a secret by printing it; use `${#VAR}` to check length.
- **Be ruthless.** Cut anything the next agent can get by reading the code.

Sections: Goal · Why · Current state (DONE / PARTIAL / NOT STARTED) · Key decisions and
why · Traps and dead ends · Relevant files with what is in them · Open work as state and
ordering · Open questions for the user. If `docs/handoff-<topic>.md` already exists,
update it rather than starting over.

## 2. Commit only what you wrote

1. `git status --short` — look at it. Other uncommitted work is often present and is not
   yours.
2. `git add <each file you created or edited in step 1>` — by path. **Never `git add -A`,
   `git add .`, or `git commit -a`.**
3. Show the user `git status --short` and the proposed commit message
   (`Add handoff brief for <topic>`), and wait for OK.
4. Commit. Do not push unless asked.

## 3. Pick the bb project

1. `"$BB" cli project list` prints `ID  Name  Path`.
2. Match the current repo root (`git rev-parse --show-toplevel`, or the main worktree if
   this is a linked worktree) against the `Path` column.
3. If exactly one matches, use it.
4. If none matches, show the list and ask the user to pick one or to create one. Create
   only on their say-so: `"$BB" cli project create --name <name> --root <repo root>`.

## 4. Spawn one thread

```
"$BB" cli thread spawn --project <id> --title "<short title>" \
  --prompt "Read docs/handoff-<topic>.md and .bb/AGENTS.md first, then <task in one sentence>."
```

- Add `--permission-mode full` only if the work must write outside the workspace (hook
  configs, `~/.claude`, home-dir files). The default sandbox blocks that.
- Spawn exactly one thread. Do not also start working the task in bb yourself.

## 5. Report and stop

Tell the user, in a few lines:

- What was handed off: the brief path and any durable files, plus the commit hash.
- The thread ID and title.
- Follow-up commands, ready to paste:
  - `"$BB" cli thread tell <id> "<message>"`
  - `"$BB" cli thread wait <id>` then `"$BB" cli thread output <id>`

Then **stop working the task here**. This session becomes the fallback for filesystem
work bb cannot reach; do not continue the task in parallel.
