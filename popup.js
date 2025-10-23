/* popup.js (Final Version)
  This script only saves the toggle state to storage.
*/

// Get DOM elements
const toggle = document.getElementById('darkModeToggle');
const statusText = document.getElementById('statusText');

// Load saved dark mode state
chrome.storage.sync.get(['darkModeEnabled'], (result) => {
  const isEnabled = result.darkModeEnabled || false;
  toggle.checked = isEnabled;
  updateStatusText(isEnabled);
});

// Handle toggle change
toggle.addEventListener('change', () => {
  const isEnabled = toggle.checked;
  
  // 1. Save the state to storage
  chrome.storage.sync.set({ darkModeEnabled: isEnabled });
  
  // 2. Update status text
  updateStatusText(isEnabled);
  
  // 3. (We don't send a message, content.js listens for the storage change)
});

// Update status text
function updateStatusText(isEnabled) {
  statusText.textContent = isEnabled ? 'On' : 'Off';
  statusText.style.color = isEnabled ? '#4CAF50' : '#666';
}