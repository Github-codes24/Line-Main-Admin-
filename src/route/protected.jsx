import React from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {authAtom} from "../state/auth/authenticationState";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = () => {
    const {isAuthenticated} = useRecoilValue(authAtom);
    const setAuthState = useSetRecoilState(authAtom);
    const token = sessionStorage.getItem("token");
    const isAdminLogin = sessionStorage.getItem("isAdminLogin") === "true";

    // If we have valid session data but Recoil state is lost, restore it
    if (token && isAdminLogin && !isAuthenticated) {
        setAuthState({isAuthenticated: true});
    }

    if (token && isAdminLogin) {
        return <Outlet />;
    } else {
        return <Navigate to="/" replace />;
    }
};

export default ProtectedRoute;
