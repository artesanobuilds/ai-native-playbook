# AI Native Playbook

**Give your coding agent this repo and build your own agent workspace.**

This is Miguel Alvarado’s working setup, with two complementary purposes:

- **BB gives you access to a wide diversity of coding agents and models.** Claude Code, Codex, Pi and Cursor bring different model catalogs and tool capabilities into one workspace, so you can choose what fits the task.
- **William and the specialist agents help take care of your tasks.** They handle recurring responsibilities such as mail triage, reminders, reporting and follow-through, using persistent context and clearly scoped actions.

Markdown preserves context, and skills capture repeatable procedures across both parts of the setup.

The useful part is the loop: turn a request into an artifact, inspect the result, improve it, and leave enough context for another agent to continue. The artifacts range from tested code and PRs to narrated videos, interactive explainers, documents and daily reports.

## Start here

Clone this repo inside your chosen tools folder, open it with your coding agent, and paste:

> Read AGENTS.md, START-HERE.md and PLAYBOOK.md. Rebuild this setup under ~/Coding/AI-native on this computer. Begin with a read-only inventory and bootstrap.py --dry-run against an empty target. Preserve existing installs and logins. Complete the authorized local setup, discover models on this machine, and verify each integration. Let me handle provider logins directly. Record results in SETUP-REPORT.md, with VERIFIED, BLOCKED or NOT REQUESTED for each component. Do not provision paid services, activate messaging agents, or copy anyone else’s credentials or personal data.

See [START-HERE](START-HERE.md) for commands and [PLAYBOOK](PLAYBOOK.md) for the complete sequence. The bootstrap stages an isolated setup and installs the core CLIs; an agent completes login-dependent integrations. This is not a signed-in machine image.

## What is here

| Read | Purpose |
| --- | --- |
| [Architecture](docs/architecture.md) | How BB, harnesses, models, tools and memory fit together |
| [Machine snapshot](docs/machine-snapshot.md) | Observed versions, plugins, exceptions and unfinished work |
| [All models](docs/models.md) | Every catalog entry returned by this machine’s four BB providers |
| [Choosing a harness](docs/harness-routing.md) | Practical task routing, without invented benchmark claims |
| [Daily workflow](docs/daily-workflow.md) | Scope → build → inspect → review → handoff |
| [Coding and reviews](docs/coding.md) | Worktrees, independent review, evidence and PRs |
| [Videos and visual artifacts](docs/video.md) | Script, narration, imagery, render and playback checks |
| [Documents and research](docs/documents-and-research.md) | Evidence into useful, inspectable artifacts |
| [The agent team](docs/agent-team.md) | William, mail triage, reporters and work-context separation |
| [Skills and instructions](docs/skills.md) | What to put in a skill, AGENTS.md, ADR or handoff |
| [Guardrails and privacy](docs/security.md) | Credentials, permissions, publication and outbound actions |
| [Remote access and recovery](docs/operations.md) | Downloads, laptop sleep, schedules and optional VPS |
| [Evidence and limitations](docs/evidence.md) | What was inspected and what has not been verified |
| [Templates](templates/README.md) | Copyable task briefs, handoffs and agent contracts |

## Snapshot: 7 October 2026

BB 0.42.1 returned **168 catalog entries** across four harnesses: **Pi 144**, Claude Code 14, Codex 4, Cursor 6. Pi’s entries were 140 OpenRouter routes and four xAI routes. These are selectable catalog entries, not 168 distinct underlying models or 168 successful inference tests. Authentication, quota, balance and provider terms still govern access.

The installation recipe uses repo-local tools and fresh private state. The actual machine evolved over time and has home-directory CLI installations too; [the snapshot](docs/machine-snapshot.md) records those differences honestly.

## Provenance

Built from a local portable-playbook ZIP, live BB discovery, setup decisions, saved artifact sources, and a scan of the locally accessible Claude Code/Codex transcript archives. Public examples are rewritten summaries. Raw transcripts, private agent memory, employer code, account identifiers and credentials are excluded.

Inspired by David Ondrej’s setup and skills. See [third-party notices](THIRD-PARTY-NOTICES.md). By [Miguel Alvarado / Artesano](https://artesano.build/).
