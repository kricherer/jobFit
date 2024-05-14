import { Message } from '../static/sharedTypes';
import { getQuery } from './queries';

type GlobalStateKey = 'query';

export function setState(key: GlobalStateKey, value: any) {
  chrome.storage.sync.set({ [key]: value }, () => {
    console.log(`Data saved - key: ${key} and value: ${value}`);
  });
}

export function getState(
  key: GlobalStateKey
): Promise<GlobalStateKey | undefined> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result[key]);
      }
    });
  });
}
export function sendToContentScript(message: Message) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // Send a message to the content script of the active tab
    chrome.tabs.sendMessage(
      tabs[0].id,
      { message },
      async (response: Message) => {
        console.log('Response from content script:', response);
        if (response.type === 'catch-job-description') {
          const query = getQuery(response.message);
          setState('query', query);
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
