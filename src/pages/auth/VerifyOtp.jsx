import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../../state/auth/authenticationState";
import useAuth from "../../hook/auth/useAuth";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [otpSentMessage, setOtpSentMessage] = useState(""); // message shown below instruction

  const { verifyOtp, regenerateOtp } = useAuth();
  const navigate = useNavigate();
  const setAuthState = useSetRecoilState(authAtom);

  const inputRefs = useRef([]);
  const contact = sessionStorage.getItem("contact") || "";

  // ✅ Show OTP sent message initially
  useEffect(() => {
    if (contact) {
      setOtpSentMessage(contact); // just show email or mobile number
    }
  }, [contact]);

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
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

 const handleResend = async () => {
  if (!contact) {
    toast.error("Contact not found. Cannot resend OTP.");
    return;
  }

  try {
    // Prepare payload depending on type
    const payload = contact.includes("@") ? { email: contact } : { phone: contact };

    // Call regenerateOtp with proper payload
    const response = await regenerateOtp(payload);

    if (response?.success) {
      toast.success("OTP resent successfully!");
    } else {
      toast.error(response?.message || "Failed to resend OTP");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong while resending OTP");
  }
};

  return (
  // <div className="bg-[#3D55CC] min-h-screen flex items-center justify-center px-4">
  <div className="bg-[#3D55CC] min-h-screen flex items-center justify-center px-4 font-myfont">

  {/* // <div className="bg-[#3D55CC] min-h-screen flex items-center justify-center px-4 font-Poppins"> */}

  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-b from-white to-teal-50 p-6 sm:p-8 rounded-2xl shadow-lg text-center w-full max-w-md"
  >
    <h2 className="text-2xl sm:text-3xl font-bold text-[#0D2E28] mt-2 font-myfont">Verify Code</h2>
    <p className="text-gray-500 text-sm sm:text-base mb-2 font-Poppins">
      Please enter the code we just sent to mobile no {contact.includes("@") ? "" : "mobile number"}
    </p>

    {/* Show email or mobile */}
    {otpSentMessage && (
      <p className="text-[#001580] font-semibold text-sm sm:text-base mb-6 text-center">
        {otpSentMessage}
      </p>
    )}

    {/* OTP boxes */}
    <div className="flex justify-center gap-2 sm:gap-3 mb-6 flex-wrap">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          maxLength={1}
          className="w-[40px] sm:w-[52px] h-[40px] sm:h-[52px] text-center text-lg sm:text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001580] bg-[#CED4F2]"
        />
      ))}
    </div>

    {/* Resend OTP */}
    <div className="flex justify-center items-center mt-5 flex-wrap">
      <p className="text-[#0D2E28] font-semibold text-sm sm:text-base mr-2 mb-2 sm:mb-0">Didn’t receive the code?</p>
      <button onClick={handleResend} className="text-[#001580] font-semibold text-sm sm:text-base">
        Resend
      </button>
    </div>

    {/* Buttons side by side */}
    <div className="flex flex-col sm:flex-row gap-3 mt-4">
      <button
        onClick={() => navigate("/")}
        className="flex-1 font-semibold py-3 rounded-lg bg-[#CECEF2] border border-[#001580] text-[#001580] transition"
      >
        Cancel
      </button>
      <button
        onClick={handleVerify}
        disabled={loading}
        className="flex-1 py-3 rounded-lg bg-[#001580] text-white hover:bg-[#041880] border-[#001580] transition disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Verify"}
      </button>
    </div>
  </motion.div>
</div>

  );
};

export default VerifyOtp;
