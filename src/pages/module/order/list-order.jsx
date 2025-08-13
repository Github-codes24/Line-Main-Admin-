import React, { useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);

  const allServices = [
    "Electrician",
    "Plumber",
    "Painter",
    "Tiler",
    "AC & Refrigerator Mechanic",
  ];

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Add service as filter only if exact match
    const matched = allServices.find(
      (s) => s.toLowerCase() === term.toLowerCase()
    );

    if (matched && !activeFilters.includes(matched)) {
      setActiveFilters([...activeFilters, matched]);
      setSearchTerm(""); // clear search input
    }
  };

  const removeFilter = (filter) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  const resetFilters = () => {
    setActiveFilters([]);
    setSearchTerm("");
  };

  const filteredData =
    activeFilters.length === 0
      ? orderData
      : orderData.filter((order) => activeFilters.includes(order.service));

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold">Order List</h2>

        {/* Search Bar */}
        <div className="relative w-full max-w-md mx-6">
          <input
            type="text"
            placeholder="Search by Service Name..."
            value={searchTerm}
            onChange={handleSearch}
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

        <div className="w-32" />
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M0 10C0 4.47715 4.47715 0 10 0H30C35.5228 0 40 4.47715 40 10V30C40 35.5228 35.5228 40 30 40H10C4.47715 40 0 35.5228 0 30V10Z"
            fill="#E0E9E9"
          />
          <path
            d="M16.8571 20.506C14.3701 18.646 12.5961 16.6 11.6271 15.45C11.3271 15.094 11.2291 14.833 11.1701 14.374C10.9681 12.802 10.8671 12.016 11.3281 11.508C11.7891 11 12.6041 11 14.2341 11H25.7661C27.3961 11 28.2111 11 28.6721 11.507C29.1331 12.015 29.0321 12.801 28.8301 14.373C28.7701 14.832 28.6721 15.093 28.3731 15.449C27.4031 16.601 25.6261 18.651 23.1331 20.514C23.0178 20.6037 22.9225 20.7165 22.8533 20.8451C22.7841 20.9737 22.7425 21.1154 22.7311 21.261C22.4841 23.992 22.2561 25.488 22.1141 26.244C21.8851 27.466 20.1541 28.201 19.2261 28.856C18.6741 29.246 18.0041 28.782 17.9331 28.178C17.6676 25.8765 17.4429 23.5705 17.2591 21.261C17.2488 21.114 17.2077 20.9708 17.1385 20.8407C17.0692 20.7106 16.9733 20.5966 16.8571 20.506Z"
            stroke="#0D2E28"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {activeFilters.map((filter) => (
          <span
            key={filter}
            className="px-3 py-1 bg-gray-200 rounded-full flex items-center gap-1"
          >
            {filter}
            <button
              onClick={() => removeFilter(filter)}
              className="text-gray-600"
            >
              ✕
            </button>
          </span>
        ))}

        <Button
          onClick={resetFilters}
          className="ml-auto border border-teal-600 text-teal-800 bg-white"
        >
          Reset Filter
        </Button>
      </div>

      {/* Table */}
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
            {filteredData.map((order, idx) => (
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

      {/* Pagination Footer */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm">
          Showing {filteredData.length} of {orderData.length} Entries
        </span>
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
