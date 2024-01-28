import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerStates } from './functions/SideEffectsFunctions';
import { STATES } from './constants/constants';
import App from './App';

registerStates(STATES)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
