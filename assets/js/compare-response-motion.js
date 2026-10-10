/* Three Compare Mode response cards enter separately, never as a single group.
 * Motion is opt-in; content is fully visible without JS or with reduced motion. */
(()=>{
  'use strict';
  const selector='#apps .inline-response-list > .inline-response-row';
  const reduced=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  const interval=240;
  let observer=null;
  let nextReveal=0;
  const pending=new Set();
  function show(el) {
    pending.delete(el);
    if (!el.isConnected) return;
    el.classList.add('pg-compare-visible');
    el.setAttribute('data-pg-compare-state','visible');
  }
  function prepare() {
    const cards=[...document.querySelectorAll(selector)];
    if (cards.length!==3) return;
    if (reduced && reduced.matches) {
      cards.forEach(el=>{
        el.classList.remove('pg-compare-reveal-ready','pg-compare-visible','pg-compare-finished');
        el.removeAttribute('data-pg-compare-state');
      });
      return;
    }
    if (!('IntersectionObserver' in window)) return;
    cards.forEach((el,index)=>{
      el.classList.add('pg-compare-reveal-ready');
      el.dataset.pgCompareIndex=String(index);
      el.setAttribute('data-pg-compare-state','waiting');
      el.addEventListener('transitionend',event=>{
        if (event.target===el && event.propertyName==='transform' && el.classList.contains('pg-compare-visible')) {
          el.classList.add('pg-compare-finished');
        }
      },{passive:true});
    });
    observer=new IntersectionObserver(entries=>{
      // Even if all three enter on the same frame, they start independently.
      entries.filter(entry=>entry.isIntersecting).sort((a,b)=>
        Number(a.target.dataset.pgCompareIndex)-Number(b.target.dataset.pgCompareIndex)
      ).forEach(entry=>{
        const el=entry.target;
        observer.unobserve(el);
        if (pending.has(el) || el.classList.contains('pg-compare-visible')) return;
        pending.add(el);
        const now=performance.now();
        const start=Math.max(now,nextReveal);
        nextReveal=start+interval;
        window.setTimeout(()=>show(el),Math.max(0,start-now));
      });
    },{threshold:.14,rootMargin:'0px 0px -10% 0px'});
    cards.forEach(el=>observer.observe(el));
    window._pgCompareResponseMotion={
      cards:()=>cards,
      status:()=>cards.map(el=>el.getAttribute('data-pg-compare-state')),
      mode:'individual-staggered-v1'
    };
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',prepare,{once:true});
  else prepare();
  if(reduced) reduced.addEventListener('change',()=>{
    if(reduced.matches){
      observer?.disconnect();
      document.querySelectorAll(selector).forEach(el=>{
        el.classList.add('pg-compare-visible');
        el.setAttribute('data-pg-compare-state','visible');
      });
    }
  });
})();
