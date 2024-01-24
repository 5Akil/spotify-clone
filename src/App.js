import React, { useEffect, useState } from 'react';
import './App.css';
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
