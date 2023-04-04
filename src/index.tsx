import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import EnergyCalculator from './EnergyCalculator';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <EnergyCalculator />
  </React.StrictMode>
);
