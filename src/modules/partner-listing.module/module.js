// Partner Listing Filter Functionality
(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPartnerFilters);
  } else {
    initPartnerFilters();
  }

  function initPartnerFilters() {
    const filterCheckboxes = document.querySelectorAll('.category-filter, .capability-filter');
    const clearFiltersBtn = document.querySelector('.clear-filters');
    const partnerCards = document.querySelectorAll('.partner-card');
    const noResultsMsg = document.querySelector('.no-results');

    if (!filterCheckboxes.length || !partnerCards.length) return;

    // Update clear filters button visibility
    function updateClearButtonVisibility() {
      const hasActiveFilters = Array.from(filterCheckboxes).some(cb => cb.checked);
      if (clearFiltersBtn) {
        if (hasActiveFilters) {
          clearFiltersBtn.classList.remove('hidden');
          clearFiltersBtn.classList.add('show');
        } else {
          clearFiltersBtn.classList.add('hidden');
          clearFiltersBtn.classList.remove('show');
        }
      }
    }

    // Filter partners based on selected filters
    function filterPartners() {
      const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked'))
        .map(cb => cb.dataset.filterValue);
      const selectedCapabilities = Array.from(document.querySelectorAll('.capability-filter:checked'))
        .map(cb => cb.dataset.filterValue);

      let visibleCount = 0;

      partnerCards.forEach(card => {
        const cardCategories = card.dataset.categories.split(',').filter(Boolean);
        const cardCapabilities = card.dataset.capabilities.split(',').filter(Boolean);

        // Show card if no filters are selected, or if it matches the selected filters
        const matchesCategories = selectedCategories.length === 0 ||
          selectedCategories.some(cat => cardCategories.includes(cat));
        const matchesCapabilities = selectedCapabilities.length === 0 ||
          selectedCapabilities.some(cap => cardCapabilities.includes(cap));

        if (matchesCategories && matchesCapabilities) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      // Show/hide no results message
      if (noResultsMsg) {
        if (visibleCount === 0) {
          noResultsMsg.classList.remove('hidden');
          noResultsMsg.classList.add('show');
        } else {
          noResultsMsg.classList.add('hidden');
          noResultsMsg.classList.remove('show');
        }
      }

      // Update clear button visibility
      updateClearButtonVisibility();
    }

    // Clear all filters
    function clearAllFilters() {
      filterCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
      });
      filterPartners();
    }

    // Add event listeners
    filterCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', filterPartners);
    });

    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', clearAllFilters);
    }

    // Initialize clear button visibility on page load
    updateClearButtonVisibility();
  }
})();

