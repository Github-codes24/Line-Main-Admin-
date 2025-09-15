import React from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hook/auth/useAuth";

const AdminLogin = () => {
    const navigate = useNavigate();
    const { loading, generateOtp } = useAuth();

    const formik = useFormik({
        initialValues: {
            emailOrPhone: "",
        },
        validationSchema: Yup.object({
            emailOrPhone: Yup.string().required("Email or Mobile Number is required"),
        }),
        onSubmit: async (values) => {
            const payload = { contact: values.emailOrPhone };
            generateOtp(payload);
            sessionStorage.setItem("contact", values.emailOrPhone);
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#3d55cc]">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-100 rounded-xl shadow-lg p-8 w-full max-w-sm text-center"
            >
                <h1 className="text-xl font-bold text-blue-900 mb-2">LineMan Logo</h1>
                <h2 className="text-md font-semibold text-gray-800">ADMIN LOGIN</h2>
                <p className="text-sm text-gray-500 mt-1 mb-6">Please Log In To Your Account</p>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
                        <input
                            type="text"
                            name="emailOrPhone"
                            placeholder="Enter Email / Mobile Number"
                            className={`pl-10 w-full border ${
                                formik.touched.emailOrPhone && formik.errors.emailOrPhone
                                    ? "border-red-500"
                                    : "border-blue-400"
                            } rounded-md py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-200`}
                            {...formik.getFieldProps("emailOrPhone")}
                        />
                        {formik.touched.emailOrPhone && formik.errors.emailOrPhone ? (
                            <div className="text-red-500 text-xs mt-1">{formik.errors.emailOrPhone}</div>
                        ) : null}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-[#001580] text-white py-2 rounded-md shadow-md hover:bg-blue-800 transition"
                    >
                        Log In
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
