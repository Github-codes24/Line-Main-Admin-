import {useState} from "react";
import {useRecoilState, useSetRecoilState} from "recoil";
import {authAtom} from "../../state/auth/authenticationState";
import conf from "../../config";
import useFetch from "../useFetch";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const useAuth = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const setUserInfo = useSetRecoilState(authAtom);
    const [adminProfile, setAdminProfile] = useState();
    const [fetchData] = useFetch();

    // 1️⃣ Register (Request OTP)
    const register = async (payload) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}/admin/auth/register`,
                payload,
            });
            if (res) {
                sessionStorage.setItem("userId", res?.data?.userId);
            }
        } catch (error) {
            throw error.response?.data || {message: "Failed to register"};
        } finally {
            setLoading(false);
        }
    };

    // 2️⃣ Generate OTP
    const generateOtp = async (payload) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}/admin/auth/generate-otp`,
                data: payload,
            });

            if (res) {
                toast.success("OTP sent successfully");
                setTimeout(() => {
                    navigate("/verifyotp");
                }, 1000);
            }
        } catch (error) {
            console.error("Error while generating OTP", error);
            toast.error(error.message || "Failed to generate OTP");
        } finally {
            setLoading(false);
        }
    };

    // 3️⃣ Regenerate OTP
    // const regenerateOtp = async (userId) => {
    //     setLoading(true);
    //     try {
    //         const res = await fetchData({
    //             method: "PUT",
    //             url: `${conf.apiBaseUrl}/admin/auth/regenerate-otp`,
    //             data: {userId},
    //         });
    //         return res;
    //     } catch (error) {
    //         throw error.response?.data || {message: "Failed to regenerate OTP"};
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // 4️⃣ Verify OTP
    const verifyOtp = async (otp, contact) => {
        const data = {otp, contact};
        setLoading(true);
        try {
            const res = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}/admin/auth/verify-otp`,
                data: data,
            });

            if (res) {
                setUserInfo({
                    isAuthenticated: true,
                });
                toast.success("OTP verified successfully. Registration completed.");
                sessionStorage.setItem("token", res?.data?.token);
                sessionStorage.setItem("userID", res?.data?.user?.id);
                sessionStorage.setItem("name", res?.data?.user?.name);
                sessionStorage.setItem("email", res?.data?.user?.email);
                sessionStorage.setItem("mobile", res?.data?.user?.mobile);
                sessionStorage.setItem("Id", res?.data?.user?.id); // Add company ID for API calls
                sessionStorage.setItem("isAdminLogin", "true"); // Ensure it's set as string
                navigate("/admin/dashboard"); // Navigate to dashboard instead of profile
            }
        } catch (error) {
            throw error.response?.data || {message: "Failed to verify OTP"};
        } finally {
            setLoading(false);
        }
    };

    // 5️⃣ Get Profile
    const getProfile = async () => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/admin/auth/profile`,
            });

            if (res) {
                setAdminProfile(res?.data);
                sessionStorage.setItem("isAdminLogin", res?.data?.isVerified ? "true" : "false");
            }

            return res;
        } catch (error) {
            throw error.response?.data || {message: "Failed to fetch profile"};
        } finally {
            setLoading(false);
        }
    };

    const updateAdminProfile = async (payload) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "PUT",
                url: `${conf.apiBaseUrl}/admin/auth/profile`,
                data: payload,
            });

            if (res) {
                setAdminProfile(res?.data);
                toast.success("Admin updated");
                navigate("/admin-profile");
            }
        } catch (error) {
            throw error.response?.data || {message: "Failed to update profile"};
        } finally {
            setLoading(false);
        }
    };

    // 6️⃣ Logout
    const logout = () => {
        setUserInfo({isAuthenticated: false});
        sessionStorage.clear();
        toast.success("Logged out successfully");
        navigate("/");
    };

    return {
        loading,
        register,
        generateOtp,
        // regenerateOtp,
        verifyOtp,
        getProfile,
        adminProfile,
        updateAdminProfile,
        logout,
    };
};

export default useAuth;
