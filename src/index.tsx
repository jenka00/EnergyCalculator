import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Energikalkylator from './Energikalkylator';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Energikalkylator />
  </React.StrictMode>
);
reportWebVitals();
