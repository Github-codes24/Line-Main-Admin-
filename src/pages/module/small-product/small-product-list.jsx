import React, { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import pvc from "../../../assets/images/pvc.png";

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

export default function SmallProductList({ productId }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilters, setActiveFilters] = useState([]);

    // Add filter on search
    // const handleSearch = (e) => {
    //   const term = e.target.value;
    //   setSearchTerm(term);

    //   // Auto-add category filter if match found
    //   const matchedCategory = productData.find((p) =>
    //     p.category.toLowerCase().includes(term.toLowerCase())
    //   )?.category;

    //   if (matchedCategory && !activeFilters.includes(matchedCategory)) {
    //     setActiveFilters([...activeFilters, matchedCategory]);
    //   }
    // };
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        // Only add if exact match and not already in filters
        const categories = ["Electrician", "Plumber", "Painter"];
        const matchedCategory = categories.find(
            (cat) => cat.toLowerCase() === term.toLowerCase()
        );

        if (matchedCategory && !activeFilters.includes(matchedCategory)) {
            setActiveFilters([...activeFilters, matchedCategory]);
            setSearchTerm(""); // clear search input after add
        }
    };

    // Remove filter
    const removeFilter = (filter) => {
        setActiveFilters(activeFilters.filter((item) => item !== filter));
    };

    // Reset all filters
    const resetFilters = () => {
        setActiveFilters([]);
        setSearchTerm("");
    };

    // Apply filters
    const filteredData =
        activeFilters.length === 0
            ? productData
            : productData.filter((p) => activeFilters.includes(p.category));

    return (
        <div className="p-2">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-white p-4 rounded-lg shadow">
                <h2 className="text-2xl font-medium">Small Product List</h2>

                <div className="relative w-full max-w-xs flex-grow md:flex-grow-0">
                    <input
                        type="text"
                        placeholder="Search by Product Name..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 bg-[#F5FFFF] text-[#0D2E28] font-medium placeholder-[#0D2E28] py-1 border-2 border-[#007E74] rounded-full "
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

                <Button
                    onClick={() => navigate("/admin/shopmanagement/small-product-add")}
                    className="bg-[#007E74] text-white font-medium px-6 py-2 rounded"
                >
                    + Add New Product
                </Button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow mb-4">
                {/* Filters UI */}
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
                            className="px-3 py-1 bg-[#E0E9E9] rounded-full flex items-center gap-1"
                        >
                            {filter}
                            <button
                                onClick={() => removeFilter(filter)}
                                className="text-gray-600 ml-1"
                            >
                                ✕
                            </button>
                        </span>
                    ))}
                    {activeFilters.length > 0 && (
                        <Button
                            onClick={resetFilters}
                            className="w-[200px] ml-auto border border-[#007E74] bg-teal-50 text-[#007E74] font-medium px-6 py-2 rounded"
                        >
                            Reset Filter
                        </Button>
                    )}
                </div>

                <div className="border border-[#616666] rounded-lg shadow-sm">
                    {/* Product Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow rounded-lg">
                            <thead>
                                <tr className="bg-[#E0E9E9] text-center text-[#0D2E28] text-medium rounded-t-lg">
                                    <th className="p-3">Sr.No.</th>
                                    <th className="p-3">Product Image</th>
                                    <th className="p-3">Product Name</th>
                                    <th className="p-3">Product For</th>
                                    <th className="p-3">Product Price</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((product, idx) => (
                                    <tr key={product.id} className="text-center">
                                        <td className="p-3">{idx + 1}</td>
                                        <td className="p-3 text-center">
                                            <img src={pvc} alt="Product" className="w-14 h-14 rounded border border-[#007E74] p-0.5" />
                                        </td>
                                        <td className="p-3">{product.name}</td>
                                        <td className="p-3">{product.category}</td>
                                        <td className="p-3">{product.price}</td>
                                        <td className="p-3 flex space-x-2">
                                            <button
                                                onClick={() =>
                                                    navigate("/admin/shopmanagement/small-product-view")
                                                }
                                            >
                                                <Eye className="text-red-600" size={18} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/shopmanagement/small-product-edit/${productId}`
                                                    )
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
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
                                            <button>
                                                <Trash2 className="text-red-600" size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4 bg-[#F5F5F5] rounded-lg py-2 px-2">
                    <span className="text-sm">
                        Showing {filteredData.length} of {productData.length} Entries
                    </span>
                    <div className="space-x-1">
                        {[1, 2, 3].map((page) => (
                            <button
                                key={page}
                                className={`px-2 py-1 rounded-full ${page === 1 ? "bg-teal-600 text-white" : "bg-gray-100"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
