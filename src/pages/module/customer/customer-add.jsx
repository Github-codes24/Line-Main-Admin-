// src/pages/AddCustomer.jsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const validationSchema = Yup.object({
    name: Yup.string().required("Customer name is required"),
    contact: Yup.string().required("Email or phone number is required"),
    address: Yup.string().required("Address is required"),
});

const AddCustomer = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [fetchData] = useFetch();

    const handleBack = () => {
        navigate(-1);
    };

    const addCustomer = async (customerData) => {
        try {
            setIsLoading(true);

            const result = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}/admin/Customer/add-customer`,
                data: customerData
            });

            console.log('API Response:', result);
            
            // Check if customer was added successfully (API might return the customer data directly or with success field)
            if (result && (result.success || result._id || result.id)) {
                console.log('Customer added successfully:', result);
                toast.success(result.message || "Customer added successfully!");
                setTimeout(() => {
                    console.log('Navigating to customer list...');
                    navigate('/admin/customermanagement');
                }, 1000);
                return { success: true, data: result };


            } else {
                throw new Error(result.message || 'Failed to add customer');
            }
        } catch (error) {
            console.error('Error adding customer:', error);
            toast.error(error.response?.data?.message || error.message || 'Failed to add customer');
            return { success: false, error: error.message };
        } finally {
            setIsLoading(false);
        }
    };
    return (
    <div className="bg-[#E0E9E9] min-h-screen w-full rounded-md  loverflow-x-hidden">
    {/* // <div className="bg-[#E0E9E9] min-h-screen w-full rounded-md overflow-x-hidden p-4"> */}
{/* <div className="bg-[#E0E9E9] min-h-screen w-full rounded-md overflow-x-hidden p-4">  */}
    {/* // <div className="bg-[#E0E9E9] min-h-screen w-full rounded-md overflow-x-hidden"> */}
  <ToastContainer />

  {/* Header */}
  <div className="bg-white border shadow mb-2 w-full rounded-md">
    <div className="flex items-center gap-2 p-4">
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

      <h2 className="text-lg font-semibold text-[#0D2E28]">Add New Customer</h2>
    </div>
  </div>

  {/* Main Box */}
  <div className="bg-white border shadow p-4 w-full rounded-md mt-4">
    <Formik
      initialValues={{ name: "", contact: "", address: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        setSubmitting(true);
        const result = await addCustomer(values);
        if (result.success) {
          resetForm();
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="border border-[#616666] rounded-md p-8 min-h-[400px] w-full">
            {/* Customer Name */}
            <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
              <label className="w-full md:w-1/4 font-medium text-[#0D2E28] mb-2 md:mb-0">
                Customer Name:
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

            {/* Email / Phone */}
            <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
              <label className="w-full md:w-1/4 font-medium text-[#0D2E28] mb-2 md:mb-0">
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

            {/* Address */}
            <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
              <label className="w-full md:w-1/4 font-medium text-[#0D2E28] mb-2 md:mb-0">
                Address:
              </label>
              <div className="w-full md:w-3/4">
                <Field
                  name="address"
                  type="text"
                  placeholder="Enter Your Full Address"
                  className="w-full border border-[#001580] rounded-md px-8 py-2 focus:outline-none bg-[#CED4F2] placeholder-[#0D2E28]"
                  //  className="w-[644px] h-[50px] border border-[#001580] rounded-[8px] px-4 py-4 bg-[#CED4F2] placeholder-[#0D2E28] text-[#0D2E28] font-poppins font-medium text-[20px] leading-[100%]"
                    // className="w-[54%] ml-auto border border-[#001580] text-[#0D2E28] rounded-md px-2 py-2 focus:outline-none bg-[#CED4F2]"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
        <div className="flex justify-center gap-6 mt-4">
  <button
    type="reset"
    className="w-[200px] h-[40px] border border-[#001580] text-[#001580] rounded-md hover:bg-teal-50 text-sm bg-[#CED4F2]"
  >
    Cancel
  </button>

  <button
    type="submit"
    disabled={isSubmitting || isLoading}
    className={`w-[200px] h-[40px] text-white rounded-md text-sm ${
      isSubmitting || isLoading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-[#001580] hover:bg-[#CED4F2]"
    }`}
  >
    {isSubmitting || isLoading ? "Adding..." : "Add Customer"}
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