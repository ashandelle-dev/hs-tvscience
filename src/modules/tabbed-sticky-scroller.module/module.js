window.addEventListener("load", (event) => {
  // Intersection observer
  function createIntersectionObserver(
    callback, 
    opts = { 
      root: null, // viewport
      rootMargin: '0px', 
      threshold: 0.5 // at 50% visible
    }) {
      var previousY = new Map();
      var observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function (entry) {
          var currY = entry.boundingClientRect.y;
          var prevY = previousY.get(entry.target);
          if ( currY < prevY ) { /* scroll down */ entry.scrollDirectionY = 'down'; }
          if ( currY > prevY ) { /* scroll up */ entry.scrollDirectionY = 'up'; }
          callback(entry, observer, entries);
          previousY.set(entry.target, currY);
        });
      }, opts)
    
      return observer;
  }

  // Observer
  var observer = createIntersectionObserver(function(entry){
      var sectionNumber = entry.target.dataset.sectionNumber;
      var sectionImage = document.getElementById('stickyScrollerImage' + sectionNumber);
      var sectionTab = document.getElementById('stickyScrollerTab' + sectionNumber);
      var sectionLottie = document.getElementById('stickyScrollerLottie' + sectionNumber);
      if (sectionLottie) {
        var sectionLottiePlayer = sectionLottie.getLottie();
      }
      var numberOfSections = entry.target.dataset.numberOfSections;
      if (entry.isIntersecting) {
        sectionImage.classList.remove('is-hidden');
        sectionTab.classList.add('is-selected');
        if (sectionLottie) {
          sectionLottiePlayer.goToAndPlay(0,false);
        }
      }
      else {
        if ((sectionNumber === "1") && (entry.scrollDirectionY == 'up')) { 
          // scrolling up past first section
          sectionImage.classList.remove('is-hidden');
          sectionTab.classList.add('is-selected');
          if (sectionLottie) {
            sectionLottiePlayer.goToAndPlay(0,false);
          }
        } else if ((sectionNumber === numberOfSections) && (entry.scrollDirectionY == 'down')) { 
          // scrolling down past last section
          sectionImage.classList.remove('is-hidden');
          sectionTab.classList.add('is-selected');
          if (sectionLottie) {
            sectionLottiePlayer.goToAndPlay(0,false);
          }
        } else {
          sectionImage.classList.add('is-hidden');
          sectionTab.classList.remove('is-selected');
        }
      }
  });
    
  document.querySelectorAll('.sticky-scroller__section').forEach(function(el) { observer.observe(el); });

  const sectionTabs = document.querySelectorAll('.sticky-scroller__tab');
  sectionTabs.forEach((sectionTab) => {
    sectionTab.addEventListener('click', function(){
      var scrollTargetID = sectionTab.dataset.target;
      document.querySelector('[data-section-number="'+scrollTargetID+'"]').scrollIntoView({behavior: 'smooth', block: 'start'});
    });
  });
});

// Reduce LottieFile Size
const players = document.querySelectorAll("lottie-player");
players.forEach((player) => {
  const svg = player.shadowRoot.querySelector("svg")
  //svg.setAttribute('preserveAspectRatio', 'none');
  //svg.removeAttribute('style');
});