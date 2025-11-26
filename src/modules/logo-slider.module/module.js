(function() {
  const sliders = document.querySelectorAll('.logo-slider-container');

  sliders.forEach(slider => {
    const scrollSpeed = slider.getAttribute('data-scroll-speed') || 30;
    const track = slider.querySelector('.logo-slider-track');

    if (track) {
      track.style.setProperty('--scroll-duration', `${scrollSpeed}s`);
    }
  });
})();
