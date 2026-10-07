# Instructions for an agent using this playbook

Read START-HERE.md and PLAYBOOK.md before installing anything. Treat documentation as a dated reference; use installed help and official upstream docs to resolve drift.

- Use one user-chosen root for tools, caches and new private state. No global npm/pip installs.
- Inventory first. Preserve existing settings and credentials. Use an empty target for bootstrap; merge existing setups deliberately.
- Keep credentials in provider login storage or a gitignored local env file. Never print, commit or copy them into prompts.
- Prefer supported subscription logins where the user has them. Never infer that every model route is covered by one subscription.
- BB catalogs are discovery evidence, not proof that inference works. Verify one read-only task per configured provider.
- Skills describe procedures. Historical model names and commands must be checked against the target host.
- Keep normal permission controls. A shell denylist is a supplemental guard, not a sandbox.
- Do not activate outbound mail/chat, recurring jobs, production access or paid infrastructure merely because a template describes them.
- Keep personal and work accounts, repos and data separate.
- For substantial changes, record the decision and verify the actual user-visible result. Leave a handoff with evidence and remaining limitations.
- Mark each setup item VERIFIED, BLOCKED or NOT REQUESTED. Never label an unrun check as passed.

This public repo is documentation and source templates. Do not add runtime state, transcripts, auth files, private evidence or SETUP-REPORT.md to it.
