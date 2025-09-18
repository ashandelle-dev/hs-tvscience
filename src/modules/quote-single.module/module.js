const swiper = new Swiper('.quote-swiper', {
  speed: 300,
  spaceBetween: 20,
  loop: false,
  grabCursor: false,
  perMove:1,
  autoPlay: {
    delay: 3000
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  centerSlides: true,
  pagination:{
    el: ".swiper-pagination",
    dynamicBullets: false,
    clickable:true
  },
  slidesPerView: 1
});