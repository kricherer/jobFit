import { Message, MessageType } from '../static/sharedTypes';
import {
  aboutTheJobClass,
  optimizeCvButtonTitle,
  optimizeCvButtonStylesClass,
  saveButtonClass,
  saveButtonCssSelector,
} from '../utils/constants';
import { formatClass } from './utils-common';

export function extractTextFromElement(elementClass: string): string {
  if (!elementClass || elementClass === '') return '';

  const formattedElementClass = formatClass(elementClass);

  const element = document.querySelector(formattedElementClass);
  if (!element) return '';
  let textContent = element.textContent || '';
  textContent = textContent.replace('About the job', '').trim();
  return textContent;
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

// export async function createHtmlElement() {
//   const saveButtonEl = document.querySelector(
//     saveButtonCssSelector
//   ) as HTMLElement | null;

//   // Create the new sibling button element
//   const optimizeButton = document.createElement('button');
//   optimizeButton.className = optimizeCvButtonStylesClass;
//   optimizeButton.type = 'button';
//   optimizeButton.innerHTML = optimizeCvButtonTitle;

//   optimizeButton.addEventListener('click', () => {
//     const extractedEl = extractTextFromElement(aboutTheJobClass);
//     sendMessageToBackground(extractedEl, 'catch-job-description');
//   });

//   // Append optimize cv button
//   if (saveButtonEl) {
//     appendSibling(saveButtonEl, optimizeButton);
//   }
// }

// Yair----------------------------
/**
interface OptimizeButtonConfig {
  classes: string[];
  style: string;
}

export async function createOptimizeButton(buttonConfig: Partial<OptimizeButtonConfig>) {
  const anchorEl = document.querySelector(anchorElSelector) as HTMLElement | null;

  // Create the new sibling button element
  const optimizeButton = document.createElement('button');

  if (buttonConfig.classes) optimizeButton.className = optimizeCvButtonStylesClass;
  if (buttonConfig.style) optimizeButton.setAttribute('style', buttonConfig.style);

  optimizeButton.type = 'button';
  optimizeButton.innerHTML = optimizeCvButtonTitle;
}
 */
//----------------------------
// My----------------------------
interface OptimizeButtonConfig {
  classes: string[];
  style: string;
}

export async function createOptimizeButton(
  buttonConfig: Partial<OptimizeButtonConfig>
) {
  const saveButtonEl = document.querySelector(
    saveButtonCssSelector
  ) as HTMLElement | null;

  // Create the new sibling button element
  const optimizeButton = document.createElement('button');

  if (buttonConfig.classes)
    optimizeButton.className = optimizeCvButtonStylesClass;
  if (buttonConfig.style)
    optimizeButton.setAttribute('style', buttonConfig.style);

  optimizeButton.type = 'button';
  optimizeButton.innerHTML = optimizeCvButtonTitle;
}
//----------------------------

export function addClickListener(
  buttonElement: HTMLElement,
  callBack: () => unknown
) {
  buttonElement.addEventListener('click', callBack);
}
/*
() => {
    const extractedEl = extractTextFromElement(aboutTheJobClass);
    sendMessageToBackground(extractedEl, 'catch-job-description');
  }
*/

let timeout: ReturnType<typeof setTimeout>;
let buttonAdded = false;
export function handleMutations(mutations: MutationRecord[]): void {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach((node) => {
        if (
          node.nodeType === 1 &&
          (node as HTMLElement).matches(saveButtonCssSelector)
        ) {
          if (buttonAdded) {
            buttonAdded = false;
            return;
          }
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            // sending the createHtmlElement to event loop queue, waiting for call stack to empty and then excecuting  once.
            createHtmlElement();
            buttonAdded = true;
          }, 0);
        }
      });
    }
  });
}
