import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './components/Foodandservice/scss/index.scss';
import 'react-toastify/dist/ReactToastify.css';
import "flatpickr/dist/themes/light.css";
import "flatpickr/dist/flatpickr.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
