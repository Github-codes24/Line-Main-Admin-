// src/pages/AddCustomer.jsx
import { useState } from 'react';
import React from "react";

import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";

// API Configuration
const API_BASE_URL = 'https://linemen-be-1.onrender.com';
const API_ENDPOINTS = {
    ADD_CUSTOMER: '/admin/Customer/add-customer'
};

const getAuthToken = () => {
    return localStorage.getItem('authToken') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGIxNTRlNTlmMzU3OWJiOGQzMTA1OWYiLCJlbWFpbCI6ImQyZXZhbnNoc2FlZGh1MjBAZ21haWwuY29tIiwiaWF0IjoxNzU2NzMxNDc2LCJleHAiOjE3NTkzMjM0NzZ9.xI3UxSCp6wyb-EHCd5LBqIA5AqIOPIFG7cJyi6XZmsM';
};

// Add Customer API Function
const addCustomer = async (customerData) => {
    try {
        console.log('Add Customer API URL:', `${API_BASE_URL}${API_ENDPOINTS.ADD_CUSTOMER}`);
        console.log('Add Customer Request Data:', customerData);

        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ADD_CUSTOMER}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(customerData)
        });

        console.log('Add Customer Response Status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.log('Add Customer Error Response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Add Customer Success:', data);
        return data;
    } catch (error) {
        console.error('Error adding customer:', error);
        throw error;
    }
};

const validationSchema = Yup.object({
    name: Yup.string().required("Customer name is required"),
    contact: Yup.string().required("Email or phone number is required"),
    address: Yup.string().required("Address is required"),
});

const AddCustomer = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    //Adding state for API
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type:'', message:''});

     

    return (
        <div className="p-4 bg-[#E0E9E9] min-h-screen">
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

                    <h2 className="text-lg font-semibold text-gray-800">Add New Customer</h2>
                </div>
            </div>

            <div className="bg-white border rounded-md shadow p-4">
                <Formik
                    initialValues={{name: "", contact: "", address: ""}}
                    validationSchema={validationSchema}

                    // onSubmit={(values, {resetForm}) => {
                    //     console.log("Submitted:", values);
                    //     resetForm();
                    // }}

                    //Replacing onsubmit function with API
                    onSubmit={async (values, { resetForm, setSubmitting}) => {
                        console.log(' Form submitted with values:', values);
                        console.log(' addCustomer function:', addCustomer);
                        
                        setIsLoading(true);
                        setSubmitStatus({ type: '', message: ''});
                    
                        try {
                            const customerData = {
                                name: values.name,
                                contact: values.contact,
                                address: values.address
                            };
                    
                            console.log(' Sending customer data:', customerData);
                            const result = await addCustomer(customerData);
                            console.log(' API Success result:', result);
                    
                            setSubmitStatus({
                                type:'success',
                                message: 'Customer added successfully'
                            });
                            resetForm();
                    
                        }catch (error) {
                            console.log(' API Error:', error);
                            console.log(' Error message:', error.message);
                            setSubmitStatus ({
                                type: 'error',
                                message: 'Failed to add customer. Please try again.'
                            });
                        }finally {
                            setIsLoading(false);
                            setSubmitting(false);
                        }
                    }}
                       
                >
                    {() => (
                        <Form>
                            <div className="border  border-[#616666] rounded-md p-8 min-h-[400px]">
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

                {/* Adding status message for JSX API */}

                {submitStatus.message && (
  <div className={`p-3 rounded-md mb-4 ${
    submitStatus.type === 'success' 
      ? 'bg-green-100 text-green-700 border border-green-300' 
      : 'bg-red-100 text-red-700 border border-red-300'
  }`}>
    {submitStatus.message}
  </div>
)}

 {/* End of status message for JSX API */}
                            <div className="flex justify-center gap-6 mt-4">
                                <button
                                    type="reset"
                                    className="w-32 h-10 border border-teal-500 text-teal-700 rounded-md hover:bg-teal-50 text-sm bg-[#D9F1EB]"
                                >
                                    Cancel
                                </button>

                                {/* Adding submit button for API  */}

                                {/* <button
                                    type="submit"
                                    className="w-32 h-10 bg-[#007E74] text-white rounded-md hover:bg-teal-800 text-sm"
                                >
                                    Add Customer
                                </button> */}
                                <button
  type="submit"
  disabled={isLoading}
  className={`w-32 h-10 rounded-md text-sm ${
    isLoading 
      ? 'bg-gray-400 cursor-not-allowed' 
      : 'bg-[#007E74] hover:bg-teal-800'
  } text-white`}
>
  {isLoading ? 'Adding...' : 'Add Customer'}
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
