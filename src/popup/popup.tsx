import React from 'react';
// import ReactDOM from 'react-dom';
import './popup.css';
import { createRoot } from 'react-dom/client';

const App: React.FC<{}> = () => {
  return (
    <div>
      <img src="icon.png" />
    </div>
  );
};

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container!)
root.render(<App />)