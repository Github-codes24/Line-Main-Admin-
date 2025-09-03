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

    const {getProfile, adminProfile, updateAdminProfile} = useAuth();

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
        <div className="min-h-screen bg-[#E0E9E9] flex items-center justify-center p-2">
            <div className="w-full max-w-4xl space-y-4">
                <div className="border shadow-md rounded-md p-2 text-xl font-semibold bg-white w-full flex items-center space-x-2">
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={handleBack}
                        className="cursor-pointer"
                    >
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

                    <h2 className="text-xl md:text-2xl font-semibold ml-2">Edit Profile</h2>
                </div>

                <div className="rounded-md shadow-md p-4 border bg-white">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="border border-[#616666] rounded-md p-4 min-h-[400px]">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Left section */}
                                <div className="flex-1 space-y-4">
                                    {/* Full Name */}
                                    <div className="flex items-center">
                                        <label className="w-40 font-medium">Full Name:</label>
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formik.values.fullName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="w-full border border-[#0f9e9e] rounded-md px-3 py-2 focus:outline-none bg-[#F5FFFF]"
                                            />
                                            {formik.touched.fullName && formik.errors.fullName && (
                                                <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-center">
                                        <label className="w-40 font-medium">Phone Number:</label>
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formik.values.phone}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="w-full border border-[#0f9e9e] rounded-md px-3 py-2 focus:outline-none bg-[#F5FFFF]"
                                            />
                                            {formik.touched.phone && formik.errors.phone && (
                                                <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-center">
                                        <label className="w-40 font-medium">Email ID:</label>
                                        <div className="flex-1">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="w-full border border-[#0f9e9e] rounded-md px-3 py-2 focus:outline-none bg-[#F5FFFF]"
                                            />
                                            {formik.touched.email && formik.errors.email && (
                                                <div className="text-red-500 text-sm">{formik.errors.email}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Right section */}
                                <div className="flex flex-col items-center">
                                    <div className="w-32 h-32 rounded-full border border-[#0f9e9e] overflow-hidden">
                                        <img
                                            src={photoPreview || manimage}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <label className="mt-4 inline-flex items-center gap-2 bg-[#0f9e9e] text-white px-4 py-2 rounded-md cursor-pointer">
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
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                type="button"
                                onClick={() => {
                                    formik.resetForm();
                                    setPhoto(null);
                                    setPhotoPreview(null);
                                    navigate(-1);
                                }}
                                className="border border-[#007E74] text-[#0f9e9e] px-10 py-2 rounded-md hover:bg-[#e0f7f7] bg-[#D9F1EB]"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="border-[#007E74] text-white px-6 py-2 rounded-md hover:bg-[#0c7d7d] bg-[#007E74]"
                            >
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default AdminEditProfile;
