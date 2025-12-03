(function() {
  'use strict';

  function initProgressBarSingle() {
    const bars = document.querySelectorAll('.progress-bar-single.animate');

    if (!bars.length) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    });

    bars.forEach(function(bar) {
      observer.observe(bar);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProgressBarSingle);
  } else {
    initProgressBarSingle();
  }
})();

