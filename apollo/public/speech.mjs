// Only device-local synthesis is permitted as a fallback. Prepared audio is same-origin.
export const localVoice=(voices,lang,character='apollo')=>{const matches=voices.filter(v=>v.localService===true&&v.lang?.toLowerCase().split(/[-_]/)[0]===lang);return matches[character==='athena'&&matches.length>1?1:0]||null;};
export function createReader(synth,Utterance,onStatus=()=>{},options={}){
 let token=0,muted=false,paused=false,active=null,utterance=null;
 const audios=new Map();
 const stop=()=>{token++;paused=false;active?.pause();active=null;utterance=null;synth?.cancel();onStatus(muted?'muted':'ready')};
 return {stop,isPaused:()=>paused,pause(){if(!active&&!utterance)return false;paused=true;active?.pause();if(utterance)synth?.pause?.();onStatus('paused');return true},resume(){if(!paused||muted)return false;paused=false;const current=token;onStatus('loading');if(active){try{const started=active.play();started?.then(()=>{if(current===token&&!paused)onStatus('speaking')}).catch(()=>{if(current===token&&!paused)onStatus('error')})}catch{onStatus('error');return false}}else if(utterance){synth?.resume?.()}return true},isMuted:()=>muted,setMuted(value){muted=!!value;stop()},available(lang){return !!(options.Audio&&options.clips&&Object.keys(options.clips).some(k=>k.startsWith(lang+'|')))||(!!(synth&&Utterance&&localVoice(synth.getVoices(),lang)))},read(text,lang,character='apollo'){
 stop();if(muted){onStatus('muted');return false}const current=token;
 const clip=options.clips?.[lang+'|'+character+'|'+text];
 if(clip&&options.Audio){
  let audio=audios.get(lang);if(!audio){audio=new options.Audio();audio.preload='none';audio.src=new URL('./audio/'+lang+'.mp3',import.meta.url).href;audios.set(lang,audio)}
  active=audio;const ranges=Array.isArray(clip[0])?clip:[clip];let part=0,positioned=false;
  const valid=()=>current===token;
  const position=()=>{if(!valid()||positioned)return;try{audio.currentTime=ranges[part][0];positioned=true}catch{}};
  const fail=()=>{if(valid()&&!paused){audio.pause();active=null;paused=false;onStatus('error')}};
  audio.onloadedmetadata=position;
  audio.onplaying=()=>{if(valid()&&!paused){position();onStatus('speaking')}};
  audio.ontimeupdate=()=>{if(valid()&&!paused&&positioned&&audio.currentTime>=ranges[part][1]){if(part+1<ranges.length){part++;positioned=false;position()}else{audio.pause();active=null;onStatus('ready')}}};
  audio.onended=()=>{if(valid()){active=null;onStatus('ready')}};audio.onerror=fail;
  onStatus('loading');if(audio.readyState>=1)position();
  // Deliberately synchronous inside the original tap, never after a fetch/await.
  try{const started=audio.play();started?.then(()=>{if(valid()&&!paused)onStatus('speaking')}).catch(fail)}catch{fail();return false}
  return true;
 }
 const voice=synth&&Utterance&&localVoice(synth.getVoices(),lang,character);if(!voice){onStatus('unavailable');return false}
 utterance=new Utterance(text);utterance.voice=voice;utterance.lang=voice.lang;utterance.rate=.92;
 utterance.onresume=()=>{if(current===token&&!paused)onStatus('speaking')};utterance.onstart=()=>{if(current===token&&!paused)onStatus('speaking')};utterance.onend=()=>{if(current===token){utterance=null;onStatus('ready')}};utterance.onerror=()=>{if(current===token){utterance=null;onStatus('error')}};
 onStatus('loading');try{synth.resume?.();synth.speak(utterance)}catch{onStatus('error');return false}return true;
 }}
}
