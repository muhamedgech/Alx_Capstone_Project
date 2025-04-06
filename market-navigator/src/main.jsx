import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter

// Create a root for the app using React 18's createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app with the necessary context providers
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
