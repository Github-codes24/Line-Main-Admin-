import React, { useState, useEffect } from "react";
import { Eye, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import pvc from "../../../assets/images/pvc.png";
import {
  Box,
  Chip,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Popover,
} from "@mui/material";
import { FilterIcon } from "../../../assets/CommonAssets";
import { IoClose } from "react-icons/io5";

const productData = [
  {
    id: 1,
    name: "PVC Wire Cable (Red Colour)",
    category: "Electrician",
    subCategory: "NA",
    price: "₹499",
    status: "Approved",
    image: pvc,
  },
  {
    id: 2,
    name: "Havells 9W LED Bulb",
    category: "Electrician",
    subCategory: "NA",
    price: "₹499",
    status: "Pending",
    image: pvc,
  },
  {
    id: 3,
    name: "UPVC Plumbing Pipe (Schedule - 40) - 40m…",
    category: "Plumber",
    subCategory: "Plumber",
    price: "₹499",
    status: "Approved",
    image: pvc,
  },
  {
    id: 4,
    name: "Asian Paints Ultima Weather Proof Exterior…",
    category: "Painter",
    subCategory: "Painter",
    price: "₹499",
    status: "Approved",
    image: pvc,
  },
  {
    id: 5,
    name: "UXCELL Plush Sleeve Cover Wall Paint Paintin…",
    category: "Painter",
    subCategory: "Painter",
    price: "₹499",
    status: "Add By Admin",
    image: pvc,
  },
  {
    id: 6,
    name: "Asian Paints Ultima Weather Proof Exterior…",
    category: "Painter",
    subCategory: "Painter",
    price: "₹499",
    status: "Approved",
    image: pvc,
  },
  {
    id: 7,
    name: "UXCELL Plush Sleeve Cover Wall Paint Paintin…",
    category: "Painter",
    subCategory: "Painter",
    price: "₹499",
    status: "Add By Admin",
    image: pvc,
  },
];

const statusColor = {
  "Add By Admin": "text-blue-500",
  Approved: "text-green-500",
  Pending: "text-yellow-500",
};

const categoryOptions = ["Electrician", "Plumber", "Painter"];

export default function BigProductList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleFilterClick = (event) => setAnchorEl(event.currentTarget);
  const handleFilterClose = () => setAnchorEl(null);

  const handleCheckboxChange = (option) => {
    setAppliedFilters((prev) =>
      prev.includes(option)
        ? prev.filter((f) => f !== option)
        : [...prev, option]
    );
  };

  const handleResetFilters = () => {
    setAppliedFilters([]);
    setSearchTerm("");
  };

  const filteredData = productData.filter((product) => {
    const matchesSearch =
      searchTerm.trim() === "" ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      appliedFilters.length === 0 || appliedFilters.includes(product.category);

    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    // whenever filters or search change, reset to page 1
    setCurrentPage(1);
  }, [appliedFilters, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <div className="p-2 font-[Poppins]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-white px-4 py-3 rounded-lg shadow">
        <h2 className="text-xl font-medium">Big Product List</h2>

        {/* Search input */}
        <div className="relative w-full max-w-xs flex-grow md:flex-grow-0">
          <input
            type="text"
            placeholder="Search by Product Name..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 bg-[#E4E5EB] text-[#001580] font-medium placeholder-[#333333] py-1 border-2 border-[#001580] rounded-full focus:outline-none"
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

        {/* Add New Product button */}
        <button
          onClick={() => navigate("/admin/bigproduct/add")}
          className="w-[200px] bg-[#001580] text-white font-medium px-4 py-2 rounded-lg"
        >
          + Add New Product
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="relative flex flex-wrap gap-2 items-center">
          {/* Filter Icon */}
          <div className="cursor-pointer" onClick={handleFilterClick}>
            <FilterIcon />
          </div>

          {/* Active Filter Tags */}
          {appliedFilters.map((filter) => (
            <span
              key={filter}
              className="px-3 py-1 bg-[#E4E5EB] text-[#0D2E28] font-medium rounded-full flex items-center gap-1"
            >
              {filter}
              <button
                onClick={() =>
                  setAppliedFilters((prev) => prev.filter((f) => f !== filter))
                }
                className="text-[#0D2E28] font-semibold ml-1"
              >
                <IoClose />
              </button>
            </span>
          ))}

          {appliedFilters.length > 0 && (
            <button
              onClick={handleResetFilters}
              className="w-[200px] ml-auto border border-[#001580] bg-[#CECEF2] text-[#001580] font-medium px-6 py-2 rounded-lg"
            >
              Reset Filter
            </button>
          )}
        </div>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleFilterClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Box sx={{ p: 4, minWidth: 240 }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Product Category
              </h3>
              <button
                onClick={handleFilterClose}
                className="text-gray-600 hover:text-gray-800 text-2xl"
              >
                <IoClose />
              </button>
            </div>
            <FormGroup>
              {categoryOptions.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={appliedFilters.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                    />
                  }
                  label={option}
                />
              ))}
            </FormGroup>
          </Box>
        </Popover>
      </div>

      {/* Table */}
      <div className="border border-[#616666] rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-[#E4E5EB] text-center text-[#333333] font-medium">
            <tr className="bg-[#E4E5EB]">
              <th className="w-20 h-20 px-4 py-4 border-b bg-[#E4E5EB] text-center align-middle font-[Poppins] font-medium text-[16px] leading-none text-[#0D2E28]">
                Sr.No.
              </th>
              <th className="w-[140px] h-20 px-4 py-4 border-b bg-[#E4E5EB] text-center align-middle font-[Poppins] font-medium text-[16px] leading-none text-[#0D2E28]">
                Product Image
              </th>
              <th className="w-[256px] h-20 px-4 py-4 border-b bg-[#E4E5EB] text-center align-middle font-[Poppins] font-medium text-[16px] leading-none text-[#0D2E28">
                Product Name
              </th>
              <th className="w-[160px] h-20 px-4 py-4 border-b bg-[#E4E5EB] text-center align-middle font-[Poppins] font-medium text-[16px] leading-none text-[#0D2E28]">
                Category
              </th>
              <th className="w-[160px] h-20 px-4 py-4 border-b bg-[#E4E5EB] text-center align-middle font-[Poppins] font-medium text-[16px] leading-none text-[#0D2E28]">
                Sub Category
              </th>
              <th className="w-[140px] h-20 px-4 py-4 border-b bg-[#E4E5EB] text-center align-middle font-[Poppins] font-medium text-[16px] leading-none text-[#0D2E28]">
                Price
              </th>
              <th className="w-[140px] h-20 px-4 py-4 border-b bg-[#E4E5EB] text-center align-middle font-[Poppins] font-medium text-[16px] leading-none text-[#0D2E28]">
                Status
              </th>
              <th className="w-[140px] h-20 px-4 py-4 border-b bg-[#E4E5EB] text-center align-middle font-[Poppins] font-medium text-[16px] leading-none text-[#0D2E28]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((product, idx) => (
              <tr key={product.id} className="text-center hover:bg-gray-50">
                {/* Sr.No */}
                <td className="p-3">{startIndex + idx + 1}</td>

                {/* Product Image */}
                <td className="p-3 flex justify-center">
                  <div className="w-36 h-20 p-4 border border-[#001580] rounded-lg flex items-center justify-center">
                    <img
                      src={product.image}
                      alt="Product"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </td>

                {/* Product Name */}
                <td className="p-3 max-w-[256px] truncate">{product.name}</td>

                {/* Product Category */}
                <td className="p-3 max-w-[160px] truncate">
                  {product.category}
                </td>

                {/* Product Sub-Category */}
                <td className="p-3 max-w-[160px] truncate">
                  {product.subCategory}
                </td>

                {/* Product Price */}
                <td className="p-3 max-w-[140px] truncate">{product.price}</td>

                {/* Status */}
                <td
                  className={`p-3 font-medium ${statusColor[product.status]}`}
                >
                  {product.status}
                </td>

                {/* Actions */}
                <td className="p-3 space-x-2 flex justify-center">
                  <button
                    onClick={() =>
                      navigate(`/admin/bigproduct/view/${product.id}`, {
                        state: product,
                      })
                    }
                  >
                    <Eye className="text-red-600" size={20} />
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/admin/bigproduct/edit/${product.id}`, {
                        state: product,
                      })
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M11 4H4C3.5 4 2.9 4.2 2.6 4.6C2.2 5 2 5.5 2 6V20C2 20.5 2.2 21 2.6 21.4C3 21.8 3.5 22 4 22H18C18.5 22 19 21.8 19.4 21.4C19.8 21 20 20.5 20 20V13"
                        stroke="#EC2D01"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.5 2.5C18.9 2.1 19.4 1.9 20 1.9C20.6 1.9 21.1 2.1 21.5 2.5C21.9 2.9 22.1 3.4 22.1 4C22.1 4.6 21.9 5.1 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
                        stroke="#EC2D01"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button>
                    <Trash2 className="text-red-600" size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex justify-between items-center mt-4 bg-[#F5F5F5] rounded-lg py-2 px-4">
        <span className="text-sm font-semibold">
          Showing {startIndex + 1} to {startIndex + paginatedData.length} of{" "}
          {filteredData.length} Entries
        </span>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`w-8 h-8 flex items-center justify-center rounded-xl font-semibold ${
              currentPage === 1
                ? "bg-gray-200 text-[#001580] cursor-not-allowed"
                : "bg-white hover:bg-gray-100 text-[#001580]"
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
            className={`w-8 h-8 flex items-center justify-center rounded-xl font-semibold ${
              currentPage === totalPages
                ? "bg-gray-200 text-[#001580] cursor-not-allowed"
                : "bg-white hover:bg-gray-100 text-[#001580]"
            }`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
