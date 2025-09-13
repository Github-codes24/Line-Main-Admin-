import React, { useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";

const shopData = [
  {
    id: 1,
    shopName: "Surge Solutions",
    ownerName: "Emma",
    contact: "+91-9876543210",
    email: "",
    address: "3517 W. Gray St. Utica, Pennsylvania 57867",
    status: "Active",
  },
  {
    id: 2,
    shopName: "Master Plumbers",
    ownerName: "Alan",
    contact: "",
    email: "example@mail.com",
    address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
    status: "Active",
  },
  {
    id: 3,
    shopName: "Tile Ventures",
    ownerName: "Steve",
    contact: "+91-9876543210",
    email: "",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    status: "Active",
  },
  {
    id: 4,
    shopName: "Brush Masters",
    ownerName: "Lauren",
    contact: "",
    email: "example@mail.com",
    address: "3517 W. Gray St. Utica, Pennsylvania 57867",
    status: "Active",
  },
  {
    id: 5,
    shopName: "Frost Fix AC",
    ownerName: "Caroline",
    contact: "",
    email: "example@mail.com",
    address: "6391 Elgin St. Celina, Delaware 10299",
    status: "Inactive",
  },
  {
    id: 6,
    shopName: "Sunrise Electricals",
    ownerName: "John",
    contact: "+91-9876543211",
    email: "",
    address: "123 Main St, NY",
    status: "Active",
  },
  {
    id: 7,
    shopName: "Paint Co",
    ownerName: "Julia",
    contact: "+91-9876543212",
    email: "",
    address: "789 Paint St, CA",
    status: "Active",
  },
  {
    id: 8,
    shopName: "Cooling Pros",
    ownerName: "Daniel",
    contact: "",
    email: "cooling@example.com",
    address: "777 Chill Rd, TX",
    status: "Active",
  },
];

export default function ShopListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Define custom items per page (first page 5, second 3)
  const itemsPerPageList = [5, 3];

  const handleAdd = () => {
    alert("Redirect to Add New Tab page");
  };

  const filteredData = shopData.filter((shop) =>
    shop.shopName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(
    filteredData.length / itemsPerPageList[0]
  ) > 1
    ? 2
    : 1;

  const getPageData = () => {
    if (currentPage === 1) {
      return filteredData.slice(0, itemsPerPageList[0]);
    } else {
      return filteredData.slice(itemsPerPageList[0]);
    }
  };

  const paginatedData = getPageData();

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex bg-[#E0E9E9] font-medium min-h-screen font-[Poppins]">
      <div className="flex-1 p-4 gap-2">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-white px-4 py-3 rounded-lg shadow">
          <h1 className="text-xl font-medium text-[#0D2E28]">Shop List</h1>

          {/* Search */}
          <div className="relative w-full max-w-sm flex-grow md:flex-grow-0">
            <input
              type="text"
              placeholder="Search by Shop Name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 bg-[#E4E5EB] text-[#001580] font-medium placeholder-[#333333] py-2 border-2 border-[#001580] rounded-full focus:outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#333333]"
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

          {/* Add button */}
          <button
            onClick={handleAdd}
            className="w-[200px] bg-[#001580] text-white px-6 rounded-lg h-10 mr-2"
          >
            + Add New Tab
          </button>
        </div>

        {/* Table */}
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="border border-[#616666] rounded-lg shadow-sm h-screen overflow-x-auto"></div>
          <table className="w-full text-left bg-white p-4">
            <thead className="bg-gray-100">
              <tr className="text-left text-sm text-[#0D2E28]">
                <th className="p-3">Sr.No</th>
                <th className="p-3">Shop Name</th>
                <th className="p-3">Owner Name</th>
                <th className="p-3">Email ID / Phone Number</th>
                <th className="p-3">Shop Address</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-[#0D2E28]">
                    No shops found.
                  </td>
                </tr>
              ) : (
                paginatedData.map((shop, index) => (
                  <tr key={shop.id} className="border-b hover:bg-gray-50 text-sm">
                    <td className="p-3 text-center">
                      {(currentPage - 1) * itemsPerPageList[0] + index + 1}
                    </td>
                    <td className="p-3">{shop.shopName}</td>
                    <td className="p-3">{shop.ownerName}</td>
                    <td className="p-3">{shop.contact || shop.email || "-"}</td>
                    <td className="p-3">{shop.address}</td>
                    <td
                      className={`p-3 font-medium ${
                        shop.status === "Active" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {shop.status}
                    </td>
                    <td className="p-3 flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye size={18} />
                      </button>
                      <button className="text-orange-500 hover:text-orange-700">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredData.length > itemsPerPageList[0] && (
          <div className="flex justify-between items-center mt-4 bg-[#F5F5F5] rounded-lg py-2 px-4">
            <span className="text-sm font-semibold">
              Showing {(currentPage === 1 ? 1 : itemsPerPageList[0] + 1)} to{" "}
              {currentPage === 1
                ? paginatedData.length
                : itemsPerPageList[0] + paginatedData.length}{" "}
              of {filteredData.length} Entries
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`w-8 h-8 flex items-center justify-center rounded-xl ${
                  currentPage === 1
                    ? "bg-gray-200 text-[#001580]"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                &lt;
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-xl font-semibold ${
                      page === currentPage
                        ? "bg-[#001580] text-white"
                        : "bg-[#CECEF2] text-[#001580] hover:bg-[#CECEF2]"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`w-8 h-8 flex items-center justify-center rounded-xl ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-[#001580]"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
