(function () {
    var desktop = window.matchMedia("(min-width: 768px)");
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function init(section) {
        var sides = section.querySelectorAll('[data-parallax="side"]');
        var center = section.querySelector('[data-parallax="center"]');
        var sideOffset = parseFloat(section.getAttribute("data-side-offset")) || 0;
        var centerDrift = parseFloat(section.getAttribute("data-center-drift")) || 0;
        var target = 0;
        var current = 0;
        var frame = null;

        function apply(progress) {
            var side = "translate3d(0, " + (-progress * sideOffset).toFixed(2) + "px, 0)";
            var mid = "translate3d(0, " + (progress * centerDrift).toFixed(2) + "%, 0)";
            sides.forEach(function (el) { el.style.transform = side; });
            if (center) center.style.transform = mid;
        }

        function measure() {
            if (!desktop.matches || reducedMotion.matches) {
                target = 0;
                current = 0;
                apply(0);
                return;
            }
            var rect = section.getBoundingClientRect();
            var vh = window.innerHeight || document.documentElement.clientHeight;
            target = Math.min(1, Math.max(0, (vh - rect.bottom) / vh));
            if (!frame) frame = window.requestAnimationFrame(tick);
        }

        function tick() {
            current += (target - current) * 0.06;
            if (Math.abs(target - current) < 0.0001) current = target;
            apply(current);
            frame = current === target ? null : window.requestAnimationFrame(tick);
        }

        window.addEventListener("scroll", measure, { passive: true });
        window.addEventListener("resize", measure, { passive: true });
        desktop.addEventListener("change", measure);
        reducedMotion.addEventListener("change", measure);
        measure();
    }

    function initLotties(section) {
        var grid = section.querySelector("[data-hero-grid]");
        var players = Array.prototype.slice.call(section.querySelectorAll("lottie-player[data-hero-lottie]"));
        if (!grid || !players.length) return;
        var inView = false;
        var ready = players.map(function () { return false; });

        function tryPlay() {
            if (!inView || reducedMotion.matches) return;
            players.forEach(function (player, i) {
                if (ready[i] && !player.hasAttribute("data-started")) {
                    player.setAttribute("data-started", "");
                    player.play();
                }
            });
        }

        players.forEach(function (player, i) {
            function onReady() {
                if (ready[i]) return;
                ready[i] = true;
                player.stop();
                // Animations with an empty first frame wait on a frame that shows their badge, then play on from it
                var hold = player.getAttribute("data-hold-frame");
                if (hold) player.seek(hold);
                tryPlay();
            }
            player.addEventListener("ready", onReady);
            // Already loaded before this script ran (lottie-player sets currentState once loaded)
            if (player.currentState && player.currentState !== "loading") onReady();
        });

        function check() {
            if (inView) return;
            var rect = grid.getBoundingClientRect();
            var vh = window.innerHeight || document.documentElement.clientHeight;
            // Whole grid visible; a grid taller than the viewport counts once it fills the screen
            if ((rect.top >= 0 && rect.bottom <= vh) || (rect.height > vh && rect.top <= 0 && rect.bottom >= vh)) {
                inView = true;
                window.removeEventListener("scroll", check);
                window.removeEventListener("resize", check);
                tryPlay();
            }
        }

        window.addEventListener("scroll", check, { passive: true });
        window.addEventListener("resize", check, { passive: true });
        check();
    }

    function boot() {
        document.querySelectorAll("[data-hero-parallax]").forEach(function (section) {
            if (section.getAttribute("data-parallax-enabled") !== "false") init(section);
            initLotties(section);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
