# The daily loop

## 1. Describe the result

Give the agent the desired artifact, audience, constraints and success condition. A voice-dictated rough request can be enough to begin. Ask for a short interview when a product choice matters; let the agent resolve ordinary implementation details.

Example: “Make a two-minute explanation of this setup for an engineer who has never used BB. Include narration, diagrams and captions. Show me the finished video and verify the download.”

## 2. Inspect the current state

Read the project instructions, relevant files and handoff. Check the real environment before acting. The source history repeatedly includes continuing work in a new harness, fixing environment mismatches and correcting outdated assumptions.

## 3. Build a concrete result

Use tools to create the artifact. Keep prose, code, timing files and other editable sources next to the output. Parallelize only independent responsibilities that justify the coordination cost. Use separate worktrees when concurrent changes could collide.

## 4. Inspect what the user will see

Tests for code; rendered pages for documents; frames and audio for video; browser-facing downloads for remote artifacts. “The command exited zero” is only one piece of evidence. A video in the local history had audio but missing imagery and needed a user-visible correction.

## 5. Review, fix and finish

For substantial coding changes, use independent review, triage findings and fix real defects. A review is useful when it changes the result. Don’t create a review ritual for every reversible text edit.

## 6. Leave durable context

Put stable rules in AGENTS.md, a consequential decision in a new ADR, and current task state in a handoff. Include commands run, evidence, blockers and the exact next step. A fresh agent should be able to resume without reading the entire chat.

## Terminal to BB

I migrated all my Claude Code projects to BB using the `move-to-bb` skill. See [the migration guide and included source](moving-to-bb.md).

The included `payload/claude-code/move-to-bb` source packages this transition. Read its installer first. For an isolated Claude profile, pass `CLAUDE_HOME="$CLAUDE_CONFIG_DIR"` to the installer; its default is the existing home profile. Inspect existing symlinks before running it because it can relink them.

The handoff should name the goal, relevant files, changes, checks, open decisions and next action. The receiving BB agent must verify current files rather than trusting stale prose. Do not paste a whole private transcript into a public handoff.
