import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const validationSchema = Yup.object({
    name: Yup.string().required("Worker name is required"),
    experties: Yup.string().required("Expertise is required"),
    contact: Yup.string().required("Email or phone number is required"),
    address: Yup.string()
        .min(10, "Address must be at least 10 characters long")
        .required("Address is required"),
});

const AddWorker = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [fetchData] = useFetch();

    const handleBack = () => {
        navigate(-1);
    };

    const addWorker = async (workerData) => {
        try {
            setIsLoading(true);
            
            // Log the data being sent for debugging
            console.log('Sending worker data:', workerData);

            const result = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}/admin/Worker/add-worker`,
                data: workerData
            });

            console.log('API Response:', result);

            if (result.success) {
                toast.success(result.message || "Worker added successfully!");
                setTimeout(() => {
                    navigate(-1); // Navigate back to worker list
                }, 1500);
                return { success: true, data: result };
            } else {
                throw new Error(result.message || 'Failed to add worker');
            }
        } catch (error) {
            console.error('Error adding worker:', error);
            console.error('Error details:', error.response?.data);
            
            // Show more specific error message
            const errorMessage = error.response?.data?.message || 
                                error.response?.data?.error || 
                                error.message || 
                                'Failed to add worker';
            
            toast.error(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 bg-[#E0E9E9] min-h-screen">
            <ToastContainer />
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

                    <h2 className="text-lg font-semibold text-gray-800">Add New Worker</h2>
                </div>
            </div>

            <div className="bg-white border rounded-md shadow p-4">
                <Formik
                    initialValues={{ 
                        name: "", 
                        experties: "", 
                        contact: "", 
                        address: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { resetForm, setSubmitting }) => {
                        setSubmitting(true);
                        // Remove status field before sending to API
                        const { status, ...workerData } = values;
                        const result = await addWorker(workerData);

                        if (result.success) {
                            resetForm();
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="border border-[#616666] rounded-md p-8 min-h-[400px]">
                                <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
                                    <label className="w-full md:w-1/4 font-medium text-gray-700 mb-2 md:mb-0">
                                        Worker Name:
                                    </label>
                                    <div className="w-full md:w-3/4">
                                        <Field
                                            name="name"
                                            type="text"
                                            placeholder="Enter Full Name"
                                            className="w-full border border-[#001580] rounded-md px-8 py-2 focus:outline-none bg-[#CED4F2] placeholder-[#0D2E28]"
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
                                        Expertise:
                                    </label>
                                    <div className="w-full md:w-3/4">
                                        <Field
                                            as="select"
                                            name="experties"
                                            className="w-full border border-[#001580] rounded-md px-8 py-2 focus:outline-none bg-[#CED4F2] text-[#0D2E28]"
                                        >
                                            <option value="">Select Expertise</option>
                                            <option value="Plumber">Plumber</option>
                                            <option value="Electrician">Electrician</option>
                                            <option value="Cleaner">Cleaner</option>
                                            <option value="Painter">Painter</option>
                                        </Field>
                                        <ErrorMessage
                                            name="experties"
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
                                            placeholder="Enter your Email ID/phone number"
                                            className="w-full border border-[#001580] rounded-md px-8 py-2 focus:outline-none bg-[#CED4F2] placeholder-[#0D2E28]"
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
                                            as="textarea"
                                            name="address"
                                            rows="3"
                                            placeholder="Enter complete address with street, area, city, state, and pincode (e.g., 123 Main Street, Downtown Area, Mumbai, Maharashtra, 400001)"
                                            className="w-full border border-[#001580] rounded-md px-8 py-2 focus:outline-none bg-[#CED4F2] placeholder-[#0D2E28] resize-none"
                                        />
                                        <ErrorMessage
                                            name="address"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                        <div className="text-xs text-gray-500 mt-1">
                                            Please provide a complete address including street, area, city, state, and pincode for verification
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div className="flex justify-center gap-6 mt-4">
                                <button
                                    type="reset"
                                    className="w-32 h-10 border border-[#001580] text-[#001580] rounded-md hover:bg-teal-50 text-sm bg-[#CED4F2]"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || isLoading}
                                    className={`w-32 h-10 text-white rounded-md text-sm ${
                                        isSubmitting || isLoading
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-[#001580] hover:bg-[#CED4F2]'
                                    }`}
                                >
                                    {isSubmitting || isLoading ? 'Adding...' : 'Add Worker'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddWorker;