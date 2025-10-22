// Listen for extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('PDF Dark Mode Extension Installed');
  
  // Set default dark mode state to false
  chrome.storage.sync.set({ darkModeEnabled: false });
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkPDF') {
    // You can add additional logic here if needed
    sendResponse({ isPDF: true });
  }
});

// Optional: Listen for tab updates to detect PDF pages
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    if (tab.url.endsWith('.pdf') || tab.url.includes('pdf')) {
      console.log('PDF detected:', tab.url);
    }
  }
});