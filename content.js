// Check if the current page is a PDF
function isPDFPage() {
  return document.contentType === 'application/pdf' || 
         window.location.href.endsWith('.pdf') ||
         document.querySelector('embed[type="application/pdf"]') !== null;
}

// Apply dark mode styles
function applyDarkMode() {
  if (!document.getElementById('pdf-dark-mode-style')) {
    const style = document.createElement('style');
    style.id = 'pdf-dark-mode-style';
    style.textContent = `
      html {
        filter: invert(90%) hue-rotate(180deg) !important;
        background-color: #1a1a1a !important;
      }
      
      body {
        background-color: #1a1a1a !important;
      }
      
      embed, object, iframe {
        filter: invert(100%) hue-rotate(180deg) !important;
      }
      
      img, video {
        filter: invert(100%) hue-rotate(180deg) !important;
      }
    `;
    document.head.appendChild(style);
    console.log('Dark mode applied');
  }
}

// Remove dark mode styles
function removeDarkMode() {
  const style = document.getElementById('pdf-dark-mode-style');
  if (style) {
    style.remove();
    console.log('Dark mode removed');
  }
}

// Initialize dark mode based on saved preference
function initializeDarkMode() {
  if (isPDFPage()) {
    chrome.storage.sync.get(['darkModeEnabled'], (result) => {
      if (result.darkModeEnabled) {
        applyDarkMode();
      }
    });
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleDarkMode') {
    if (request.enabled) {
      applyDarkMode();
    } else {
      removeDarkMode();
    }
    sendResponse({ success: true });
  }
});

// Initialize on page load
initializeDarkMode();