# Guardrails, credentials and publication

## Private state is outside the public source

Keep provider auth, BB databases, env files, session transcripts, personal assistant memory, messages, account identifiers and employer data out of this repo. `.gitignore` helps prevent accidents but is not a review. Inspect the exact staged files and new Git history before pushing.

This publication uses a new repository with selected source files and rewritten examples. It does not push the original workstation repository’s history.

## Subscription-first launchers

The portable launch environment removes inherited `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN` and `OPENAI_API_KEY` after loading an optional private `.env.agent-keys`. That reduces accidental selection of metered API authentication in this setup. It does not establish entitlement or prevent every alternate billing route.

Pi can use its own supported provider login flows. OpenRouter access needs the new user’s own configured credentials and sufficient balance. The source’s direct xAI and OpenRouter routes must not be treated as the same account or billing path. Confirm current terms in the provider UI.

Never print key values to debug auth. Inspect presence, selected auth mode and successful read-only behavior. Shell startup files may reintroduce variables after a launcher removes them; verify a real BB thread and terminal separately.

## Command guard

The payload includes a shell-pattern denylist and its regression suite. It can catch known dangerous command patterns, but is not an OS sandbox and does not cover arbitrary code, all write tools or every encoding of a command. The included guard’s jq dependency matters: its historical implementation can fail open if jq is absent.

Bootstrap registers the Claude Bash hook only in a new isolated profile. It does not prove every other harness invokes the guard. Inspect current supported hooks/policies, preserve existing settings, and test each integration with a harmless denied sentinel. Never run a real destructive command as a test.

Pi’s official documentation states it has no built-in permission system restricting filesystem/process/network/credential access. Use appropriate external isolation for stronger boundaries. [Pi permissions documentation](https://github.com/earendil-works/pi#permissions--containerization).

## Actions and accounts

Keep personal and work Git identities separate. An instruction to document a workflow does not grant permission to run its production writes. Templates do not enable email/chat delivery, database mutations, purchases or scheduler cutovers. Set those scopes explicitly for the new owner.

## Public review

Run `python3 scripts/check-public.py`. It checks common credential patterns, forbidden runtime paths and local Markdown links in first-party docs. It is a useful preflight, not a proof that no private material exists. Human review of examples, metadata and staged files remains necessary.
