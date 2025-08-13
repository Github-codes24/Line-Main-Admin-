import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from "react-router-dom";


const EditCustomer = () => {
    const navigate = useNavigate();
  const initialValues = {
    customerName: 'Theresa Webb',
    phoneOrEmail: '+91-9876543210',
    address: '3517 W. Gray St. Utica, Pennsylvania 57867',
  };

  const validationSchema = Yup.object({
    customerName: Yup.string().required('Customer Name is required'),
    phoneOrEmail: Yup.string().required('Phone/Email is required'),
    address: Yup.string().required('Address is required'),
  });

  const handleSubmit = (values) => {
    console.log(values);
    toast.success('Customer updated successfully!');

    setTimeout(() => {
          navigate(-1);
        }, 1000);
  };
  const handleBack = () => {
    navigate(-1); // Go to previous page
  };

  return (
    <div className="min-h-screen bg-[#E0E9E9] flex items-center justify-center p-2">
      <ToastContainer />

      <div className="w-full max-w-4xl space-y-4">
        {/* Heading Box */}
        <div className="border shadow-md rounded-md p-2 text-xl font-semibold bg-white w-full">
          <div className="flex items-center gap-2">
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
            Edit Customer
          </div>
        </div>

        {/* Form Box */}
        <div className="rounded-xl shadow-md p-4 border bg-white">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ resetForm }) => (
              <Form>
                <div className="border border-[#616666] rounded-lg p-4 min-h-[400px]">
                  <div className="space-y-4">
                    {/* Customer Name */}
                    <div className="flex items-center">
                      <label className="w-40 font-medium">Customer Name:</label>
                      <div className="flex-1">
                        <Field
                          type="text"
                          name="customerName"
                          className="w-full  border border-[#0f9e9e] rounded-md px-3 py-2 focus:outline-none"
                        />
                        <ErrorMessage name="customerName" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>

                    {/* Phone or Email */}
                    <div className="flex items-center">
                      <label className="w-40 font-medium">Email ID/Phone Number:</label>
                      <div className="flex-1 items-center">
                        <Field
                          type="text"
                          name="phoneOrEmail"
                          className="w-full border border-[#0f9e9e] rounded-md px-3 py-2 focus:outline-none"
                        />
                        <ErrorMessage name="phoneOrEmail" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-center">
                      <label className="w-40 font-medium">Address:</label>
                      <div className="flex-1">
                        <Field
                          type="text"
                          name="address"
                          className="w-full border border-[#0f9e9e] rounded-md px-3 py-2 focus:outline-none"
                        />
                        <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => resetForm()}
                    className="border border-[#0f9e9e] text-[#0f9e9e] px-6 py-2 rounded-md hover:bg-[#e0f7f7]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#0f9e9e] text-white px-6 py-2 rounded-md hover:bg-[#0c7d7d]"
                   
                  >
                    Update
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
