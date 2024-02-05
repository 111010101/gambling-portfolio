import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerStates } from './functions/SideEffectsFunctions';
import { STATES } from './constants/constants';
import { load } from './core/utils/Loader';
import App from './App';

registerStates(STATES)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

load().then(res => {
  root.render(
    <React.StrictMode>
      <App textures={res} />
    </React.StrictMode>
  );

}).catch(() => {
  console.error(`game can't work without resources`)
})



