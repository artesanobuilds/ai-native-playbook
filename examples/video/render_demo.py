#!/usr/bin/env python3
"""Tiny end-to-end demo: local speech -> title card -> H.264/AAC video."""
from pathlib import Path
import argparse,subprocess
from PIL import Image,ImageDraw,ImageFont
import soundfile as sf
from kokoro_say import speak
p=argparse.ArgumentParser();p.add_argument('--out',type=Path,default=Path('work/demo.mp4'));args=p.parse_args()
args.out.parent.mkdir(parents=True,exist_ok=True)
audio,rate=speak('A model reasons. A harness gives it tools. B B organizes the work.')
wav=args.out.with_suffix('.wav');sf.write(wav,audio,rate)
card=Image.new('RGB',(1280,720),'#0d1620');d=ImageDraw.Draw(card)
# Pillow's bundled font avoids source-machine font paths.
f=ImageFont.load_default(size=54);small=ImageFont.load_default(size=30)
d.text((80,180),'AI Native Playbook',font=f,fill='#7fdcc9')
d.text((80,290),'Models + harnesses + tools + durable context',font=small,fill='white')
d.text((80,390),'Build. Inspect. Improve. Leave a handoff.',font=small,fill='#a9bec7')
frame=args.out.with_suffix('.png');card.save(frame)
subprocess.run(['ffmpeg','-y','-v','error','-loop','1','-i',str(frame),'-i',str(wav),'-c:v','libx264','-tune','stillimage','-pix_fmt','yuv420p','-r','24','-c:a','aac','-shortest','-movflags','+faststart',str(args.out)],check=True)
print(args.out)
