// import Flickity from "flickity";
// const swiper = new Swiper('.logo-swiper', {
//   speed: 300,

  
//   spaceBetween: 30,
//   freeMode:true,
//   slidesPerView: 5,
//   loop: true,
//   autoplay: {
//     delay: 10,
//     waitForTransition: false,
//     pauseOnMouseEnter: true,
//   },
//   grabCursor: true,
//   centerSlides: true,
//   breakpoints: {
//     // when window width is >= 320px
//     // 320: {
//     //   slidesPerView: 1.5,
//     //   spaceBetween: 20
//     // },
//     // // when window width is >= 480px
//     // 480: {
//     //   slidesPerView: 2.5,
//     //   spaceBetween: 30
//     // },
//     // // when window width is >= 640px
//     // 767: {
//     //   slidesPerView: 2.5,
//     //   spaceBetween: 40
//     // }
//   }

// });

// const logo_swiper = new Swiper('.logo-swiper',{
//   spaceBetween: 40,
//   grabCursor: false,
//   a11y: false,
//   freeMode: true,
//   speed: 5000,
//   loop: true,
//   autoplay: {
//     delay: 0,
//     disableOnInteraction: false,
//     // pauseOnMouseEnter:true
//   },
//   breakpoints: {
    
//     480: {
//       slidesPerView: 3,
//       // spaceBetween: 30
//     },
//     // when window width is >= 640px
//     767: {
//       slidesPerView: 6,
//       // spaceBetween: 10
//     }

//   },
// });
document.addEventListener("DOMContentLoaded", function() {


if( document.querySelector(".carousel-ticker") ) {

    // Play with this value to change the speed
    let tickerSpeed = .2;

    let flickity = null;
    let isPaused = false;
    const slideshowEl = document.querySelector(".carousel-ticker");

    const update = () => {
        if (isPaused) return;
        if (flickity.slides) {
            flickity.x = (flickity.x - tickerSpeed) % flickity.slideableWidth;
            flickity.selectedIndex = flickity.dragEndRestingSelect();
            flickity.updateSelectedSlide();
            flickity.settle(flickity.x);
        }
        window.requestAnimationFrame(update);
    };

    // const pause = () => {
    //     isPaused = true;
    // };

    // const play = () => {
    //     if (isPaused) {
    //         isPaused = false;
    //         window.requestAnimationFrame(update);
    //     }
    // };

    flickity = new Flickity(slideshowEl, {
        autoPlay: false,
        prevNextButtons: false,
        pageDots: false,
        draggable: false,
        wrapAround: true,
        selectedAttraction: 0.015,
        friction: 0.25,
        cellAlign: 0,
    });

    flickity.x = 0;

    // slideshowEl.addEventListener("mouseenter", pause, false);
    // slideshowEl.addEventListener("focusin", pause, false);
    // slideshowEl.addEventListener("mouseleave", play, false);
    // slideshowEl.addEventListener("focusout", play, false);

    flickity.on("dragStart", () => {
        isPaused = true;
    });

    // Start Ticker
    update();


}
});
