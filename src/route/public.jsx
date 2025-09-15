// src/routes/PublicRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  return token ? <Navigate to="/admin/dashboard" /> : children;
};

export default PublicRoute;
