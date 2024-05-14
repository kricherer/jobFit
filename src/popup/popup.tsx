import React from 'react';
import './popup.css';
import { createRoot } from 'react-dom/client';
import { Message } from '../background/background';

function sendMessageToBg(message: Message) {
  chrome.runtime.sendMessage(
    { message }
    //  (response)=> {
    //   console.log('Response from background script:', response);
    // }
  );
}
const App: React.FC<{}> = () => {
  function handleClick() {
    const message: Message = { type: 'catch-job-description' };
    sendMessageToBg(message);
  }

  return (
    <div>
      <button onClick={handleClick}>Catch Requirements</button>
    </div>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container!);
root.render(<App />);
