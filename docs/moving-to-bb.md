# How I moved my Claude Code projects to BB

**I migrated all my Claude Code projects to BB using the `move-to-bb` skill.** It gave me a repeatable way to carry the context of an existing project into BB and continue the work there.

The complete skill is in this repo:

- [SKILL.md](../payload/claude-code/move-to-bb/SKILL.md): the handoff procedure.
- [Installer](../payload/claude-code/move-to-bb/install.sh): installs local symlinks for Claude Code.
- [Handoff rule](../payload/claude-code/move-to-bb/rules/bb-handoff.md): recognizes requests to move work into BB.
- [Original skill README](../payload/claude-code/move-to-bb/README.md): requirements and usage.

## What it carries forward

The skill puts durable rules and decisions into project files, then writes a focused handoff with the goal, current state, relevant files, decisions, failed approaches and open work. It follows its commit procedure, identifies the matching BB project and starts one thread with the handoff as its entry point.

That lets a fresh agent pick up the project with useful context. The receiving thread still verifies the current repository state. The workflow carries context through files; it does not import the terminal’s complete conversation history or transfer provider credentials.

## Use it in your own setup

After bootstrapping and sourcing your installation’s `env.sh`, inspect the skill and installer. From the installation root, preview the symlink changes:

```bash
CLAUDE_HOME="$CLAUDE_CONFIG_DIR" bash claude-code/move-to-bb/install.sh --dry-run
```

Then install into that same isolated Claude profile:

```bash
CLAUDE_HOME="$CLAUDE_CONFIG_DIR" bash claude-code/move-to-bb/install.sh
```

If using an existing Claude profile instead, explicitly select its directory with `CLAUDE_HOME`. Inspect existing symlinks first; the installer can relink them. Keep the skill’s source directory in place because the installation points to it.

Open a new Claude Code session in the project and invoke `/move-to-bb`, or say “move this to BB.” Follow the skill’s handoff and project-selection steps. Inspect current BB CLI help if its historical commands differ from the installed version.

Use the same procedure one project at a time. Stable rules belong in project instructions, decisions in ADRs, and the current task’s state in the handoff. That separation makes the transition useful even when you choose a different harness or model in BB.
