// src/pages/AddCustomer.jsx
import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string().required("Customer name is required"),
  contact: Yup.string().required("Email or phone number is required"),
  address: Yup.string().required("Address is required"),
});

const AddCustomer = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go to previous page
  };
  return (
    <div className="p-4 bg-[#E0E9E9] min-h-screen">
      {/* Header Section */}
      <div className="bg-white border rounded-md shadow mb-2">
        <div className="flex items-center gap-2 p-2">
          <svg
            width="28"
            height="28"
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

          <h2 className="text-lg font-semibold text-gray-800">
            Add New Customer
          </h2>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white border rounded-md shadow p-4">
        <Formik
          initialValues={{ name: "", contact: "", address: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log("Submitted:", values);
            resetForm();
          }}
        >
          {() => (
            <Form>
              <div className="border  border-[#616666] rounded-md p-8 min-h-[400px]">
                {/* Customer Name */}
                <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
                  <label className="w-full md:w-1/4 font-medium text-gray-700 mb-2 md:mb-0">
                    Customer Name:
                  </label>
                  <div className="w-full md:w-3/4">
                    <Field
                      name="name"
                      type="text"
                      placeholder="Enter Full Name"
                      className="w-full border border-[#007E74] rounded-md px-8 py-2 focus:outline-none bg-[#F5FFFF]"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Email / Phone */}
                <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
                  <label className="w-full md:w-1/4 font-medium text-gray-700 mb-2 md:mb-0">
                    Email ID/Phone Number:
                  </label>
                  <div className="w-full md:w-3/4">
                    <Field
                      name="contact"
                      type="text"
                      placeholder="Enter Email ID/Phone Number"
                      className="w-full border border-[#007E74] rounded-md px-8 py-2 focus:outline-none bg-[#F5FFFF]"
                    />
                    <ErrorMessage
                      name="contact"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
                  <label className="w-full md:w-1/4 font-medium text-gray-700 mb-2 md:mb-0">
                    Address:
                  </label>
                  <div className="w-full md:w-3/4">
                    <Field
                      name="address"
                      type="text"
                      placeholder="Enter Full Address"
                      className="w-full border border-[#007E74] rounded-md px-8 py-2 focus:outline-none bg-[#F5FFFF] shadow-sm"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>
              {/* Buttons outside form box but still inside white container */}
              <div className="flex justify-center gap-6 mt-4">
                <button
                  type="reset"
                  className="w-32 h-10 border border-teal-500 text-teal-700 rounded-md hover:bg-teal-50 text-sm bg-[#D9F1EB]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-32 h-10 bg-[#007E74] text-white rounded-md hover:bg-teal-800 text-sm"
                >
                  Add Customer
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddCustomer;
