import React, {useEffect, useState} from "react";
import {FiUpload} from "react-icons/fi";
import {toast, ToastContainer} from "react-toastify";
import {useFormik} from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate, useParams} from "react-router-dom";

import manimage from "../../assets/images/man-image.png";
import useAuth from "../../hook/auth/useAuth";

const AdminEditProfile = () => {
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const navigate = useNavigate();

    const {loading, getProfile, adminProfile, updateAdminProfile} = useAuth();

    useEffect(() => {
        getProfile();
    }, []);

    const validationSchema = Yup.object({
        fullName: Yup.string().required("Full Name is required"),
        phone: Yup.string()
        .matches(/^(\+91[-\s]?)?[0-9]{10}$/, "Phone number is not valid")
        .required("Phone number is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullName: adminProfile?.name || "",
            phone: adminProfile?.mobile || "",
            email: adminProfile?.email || "",
        },
        validationSchema: validationSchema,

        onSubmit: async (values, {setSubmitting, resetForm}) => {
            let payload = {
                name: values.fullName,
                mobile: values.phone,
                email: values.email,
            };
            updateAdminProfile(payload);
            setSubmitting(false);
        },
    });
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
            toast.success("Photo uploaded successfully!");
        }
    };
    const handleBack = () => {
        navigate(-1);
    };

    return (
     
<div className="flex flex-col min-h-screen bg-[#E0E9E9] w-full">
  {/* Header */}
  {/* <div className="bg-white rounded-lg p-6 mb-4 shadow-md flex items-center gap-2 w-full box-border"> */}
  <div className="bg-white rounded-lg p-4 mb-4 shadow-md flex items-center gap-2 w-full box-border">

    <svg
      width="30"
      height="30"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleBack}
      className="cursor-pointer"
    >
      {/* Arrow paths */}
      <path
        d="M20.0007 36.6663C29.2054 36.6663 36.6673 29.2044 36.6673 19.9997C36.6673 10.7949 29.2054 3.33301 20.0007 3.33301C10.7959 3.33301 3.33398 10.7949 3.33398 19.9997C3.33398 29.2044 10.7959 36.6663 20.0007 36.6663Z"
        stroke="#0D2E28"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.0007 13.333L13.334 19.9997L20.0007 26.6663"
        stroke="#0D2E28"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.6673 20H13.334"
        stroke="#0D2E28"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <h2 className="text-xl md:text-2xl font-semibold">Edit Profile</h2>
  </div>

  {/* Form + Profile Image */}
  <div className="flex-grow bg-white rounded-md shadow-md p-4 md:p-6 w-full box-border">
    {loading ? (
      <div className="text-center min-h-[400px] flex justify-center items-center">
        {/* Loading Spinner */}
      </div>
    ) : (
      <form onSubmit={formik.handleSubmit} className="w-full">
        <div className="flex flex-col md:flex-row gap-6 border border-[#616666] rounded-md p-6 min-h-[400px] w-full box-border flex-wrap">
          
          {/* Left Section - Form Fields */}
          <div className="flex-1 flex flex-col space-y-6 min-w-0">
            {/* Full Name */}
            <div className="flex flex-col sm:flex-row sm:items-center w-full gap-2 sm:gap-4 min-w-0">
  <label className="sm:w-40 w-full font-medium">Full Name:</label>
  <input
    type="text"
    name="fullName"
    value={formik.values.fullName}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    className="flex-1 w-full border border-[#001580] px-3 py-2 rounded-md bg-[#CED4F2] focus:outline-none min-w-0"
  />
</div>

{/* Phone Number */}
<div className="flex flex-col sm:flex-row sm:items-center w-full gap-2 sm:gap-4 min-w-0">
  <label className="sm:w-40 w-full font-medium">Phone Number:</label>
  <input
    type="text"
    name="phone"
    value={formik.values.phone}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    className="flex-1 w-full border border-[#001580] px-3 py-2 rounded-md bg-[#CED4F2] focus:outline-none min-w-0"
  />
</div>

{/* Email */}
<div className="flex flex-col sm:flex-row sm:items-center w-full gap-2 sm:gap-4 min-w-0">
  <label className="sm:w-40 w-full font-medium">Email ID:</label>
  <input
    type="email"
    name="email"
    value={formik.values.email}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    className="flex-1 w-full border border-[#001580] px-3 py-2 rounded-md bg-[#CED4F2] focus:outline-none min-w-0"
  />
</div>
</div>

          {/* Right Section - Profile Image + Upload */}
        <div className="flex flex-col items-center md:items-center md:justify-start md:ml-auto w-full md:w-1/3 mt-6 md:mt-0">
  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-0 border-[#001580] overflow-hidden">
    <img
      src={photoPreview || manimage}
      alt="Profile"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Upload Button */}
  <label className="mt-4 flex items-center justify-center gap-2 bg-[#001580] text-white px-5 py-2 rounded-md cursor-pointer">
    <FiUpload />
    Upload Photo
    <input
      type="file"
      accept="image/*"
      onChange={handlePhotoChange}
      className="hidden"
    />
  </label>
</div>
</div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <button
            type="button"
            onClick={() => {
              formik.resetForm();
              setPhoto(null);
              setPhotoPreview(null);
              navigate(-1);
            }}
            className="border border-[#001580] text-[#001580] bg-[#CED4F2] px-6 py-2 rounded-md w-full md:w-auto"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#001580] text-white px-6 py-2 rounded-md w-full md:w-auto"
          >
            Update Profile
          </button>
        </div>
      </form>
    )}
  </div>
</div>

    );
};

export default AdminEditProfile;
