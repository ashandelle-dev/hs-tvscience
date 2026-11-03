(function () {
    var HIDDEN = ["invisible", "opacity-0"];

    function init(root) {
        var slides = Array.prototype.slice.call(root.querySelectorAll("[data-slide]"));
        var status = root.querySelector("[data-status]");
        var current = 0;
        if (slides.length < 2) return;

        function show(index) {
            current = (index + slides.length) % slides.length;
            slides.forEach(function (slide, i) {
                var active = i === current;
                HIDDEN.forEach(function (c) { slide.classList.toggle(c, !active); });
                slide.toggleAttribute("inert", !active);
                if (active) slide.removeAttribute("aria-hidden");
                else slide.setAttribute("aria-hidden", "true");
            });
            if (status) status.textContent = current + 1 + " / " + slides.length;
        }

        root.querySelector("[data-prev]").addEventListener("click", function () { show(current - 1); });
        root.querySelector("[data-next]").addEventListener("click", function () { show(current + 1); });
        root.addEventListener("keydown", function (e) {
            if (e.key === "ArrowLeft") show(current - 1);
            else if (e.key === "ArrowRight") show(current + 1);
        });
    }

    function boot() {
        Array.prototype.forEach.call(document.querySelectorAll("[data-quote-carousel]"), init);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
