(function () {
    function init(root) {
        var groups = Array.prototype.slice.call(root.querySelectorAll("[data-filter-group]"));
        var cards = Array.prototype.slice.call(root.querySelectorAll("[data-integration]"));
        var sections = Array.prototype.slice.call(root.querySelectorAll("[data-integration-section]"));
        var empty = root.querySelector("[data-no-results]");
        var status = root.querySelector("[data-filter-status]");
        var clear = root.querySelector("[data-clear]");
        if (!groups.length || !cards.length) return;

        function buttons(group) {
            return Array.prototype.slice.call(group.querySelectorAll("[data-filter]"));
        }

        function picked(group) {
            return buttons(group)
                .filter(function (b) { return b.getAttribute("aria-pressed") === "true"; })
                .map(function (b) { return b.getAttribute("data-filter"); })
                .filter(function (v) { return v !== "all"; });
        }

        function apply() {
            var active = groups.map(function (g) { return { key: g.getAttribute("data-filter-group"), values: picked(g) }; })
                .filter(function (g) { return g.values.length; });
            var visible = 0;
            cards.forEach(function (card) {
                var show = active.every(function (g) {
                    var have = (card.getAttribute("data-" + g.key) || "").split(",");
                    return g.values.some(function (v) { return have.indexOf(v) !== -1; });
                });
                card.hidden = !show;
                if (show) visible++;
            });
            sections.forEach(function (section) {
                section.hidden = !section.querySelector("[data-integration]:not([hidden])");
            });
            if (empty) empty.hidden = visible > 0;
            if (clear) clear.hidden = !active.length;
            if (status) status.textContent = visible + (visible === 1 ? " result" : " results") + " shown";
        }

        groups.forEach(function (group) {
            var single = group.hasAttribute("data-single");
            buttons(group).forEach(function (b) {
                b.addEventListener("click", function () {
                    if (single) {
                        buttons(group).forEach(function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
                    } else {
                        b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true");
                    }
                    apply();
                });
            });
        });

        if (clear) {
            clear.addEventListener("click", function () {
                groups.forEach(function (g) { buttons(g).forEach(function (b) { b.setAttribute("aria-pressed", "false"); }); });
                apply();
            });
        }
    }

    function boot() {
        Array.prototype.forEach.call(document.querySelectorAll("[data-integrations]"), init);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
