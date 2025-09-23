// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.querySelector('.sidebar-grid .sub-section > div');
  if (!sidebar) {
    return;
  }

  // Find the first module (the stats module with the three cards)
  const firstModule = sidebar.querySelector('.widget-span > :first-child');
  if (!firstModule) {
    return;
  }

  // Calculate the height of the first module
  const firstModuleHeight = firstModule.offsetHeight;

  // Set the CSS custom property for the top position (negative to offset back up)
  sidebar.style.setProperty('--top', `-${firstModuleHeight}px`);

  // Handle window resize to recalculate
  window.addEventListener('resize', function() {
    const newHeight = firstModule.offsetHeight;
    sidebar.style.setProperty('--top', `-${newHeight}px`);
    console.log('Resize - new height:', newHeight);
  });
});