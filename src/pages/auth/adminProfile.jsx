import React, {useEffect} from "react";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import manimage from "../../assets/images/man-image.png";
import useAuth from "../../hook/auth/useAuth";

const AdminProfile = () => {
    const navigate = useNavigate();
    const {getProfile, adminProfile} = useAuth();
    const userId = adminProfile?.id;
    console.log("Id is:", userId);

    useEffect(() => {
        getProfile();
    }, []);
    const initialValues = {
        fullName: "John A.",
        phoneNumber: "+91-9876543210",
        email: "admin@lineman.com",
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required("Required"),
        phoneNumber: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
    });
    const handleBack = () => {
        navigate(-1); // Go to previous page
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#E0E9E9] p-4 md:p-6">
            {/* Header Box */}
            <div className="bg-[#FFFFFF] rounded-lg p-2 mb-2 shadow-md flex items-center space-x-2">
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

                <h2 className="text-xl md:text-2xl font-semibold">Admin Profile</h2>
            </div>

            {/* Profile Box */}
            <div className="flex-grow bg-[#FFFFFF] rounded-md shadow-md p-4 md:p-4">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => console.log(values)}
                >
                    {() => (
                        <Form>
                            {/* Image + Form in One Box */}
                            <div className="flex flex-col md:flex-row gap-6 border border-[#616666] rounded-md p-6 min-h-[400px]">
                                {/* Left - Fields */}
                                <div className="space-y-6 w-full md:w-2/3">
                                    {[
                                        {label: "Full Name", key: "name"},
                                        {label: "Phone Number", key: "mobile"},
                                        {label: "Email ID", key: "email"},
                                    ].map((field) => (
                                        <div key={field.key} className="flex items-center mb-2">
                                            <label className="w-40 font-medium text-gray-700">{field.label}:</label>
                                            <input
                                                type="text"
                                                value={adminProfile?.[field.key] || ""}
                                                readOnly
                                                className="flex-1 border border-[#007E74] bg-[#E0E9E9] px-3 py-2 rounded-md outline-none"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Right - Image */}
                                <div className="flex justify-center items-start w-full md:w-1/3">
                                    <img
                                        src={manimage}
                                        alt="Admin"
                                        className="w-36 h-36 md:w-40 md:h-40 object-cover rounded-full border border-teal-500"
                                    />
                                </div>
                            </div>

                            {/* Bottom Section - Button */}
                            <div className="mt-8 flex justify-center">
                                <button
                                    type="button"
                                    className="bg-[#007E74] text-white px-6 py-2 rounded-md hover:bg-teal-700 transition duration-200"
                                    onClick={() => navigate(`/admin/editadminprofile/${userId}`)}
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AdminProfile;
