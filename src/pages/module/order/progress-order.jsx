import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import rectangle from "../../../assets/images/Rectangle.png";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";
import { toast } from "react-toastify";

const ProgressOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
const [fetchData] = useFetch();


  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        console.log("Fetching order with ID:", id);
      const response = await fetchData({
  method: "GET",
  url: `${conf.apiBaseUrl}/admin/order/${id}`,
});
        console.log("Response:", response);

        if (response?.success) {
          setOrder(response?.data);
        } else {
          toast.error(response?.message || "Failed to load order details");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error("Something went wrong while fetching the order");
      }
    };

    if (id) fetchOrderDetails();
  }, [id]);

  if (!order) {

    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600">
        Loading order details...
      </div>
    );
  }

  return (
    <div className="p-2 font-[Poppins]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4 bg-white p-4 rounded-lg border shadow">
        <button onClick={() => navigate(-1)} className="text-xl text-black hover:text-gray-600">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.9997 36.6673C29.2044 36.6673 36.6663 29.2054 36.6663 20.0007C36.6663 10.7959 29.2044 3.33398 19.9997 3.33398C10.7949 3.33398 3.33301 10.7959 3.33301 20.0007C3.33301 29.2054 10.7949 36.6673 19.9997 36.6673Z"
              stroke="#0D2E28"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M19.9997 13.334L13.333 20.0007L19.9997 26.6673"
              stroke="#0D2E28"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M26.6663 20H13.333"
              stroke="#0D2E28"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
        <h1 className="text-xl font-semibold">View Order</h1>
      </div>

      {/* Content */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="border border-[#616666] p-4 rounded-lg h-screen overflow-y-auto hide-scrollbar ml-10">

          {/* Order Number */}
          <div className="grid grid-cols-4 gap-4 mb-4 mt-4">
            <label className="col-span-1 text-black font-bold">Order Number :</label>
            <input
              disabled
             value={order.orderId || "N/A"}
              className="col-span-1 px-4 py-2 font-bold text-black rounded-lg bg-[#e4e5eb] border border-[#001580]"
            />
          </div>

          {/* Customer Details */}
          <section className="mb-6">
            <h2 className="font-semibold text-lg mb-4">Customer Details</h2>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium">Customer Name :</label>
              <input
                disabled
               value={order.customer?.name || "N/A"}
                className="col-span-1 px-4 py-2 rounded-lg bg-[#e4e5eb] border border-[#001580]"
              />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium">Email/Phone Number :</label>
              <input
                disabled
                value={order.customer?.email || order.customer?.phone || "N/A"}
                className="col-span-1 px-4 py-2 rounded-lg bg-[#e4e5eb] border border-[#001580]"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <label className="col-span-1 font-medium">Address :</label>
              <textarea
                disabled
                value={order.deliveryAddress?.fullAddress || "N/A"}
                className="col-span-1 px-4 py-3 rounded-lg bg-[#e4e5eb] border border-[#001580] min-h-[80px]"
              />
            </div>
          </section>

          <hr className="my-6 w-8/12" />

          {/* Worker Details */}
          <section className="mb-6">
            <h2 className="font-semibold text-lg mb-4">Worker Details</h2>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium">Worker Name :</label>
              <input
                disabled
                value={order.worker?.name || "N/A"}
                className="col-span-1 px-4 py-2 rounded-lg bg-[#e4e5eb] border border-[#001580]"
              />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium">Email/Phone Number :</label>
              <input
                disabled
               value={order.worker?.contact || "N/A"}
                className="col-span-1 px-4 py-2 rounded-lg bg-[#e4e5eb] border border-[#001580]"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <label className="col-span-1 font-medium">Address :</label>
              <textarea
                disabled
                value={order.worker?.address || "N/A"}
                className="col-span-1 px-4 py-3 rounded-lg bg-[#e4e5eb] border border-[#001580] min-h-[80px]"
              />
            </div>
          </section>

          <hr className="my-6 w-8/12" />

          {/* Product Table */}
          <section className="mb-6">
            <h2 className="font-semibold text-lg mb-4">Product List</h2>
            <div className="w-full max-w-[600px] border border-gray-400 rounded-md overflow-hidden">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-[#0D2E28] font-semibold text-[13px] border-b border-gray-400">
                    <th className="border-r border-gray-300 py-2 px-2 text-center">#</th>
                    <th className="border-r border-gray-300 py-2 px-2 text-left">Products</th>
                    <th className="border-r border-gray-300 py-2 px-2 text-center">Price</th>
                    <th className="border-r border-gray-300 py-2 px-2 text-center">Qty</th>
                    <th className="py-2 px-2 text-center">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products?.length > 0 ? (
                    order.products.map((prod, i) => (
                      <tr key={i} className="border-b border-gray-300 text-[#0D2E28] font-medium">
                        <td className="py-2 px-2 text-center">{i + 1}</td>
                        <td className="py-2 px-2 text-left">{prod.productName || "N/A"}</td>
                        <td className="py-2 px-2 text-center">₹{prod.priceAtPurchase || 0}</td>
                        <td className="py-2 px-2 text-center">{prod.quantity || 0}</td>
                        <td className="py-2 px-2 text-center">
                          ₹{(prod.priceAtPurchase || 0) * (prod.quantity || 0)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-gray-500 py-3">
                        No products found
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 text-[#0D2E28] font-semibold border-t border-gray-400">
                    <td colSpan="4" className="py-2 px-2 text-right pr-4">
                      Final Amount
                    </td>
                    <td className="py-2 px-2 text-center font-bold">
                      ₹{order.finalAmount || 0}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProgressOrder;
