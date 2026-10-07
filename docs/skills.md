# Skills, rules, decisions and handoffs

| Kind | Use it for | Example |
| --- | --- | --- |
| AGENTS.md / CLAUDE.md | Stable project rules | Keep secrets out of commits; run the project’s checks |
| Skill | Repeatable multi-step procedure | Interview for requirements; review a diff; move to BB |
| ADR | A consequential decision and its consequences | Keep installs under one root; isolate subscription auth |
| Handoff | Current task state | Files changed, checks run, blocker, next action |
| Run report | One recurring execution | Inputs considered, changes, delivery, errors |
| Template | Starting structure | Task brief, setup report, agent contract |

## Included source subset

The payload preserves the selected historical skills: `ask-then-build`, `adr-verbatim`, `decisions`, `handoff`, `git-worktree`, `launch-subagent`, `total-review`, `fable-review`, `gpt-review`, `global-agent-guardrails`, `herdr` and `create-readonly-db-role`.

Read before adopting. Some name old model families, `/nagent`, or tool-specific APIs. Their presence in the kit is not proof of compatibility with every harness. Keep the procedure, map execution to the installed BB commands and real model catalog, and validate it on one representative task.

BB contributes its own runtime skills. Discover those from the installed version rather than freezing the source machine’s whole runtime directory. Optional artifact and connector skills depend on the apps installed for the new user.

## How to evolve the system

When a task repeats, identify the decisions and checks that made it work, then write the smallest useful procedure. Give it clear triggers, inputs, outputs and failure handling. Avoid embedding a personal transcript or account configuration. Keep a durable rule short; link detailed procedures rather than copying them into every prompt.

The source pattern favors short plain-English reports, continuing authorized work, concrete evidence and preserving context between sessions. These habits are portable even when the model names change.
