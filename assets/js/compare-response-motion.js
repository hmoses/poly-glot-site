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
  function update() {
    raf = 0;
    if (document.hidden || (reduced && reduced.matches)) return;
    const vh = window.innerHeight || 800;
    const entryStart = vh * .94;
    const entryEnd = vh * .23;
    last = cards.map((el,index) => {
      const rect = el.getBoundingClientRect();
      const p = clamp((entryStart - rect.top)/(entryStart-entryEnd),0,1);
      const smooth = p*p*(3-2*p);
      // Deliberately scroll-linked: even fully entered cards have different
      // individual parallax positions rather than freezing after a timer.
      const depth = clamp((rect.top + rect.height*.5 - vh*.48)/vh, -.8, .8);
      const y = (1-smooth)*96 + depth*24*smooth;
      const scale = .95 + .05*smooth;
      const opacity = .22 + .78*smooth;
      el.style.setProperty('--pg-compare-y',y.toFixed(2)+'px');
      el.style.setProperty('--pg-compare-scale',scale.toFixed(4));
      el.style.setProperty('--pg-compare-opacity',opacity.toFixed(4));
      el.setAttribute('data-pg-compare-state',p>=.999?'entered':p<=.001?'waiting':'entering');
      return {index,progress:Number(p.toFixed(4)),y:Number(y.toFixed(2)),opacity:Number(opacity.toFixed(4))};
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
      mode: 'independent-scroll-linked-v2',
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
