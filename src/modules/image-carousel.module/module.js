const swiper = new Swiper('.swiper', {
  speed: 300,
  spaceBetween: 20,
  slidesPerView: 3,
  autoplay: true,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
   navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 0
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 16
    },
    996: {
      spaceBetween: 20,
      slidesPerView: 3,
    }
  }
});