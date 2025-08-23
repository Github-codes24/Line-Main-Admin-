import React, {useState} from "react";
import {Eye, Trash2} from "lucide-react";
import {Button} from "../../../components/ui/button";
import {useNavigate} from "react-router-dom";
import pvc from "../../../assets/images/pvc.png";
import {Box, Chip, Checkbox, FormGroup, FormControlLabel, Popover} from "@mui/material";
import {FilterIcon} from "../../../assets/CommonAssets"; // same icon as WorkerList

const productData = [
    {id: 1, name: "PVC Wire Cable (Red Colour)", category: "Electrician", price: "₹499", status: "Add By Admin"},
    {id: 2, name: "Havells 9W LED Bulb", category: "Electrician", price: "₹499", status: "Pending"},
    {id: 3, name: "UPVC Plumbing Pipe (Schedule - 40) - 40m…", category: "Plumber", price: "₹499", status: "Approved"},
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
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    const categoryOptions = ["Electrician", "Plumber", "Painter"];

    // Search
    const handleSearch = (e) => setSearchTerm(e.target.value);

    // Filters
    const handleFilterClick = (event) => setAnchorEl(event.currentTarget);
    const handleFilterClose = () => setAnchorEl(null);

    const handleCheckboxChange = (option) => {
        setAppliedFilters((prev) => (prev.includes(option) ? prev.filter((f) => f !== option) : [...prev, option]));
    };

    const handleResetFilters = () => setAppliedFilters([]);

    const open = Boolean(anchorEl);

    // Apply search + filters
    const filteredData = productData.filter((product) => {
        const matchesSearch =
            searchTerm.trim() === "" ||
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.status.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = appliedFilters.length === 0 || appliedFilters.includes(product.category);

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="p-4">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <h2 className="text-2xl font-bold">Big Product List</h2>

                {/* Search */}
                <div className="relative w-full max-w-xs flex-grow md:flex-grow-0">
                    <input
                        type="text"
                        placeholder="Search by product name or category"
                        value={searchTerm}
                        onChange={handleSearch}
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

                {/* Add Button */}
                <Button onClick={() => navigate("/admin/bigproduct/add")} className="bg-teal-600 text-white">
                    + Add New Product
                </Button>
            </div>

            {/* Filters */}
            <Box className="mb-4 flex items-center gap-2 flex-wrap">
                {/* Filter Icon */}
                <Box
                    sx={{
                        background: "#E0E9E9",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "5px",
                        borderRadius: 1,
                        cursor: "pointer",
                    }}
                    onClick={handleFilterClick}
                >
                    <FilterIcon />
                </Box>

                {/* Applied filters as chips */}
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

                {/* Reset button (always visible) */}
                <Button
                    variant="outlined"
                    onClick={handleResetFilters}
                    className="ml-auto border bg-teal-100 border-teal-600 text-teal-700"
                >
                    Reset Filter
                </Button>

                {/* Popover */}
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

            {/* Table */}
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
                        {filteredData.map((product, idx) => (
                            <tr key={product.id} className="border-t">
                                <td className="p-3">{idx + 1}</td>
                                <td className="p-3">
                                    <img src={pvc} alt="Product" className="w-12 h-12 rounded" />
                                </td>
                                <td className="p-3">{product.name}</td>
                                <td className="p-3">{product.category}</td>
                                <td className="p-3">{product.price}</td>
                                <td className={`p-3 ${statusColor[product.status]}`}>{product.status}</td>
                                <td className="p-3 flex space-x-2">
                                    {/* View */}
                                    <button
                                        onClick={() =>
                                            navigate(`/admin/bigproduct/view/${product.id}`, {state: product})
                                        }
                                    >
                                        <Eye className="text-red-600" size={18} />
                                    </button>

                                    {/* Edit */}
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

                                    {/* Delete */}
                                    <button>
                                        <Trash2 className="text-red-600" size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <span className="text-sm">
                    Showing {filteredData.length} of {productData.length} Entries
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
