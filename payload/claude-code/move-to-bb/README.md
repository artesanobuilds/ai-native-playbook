# move-to-bb — hand a Claude Code session over to bb

Everything needed to run `/move-to-bb` (or say "hand off to bb") in Claude Code on
any machine that has bb installed.

| File | What it is |
| --- | --- |
| `SKILL.md` | The skill. Loads only when invoked. |
| `rules/bb-handoff.md` | One-line always-on rule that points at the skill. |
| `install.sh` | Symlinks both into `~/.claude/`. Idempotent; refuses to clobber real files. |

## Install

```
unzip move-to-bb.zip -d ~/Coding/AI-native/claude-code   # or anywhere you keep it
cd ~/Coding/AI-native/claude-code/move-to-bb
./install.sh          # add --force to replace an existing ~/.claude/rules/bb-handoff.md
```

Open a new Claude Code session and type `/move-to-bb`.

## Requirements

- bb installed and started through its `bb.sh` wrapper. The skill looks for it at
  `$BB_SH`, then `$AI_NATIVE_ROOT/bb/bb.sh`, then `~/Coding/AI-native/bb/bb.sh`, then
  `bb` on PATH. Set `BB_SH` if yours is elsewhere.
- The repo you are handing off must be a bb project (the skill offers to create one).

## Uninstall

`./install.sh --uninstall` — removes only the two symlinks it created.

## Repackage

From the AI-native repo: `scripts/package-move-to-bb.sh` → `dist/move-to-bb.zip`.
