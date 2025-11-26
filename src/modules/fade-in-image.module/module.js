document.addEventListener('DOMContentLoaded', function () {
    const animateImages = document.querySelectorAll('.animate-image');
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };
    console.log(animateImages);
    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelector('.image-container').classList.add('fade-in-up');
          //entry.target.classList.add('fade-in-up');
          // Optional: Stop observing the element once the class is added
          observer.unobserve(entry.target);
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    animateImages.forEach((animateImage) => {
      observer.observe(animateImage);
    });
  });