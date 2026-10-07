# Remote access, scheduling and recovery

## The browser and execution host may differ

A file on the agent’s host is not automatically a browser download. Use Files → Download or generate a route with `bb files download-link <workspace-relative-path>` in the owning thread. Resolve the actual paired BB browser origin, including port. Do not substitute the server’s internal localhost URL.

For an important binary deliverable, check the actual browser-facing response: success status, attachment disposition, size and checksum. If the current environment cannot verify the remote client path, say exactly what was tested. Preserve host/thread selection when different machines have same-named files.

## Existing connection before new infrastructure

The source BB has its Remote access plugin running. Use its supported authenticated pairing workflow. A private network such as Tailscale is an optional alternative where already configured. Do not expose the filesystem or start a per-file public server just to share one artifact.

Keep awake can help a plugged-in laptop remain available. It does not turn a sleeping or powered-off computer into an always-on server. Remote access and remote computation are different capabilities.

## Recurring work

Prefer a scheduler launching a one-shot bounded task. Record scheduled time, actual run time, outcome and next action. Handle overlapping runs, stale sources, retries and duplicate delivery. When migrating a role, disable the old scheduler before enabling the new one and keep a rollback plan.

## Optional Herdr / VPS phase

Herdr was planned, not verified as running in this inspection. Check its current official documentation before installation. Keep a dedicated named session, discover target panes, read before sending commands, and verify actual completion. Do not imply all harnesses share memory.

A VPS needs its own host authorization, credentials, quotas and supervision. Provisioning or paying for one is outside a generic workstation bootstrap. On an authorized host, test SSH reconnect and reboot recovery independently. A session surviving disconnect does not prove it survives reboot.

## Recovery and upgrades

Save a handoff before switching harnesses or compacting context. After restart, inspect persisted state and active processes before launching duplicates. Upgrade one component at a time, keep lockfiles, run its relevant checks and record a new ADR when the behavior changes.

To undo a new installation, stop its processes and back up private state first. Only remove files or symlinks created by that setup with the owner’s authorization. Never delete an existing home profile as a cleanup shortcut.
