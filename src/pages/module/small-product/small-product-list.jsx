import React, {useState, useEffect} from "react";
import {Eye, Trash2} from "lucide-react";
import {useNavigate} from "react-router-dom";
import pvc from "../../../assets/images/pvc.png";
import {IoClose} from "react-icons/io5";
import useSmallProduct from "../../../hook/smallproducts/useSmallProduct";
import {data} from "autoprefixer";

const expertiseList = ["Electrician", "Plumber", "Tiler", "Painter", "AC & Refrigerator Mechanic"];

export default function SmallProductList({productId}) {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const onPageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const onItemsPerPageChange = (e) => {
        const newLimit = parseInt(e.target.value, 10);
        setLimit(newLimit);
        setPage(1);
    };

    const {
        getSmallProduct,
        getSmallProductList,
        deleteSmallProductById,
        searchTheSmallProducts,
        searchTheSmallProductById,
    } = useSmallProduct();
    console.log("Get data", getSmallProduct);
    useEffect(() => {
        getSmallProductList();
    }, []);

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilters, setActiveFilters] = useState([]);
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [showDeletePanel, setShowDeletePanel] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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

    const removeFilter = (filter) => {
        setActiveFilters(activeFilters.filter((item) => item !== filter));
    };

    const resetFilters = () => {
        setActiveFilters([]);
        setSearchTerm("");
    };

    const toggleFilter = (item) => {
        setActiveFilters((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]));
    };

    const handleDelete = (id) => {
        console.log("Item deleted!");
        deleteSmallProductById(id);
        setShowDeletePanel(false);
        getSmallProductList();
    };

    const filteredData = (getSmallProduct?.data ?? []).filter((p) => {
        const matchesFilter = activeFilters.length === 0 || activeFilters.includes(p.productCategory?.tabName);

        const matchesSearch = searchTerm === "" || p.productName?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategoryId = !selectedCategoryId || p.productCategoryId === selectedCategoryId;

        return matchesFilter && matchesSearch && matchesCategoryId;
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilters, searchTerm]);

    const totalPages = Math.ceil(filteredData.length / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedData = filteredData.slice(startIndex, startIndex + limit);

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

    return (
        <div className="p-2 font-[Poppins]">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-white px-4 py-3 rounded-lg shadow">
                <h2 className="text-xl font-medium">Small Product List</h2>

                <div className="relative w-full max-w-xs flex-grow md:flex-grow-0">
                    <input
                        type="text"
                        placeholder="Search by Product Name..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 bg-[#E4E5EB] text-[#001580] font-medium placeholder-[#001580] py-1 border-2 border-[#001580] rounded-full focus:outline-none"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#001580]"
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
                            stroke="#001580"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    {showFilterPanel && (
                        <div className="absolute left-0 top-14 bg-white rounded-lg shadow-lg px-4 py-2 w-70 border border-gray-300 z-50">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Expertise</h3>
                                <button
                                    onClick={() => setShowFilterPanel(false)}
                                    className="text-gray-600 hover:text-gray-800 text-2xl"
                                >
                                    <IoClose />
                                </button>
                            </div>
                            <div className="space-y-3">
                                {expertiseList.map((item) => (
                                    <label
                                        key={item}
                                        className="flex items-center space-x-2 cursor-pointer text-gray-700"
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
                            className="px-3 py-1 bg-[#E4E5EB] text-[#001580] font-medium rounded-full flex items-center gap-1"
                        >
                            {filter}
                            <button onClick={() => removeFilter(filter)} className="text-[#001580] font-semibold ml-1">
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

                <div className="border border-[#616666] rounded-lg shadow-sm overflow-x-auto">
                    <table className="min-w-full table-fixed bg-white shadow rounded-lg">
                        <thead>
                            <tr className="bg-[#E4E5EB] text-center text-[#001580] font-medium">
                                <th className="px-2 py-3 w-16">Sr.No.</th>
                                <th className="px-2 py-3 w-28">Product Image</th>
                                <th className="px-2 py-3 w-52">Product Name</th>
                                <th className="px-2 py-3 w-40">Product Category</th>
                                <th className="px-2 py-3 w-44">Product Sub Category</th>
                                {/* <th className="px-2 py-3 w-40">Product For</th> */}
                                <th className="px-2 py-3 w-28">Product Price</th>
                                <th className="px-2 py-3 w-32">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((product, idx) => (
                                <tr key={idx} className="text-center border-b">
                                    <td className="p-3">{startIndex + idx + 1}</td>
                                    <td className="p-3 flex justify-center">
                                        <img
                                            src={product.productImageUrl}
                                            alt="Product"
                                            className="w-14 h-14 rounded border border-[#007E74] p-0.5"
                                        />
                                    </td>
                                    <td className="p-3 truncate">{product.productName}</td>
                                    <td className="p-3">{product?.productCategory?.tabName || "-"}</td>
                                    <td className="p-3">{product?.productSubCategory || "-"}</td>
                                    {/* <td className="p-3">{product?.productCategory?.tabName || "-"}</td> */}
                                    <td className="p-3">{product.productPrice}</td>
                                    <td className="p-3">
                                        <div className="flex justify-center items-center gap-3">
                                            <button onClick={() => navigate(`/admin/smallproduct/view/${product._id}`)}>
                                                <Eye className="text-red-600" size={20} />
                                            </button>
                                            <button onClick={() => navigate(`/admin/smallproduct/edit/${product._id}`)}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                                                        stroke="#EC2D01"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z"
                                                        stroke="#EC2D01"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>
                                            <button onClick={() => setShowDeletePanel(true)}>
                                                <Trash2 className="text-red-600" size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center mt-4 bg-[#F5F5F5] rounded-lg py-2 px-4">
                    <span className="text-sm font-semibold">
                        Showing {paginatedData.length} of {filteredData.length} Entries
                    </span>

                    <div className="flex items-center space-x-4">
                        {/* Rows per page */}
                        <select
                            value={limit}
                            onChange={onItemsPerPageChange}
                            className="border rounded px-2 py-1 text-sm"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>

                        {/* Prev */}
                        <button
                            onClick={() => onPageChange(page - 1)}
                            disabled={page === 1}
                            className={`w-8 h-8 flex items-center justify-center rounded-xl ${
                                page === 1 ? "bg-gray-200 text-[#001580]" : "bg-white hover:bg-gray-100"
                            }`}
                        >
                            ◀
                        </button>

                        {/* Page numbers */}
                        {[...Array(totalPages)].map((_, i) => {
                            const pageNum = i + 1;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => onPageChange(pageNum)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-xl font-semibold ${
                                        pageNum === page
                                            ? "bg-[#001580] text-white"
                                            : "bg-[#CECEF2] text-[#001580] hover:bg-[#CECEF2]"
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        {/* Next */}
                        <button
                            onClick={() => onPageChange(page + 1)}
                            disabled={page === totalPages}
                            className={`w-8 h-8 flex items-center justify-center rounded-xl ${
                                page === totalPages ? "bg-gray-200 text-[#001580]" : "bg-white hover:bg-gray-100"
                            }`}
                        >
                            ▶
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
