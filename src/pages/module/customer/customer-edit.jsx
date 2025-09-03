import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

// API Configuration
const API_BASE_URL = 'https://linemen-be-1.onrender.com';
const API_ENDPOINTS = {
    UPDATE_CUSTOMER: '/admin/Customer/update-customer',
    GET_SINGLE_CUSTOMER: '/admin/Customer/get-single-customer'
};

const getAuthToken = () => {
    return localStorage.getItem('authToken') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGIxNTRlNTlmMzU3OWJiOGQzMTA1OWYiLCJlbWFpbCI6ImQyZXZhbnNoc2FlZGh1MjBAZ21haWwuY29tIiwiaWF0IjoxNzU2NzMxNDc2LCJleHAiOjE3NTkzMjM0NzZ9.xI3UxSCp6wyb-EHCd5LBqIA5AqIOPIFG7cJyi6XZmsM';
};

// Update Customer API Function
const updateCustomer = async (customerId, customerData) => {
    try {
        const url = `${API_BASE_URL}${API_ENDPOINTS.UPDATE_CUSTOMER}/${customerId}`;
        console.log('Update Customer API URL:', url);
        console.log('Update Customer Request Data:', customerData);

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(customerData)
        });

        console.log('Update Customer Response Status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.log('Update Customer Error Response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Update Customer Success:', data);
        return data;
    } catch (error) {
        console.error('Error updating customer:', error);
        throw error;
    }
};

// Get Single Customer API Function
const getSingleCustomer = async (customerId) => {
    try {
        const url = `${API_BASE_URL}${API_ENDPOINTS.GET_SINGLE_CUSTOMER}/${customerId}`;
        console.log('Get Single Customer API URL:', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        console.log('Get Single Customer Response Status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.log('Get Single Customer Error Response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Get Single Customer Success:', data);
        return data;
    } catch (error) {
        console.error('Error getting single customer:', error);
        throw error;
    }
};

const EditCustomer = () => {
    const navigate = useNavigate();
    // const initialValues = {
    //     customerName: "Theresa Webb",
    //     phoneOrEmail: "+91-9876543210",
    //     address: "3517 W. Gray St. Utica, Pennsylvania 57867",
    // };

    const validationSchema = Yup.object({
        customerName: Yup.string().required("Customer Name is required"),
        phoneOrEmail: Yup.string().required("Phone/Email is required"),
        address: Yup.string().required("Address is required"),
    });

    // const handleSubmit = (values) => {
    //     console.log(values);
    //     toast.success("Customer updated successfully!");

    //     setTimeout(() => {
    //         navigate(-1);
    //     }, 1000);
    // };

    //Adding the function for the API
    const handleSubmit = async (values, { setSubmitting }) => {
        setIsLoading(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            const customerData = {
                name: values.customerName,
                contact: values.phoneOrEmail,
                address: values.address  // <-- This is correct (address)
            };

            const result = await updateCustomer(id, customerData);

            // setSubmitStatus({
            //     type: 'success',
            //     message: 'Customer updated successfully!'
            // });


            // Add this line to clear any previous errors
            setSubmitStatus({
                type: 'success',
                message: 'Customer updated successfully!'
            });

            setTimeout(() => {
                navigate('/admin/customermanagement');  // Go to Customer List
            }, 1500);


        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: 'Failed to update customer. Plesae try again.'
            });
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    // Ending of this API function

    const handleBack = () => {
        navigate(-1);
    };

    //Adding states for the API

    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
    const { id } = useParams();//for get customer ID from url Tushar beta
    //ending of it API

    //Adding states for getting single user API
    const [isLoadingCustomer, setIsLoadingCustomer] = useState(true);
    // const [cusomerData, setCustomerData] = useState(null);
    const [customerData, setCustomerData] = useState(null);


    //Adding useEffect to fetfh the customer data

    useEffect(() => {
        const fetchCustomer = async () => {
            if (id) {
                try {
                    setIsLoadingCustomer(true);
                    const customer = await getSingleCustomer(id);
                    setCustomerData(customer);
                } catch (error) {
                    console.error('Error fetching customer:', error);
                    setSubmitStatus({
                        type: 'error',
                        message: 'Failed to load customer data'
                    });
                } finally {
                    setIsLoadingCustomer(false);
                }
            }
        };

        fetchCustomer();
    }, [id]);

    const initialValues = {
        customerName: customerData?.name || "",
        phoneOrEmail: customerData?.contact || "",
        address: customerData?.address || "",
    };

    return (
        <div className="min-h-screen bg-[#E0E9E9] flex items-center justify-center p-2">
            <ToastContainer />

            <div className="w-full max-w-4xl space-y-4">
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
                {isLoadingCustomer ? (
                    <div className="text-center p-4">Loading customer data...</div>
                ) : (
                    <div className="rounded-xl shadow-md p-4 border bg-white">
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                            {({ resetForm }) => (
                                <Form>
                                    <div className="border border-[#616666] rounded-lg p-4 min-h-[400px]">
                                        <div className="space-y-4">
                                            <div className="flex items-center">
                                                <label className="w-40 font-medium">Customer Name:</label>
                                                <div className="flex-1">
                                                    <Field
                                                        type="text"
                                                        name="customerName"
                                                        className="w-full border border-[#0f9e9e] rounded-md px-3 py-2 focus:outline-none"
                                                    />
                                                    <ErrorMessage
                                                        name="customerName"
                                                        component="div"
                                                        className="text-red-500 text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center">
                                                <label className="w-40 font-medium">Email ID/Phone Number:</label>
                                                <div className="flex-1 items-center">
                                                    <Field
                                                        type="text"
                                                        name="phoneOrEmail"
                                                        className="w-full border border-[#0f9e9e] rounded-md px-3 py-2 focus:outline-none"
                                                    />
                                                    <ErrorMessage
                                                        name="phoneOrEmail"
                                                        component="div"
                                                        className="text-red-500 text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center">
                                                <label className="w-40 font-medium">Address:</label>
                                                <div className="flex-1">
                                                    <Field
                                                        type="text"
                                                        name="address"
                                                        className="w-full border border-[#0f9e9e] rounded-md px-3 py-2 focus:outline-none"
                                                    />
                                                    <ErrorMessage
                                                        name="address"
                                                        component="div"
                                                        className="text-red-500 text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status Messages */}
                                    {submitStatus.message && (
                                        <div className={`p-3 rounded-md mb-4 ${submitStatus.type === 'success'
                                                ? 'bg-green-100 text-green-700 border border-green-300'
                                                : 'bg-red-100 text-red-700 border border-red-300'
                                            }`}>
                                            {submitStatus.message}
                                        </div>
                                    )}

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
                                            disabled={isLoading}
                                            className={`px-6 py-2 rounded-md ${isLoading
                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                    : 'bg-[#0f9e9e] hover:bg-[#0c7d7d]'
                                                } text-white`}
                                        >
                                            {isLoading ? 'Updating...' : 'Update'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                )}

            </div>

        </div>
    );
};

export default EditCustomer;
