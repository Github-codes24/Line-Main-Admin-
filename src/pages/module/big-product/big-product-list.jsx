import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";

const productData = [
  {
    id: 1,
    name: "PVC Wire Cable (Red Colour)",
    category: "Electrician",
    price: "₹499",
    status: "Add By Admin",
  },
  {
    id: 2,
    name: "Havells 9W LED Bulb",
    category: "Electrician",
    price: "₹499",
    status: "Pending",
  },
  {
    id: 3,
    name: "UPVC Plumbing Pipe (Schedule - 40) - 40m…",
    category: "Plumber",
    price: "₹499",
    status: "Approved",
  },
  {
    id: 4,
    name: "Asian Paints Ultima Weather Proof Exterior…",
    category: "Painter",
    price: "₹499",
    status: "Approved",
  },
  {
    id: 5,
    name: "UXCELL Plush Sleeve Cover Wall Paint Paintin…",
    category: "Painter",
    price: "₹499",
    status: "Add By Admin",
  },
];

const statusColor = {
  "Add By Admin": "text-green-500",
  Approved: "text-green-500",
  Pending: "text-yellow-500",
};

export default function BigProductList() {
  return (
    <div className="p-4">
      {/* <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Big Product List</h2>
        <Button className="bg-teal-600 text-white">+ Add New Product</Button>
      </div> */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold">Big Product List</h2>

        <div className="relative w-full max-w-xs flex-grow md:flex-grow-0">
          <input
            type="text"
            placeholder="Search by product name"
            className="w-full pl-10 pr-4 text-black placeholder-black py-1 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
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

        <Button className="bg-teal-600 text-white">+ Add New Product</Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {["Electrician", "Plumber", "Painter"].map((filter) => (
          <span key={filter} className="px-3 py-1 bg-gray-200 rounded-full">
            {filter} ✕
          </span>
        ))}
        <Button className="ml-auto border bg-teal-100 border-teal-600 text-teal-700">
          Reset Filter
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Sr.No.</th>
              <th className="p-3">Product Image</th>
              <th className="p-3">Product Name</th>
              <th className="p-3">Product Category</th>
              <th className="p-3">Product Price</th>
              <th className="p-3">Approval Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((product, idx) => (
              <tr key={product.id} className="border-t">
                <td className="p-3">{idx + 1}</td>
                <td className="p-3">
                  <img
                    src="C:\line_main\Line-Main-Admin-\public\PVC.png"
                    alt="Product"
                    className="w-12 h-12 rounded"
                  />
                </td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">{product.price}</td>
                <td className={`p-3 ${statusColor[product.status]}`}>
                  {product.status}
                </td>
                <td className="p-3 space-x-2">
                  <button>
                    <Eye className="text-orange-500" size={18} />
                  </button>
                  <button>
                    <Pencil className="text-orange-500" size={18} />
                  </button>
                  <button>
                    <Trash2 className="text-orange-500" size={18} />
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
