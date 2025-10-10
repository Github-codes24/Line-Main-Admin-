import React, {useEffect} from "react";
import {motion} from "framer-motion";
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {FiMail} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hook/auth/useAuth";

const AdminLogin = () => {
    const navigate = useNavigate();

    const {loading, generateOtp} = useAuth();

    const formik = useFormik({
        initialValues: {
            emailOrPhone: "",
        },
        validationSchema: Yup.object({
            emailOrPhone: Yup.string().required("Email or Mobile Number is required"),
        }),
        onSubmit: async (values) => {
            const payload = {contact: values.emailOrPhone};

            generateOtp(payload);
            sessionStorage.setItem("contact", values.emailOrPhone);
        },
    });

    return (
//         <div className="flex items-center justify-center min-h-screen bg-[#3D55CC]">
//          <motion.div
//     initial={{ opacity: 0, scale: 0.8 }}
//     animate={{ opacity: 1, scale: 1 }}
//     transition={{ duration: 0.4 }}
//     className="bg-gray-50 rounded-2xl shadow-xl p-8 text-center h-[450px] w-[450px] flex flex-col justify-center"
//   >


               
//              <h1 className="mb-2">
  
//     <span className="text-2xl font-bold text-[#001580]">LineMan Logo</span>
//   {/* </div> */}
// </h1>

//                 <h2 className="text-lg font-bold text-[#0D2E28]">ADMIN LOGIN</h2>
//                 <p className="text-sm text-gray-500 mt-1 mb-6">Please Log In To Your Account</p>

//                <form onSubmit={formik.handleSubmit} className="space-y-4">
//  <div>
//   <input
//     type="text"   // changed from email to text
//     name="emailOrPhone"
//     placeholder="Enter Email / Mobile Number"
//     className={`border ${
//       formik.touched.emailOrPhone && formik.errors.emailOrPhone
//         ? "border-red-500"
//         : "border-[#001580]"
//     } rounded-md py-2 px-3 text-sm bg-[#CED4F2] focus:outline-none text-[#0D2E28] placeholder:text-[#0D2E28] placeholder:opacity-70 w-[300px]`}
//     {...formik.getFieldProps("emailOrPhone")}
//   />
//   {formik.touched.emailOrPhone && formik.errors.emailOrPhone ? (
//     <div className="text-red-500 text-xs mt-1">{formik.errors.emailOrPhone}</div>
//   ) : null}
// </div>
//                 <motion.button
//   whileHover={{ scale: 1.05 }}
//   whileTap={{ scale: 0.95 }}
//   type="submit"
//   className="bg-[#001580] text-white py-2 rounded-md shadow-md hover:bg-[#CED4F2] transition w-[300px] mx-auto"
// >
//   Log In
// </motion.button>
//                 </form>
//             </motion.div>
//         </div>

<div className="flex items-center justify-center min-h-screen bg-[#3D55CC] px-4">
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    className="bg-gray-50 rounded-2xl shadow-xl p-8 text-center 
               h-[450px]  
               w-[450px]  flex flex-col justify-center"
  >
    <h1 className="mb-2">
      <span className="text-2xl font-bold text-[#001580] myfont">LineMan Logo</span>
    </h1>

    <h2 className="text-lg font-bold text-[#0D2E28] font-myfont">ADMIN LOGIN</h2>
    <p className="text-sm text-gray-500 mt-1 mb-6 font-myfont">Please Log In To Your Account</p>

    <form onSubmit={formik.handleSubmit} className="space-y-4 flex flex-col items-center font-myfont">
      <input
        type="text"
        name="emailOrPhone"
        placeholder="Enter Email / Mobile Number"
        className={`border ${
          formik.touched.emailOrPhone && formik.errors.emailOrPhone
            ? "border-red-500"
            : "border-[#001580]"
        } rounded-md py-2 px-3 text-sm bg-[#CED4F2] focus:outline-none text-[#0D2E28] placeholder:text-[#0D2E28] placeholder:opacity-70 w-[300px] sm:w-[80%]`}
        {...formik.getFieldProps("emailOrPhone")}
      />
      {formik.touched.emailOrPhone && formik.errors.emailOrPhone ? (
        <div className="text-red-500 text-xs mt-1">{formik.errors.emailOrPhone}</div>
      ) : null}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="bg-[#001580] font-myfont text-white py-2 rounded-lg shadow-md hover:bg-[#041880] transition w-[300px] sm:w-[80%] mt-2"
      >
        Log In
      </motion.button>
    </form>
  </motion.div>
</div>

    );
};

export default AdminLogin;
