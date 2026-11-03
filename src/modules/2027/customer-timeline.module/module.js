(function () {
    var desktop = window.matchMedia("(min-width: 1024px)");

    function init(list) {
        var line = list.querySelector("[data-timeline-line]");
        var marker = list.querySelector("[data-timeline-marker]");
        var dots = Array.prototype.slice.call(list.querySelectorAll("[data-timeline-dot]"));
        if (!line || !marker || !dots.length) return;
        var ticking = false;

        function centerOf(el) {
            var r = el.getBoundingClientRect();
            var l = list.getBoundingClientRect();
            return { x: r.left - l.left + r.width / 2, y: r.top - l.top + r.height / 2 };
        }

        function layout() {
            if (!desktop.matches) return;
            var first = centerOf(dots[0]);
            var last = centerOf(dots[dots.length - 1]);
            line.style.left = first.x - line.offsetWidth / 2 + "px";
            line.style.top = first.y + "px";
            line.style.height = Math.max(0, last.y - first.y) + "px";
        }

        function update() {
            ticking = false;
            if (!desktop.matches) return;
            var mid = (window.innerHeight || document.documentElement.clientHeight) / 2;
            var active = 0;
            dots.forEach(function (dot, i) {
                if (dot.getBoundingClientRect().top <= mid) active = i;
            });
            dots.forEach(function (dot, i) {
                if (i <= active) dot.setAttribute("data-active", "");
                else dot.removeAttribute("data-active");
            });
            var travel = line.offsetHeight - marker.offsetHeight;
            var y = dots.length > 1 ? (centerOf(dots[active]).y - centerOf(dots[0]).y) : 0;
            marker.style.transform = "translateY(" + Math.max(0, Math.min(travel, y - marker.offsetHeight / 2)) + "px)";
        }

        function onScroll() {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(update);
        }

        function refresh() { layout(); update(); }

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", refresh, { passive: true });
        window.addEventListener("load", refresh);
        desktop.addEventListener("change", refresh);
        Array.prototype.forEach.call(list.querySelectorAll("img"), function (img) {
            if (!img.complete) img.addEventListener("load", refresh);
        });
        refresh();
    }

    function boot() {
        Array.prototype.forEach.call(document.querySelectorAll("[data-timeline]"), init);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
