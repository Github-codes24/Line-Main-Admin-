import React from "react";
import { Routes, Route } from 'react-router-dom';import "./index.css";
import CommissionList from "./pages/module/set-commission/commmission-list";
import AddCommission from './pages/module/set-commission/add-commission';
import ViewCommission from "./pages/module/set-commission/view-commission";
import EditCommission from "./pages/module/set-commission/edit-commission";



function App() {
  return (
    <Routes>
      <Route path="" element={<CommissionList />} />
      <Route path="/add-commission" element={<AddCommission />} />
      <Route path="/view-commission" element={<ViewCommission />} />
      <Route path="/edit-commission" element={<EditCommission />} />


    </Routes>
  );
}

export default App;
