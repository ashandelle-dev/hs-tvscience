let tabTimeout = null;
let isAutoPlaying = false;

function switchToTab(tabSelector) {
    const tab = tabSelector.dataset.target;

    // Remove active state from current tab
    const activeSelector = document.querySelector('.tab-selector.active');
    const activeContent = document.querySelector('.tab-content.active');

    if (activeSelector) {
        activeSelector.classList.remove('active');
    }
    if (activeContent) {
        activeContent.classList.add('hidden');
        activeContent.classList.remove('active');
    }

    // Add active state to new tab
    const newContent = document.querySelector('[data-tab=' + tab + ']');
    if (newContent) {
        newContent.classList.remove('hidden');
        newContent.classList.add('active');
    }
    tabSelector.classList.add('active');
}

function tabLoop() {
    const activeTab = document.querySelector('.tab-selector.active');
    let nextTab = activeTab.nextElementSibling;

    // Find the next tab selector (skip non-tab elements)
    while (nextTab && !nextTab.classList.contains('tab-selector')) {
        nextTab = nextTab.nextElementSibling;
    }

    // If no next tab, go back to first tab
    if (!nextTab) {
        nextTab = document.querySelector('.tab-selector:first-child');
    }

    if (nextTab) {
        switchToTab(nextTab);
    }
}

function startAutoPlay() {
    // Clear any existing interval
    stopAutoPlay();

    // Start new interval
    isAutoPlaying = true;
    tabTimeout = setInterval(tabLoop, 6000);
}

function stopAutoPlay() {
    if (tabTimeout) {
        clearInterval(tabTimeout);
        tabTimeout = null;
    }
    isAutoPlaying = false;
}

document.addEventListener('DOMContentLoaded', function () {
    // Initialize first tab as active
    const firstContent = document.querySelector('.tab-content:first-child');
    if (firstContent) {
        firstContent.classList.remove('hidden');
        firstContent.classList.add('active');
    }

    // Add click event listeners to tab selectors
    const tabSelectors = document.querySelectorAll('.tab-selector');
    tabSelectors.forEach((tabSelect) => {
        tabSelect.addEventListener('click', function (event) {
            // Stop autoplay
            stopAutoPlay();

            // Switch to clicked tab
            switchToTab(tabSelect);

            // Restart autoplay after 6 seconds
            startAutoPlay();
        });
    });
});

window.addEventListener('load', function () {
    const tabContainer = document.querySelector('.timed-tabs');

    if (!tabContainer) return;

    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            // Start autoplay when tabs come into view
            if (!isAutoPlaying) {
                startAutoPlay();
            }
        } else {
            // Stop autoplay when tabs leave view
            stopAutoPlay();
        }
    }, { threshold: 0.8 });

    observer.observe(tabContainer);
});