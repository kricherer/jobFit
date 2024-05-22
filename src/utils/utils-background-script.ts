import { Message } from '../static/sharedTypes';
import { localStorage } from './storageClasses';

export async function sendToContentScript(message: Message) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // Send a message to the content script of the active tab
    chrome.tabs.sendMessage(tabs[0].id, { message }, (response: Message) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }

      if (!response) return;

      // add if's for responses:
      // if (response.type === '.....') {
      // }
    });
  });
}
