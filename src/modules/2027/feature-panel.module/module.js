(function () {
    var RISE = 90;
    var DRIFT = 5;
    var desktop = window.matchMedia("(min-width: 1024px)");
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function init(grid) {
        var cards = Array.prototype.slice.call(grid.querySelectorAll("[data-parallax-dir]"));
        var target = 0;
        var smooth = 0;

        function measure() {
            var rect = grid.getBoundingClientRect();
            var vh = window.innerHeight || document.documentElement.clientHeight;
            target = Math.min(1, Math.max(0, (vh - rect.bottom) / vh));
        }

        // Continuous loop so the easing never stalls between scroll events
        function tick() {
            if (desktop.matches && !reducedMotion.matches) {
                smooth += (target - smooth) * 0.06;
                if (Math.abs(smooth - target) < 0.0001) smooth = target;
                cards.forEach(function (c) {
                    c.style.transform = c.getAttribute("data-parallax-dir") === "down"
                        ? "translate3d(0, " + (smooth * DRIFT).toFixed(2) + "%, 0)"
                        : "translate3d(0, " + (-smooth * RISE).toFixed(2) + "px, 0)";
                });
            } else if (cards[0] && cards[0].style.transform) {
                cards.forEach(function (c) { c.style.transform = ""; });
                smooth = 0;
            }
            window.requestAnimationFrame(tick);
        }

        window.addEventListener("scroll", measure, { passive: true });
        window.addEventListener("resize", measure, { passive: true });
        measure();
        window.requestAnimationFrame(tick);
    }

    function boot() {
        Array.prototype.forEach.call(document.querySelectorAll("[data-parallax-grid]"), init);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
