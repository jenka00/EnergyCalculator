import React from 'react';
import ReactDOM from 'react-dom/client';
import './calculator.css';
import EnergyCalculator from './components/EnergyCalculator';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <EnergyCalculator />
  </React.StrictMode>
);