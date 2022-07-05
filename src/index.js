import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorker from './components/compound/serviceWorker.ts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
serviceWorker.unregister();