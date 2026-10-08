/* Scroll-linked section reveals, depth and stagger, rAF throttled. */
(()=>{
const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)');
if(reduced&&reduced.matches||!window.requestAnimationFrame)return;
const boot=()=>{
const unique=sel=>[...new Set([...document.querySelectorAll(sel)])];
const sections=unique('body > section,main > section,.section,#knowledge-center');
const cards=unique('.feature-card,.template-card,.pricing-card,.guide-card,.faq-item,.inline-response-row,.inline-prompt-block,.inline-price-item,.inline-provider-row,.conversion-final-card,.trust-item,#knowledge-center a,.feature-secondary-grid > .feature-card');
const headings=[]; // Headings and body copy remain completely stationary.
const safe=e=>!e.closest('.nav,.nav-links,.modal,[role="dialog"],.phone-screen,.pg-phone-screen,.hero-phone-mock');
const S=sections.filter(safe),C=cards.filter(safe),H=headings.filter(safe);
S.forEach(e=>e.classList.add('pg-motion-section'));C.forEach(e=>e.classList.add('pg-motion-card'));H.forEach(e=>e.classList.add('pg-motion-item'));
let raf=0;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const apply=()=>{
raf=0;const vh=window.innerHeight||800;
for(const s of S){const r=s.getBoundingClientRect();if(r.bottom< -vh||r.top>vh*2)continue;
const progress=clamp((vh-r.top)/(vh+Math.min(r.height,vh)),0,1);
s.style.setProperty('--pg-bg-y',((.5-progress)*20).toFixed(1)+'px');
s.style.setProperty('--pg-bg-opacity',(.22+progress*.45).toFixed(2));
}
for(const e of H){const r=e.getBoundingClientRect();if(r.bottom< -120||r.top>vh+160)continue;
const entering=clamp((vh*.94-r.top)/(vh*.5),0,1);const smooth=entering*entering*(3-2*entering);
e.style.setProperty('--pg-item-y',((1-smooth)*6.5).toFixed(1)+'px');
e.style.setProperty('--pg-item-scale',(1).toFixed(3));
e.style.setProperty('--pg-item-opacity',(.96+.04*smooth).toFixed(3));
}
for(const [i,e] of C.entries()){const r=e.getBoundingClientRect();if(r.bottom< -120||r.top>vh+200)continue;
const stagger=(i%3)*.075;
const entering=clamp((vh*(.98-stagger)-r.top)/(vh*.48),0,1);const smooth=entering*entering*(3-2*entering);
const depth=clamp((r.top+r.height/2-vh/2)/vh,-1,1)*4;
e.style.setProperty('--pg-card-y',((1-smooth)*30+depth*smooth*.65).toFixed(1)+'px');
e.style.setProperty('--pg-card-scale',(.98+.02*smooth).toFixed(3));
e.style.setProperty('--pg-card-opacity',(.78+.22*smooth).toFixed(3));
}
};
const schedule=()=>{if(!raf)raf=requestAnimationFrame(apply)};
window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});schedule();
if(reduced)reduced.addEventListener('change',()=>{if(reduced.matches){S.concat(C,H).forEach(e=>{e.classList.remove('pg-motion-section','pg-motion-card','pg-motion-item');e.removeAttribute('style')})}});
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();