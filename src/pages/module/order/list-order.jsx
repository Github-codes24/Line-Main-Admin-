// src/pages/module/order/list-order.jsx
import React from "react";
import { Eye } from "lucide-react";
import { Button } from "../../../components/ui/button";

const orderData = [
  {
    id: 1,
    orderId: "ORD84681",
    customer: "Freida Varnes",
    service: "Electrician",
    status: "Pending",
  },
  {
    id: 2,
    orderId: "ORD846812",
    customer: "Hannah Burress",
    service: "Plumber",
    status: "Work In Progress",
  },
  {
    id: 3,
    orderId: "ORD846813",
    customer: "Leatrice Handler",
    service: "Tiler",
    status: "Work In Progress",
  },
  {
    id: 4,
    orderId: "ORD846814",
    customer: "Krishna Barbe",
    service: "Painter",
    status: "Completed",
  },
  {
    id: 5,
    orderId: "ORD846815",
    customer: "Marx Hershey",
    service: "AC & Refrigerator Mechanic",
    status: "Rejected",
  },
];

const statusColor = {
  Pending: "text-yellow-500",
  "Work In Progress": "text-blue-500",
  Completed: "text-green-500",
  Rejected: "text-red-500",
};

export default function ListOrder() {
  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-4">
        {/* Left: Title */}
        <h2 className="text-3xl font-bold">Order List</h2>
        {/* Center: Search Bar */}
        <div className="relative w-full max-w-md mx-6">
          <input
            type="text"
            placeholder="Search by Order Id..."
            className="w-full pl-10 placeholder-black text-black pr-4 py-1 border rounded-full outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </div>
        {/* Right (optional): Add Button or blank spacer */}
        <div className="w-32" /> {/* Spacer to balance layout (optional) */}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {["Electrician", "Plumber", "All"].map((filter) => (
          <span key={filter} className="px-3 py-1 bg-gray-200 rounded-full">
            {filter} ✕
          </span>
        ))}
        <Button className="ml-auto border border-teal-600 text-teal-700 bg-white">
          Reset Filter
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Sr.No.</th>
              <th className="p-3">Order Id.</th>
              <th className="p-3">Customer Name</th>
              <th className="p-3">Service Booked</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((order, idx) => (
              <tr key={order.id} className="border-t">
                <td className="p-3">{idx + 1}</td>
                <td className="p-3">{order.orderId}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.service}</td>
                <td className={`p-3 font-medium ${statusColor[order.status]}`}>
                  {order.status}
                </td>
                <td className="p-3">
                  <button>
                    <Eye className="text-red-600" size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm">Showing 1 to 5 of 5 Entries</span>
        <div className="space-x-1">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`px-2 py-1 rounded-full ${
                page === 1 ? "bg-teal-600 text-white" : "bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
