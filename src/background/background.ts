import { Message } from '../static/sharedTypes';
import { sendToContentScript } from '../utils/utils';

// ----- Listen to popup --------
chrome.runtime.onMessage.addListener(
  ({ message }: { message: Message }, sender, sendResponse) => {
    console.log('Message received from popup:', message);

    if (message.type === 'catch-job-description') {
      sendToContentScript(message);
    }
    // Optional - send response back to popup
    // sendResponse({ received: true });
  }
);

