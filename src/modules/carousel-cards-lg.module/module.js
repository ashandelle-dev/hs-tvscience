const swiper = new Swiper('.lg-card-swiper', {
  speed: 300,
  spaceBetween: 0,
  loop: false,
  grabCursor: true,
  perMove:1,
  autoPlay: {
    delay:3000
  },

  centerSlides: true,
  snapOnRelease: true,
  sticky:true,
  mousewheel: {
    enabled: true,
    forceToAxis: true,
  },
  breakpoints: {
  
    480: {
      slidesPerView: 1.5,
      spaceBetween: 0
    },
    767: {
      slidesPerView: 1.5,
      spaceBetween: 0
    },
    767: {
      slidesPerView: 2,
      spaceBetween: 0
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 0
    },
    1024: {
      slidesPerView: 2.5,
      spaceBetween: 0
    }
  }
});