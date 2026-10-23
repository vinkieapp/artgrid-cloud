import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {handle as studioHandle} from './server.mjs';
import {initial,render,fallback} from './public/guide.mjs';
const siteFiles=new Map(['style.css','animation.js','charm-design-previews.png','chichen-itza.PNG','christ-redeemer.PNG','colosseum.PNG','great-wall.PNG','machu-picchu.PNG','petra.PNG','taj-mahal.PNG'].map(x=>['/'+x,new URL('../'+x,import.meta.url)]));
for(const x of ['site-shell.mjs','site-shell.css'])siteFiles.set('/'+x,new URL('./public/'+x,import.meta.url));
const headers={'Content-Security-Policy':"default-src 'self'; connect-src 'none'; img-src 'self' data:; media-src 'self'; style-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",'Referrer-Policy':'no-referrer','Permissions-Policy':'camera=(), microphone=(), geolocation=()','X-Content-Type-Options':'nosniff','Cache-Control':'no-store'};
const response=(body,type,method,status=200)=>new Response(method==='HEAD'?null:body,{status,headers:{...headers,'Content-Type':type}});
export async function handleSite(req){
 const url=new URL(req.url),path=url.pathname;
 if(!['GET','HEAD'].includes(req.method))return response('Method not allowed','text/plain',req.method,405);
 if(path==='/health')return response('ok','text/plain',req.method);
 if(path.startsWith('/studio/') && path!=='/studio/'){
  url.pathname=path.slice('/studio'.length);
  const result=await studioHandle(new Request(url,{method:req.method,headers:req.headers}));
  if(url.pathname==='/style.css'&&req.method!=='HEAD')return response((await result.text()).replaceAll(':root',':host').replace(/\bbody\{/g,':host{'),'text/css',req.method,result.status);
  return result;
 }
 if(['/','/index.html','/studio','/studio/','/learn','/learn/'].includes(path)){
  const lang=url.searchParams.get('lang')==='fr'?'fr':'en',character=url.searchParams.get('guide')==='athena'?'athena':'apollo';
  const standalone=path==='/learn'||path==='/learn/';
  if(standalone){const target=new URL(req.url);target.pathname='/studio';return new Response(null,{status:302,headers:{...headers,Location:target.pathname+target.search}});}
  const opened=path.startsWith('/studio')||url.searchParams.has('guide');
  let html=await readFile(new URL('../index.html',import.meta.url),'utf8');
  const dialog=`<dialog id="studio-dialog" aria-label="Artgrid Studio" data-open="${opened}" data-guide="${character}" data-lang="${lang}"><button id="studio-close" type="button" aria-label="Close studio">${lang==='fr'?'Fermer le studio':'Close studio'} ×</button><div id="studio-host"><template shadowrootmode="open"><link rel="stylesheet" href="/studio/style.css"><div id="app" data-guide="${character}" data-lang="${lang}">${render({...initial(),lang,character})}</div></template></div></dialog><noscript><section class="studio-nojs"><h2>Artgrid Studio</h2>${fallback(lang)}</section></noscript>`;
  html=html.replace('<!-- ARTGRID_STUDIO -->',dialog);
  return response(html,'text/html; charset=utf-8',req.method);
 }
 const file=siteFiles.get(path);if(!file)return response('Not found','text/plain',req.method,404);
 const type=/\.css$/.test(path)?'text/css':/\.(js|mjs)$/.test(path)?'text/javascript':'image/png';
 return response(await readFile(file),type,req.method);
}
if(process.argv[1]===fileURLToPath(import.meta.url))createServer(async(req,res)=>{try{const r=await handleSite(new Request('http://localhost'+req.url,{method:req.method,headers:req.headers}));res.writeHead(r.status,Object.fromEntries(r.headers));res.end(Buffer.from(await r.arrayBuffer()));}catch{res.writeHead(500);res.end('Unavailable');}}).listen(Number(process.env.PORT||3000),'0.0.0.0');
