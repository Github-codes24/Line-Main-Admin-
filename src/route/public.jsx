
// src/routes/PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/dashboard"  /> : children;
};

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PaymentList from '../pages/module/payment/paymentList'; 

function PublicRoute() {
  return (
    <Routes>
      <Route path="/admin/paymentmanagement" element={<PaymentList />} />
        </Routes>
  );
}


export default PublicRoute;
