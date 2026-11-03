(function () {
    var desktop = window.matchMedia("(min-width: 1024px)");

    function init(section) {
        var track = section.querySelector("[data-tabs-track]");
        if (!track) return;
        var tabs = Array.prototype.slice.call(track.querySelectorAll('[role="tab"]'));
        var panels = Array.prototype.slice.call(track.querySelectorAll('[role="tabpanel"]'));
        var pin = section.getAttribute("data-pin") === "true";
        var distance = parseFloat(track.getAttribute("data-distance")) || 100;
        var current = 0;
        var ticking = false;

        function activate(index) {
            if (index === current) return;
            current = index;
            tabs.forEach(function (tab, i) {
                var on = i === index;
                tab.setAttribute("aria-selected", on ? "true" : "false");
                tab.tabIndex = on ? 0 : -1;
            });
            panels.forEach(function (panel, i) { panel.hidden = i !== index; });
        }

        function sizeTrack() {
            track.style.height = pin && desktop.matches ? tabs.length * distance + "vh" : "";
        }

        function update() {
            ticking = false;
            if (!pin || !desktop.matches) return;
            var rect = track.getBoundingClientRect();
            var vh = window.innerHeight || document.documentElement.clientHeight;
            var scrollable = rect.height - vh;
            if (scrollable <= 0) return;
            var progress = Math.min(1, Math.max(0, -rect.top / scrollable));
            activate(Math.min(tabs.length - 1, Math.floor(progress * tabs.length)));
        }

        function onScroll() {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(update);
        }

        function select(index, focus) {
            if (pin && desktop.matches) {
                var rect = track.getBoundingClientRect();
                var vh = window.innerHeight || document.documentElement.clientHeight;
                var scrollable = rect.height - vh;
                var target = window.pageYOffset + rect.top + ((index + 0.5) / tabs.length) * scrollable;
                window.scrollTo({ top: target, behavior: "smooth" });
            }
            activate(index);
            if (focus) tabs[index].focus();
        }

        tabs.forEach(function (tab, i) {
            tab.addEventListener("click", function () { select(i, false); });
            tab.addEventListener("keydown", function (event) {
                var next = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[event.key];
                if (next === undefined) return;
                event.preventDefault();
                select((next + tabs.length) % tabs.length, true);
            });
        });

        sizeTrack();
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", function () { sizeTrack(); onScroll(); }, { passive: true });
        desktop.addEventListener("change", function () { sizeTrack(); onScroll(); });
    }

    function boot() {
        document.querySelectorAll("[data-feature-tabs]").forEach(init);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
