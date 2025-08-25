import React, {useMemo, useState} from "react";
import {Eye, Trash2} from "lucide-react";
import {Button} from "../../../components/ui/button";
import {useNavigate} from "react-router-dom";
import pvc from "../../../assets/images/pvc.png";
import {Box, Chip, Checkbox, FormGroup, FormControlLabel, Popover} from "@mui/material";
import {FilterIcon} from "../../../assets/CommonAssets";
import Worker from "../../../components/cards/worker";

const productData = [
    {
        id: 1,
        name: "PVC Wire Cable (Red Colour)",
        category: "Electrician",
        price: "₹499",
        status: "Approved",
        image: pvc,
    },
    {id: 2, name: "Havells 9W LED Bulb", category: "Electrician", price: "₹499", status: "Pending", image: pvc},
    {
        id: 3,
        name: "UPVC Plumbing Pipe (Schedule - 40) - 40m…",
        category: "Plumber",
        price: "₹499",
        status: "Approved",
        image: pvc,
    },
    {
        id: 4,
        name: "Asian Paints Ultima Weather Proof Exterior…",
        category: "Painter",
        price: "₹499",
        status: "Approved",
        image: pvc,
    },
    {
        id: 5,
        name: "UXCELL Plush Sleeve Cover Wall Paint Paintin…",
        category: "Painter",
        price: "₹499",
        status: "Add By Admin",
        image: pvc,
    },
    {
        id: 1,
        name: "PVC Wire Cable (Red Colour)",
        category: "Electrician",
        price: "₹499",
        status: "Approved",
        image: pvc,
    },
    {id: 2, name: "Havells 9W LED Bulb", category: "Electrician", price: "₹499", status: "Pending", image: pvc},
    {
        id: 3,
        name: "UPVC Plumbing Pipe (Schedule - 40) - 40m…",
        category: "Plumber",
        price: "₹499",
        status: "Approved",
        image: pvc,
    },
    {
        id: 4,
        name: "Asian Paints Ultima Weather Proof Exterior…",
        category: "Painter",
        price: "₹499",
        status: "Approved",
        image: pvc,
    },
    {
        id: 5,
        name: "UXCELL Plush Sleeve Cover Wall Paint Paintin…",
        category: "Painter",
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

export default function BigProductList() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    const categoryOptions = ["Electrician", "Plumber", "Painter"];

    const handleSearch = (e) => setSearchTerm(e.target.value);
    const handleFilterClick = (event) => setAnchorEl(event.currentTarget);
    const handleFilterClose = () => setAnchorEl(null);
    const handleCheckboxChange = (option) => {
        setAppliedFilters((prev) => (prev.includes(option) ? prev.filter((f) => f !== option) : [...prev, option]));
    };
    const handleResetFilters = () => setAppliedFilters([]);

    const open = Boolean(anchorEl);

    const filteredData = productData.filter((product) => {
        const matchesSearch =
            searchTerm.trim() === "" ||
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.status.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = appliedFilters.length === 0 || appliedFilters.includes(product.category);
        return matchesSearch && matchesFilter;
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage]);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const categories = [...new Set(productData.map((item) => item.category))];
    const [searchText, setSearchText] = useState("");

    return (
        <div className="mt-2">
            <Box sx={{width: "100%", minHeight: "auto", display: "flex", flexDirection: "column", gap: "24px"}}>
                <Worker
                    title="Big Product List"
                    searchValue={searchText}
                    setSearchValue={setSearchText}
                    buttonText="Add New Product"
                    btnpath="/admin/bigproduct/add"
                />
            </Box>
            <Box className="mb-4 mt-4 flex items-center gap-2 flex-wrap justify-between">
                <Box className="flex items-center gap-2 flex-wrap">
                    <Box
                        sx={{
                            background: "#E0E9E9",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "6px",
                            borderRadius: 6,
                            cursor: "pointer",
                        }}
                        onClick={handleFilterClick}
                    >
                        <FilterIcon />
                    </Box>

                    <Box sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
                        {appliedFilters.map((filter, index) => (
                            <Chip
                                key={index}
                                label={filter}
                                size="small"
                                onDelete={() => setAppliedFilters((prev) => prev.filter((f) => f !== filter))}
                                sx={{backgroundColor: "#CECEF2"}}
                            />
                        ))}
                    </Box>
                </Box>

                <button
                    onClick={handleResetFilters}
                    className="px-6 py-2 rounded-md font-bold text-[#001580] bg-[#CECEF2] border border-[#001580] hover:bg-[#babbf0] transition"
                >
                    Reset Filter
                </button>

                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleFilterClose}
                    anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                >
                    <Box sx={{p: 2, minWidth: 200}}>
                        <strong>Product Category</strong>
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
            </Box>
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
                        {filteredData
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((product, idx) => (
                            <tr key={product.id} className="border-t hover:bg-gray-50">
                                <td className="p-3">{(currentPage - 1) * itemsPerPage + idx + 1}</td>

                                <td className="p-3">
                                    <img src={product.image} alt="Product" className="w-12 h-12 rounded-full border" />
                                </td>
                                <td className="p-3">{product.name}</td>
                                <td className="p-3">{product.category}</td>
                                <td className="p-3">{product.price}</td>
                                <td className={`p-3 font-medium ${statusColor[product.status]}`}>{product.status}</td>

                                <td className="p-3 flex space-x-2">
                                    <button
                                        onClick={() =>
                                            navigate(`/admin/bigproduct/view/${product.id}`, {state: product})
                                        }
                                    >
                                        <Eye className="text-red-600" size={18} />
                                    </button>

                                    <button
                                        onClick={() =>
                                            navigate(`/admin/bigproduct/edit/${product.id}`, {state: product})
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
                                        <Trash2 className="text-red-600" size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {filteredData.length > itemsPerPage && (
                <div className="flex justify-between items-center mt-4 bg-[#F5F5F5] rounded-lg py-2 px-4">
                    <span className="text-sm font-semibold">
                        Showing {paginatedData.length} of {filteredData.length} Products
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
    );
}
