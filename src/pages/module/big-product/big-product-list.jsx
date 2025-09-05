import React, {useState} from "react";
import {Eye, Trash2} from "lucide-react";
import {Button} from "../../../components/ui/button";
import {useNavigate} from "react-router-dom";
import pvc from "../../../assets/images/pvc.png";
import {Box, Chip, Checkbox, FormGroup, FormControlLabel, Popover} from "@mui/material";
import {FilterIcon} from "../../../assets/CommonAssets";

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
        id: 6,
        name: "Asian Paints Ultima Weather Proof Exterior…",
        category: "Painter",
        price: "₹499",
        status: "Approved",
        image: pvc,
    },
    {
        id: 7,
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
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="p-2">
            <div className="flex items-center justify-between bg-[#FFFFFF] rounded-lg p-4 mb-4">
                <h2 className="text-xl font-bold">Big Product List</h2>

                <div className="relative w-1/3">
                    <input
                        type="text"
                        placeholder="Search by Product Name..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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
                    onClick={() => navigate("/admin/bigproduct/add")}
                    className="bg-[#2D65BC] text-white rounded-lg px-4 py-2"
                >
                    + Add New Product
                </Button>
            </div>

            <Box className="mb-4 flex items-center justify-start gap-2 flex-wrap">
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
                            sx={{backgroundColor: "#F0F0F0"}}
                        />
                    ))}
                </Box>

                <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 rounded-md font-bold text-[#001580] bg-[#CECEF2] border border-[#001580] hover:bg-[#babbf0] transition"
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
                            <th className="p-3 leading-none">Product Image</th>
                            <th className="p-3">Product Name</th>
                            <th className="p-3 leading-none">Product Category</th>
                            <th className="p-3 leading-none">Product Price</th>
                            <th className="p-3 leading-none">Approval Status</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((product, idx) => (
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
                                            navigate(`/admin/bigproduct/edit/${product.id}`, {
                                                state: product,
                                            })
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

            <div className="flex justify-between items-center mt-4 bg-gray-100 px-3 py-2 rounded-lg text-sm">
                <span>
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} Entries
                </span>
                <div className="space-x-1">
                    {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-2 py-1 rounded-full ${
                                page === currentPage ? "bg-blue-600 text-white" : "bg-gray-200"
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
