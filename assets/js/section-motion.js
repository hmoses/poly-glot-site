/* Lightweight Apple-style parallax for Poly-Glot subpages; mobile and RTL safe. */
(()=>{
'use strict';
if(!window.requestAnimationFrame)return;
const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)');
const unique=s=>[...new Set(document.querySelectorAll(s))],clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
let ready=false,raf=0,S=[],C=[],H=[];
function boot(){
 if(ready||!document.body)return;ready=true;
 const safe=e=>!e.closest('.nav,.nav-links,nav,[role="dialog"],.modal,#pgGlobalLangPicker,#pgGlobalLangDD,.code-block,.phone-screen');
 S=unique('header.hero,body > main,body > .wrap,main > section,.section,main .related,#knowledge-center').filter(safe);
 const all=unique('main.wrap article,.guide-card,.about-card,.info-box,.feature-card,.template-card,.pricing-card,.faq-item,.done-box,.wrap .step,body > .card#card');
 C=all.filter(safe).filter(e=>!all.some(p=>p!==e&&p.contains(e)));
 H=unique('.hero h1,.hero p,.section-title,.section-eyebrow,.section-sub,main.wrap > h1,main.wrap > .eyebrow,main.wrap > .lead,main .related > h2,body > h1,body > h2,body > p:first-of-type,body > .wrap > h1,body > .wrap > h2,body > .wrap > .sub,#knowledge-center h2').filter(safe);
 document.body.classList.add('pg-subpage-motion');
 S.forEach(e=>e.classList.add('pg-motion-section'));
 C.forEach(e=>e.classList.add('pg-motion-card'));
 H.forEach(e=>e.classList.add('pg-motion-item'));
 schedule();
}
function clear(){
 if(raf)cancelAnimationFrame(raf);raf=0;
 for(const e of [...S,...C,...H]){
  e.classList.remove('pg-motion-section','pg-motion-card','pg-motion-item');
  for(const p of ['--pg-bg-y','--pg-bg-opacity','--pg-item-y','--pg-item-scale','--pg-item-opacity','--pg-card-y','--pg-card-scale','--pg-card-opacity'])e.style.removeProperty(p);
 }
 if(document.body)document.body.classList.remove('pg-subpage-motion');
}
function apply(){
 raf=0;if(document.hidden||reduced&&reduced.matches)return;
 const vh=window.innerHeight||800,mobile=window.innerWidth<=650;
 const R=new Map([...new Set([...S,...C,...H])].map(e=>[e,e.getBoundingClientRect()]));
 for(const e of S){
  const r=R.get(e);if(r.bottom< -vh||r.top>vh*1.5)continue;
  const p=clamp((vh-r.top)/(vh+Math.min(r.height,vh)),0,1);
  e.style.setProperty('--pg-bg-y',((.5-p)*(mobile?18:46)).toFixed(1)+'px');
  e.style.setProperty('--pg-bg-opacity',(.28+p*.42).toFixed(2));
 }
 for(const e of H){
  const r=R.get(e);if(r.bottom< -30||r.top>vh+90)continue;
  const p=clamp((vh*.95-r.top)/(vh*(mobile?.25:.45)),0,1),z=p*p*(3-2*p);
  e.style.setProperty('--pg-item-y',((1-z)*(mobile?7:30)).toFixed(1)+'px');
  e.style.setProperty('--pg-item-scale',mobile?'1':(.985+.015*z).toFixed(3));
  e.style.setProperty('--pg-item-opacity',((mobile?.92:.72)+(mobile?.08:.28)*z).toFixed(3));
 }
 C.forEach((e,i)=>{
  const r=R.get(e);if(r.bottom< -30||r.top>vh+100)return;
  const p=clamp((vh*(.97-(mobile?0:(i%3)*.05))-r.top)/(vh*(mobile?.25:.40)),0,1),z=p*p*(3-2*p);
  const depth=clamp((r.top+r.height/2-vh/2)/vh,-1,1)*(mobile?2:9);
  e.style.setProperty('--pg-card-y',((1-z)*(mobile?9:34)+depth*z).toFixed(1)+'px');
  e.style.setProperty('--pg-card-scale',mobile?'1':(.975+.025*z).toFixed(3));
  e.style.setProperty('--pg-card-opacity',((mobile?.90:.65)+(mobile?.10:.35)*z).toFixed(3));
 });
}
function schedule(){if(!ready||reduced&&reduced.matches||document.hidden)return;if(!raf)raf=requestAnimationFrame(apply);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
window.addEventListener('scroll',schedule,{passive:true});
window.addEventListener('resize',schedule,{passive:true});
window.addEventListener('pageshow',schedule);
window.addEventListener('pg:languagechange',schedule);
document.addEventListener('visibilitychange',schedule);
if(reduced)reduced.addEventListener('change',()=>{
 if(reduced.matches)clear();
 else if(!ready)boot();
 else {
  document.body.classList.add('pg-subpage-motion');
  S.forEach(e=>e.classList.add('pg-motion-section'));
  C.forEach(e=>e.classList.add('pg-motion-card'));
  H.forEach(e=>e.classList.add('pg-motion-item'));
  schedule();
 }
});
})();
