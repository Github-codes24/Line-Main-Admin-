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
                    {loading ? (
                        <div class="text-center min-h-[400px]">
                            <div role="status">
                                <svg
                                    aria-hidden="true"
                                    class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : (
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
                    )}
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default AdminEditProfile;