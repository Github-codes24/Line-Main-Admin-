
import React from "react";
import { Eye,Search } from "lucide-react";

const PaymentList = () => {
  const data = [
    {
      id: 1,
      transactionId: "TRN64486644FHD6",
      orderId: "OD54845478",
      amount: -5894,
      mode: "Online",
      remarks: "Amount Refunded To Worker’s Wallet",
    },
    {
      id: 2,
      transactionId: "TRN64486644FHD6",
      orderId: "OD54845478",
      amount: 5894,
      mode: "Wallet",
      remarks: "Amount Deducted From Worker’s Wallet",
    },
    {
      id: 3,
      transactionId: "TRN64486644FHD6",
      orderId: "OD54845478",
      amount: -5894,
      mode: "Online",
      remarks: "Amount Refunded To Customer Account",
    },
    {
      id: 4,
      transactionId: "TRN64486644FHD6",
      orderId: "OD54845478",
      amount: 225894,
      mode: "Online",
      remarks: "Payment Received From Customer",
    },
    {
      id: 5,
      transactionId: "TRN64486644FHD6",
      orderId: "OD54845478",
      amount: 5894,
      mode: "Online",
      remarks: "Payment Received From Customer",
    },
  ];

  return (
    <div className="">
      {/* Section 1: Title + Search */}
<div className="bg-gray-100 p-3 rounded-lg shadow">
  <div className="flex items-center justify-between flex-wrap gap-4 w-full">
    {/* Left: Payment List */}
    <h2 className="text-xl font-semibold">Payment List</h2>

    {/* Centered: Search Box */}
   <div className="flex-1 flex justify-center">
  <div className="relative w-full max-w-md">
    <input
      type="text"
      placeholder="Search by Transaction Id..."
      className="w-full rounded-full border border-green-500 px-4 py-2 pl-10 focus:outline-none focus:ring focus:border-blue-300"
    />
    <Search
      size={18}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600"
    />
  </div>
</div>

  </div>
</div>




      {/* Section 2: Table */}
      <div className="bg-gray-100 p-6 rounded-lg shadow">
        <div className="overflow-x-auto border border-black rounded-lg">
          <table className="min-w-full text-sm border-collapse  mb-20">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className=" px-4 py-6">Sr.No.</th>
                <th className=" px-4 py-6">Transaction ID</th>
                <th className=" px-4 py-6">Order ID</th>
                <th className=" px-4 py-6">Amount</th>
                <th className=" px-4 py-6">Transaction Mode</th>
                <th className=" px-4 py-6">Remarks</th>
                <th className=" px-4 py-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td className=" text-center px-2 py-5">{index + 1}</td>
                  <td className=" text-center px-2 py-5">{item.transactionId}</td>
                  <td className=" text-center px-2 py-5">{item.orderId}</td>
                  <td
                    className={` text-center px-2 py-5 font-semibold ${
                      item.amount < 0 ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {item.amount < 0 ? `-₹${Math.abs(item.amount)}` : `+₹${item.amount}`}
                  </td>
                  <td className=" text-center px-2 py-5">{item.mode}</td>
                  <td className=" text-center px-2 py-5">{item.remarks}</td>
                  <td className=" text-center px-10 py-5 text-red-500 cursor-pointer">
                    <Eye size={18} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
     <div className="flex flex-col md:flex-row items-center justify-between bg-gray-200 mt-5 rounded-lg shadow text-sm text-gray-700 gap-4 py-4 px-6">
  {/* Left: Entry Info */}
  <p className="font-bold text-black">Showing 1 to 5 of 5 Entries</p>

  {/* Right: Pagination */}
  <div className="flex items-center space-x-2">
    {/* Left Arrow */}
    <button className="px-2 py-1 bg-white text-green-600 border border-green-300 rounded-md hover:bg-green-50">
      &lt;
    </button>

    {/* Page Numbers */}
    {[1, 2, 3, 4].map((pg) => {
      const isActive = pg === 1; // Active page
      return (
        <button
          key={pg}
          className={`w-8 h-8 border text-sm font-medium rounded-md transition
            ${isActive
              ? "bg-green-700 text-white"
              : "bg-green-200 text-green-900 hover:bg-green-300"}
          `}
        >
          {pg}
        </button>
      );
    })}

    {/* Right Arrow */}
    <button className="px-2 py-1 bg-white text-green-600 border border-green-300 rounded-md hover:bg-green-50">
      &gt;
    </button>
  </div>
</div>

      </div>
    </div>
  );
};

export default PaymentList;
