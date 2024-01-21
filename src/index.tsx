import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerStates } from './functions/Functions';
import App from './App';
import { Types } from './types/types';


const states: Types.RegisteredData = [
  {
    state: 'SpinState',
    storeName: 'ReelStore'
  },
  {
    state: 'IdleState',
    storeName: 'UIStore'
  }
]

registerStates(states)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

