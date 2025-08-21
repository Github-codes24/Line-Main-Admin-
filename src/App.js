import React from "react";
import { Routes, Route } from 'react-router-dom';
import "./index.css";

import SetLimitAmount from "./pages/module/set-limit-amount/set-limit-amount";
import SetLimitAmount2 from "./pages/module/set-limit-amount/set-limit-amount2";





function App() {
  return (
    <>
    <div>
      <SetLimitAmount/>
      <SetLimitAmount2/>
    </div>
    </>
  );
}

export default App;

{/* <Routes>
    //   <Route path="" element={<ChargesList/>} />
    //   <Route path="/add-commission" element={ <AddCommission/>} />
    //   <Route path="/view-commission" element={<ViewCommission/>} />
    //   <Route path="/edit-commission" element={<EditCommission/>} />

    // </Routes> */}

// import ChargesList from "./pages/module/set-charges-of-worker/charges-list";
// import AddCommission from "./pages/module/set-charges-of-worker/add-commission";
// import ViewCommission from "./pages/module/set-charges-of-worker/view-commission";
// import EditCommission from "./pages/module/set-charges-of-worker/edit-commission";


// import CommissionList from "./pages/module/set-commission/commmission-list";
// import AddCommission from './pages/module/set-commission/add-commission';
// import ViewCommission from "./pages/module/set-commission/view-commission";
// import EditCommission from "./pages/module/set-commission/edit-commission";


      {/* <ChargesList/>
      <AddCommission/>
      <ViewCommission/>
      <EditCommission/> */}