/* Scroll-linked section reveals, depth and stagger, rAF throttled. */
(()=>{
const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)');
if(reduced&&reduced.matches||!window.requestAnimationFrame)return;
const boot=()=>{
const unique=sel=>[...new Set([...document.querySelectorAll(sel)])];
const sections=unique('body > section,main > section,.section,#knowledge-center');
const cards=unique('.pg-mcp-motion-card,#connect a[href*="mcp.so/servers"],#connect a[href*="glama.ai/mcp"],#connect a[href*="huggingface.co/spaces"],.feature-card,.template-card,.pricing-card,.faq-item,.guide-card,main.wrap article,.duo-exact-figure,.inline-response-row,.inline-prompt-block,.ai-provider-badge,.inline-provider-row,.trust-item,.category-card,.featured-template-card,.category-tile,.pg-comparison-panel,.all-categories-head,.template-categories-head,.demo-device-card,.cross-device-access,.platform-pill,.gallery-grid > .gallery-item,.gallery-grid > .gallery-card,.gallery-grid > .gallery-phone,.gallery-grid > .gallery-ipad,.gallery-grid > .gallery-mac');
const headings=unique('.section-title,.section-eyebrow,.section-sub,main.wrap > h1,main.wrap > .lead,#knowledge-center h2,#iphone-duo .duo-kicker,#iphone-duo #duo-title,#iphone-duo .duo-copy,#faq .section-title,#faq .section-eyebrow,#faq .section-sub');
const safe=e=>!e.closest('.nav,.nav-links,.modal,[role="dialog"],.phone-screen,.pg-phone-screen,.hero-phone-mock');
const S=sections.filter(safe),C=cards.filter(safe),H=headings.filter(safe);
const faqItems=unique('#faq .faq-item');
const mcpTools=unique('#connect .pg-mcp-tools-grid > .pg-mcp-motion-card');
// Pricing comparisons use a dedicated, independent entrance reveal.
const priceCards=unique('.inline-pricing-row > .inline-price-item').filter(safe);
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(!entry.isIntersecting)continue;
      entry.target.classList.add('pg-price-visible');
      observer.unobserve(entry.target);
    }
  },{threshold:.14,rootMargin:'0px 0px -5% 0px'});
  priceCards.forEach((card,i)=>{
    card.style.setProperty('--pg-price-delay',Math.min(i,1)*140+'ms');
    card.classList.add('pg-price-reveal');
    observer.observe(card);
  });
}

// Animate containers, not their nested badges, to avoid competing transforms.
const outerCards=C.filter(e=>e.matches('.pg-mcp-motion-card,.pg-comparison-panel,.inline-response-row,.featured-template-card,.category-tile') || !C.some(parent=>parent!==e&&parent.contains(e)));
S.forEach(e=>e.classList.add('pg-motion-section'));outerCards.forEach(e=>e.classList.add('pg-motion-card'));H.forEach(e=>e.classList.add('pg-motion-item'));
let raf=0;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const apply=()=>{
raf=0;const vh=window.innerHeight||800;
for(const s of S){const r=s.getBoundingClientRect();if(r.bottom< -vh||r.top>vh*2)continue;
const progress=clamp((vh-r.top)/(vh+Math.min(r.height,vh)),0,1);
s.style.setProperty('--pg-bg-y',((.5-progress)*54).toFixed(1)+'px');
s.style.setProperty('--pg-bg-opacity',(.18+progress*.44).toFixed(2));
}
for(const e of H){const r=e.getBoundingClientRect();if(r.bottom< -120||r.top>vh+160)continue;
const entering=clamp((vh*.94-r.top)/(vh*.5),0,1);const smooth=entering*entering*(3-2*entering);
e.style.setProperty('--pg-item-y',((1-smooth)*10).toFixed(1)+'px');
e.style.setProperty('--pg-item-scale','1');
e.style.setProperty('--pg-item-opacity',(.9+.1*smooth).toFixed(3));
}
for(const [i,e] of outerCards.entries()){const r=e.getBoundingClientRect();if(r.bottom< -120||r.top>vh+200)continue;
const faqIndex=faqItems.indexOf(e);
const toolIndex=mcpTools.indexOf(e);
const comparison=e.matches('.pg-comparison-panel');
const stagger=faqIndex>=0 || comparison || toolIndex>=0 ? 0 : (i%3)*.075; // FAQ positions reveal naturally in visual order.
const entering=clamp((vh*(toolIndex>=0?.80:.98-stagger)-r.top)/(vh*(toolIndex>=0?.34:.48)),0,1);const smooth=entering*entering*(3-2*entering);
const depth=toolIndex>=0?0:clamp((r.top+r.height/2-vh/2)/vh,-1,1)*10;
e.style.setProperty('--pg-card-y',((1-smooth)*(toolIndex>=0?54:faqIndex>=0?22:comparison?44:54)+depth*smooth*(faqIndex>=0?.2:1)).toFixed(1)+'px');
e.style.setProperty('--pg-card-scale',((faqIndex>=0?.99:.955)+(faqIndex>=0?.01:.045)*smooth).toFixed(3));
e.style.setProperty('--pg-card-opacity',((faqIndex>=0?.8:.5)+(faqIndex>=0?.2:.5)*smooth).toFixed(3));
}
};
const schedule=()=>{if(!raf)raf=requestAnimationFrame(apply)};
window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});schedule();
if(reduced)reduced.addEventListener('change',()=>{if(reduced.matches){S.concat(outerCards,H).forEach(e=>{e.classList.remove('pg-motion-section','pg-motion-card','pg-motion-item');e.removeAttribute('style')})}});
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();