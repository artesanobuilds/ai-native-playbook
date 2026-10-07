# A small local narration demo

This example renders a short narrated title card. It demonstrates the pipeline, not the finished two-minute source videos.

Create a Python virtual environment in your private installation root and install `kokoro-onnx`, `soundfile`, `numpy` and `pillow`. Install FFmpeg with ffprobe through a supported platform method. Obtain `kokoro-v1.0.onnx` and `voices-v1.0.bin` from the model/library’s official distribution, verify available digests, and put them in `kokoro/` next to this helper. Model weights are not in this repo.

Run the example with that venv’s Python:

```bash
python render_demo.py --out work/demo.mp4
ffprobe -v error -show_entries stream=codec_type,width,height -show_entries format=duration -of json work/demo.mp4
```

Listen to the clip and inspect the image. For real production, replace the title card with timed scenes and captions. Keep scripts and timing files; keep generated media and model weights out of Git. This demo has narration only; add licensed music and effects deliberately.
