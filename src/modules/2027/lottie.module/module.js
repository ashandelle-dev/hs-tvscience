(function () {
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function init(player) {
        var ready = false;
        var inView = false;
        var played = false;

        function tryPlay() {
            if (!ready || !inView || played || reducedMotion) return;
            played = true;
            player.play();
        }

        player.addEventListener("ready", function () {
            ready = true;
            player.stop();
            tryPlay();
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var vh = window.innerHeight || document.documentElement.clientHeight || 0;
                var tall = vh > 0 && entry.boundingClientRect.height > vh * 0.9;
                var ratio = entry.intersectionRatio;
                var shouldPlay = tall
                    ? ratio >= 0.35 || (entry.boundingClientRect.top < vh * 0.3 && ratio > 0.2)
                    : ratio >= 0.85;
                if (shouldPlay) {
                    inView = true;
                    tryPlay();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: [0, 0.2, 0.35, 0.5, 0.75, 0.85, 1] });

        observer.observe(player);
    }

    function boot() {
        document.querySelectorAll("lottie-player[data-play-in-view]").forEach(init);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
