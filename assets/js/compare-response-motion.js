/* Compare Mode: independently scroll-driven ChatGPT, Claude and Perplexity cards.
 * Replaces the old one-time 240ms reveal; scrolling forwards and backwards
 * continues to move each card on its own viewport position. */
(() => {
  'use strict';
  const selector = '#apps .inline-response-list > .inline-response-row';
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (v, low, high) => Math.min(high, Math.max(low, v));
  let cards = [], raf = 0, last = [], states = new WeakMap(), lastFrame = 0;
  const cssVars = ['--pg-compare-y','--pg-compare-scale','--pg-compare-opacity'];
  function reset() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0; states = new WeakMap(); lastFrame = 0;
    cards.forEach(el => {
      el.classList.remove('pg-compare-scroll-motion','pg-compare-reveal-ready','pg-compare-visible','pg-compare-finished');
      cssVars.forEach(v => el.style.removeProperty(v));
      el.removeAttribute('data-pg-compare-state');
    });
  }
  function update(now) {
    raf = 0;
    if (document.hidden || (reduced && reduced.matches)) return;
    const vh = window.innerHeight || 800;
    const dt = lastFrame ? Math.min(64, now-lastFrame) : 16.7;
    lastFrame = now;
    const blend = 1-Math.exp(-dt/105);
    let unsettled = false;
    const entryStart = vh * .90;
    const entryEnd = vh * .29;
    last = cards.map((el,index) => {
      const rect = el.getBoundingClientRect();
      const state = states.get(el) || {y:0,scale:1,opacity:1};
      const top = rect.top-state.y;
      const p = clamp((entryStart - top)/(entryStart-entryEnd),0,1);
      const smooth = p*p*(3-2*p);
      // Deliberately scroll-linked: even fully entered cards have different
      // individual parallax positions rather than freezing after a timer.
      const depth = clamp((top + rect.height*.5 - vh*.48)/vh, -.8, .8);
      const y = (1-smooth)*22 + depth*17*smooth;
      const scale = .975 + .025*smooth;
      const opacity = .68 + .32*smooth;
      state.y += (y-state.y)*blend;
      state.scale += (scale-state.scale)*blend;
      state.opacity += (opacity-state.opacity)*blend;
      states.set(el,state);
      if (Math.abs(y-state.y)>.08 || Math.abs(scale-state.scale)>.001 || Math.abs(opacity-state.opacity)>.002) unsettled=true;
      el.style.setProperty('--pg-compare-y',state.y.toFixed(2)+'px');
      el.style.setProperty('--pg-compare-scale',state.scale.toFixed(4));
      el.style.setProperty('--pg-compare-opacity',state.opacity.toFixed(4));
      el.setAttribute('data-pg-compare-state',p>=.999?'entered':p<=.001?'waiting':'entering');
      return {index,progress:Number(p.toFixed(4)),y:Number(y.toFixed(2)),opacity:Number(opacity.toFixed(4))};
    });
    if (unsettled) schedule();
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
      mode: 'independent-smoothed-scroll-linked-v3',
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
