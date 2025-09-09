import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const EditCustomer = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get customer ID from URL
    const [isLoading, setIsLoading] = useState(false);
    const [fetchData] = useFetch();
    const [initialValues, setInitialValues] = useState({
        name: "",
        contact: "",
        address: "",
    });

    const validationSchema = Yup.object({
        name: Yup.string().required("Customer Name is required"),
        contact: Yup.string().required("Phone/Email is required"),
        address: Yup.string().required("Address is required"),
    });

    // Fetch customer data when component mounts
    useEffect(() => {
        if (id) {
            fetchCustomerData(id);
        }
    }, [id]);

    const fetchCustomerData = async (customerId) => {
        try {
            setIsLoading(true);

            const result = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/admin/Customer/get-single-customer/${customerId}`,
            });

            if (result.success) {
                setInitialValues({
                    name: result.data.name || "",
                    contact: result.data.contact || "",
                    address: result.data.address || "",
                });
            } else {
                toast.error(result.message || 'Failed to fetch customer data');
            }
        } catch (error) {
            console.error('Error fetching customer:', error);
            toast.error(error.response?.data?.message || error.message || 'Error fetching customer data');
        } finally {
            setIsLoading(false);
        }
    };

    const updateCustomer = async (customerData) => {
        try {
            setIsLoading(true);

            const result = await fetchData({
                method: "PUT",
                url: `${conf.apiBaseUrl}/admin/Customer/update-customer/${id}`,
                data: customerData
            });

            if (result.success) {
                toast.success(result.message || "Customer updated successfully!");
                setTimeout(() => {
                    navigate(-1); // Navigate back to customer list
                }, 1500);
                return { success: true, data: result };
            } else {
                throw new Error(result.message || 'Failed to update customer');
            }
        } catch (error) {
            console.error('Error updating customer:', error);
            toast.error(error.response?.data?.message || error.message || 'Failed to update customer');
            return { success: false, error: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        await updateCustomer(values);
        setSubmitting(false);
    };

    // Ending of this API function

    const handleBack = () => {
        navigate(-1);
    };

    //Adding states for the API

    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({type: "", message: ""});
    const {id} = useParams();

    const [isLoadingCustomer, setIsLoadingCustomer] = useState(true);

    const [customerData, setCustomerData] = useState(null);

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

                <div className="rounded-xl shadow-md p-4 border bg-white">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize={true}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="border border-[#616666] rounded-lg p-4 min-h-[400px]">
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <label className="w-40 font-medium">Customer Name:</label>
                                            <div className="flex-1">
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    placeholder="Enter Full Name"
                                                    className="w-full border border-[#0f9e9e] rounded-md px-3 py-2 focus:outline-none"
                                                />
                                                <ErrorMessage
                                                    name="name"
                                                    component="div"
                                                    className="text-red-500 text-sm"
                                                />
                                            </div>

                                        <div className="flex items-center">
                                            <label className="w-40 font-medium">Email ID/Phone Number:</label>
                                            <div className="flex-1 items-center">
                                                <Field
                                                    type="text"
                                                    name="contact"
                                                    placeholder="Enter Email ID/Phone Number"
                                                    className="w-full border border-[#0f9e9e] rounded-md px-3 py-2 focus:outline-none"
                                                />
                                                <ErrorMessage
                                                    name="contact"
                                                    component="div"
                                                    className="text-red-500 text-sm"
                                                />
                                            </div>

                                        <div className="flex items-center">
                                            <label className="w-40 font-medium">Address:</label>
                                            <div className="flex-1">
                                                <Field
                                                    type="text"
                                                    name="address"
                                                    placeholder="Enter Full Address"
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

                                <div className="flex justify-center gap-4 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => navigate(-1)}
                                        className="border border-[#0f9e9e] text-[#0f9e9e] px-6 py-2 rounded-md hover:bg-[#e0f7f7]"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || isLoading}
                                        className={`px-6 py-2 rounded-md text-white ${isSubmitting || isLoading
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-[#0f9e9e] hover:bg-[#0c7d7d]'
                                            }`}
                                    >
                                        {isSubmitting || isLoading ? 'Updating...' : 'Update Customer'}
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
