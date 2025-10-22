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
  
  // Save the state
  chrome.storage.sync.set({ darkModeEnabled: isEnabled });
  
  // Update status text
  updateStatusText(isEnabled);
  
  // Send message to content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'toggleDarkMode',
        enabled: isEnabled
      }, (response) => {
        if (chrome.runtime.lastError) {
          console.log('Could not send message:', chrome.runtime.lastError.message);
          // Reload the tab to apply changes
          chrome.tabs.reload(tabs[0].id);
        }
      });
    }
  });
});

// Update status text
function updateStatusText(isEnabled) {
  statusText.textContent = isEnabled ? 'On' : 'Off';
  statusText.style.color = isEnabled ? '#4CAF50' : '#666';
}