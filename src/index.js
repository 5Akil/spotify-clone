import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {DataLayer} from './app_context/DataLayer'
import reducer,{initialState} from './app_context/Reducer'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
    <App />
    </DataLayer>
  </React.StrictMode>
);
