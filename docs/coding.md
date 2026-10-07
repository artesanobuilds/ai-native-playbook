# Coding, reviews and multi-agent work

## A repeatable implementation task

1. State the concrete behavior to change and a meaningful verification.
2. Read repo instructions and inspect the existing implementation.
3. Use an isolated branch/worktree when another task may touch the same files.
4. Implement a coherent change; run checks appropriate to its risk.
5. Have an independent reviewer examine substantial changes.
6. Triage findings: fix defects, explain deliberate tradeoffs, discard unsupported speculation.
7. Present the result, validation and limitations. Publish a PR only within the user’s requested scope.

Local history includes repository reconnaissance, migration planning, backward-compatibility concerns, PR preparation and environment repair. Those patterns are generalized here; employer repository content and operational identifiers are excluded.

## A useful split

For a feature, assign one worker the API contract, another an independent UI component, and a reviewer the integrated diff. Specify owned files, dependencies and how findings return. If all workers need the same file, keep that part sequential or consolidate ownership.

The coordinator retains the goal and integrates results. A worker’s completion message is not proof the integrated application works. Run the final checks after integration. Bound concurrency to the host’s capacity and subscription limits.

## Two-model review

The selected skills include `total-review`, `fable-review` and `gpt-review`. Their filenames preserve historical model naming. Inspect their instructions, resolve real model IDs through BB, and check whether historical helper commands such as `/nagent` exist. Do not silently substitute an unavailable reviewer or claim both ran.

A useful review prompt:

> Review this diff independently. Focus on correctness, regressions and missing validation. For each finding give severity, file and location, failure scenario, and a proposed fix. Distinguish confirmed defects from questions. Do not edit files.

A useful synthesis prompt:

> Merge both reviews, deduplicate overlapping findings and verify each against the code. Fix clear defects, run relevant checks, and report any unresolved decision.

## Worktree readiness

Use BB’s installed `guide environments`. A repo-specific setup hook should restore only needed dependencies and local files. Verify a fresh worktree can build. Avoid automatically copying production credentials into every worktree. Shared database state, occupied ports and ignored assets can still collide even when Git files are isolated.
