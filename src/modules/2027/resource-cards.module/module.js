(function () {
    function init(list) {
        var size = parseInt(list.getAttribute("data-page-size"), 10) || 12;
        var button = list.parentNode.querySelector("[data-show-more]");
        if (!button) return;
        button.addEventListener("click", function () {
            var hidden = list.querySelectorAll("li[hidden]");
            for (var i = 0; i < hidden.length && i < size; i++) hidden[i].hidden = false;
            if (hidden.length <= size) button.parentNode.removeChild(button);
        });
    }

    function boot() {
        Array.prototype.forEach.call(document.querySelectorAll("[data-page-size]"), init);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
