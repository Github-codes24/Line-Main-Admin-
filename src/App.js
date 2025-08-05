// import logo from './logo.svg';
// import './App.css';
// import PaymentList from './pages/module/payment/paymentList';

// function App() {
//   return (
//     <div className="App">
//       <PaymentList/>
//     </div>
//   );
// }

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Navbar from './components/layout/navbar';
// import Sidebar from './components/layout/sidebar';
// import PaymentList from './pages/module/payment/paymentList';

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Sidebar />
//       <main style={{ marginLeft: '250px', padding: '1rem' }}>
//         <Routes>
//           <Route path="/" element={<PaymentList/>} />


//           {/* add more routes here */}
//         </Routes>
//       </main>
//     </Router>
//   );
// }

// export default App;
// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/navbar';
import Sidebar from './components/layout/sidebar';
import PaymentList from './pages/module/payment/paymentList';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar at top */}
        <header className="h-16">
          <Navbar />
        </header>

        {/* Sidebar + Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-800 text-white overflow-y-auto sticky top-16">
            <Sidebar />
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<PaymentList />} />
              {/* Add other routes here */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;


