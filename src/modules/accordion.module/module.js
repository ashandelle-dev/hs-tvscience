(function () {
  const entries = document.querySelectorAll('.accordion-entry');
  const ACTIVE_CLASS = 'accordion-active';

  let currentEntry = null;

  entries.forEach(function (entry) {
    const header = entry.querySelector('.accordion-header');

    header.addEventListener('click', function () {
      if (currentEntry != null) {
        const content = currentEntry.querySelector('.accordion-content');
        content.style.height = 0;

        if (currentEntry !== entry) {
          currentEntry.classList.remove(ACTIVE_CLASS);
          currentEntry = null;
        }
      }

      entry.classList.toggle(ACTIVE_CLASS);

      if (entry.classList.contains(ACTIVE_CLASS)) {
        const content = entry.querySelector('.accordion-content');
        content.style.height = content.scrollHeight + 'px';
        currentEntry = entry;
      }
    });
  });
})();
