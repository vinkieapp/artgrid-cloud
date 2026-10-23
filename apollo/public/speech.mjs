// Only device-local voices explicitly reported by the browser are permitted.
export const localVoice=(voices,lang,character='apollo')=>{const matches=voices.filter(v=>v.localService===true&&v.lang?.toLowerCase().split(/[-_]/)[0]===lang);return matches[character==='athena'&&matches.length>1?1:0]||null;};
export function createReader(synth,Utterance,onStatus=()=>{}){
 let token=0,muted=false;
 const stop=()=>{token++;synth?.cancel();onStatus(muted?'muted':'ready')};
 return {stop,isMuted:()=>muted,setMuted(value){muted=!!value;stop()},available(lang){return !!(synth&&Utterance&&localVoice(synth.getVoices(),lang))},read(text,lang,character='apollo'){stop();if(muted){onStatus('muted');return false}const voice=synth&&Utterance&&localVoice(synth.getVoices(),lang,character);if(!voice){onStatus('unavailable');return false}const current=token;const utterance=new Utterance(text);utterance.voice=voice;utterance.lang=voice.lang;utterance.rate=.92;utterance.onend=()=>{if(current===token)onStatus('ready')};utterance.onerror=()=>{if(current===token)onStatus('error')};onStatus('speaking');synth.speak(utterance);return true}}
}
