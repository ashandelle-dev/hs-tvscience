(function() {
  'use strict';

  function initProgressBars() {
    const containers = document.querySelectorAll('.progress-bars');

    containers.forEach(function(container) {
      const items = container.querySelectorAll('.progress-bars__item');

      if (!items.length) return;

      // Create intersection observer for scroll-triggered animations
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const item = entry.target;

            // Add visible class to trigger fade/slide animation
            item.classList.add('is-visible');

            // Animate the progress bar fill
            const fill = item.querySelector('.progress-bars__fill');
            if (fill) {
              const fillPercent = fill.getAttribute('data-fill') || 0;
              // Small delay to ensure the item is visible first
              setTimeout(function() {
                fill.style.width = fillPercent + '%';
              }, 100);
            }

            // Stop observing this item after it's animated
            observer.unobserve(item);
          }
        });
      }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      });

      // Observe each item
      items.forEach(function(item) {
        observer.observe(item);
      });
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProgressBars);
  } else {
    initProgressBars();
  }

  // Re-initialize if content is dynamically loaded (HubSpot preview, etc.)
  if (typeof window.hsInEditor !== 'undefined' && window.hsInEditor) {
    // In editor mode, run immediately
    initProgressBars();
  }
})();

