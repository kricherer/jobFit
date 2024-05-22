import { Message } from '../static/sharedTypes';
import { saveButtonClass } from '../utils/constants';

import { handleMutations } from '../utils/utils-content-script';
import './buttonStyles.css';

// -- Listen to Background -----
chrome.runtime.onMessage.addListener(
  async ({ message }: { message: Message }, sender, sendResponse) => {
    console.log('Message received from background:', message);

    // if (message.type === '...') {}
  }
);

// -- Mutation Observer -----
const targetNode = document.body;
// Which mutations to observe
const config = {
  attributes: true,
  childList: true,
  subtree: true,
};
const observer = new MutationObserver(handleMutations);
observer.observe(targetNode, config);
