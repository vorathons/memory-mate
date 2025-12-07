import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Ensure this file exists in src/ or adjust path if it's in root

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);