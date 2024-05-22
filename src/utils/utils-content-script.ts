import { Message, MessageType } from '../static/sharedTypes';

export function extractTextFromElement(elementClass: string): string {
  if (!elementClass || elementClass === '') return '';

  const element = document.querySelector(elementClass);
  if (!element) return '';
  let textContent = element.textContent || '';
  textContent = textContent.replace('About the job', '').trim();
  return textContent;
}

function wait(sec: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, sec * 1000);
  });
}

export async function retryUntilNotNull(divClass: string) {
  return new Promise(async (resolve, reject) => {
    let divToRemove = null;
    let count = 0;
    while (divToRemove === null) {
      count++;
      if (count > 10) reject(`className: ${divClass} not found!`);
      await wait(1.5);
      divToRemove = document.querySelector(divClass);
    }
    console.log(`Waited 0.5 sec ${count} times.`);
    resolve(divToRemove);
  });
}

export function appendSibling(
  targetElement: HTMLElement,
  newElement: HTMLElement
) {
  // get parent element
  const parent = targetElement.parentNode;

  // insert new element after target element
  parent.insertBefore(newElement, targetElement.nextSibling);
}

export function sendMessageToBackground(
  message: string,
  type: MessageType
): void {
  chrome.runtime.sendMessage({
    message,
    type,
  });
}
