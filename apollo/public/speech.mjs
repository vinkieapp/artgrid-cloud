// Only device-local synthesis is permitted as a fallback. Prepared audio is same-origin.
export const localVoice=(voices,lang,character='apollo')=>{const matches=voices.filter(v=>v.localService===true&&v.lang?.toLowerCase().split(/[-_]/)[0]===lang);return matches[character==='athena'&&matches.length>1?1:0]||null;};
export function createReader(synth,Utterance,onStatus=()=>{},options={}){
 let token=0,muted=false,active=null,utterance=null;
 const audios=new Map();
 const stop=()=>{token++;active?.pause();active=null;utterance=null;synth?.cancel();onStatus(muted?'muted':'ready')};
 return {stop,isMuted:()=>muted,setMuted(value){muted=!!value;stop()},available(lang){return !!(options.Audio&&options.clips&&Object.keys(options.clips).some(k=>k.startsWith(lang+'|')))||(!!(synth&&Utterance&&localVoice(synth.getVoices(),lang)))},read(text,lang,character='apollo'){
 stop();if(muted){onStatus('muted');return false}const current=token;
 const clip=options.clips?.[lang+'|'+character+'|'+text];
 if(clip&&options.Audio){
  let audio=audios.get(lang);if(!audio){audio=new options.Audio();audio.preload='none';audio.src=new URL('./audio/'+lang+'.mp3',import.meta.url).href;audios.set(lang,audio)}
  active=audio;let positioned=false;
  const valid=()=>current===token;
  const position=()=>{if(!valid()||positioned)return;try{audio.currentTime=clip[0];positioned=true}catch{}};
  const fail=()=>{if(valid()){audio.pause();onStatus('error')}};
  audio.onloadedmetadata=position;
  audio.onplaying=()=>{if(valid()){position();onStatus('speaking')}};
  audio.ontimeupdate=()=>{if(valid()&&positioned&&audio.currentTime>=clip[1]){audio.pause();onStatus('ready')}};
  audio.onended=()=>{if(valid())onStatus('ready')};audio.onerror=fail;
  onStatus('loading');if(audio.readyState>=1)position();
  // Deliberately synchronous inside the original tap, never after a fetch/await.
  try{const started=audio.play();started?.then(()=>{if(valid())onStatus('speaking')}).catch(fail)}catch{fail();return false}
  return true;
 }
 const voice=synth&&Utterance&&localVoice(synth.getVoices(),lang,character);if(!voice){onStatus('unavailable');return false}
 utterance=new Utterance(text);utterance.voice=voice;utterance.lang=voice.lang;utterance.rate=.92;
 utterance.onstart=()=>{if(current===token)onStatus('speaking')};utterance.onend=()=>{if(current===token){utterance=null;onStatus('ready')}};utterance.onerror=()=>{if(current===token){utterance=null;onStatus('error')}};
 onStatus('loading');try{synth.resume?.();synth.speak(utterance)}catch{onStatus('error');return false}return true;
 }}
}
