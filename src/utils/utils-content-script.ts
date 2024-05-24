import { Message, MessageType } from '../static/sharedTypes';
import {
  aboutTheJobClass,
  optimizeCvButtonTitle,
  saveButtonClass,
  existingElSelector,
  optimizeCvBtnClassNamesLinkedin,
  optimizeCvBtnStyles,
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

interface OptimizeButtonConfig {
  classes: string;
  style: string;
}

export function createOptimizeButton(
  buttonConfig: Partial<OptimizeButtonConfig>
) {
  // Create the new sibling button element
  const optimizeButton = document.createElement('button');

  if (buttonConfig.classes) {
    optimizeButton.className = buttonConfig.classes;
  }
  if (buttonConfig.style)
    optimizeButton.setAttribute('style', buttonConfig.style);

  optimizeButton.type = 'button';
  optimizeButton.innerHTML = optimizeCvButtonTitle;
  return optimizeButton;
}

export function addClickListener(
  buttonElement: HTMLElement,
  callBack: () => unknown
) {
  buttonElement.addEventListener('click', callBack);
}

let timeout: ReturnType<typeof setTimeout>;
let buttonAdded = false;
export function handleMutations(mutations: MutationRecord[]): void {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach((node) => {
        if (
          node.nodeType === 1 &&
          (node as HTMLElement).matches(existingElSelector)
        ) {
          if (buttonAdded) {
            buttonAdded = false;
            return;
          }
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            // sending this functionality to event loop queue, waiting for call stack to empty and then excecuting  once.

            const optimizeButton = createOptimizeButton({
              style: optimizeCvBtnStyles,
              classes: optimizeCvBtnClassNamesLinkedin,
            });

            const existingEl = document.querySelector(
              existingElSelector
            ) as HTMLElement | null; // The existing element to which we append a sibling.

            if (existingEl && optimizeButton) {
              appendSibling(existingEl, optimizeButton);
              addClickListener(optimizeButton, () => {
                const extractedEl = extractTextFromElement(aboutTheJobClass);
                sendMessageToBackground(extractedEl, 'catch-job-description');
              });
            }

            buttonAdded = true;
          }, 0);
        }
      });
    }
  });
}
