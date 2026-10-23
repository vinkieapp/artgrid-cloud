// Optional mount in the existing Node SSR server, before website.handle().
// Keep this entire folder outside the public static asset directory.
import {handle} from './server.mjs';
export async function handleArtGuide(request){const u=new URL(request.url);if(u.pathname!=='/learn'&&!u.pathname.startsWith('/learn/'))return null;u.pathname=u.pathname.slice('/learn'.length)||'/';const response=await handle(new Request(u,{method:request.method,headers:request.headers}));if(!response.headers.get('content-type')?.startsWith('text/html'))return response;const html=(await response.text()).replaceAll('href="/style.css"','href="/learn/style.css"').replaceAll('href="/nojs.css"','href="/learn/nojs.css"').replaceAll('src="/client.mjs"','src="/learn/client.mjs"').replaceAll('href="/audio/','href="/learn/audio/').replaceAll('src="/images/','src="/learn/images/');return new Response(html,{status:response.status,headers:response.headers});}

