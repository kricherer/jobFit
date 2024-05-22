import { Message } from '../static/sharedTypes';
import { localStorage } from '../utils/storageClasses';
import { sendToContentScript } from '../utils/utils-background-script';

// ----- Listen to popup --------
chrome.runtime.onMessage.addListener(
  (message: Message, sender, sendResponse) => {
    console.log('Message received from popup:', message);

    if (message.type === 'catch-job-description') {
      localStorage.set('jobRequirements', message.message);
    }
    // Optional - send response back to popup
    // sendResponse({ received: true });
  }
);

// ------ Listen for tab updates when user clicks and changes job description
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    sendToContentScript({ type: 'page-loaded' });
  }
});
