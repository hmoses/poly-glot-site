/* Independent, restrained scroll parallax for Photo to AI, comparison and App Preview cards.
 * Uses rAF and visibility checks; respects reduced motion. No click or tab interception. */
(function(w,d){'use strict';
  if(!w.requestAnimationFrame || !w.matchMedia)return;
  var motion=w.matchMedia('(prefers-reduced-motion: reduce)');
  var selectors=[
    '#pg-ios-photo-ai-site .pg-photo-motion-card',
    '#value #pg-sc1-chunks > .pg-sc1-chunk',
    '#value .inline-pricing-row > .inline-price-item',
    '#apps #pg-compare-guide',
    '#apps .pg-compare-guide-steps > li',
    '#screenshots .gallery-grid > .gallery-item',
    '#screenshots .mac-reference-interactive'
  ].join(',');
  var cards=[],visible=new Set(),observer=null,raf=0,states=new WeakMap(),lastFrame=0;
  function clamp(x,lo,hi){return Math.min(hi,Math.max(lo,x));}
  function reset(){
    states=new WeakMap();lastFrame=0;
    cards.forEach(function(card){
      card.style.removeProperty('--pg-apple-card-y');
      card.style.removeProperty('--pg-apple-card-tilt');
      card.style.removeProperty('--pg-apple-card-shadow');
    });
  }
  function apply(now){
    raf=0;if(motion.matches||d.hidden)return;
    var dt=lastFrame?Math.min(64,now-lastFrame):16.7;lastFrame=now;
    var blend=1-Math.exp(-dt/90),moving=false;
    var vh=w.innerHeight||800,mobile=w.innerWidth<700;
    cards.forEach(function(card,index){
      if(observer&&!visible.has(card))return;
      var r=card.getBoundingClientRect();
      if(!r.height||r.bottom< -100||r.top>vh+100)return;
      var state=states.get(card)||{y:0,tilt:0,shadow:8};
      /* Undo our own transform when sampling position to prevent feedback. */
      var center=(r.top-state.y+r.height/2-vh/2)/Math.max(vh,1);
      var progress=clamp(center,-1,1),stagger=(index%3-1)*.6;
      var targetY=clamp(-progress*(mobile?16:28)+stagger,mobile?-17:-29,mobile?17:29);
      var targetTilt=clamp(progress*(mobile?.45:1.05),-1.1,1.1);
      var targetShadow=8+(1-Math.abs(progress))*8;
      state.y+=(targetY-state.y)*blend;
      state.tilt+=(targetTilt-state.tilt)*blend;
      state.shadow+=(targetShadow-state.shadow)*blend;
      states.set(card,state);
      if(Math.abs(targetY-state.y)>.08||Math.abs(targetTilt-state.tilt)>.015)moving=true;
      card.style.setProperty('--pg-apple-card-y',state.y.toFixed(2)+'px');
      card.style.setProperty('--pg-apple-card-tilt',state.tilt.toFixed(2)+'deg');
      card.style.setProperty('--pg-apple-card-shadow',state.shadow.toFixed(1)+'px');
    });
    if(moving)schedule();
  }
  function schedule(){if(!raf&&!motion.matches&&!d.hidden)raf=w.requestAnimationFrame(apply);}
  function setup(){
    cards=Array.from(d.querySelectorAll(selectors));
    if(!cards.length)return;
    if('IntersectionObserver' in w){
      observer=new IntersectionObserver(function(entries){
        entries.forEach(function(entry){if(entry.isIntersecting)visible.add(entry.target);else visible.delete(entry.target);});
        schedule();
      },{rootMargin:'100px 0px 100px 0px',threshold:0});
      cards.forEach(function(card){observer.observe(card);});
    }
    w.addEventListener('scroll',schedule,{passive:true});
    w.addEventListener('resize',schedule,{passive:true});
    w.addEventListener('pageshow',schedule,{passive:true});
    d.addEventListener('visibilitychange',schedule,{passive:true});
    w.addEventListener('pg:languagechange',schedule);
    motion.addEventListener('change',function(){if(motion.matches){if(raf)w.cancelAnimationFrame(raf);raf=0;reset();}else schedule();});
    schedule();
  }
  if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',setup,{once:true});else setup();
})(window,document);
