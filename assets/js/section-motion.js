/* Continuous scroll-position-driven motion, isolated from interactive widgets. */
(() => {
  if (!('requestAnimationFrame' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const init = () => {
    const selectors = [
      '.section-title','.section-eyebrow','.section-sub',
      '.feature-card','.template-card','.pricing-card','.faq-item','.guide-card',
      '.showcase-inline-section','.conversion-final-card',
      '#knowledge-center h2','#knowledge-center a',
      'main.wrap > h1','main.wrap > .lead','main.wrap article',
      'main > section h2','main > section article'
    ];
    const elements = [...new Set(selectors.flatMap(s => [...document.querySelectorAll(s)]))]
      .filter(el => !el.closest('.nav,.nav-links,.phone-screen,.pg-phone-screen,.modal,[role="dialog"]'));
    if (!elements.length) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight || 800;
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -90 || rect.top > vh + 100) continue;
        const midpoint = rect.top + Math.min(rect.height, vh) / 2;
        const progress = Math.max(-1, Math.min(1, (midpoint - vh/2)/(vh*.67)));
        const offset = progress * 30;
        const opacity = Math.max(.82, 1 - Math.abs(progress)*.16);
        el.style.setProperty('--pg-float-y', offset.toFixed(1)+'px');
        el.style.setProperty('--pg-float-opacity',opacity.toFixed(3));
      }
    };
    const schedule = () => {if(!ticking){ticking=true;requestAnimationFrame(update)}};
    elements.forEach(el => el.classList.add('pg-scroll-float'));
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule,{passive:true});
    schedule();
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
