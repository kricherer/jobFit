import { Message } from '../static/sharedTypes';
import { StorageKey, localStorage } from './storageClasses';

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

export function extractTextFromElement(elementClass: string): string {
  if (!elementClass || elementClass === '') return '';

  const element = document.querySelector(elementClass);
  if (!element) return '';
  let textContent = element.textContent || '';
  textContent = textContent.replace('About the job', '').trim();
  return textContent;
}
