(function() {
  'use strict';

  class CTASlider {
    constructor(element) {
      this.container = element;
      this.track = this.container.querySelector('#ctaSliderTrack');
      this.slides = Array.from(this.track.querySelectorAll('.cta-slide'));
      this.dots = Array.from(this.container.querySelectorAll('.dot'));

      this.currentIndex = 0;
      this.slideWidth = 545; // Base slide width
      this.slideGap = 0; // Gap between slides
      this.isDragging = false;
      this.startX = 0;
      this.currentTranslate = 0;
      this.prevTranslate = 0;

      this.init();
    }

    init() {
      // Set initial active slide
      this.updateSlides();

      // Add dot click handlers
      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => this.goToSlide(index));
      });

      // Add touch/drag support
      this.addDragSupport();

      // Add keyboard navigation
      this.container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') this.prev();
        if (e.key === 'ArrowRight') this.next();
      });

      // Auto-play (optional - remove if not needed)
      this.startAutoPlay();

      // Update on window resize
      window.addEventListener('resize', () => this.updateSlides());
    }

    goToSlide(index) {
      // Stop auto-play on manual interaction
      this.stopAutoPlay();

      this.currentIndex = Math.max(0, Math.min(index, this.slides.length - 1));
      this.updateSlides();
    }

    updateSlides() {
      // Remove active class and position classes from all slides
      this.slides.forEach((slide, index) => {
        slide.classList.remove('active', 'next-1', 'next-2', 'next-3', 'next-4', 'next-5', 'next-6', 'next-7', 'next-8', 'prev-1', 'prev-2', 'prev-3', 'prev-4', 'prev-5', 'prev-6', 'prev-7', 'prev-8');

        // Add position-based classes
        const distance = index - this.currentIndex;
        if (distance === 1) {
          slide.classList.add('next-1');
        } else if (distance >= 2) {
          slide.classList.add('next-' + Math.min(distance, 8));
        } else if (distance === -1) {
          slide.classList.add('prev-1');
        } else if (distance <= -2) {
          slide.classList.add('prev-' + Math.min(Math.abs(distance), 8));
        }
      });

      // Add active class to current slide
      if (this.slides[this.currentIndex]) {
        this.slides[this.currentIndex].classList.add('active');
      }

      // Update dots
      this.dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentIndex);
      });

      // Calculate the transform to center the active slide
      this.centerActiveSlide();
    }

    centerActiveSlide() {
      // Get container width
      const containerWidth = this.container.offsetWidth;

      // Get actual slide width from DOM (in case it changed due to responsive design)
      const actualSlideWidth = this.slides[0]?.offsetWidth || this.slideWidth;

      // Calculate the position where the active slide should be centered
      const slideCenter = actualSlideWidth / 2;
      const containerCenter = containerWidth / 2;

      // Calculate total offset including negative margins
      let totalOffset = 0;
      for (let i = 0; i < this.currentIndex; i++) {
        totalOffset += actualSlideWidth + this.slideGap;

        // Account for negative margins
        const distance = this.currentIndex - i;
        if (distance === 1) {
          totalOffset -= 60; // prev-1 has -60px margin-right
        } else if (distance >= 2) {
          totalOffset -= 170; // prev-2+ has -170px margin-right
        }
      }

      // Calculate the transform needed to center the active slide
      const translateX = containerCenter - slideCenter - totalOffset;

      // Apply the transform
      this.track.style.transform = `translateX(${translateX}px)`;
      this.currentTranslate = translateX;
      this.prevTranslate = translateX;
    }

    next() {
      this.goToSlide(this.currentIndex + 1);
    }

    prev() {
      this.goToSlide(this.currentIndex - 1);
    }

    addDragSupport() {
      // Mouse events
      this.track.addEventListener('mousedown', this.dragStart.bind(this));
      this.track.addEventListener('mousemove', this.drag.bind(this));
      this.track.addEventListener('mouseup', this.dragEnd.bind(this));
      this.track.addEventListener('mouseleave', this.dragEnd.bind(this));

      // Touch events
      this.track.addEventListener('touchstart', this.dragStart.bind(this));
      this.track.addEventListener('touchmove', this.drag.bind(this));
      this.track.addEventListener('touchend', this.dragEnd.bind(this));

      // Prevent default drag behavior on images
      this.slides.forEach(slide => {
        slide.addEventListener('dragstart', (e) => e.preventDefault());
      });
    }

    dragStart(e) {
      this.isDragging = true;
      this.startX = this.getPositionX(e);
      this.track.style.transition = 'none';

      // Stop auto-play when user starts dragging
      this.stopAutoPlay();
    }

    drag(e) {
      if (!this.isDragging) return;

      const currentX = this.getPositionX(e);
      const diff = currentX - this.startX;
      this.currentTranslate = this.prevTranslate + diff;

      this.track.style.transform = `translateX(${this.currentTranslate}px)`;
    }

    dragEnd() {
      if (!this.isDragging) return;

      this.isDragging = false;
      const movedBy = this.currentTranslate - this.prevTranslate;

      // If moved more than 50px, change slide
      if (movedBy < -50 && this.currentIndex < this.slides.length - 1) {
        this.currentIndex++;
      } else if (movedBy > 50 && this.currentIndex > 0) {
        this.currentIndex--;
      }

      this.track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      this.updateSlides();
    }

    getPositionX(e) {
      return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }

    startAutoPlay() {
      this.autoPlayInterval = setInterval(() => {
        const nextIndex = this.currentIndex + 1;
        if (nextIndex >= this.slides.length) {
          this.goToSlide(0);
        } else {
          this.next();
        }
      }, 5000); // Change slide every 5 seconds
    }

    stopAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    }
  }

  // Initialize slider when DOM is ready
  function initSlider() {
    const sliderElement = document.querySelector('.cta-slider-wrapper');
    if (sliderElement) {
      new CTASlider(sliderElement);
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlider);
  } else {
    initSlider();
  }
})();

