> Original narration, preserved for accessibility. Read [the corrections](README.md#corrections-to-the-original-narration), especially the historical model tally and guard-coverage claims.

# My bb setup in two minutes

## My agent control room

I run a small fleet of AI coding agents from a single browser tab. This is my bb setup: how I built it, how I use it, and why it is worth it.

## Four harnesses, 169 models

bb is a control room for coding agents. A project is a repo. A thread is one agent on one task. Each thread picks one of four harnesses: Claude Code, Codex, Cursor, or Pi. And one of one hundred sixty nine models, from Opus and GPT to DeepSeek and Grok. All in one project, with shared context.

## Shared or isolated?

Someone on X asked: do the agents share a worktree, or does bb isolate their edits? Both, and I choose per thread. An environment is either the shared checkout or an isolated worktree on its own branch. A coder and a reviewer can share one. Isolated threads get a branch, and bb merges when I say so.

## How I set it up

Everything lives in one folder: Coding, AI-native. bb, Codex, Pi, skills, hooks, plugins, docs. Nothing global. bb runs on my Claude Max subscription, and my API key is hidden from every agent shell.

## Guardrails first

Before any agent got autonomy, I installed one guard hook. It blocks recursive deletes, force pushes, and curl piped to shell, across every harness. Three hundred and two tests pass.

## Skills I actually use

Repeatable work is a skill. Total review runs a Fable and a GPT reviewer side by side and merges the findings. Ask then build interviews me before code. ADR verbatim records a decision in my words.

## My daily loop

I start in Claude Code in the terminal. When a task outgrows one session, I say: move this to bb. Rules go to the agents file, state to a handoff doc, and a bb thread picks it up cold.

## From my phone

Remote access is Tailscale: my phone and laptop share a private tailnet, and Tailscale Serve exposes bb to that tailnet only. Never the LAN, never public.

## Why it is worth it

Parallel agents, no lost context. Every decision has an ADR. Files preview and download on my phone. And one zip rebuilds the whole setup on another machine.

## What is next

Next: Herdr, a VPS, and agents that keep running when my laptop sleeps. The playbook is in the repo. Follow along.
