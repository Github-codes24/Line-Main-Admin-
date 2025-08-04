// import './App.css';

// function App() {
//   return (
//     <div className='bg-red-700 items-center'>apoorv</div>
//   );
// }

// export default App;
// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PublicRoutes from './route/public';

function App() {
  return (
    <Router>
      <PublicRoutes />
    </Router>
  );
}

export default App;

