# Publication validation

Date: 2026-10-07

- Bootstrap staging test: passed dry-run no-write behavior, fresh staging in a path with spaces, generated shell syntax, repeat staging, existing-profile preservation, conflicting-file refusal, unlisted-payload rejection and checksum-tamper rejection.
- Shell guard regression suite: 302 passed, zero failed.
- Public preflight: passed common credential-pattern, private-path and first-party Markdown link checks. Windows fixture paths in the vendored Files plugin were inspected and retained as generic test data.
- Included video demo: rendered locally using the source machine’s existing Kokoro environment; ffprobe confirms a 1280×720 video stream, an audio stream and 4.565-second duration. Title-card image visually inspected. This validates the example on this host, not fresh dependency installation or end-to-end listening.
- Live model discovery: four providers, 168 catalog entries, including 144 Pi routes.
- Office fixture privacy check: inspected XML contents and metadata inside the bundled DOCX/PPTX/XLSX files; contents are generic parser fixtures.
- Manual content review: first-party prose uses generalized examples; raw local transcripts and private agent state are excluded.

The first guard run failed because ZIP extraction had not preserved executable bits on shell scripts. Executable modes were restored before rerunning. The suite checks command classification and does not execute the destructive strings used as test inputs.

Not performed: a clean-machine package installation, new account logins, inference against every catalog model, per-harness runtime guard invocation, a full re-render of historical videos, remote-client download testing, or Herdr/VPS deployment. These remain destination-machine checks in the setup report.
