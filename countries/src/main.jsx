import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // You can import your global styles here
import App from './App'; // Import the App component

// Rendering the App component into the root element of your HTML
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* This is your main App component */}
  </React.StrictMode>
);


