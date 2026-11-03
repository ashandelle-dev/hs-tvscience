(function () {
    var TRAVEL = 0.5;
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var frames = [];
    var ticking = false;

    function update() {
        ticking = false;
        var vh = window.innerHeight || document.documentElement.clientHeight;
        frames.forEach(function (frame) {
            var img = frame.querySelector("img");
            if (!img) return;
            var travel = (img.offsetHeight - frame.clientHeight) * TRAVEL;
            if (travel <= 0 || reducedMotion.matches) {
                img.style.transform = "";
                return;
            }
            var rect = frame.getBoundingClientRect();
            var progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
            img.style.transform = "translate3d(0, " + (-progress * travel).toFixed(1) + "px, 0)";
        });
    }

    function onScroll() {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
    }

    function boot() {
        frames = Array.prototype.slice.call(document.querySelectorAll("[data-scroll-frame]"));
        if (!frames.length) return;
        frames.forEach(function (frame) {
            var img = frame.querySelector("img");
            if (img && !img.complete) img.addEventListener("load", onScroll);
        });
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        reducedMotion.addEventListener("change", onScroll);
        update();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();

/* "Fade the image up" option. The hidden start state is only applied here, so images stay visible without JS. */
(function () {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function boot() {
        var images = document.querySelectorAll("[data-fade-up]");
        if (!images.length) return;
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.5 });
        Array.prototype.forEach.call(images, function (img) {
            img.classList.add("fade-up");
            observer.observe(img);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
