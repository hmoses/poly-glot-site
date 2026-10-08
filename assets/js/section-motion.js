/* Animate visible content groups rather than tall parent sections. Never hide content before activation. */
(() => {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const init = () => {
    const selectors = [
      '.section-title','.section-eyebrow','.section-sub','.hero h1','.hero-sub',
      '.feature-card','.template-card','.pricing-card','.faq-item','.guide-card',
      '.showcase-inline-section','.conversion-final-card','.trust-item',
      '#knowledge-center h2','#knowledge-center a',
      'main.wrap > h1','main.wrap > .lead','main.wrap article',
      'main > section h2','main > section article',
      '.container > h2','.container > .section-sub'
    ];
    const nodes = [...new Set(selectors.flatMap(s => [...document.querySelectorAll(s)]))];
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        el.style.setProperty('--pg-delay', ((Number(el.dataset.pgMotionIndex)||0)%3)*85+'ms');
        el.classList.add('pg-motion-reveal');
        observer.unobserve(el);
      }
    }, {rootMargin:'0px 0px -10% 0px',threshold:0.12});
    nodes.forEach((el,i) => {
      if (el.closest('.nav, .nav-links, .phone-screen, .pg-phone-screen, .modal, [role="dialog"]')) return;
      el.dataset.pgMotionIndex = String(i);
      observer.observe(el);
    });
  };
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
