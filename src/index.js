import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const mainRoot = ReactDOM.createRoot(document.getElementById('root'));
mainRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
