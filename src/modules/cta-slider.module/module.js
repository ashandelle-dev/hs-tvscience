(function() {
  'use strict';

  class CTASlider {
    constructor(element) {
      this.container = element;
      // Use class selector as fallback since IDs may not be unique in HubSpot modules
      this.track = this.container.querySelector('.cta-slider-track');

      // Bail out if required elements don't exist
      if (!this.track) {
        console.warn('CTASlider: Track element .cta-slider-track not found');
        return;
      }

      this.originalSlides = Array.from(this.track.querySelectorAll('.cta-slide'));

      // Bail out if no slides
      if (this.originalSlides.length === 0) {
        console.warn('CTASlider: No slides found');
        return;
      }

      this.dots = Array.from(this.container.querySelectorAll('.dot'));

      // Configuration
      this.enableAutoPlay = false; // Set to false to disable autoplay for debugging

      this.totalSlides = this.originalSlides.length;
      this.slideWidth = 545;
      this.slideGap = 0;
      this.isDragging = false;
      this.startX = 0;
      this.currentTranslate = 0;
      this.prevTranslate = 0;
      this.hasDragged = false; // Track if user actually dragged vs clicked
      this.clickThreshold = 10; // Pixels of movement allowed before considering it a drag

      this.init();
    }

    init() {
      // Clone slides before and after
      this.cloneSlides();
      this.slides = Array.from(this.track.querySelectorAll('.cta-slide'));

      // Start at the first real slide (after the prepended clones)
      this.realIndex = 0; // Logical index (0 to totalSlides-1)
      this.actualIndex = this.totalSlides; // Actual DOM index

      // Initial positioning
      this.updateActiveStates();
      this.positionSlider(false);

      // Add dot click handlers
      this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.stopAutoPlay();
        this.goToSlide(index);
        if (this.enableAutoPlay) {
          setTimeout(() => this.startAutoPlay(), 3000);
        }
      });
      });

      // Add touch/drag support
      this.addDragSupport();

      // Add keyboard navigation
      this.container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') this.prev();
        if (e.key === 'ArrowRight') this.next();
      });

      // Handle transition end for infinite loop
      this.track.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'transform') {
          this.checkAndResetPosition();
        }
      });

      // Auto-play
      if (this.enableAutoPlay) {
        this.startAutoPlay();
      }

      // Update on window resize
      window.addEventListener('resize', () => this.positionSlider(false));
    }

    cloneSlides() {
      // Clone all original slides and add to beginning and end
      const fragment1 = document.createDocumentFragment();
      const fragment2 = document.createDocumentFragment();

      this.originalSlides.forEach(slide => {
        const cloneBefore = slide.cloneNode(true);
        const cloneAfter = slide.cloneNode(true);
        cloneBefore.classList.add('clone');
        cloneAfter.classList.add('clone');
        fragment1.appendChild(cloneBefore);
        fragment2.appendChild(cloneAfter);
      });

      this.track.insertBefore(fragment1, this.track.firstChild);
      this.track.appendChild(fragment2);
    }

    goToSlide(logicalIndex) {
      this.realIndex = logicalIndex;
      this.actualIndex = this.totalSlides + logicalIndex;
      this.updateActiveStates();
      this.positionSlider(true);
    }

    next() {
      this.realIndex = (this.realIndex + 1) % this.totalSlides;
      this.actualIndex++;
      this.updateActiveStates();
      this.positionSlider(true);
    }

    prev() {
      this.realIndex = (this.realIndex - 1 + this.totalSlides) % this.totalSlides;
      this.actualIndex--;
      this.updateActiveStates();
      this.positionSlider(true);
    }

    updateActiveStates() {
      // Update all slide classes based on distance from active
      this.slides.forEach((slide, index) => {
        slide.classList.remove('active', 'next-1', 'next-2', 'next-3', 'next-4', 'next-5', 'next-6', 'next-7', 'next-8', 'prev-1', 'prev-2', 'prev-3', 'prev-4', 'prev-5', 'prev-6', 'prev-7', 'prev-8');

        const distance = index - this.actualIndex;

        if (index === this.actualIndex) {
          slide.classList.add('active');
        } else if (distance === 1) {
          slide.classList.add('next-1');
        } else if (distance >= 2) {
          slide.classList.add('next-' + Math.min(distance, 8));
        } else if (distance === -1) {
          slide.classList.add('prev-1');
        } else if (distance <= -2) {
          slide.classList.add('prev-' + Math.min(Math.abs(distance), 8));
        }
      });

      // Update dots
      this.dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.realIndex);
      });
    }

    isMobile() {
      return window.innerWidth <= 768;
    }

    positionSlider(animate = true) {
      const containerWidth = this.container.offsetWidth;
      const actualSlideWidth = this.slides[0]?.offsetWidth || this.slideWidth;

      const slideCenter = actualSlideWidth / 2;
      const containerCenter = containerWidth / 2;

      let translateX;

      if (this.isMobile()) {
        // On mobile: position slide flush left, accounting for 16px gap between slides
        const mobileGap = 16;
        translateX = -(this.actualIndex * (actualSlideWidth + mobileGap));
      } else {
        // Desktop: calculate offset with negative margins
        let totalOffset = 0;
        for (let i = 0; i < this.actualIndex; i++) {
          totalOffset += actualSlideWidth + this.slideGap;

          const distance = this.actualIndex - i;
          if (distance === 1) {
            totalOffset -= 10;
          } else if (distance >= 2) {
            totalOffset -= 50;
          }
        }
        translateX = containerCenter - slideCenter - totalOffset;
      }

      if (animate) {
        this.track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      } else {
        this.track.style.transition = 'none';
      }

      this.track.style.transform = `translateX(${translateX}px)`;
      this.currentTranslate = translateX;
      this.prevTranslate = translateX;
    }

    checkAndResetPosition() {
      // If we've gone into the cloned areas, snap back to real slides
      if (this.actualIndex >= this.totalSlides * 2) {
        // We're in the end clones, jump back to the start of real slides
        this.actualIndex = this.totalSlides + (this.actualIndex - this.totalSlides * 2);
        this.updateActiveStates();
        this.positionSlider(false);
      } else if (this.actualIndex < this.totalSlides) {
        // We're in the beginning clones, jump to the end of real slides
        this.actualIndex = this.totalSlides * 2 - (this.totalSlides - this.actualIndex);
        this.updateActiveStates();
        this.positionSlider(false);
      }
    }

    addDragSupport() {
      this.track.addEventListener('mousedown', this.dragStart.bind(this));
      this.track.addEventListener('mousemove', this.drag.bind(this));
      this.track.addEventListener('mouseup', this.dragEnd.bind(this));
      this.track.addEventListener('mouseleave', this.dragEnd.bind(this));

      this.track.addEventListener('touchstart', this.dragStart.bind(this), { passive: true });
      this.track.addEventListener('touchmove', this.drag.bind(this), { passive: false });
      this.track.addEventListener('touchend', this.dragEnd.bind(this));

      this.slides.forEach(slide => {
        slide.addEventListener('dragstart', (e) => e.preventDefault());
      });
    }

    dragStart(e) {
      this.isDragging = true;
      this.hasDragged = false;
      this.startX = this.getPositionX(e);
      this.dragStartTarget = e.target.closest('.cta-slide');
      this.track.style.transition = 'none';
      this.stopAutoPlay();
    }

    drag(e) {
      if (!this.isDragging) return;
      e.preventDefault();

      const currentX = this.getPositionX(e);
      const diff = currentX - this.startX;

      // Mark as dragged if movement exceeds threshold
      if (Math.abs(diff) > this.clickThreshold) {
        this.hasDragged = true;
      }

      this.currentTranslate = this.prevTranslate + diff;

      this.track.style.transform = `translateX(${this.currentTranslate}px)`;
    }

    dragEnd(e) {
      if (!this.isDragging) return;

      this.isDragging = false;
      const movedBy = this.currentTranslate - this.prevTranslate;

      // If user didn't drag (just clicked), handle click actions
      if (!this.hasDragged && this.dragStartTarget) {
        const slide = this.dragStartTarget;
        const link = slide.dataset.link;

        // If clicked on the active slide with a link, navigate to the link
        if (link && slide.classList.contains('active')) {
          const openInNewTab = slide.dataset.linkNewTab === 'true';
          if (openInNewTab) {
            window.open(link, '_blank', 'noopener,noreferrer');
          } else {
            window.location.href = link;
          }
          return;
        }

        // If clicked on a non-active slide, scroll to it
        if (!slide.classList.contains('active')) {
          const clickedActualIndex = this.slides.indexOf(slide);
          if (clickedActualIndex !== -1) {
            const logicalIndex = parseInt(slide.dataset.slideIndex, 10);
            this.actualIndex = clickedActualIndex;
            this.realIndex = logicalIndex;
            this.updateActiveStates();
            this.positionSlider(true);
          }
          return;
        }
      }

      // Calculate how many slides to move based on drag distance
      const slideWidth = this.slides[0]?.offsetWidth || this.slideWidth;
      const threshold = 50; // Minimum drag distance to trigger a slide change

      if (Math.abs(movedBy) < threshold) {
        // Minimal movement, snap back to current slide
        this.positionSlider(true);
      } else {
        // Calculate slides to move (minimum 1 if we passed threshold)
        const slidesToMove = Math.max(1, Math.round(Math.abs(movedBy) / slideWidth));

        if (movedBy < 0) {
          // Dragged left, go forward
          this.actualIndex += slidesToMove;
          this.realIndex = (this.realIndex + slidesToMove) % this.totalSlides;
        } else {
          // Dragged right, go backward
          this.actualIndex -= slidesToMove;
          this.realIndex = ((this.realIndex - slidesToMove) % this.totalSlides + this.totalSlides) % this.totalSlides;
        }

        this.updateActiveStates();
        this.positionSlider(true);
      }

      if (this.enableAutoPlay) {
        setTimeout(() => this.startAutoPlay(), 3000);
      }
    }

    getPositionX(e) {
      return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }

    startAutoPlay() {
      this.stopAutoPlay();
      this.autoPlayInterval = setInterval(() => {
        this.next();
      }, 5000);
    }

    stopAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    }
  }

  // Initialize all sliders when DOM is ready
  function initSliders() {
    const sliderElements = document.querySelectorAll('.cta-slider-wrapper');
    sliderElements.forEach(el => {
      // Avoid re-initializing
      if (!el.dataset.sliderInitialized) {
        el.dataset.sliderInitialized = 'true';
        new CTASlider(el);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSliders);
  } else {
    initSliders();
  }
})();
