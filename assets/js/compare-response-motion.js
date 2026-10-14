/* Compare Mode: independently scroll-driven ChatGPT, Claude and Perplexity cards.
 * Replaces the old one-time 240ms reveal; scrolling forwards and backwards
 * continues to move each card on its own viewport position. */
(() => {
  'use strict';
  const selector = '#apps .inline-response-list > .inline-response-row';
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (v, low, high) => Math.min(high, Math.max(low, v));
  let cards = [], raf = 0, last = [];
  const cssVars = ['--pg-compare-y','--pg-compare-scale','--pg-compare-opacity'];
  function reset() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    cards.forEach(el => {
      el.classList.remove('pg-compare-scroll-motion','pg-compare-reveal-ready','pg-compare-visible','pg-compare-finished');
      cssVars.forEach(v => el.style.removeProperty(v));
      el.removeAttribute('data-pg-compare-state');
    });
  }
  /* Scroll-event throttled only; avoid continuous animation and layout feedback. */
  function update() {
    raf=0;
    if(document.hidden||(reduced&&reduced.matches))return;
    const vh=window.innerHeight||800;
    last=cards.map((el,index)=>{
      const rect=el.getBoundingClientRect();
      const oldY=parseFloat(el.style.getPropertyValue('--pg-compare-y'))||0;
      const top=rect.top-oldY;
      const progress=clamp((vh*.88-top)/(vh*.58),0,1);
      const smooth=progress*progress*(3-2*progress);
      const depth=clamp((top+rect.height*.5-vh*.48)/vh,-.8,.8);
      const y=(1-smooth)*12+depth*12*smooth;
      el.style.setProperty('--pg-compare-y',y.toFixed(2)+'px');
      el.style.setProperty('--pg-compare-scale',(0.99+0.01*smooth).toFixed(4));
      el.style.setProperty('--pg-compare-opacity',(0.88+0.12*smooth).toFixed(4));
      el.setAttribute('data-pg-compare-state',progress>=.999?'entered':progress<=.001?'waiting':'entering');
      return {index,progress,y,opacity:.88+.12*smooth};
    });
  }
  function schedule() {
    if (!raf && !(reduced && reduced.matches)) raf = requestAnimationFrame(update);
  }
  function start() {
    cards = [...document.querySelectorAll(selector)];
    if (cards.length !== 3 || !window.requestAnimationFrame) return;
    window._pgCompareResponseMotion = {
      cards: () => cards,
      status: () => cards.map(el=>el.getAttribute('data-pg-compare-state')),
      snapshot: () => last.map(item=>({...item})),
      mode: 'scroll-throttled-css-eased-v4',
      update: schedule
    };
    if (reduced && reduced.matches) return;
    cards.forEach(el => {
      // Initialize BEFORE enabling motion so there is no hidden flash.
      el.classList.remove('pg-compare-reveal-ready','pg-compare-visible','pg-compare-finished');
      el.classList.add('pg-compare-scroll-motion');
    });
    schedule();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('pageshow',schedule,{passive:true});
  document.addEventListener('visibilitychange',schedule);
  if (reduced) reduced.addEventListener('change',()=>{
    if (reduced.matches) reset();
    else {
      cards.forEach(el=>el.classList.add('pg-compare-scroll-motion'));
      schedule();
    }
  });
})();
