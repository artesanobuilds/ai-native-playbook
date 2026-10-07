# Videos, narration and visual explanations

The coding harness acts as a producer and tool operator. It writes scripts, prepares visual assets, generates or synthesizes speech, builds a timeline, renders with media tools and checks playback.

## Observed examples

The [short-form walkthrough MP3 and transcript](../media/README.md) are included for readers who want to listen. The revised narration incorporates the audited model count and corrected setup claims.

The source workspace contains a 16:9 explanation of the BB architecture and a vertical two-minute setup video, with narration Markdown, Python render scripts, timing JSON, captions and MP4 outputs. Local transcripts also show a community-awareness video evolving from storyline and planning documents into a synthetic preview, followed by corrections to missing imagery and wording.

Those source projects are evidence of the workflow; private branding, correspondence and media are not included here. The small [video example](../examples/video/README.md) gives a reproducible starting point.

## Production sequence

1. Define audience, duration, aspect ratio and intended next action.
2. Write the narration before polishing animation. Read it aloud for length and tone.
3. Make a scene list: narration, visual, duration and transition for each scene.
4. Generate or select authorized imagery. Keep attribution and asset provenance.
5. Render voice clips. The local setup uses Kokoro-82M through `kokoro-onnx`; a voice is a configurable parameter, not a reason to rewrite the video.
6. Build a timeline from actual audio durations. Cache clips by text, voice and speed so edits only regenerate affected sections.
7. Render visuals and mix audio with FFmpeg. Produce captions from the same timeline.
8. Inspect frames throughout the video, listen to the audio, check the final frame and confirm streams/duration with ffprobe.
9. Verify playback and download through the actual BB client connection.

## Lessons from the local work

- A working audio track can hide a broken imagery layer. Sample multiple frames rather than checking only the file header.
- “Synthetic draft” is a useful label when voice and imagery are placeholders.
- Keep an editable script next to the final MP4; the user often asks for specific wording changes.
- Local TTS avoids a network call for each line. The source Python environment had a broken pip installation; rebuild a fresh working venv rather than copying that workaround.
- Font paths and platform speech tools are OS-specific. Choose available fonts and test them on the new host.
- Use BB’s existing download route. A server-side localhost URL may be unreachable from the phone or laptop running the browser.

Image/video service access is a separate integration. Pi’s text-model catalog alone does not grant image generation, stock-media rights or a video-rendering service.
