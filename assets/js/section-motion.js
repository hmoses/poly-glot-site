/* Homepage-matched Apple-style scroll motion for the site's informational pages.
 * Mirrors home-motion.js: 54px depth, 10px heading reveal, 54px card lift,
 * 22px FAQ lift, easing/stagger and opacity; preserves user motion preference. */
(()=>{
'use strict';
if(!window.requestAnimationFrame)return;
const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)');
const unique=selector=>[...new Set(document.querySelectorAll(selector))];
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const vars=['--pg-bg-y','--pg-bg-opacity','--pg-item-y','--pg-item-scale','--pg-item-opacity','--pg-card-y','--pg-card-scale','--pg-card-opacity'];
let initialized=false,frame=0,sections=[],cards=[],headings=[],faqs=[],motionEnabled=false;
const safe=e=>!e.closest('.nav,.nav-links,nav,[role="dialog"],.modal,#pgGlobalLangPicker,#pgGlobalLangDD,.code-block,.phone-screen,.pg-phone-screen');
function discover(){
  // Only content sections get depth layers, never navigation, provider embeds or controls.
  sections=unique('header.hero,main > section,body > section,.section,#knowledge-center,body > main,body > .wrap,body > .container')
   .filter(safe)
   .filter(e=>!(e.matches('main,body > .wrap,body > .container')&&e.querySelector(':scope > section')));
  const candidates=unique('main.wrap article,.mcp-troubleshoot .mcp-endpoint,.mcp-troubleshoot .mcp-steps,.mcp-troubleshoot .mcp-error-guide details,.mcp-troubleshoot .mcp-client-grid article,.guide-card,.about-card,.info-box,.feature-card,.template-card,.pricing-card,.faq-item,.done-box,.wrap .step,.container > .card,.grid > .card,.funnel-step,.link-box,body > .card#card')
   .filter(safe);
  // The homepage excludes nested motion cards to avoid conflicting transforms.
  cards=candidates.filter(e=>!candidates.some(parent=>parent!==e&&parent.contains(e)));
  headings=unique('.hero h1,.hero p,.section-title,.section-eyebrow,.section-sub,main.wrap > h1,main.wrap > .eyebrow,main.wrap > .lead,main .related > h2,body > h1,body > h2,body > p:first-of-type,body > .wrap > h1,body > .wrap > h2,body > .wrap > .sub,body > .container > h1,body > .container > .subtitle,#knowledge-center h2')
   .filter(safe);
  faqs=unique('.faq-item,main.wrap article,.mcp-troubleshoot .mcp-error-guide details').filter(safe);
}
function enable(){
 if(!document.body)return;
 motionEnabled=true;
 document.body.classList.add('pg-subpage-motion');
 // Sparse pages (Privacy, Terms, Support, Share) still have background depth.
 document.body.classList.toggle('pg-motion-document',sections.length===0);
 sections.forEach(e=>e.classList.add('pg-motion-section'));
 cards.forEach(e=>e.classList.add('pg-motion-card'));
 headings.forEach(e=>e.classList.add('pg-motion-item'));
 schedule();
}
function disable(){
 if(frame)cancelAnimationFrame(frame);frame=0;motionEnabled=false;
 for(const e of [...sections,...cards,...headings,document.body]){
  if(!e)continue;
  e.classList.remove('pg-motion-section','pg-motion-card','pg-motion-item');
  for(const key of vars)e.style.removeProperty(key);
 }
 document.body?.classList.remove('pg-subpage-motion','pg-motion-document');
}
function apply(){
 frame=0;
 if(!motionEnabled||document.hidden||reduced&&reduced.matches)return;
 const vh=window.innerHeight||800;
 const visible=[...new Set([...sections,...cards,...headings])];
 const rects=new Map(visible.map(e=>[e,e.getBoundingClientRect()]));
 for(const e of sections){
  const r=rects.get(e);if(r.bottom< -vh||r.top>vh*2)continue;
  const progress=clamp((vh-r.top)/(vh+Math.min(r.height,vh)),0,1);
  e.style.setProperty('--pg-bg-y',((.5-progress)*54).toFixed(1)+'px');
  e.style.setProperty('--pg-bg-opacity',(.18+progress*.44).toFixed(2));
 }
 // Match home-motion's section background on simple single-column legal pages.
 if(sections.length===0){
  const progress=clamp(window.scrollY/Math.max(1,document.documentElement.scrollHeight-vh),0,1);
  document.body.style.setProperty('--pg-bg-y',((.5-progress)*54).toFixed(1)+'px');
  document.body.style.setProperty('--pg-bg-opacity',(.18+progress*.44).toFixed(2));
 }
 for(const e of headings){
  const r=rects.get(e);if(r.bottom< -120||r.top>vh+160)continue;
  const entering=clamp((vh*.94-r.top)/(vh*.5),0,1);
  const smooth=entering*entering*(3-2*entering);
  e.style.setProperty('--pg-item-y',((1-smooth)*10).toFixed(1)+'px');
  e.style.setProperty('--pg-item-scale','1');
  e.style.setProperty('--pg-item-opacity',(.9+.1*smooth).toFixed(3));
 }
 for(const [i,e] of cards.entries()){
  const r=rects.get(e);if(r.bottom< -120||r.top>vh+200)continue;
  const isFAQ=faqs.includes(e);
  const stagger=isFAQ?0:(i%3)*.075;
  const entering=clamp((vh*(.98-stagger)-r.top)/(vh*.48),0,1);
  const smooth=entering*entering*(3-2*entering);
  const depth=clamp((r.top+r.height/2-vh/2)/vh,-1,1)*10;
  e.style.setProperty('--pg-card-y',((1-smooth)*(isFAQ?22:54)+depth*smooth*(isFAQ?.2:1)).toFixed(1)+'px');
  e.style.setProperty('--pg-card-scale',((isFAQ?.99:.955)+(isFAQ?.01:.045)*smooth).toFixed(3));
  e.style.setProperty('--pg-card-opacity',((isFAQ?.8:.5)+(isFAQ?.2:.5)*smooth).toFixed(3));
 }
}
function schedule(){
 if(!motionEnabled||document.hidden||reduced&&reduced.matches)return;
 if(!frame)frame=requestAnimationFrame(apply);
}
function boot(){
 if(initialized||!document.body)return;
 initialized=true;discover();
 if(!(reduced&&reduced.matches))enable();
 else document.body.classList.add('pg-subpage-motion');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
window.addEventListener('scroll',schedule,{passive:true});
window.addEventListener('resize',schedule,{passive:true});
window.addEventListener('pageshow',schedule,{passive:true});
window.addEventListener('pg:languagechange',schedule);
document.addEventListener('visibilitychange',schedule);
if(reduced)reduced.addEventListener('change',()=>{
 if(reduced.matches)disable();else{if(!initialized)boot();if(!motionEnabled)enable();}
});
window._pgSubpageMotion={schedule,profile:'homepage-parity-v8'};
})();
