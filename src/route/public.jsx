import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PaymentList from '../pages/module/payment/paymentList'; 

function PublicRoute() {
  return (
    <Routes>
      <Route path="/" element={<PaymentList />} />
        </Routes>
  );
}

export default PublicRoute;
