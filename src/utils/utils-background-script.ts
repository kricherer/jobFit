import { Message } from '../static/sharedTypes';
import {localStorage } from './storageClasses';

export function sendToContentScript(message: Message) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // Send a message to the content script of the active tab
    chrome.tabs.sendMessage(
      tabs[0].id,
      { message },
      async (response: Message) => {
        if (response.type === 'catch-job-description') {
          localStorage.set('jobRequirements', response.message);
        }
      }
    );
  });
}

