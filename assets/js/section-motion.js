/* Subtle Apple-inspired reveal motion. Does not hide content before JS runs. */
(() => {
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const init = () => {
    const nodes = document.querySelectorAll('main > section, body > section, .section, main > article, main.wrap article, #knowledge-center');
    const io = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('pg-float-in');
        observer.unobserve(entry.target);
      }
    }, {rootMargin:'0px 0px -7% 0px', threshold:0.08});
    nodes.forEach(node => {
      if (node.closest('.nav, .nav-links, .phone-screen, .pg-phone-screen, .modal, [role="dialog"]')) return;
      io.observe(node);
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
