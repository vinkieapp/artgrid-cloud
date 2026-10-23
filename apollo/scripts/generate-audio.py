"""Regenerate prepared narration bundles offline, deduplicating shared script parts.
Requires piper-tts, ffmpeg and the four models credited in public/audio/CREDITS.txt.
Set ARTGRID_VOICE_DIR to the .onnx/.onnx.json folder and ARTGRID_AUDIO_CACHE to
an optional PCM cache. No user data, synthesis service or models are deployed.
"""
import os,json,wave,subprocess,tempfile,hashlib,shutil
from pathlib import Path
from piper import PiperVoice,SynthesisConfig
import onnxruntime
onnxruntime.disable_telemetry_events()
ROOT=Path(__file__).resolve().parent.parent
rows=json.loads(subprocess.check_output(['node','scripts/narration-states.mjs'],cwd=ROOT))
model_dir=Path(os.environ.get('ARTGRID_VOICE_DIR','/tmp/artgrid-voices'))
cache=Path(os.environ.get('ARTGRID_AUDIO_CACHE','/tmp/artgrid-narration-cache'));cache.mkdir(exist_ok=True)
models={'en':{'apollo':'en_GB-northern_english_male-medium','athena':'en_GB-southern_english_female-low'},'fr':{'apollo':'fr_FR-upmc-medium','athena':'fr_FR-siwis-medium'}}
out=ROOT/'public/audio';out.mkdir(exist_ok=True)
selected=os.environ.get('ARTGRID_LANGUAGES','en,fr').split(',')
assert selected and all(x in ['en','fr'] for x in selected)
manifest={}
if set(selected)!={'en','fr'}:
 old=json.loads((ROOT/'public/audio-manifest.mjs').read_text().split('export const clips=')[1].rstrip(';\n'))
 manifest={k:v for k,v in old.items() if k.split('|')[0] not in selected}
staged=[]
with tempfile.TemporaryDirectory(prefix='artgrid-audio-') as tmp:
 for lang in selected:
  voices={};ranges={};bundle=Path(tmp)/(lang+'.wav');offset=0;created=0;reused=0
  with wave.open(str(bundle),'wb') as total:
   total.setnchannels(1);total.setsampwidth(2);total.setframerate(22050)
   for row in (r for r in rows if r['lang']==lang):
    parts=[]
    for text in row['parts']:
     key=lang+'|'+row['character']+'|'+text
     if key not in ranges:
      profile=('northern-brisk107-pitch1-v1' if row['character']=='apollo' else 'southern-original-v1') if lang=='en' else ''
      cache_key=profile+'|'+key if profile else key
      clip=cache/(hashlib.sha256(cache_key.encode()).hexdigest()+'.wav')
      if not clip.exists():
       if row['character'] not in voices:voices[row['character']]=PiperVoice.load(model_dir/(models[lang][row['character']]+'.onnx'))
       config=SynthesisConfig(speaker_id=1 if lang=='fr' and row['character']=='apollo' else None)
       raw=Path(tmp)/'raw.wav'
       with wave.open(str(raw),'wb') as f:voices[row['character']].synthesize_wav(text,f,config)
       # Selected Apollo preview used 0.85x raw tempo; user then requested +7% and +1 semitone.
       filters='asetrate=23361.109,aresample=22050,atempo=0.858453687384' if lang=='en' and row['character']=='apollo' else 'aresample=22050'
       subprocess.run(['ffmpeg','-v','error','-y','-i',str(raw),'-af',filters,str(clip)],check=True)
       created+=1
      else:reused+=1
      with wave.open(str(clip),'rb') as f:
       assert f.getframerate()==22050
       data=f.readframes(f.getnframes());duration=f.getnframes()/22050
      ranges[key]=[round(offset,5),round(offset+duration,5)]
      total.writeframes(data);total.writeframes(b'\0\0'*22050);offset+=duration+1
      if len(ranges)%10==0:print(lang,'unique parts',len(ranges),'new',created,'cached',reused,flush=True)
     parts.append(ranges[key])
    manifest[lang+'|'+row['character']+'|'+row['text']]=parts
  subprocess.run(['ffmpeg','-v','error','-y','-i',str(bundle),'-codec:a','libmp3lame','-b:a','32k',str(Path(tmp)/(lang+'.mp3'))],check=True)
  staged.append((Path(tmp)/(lang+'.mp3'),out/(lang+'.mp3')))
  print(lang,'done',offset,'parts',len(ranges),'new',created,'cached',reused,flush=True)
 for source,target in staged:shutil.copyfile(source,target)
(ROOT/'public/audio-manifest.mjs').write_text('// Generated from fixed public narration. Ordered clip ranges, seconds.\nexport const clips='+json.dumps(manifest,ensure_ascii=False,separators=(',',':'))+';\n')
