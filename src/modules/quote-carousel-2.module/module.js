(function() {
  'use strict';

  function initQuoteCarousel(carousel) {
    const track = carousel.querySelector('.quote-carousel-2__track');
    const slides = carousel.querySelectorAll('.quote-carousel-2__slide');
    const dots = carousel.querySelectorAll('.quote-carousel-2__dot');

    if (slides.length <= 1) return;

    let currentIndex = 0;
    let autoplayInterval = null;
    const autoplay = carousel.dataset.autoplay === 'true';
    const autoplaySpeed = parseInt(carousel.dataset.autoplaySpeed, 10) || 5000;

    function goToSlide(index) {
      // Ensure index is within bounds
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;

      // Update slides
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === index);
      });

      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === index);
        dot.setAttribute('aria-selected', i === index);
      });

      // Move track
      track.style.transform = `translateX(-${index * 100}%)`;

      currentIndex = index;
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function startAutoplay() {
      if (autoplay && !autoplayInterval) {
        autoplayInterval = setInterval(nextSlide, autoplaySpeed);
      }
    }

    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    }

    // Dot click handlers
    dots.forEach((dot) => {
      dot.addEventListener('click', function() {
        const targetIndex = parseInt(this.dataset.slideTarget, 10);
        goToSlide(targetIndex);

        // Reset autoplay timer on manual navigation
        if (autoplay) {
          stopAutoplay();
          startAutoplay();
        }
      });
    });

    // Pause autoplay on hover
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    }, { passive: true });

    carousel.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoplay();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next slide
          goToSlide(currentIndex + 1);
        } else {
          // Swipe right - previous slide
          goToSlide(currentIndex - 1);
        }
      }
    }

    // Keyboard navigation
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') {
        goToSlide(currentIndex - 1);
        stopAutoplay();
        startAutoplay();
      } else if (e.key === 'ArrowRight') {
        goToSlide(currentIndex + 1);
        stopAutoplay();
        startAutoplay();
      }
    });

    // Start autoplay
    startAutoplay();

    // Pause when tab is not visible
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });
  }

  // Initialize all carousels on the page
  function init() {
    const carousels = document.querySelectorAll('.quote-carousel-2');
    carousels.forEach(initQuoteCarousel);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

