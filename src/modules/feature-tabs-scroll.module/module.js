(function () {
  'use strict';

  var DESKTOP_BP = 1024;

  function isDesktop() {
    return window.innerWidth >= DESKTOP_BP;
  }

  function clamp(v, lo, hi) {
    return v < lo ? lo : v > hi ? hi : v;
  }

  function initSection(section) {
    var track = section.querySelector('.ftscroll-track');
    var pin = section.querySelector('.ftscroll-pin');
    var labels = section.querySelectorAll('.ftscroll-label');
    var panels = section.querySelectorAll('.ftscroll-panel');
    if (!track || !pin || !labels.length || !panels.length) return;

    var pinEnabledAttr = (section.getAttribute('data-pin-enabled') || 'true').toLowerCase();
    var pinEnabled = pinEnabledAttr !== 'false';

    var tabCount = labels.length;
    var currentIndex = -1;
    var currentState = '';
    var ticking = false;

    function setActive(index) {
      if (index === currentIndex) return;
      currentIndex = index;
      for (var i = 0; i < labels.length; i++) {
        if (i === index) {
          labels[i].setAttribute('data-active', 'true');
        } else {
          labels[i].removeAttribute('data-active');
        }
      }
      for (var j = 0; j < panels.length; j++) {
        if (j === index) {
          panels[j].setAttribute('data-active', 'true');
        } else {
          panels[j].removeAttribute('data-active');
        }
      }
    }

    function setPinState(state, trackRect) {
      if (state === currentState) {
        if (state === 'pinned' && trackRect) {
          pin.style.left = trackRect.left + 'px';
          pin.style.width = trackRect.width + 'px';
        }
        return;
      }
      currentState = state;
      pin.setAttribute('data-pin-state', state);
      if (state === 'pinned' && trackRect) {
        pin.style.left = trackRect.left + 'px';
        pin.style.width = trackRect.width + 'px';
      } else {
        pin.style.left = '';
        pin.style.width = '';
      }
    }

    function update() {
      ticking = false;
      if (!isDesktop() || !pinEnabled) {
        setPinState('top', null);
        return;
      }

      var rect = track.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var scrollable = rect.height - vh;

      if (scrollable <= 0) {
        setPinState('top', null);
        setActive(0);
        return;
      }

      if (rect.top >= 0) {
        setPinState('top', rect);
        setActive(0);
      } else if (rect.bottom <= vh) {
        setPinState('bottom', rect);
        setActive(tabCount - 1);
      } else {
        setPinState('pinned', rect);
        var progress = clamp(-rect.top / scrollable, 0, 1);
        var index = Math.floor(progress * tabCount);
        if (index >= tabCount) index = tabCount - 1;
        setActive(index);
      }
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    function onLabelClick() {
      var idx = parseInt(this.getAttribute('data-tab-index'), 10);
      if (isNaN(idx)) return;

      if (!pinEnabled || !isDesktop()) {
        setActive(idx);
        return;
      }

      var rect = track.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var scrollable = rect.height - vh;
      if (scrollable <= 0) return;
      var sliceCenter = (idx + 0.5) / labels.length;
      var targetTop = window.pageYOffset + rect.top + sliceCenter * scrollable;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }

    for (var k = 0; k < labels.length; k++) {
      labels[k].addEventListener('click', onLabelClick);
    }

    if (pinEnabled) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      window.addEventListener('orientationchange', onScroll, { passive: true });
      update();
    }
  }

  function boot() {
    var sections = document.querySelectorAll('[data-ftscroll]');
    for (var i = 0; i < sections.length; i++) {
      initSection(sections[i]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
