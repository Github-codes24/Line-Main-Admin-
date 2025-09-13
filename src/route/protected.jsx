import React from "react";
import {useRecoilValue} from "recoil";
import {authAtom} from "../state/auth/authenticationState";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = () => {
    const {isAuthenticated} = useRecoilValue(authAtom);
    const token = sessionStorage.getItem("token");
    const isAdminLogin = sessionStorage.getItem("isAdminLogin") === "true";

    if (isAdminLogin && isAuthenticated && token) {
        return <Outlet />;
    } else {
        return <Navigate to="/" replace />;
    }
};

export default ProtectedRoute;