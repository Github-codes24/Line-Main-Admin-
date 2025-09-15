import React, { useState, useMemo } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const shopData = [
  { id: 1, shopName: "Surge Solutions", ownerName: "Emma", contact: "+91-9876543210", email: "", address: "3517 W. Gray St. Utica, Pennsylvania 57867", status: "Active" },
  { id: 2, shopName: "Master Plumbers", ownerName: "Alan", contact: "", email: "example@mail.com", address: "2972 Westheimer Rd. Santa Ana, Illinois 85486", status: "Active" },
  { id: 3, shopName: "Tile Ventures", ownerName: "Steve", contact: "+91-9876543210", email: "", address: "2715 Ash Dr. San Jose, South Dakota 83475", status: "Active" },
  { id: 4, shopName: "Brush Masters", ownerName: "Lauren", contact: "", email: "example@mail.com", address: "3517 W. Gray St. Utica, Pennsylvania 57867", status: "Active" },
  { id: 5, shopName: "Frost Fix AC", ownerName: "Caroline", contact: "", email: "example@mail.com", address: "6391 Elgin St. Celina, Delaware 10299", status: "Inactive" },
  { id: 6, shopName: "Sunrise Electricals", ownerName: "John", contact: "+91-9876543211", email: "", address: "123 Main St, NY", status: "Active" },
  { id: 7, shopName: "Paint Co", ownerName: "Julia", contact: "+91-9876543212", email: "", address: "789 Paint St, CA", status: "Active" },
];

export default function ShopListPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = useMemo(() => {
    return shopData.filter(
      (shop) =>
        shop.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedData = useMemo(() => {
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, startIndex]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex bg-[#E0E9E9] font-medium min-h-screen font-[Poppins]">
      <div className="flex-1 p-4 gap-4 h-[830px] w-[1108px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-white px-6 py-3 rounded-lg shadow">
          <h1 className="text-xl font-medium text-[#0D2E28]">Shop List</h1>

          {/* Search */}
          <div className="relative w-full max-w-sm flex-grow md:flex-grow-0">
            <input
              type="text"
              placeholder="Search by Name, Phone Number, Email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 bg-[#E4E5EB] text-[#001580] font-medium placeholder-[#333333] py-1.5 border-2 border-[#001580] rounded-full focus:outline-none"
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
            onClick={() => navigate("/admin/shopmanagement/add")}
            className="w-[200px] bg-[#001580] text-white px-6 rounded-lg h-10 mr-2"
          >
            + Add New Shop
          </button>
        </div>

        {/* Table */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="border border-[#616666] rounded-lg shadow-sm w-[1076ps] h-[742px] overflow-y-auto overflow-x-auto">
            <table className="w-full text-left bg-white">
              <thead>
                <tr className="bg-[#E4E5EB] text-[#0D2E28] text-[16px] font-medium">
                  <th className="w-[80px] px-4 py-4 border-b text-center">Sr.No</th>
                  <th className="w-[200px] px-4 py-4 border-b text-center">Shop Name</th>
                  <th className="w-[180px] px-4 py-4 border-b text-center">Owner Name</th>
                  <th className="w-[220px] px-4 py-4 border-b text-center">Email / Phone</th>
                  <th className="w-[300px] px-4 py-4 border-b text-center">Shop Address</th>
                  <th className="w-[100px] px-4 py-4 border-b text-center">Status</th>
                  <th className="w-[140px] px-4 py-4 border-b text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((shop, index) => (
                    <tr
                      key={shop.id}
                      className="text-center text-[#0D2E28] text-[16px] border-b mb-3 h-16"
                    >
                      <td className="px-4">{startIndex + index + 1}</td>
                      <td className="px-4">{shop.shopName}</td>
                      <td className="px-4">{shop.ownerName}</td>
                      <td className="px-4">{shop.contact || shop.email || "-"}</td>
                      <td className="px-4 text-left">{shop.address}</td>
                      <td
                        className={`px-4 font-semibold ${
                          shop.status === "Active" ? "text-[#34C759]" : "text-[#FF383C]"
                        }`}
                      >
                        {shop.status}
                      </td>
                      <td className="flex flex-row w-[140px] h-[48px] border-b pr-4 pl-4 gap-4 items-center justify-center">
                        <Eye
                          size={18}
                          className="cursor-pointer text-red-600 hover:text-blue-800"
                          onClick={() =>
                            navigate(`/admin/shopmanagement/view/${shop.id}`, { state: { shop } })
                          }
                        />
                        <button
                          onClick={() =>
                            navigate(`/admin/shopmanagement/edit/${shop.id}`, { state: { shop } })
                          }
                        >
                          <Edit className="w-5 h-5 text-red-600 hover:text-blue-800" />
                        </button>
                        <button
                          onClick={() => alert(`Delete not implemented for ${shop.shopName}`)}
                        >
                          <Trash2 className="w-5 h-5 text-red-600 hover:text-blue-800" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center p-6 text-[#0D2E28]">
                      No shops found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredData.length > itemsPerPage && (
            <div className="flex justify-between items-center mt-4 bg-[#F5F5F5] rounded-lg py-2 px-4">
              <span className="text-sm font-semibold text-[#0D2E28]">
                Showing {startIndex + 1} to {startIndex + paginatedData.length} of {filteredData.length} Entries
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`w-8 h-8 flex items-center justify-center rounded-xl ${
                    currentPage === 1 ? "bg-gray-200 text-[#001580]" : "bg-white hover:bg-gray-100"
                  }`}
                >
                  &lt;
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (page < currentPage - 1 || page > currentPage + 1) return null;
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
                    currentPage === totalPages ? "bg-gray-200 text-[#001580]" : "bg-white hover:bg-gray-100"
                  }`}
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
