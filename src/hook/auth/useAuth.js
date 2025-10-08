import {useState} from "react";
import {useRecoilState, useSetRecoilState} from "recoil";
import {authAtom} from "../../state/auth/authenticationState";
import conf from "../../config";
import useFetch from "../useFetch";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import axios from "axios";

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
            // Check if payload is FormData (for file uploads)
            const isFormData = payload instanceof FormData;
            
            console.log("Payload type:", isFormData ? "FormData" : "JSON");
            if (isFormData) {
                // Log FormData contents for debugging
                for (let pair of payload.entries()) {
                    console.log(pair[0] + ': ' + (pair[0] === 'profileImage' ? 'File object' : pair[1]));
                }
            }
            
            // Create headers with content type for FormData
            const headers = {};
            const token = sessionStorage.getItem("token");
            const id = sessionStorage.getItem("Id");
            const userID = sessionStorage.getItem("userID");
            
            console.log("Session storage values:", {
                token: token ? `${token.substring(0, 10)}...` : "null",
                id: id,
                userID: userID
            });
            
            if (token) headers.Authorization = `Bearer ${token}`;
            if (id) headers.companyid = id;
            
            console.log("Request headers:", headers);
            console.log("API URL:", `${conf.apiBaseUrl}/admin/auth/profile`);
            
            // Don't set Content-Type for FormData, axios will set it automatically with boundary
            
            // Try different approaches for the API call
            let res;
            if (isFormData) {
                try {
                    // First, let's try using the fetchData hook with FormData
                    console.log("Attempting to use fetchData with FormData...");
                    
                    res = await fetchData({
                        method: "PUT",
                        url: `${conf.apiBaseUrl}/admin/auth/profile`,
                        data: payload,
                        isFormData: true
                    });
                    
                    console.log("fetchData FormData response:", res);
                    
                } catch (fetchError) {
                    console.log("fetchData failed, trying axios directly...", fetchError);
                    
                    // Check if it's a 500 error and provide more details
                    if (fetchError.response?.status === 500) {
                        console.error("Server error details:", {
                            status: fetchError.response.status,
                            statusText: fetchError.response.statusText,
                            data: fetchError.response.data,
                            headers: fetchError.response.headers
                        });
                        
                        // Try to get more specific error message
                        const serverMessage = fetchError.response?.data?.message || 
                                            fetchError.response?.data?.error || 
                                            "Internal server error";
                        throw new Error(`Server error: ${serverMessage}`);
                    }
                    
                    // Fallback to axios if fetchData fails
                    const apiUrl = `${conf.apiBaseUrl}/admin/auth/profile`;
                    console.log("Sending FormData to API URL via axios:", apiUrl);
                    
                    // Set specific config for file uploads
                    const config = { 
                        headers,
                        // Add timeout to prevent hanging requests
                        timeout: 30000,
                        // Add onUploadProgress to track upload progress
                        onUploadProgress: (progressEvent) => {
                            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            console.log(`Upload progress: ${percentCompleted}%`);
                        }
                    };
                    
                    try {
                        res = await axios.put(apiUrl, payload, config);
                        console.log("Axios FormData upload response:", res);
                        
                        // Check if the response indicates success
                        if (res.status >= 200 && res.status < 300) {
                            console.log("Upload successful, status:", res.status);
                        } else {
                            console.warn("Unexpected response status:", res.status);
                        }
                    } catch (axiosError) {
                        console.error("Axios also failed:", axiosError);
                        
                        // Provide more specific error messages
                        if (axiosError.response?.status === 413) {
                            throw new Error("File size too large. Please select a smaller image.");
                        } else if (axiosError.response?.status === 415) {
                            throw new Error("Unsupported file type. Please select a valid image file.");
                        } else if (axiosError.response?.status === 400) {
                            throw new Error(axiosError.response?.data?.message || "Invalid request. Please check your input.");
                        } else if (axiosError.response?.status === 401) {
                            throw new Error("Authentication failed. Please login again.");
                        } else if (axiosError.response?.status === 500) {
                            const serverMessage = axiosError.response?.data?.message || 
                                                axiosError.response?.data?.error || 
                                                "Internal server error";
                            throw new Error(`Server error: ${serverMessage}`);
                        }
                        
                        throw axiosError;
                    }
                }
            } else {
                res = await fetchData({
                    method: "PUT",
                    url: `${conf.apiBaseUrl}/admin/auth/profile`,
                    data: payload,
                });
            }

            const responseData = isFormData ? res.data : res;
            console.log("Response data:", responseData);
            
            if (responseData && (responseData.success !== false)) {
                // Update the admin profile state with new data
                const updatedProfile = responseData?.data || responseData;
                console.log("Updated profile data:", updatedProfile);
                
                setAdminProfile(updatedProfile);
                
                // Show success message
                toast.success(responseData?.message || "Profile updated successfully");
                
                // Navigate back to profile page after a short delay
                setTimeout(() => {
                    navigate("/admin-profile");
                }, 1500);
                
                return { success: true, data: updatedProfile };
            } else {
                throw new Error(responseData?.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error("Profile update error:", error);
            console.error("Error response:", error.response);
            
            let errorMessage = "Failed to update profile";
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            toast.error(errorMessage);
            throw error; // Re-throw to handle in component
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
