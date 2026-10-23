// Original, code-native illustrations: simplified artistic interpretations, not architectural plans.
// All seven lessons share the same five-step drawing and painting sequence as wonder-lessons.mjs.
import { lessons, themeLabels } from './wonder-lessons.mjs';
const ink='#71586b', stone='#edd1a7', rose='#e5a99b', green='#a7bd98', blue='#c3dbe4', shade='#c1b3cb';
const P=(d,fill='none',stroke=ink,width=2.3,opacity=1)=>({d,fill,stroke,width,opacity});
const arch=(x,y,w,h)=>`M${x} ${y+h}V${y+w/2}Q${x+w/2} ${y-w/2} ${x+w} ${y+w/2}V${y+h}Z`;
const dome=(x,y,r,h)=>`M${x-r} ${y}C${x-r-3} ${y-h*.6} ${x-7} ${y-h*.5} ${x} ${y-h}C${x+7} ${y-h*.5} ${x+r+3} ${y-h*.6} ${x+r} ${y}Z`;
const littleArches=(xs,y,w,h)=>xs.map(x=>arch(x,y,w,h)).join(' ');
const terraces='M65 206L110 185H260L309 206Z M54 222L65 206H309L324 222Z M41 240L54 222H324L340 240Z';
const wall='M76 259C108 214 168 222 183 188C199 150 139 157 159 123C177 91 224 117 240 89C248 77 257 75 272 68L281 77C265 86 262 88 256 103C237 139 185 113 178 132C170 151 222 154 207 194C190 242 134 230 111 268Z';
const wallInner='M95 263C121 222 179 230 194 191C209 152 154 154 168 127C181 103 233 125 247 96L276 74';
const colTop='M63 117C74 87 251 76 316 101C331 107 337 117 329 126C299 147 102 153 69 134C62 130 60 123 63 117Z';
const colBody='M63 121L70 231C117 261 279 257 328 226L330 119';
const colArches=[
  littleArches([81,109,139,170,202,234,266,295],142,16,22),
  littleArches([84,112,142,173,205,237,268,296],178,16,23),
  littleArches([88,116,146,177,208,239,269,295],212,15,23)
];
const tajBody='M122 218V148H258V218Z M113 218H267V227H113Z M90 227H290';
const tajDomes=[dome(190,148,39,62),dome(138,148,14,28),dome(242,148,14,28)].join(' ')+' M151 148H229 M190 86V72 M185 78H195';
const minarets=[68,96,284,312].map((x,i)=>{const y=i===1||i===2?120:109;return `M${x-6} 222L${x-4} ${y}H${x+4}L${x+6} 222 M${x-9} ${y}H${x+9} M${x-8} ${y+7}H${x+8} M${x-7} 164H${x+7} M${x-6} 191H${x+6} ${dome(x,y,7,15)} M${x} ${y-15}V${y-20}`}).join(' ');
const robe='M175 114L172 148L158 222Q190 230 222 222L208 149L205 114';
const statueArms='M175 114L140 113L93 98L89 105L136 127L173 137 M205 114L240 113L287 98L291 105L244 127L207 137 M89 105L82 102L85 94L93 98 M287 98L295 94L298 102L291 105';
const statueHead='M180 111V103Q173 99 176 84Q177 71 190 71Q203 71 204 84Q207 99 200 103V111 M181 104Q190 111 199 104';
const projects=[
  // GREAT WALL: landscape, winding ribbon, towers, small masonry, colour.
  [
    [P('M31 191Q64 105 102 137Q137 60 173 90Q212 38 250 72Q283 28 348 112 M29 224Q74 171 109 185 M246 153Q286 98 349 165', 'none','#b4aaa7',2)],
    [P(wall),P(wallInner,'none',ink,1.8)],
    [P('M74 252V219H113V252L104 266H82Z M169 183V155H202V186L195 196H174Z M239 93V71H263V94L257 102H244Z'),P('M70 218H117V225H70Z M165 154H206V160H165Z M236 70H266V76H236Z')],
    [P('M70 218V207H79V213H88V207H97V213H107V207H117V218 M165 154V145H174V150H183V145H192V150H199V145H206V154 M236 70V63H242V67H248V63H254V67H260V63H266V70'),P(arch(87,235,13,21)+' '+arch(180,169,10,18)+' '+arch(247,83,8,12),'#c7a895'),P('M124 237L129 229 M145 230L148 221 M165 221L168 213 M184 210L189 202 M200 178L209 176 M187 156L192 149 M176 136L185 137 M201 121L201 114 M224 119L227 112 M247 110L253 113','none',ink,1.6)],
    [P('M30 245Q53 181 82 174L112 190L72 265H32Z M116 266Q164 237 189 228Q246 221 281 174Q305 149 349 159V274H117Z',green,'none',0,.6),P('M34 191Q64 108 102 139L126 128Q102 163 79 174Z M112 143Q142 71 174 92L192 83Q155 128 171 143Z M195 112Q224 42 251 75Q284 34 345 112L292 104L259 119Z',blue,'none',0,.6),P(wall,stone,'none',0,.82),P('M74 225H113V252L104 266H82L74 252Z M169 160H202V186L195 196H174L169 183Z M239 76H263V94L257 102H244L239 93Z','#e9c39e','none',0,.9),P('M35 62Q49 51 63 59Q71 44 88 55 M290 46Q303 36 315 45Q329 37 342 48','none','#c3dbe4',4)]
  ],
  // PETRA: the Treasury's rock setting, lower pediment, broken upper pediment and tholos.
  [
    [P('M38 263L38 85L58 31L102 24L126 52 M254 52L280 24L319 39L342 88L342 263 M38 263Q190 280 342 263','none','#b08882',2.3)],
    [P('M100 244V166H280V244 M90 244H290V253H90Z M92 166L190 117L288 166Z M105 166H275V176H105Z M121 155L190 128L260 155Z')],
    [P('M110 117V86H144 M236 86H270V117 M102 87L143 61L158 87 M222 87L237 61L278 87 M103 117H158 M222 117H277 M157 118V88Q159 70 190 66Q221 70 223 88V118 M151 118H229V125H151Z M158 86H222 M169 75Q190 48 212 75 M186 65V50Q177 44 185 40H195Q203 44 194 50V65 M181 39H199 M190 39V32')],
    [P('M114 177V238H126V177 M143 177V238H155V177 M225 177V238H237V177 M254 177V238H266V177 M111 183H129 M140 183H158 M222 183H240 M251 183H269 M111 232H129 M140 232H158 M222 232H240 M251 232H269 M166 90V113 M181 90V113 M200 90V113 M215 90V113 M119 91V111 M137 91V111 M243 91V111 M261 91V111','none',ink,2),P('M171 243V189H209V243Z','#a97d80',ink,2),P('M126 113H138V99H126Z M243 113H255V99H243Z','#b58d8c',ink,1.6)],
    [P('M38 263V85L58 31L102 24L126 52L96 99L89 226L90 253L290 253L291 171L279 112L254 52L280 24L319 39L342 88V263Q190 280 38 263Z','#edc0ae','none',0,.7),P('M100 244V166L190 117L280 166V244Z',rose,'none',0,.4),P('M110 117V86L143 61L158 87L169 75Q190 48 212 75L222 87L237 61L270 86V117Z','#e4b3a5','none',0,.6),P('M63 68L55 117L67 155L58 214 M82 45L72 86 M306 58L322 109L313 153L327 208 M308 220L318 246 M45 271Q194 281 336 272','none','#ce9d91',2.2)]
  ],
  // COLOSSEUM: broad oval, curved tiers and repeated arches.
  [
    [P(colTop),P(colBody),P('M76 121C111 101 266 95 315 118C275 138 122 140 76 121Z','none','#b79c99',1.7)],
    [P('M65 152C124 177 270 174 330 148 M66 159C123 184 269 181 330 155 M68 189C129 214 274 208 329 183 M69 196C126 221 271 215 329 190 M70 232C127 257 279 251 328 226')],
    [P(colArches.join(' '),'#ccb6aa',ink,1.6)],
    [P('M258 94L260 75H349V144H307V129H292V115H275V106H258Z','#fffcf5','none',0),P('M258 94V106H275V115H292V129H307V144H330'),P('M85 129L85 139 M110 134L110 142 M140 137L140 143 M172 139L172 143 M204 138L204 143 M237 136L237 142 M78 171L82 171 M125 178L135 178 M190 181L199 181 M253 176L260 176 M91 208L98 208 M154 216L165 216 M220 214L231 214 M276 204L285 204','none',ink,1.4)],
    [P('M63 121L70 231C117 261 279 257 328 226L330 144H307V129H292V115H275V106H258V94C211 82 82 90 63 117Z',stone,'none',0,.65),P('M76 121C111 101 266 95 315 118C275 138 122 140 76 121Z','#d6b6a5','none',0,.7),P('M37 261Q186 272 345 253','none','#bec8a0',9,.65),P('M39 78Q56 64 75 73 M286 61Q307 44 330 59','none',blue,4)]
  ],
  // CHICHEN ITZA: simplified stepped Temple of Kukulkan.
  [
    [P('M44 241L56 224H322L336 241Z M37 247H343')],
    [P('M56 224V208H81V194H106V180H131V166H154V151H225V166H250V180H275V194H300V208H322V224 M81 208H300 M106 194H275 M131 180H250 M154 166H225')],
    [P('M157 151V115H223V151 M151 115H229V106H151Z M157 106L164 99H216L223 106 M171 151V127H186V151 M196 151V127H210V151'),P('M171 151V127H186V151Z M196 151V127H210V151Z','#baa6a0',ink,1.7)],
    [P('M179 151L161 241 M201 151L220 241 M171 151L150 241 M209 151L231 241'),P('M178 157H202 M177 164H204 M175 171H205 M174 178H207 M172 185H209 M171 192H210 M170 199H212 M168 206H214 M167 213H215 M165 220H217 M164 227H218 M162 234H220','none',ink,1.5)],
    [P('M44 241L56 224V208H81V194H106V180H131V166H154V151H225V166H250V180H275V194H300V208H322V224L336 241Z',stone,'none',0,.7),P('M157 151V115H223V151Z','#e3c7a6','none',0,.8),P('M201 151L220 241H231L209 151Z','#c4b3a5','none',0,.65),P('M29 254Q190 267 350 254','none',green,13,.65),P('M38 211Q44 190 50 207 M330 209Q341 184 347 211','none',green,3),P('M48 73Q64 59 82 70 M281 80Q302 63 324 77','none',blue,4)]
  ],
  // MACHU PICCHU: high Andean ridge, terraces and stone building groups.
  [
    [P('M28 185Q54 114 86 140Q102 89 124 110Q137 76 158 80Q172 39 192 40Q216 34 230 85L251 130Q273 96 292 117Q319 138 351 180 M151 132Q176 88 191 49 M218 96L238 143','none','#8eaaa2',2.2)],
    [P('M53 244L79 174L130 158L183 171L228 157L283 177L329 245 M68 205L116 192L178 205L229 191L303 213 M61 222L111 209L178 224L234 210L317 231 M53 244L109 229L180 246L239 229L329 245 M79 174L116 183L130 158 M183 171L178 205 M228 157L229 191','none',ink,2.2)],
    [P('M87 180V159L102 147L116 159V184 M87 159H116 M131 189V161L148 149L165 161V196 M131 161H165 M190 190V162L208 148L224 162V184 M190 162H224 M246 196V171L261 159L277 171V205 M246 171H277 M288 213V192L300 183L313 195V222 M288 192L313 195')],
    [P('M96 182V168H105V184 M142 191V175H153V194 M201 187V174H213V186 M256 200V184H266V202 M296 217V203H304V219'),P('M87 170H96 M105 175H116 M131 173H142 M153 183H165 M190 173H201 M214 172H224 M246 184H255 M267 191H277 M78 208L76 217 M104 199L103 211 M129 201L128 212 M153 208L152 217 M206 202L208 216 M258 205L259 216 M285 214L287 226 M80 229L78 239 M126 232L128 241 M210 238L212 246','none',ink,1.3)],
    [P('M28 185Q54 114 86 140Q102 89 124 110Q137 76 158 80Q172 39 192 40Q216 34 230 85L251 130Q273 96 292 117Q319 138 351 180L329 245L283 177L228 157L183 171L130 158L79 174L53 244Z','#bbd0c4','none',0,.65),P('M53 244L79 174L116 183L130 158L183 171L228 157L283 177L329 245L239 229L180 246L109 229Z',green,'none',0,.55),P('M87 180V159H116V184Z M131 189V161H165V196Z M190 190V162H224V184Z M246 196V171H277V205Z M288 213V192L313 195V222Z',stone,'none',0,.8),P('M32 72Q54 54 78 64 M267 61Q286 47 307 60','none',blue,4)]
  ],
  // TAJ MAHAL: symmetry, onion dome, four minarets and reflecting pool.
  [
    [P(tajBody)],
    [P(tajDomes),P('M160 147V155 M220 147V155 M175 111Q164 130 166 146 M205 111Q216 130 214 146','none','#ab9baa',1.6)],
    [P(minarets)],
    [P('M171 218V183Q170 171 190 157Q210 171 209 183V218Z M177 218V184Q178 174 190 166Q202 174 203 184V218Z','#d9cbd9',ink,1.6),P('M131 198V183Q138 170 145 183V198Z M235 198V183Q242 170 249 183V198Z M132 213V205H144V213 M236 213V205H248V213','none',ink,1.6),P('M171 235H209L226 277H154Z M166 249H214 M161 263H219','none','#8aacae',1.8)],
    [P('M122 218V148H258V218Z','#ede4ee','none',0,.5),P('M197 93Q217 115 226 147H211Q210 121 197 93Z',shade,'none',0,.45),P('M248 148V218H258V148Z M68 116L74 222H70L65 116Z M312 116L318 222H314L309 116Z',shade,'none',0,.4),P('M171 235H209L226 277H154Z','#a8c9cc','none',0,.75),P('M106 265Q97 248 106 232Q115 248 106 265Z M129 250Q122 237 129 225Q136 237 129 250Z M274 265Q265 248 274 232Q283 248 274 265Z M251 250Q244 237 251 225Q258 237 251 250Z',green,green,1,.8),P('M41 76Q60 59 82 71 M286 61Q305 45 328 59','none',blue,4)]
  ],
  // CHRIST THE REDEEMER: outstretched arms on Corcovado, simplified respectfully.
  [
    [P('M31 276L76 246L112 249L150 219Q171 207 190 211Q209 207 230 220L270 248L306 246L349 276 M32 245Q67 215 99 225 M280 226Q315 212 348 238','none','#8da69b',2.2)],
    [P(robe),P('M156 226H224V237H156Z M150 237H230V244H150Z')],
    [P(statueArms),P(statueHead),P('M173 114Q190 120 207 114','none',ink,2)],
    [P('M181 125L171 214 M190 132L187 217 M200 126L208 215 M175 149L181 160 M201 148L196 159 M141 117L168 123 M239 117L213 123 M184 88L187 88 M194 88L197 88 M190 89L188 95L192 95 M185 100Q190 102 195 100','none',ink,1.6)],
    [P('M31 276L76 246L112 249L150 219L156 226V237H150V244H230V237H224V226L230 220L270 248L306 246L349 276Z',green,'none',0,.65),P('M31 276L76 246L112 249L130 236L106 274Z M230 244L270 248L306 246L349 276H286Z','#7faaa0','none',0,.4),P('M32 245Q67 215 99 225L76 246L31 276Z M280 226Q315 212 348 238V274L306 246Z',blue,'none',0,.6),P('M198 114L205 114L208 149L222 222L203 225L198 168Z M206 114L240 113L287 98L291 105L244 127L207 137Z',shade,'none',0,.45),P('M176 84Q177 71 190 71Q203 71 204 84L201 87Q189 79 176 87Z','#c9bbc9','none',0,.5),P('M42 68Q62 49 84 63 M286 64Q309 48 332 65','none',blue,4)]
  ]
];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeIndex=(n,max)=>Number.isInteger(Number(n))?Math.max(0,Math.min(max,Number(n))):0;
function pathMarkup(p,extra=''){return `<path ${extra} d="${p.d}" fill="${p.fill}" stroke="${p.stroke}" stroke-width="${p.width}" opacity="${p.opacity}"/>`;}
export function illustrationSVG(theme=0,step=4,lang='en',finished=true,svgId='drawing-svg'){
  theme=safeIndex(theme,6);step=safeIndex(step,4);lang=lang==='fr'?'fr':'en';
  const shown=finished?4:step,layers=projects[theme],label=`${themeLabels[lang][theme]} · ${lang==='fr'?'exemple artistique, étape':'art example, step'} ${shown+1}/5`;
  const trace=(step===4?layers[step]:layers[step].filter(p=>p.stroke!=='none')).map(p=>p.d).join(' ');
  // Colour washes go beneath the line work; small coloured details keep their own outlines.
  const paint=shown===4?`<g class="demo-stroke demo-stage" data-step="5">${layers[4].map(p=>{const mark=pathMarkup(p);return !finished&&step===4?mark.replace('/>',`><animate class="demo-animate" attributeName="opacity" from="0" to="${p.opacity}" dur="7s" begin="indefinite" fill="freeze"/></path>`):mark;}).join('')}</g>`:'';
  const linework=layers.slice(0,Math.min(shown+1,4)).map((layer,i)=>`<g class="demo-stroke demo-stage" data-step="${i+1}">${layer.map(p=>{if(theme===6&&i===0&&shown>0)p={...p,d:'M31 276L76 246L112 249L150 219 M230 220L270 248L306 246L349 276 M32 245Q67 215 99 225 M280 226Q315 212 348 238'};return pathMarkup(p,!finished&&i===step?'class="demo-current-detail"':'')}).join('')}</g>`).join('');
  return `<svg id="${esc(svgId)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 300" role="img" aria-label="${esc(label)}"><title>${esc(label)}</title><desc>${esc(lessons[lang][theme][shown][1])}</desc><rect x="5" y="5" width="370" height="290" rx="18" fill="#fffcf5"/><g stroke-linecap="round" stroke-linejoin="round">${paint}${linework}${!finished?`<path class="demo-current" d="${trace}" fill="none" stroke="${ink}" stroke-width="2.3" pathLength="1"><animate class="demo-animate" attributeName="stroke-dashoffset" from="1" to="0" dur="7s" begin="indefinite" fill="freeze"/></path><g class="drawing-tip" visibility="hidden"><circle r="5" fill="#f1d590" stroke="${ink}" stroke-width="1.5"/><path d="M0 0L8 -23L14 -20L3 2Z" fill="#bba2cb" stroke="${ink}" stroke-width="1.4"/><path d="M0 0L3 -8L7 -6L3 2Z" fill="#ecd2b4"/><animateMotion class="demo-animate" path="${trace}" dur="7s" begin="indefinite" fill="freeze" calcMode="paced"/></g>`:''}</g></svg>`;
}
export function demonstration(theme,step,lang='en',finished=false){
  theme=safeIndex(theme,6);step=safeIndex(step,4);lang=lang==='fr'?'fr':'en';
  const shown=finished?4:step;
  return `<div class="drawing-demo">${illustrationSVG(theme,step,lang,finished)}<p class="demo-caption">${esc(lessons[lang][theme][shown][0])} · ${esc(lessons[lang][theme][shown][1])}</p><p class="demo-caption">${lang==='fr'?'Une interprétation artistique simplifiée, pas un modèle obligatoire. Tes formes et tes couleurs peuvent être différentes.':'A simplified artistic interpretation, not a rule. Your shapes and colours can be different.'}</p></div>`;
}
export const demoCount=projects.length;
