import { initial, transition, render } from './guide.mjs';
let state={...initial(),lang:document.documentElement.lang==='fr'?'fr':'en'};
const root=document.querySelector('#app');
root.addEventListener('click',event=>{const button=event.target.closest('button[data-action]');if(!button)return;const {action,value}=button.dataset;state=transition(state,action,value);document.documentElement.lang=state.lang;root.innerHTML=render(state);if(['start','next','back','resume','pause','exit','cancel','reset'].includes(action)){root.querySelector('#stage-title')?.focus();}else{root.querySelector(`button[data-action="${action}"][data-value="${value||''}"]`)?.focus();}});
