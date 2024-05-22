import { Message } from '../static/sharedTypes';
import { localStorage } from '../utils/storageClasses';

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
