// src/routes/route.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from '../pages/auth/login';
import Dashboard from '../pages/dashbaord';
import ProtectedRoute from './protected';
import PublicRoute from './public';
import AdminProfile from '../pages/auth/adminProfile';
import AdminEditProfile from '../pages/auth/adminEditProfile';
import CustomerList from '../pages/module/customer/customer-list';
import AddCustomer from '../pages/module/customer/customer-add';
import ViewCustomer from '../pages/module/customer/customer-view';
import EditCustomer from '../pages/module/customer/customer-edit';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <AdminLogin />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
