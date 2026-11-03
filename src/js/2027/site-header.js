// Site Header (2027): desktop dropdowns + mobile menu.
// Markup: src/modules/2027/site-header.module/module.html

const header = document.querySelector("[data-site-header]");

if (header) {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const items = Array.from(header.querySelectorAll("[data-nav-item]"));
    const menuToggle = header.querySelector("[data-menu-toggle]");
    let closeTimer;

    const setOpen = (item, open) => {
        item.toggleAttribute("data-open", open);
        item.querySelector("[data-nav-trigger]").setAttribute("aria-expanded", String(open));
    };

    const closeAll = (except) => items.forEach((item) => item !== except && setOpen(item, false));

    const setMenuOpen = (open) => {
        header.toggleAttribute("data-menu-open", open);
        menuToggle?.setAttribute("aria-expanded", String(open));
        document.documentElement.style.overflow = open ? "hidden" : "";
    };

    items.forEach((item) => {
        const trigger = item.querySelector("[data-nav-trigger]");

        trigger.addEventListener("click", (event) => {
            // On desktop, hover already opened it — a mouse click shouldn't immediately close it.
            // Keyboard activation (event.detail === 0) always toggles.
            if (desktop.matches && event.detail > 0 && item.hasAttribute("data-open")) return;
            const open = !item.hasAttribute("data-open");
            closeAll(item);
            setOpen(item, open);
        });

        item.addEventListener("mouseenter", () => {
            if (!desktop.matches) return;
            clearTimeout(closeTimer);
            closeAll(item);
            setOpen(item, true);
        });

        item.addEventListener("mouseleave", () => {
            if (!desktop.matches) return;
            closeTimer = setTimeout(() => setOpen(item, false), 150);
        });

        item.addEventListener("focusout", (event) => {
            if (!item.contains(event.relatedTarget)) setOpen(item, false);
        });
    });

    document.addEventListener("click", (event) => {
        if (!header.contains(event.target)) closeAll();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        const openItem = items.find((item) => item.hasAttribute("data-open"));
        if (openItem) {
            setOpen(openItem, false);
            openItem.querySelector("[data-nav-trigger]").focus();
        }
        if (header.hasAttribute("data-menu-open")) {
            setMenuOpen(false);
            menuToggle?.focus();
        }
    });

    menuToggle?.addEventListener("click", () => setMenuOpen(!header.hasAttribute("data-menu-open")));

    desktop.addEventListener("change", (event) => {
        if (event.matches) setMenuOpen(false);
    });
}
