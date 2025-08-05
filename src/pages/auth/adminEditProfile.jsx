// src/pages/AdminEditProfile.jsx
import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AdminEditProfile = () => {
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    fullName: "John A.",
    phone: "+91-9876543210",
    email: "admin@lineman.com",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    phone: Yup.string()
      .matches(/^(\+91[-\s]?)?[0-9]{10}$/, "Phone number is not valid")
      .required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
      toast.success("Photo uploaded successfully!");
    }
  };

  const handleBack = () => {
    navigate(-1); // Go to previous page
  };

  return (
    <div className="min-h-screen bg-[#E0E9E9] flex items-center justify-center p-2">
      <div className="w-full max-w-4xl space-y-4">
        {/* Separate Edit Profile Heading Box */}
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

          <h2 className="text-xl md:text-2xl font-semibold ml-2">
            Edit Profile
          </h2>
        </div>

        {/* All Form Content in One Box */}
        <div className="rounded-md shadow-md p-4 border bg-white">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
              toast.success("Profile updated successfully!");
            }}
          >
            {({ resetForm }) => (
              <Form>
                <div className="border border-[#616666] rounded-md p-4 min-h-[400px]">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Left form section */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center">
                        <label className="w-40 font-medium">Full Name:</label>
                        <div className="flex-1">
                          <Field
                            type="text"
                            name="fullName"
                            className="w-full border border-[#0f9e9e] rounded-md px-3 py-2 focus:outline-none bg-[#F5FFFF]"
                          />
                          <ErrorMessage
                            name="fullName"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <label className="w-40 font-medium">
                          Phone Number:
                        </label>
                        <div className="flex-1">
                          <Field
                            type="text"
                            name="phone"
                            className="w-full border border-[#0f9e9e] rounded-md px-3 py-2 focus:outline-none bg-[#F5FFFF]"
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <label className="w-40 font-medium">Email ID:</label>
                        <div className="flex-1">
                          <Field
                            type="email"
                            name="email"
                            className="w-full border border-[#0f9e9e] rounded-md px-3 py-2 focus:outline-none bg-[#F5FFFF]"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right photo section */}
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 rounded-full border border-[#0f9e9e] overflow-hidden">
                        <img
                          src={photo || "../images/man-image.png"}
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

                {/* Buttons center aligned */}
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => resetForm()}
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
              </Form>
            )}
          </Formik>
        </div>
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default AdminEditProfile;
