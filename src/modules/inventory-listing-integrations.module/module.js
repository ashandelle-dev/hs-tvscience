// Inventory Listing Filter Functionality
(function() {
  'use strict';

  const CARDS_TO_SHOW = 30;

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInventoryFilters);
  } else {
    initInventoryFilters();
  }

  function initInventoryFilters() {
    const filterButtons = document.querySelectorAll('.type-filter');
    const partnerGrid = document.querySelector('.partner-grid');
    const allCards = document.querySelectorAll('.partner-card');
    const channelCards = document.querySelectorAll('.channel-card');
    const publisherCards = document.querySelectorAll('.publisher-card');
    const noResultsMsg = document.querySelector('.no-results');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const loadMoreContainer = document.querySelector('.load-more-container');

    let currentFilter = 'all';
    let isShowingAll = false;

    if (!filterButtons.length || !partnerGrid) return;

    // Initial display
    applyVisibility();
    // Mark grid as JS-loaded so CSS initial hiding rule no longer applies
    partnerGrid.classList.add('js-loaded');

    // Handle filter button clicks
    function handleFilterClick(clickedButton) {
      const filterType = clickedButton.dataset.filterType;
      currentFilter = filterType;

      // Reset to showing first 30 when changing filters
      isShowingAll = false;

      // Update active button styles
      filterButtons.forEach(btn => {
        btn.classList.remove('active', 'border-[#10b981]', 'bg-[#10b981]', 'text-white');
        btn.classList.add('border-[#D9E2EB]', 'bg-white', 'text-[#0F2D29]');
      });
      clickedButton.classList.add('active', 'border-[#10b981]', 'bg-[#10b981]', 'text-white');
      clickedButton.classList.remove('border-[#D9E2EB]', 'bg-white', 'text-[#0F2D29]');

      applyVisibility();
    }

    function handleLoadMore() {
      isShowingAll = true;
      applyVisibility();
    }

    function applyVisibility() {
      // First, determine which cards match the current filter
      let matchingCards = [];

      allCards.forEach(card => {
        const cardType = card.dataset.cardType;
        let matchesFilter = false;

        if (currentFilter === 'all') {
          matchesFilter = true;
        } else if (currentFilter === 'channels' && cardType === 'channel') {
          matchesFilter = true;
        } else if (currentFilter === 'publishers' && cardType === 'publisher') {
          matchesFilter = true;
        }

        if (matchesFilter) {
          matchingCards.push(card);
        }
      });

      // Now show/hide cards based on filter and pagination
      let visibleCount = 0;
      allCards.forEach(card => {
        const cardType = card.dataset.cardType;
        let matchesFilter = false;

        if (currentFilter === 'all') {
          matchesFilter = true;
        } else if (currentFilter === 'channels' && cardType === 'channel') {
          matchesFilter = true;
        } else if (currentFilter === 'publishers' && cardType === 'publisher') {
          matchesFilter = true;
        }

        if (!matchesFilter) {
          // Card doesn't match filter - hide it
          card.classList.add('hidden');
        } else {
          // Card matches filter - show based on pagination
          visibleCount++;
          if (isShowingAll || visibleCount <= CARDS_TO_SHOW) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        }
      });

      // Update load more button visibility
      if (loadMoreContainer) {
        if (isShowingAll || matchingCards.length <= CARDS_TO_SHOW) {
          loadMoreContainer.classList.add('hidden');
        } else {
          loadMoreContainer.classList.remove('hidden');
        }
      }

      // Check for no results
      if (noResultsMsg) {
        if (matchingCards.length === 0) {
          noResultsMsg.classList.remove('hidden');
        } else {
          noResultsMsg.classList.add('hidden');
        }
      }
    }

    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
      button.addEventListener('click', () => handleFilterClick(button));
    });

    // Add event listener to load more button
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', handleLoadMore);
    }
  }
})();
