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
    // return <p className="text-center text-lg mt-10">Loading...</p>;
   
     return <div className="flex items-center justify-center h-full w-full">
  <svg
    className="animate-spin h-10 w-10 text-[#001580]"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-100"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="60"
      strokeDashoffset="20"
    ></circle>
  </svg>
</div>
  }

  if (!order) {
    return <p className="text-center text-lg mt-10 text-red-500">Order not found</p>;
  }

  return (
    // <div className="p-2 font-[Poppins]">
    <div className="w-full min-h-screen font-[Poppins] ">
    {/* <div className="w-full p-2 font-[Poppins]"> */}
      {/* Header */}
      {/* <div className="flex items-center gap-4 mb-4 bg-white p-4 rounded-lg border shadow"> */}
       <div className="flex items-center gap-4 mb-4 bg-white p-4 rounded-lg border shadow w-full">
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
        <h1 className="text-xl font-semibold text-[#0D2E28]">View Order</h1>
      </div>

      {/* Main Content */}
      {/* <div className="bg-white p-4 rounded-lg border shadow-sm"> */}
       <div className="bg-white p-4 rounded-lg border shadow-sm w-full">
        <div className="border border-[#616666] p-4 rounded-lg h-screen overflow-y-auto hide-scrollbar">
          {/* Order Number */}
          <div className="grid grid-cols-4 gap-4 mb-2 mt-4 ml-10">
            <label className="col-span-1 text-[#0D2E28] font-bold">Order Number :</label>
            <input
              disabled
              value={order.orderId || ""}
              className="col-span-1 px-4 py-2 font-bold text-black rounded-lg bg-[#e3e5eb] border border-[#001580] "
            />
          </div>

          {/* Customer Details */}
          <div className="mb-6 ml-10">
            <h2 className="font-semibold text-lg mb-4 text-[#0D2E28]">Customer Details</h2>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium text-[#0D2E28]">Customer Name :</label>
              <input
                disabled
                value={order.customer?.name || "N/A"}
                className="col-span-1 px-4 py-2 rounded-lg bg-[#e3e5eb] border border-[#001580]"
              />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium text-[#0D2E28]">Email/Phone Number :</label>
              <input
                disabled
                value={order.customer?.contact || ""}
                className="col-span-1 px-4 py-2 rounded-lg bg-[#e3e5eb] border border-[#001580]"
              />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-2">
  <label className="col-span-1 font-medium text-[#0D2E28]">Address :</label>
  <textarea
    disabled
    value={order.deliveryAddress?.fullAddress || "N/A"}
    className="col-span-1 px-4 py-2 rounded-lg bg-[#e3e5eb] border border-[#001580] h-24"
  />
</div>
          </div>

          {/* <hr className="my-6 w-8/12" /> */}
          {/* <hr className="my-6 w-8/12 border-1 border-black" /> */}
          <hr className="my-6 col-span-2 border-1 border-black ml-10" />



          {/* Service Details */} 
           <div className="mb-6 ml-10">
            <h2 className="font-semibold text-lg mb-4 text-[#0D2E28]">Service Details</h2>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium text-[#0D2E28]">Service Required :</label>
              <input
                disabled
                value={order.specificServiceName || ""}
                className="col-span-1 px-4 py-2 rounded-lg bg-[#e3e5eb] border border-[#001580]"
              />
            </div>
         



            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium text-[#0D2E28]">Date :</label>
              <input
                disabled
                value={
                  order.serviceDate
                    ? new Date(order.serviceDate).toLocaleDateString()
                    : ""
                }
                className="col-span-1 px-4 py-2 rounded-lg bg-[#e3e5eb] border border-[#001580]"
              />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <label className="col-span-1 font-medium text-[#0D2E28]">Photos :</label>
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
            {/* Products Table - Updated to match image exactly */}
            <div className="grid grid-cols-4 gap-4 mb-2 items-start">
              <label className="col-span-1 font-medium text-[#0D2E28]">Product List :</label>
              <div className="col-span-1">
                <table className="w-full border border-black " style={{ borderSpacing: 0 }}>
                  <thead>
                    <tr className="border-b border-black">
                      <th className=" border-black px-3 py-2 text-[#0D2E28] font-medium text-[11px] text-center bg-white" style={{ width: '30px' }}>#</th>
                      <th className=" border-black px-3 py-2 text-[#0D2E28] font-medium text-[11px] text-left bg-white" style={{ width: 'auto' }}>Products</th>
                      <th className=" border-black px-3 py-2 text-[#0D2E28] font-medium text-[11px] text-center bg-white" style={{ width: '60px' }}>Price</th>
                      <th className=" border-black px-3 py-2 text-[#0D2E28] font-medium text-[11px] text-center bg-white" style={{ width: '40px' }}>Qty</th>
                      <th className="px-3 py-2 text-[#0D2E28] font-medium text-[11px] text-center bg-white" style={{ width: '70px' }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products?.length > 0 ? (
                      order.products.map((prod, idx) => (
                        <tr key={prod._id || idx}>
                          <td className=" border-black px-4 py-1 text-[#0D2E28] text-[11px] text-center bg-white">{idx + 1}</td>
                          <td className=" border-black px-4 py-1 text-[#0D2E28] text-[11px] text-left bg-white">{prod.productName || "N/A"}</td>
                          <td className=" border-black px-4 py-1 text-[#0D2E28] text-[11px] text-center bg-white">{prod.priceAtPurchase || 0}</td>
                          <td className=" border-black px-4 py-1 text-[#0D2E28] text-[11px] text-center bg-white">{prod.quantity || 0}</td>
                          <td className="px-3 py-2 text-[#0D2E28] text-[11px] text-center bg-white">{(prod.priceAtPurchase || 0) * (prod.quantity || 0)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-3 py-3 text-gray-500 text-[11px] text-center bg-white">No products found</td>
                      </tr>
                    )}
                    <tr className="border-t border-black">
                      <td colSpan="4" className="border-r border-black px-3 py-2 text-[#0D2E28] font-medium text-[11px] text-left bg-white">Final Amount</td>
                      <td className="px-3 py-2 text-[#0D2E28] font-medium text-[11px] text-center bg-white">{order?.finalAmount || 0}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>


          {/* <hr className="my-6 w-8/12" /> */}
           <hr className="my-6 col-span-2 border-1 border-black ml-10" />

          {/* Payment Details */}
          <div className="mb-6 ml-10">
            <h2 className="font-semibold text-lg mb-4 text-[#0D2E28]">Payment Details</h2>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium text-[#0D2E28]">Total Bill :</label>
              <input
                disabled
                value={order.finalAmount || ""}
                className="col-span-1 px-4 py-2 rounded-lg bg-[#e3e5eb] border border-[#001580]"
              />
            </div>

            {/* If API provides these fields later, show them */}
            {order.paymentMethod && (
              <div className="grid grid-cols-4 gap-4 mb-2">
                <label className="col-span-1 font-medium">Payment Method :</label>
                <input
                  disabled
                  value={order.paymentMethod}
                  className="col-span-1 px-4 py-2 rounded-lg bg-[#e3e5eb] border border-[#001580]"
                />
              </div>
            )}

            {order.transactionId && (
              <div className="grid grid-cols-4 gap-4 mb-2">
                <label className="col-span-1 font-medium">Transaction ID :</label>
                <input
                  disabled
                  value={order.transactionId}
                  className="col-span-1 px-4 py-2 rounded-lg bg-[#e3e5eb] border border-[#001580]"
                />
              </div>
            )}

            <div className="grid grid-cols-4 gap-4">
              <label className="col-span-1 font-medium text-[#0D2E28]">Order Status :</label>
              <input
                disabled
                value={order.orderStatus || ""}
                className={`col-span-1 px-4 py-2 rounded-lg bg-[#e3e5eb] border border-[#001580] ${order.orderStatus === "Pending"
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
