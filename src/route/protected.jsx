// src/routes/ProtectedRoute.js
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom } from "../state/auth/authenticationState";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useRecoilValue(authAtom);
  const setAuthState = useSetRecoilState(authAtom);

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    if (token && !isAuthenticated) {
      setAuthState({ isAuthenticated: true, token });
    }
  }, [token, isAuthenticated, setAuthState]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
