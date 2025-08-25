
// src/routes/PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import PaymentList from '../pages/module/payment/paymentList'; 

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/dashboard"  /> : children;
};



function PublicRoute() {
  return (
    <Routes>
      <Route path="/" element={<PaymentList />} />
      </Routes>
  );
}


export default PublicRoute;
