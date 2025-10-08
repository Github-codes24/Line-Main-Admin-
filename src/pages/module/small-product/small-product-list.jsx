import React, { useState, useEffect } from "react";
import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import useSmallProduct from "../../../hook/smallproducts/useSmallProduct";
import Pagination from "../../../components/ui/Pagination";

const expertiseList = ["Electrician", "Plumber", "Tiler", "Painter"];

export default function SmallProductList() {
  const navigate = useNavigate();
  const {
    getSmallProduct,
    getSmallProductList,
    deleteSmallProductById,
    searchTheSmallProducts,
    searchTheSmallProductById,
  } = useSmallProduct();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10); // ✅ updated from 5 to 10

  useEffect(() => {
    getSmallProductList();
  }, []);

  const filteredData = (getSmallProduct?.data ?? []).filter((p) => {
    const matchesFilter =
      activeFilters.length === 0 ||
      activeFilters.includes(p.productCategory?.tabName);
    const matchesSearch =
      searchTerm === "" ||
      p.productName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoryId =
      !selectedCategoryId || p.productCategoryId === selectedCategoryId;
    return matchesFilter && matchesSearch && matchesCategoryId;
  });

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const paginatedData = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilters]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchTheSmallProducts(value);
    if (/^[0-9a-fA-F]{24}$/.test(value)) {
      searchTheSmallProductById(value);
      setSelectedCategoryId(value);
    } else {
      setSelectedCategoryId("");
    }
  };

  const toggleFilter = (item) => {
    setActiveFilters((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const removeFilter = (filter) => {
    setActiveFilters(activeFilters.filter((item) => item !== filter));
  };

  const resetFilters = () => {
    setActiveFilters([]);
    setSearchTerm("");
  };

  const handleDelete = async (id) => {
    try {
      await deleteSmallProductById(id);
      await getSmallProductList();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="bg-[#E0E9E9] min-h-screen w-full font-[Poppins]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-white px-4 py-3 rounded-lg shadow">
        <h2 className="text-xl text-[#0D2E28] font-medium">
          Small Product List
        </h2>
        <div className="relative w-full max-w-xs flex-grow md:flex-grow-0">
          <input
            type="text"
            placeholder="Search Product by Name..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full h-10 pl-12 pr-4 placeholder:font-bold placeholder:text-[#0D2E28] rounded-full text-sm border border-[#001580] bg-[#E4E5EB] text-[#0D2E28] focus:outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#0D2E28]"
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
        <button
          onClick={() => navigate("/admin/smallproduct/add")}
          className="w-[200px] bg-[#001580] text-white font-medium px-4 py-2 rounded-lg"
        >
          + Add New Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="relative flex flex-wrap gap-2 mb-4">
          <svg
            onClick={() => setShowFilterPanel(true)}
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            className="cursor-pointer"
          >
            <path
              d="M0 10C0 4.47715 4.47715 0 10 0H30C35.5228 0 40 4.47715 40 10V30C40 35.5228 35.5228 40 30 40H10C4.47715 40 0 35.5228 0 30V10Z"
              fill="#E4E5EB"
            />
            <path
              d="M16.8571 20.506C14.3701 18.646 12.5961 16.6 11.6271 15.45C11.3271 15.094 11.2291 14.833 11.1701 14.374C10.9681 12.802 10.8671 12.016 11.3281 11.508C11.7891 11 12.6041 11 14.2341 11H25.7661C27.3961 11 28.2111 11 28.6721 11.507C29.1331 12.015 29.0321 12.801 28.8301 14.373C28.7701 14.832 28.6721 15.093 28.3731 15.449C27.4031 16.601 25.6261 18.651 23.1331 20.514C23.0178 20.6037 22.9225 20.7165 22.8533 20.8451C22.7841 20.9737 22.7425 21.1154 22.7311 21.261C22.4841 23.992 22.2561 25.488 22.1141 26.244C21.8851 27.466 20.1541 28.201 19.2261 28.856C18.6741 29.246 18.0041 28.782 17.9331 28.178C17.6676 25.8765 17.4429 23.5705 17.2591 21.261C17.2488 21.114 17.2077 20.9708 17.1385 20.8407C17.0692 20.7106 16.9733 20.5966 16.8571 20.506Z"
              stroke="#0D2E28"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {showFilterPanel && (
            <div className="absolute left-0 top-14 bg-white rounded-lg shadow-lg px-4 py-2 w-[300px] border border-gray-300 z-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#0D2E28]"> 
                  Expertise
                </h3>
                <button
                  onClick={() => setShowFilterPanel(false)}
                  className="text-[#0D2E28] hover:text-gray-800 text-2xl"
                >
                  <IoClose />
                </button>
              </div>
              <div className="space-y-3">
                {expertiseList.map((item) => (
                  <label
                    key={item}
                    className="flex items-center space-x-2 cursor-pointer text-[#0D2E28]"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#001580] border-gray-300 rounded"
                      checked={activeFilters.includes(item)}
                      onChange={() => toggleFilter(item)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeFilters.map((filter) => (
            <span
              key={filter}
              className="px-3 py-1 bg-[#E4E5EB] text-[#0D2E28] font-medium rounded-full flex items-center gap-1"
            >
              {filter}
              <button
                onClick={() => removeFilter(filter)}
                className="text-[#0D2E28] font-semibold ml-1"
              >
                <IoClose />
              </button>
            </span>
          ))}

          {activeFilters.length > 0 && (
            <button
              onClick={resetFilters}
              className="w-[200px] ml-auto border border-[#001580] bg-[#CECEF2] text-[#001580] font-medium px-6 py-2 rounded-lg"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Table */}
        <div className="border border-[#616666] rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full table-fixed bg-white shadow rounded-lg">
            <thead className="bg-[#E4E5EB] text-[#0D2E28] font-[Poppins] text-[16px] font-medium leading-[100%] text-center align-middle">
              <tr>
                <th className="px-4 py-4 w-[80px]">
                  Sr.No.
                </th>
                <th className="px-4 py-4 w-[140px]">
                  Product Image
                </th>
                <th className="px-4 py-4 w-[256px]">
                  Product Name
                </th>
                <th className="px-4 py-4 w-[160px]">
                  Product Category
                </th>
                <th className="px-4 py-4 w-[160px]">
                  Product Sub Category
                </th>
                <th className="px-4 py-4 w-[140px]">
                  Product Price
                </th>
                <th className="px-4 py-4 w-[140px]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="text-center text-[#0D2E28] text-[14px] font-normal">
              {paginatedData.map((product, idx) => (
                <tr key={product._id} className="border-b">
                  <td className="px-4 py-3">{indexOfFirstRecord + idx + 1}</td>
                  <td className="px-4 py-3 flex justify-center">
                    <img
                      src={product.productImageUrl}
                      alt="Product"
                      className="w-14 h-14 rounded border p-0.5"
                    />
                  </td>
                  <td className="px-4 py-3 truncate">{product.productName}</td>
                  <td className="px-4 py-3">
                    {product?.productCategory?.tabName || "-"}
                  </td>
                  <td className="px-4 py-3">
                    {product?.productSubCategory || "-"}
                  </td>
                  <td className="px-4 py-3">{product.productPrice}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center items-center gap-3">
                      <button
                        onClick={() =>
                          navigate(`/admin/smallproduct/view/${product._id}`)
                        }
                      >
                        <Eye className="text-red-600" size={20} />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/admin/smallproduct/edit/${product._id}`)
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
                            d="M11 4H4C3.47 4 2.96 4.21 2.59 4.59C2.21 4.96 2 5.47 2 6V20C2 20.53 2.21 21.04 2.59 21.41C2.96 21.79 3.47 22 4 22H18C18.53 22 19.04 21.79 19.41 21.41C19.79 21.04 20 20.53 20 20V13"
                            stroke="#EC2D01"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.5 2.5C18.9 2.1 19.44 1.88 20 1.88C20.56 1.88 21.1 2.1 21.5 2.5C21.9 2.9 22.12 3.44 22.12 4C22.12 4.56 21.9 5.1 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
                            stroke="#EC2D01"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 className="text-red-600" size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delete Modal */}
        {deleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
              <h2 className="text-xl font-bold text-center text-[#0D2E28] mb-3">
                Delete Product
              </h2>
              <p className="text-[#0D2E28] text-center mb-6 leading-relaxed">
                Are you sure you want to delete this product? <br />
                This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-16 py-2 rounded-md border border-[#001580] bg-[#CED4F2] text-[#001580] font-medium hover:opacity-90 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedProduct._id);
                    setDeleteModalOpen(false);
                  }}
                  className="px-16 py-2 rounded-md border border-[#001580] bg-[#001580] text-white font-medium hover:opacity-90 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalRecords={filteredData.length}
          recordsPerPage={recordsPerPage}
          goToPage={goToPage}
          label="entries"
        />
      </div>
    </div>
  );
}
