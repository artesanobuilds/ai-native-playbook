# Listen to the setup walkthrough

[Open the MP3](https://raw.githubusercontent.com/artesanobuilds/ai-native-playbook/0ac62145bc002421ba15f8318a11091abb2a007c/media/my-bb-setup.mp3) · [MP3 in the repo](my-bb-setup.mp3) · [Transcript](transcript.md)

**2 minutes 16 seconds.** This is the audio from the “Describe short-form video” thread in the AI-native project, covering the control room, harnesses, worktrees, skills, handoffs, Tailscale access and the next steps. The saved original was an MP4; this MP3 was extracted from its audio track for easy listening.

The voice is locally generated Kokoro narration, with the original synthesized background score. It is synthetic narration, not a recording of Miguel’s voice. No third-party video audio is included.

The direct link opens an audio resource; playback or download behavior depends on the browser. For a local player, clone/download the repo and open [listen.html](listen.html) in your browser. GitHub’s source view does not run that HTML page.

## Corrections to the original narration

This recording preserves the source video’s wording. Read these alongside it:

- **“169 models” was a raw menu tally from that thread, not a unique-model count.** The playbook’s saved 168-entry snapshot resolves to **137 model choices across four harnesses**, with the rules and overlaps in [the model audit](../docs/model-count.md). The historical tally differs by one entry; it is not the source of the current count.
- **“All in one project, with shared context”** means agents can work in the same project and read shared files. Each thread has its own conversation context; handoffs and instructions make continuity explicit.
- **“Nothing global”** describes the installation direction. The actual machine has system/home-directory exceptions, including Tailscale. [Machine snapshot](../docs/machine-snapshot.md).
- **“BB runs on my Claude Max subscription”** is shorthand for Claude Code authentication. Each harness/provider has its own authentication, entitlement and billing route.
- **“Across every harness”** overstates guard coverage established here. The shell guard suite passed 302 tests; runtime enforcement must be verified for each harness. [Guard scope](../docs/security.md).
- **“One zip rebuilds the whole setup”** describes the portable approach. New machines still need dependencies, fresh logins and integration checks; a complete clean-machine install has not been verified for this publication.

For the current setup, use the written playbook. For Tailscale commands, follow [the guide based on the actual configuration](../docs/tailscale.md).

## Artifact details

- Source: the locally generated short-form setup video, snapshot dated 2026-10-07.
- Published format: MP3, 160 kb/s, stereo, 48 kHz; approximately 2.7 MB.
- Extraction: FFmpeg audio-only transcode; source metadata removed and replaced with a title, creator and provenance note.
- Verification: full-file audio decode and codec/duration inspection. No new narration was generated for this extraction.
