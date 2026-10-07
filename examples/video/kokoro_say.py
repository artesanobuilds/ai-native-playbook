"""Local text-to-speech with Kokoro-82M (Apache 2.0) via kokoro-onnx (MIT). No cloud.
Usage: tts/venv/bin/python tts/kokoro_say.py -v af_heart -o out.wav "text"
Voices: af_heart af_bella am_michael am_fenrir bm_george bm_fable ... (see voices-v1.0.bin)
"""
from pathlib import Path
import argparse, numpy as np, soundfile as sf
H=Path(__file__).resolve().parent
_model=None
def model():
 global _model
 if _model is None:
  from kokoro_onnx import Kokoro
  _model=Kokoro(str(H/'kokoro/kokoro-v1.0.onnx'),str(H/'kokoro/voices-v1.0.bin'))
 return _model
def speak(text,voice='af_heart',speed=1.0,lang='en-us'):
 a,sr=model().create(text,voice=voice,speed=speed,lang=lang)
 a=np.asarray(a,dtype=np.float32);thr=.01*np.max(np.abs(a));i=np.where(np.abs(a)>thr)[0]
 return a[max(0,i[0]-int(sr*.05)):i[-1]+int(sr*.12)],sr
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('-v','--voice',default='af_heart');p.add_argument('-s','--speed',type=float,default=1.0);p.add_argument('-l','--lang',default='en-us');p.add_argument('-o','--out',required=True);p.add_argument('text')
 x=p.parse_args();a,sr=speak(x.text,x.voice,x.speed,x.lang);sf.write(x.out,a,sr,subtype='PCM_16');print(x.out,round(len(a)/sr,2),'s')
