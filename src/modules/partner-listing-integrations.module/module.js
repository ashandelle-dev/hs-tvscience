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
    const filterButtons = document.querySelectorAll('.category-filter, .capability-filter');
    const partnerCards = document.querySelectorAll('.partner-card');
    const noResultsMsg = document.querySelector('.no-results');
    const featuredSection = document.querySelector('.featured-section');
    const allIntegrationsSection = document.querySelector('.all-integrations-section');

    if (!filterButtons.length || !partnerCards.length) return;

    // Find the "All" button
    const allButton = Array.from(filterButtons).find(btn => btn.dataset.filterValue === 'all');

    // Set "All" as active by default
    if (allButton) {
      allButton.classList.add('active');
    }

    // Handle filter button clicks
    function handleFilterClick(clickedButton) {
      const filterValue = clickedButton.dataset.filterValue;

      // If "All" is clicked, deactivate all other filters
      if (filterValue === 'all') {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');
      } else {
        // Remove "All" if any specific filter is clicked
        if (allButton) {
          allButton.classList.remove('active');
        }

        // Toggle the clicked button
        clickedButton.classList.toggle('active');

        // If no filters are active, activate "All"
        const hasActiveFilters = Array.from(filterButtons).some(btn =>
          btn.classList.contains('active') && btn.dataset.filterValue !== 'all'
        );
        if (!hasActiveFilters && allButton) {
          allButton.classList.add('active');
        }
      }

      filterPartners();
    }

    // Filter partners based on selected filters
    function filterPartners() {
      const activeButtons = Array.from(filterButtons).filter(btn =>
        btn.classList.contains('active') && btn.dataset.filterValue !== 'all'
      );
      const selectedCategories = activeButtons
        .filter(btn => btn.classList.contains('category-filter'))
        .map(btn => btn.dataset.filterValue);
      const selectedCapabilities = activeButtons
        .filter(btn => btn.classList.contains('capability-filter'))
        .map(btn => btn.dataset.filterValue);

      let visibleCount = 0;
      let featuredVisibleCount = 0;
      let regularVisibleCount = 0;

      partnerCards.forEach(card => {
        const cardCategories = card.dataset.categories.split(',').filter(Boolean);
        const cardCapabilities = card.dataset.capabilities.split(',').filter(Boolean);
        const isFeatured = card.dataset.featured === 'true';

        // Show card if no filters are selected, or if it matches the selected filters
        const matchesCategories = selectedCategories.length === 0 ||
          selectedCategories.some(cat => cardCategories.includes(cat));
        const matchesCapabilities = selectedCapabilities.length === 0 ||
          selectedCapabilities.some(cap => cardCapabilities.includes(cap));

        if (matchesCategories && matchesCapabilities) {
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

      // Show/hide section headings based on visible cards
      if (featuredSection) {
        if (featuredVisibleCount === 0) {
          featuredSection.classList.add('hidden');
        } else {
          featuredSection.classList.remove('hidden');
        }
      }

      if (allIntegrationsSection) {
        if (regularVisibleCount === 0) {
          allIntegrationsSection.classList.add('hidden');
        } else {
          allIntegrationsSection.classList.remove('hidden');
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
    }

    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
      button.addEventListener('click', () => handleFilterClick(button));
    });
  }
})();

