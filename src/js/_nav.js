const mobileNavTrigger = document.getElementById("mobile-nav-trigger");

const mainNavMenu = document.getElementById("main-nav-menu");

const menuItems = Array.prototype.slice.call( document.querySelectorAll(".menu-item") );

const mobileNavOpen = document.getElementById("mobile-nav-open") || null;

const mobileNavClose = document.getElementById("mobile-nav-close") || null;

const mobileNavDropdownOpen = document.getElementById("mobile-nav-dropdown-open") || null;

if( mobileNavOpen  ) {
  mobileNavOpen.addEventListener("click", function() {
    mobileNavClose.classList.remove("hidden");
    mobileNavOpen.classList.add("hidden");
    mainNavMenu.classList.add("active");
    document.body.classList.add("mobile-open");
  });
}

if( mobileNavClose ) {
  mobileNavClose.addEventListener("click", function() {
    mobileNavClose.classList.add("hidden");
    mobileNavOpen.classList.remove("hidden");
    mainNavMenu.classList.remove("active");
    document.body.classList.remove("mobile-open");
  });
}


menuItems.forEach(item => {

  item.addEventListener("click", function(e) {
    // item.querySelector(".sub-menu-caret").classList.toggle("rotate-90");
    if(item.querySelector(".child-dropdown")) {
    item.querySelector(".child-dropdown").classList.add("active");
    }

    mobileNavDropdownOpen.classList.remove("hidden");
    mobileNavClose.classList.add("hidden");
    mobileNavOpen.classList.add("hidden");
  });
  
});

if( mobileNavDropdownOpen ) {


mobileNavDropdownOpen.addEventListener("click", function(e) {
  // e.preventDefault();
  console.log("mobileNavDropdownOpen clicked");
 
  menuItems.forEach(item => {
 
    if(item.querySelector(".child-dropdown")) {

      item.querySelector(".child-dropdown").classList.remove("active");

    }
  });

  mobileNavDropdownOpen.classList.add("hidden");
  mobileNavClose.classList.remove("hidden");
  mobileNavOpen.classList.add("hidden");

});

}
function getCookie (name) {
  let value = `; ${document.cookie}`;
  let parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

document.addEventListener("DOMContentLoaded", (event) => {
  document.addEventListener('click', function (event) {
    if (!event.target.matches('svg')) return;
    event.preventDefault();
    document.querySelector('.header-banner').style.display = 'none';
    document.cookie = 'banner=closed;max-age=${60 * 60 * 24 * 14};';

  }, false);
  let bannerVis = getCookie('banner');
  if(bannerVis == 'closed') {
    document.querySelector('.header-banner').classList.add('hidden');
  }
});
