// Inventory Listing Filter Functionality
(function() {
  'use strict';

  const CARDS_TO_SHOW = 9;

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

    if (!filterButtons.length || !partnerGrid) return;

    // Check initial load more visibility
    updateLoadMoreVisibility();

    // Handle filter button clicks
    function handleFilterClick(clickedButton) {
      const filterType = clickedButton.dataset.filterType;

      // Update active button styles
      filterButtons.forEach(btn => {
        btn.classList.remove('active', 'border-[#10b981]', 'bg-[#10b981]', 'text-white');
        btn.classList.add('border-[#D9E2EB]', 'bg-white', 'text-[#0F2D29]');
      });
      clickedButton.classList.add('active', 'border-[#10b981]', 'bg-[#10b981]', 'text-white');
      clickedButton.classList.remove('border-[#D9E2EB]', 'bg-white', 'text-[#0F2D29]');

      // Show/hide cards based on filter type
      allCards.forEach(card => card.classList.remove('hidden'));

      if (filterType === 'channels') {
        publisherCards.forEach(card => card.classList.add('hidden'));
      } else if (filterType === 'publishers') {
        channelCards.forEach(card => card.classList.add('hidden'));
      }

      // Update load more button visibility
      updateLoadMoreVisibility();

      // Check for no results
      updateNoResultsMessage();
    }

    function handleLoadMore() {
      partnerGrid.classList.add('show-all');
      if (loadMoreContainer) {
        loadMoreContainer.classList.add('hidden');
      }
    }

    function updateLoadMoreVisibility() {
      if (!loadMoreContainer) return;

      const visibleCards = document.querySelectorAll('.partner-card:not(.hidden)');
      const isShowingAll = partnerGrid.classList.contains('show-all');

      if (isShowingAll || visibleCards.length <= CARDS_TO_SHOW) {
        loadMoreContainer.classList.add('hidden');
      } else {
        loadMoreContainer.classList.remove('hidden');
      }
    }

    function updateNoResultsMessage() {
      const visibleCards = document.querySelectorAll('.partner-card:not(.hidden)');
      if (noResultsMsg) {
        if (visibleCards.length === 0) {
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
