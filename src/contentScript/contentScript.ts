import { Message } from '../static/sharedTypes';
import { aboutTheJobClass, saveButtonClass } from '../utils/constants';
import {
  appendSibling,
  extractTextFromElement,
  // onOptimizeClick,
  retryUntilNotNull,
  sendMessageToBackground,
} from '../utils/utils-content-script';
import './buttonStyles.css';

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(
  async ({ message }: { message: Message }, sender, sendResponse) => {
    console.log('Message received from background:', message);

    if (message.type === 'page-loaded') {
      const saveButtonEl = (await retryUntilNotNull(
        saveButtonClass
      )) as HTMLElement | null;

      // Create the new sibling button element
      const optimizeButton = document.createElement('button');
      optimizeButton.className =
        'jobs-save-button artdeco-button artdeco-button--secondary optimize-cv-button';
      optimizeButton.type = 'button';
      optimizeButton.innerHTML = `
        <span aria-hidden="true">
        Optimize CV
        </span>`;

      optimizeButton.addEventListener('click', () => {
        const extractedEl = extractTextFromElement(aboutTheJobClass);
        sendMessageToBackground(extractedEl, 'catch-job-description');
      });

      // Append optimize cv button
      if (saveButtonEl) {
        appendSibling(saveButtonEl, optimizeButton);
      }
    }
  }
);
