(function() {
  'use strict';

  function initAuthorBlogListingPagination() {
    const modules = document.querySelectorAll('.author-blog-listing-module');
    
    modules.forEach(function(module) {
      const moduleId = module.getAttribute('data-module-id');
      const postsPerPage = parseInt(module.getAttribute('data-posts-per-page')) || 12;
      const totalPosts = parseInt(module.getAttribute('data-total-posts')) || 0;
      const totalPages = parseInt(module.getAttribute('data-total-pages')) || 1;
      
      if (totalPages <= 1) {
        // No pagination needed
        return;
      }

      const postsContainer = module.querySelector('.author-blog-listing__posts');
      const posts = Array.from(module.querySelectorAll('.author-blog-listing__post'));
      const paginationContainer = module.querySelector('.author-blog-listing__pagination');
      
      if (!postsContainer || !paginationContainer || posts.length === 0) {
        return;
      }

      let currentPage = 1;

      // Initialize: Hide all posts
      posts.forEach(function(post, index) {
        post.style.display = 'none';
      });

      // Function to show posts for a specific page
      function showPage(page) {
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;

        posts.forEach(function(post, index) {
          if (index >= startIndex && index < endIndex) {
            post.style.display = 'block';
          } else {
            post.style.display = 'none';
          }
        });

        currentPage = page;
        renderPagination();
        
        // Scroll to top of module
        module.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Function to render pagination controls
      function renderPagination() {
        let paginationHTML = '';

        // First page
        if (currentPage >= 3) {
          paginationHTML += '<a href="#" class="blog-pagination__link" data-page="1">1</a>';
          paginationHTML += '<span class="blog-pagination__ellipsis">...</span>';
        }

        // Previous page
        if (currentPage > 1) {
          paginationHTML += '<a href="#" class="blog-pagination__link" data-page="' + (currentPage - 1) + '">' + (currentPage - 1) + '</a>';
        }

        // Current page
        paginationHTML += '<a href="#" class="blog-pagination__link blog-pagination__link--active" data-page="' + currentPage + '">' + currentPage + '</a>';

        // Next page
        if (currentPage !== totalPages) {
          paginationHTML += '<a href="#" class="blog-pagination__link" data-page="' + (currentPage + 1) + '">' + (currentPage + 1) + '</a>';
        }

        // Last page
        if (totalPages - currentPage > 1) {
          paginationHTML += '<span class="blog-pagination__ellipsis">...</span>';
          paginationHTML += '<a href="#" class="blog-pagination__link" data-page="' + totalPages + '">' + totalPages + '</a>';
        }

        paginationContainer.innerHTML = paginationHTML;

        // Attach click handlers to pagination links
        const paginationLinks = paginationContainer.querySelectorAll('.blog-pagination__link');
        paginationLinks.forEach(function(link) {
          link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = parseInt(this.getAttribute('data-page'));
            if (page && page !== currentPage) {
              showPage(page);
            }
          });
        });
      }

      // Initialize: Show first page
      showPage(1);
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthorBlogListingPagination);
  } else {
    initAuthorBlogListingPagination();
  }

  // Re-initialize if content is loaded dynamically (for HubSpot CMS)
  if (typeof window.hsOnReady !== 'undefined') {
    window.hsOnReady.push(initAuthorBlogListingPagination);
  }
})();

