import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const ViewCustomer = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get customer ID from URL
    const [isLoading, setIsLoading] = useState(false);
    const [fetchData] = useFetch();
    const [customerData, setCustomerData] = useState({
        name: "",
        contact: "",
        address: "",
    });

    const validationSchema = Yup.object({
        name: Yup.string().required("Customer name is required"),
        contact: Yup.string().required("Phone number is required"),
        address: Yup.string().required("Address is required"),
    });

    // Fetch customer data when component mounts
    useEffect(() => {
        if (id) {
            fetchSingleCustomer(id);
        }
    }, [id]);

    const fetchSingleCustomer = async (customerId) => {
        try {
            setIsLoading(true);

            const result = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/admin/Customer/get-single-customer/${customerId}`,
            });

            console.log('Customer API Response:', result);
            console.log('Customer ID:', customerId);

            if (result.success || result.user || result.data) {
                // Handle different response structures - API returns data in 'user' field
                const customerInfo = result.user || result.data || result.customer || result;
                console.log('Customer Info:', customerInfo);
                
                setCustomerData({
                    name: customerInfo.name || customerInfo.customerName || "",
                    contact: customerInfo.contact || customerInfo.phone || customerInfo.email || "",
                    address: customerInfo.addresses && customerInfo.addresses.length > 0 
                        ? customerInfo.addresses[0].fullAddress || customerInfo.addresses[0].address || ""
                        : customerInfo.address || customerInfo.customerAddress || "",
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


    const handleEditClick = () => {
        navigate(`/admin/customermanagement/edit/${id}`);
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
       <div className="w-full min-h-screen bg-[#E0E9E9] overflow-x-hidden">
  <ToastContainer />

  {/* Header */}
  <div className="bg-white border border-gray-300 shadow-md w-full rounded-md flex items-center gap-2 p-5">
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

  {/* Content */}
  <div className="bg-white shadow-md w-full rounded-md border-t p-4 mt-4">
    {isLoading ? (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Loading customer data...</div>
      </div>
    ) : (
      <div className="space-y-4 border border-[#616666] rounded-lg p-4 min-h-[400px]">
        <div className="flex items-center">
          <label htmlFor="name" className="w-48 font-medium">
            Customer Name:
          </label>
          <input
            id="name"
            name="name"
            value={customerData.name}
            className="w-[54%] ml-auto border border-[#001580] text-black rounded-md px-2 py-2 focus:outline-none bg-[#E4E5EB]"
            disabled
            readOnly
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="contact" className="w-48 font-medium">
            Email ID/Phone Number:
          </label>
          <input
            id="contact"
            name="contact"
            value={customerData.contact}
            className="w-[54%] ml-auto border border-[#001580] text-black rounded-md px-2 py-2 focus:outline-none bg-[#E4E5EB]"
            disabled
            readOnly
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="address" className="w-48 font-medium">
            Address:
          </label>
          <input
            id="address"
            name="address"
            value={customerData.address}
            className="w-[54%] ml-auto border border-[#001580] text-black rounded-md px-2 py-2 focus:outline-none bg-[#E4E5EB]"
            disabled
            readOnly
          />
        </div>
      </div>
    )}

    <div className="flex justify-center mt-8">
      <button
        type="button"
        className={`px-24 py-3 rounded-md text-white ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#001580] hover:bg-[#CED4F2]"
        }`}
        onClick={handleEditClick}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Edit"}
      </button>
    </div>
  </div>
</div>

    );
};

export default ViewCustomer;
