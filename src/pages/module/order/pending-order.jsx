import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import rectangle from "../../../assets/images/Rectangle.png";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const PendingOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // orderId from route
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchData] = useFetch();

  // Fetch order details
  const getOrderDetails = async () => {
    try {
      const result = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/admin/order/${id}`,
      });

      if (result && result.success) {
        setOrder(result.data);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center text-lg mt-10">Loading...</p>;
  }

  if (!order) {
    return <p className="text-center text-lg mt-10 text-red-500">Order not found</p>;
  }

  return (
    <div className="p-2 font-[Poppins]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4 bg-white p-4 rounded-lg border shadow">
        <button
          onClick={() => navigate(-1)}
          className="text-xl text-black hover:text-gray-600"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.9997 36.6673C29.2044 36.6673 36.6663 29.2054 36.6663 20.0007C36.6663 10.7959 29.2044 3.33398 19.9997 3.33398C10.7949 3.33398 3.33301 10.7959 3.33301 20.0007C3.33301 29.2054 10.7949 36.6673 19.9997 36.6673Z"
              stroke="#0D2E28"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.9997 13.334L13.333 20.0007L19.9997 26.6673"
              stroke="#0D2E28"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26.6663 20H13.333"
              stroke="#0D2E28"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-xl font-semibold">View Order</h1>
      </div>

      {/* Main Content */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="border border-[#616666] p-4 rounded-lg h-screen overflow-y-auto hide-scrollbar">
          {/* Order Number */}
          <div className="grid grid-cols-4 gap-4 mb-2 mt-4 ml-10">
            <label className="col-span-1 text-black font-bold">Order Number :</label>
            <input
              disabled
              value={order.orderId || ""}
              className="col-span-1 px-4 py-2 font-bold text-black rounded-lg bg-[#CED4F2] border border-[#001580]"
            />
          </div>

          {/* Customer Details */}
          <div className="mb-6 ml-10">
            <h2 className="font-semibold text-lg mb-4">Customer Details</h2>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium">Customer Name :</label>
              <input
                disabled
                value={order.customer?.name || "N/A"}
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
              />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium">Email/Phone Number :</label>
              <input
                disabled
                value={order.customer?.contact || ""}
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <label className="col-span-1 font-medium">Address :</label>
              <textarea
                disabled
                value={order.deliveryAddress?.fullAddress || ""}
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
              />
            </div>
          </div>

          <hr className="my-6 w-8/12" />

          {/* Service Details */}
          <div className="mb-6 ml-10">
            <h2 className="font-semibold text-lg mb-4">Service Details</h2>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium">Service Required :</label>
              <input
                disabled
                value={order.specificServiceName || ""}
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
              />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium">Date :</label>
              <input
                disabled
                value={
                  order.serviceDate
                    ? new Date(order.serviceDate).toLocaleDateString()
                    : ""
                }
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
              />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <label className="col-span-1 font-medium">Photos :</label>
              <div className="col-span-2 flex gap-2">
                {order.initialRequestImages && order.initialRequestImages.length > 0 ? (
                  order.initialRequestImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="uploaded"
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  ))
                ) : (
                  <img
                    src={rectangle}
                    alt="placeholder"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                )}
              </div>
            </div>
            {/* Products Table */}
            <div className="w-full max-w-[500px] border border-[#616666] rounded-md overflow-hidden">
              {/* Header Row */}
              <div className="w-full bg-gray-100 grid grid-cols-12 gap-1 items-center border-b border-[#0D2E28] text-[#0D2E28] font-medium text-[12px] py-2 px-2">
                <span className="col-span-1 text-center">#</span>
                <span className="col-span-5 text-left">Products</span>
                <span className="col-span-2 text-right">Price</span>
                <span className="col-span-2 text-center">Qty</span>
                <span className="col-span-2 text-right">Amount</span>
              </div>

              {/* Data Rows from API */}
              {order?.products && order.products.length > 0 ? (
                order.products.map((prod, idx) => (
                  <div
                    key={prod._id || idx}
                    className="w-full grid grid-cols-12 gap-1 items-center text-[#0D2E28] font-medium text-[12px] py-2 px-2 border-b border-gray-200 hover:bg-gray-50"
                  >
                    <span className="col-span-1 text-center">{idx + 1}</span>
                    <span className="col-span-5 text-left truncate" title={prod.productName}>
                      {prod.productName || 'N/A'}
                    </span>
                    <span className="col-span-2 text-right">₹{prod.priceAtPurchase || 0}</span>
                    <span className="col-span-2 text-center">{prod.quantity || 0}</span>
                    <span className="col-span-2 text-right">₹{(prod.priceAtPurchase || 0) * (prod.quantity || 0)}</span>
                  </div>
                ))
              ) : (
                <div className="w-full text-gray-500 text-[12px] p-4 text-center">
                  No products found
                </div>
              )}

              {/* Final Amount Row */}
              <div className="w-full bg-gray-50 grid grid-cols-12 gap-1 items-center border-t border-[#0D2E28] text-[#0D2E28] font-semibold text-[12px] py-2 px-2">
                <span className="col-span-10 text-left pr-2">Final Amount:</span>
                <span className="col-span-2 text-right font-bold">₹{order?.finalAmount || 0}</span>
              </div>
            </div>
          </div>


          <hr className="my-6 w-8/12" />

          {/* Payment Details */}
          <div className="mb-6 ml-10">
            <h2 className="font-semibold text-lg mb-4">Payment Details</h2>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium">Total Bill :</label>
              <input
                disabled
                value={order.finalAmount || ""}
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
              />
            </div>

            {/* If API provides these fields later, show them */}
            {order.paymentMethod && (
              <div className="grid grid-cols-4 gap-4 mb-2">
                <label className="col-span-1 font-medium">Payment Method :</label>
                <input
                  disabled
                  value={order.paymentMethod}
                  className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
                />
              </div>
            )}

            {order.transactionId && (
              <div className="grid grid-cols-4 gap-4 mb-2">
                <label className="col-span-1 font-medium">Transaction ID :</label>
                <input
                  disabled
                  value={order.transactionId}
                  className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
                />
              </div>
            )}

            <div className="grid grid-cols-4 gap-4">
              <label className="col-span-1 font-medium">Order Status :</label>
              <input
                disabled
                value={order.orderStatus || ""}
                className={`col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580] ${order.orderStatus === "Pending"
                  ? "text-yellow-500"
                  : order.orderStatus === "Completed"
                    ? "text-green-600"
                    : "text-red-600"
                  }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingOrder;
