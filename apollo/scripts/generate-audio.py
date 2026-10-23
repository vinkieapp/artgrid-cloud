"""Regenerate the two prepared narration bundles offline.
Requires piper-tts, ffmpeg and the four models credited in public/audio/CREDITS.txt.
Set ARTGRID_VOICE_DIR to a directory containing each .onnx and .onnx.json pair.
No user data, runtime synthesis service or model files are deployed.
"""
import os,json,wave,subprocess,tempfile
from pathlib import Path
from piper import PiperVoice,SynthesisConfig
import onnxruntime
onnxruntime.disable_telemetry_events()
ROOT=Path(__file__).resolve().parent.parent
rows=json.loads(subprocess.check_output(['node','scripts/narration-states.mjs'],cwd=ROOT))
model_dir=Path(os.environ.get('ARTGRID_VOICE_DIR','/tmp/artgrid-voices'))
models={'en':{'apollo':'en_US-john-medium','athena':'en_US-ljspeech-medium'},'fr':{'apollo':'fr_FR-upmc-medium','athena':'fr_FR-siwis-medium'}}
out=ROOT/'public/audio';out.mkdir(exist_ok=True)
manifest={}
with tempfile.TemporaryDirectory(prefix='artgrid-audio-') as tmp:
 for lang in ['en','fr']:
  voices={c:PiperVoice.load(model_dir/(name+'.onnx')) for c,name in models[lang].items()}
  bundle=Path(tmp)/(lang+'.wav');offset=0
  with wave.open(str(bundle),'wb') as total:
   total.setnchannels(1);total.setsampwidth(2);total.setframerate(22050)
   for i,row in enumerate(r for r in rows if r['lang']==lang):
    clip=Path(tmp)/'clip.wav'
    config=SynthesisConfig(speaker_id=1 if lang=='fr' and row['character']=='apollo' else None)
    with wave.open(str(clip),'wb') as f:voices[row['character']].synthesize_wav(row['text'],f,config)
    with wave.open(str(clip),'rb') as f:
     assert f.getframerate()==22050
     data=f.readframes(f.getnframes());duration=f.getnframes()/22050
    manifest[lang+'|'+row['character']+'|'+row['text']]=[round(offset,5),round(offset+duration,5)]
    total.writeframes(data);total.writeframes(b'\0\0'*22050);offset+=duration+1
    if i%10==0:print(lang,i,flush=True)
  subprocess.run(['ffmpeg','-v','error','-y','-i',str(bundle),'-codec:a','libmp3lame','-b:a','32k',str(out/(lang+'.mp3'))],check=True)
  print(lang,'done',offset,flush=True)
(ROOT/'public/audio-manifest.mjs').write_text('// Generated from fixed public narration. Offsets in seconds.\nexport const clips='+json.dumps(manifest,ensure_ascii=False,separators=(',',':'))+';\n')
