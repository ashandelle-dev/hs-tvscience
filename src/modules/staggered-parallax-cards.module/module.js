/* staggered-parallax-cards.module
   Same lerp scroll engine as parallax-image-grid, applied per card by direction. */
(function () {
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function initSection(section) {
    var cards = section.querySelectorAll('.staggered-parallax-cards__card');
    if (!cards.length) return;

    var riseOffset = parseFloat(section.getAttribute('data-parallax-rise'));
    if (isNaN(riseOffset)) riseOffset = 90;

    var driftPercent = parseFloat(section.getAttribute('data-parallax-drift'));
    if (isNaN(driftPercent)) driftPercent = 5;

    var target = 0;
    var smooth = 0;

    function measure() {
      var rect = section.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var raw = (vh - rect.bottom) / vh;
      if (raw < 0) raw = 0;
      if (raw > 1) raw = 1;
      target = raw;
    }

    function tick() {
      smooth = lerp(smooth, target, 0.06);
      if (Math.abs(smooth - target) < 0.0001) smooth = target;

      for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var dir = card.getAttribute('data-parallax-direction') || 'up';

        if (dir === 'none') {
          card.style.transform = '';
          continue;
        }

        if (dir === 'down') {
          card.style.transform =
            'translate3d(0, ' + (smooth * driftPercent).toFixed(2) + '%, 0)';
        } else {
          card.style.transform =
            'translate3d(0, ' + (-smooth * riseOffset).toFixed(2) + 'px, 0)';
        }
      }

      window.requestAnimationFrame(tick);
    }

    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('orientationchange', measure, { passive: true });

    measure();
    window.requestAnimationFrame(tick);
  }

  function boot() {
    var sections = document.querySelectorAll('[data-staggered-parallax]');
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
