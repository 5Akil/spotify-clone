import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import { getTokenFromUrl } from './app_context/Spotify';
import { useDataLayerValue } from './app_context/DataLayer';
import axios from 'axios';
import { RouterProvider } from 'react-router-dom';
import { MainRoutes } from './routes/mainRoute';


function App() {
  return (
    <div className="App">
      <RouterProvider router={MainRoutes} />
    </div>
  );
}

export default App;
