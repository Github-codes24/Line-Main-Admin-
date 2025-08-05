
// src/App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './route/route';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  );
};

export default App;
