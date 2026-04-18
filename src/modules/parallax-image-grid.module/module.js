/* parallax-image-grid.module
   Smooth lerp-based scroll parallax.
   - target = clamped section progress through the viewport (0..1)
   - smooth = lerp(smooth, target, 0.06) every frame
   - Writes transform directly on the left/right/center column elements
*/
(function () {
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function initSection(section) {
    var leftCol = section.querySelector('.parallax-image-grid__col--left');
    var rightCol = section.querySelector('.parallax-image-grid__col--right');
    var centerCol = section.querySelector('.parallax-image-grid__col--center');
    if (!leftCol && !rightCol && !centerCol) return;

    var sideOffset = parseFloat(section.getAttribute('data-parallax-offset'));
    if (isNaN(sideOffset)) sideOffset = 90;

    var centerDrift = parseFloat(
      section.getAttribute('data-parallax-center-drift')
    );
    if (isNaN(centerDrift)) centerDrift = 5;

    var target = 0;
    var smooth = 0;

    function measure() {
      var rect = section.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var raw = (vh - rect.top) / (vh + rect.height);
      if (raw < 0) raw = 0;
      if (raw > 1) raw = 1;
      target = raw;
    }

    function tick() {
      smooth = lerp(smooth, target, 0.06);
      if (Math.abs(smooth - target) < 0.0001) smooth = target;

      var sidePx = -smooth * sideOffset;
      var centerPct = smooth * centerDrift;

      var sideTransform = 'translate3d(0, ' + sidePx.toFixed(2) + 'px, 0)';
      var centerTransform =
        'translate3d(0, ' + centerPct.toFixed(2) + '%, 0)';

      if (leftCol) leftCol.style.transform = sideTransform;
      if (rightCol) rightCol.style.transform = sideTransform;
      if (centerCol) centerCol.style.transform = centerTransform;

      window.requestAnimationFrame(tick);
    }

    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('orientationchange', measure, { passive: true });

    measure();
    window.requestAnimationFrame(tick);
  }

  function boot() {
    var sections = document.querySelectorAll('[data-parallax-grid]');
    if (!sections.length) return;

    for (var i = 0; i < sections.length; i++) {
      var s = sections[i];
      var enabled = s.getAttribute('data-parallax-enabled');
      if (enabled === 'false' || enabled === 'False') continue;
      initSection(s);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
