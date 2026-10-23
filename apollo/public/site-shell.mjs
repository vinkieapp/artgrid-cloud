import {mountStudio} from '/studio/client.mjs';
const dialog=document.querySelector('#studio-dialog'),host=document.querySelector('#studio-host');
if(!host.shadowRoot){const template=host.querySelector('template');host.attachShadow({mode:'open'}).append(template.content.cloneNode(true));template.remove();}
const app=host.shadowRoot.querySelector('#app'),closeButton=document.querySelector('#studio-close');
let returnFocus=null;
const controller=mountStudio(app,state=>{const u=new URL(location.href);u.searchParams.set('guide',state.character);u.searchParams.set('lang',state.lang);history.replaceState(history.state,'',u);closeButton.textContent=state.lang==='fr'?'Fermer le studio ×':'Close studio ×';});
const isStudio=()=>location.pathname.startsWith('/studio')||new URL(location.href).searchParams.has('guide');
function show(url,push=false){if(push){returnFocus=document.activeElement;history.pushState({artgridStudio:true,returnURL:location.pathname+location.search+location.hash},'',url);}const u=new URL(url,location.href);controller.open(u.searchParams.get('guide'),u.searchParams.get('lang'));closeButton.textContent=u.searchParams.get('lang')==='fr'?'Fermer le studio ×':'Close studio ×';if(!dialog.open)dialog.showModal();closeButton.focus();}
function hide(){controller.close();if(dialog.open)dialog.close();returnFocus?.focus();}
function close(){if(history.state?.artgridStudio){history.back();}else{history.replaceState(null,'','/#art-studio');hide();}}
closeButton.addEventListener('click',close);dialog.addEventListener('cancel',e=>{e.preventDefault();close();});
dialog.addEventListener('click',e=>{if(e.target===dialog)close();});
host.shadowRoot.addEventListener('click',e=>{const a=e.target.closest('a');if(a?.getAttribute('href')==='/'){e.preventDefault();close();}});
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;const u=new URL(a.href);if(u.origin!==location.origin||!['/studio','/studio/'].includes(u.pathname))return;e.preventDefault();show(u,true);});
window.addEventListener('popstate',()=>{if(isStudio())show(location.href);else hide();});
if(dialog.dataset.open==='true')show(location.href);
