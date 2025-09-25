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

            console.log('Customer Edit API Response:', result);

            if (result.success || result.user) {
                // Handle different response structures - API returns data in 'user' field
                const customerInfo = result.user || result.data || result.customer || result;
                console.log('Customer Edit Info:', customerInfo);
                
                setInitialValues({
                    name: customerInfo.name || customerInfo.customerName || "",
                    contact: customerInfo.contact || customerInfo.phone || customerInfo.email || "",
                    address: customerInfo.address || customerInfo.customerAddress || "",
                });
            } else {
                console.error('API response not successful:', result);
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
                setTimeout(() => navigate(-1), 1500); // Navigate back
            } else {
                throw new Error(result.message || 'Failed to update customer');
            }
        } catch (error) {
            console.error('Error updating customer:', error);
            toast.error(error.response?.data?.message || error.message || 'Failed to update customer');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        await updateCustomer(values);
        setSubmitting(false);
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
<div className="min-h-screen bg-[#E0E9E9] overflow-auto">
  <ToastContainer />

  {/* Top Header Box */}
  <div className="w-full bg-white rounded-md shadow-md p-4 text-xl font-semibold flex items-center gap-2 mb-4">
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

  {/* White Form Container */}
  <div className="w-full bg-white  shadow-md p-4 space-y-4 rounded-md">
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          {/* Inner bordered fields */}
          <div className="border border-[#001580] rounded-lg p-4 min-h-[400px] space-y-4 w-full">
            <div className="flex items-center gap-4 w-full">
              <label className="w-40 font-medium">Customer Name:</label>
              <Field
                type="text"
                name="name"
                placeholder="Enter Full Name"
                className="flex-1 border border-[#001580] rounded-md px-3 py-2 focus:outline-none bg-[#CED4F2]"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm ml-2"
              />
            </div>

            <div className="flex items-center gap-4 w-full">
              <label className="w-40 font-medium">Email ID/Phone Number:</label>
              <Field
                type="text"
                name="contact"
                placeholder="Enter Email ID/Phone Number"
                className="flex-1 border border-[#001580] rounded-md px-3 py-2 focus:outline-none bg-[#CED4F2]"
              />
              <ErrorMessage
                name="contact"
                component="div"
                className="text-red-500 text-sm ml-2"
              />
            </div>

            <div className="flex items-center gap-4 w-full">
              <label className="w-40 font-medium">Address:</label>
              <Field
                type="text"
                name="address"
                placeholder="Enter Full Address"
                className="flex-1 border border-[#001580] rounded-md px-3 py-2 focus:outline-none bg-[#CED4F2]"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm ml-2"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-4 w-full">
            <button
              type="button"
              onClick={handleBack}
              className="border border-[#001580] text-[#001580] px-6 py-2 rounded-md hover:bg-[#CED4F2] bg-[#CED4F2]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className={`px-6 py-2 rounded-md text-white ${
                isSubmitting || isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#001580] hover:bg-[#CED4F2]"
              }`}
            >
              {isSubmitting || isLoading ? "Updating..." : "Update Customer"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
</div>


    );
};

export default EditCustomer;
