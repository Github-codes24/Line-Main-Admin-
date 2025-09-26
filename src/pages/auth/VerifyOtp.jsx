
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoMdRefresh } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../../state/auth/authenticationState";
import useAuth from "../../hook/auth/useAuth";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  const { verifyOtp, regenerateOtp } = useAuth();
  const navigate = useNavigate();
  const setAuthState = useSetRecoilState(authAtom);

  const inputRefs = useRef([]);
  const contact = sessionStorage.getItem("contact");

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await verifyOtp(otpValue, contact);

      if (response?.success) {
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("isAdminLogin", "true");

        setAuthState({ isAuthenticated: true, token: response.token });

        toast.success("OTP verified successfully!");
        navigate("/admin/dashboard");
      } else {
        toast.error(response?.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const response = await regenerateOtp(contact);
      if (response?.success) {
        toast.success("OTP resent successfully!");
      } else {
        toast.error(response?.message || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error("Something went wrong while resending OTP");
    }
  };

  return (
    <div className="bg-[#3D55CC] min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-b from-white to-teal-50 p-8 rounded-2xl shadow-lg text-center w-full max-w-md"
      >
        <MdOutlineMailOutline size={40} className="mx-auto text-[#0D2E28]" />
        <h2 className="text-2xl font-bold text-[#0D2E28] mt-2">Verify OTP</h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter the 6-digit OTP sent to your registered email
        </p>

        {/* OTP boxes */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              className="w-[52px] h-[52px] text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001580] bg-[#CED4F2]"
            />
          ))}
        </div>

         {/* Resend OTP */}
        <div className="flex justify-center items-center mt-5">
          <p className="text-gray-500 text-sm">Didn’t receive the OTP?</p>
          <button onClick={handleResend} className="ml-2 text-[#001580]">
            <IoMdRefresh size={22} />
          </button>
        </div>

        {/* Buttons side by side */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => navigate("/login")}
            className="flex-1 py-3 rounded-lg bg-[#CECEF2] border border-[#001580] text-[#001580]  transition"
          >
            Cancel
          </button>
          <button
            onClick={handleVerify}
            disabled={loading}
            className="flex-1 py-3 rounded-lg bg-[#001580] text-white hover:bg-[#011576] border-[#001580] transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>

       
      </motion.div>
    </div>
  );
};

export default VerifyOtp;
