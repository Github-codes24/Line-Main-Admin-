// src/routes/route.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Auth
import AdminLogin from "../pages/auth/login";
import AdminProfile from "../pages/auth/adminProfile";
import AdminEditProfile from "../pages/auth/adminEditProfile";

// Dashboard
import Dashboard from "../pages/dashbaord";

// Order
import PendingOrder from '../pages/module/order/pending-order';

// Protected / Public wrappers
import ProtectedRoute from "./protected";
import PublicRoute from "./public";

// Customer
import CustomerList from "../pages/module/customer/customer-list";
import AddCustomer from "../pages/module/customer/customer-add";
import ViewCustomer from "../pages/module/customer/customer-view";
import EditCustomer from "../pages/module/customer/customer-edit";

// Commission
import CommissionList from "../pages/module/set-commission/commmission-list";
import AddCommission from "../pages/module/set-commission/add-commission";
import EditCommission from "../pages/module/set-commission/edit-commission";
import ViewCommission from "../pages/module/set-commission/view-commission";

// Charges of Worker
import ChargesList from "../pages/module/set-charges-of-worker/charges-list";
import AddCharges from "../pages/module/set-charges-of-worker/add-commission";
import EditCharges from "../pages/module/set-charges-of-worker/EditCharges";
import ViewCharges from "../pages/module/set-charges-of-worker/view-commission";

// Limit Amount

import SetLimitAmount from "../pages/module/set-limit-amount/set-limit-amount";
import AddLimitAmount from "../pages/module/set-limit-amount/add-limit-amount";
import EditLimitAmount from "../pages/module/set-limit-amount/edit-limit-amount";
import ViewLimitAmount from "../pages/module/set-limit-amount/view-limit-amount";

import WorkerList from "../pages/module/worker/WorkerList";
import WorkerAdd from "../pages/module/worker/WorkerAdd";
import WorkerEdit from "../pages/module/worker/WorkerEdit";
import WorkerView from "../pages/module/worker/WorkerView";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <AdminLogin />
          </PublicRoute>
        }
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin-profile"
        element={
          <ProtectedRoute>
            <AdminProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/edit-profile"
        element={
          <ProtectedRoute>
            <AdminEditProfile />
          </ProtectedRoute>
        }
      />

      {/* Customer */}
      <Route
        path="/customer-list"
        element={
          <ProtectedRoute>
            <CustomerList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-add"
        element={
          <ProtectedRoute>
            <AddCustomer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/view/:id"
        element={
          <ProtectedRoute>
            <ViewCustomer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/edit/:id"
        element={
          <ProtectedRoute>
            <EditCustomer />
          </ProtectedRoute>
        }
      />

      {/* Set Commission */}
      <Route
        path="/set-commission"
        element={
          <ProtectedRoute>
            <CommissionList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/set-commission/add"
        element={
          <ProtectedRoute>
            <AddCommission />
          </ProtectedRoute>
        }
      />
      <Route
        path="/set-commission/view/:id"
        element={
          <ProtectedRoute>
            <ViewCommission />
          </ProtectedRoute>
        }
      />
      <Route
        path="/set-commission/edit/:id"
        element={
          <ProtectedRoute>
            <EditCommission />
          </ProtectedRoute>
        }
      />

      {/* Set Charges of Worker */}
      <Route
        path="/set-charges-of-worker"
        element={
          <ProtectedRoute>
            <ChargesList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/set-charges-of-worker/add"
        element={
          <ProtectedRoute>
            <AddCharges />
          </ProtectedRoute>
        }
      />
      <Route
        path="/set-charges-of-worker/view/:id"
        element={
          <ProtectedRoute>
            <ViewCharges />
          </ProtectedRoute>
        }
      />
      <Route
        path="/set-charges-of-worker/edit/:id"
        element={
          <ProtectedRoute>
            <EditCharges />
          </ProtectedRoute>
        }
      />

      {/* Set Limit Amount */}
      <Route path="/admin/limit" element={<SetLimitAmount />} />
      <Route path="/admin/limit/add" element={<AddLimitAmount />} />
      <Route path="/admin/limit/edit/:id" element={<EditLimitAmount />} />
      <Route path="/admin/limit/view/:id" element={<ViewLimitAmount />} />

      {/* Catch-all */}
      <Route
        path="/admin/workermanagement"
        element={
          <ProtectedRoute>
            <WorkerList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/workermanagement/add"
        element={
          <ProtectedRoute>
            <WorkerAdd />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/workermanagement/workeredit/:id"
        element={
          <ProtectedRoute>
            <WorkerEdit />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/workermanagement/workerview/:id"
        element={
          <ProtectedRoute>
            <WorkerView />
          </ProtectedRoute>
        }
      />

      {/* Order View */}
      <Route
        path="/orderview/:id"
        element={
          <ProtectedRoute>
            <PendingOrder />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
