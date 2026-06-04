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
    const filterCheckboxes = document.querySelectorAll('.collection-filter, .category-filter, .capability-filter');
    const clearFiltersBtn = document.querySelector('.clear-filters');
    const partnerCards = document.querySelectorAll('.partner-card');
    const noResultsMsg = document.querySelector('.no-results');
    const featuredSection = document.querySelector('.featured-section');
    const allPartnersSection = document.querySelector('.all-partners-section');

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
      const selectedCollections = Array.from(document.querySelectorAll('.collection-filter:checked'))
        .map(cb => cb.dataset.filterValue);
      const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked'))
        .map(cb => cb.dataset.filterValue);
      const selectedCapabilities = Array.from(document.querySelectorAll('.capability-filter:checked'))
        .map(cb => cb.dataset.filterValue);

      let visibleCount = 0;
      let featuredVisibleCount = 0;
      let regularVisibleCount = 0;

      partnerCards.forEach(card => {
        const cardCollections = (card.dataset.collections || '').split(',').filter(Boolean);
        const cardCategories = card.dataset.categories.split(',').filter(Boolean);
        const cardCapabilities = card.dataset.capabilities.split(',').filter(Boolean);
        const isFeatured = card.dataset.featured === 'true';

        const matchesCollections = selectedCollections.length === 0 ||
          selectedCollections.some(value => {
            if (value === 'featured_partner') {
              return isFeatured;
            }
            return cardCollections.includes(value);
          });
        const matchesCategories = selectedCategories.length === 0 ||
          selectedCategories.some(cat => cardCategories.includes(cat));
        const matchesCapabilities = selectedCapabilities.length === 0 ||
          selectedCapabilities.some(cap => cardCapabilities.includes(cap));

        if (matchesCollections && matchesCategories && matchesCapabilities) {
          card.classList.remove('hidden');
          visibleCount++;
          if (isFeatured) {
            featuredVisibleCount++;
          } else {
            regularVisibleCount++;
          }
        } else {
          card.classList.add('hidden');
        }
      });

      if (featuredSection) {
        if (featuredVisibleCount === 0) {
          featuredSection.classList.add('hidden');
        } else {
          featuredSection.classList.remove('hidden');
        }
      }

      if (allPartnersSection) {
        if (regularVisibleCount === 0) {
          allPartnersSection.classList.add('hidden');
        } else {
          allPartnersSection.classList.remove('hidden');
        }
      }

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

