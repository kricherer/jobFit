import { Message } from '../background/background';

const aboutTheJobClass = `.jobs-box__html-content`;

// helpers:
function extractTextFromElement(elementClass: string) {
  return document
    .querySelector(elementClass)
    .textContent.replace('About the job', '')
    .trim();
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(
  async ({ message }: { message: Message }, sender, sendResponse) => {
    console.log('Message received from background:', message);

    if (message.type === 'catch-job-description') {
      const htmlTextContent = extractTextFromElement(aboutTheJobClass);
      sendResponse({ message: htmlTextContent, type: 'catch-job-description' });
    }
  }
);
