import React from 'react';
import './popup.css';
import { createRoot } from 'react-dom/client';
import { Message } from '../static/sharedTypes';

function sendMessageToBg(message: Message) {
  chrome.runtime.sendMessage(
    { message }
    //  (response)=> {
    //   console.log('Response from background script:', response);
    // }
  );
}
const App: React.FC<{}> = () => {
  return <div></div>;
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container!);
root.render(<App />);
