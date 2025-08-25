import React from "react";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";

const ViewCustomer = () => {
    const navigate = useNavigate();

    const initialValues = {
        customerName: "Theresa Webb",
        phoneNumber: "+91-9876543210",
        address: "3517 W. Gray St. Utica, Pennsylvania 57867",
    };

    const validationSchema = Yup.object({
        customerName: Yup.string().required("Customer name is required"),
        phoneNumber: Yup.string().required("Phone number is required"),
        address: Yup.string().required("Address is required"),
    });

    const handleEditClick = () => {
        toast.info("Edit button clicked");

        setTimeout(() => {
            navigate("/customer/edit/:id");
        }, 1000);
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="p-4 w-full bg-[#E0E9E9]">
            <ToastContainer />

            <div className="bg-white border border-gray-300 rounded-md shadow-md p-3 mb-4 flex items-center gap-2">
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
                <h2 className="text-xl font-semibold">View Customer</h2>
            </div>

            <div className="bg-white rounded-md shadow-md p-4">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={() => {}}>
                    {({errors, touched}) => (
                        <Form>
                            <div className="space-y-8 border border-[#616666] rounded-lg p-4 min-h-[400px]">
                                <div className="flex items-center">
                                    <label htmlFor="customerName" className="w-48 font-medium">
                                        Customer Name:
                                    </label>
                                    <Field
                                        id="customerName"
                                        name="customerName"
                                        className="w-[54%] ml-auto bg-gray-100 border border-teal-600 text-black rounded-md px-2 py-2 focus:outline-none"
                                        disabled
                                    />
                                </div>
                                <div className="flex items-center">
                                    <label htmlFor="phoneNumber" className="w-48 font-medium">
                                        Email ID/Phone Number:
                                    </label>
                                    <Field
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        className="w-[54%] ml-auto bg-gray-100 border border-teal-600 text-black rounded-md px-2 py-2 focus:outline-none"
                                        disabled
                                    />
                                </div>
                                <div className="flex items-center">
                                    <label htmlFor="address" className="w-48 font-medium">
                                        Address:
                                    </label>
                                    <Field
                                        id="address"
                                        name="address"
                                        className="w-[54%] ml-auto bg-gray-100 border border-teal-600 text-black rounded-md px-2 py-2 focus:outline-none"
                                        disabled
                                    />
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>

                <div className="flex justify-center mt-8">
                    <button
                        type="button"
                        className="bg-teal-700 text-white px-24 py-3 rounded-md hover:bg-teal-800"
                        onClick={handleEditClick}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewCustomer;
