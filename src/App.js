
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PublicRoute from './route/public'; // adjust path if needed

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <PublicRoute />
      </div>
    </Router>
  );
}

export default App;

