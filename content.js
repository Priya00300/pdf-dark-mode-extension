/* content.js (Final Version - Direct Style)
  This script applies the style directly to the <html> tag,
  which we proved works.
*/

// Applies dark mode by setting the inline style
function applyDarkMode() {
  document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
  document.documentElement.style.backgroundColor = '#111';
  console.log('Dark mode applied (direct style)');
}

// Removes dark mode by clearing the inline style
function removeDarkMode() {
  document.documentElement.style.filter = '';
  document.documentElement.style.backgroundColor = '';
  console.log('Dark mode removed (direct style)');
}

// --- LOGIC TO RUN THE SCRIPT ---

// 1. A function to check storage and update the style
function initializeDarkMode() {
  chrome.storage.sync.get(['darkModeEnabled'], (result) => {
    if (result.darkModeEnabled) {
      applyDarkMode();
    } else {
      removeDarkMode();
    }
  });
}

// 2. Listen for ANY change in chrome.storage (from the popup toggle)
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.darkModeEnabled) {
    const isEnabled = changes.darkModeEnabled.newValue;
    if (isEnabled) {
      applyDarkMode();
    } else {
      removeDarkMode();
    }
  }
});

// 3. Initialize on page load
initializeDarkMode();