import { Message } from '../static/sharedTypes';
import { aboutTheJobClass } from '../utils/constants';
import { extractTextFromElement } from '../utils/utils';

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(
  async ({ message }: { message: Message }, sender, sendResponse) => {
    console.log('Message received from background:', message);

    if (message.type === 'catch-job-description') {
      const htmlTextContent = extractTextFromElement(aboutTheJobClass);

      if (htmlTextContent === '') {
        console.error("Job post couldn't been processed");
      } else {
        sendResponse({
          message: htmlTextContent,
          type: 'catch-job-description',
        });
      }
    }
  }
);
