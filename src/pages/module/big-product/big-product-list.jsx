import React, {useState, useEffect} from "react";
import {Eye, Trash2} from "lucide-react";
import {Button} from "../../../components/ui/button";
import {useNavigate} from "react-router-dom";
import pvc from "../../../assets/images/pvc.png";
import {Box, Chip, Checkbox, FormGroup, FormControlLabel, Popover, CircularProgress} from "@mui/material";
import {getAllBigProducts, deleteBigProduct, updateBigProductStatus} from "../../../config/index.js";
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
];

const statusColor = {
    "Add By Admin": "text-blue-500",
    Approved: "text-green-500",
    Pending: "text-yellow-500",
};

export default function BigProductList() {
    const navigate = useNavigate();
    
    // State management
    const [searchTerm, setSearchTerm] = useState("");
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const categoryOptions = ["Electrician", "Plumber", "Painter"];

    // Fetch products function
    const fetchProducts = async (page = 1, search = "", category = "") => {
        setLoading(true);
        setError("");
        
        try {
            console.log("Fetching big products - Page:", page, "Search:", search, "Category:", category);
            const response = await getAllBigProducts(page, itemsPerPage, search, category);
            
            if (response.success) {
                setProducts(response.data || []);
                setTotalPages(response.totalPages || 1);
                setTotalItems(response.totalItems || 0);
                setCurrentPage(page);
            } else {
                setError(response.message || "Failed to fetch big products");
            }
        } catch (error) {
            console.error("Error fetching big products:", error);
            setError("Failed to load big products");
        } finally {
            setLoading(false);
        }
    };

    // Handle search with API call
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setCurrentPage(1); // Reset to first page when searching
        
        // Get selected category for combined search
        const selectedCategory = appliedFilters.length > 0 ? appliedFilters[0] : "";
        fetchProducts(1, value, selectedCategory);
    };

    // Handle filter changes
    const handleFilterClick = (event) => setAnchorEl(event.currentTarget);
    const handleFilterClose = () => setAnchorEl(null);
    
    const handleCheckboxChange = (option) => {
        let newFilters;
        if (appliedFilters.includes(option)) {
            newFilters = appliedFilters.filter((f) => f !== option);
        } else {
            newFilters = [...appliedFilters, option];
        }
        setAppliedFilters(newFilters);
        
        // Apply filter with API call
        const selectedCategory = newFilters.length > 0 ? newFilters[0] : "";
        setCurrentPage(1);
        fetchProducts(1, searchTerm, selectedCategory);
    };
    
    const handleResetFilters = () => {
        setAppliedFilters([]);
        setCurrentPage(1);
        fetchProducts(1, searchTerm, "");
    };

    // Handle pagination
    const handlePageChange = (page) => {
        const selectedCategory = appliedFilters.length > 0 ? appliedFilters[0] : "";
        fetchProducts(page, searchTerm, selectedCategory);
    };

    // Handle delete product
    const handleDeleteProduct = async (productId, productName) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${productName}"? This action cannot be undone.`
        );
        
        if (!confirmDelete) return;

        try {
            console.log("Deleting big product with ID:", productId);
            const response = await deleteBigProduct(productId);
            
            if (response.success) {
                // Refresh the product list after successful deletion
                const selectedCategory = appliedFilters.length > 0 ? appliedFilters[0] : "";
                fetchProducts(currentPage, searchTerm, selectedCategory);
                alert("Big product deleted successfully!");
            } else {
                alert(response.message || "Failed to delete big product");
            }
        } catch (error) {
            console.error("Error deleting big product:", error);
            alert("Failed to delete big product. Please try again.");
        }
    };

    // Handle status update
    const handleStatusUpdate = async (productId, productName, currentStatus) => {
        const statusOptions = ["Pending", "Approved", "Rejected"];
        const availableOptions = statusOptions.filter(status => status !== currentStatus);
        
        if (availableOptions.length === 0) {
            alert("No other status options available.");
            return;
        }

        // Create a simple prompt for status selection
        let newStatus;
        if (availableOptions.length === 1) {
            const confirmChange = window.confirm(
                `Change status of "${productName}" from "${currentStatus}" to "${availableOptions[0]}"?`
            );
            if (confirmChange) {
                newStatus = availableOptions[0];
            }
        } else {
            const statusChoice = window.prompt(
                `Change status of "${productName}" from "${currentStatus}" to:\n` +
                availableOptions.map((status, index) => `${index + 1}. ${status}`).join('\n') +
                `\n\nEnter number (1-${availableOptions.length}):`
            );
            
            const choiceIndex = parseInt(statusChoice) - 1;
            if (choiceIndex >= 0 && choiceIndex < availableOptions.length) {
                newStatus = availableOptions[choiceIndex];
            }
        }

        if (!newStatus) return;

        try {
            console.log("Updating big product status - ID:", productId, "New Status:", newStatus);
            const response = await updateBigProductStatus(productId, newStatus);
            
            if (response.success) {
                // Refresh the product list after successful status update
                const selectedCategory = appliedFilters.length > 0 ? appliedFilters[0] : "";
                fetchProducts(currentPage, searchTerm, selectedCategory);
                alert(`Product status updated to "${newStatus}" successfully!`);
            } else {
                alert(response.message || "Failed to update product status");
            }
        } catch (error) {
            console.error("Error updating big product status:", error);
            alert("Failed to update product status. Please try again.");
        }
    };

    // Load products on component mount
    useEffect(() => {
        fetchProducts(1, "", "");
    }, []);

    const open = Boolean(anchorEl);

    return (
        <div className="p-4">
            {/* Header Section */}
            <div className="flex items-center justify-between bg-[#E9ECF6] rounded-lg p-4 mb-4">
                <h2 className="text-xl font-bold">Big Product List</h2>

                {/* Search */}
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

                {/* Add Button */}
                <Button
                    onClick={() => navigate("/admin/bigproduct/add")}
                    className="bg-[#2D65BC] text-white rounded-lg px-4 py-2"
                >
                    + Add New Product
                </Button>
            </div>

            {/* Filters */}
            <Box className="mb-4 flex items-center gap-2 flex-wrap">
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

                <Button
                    variant="outlined"
                    onClick={handleResetFilters}
                    className="ml-auto border border-blue-500 text-blue-600 bg-white hover:bg-blue-50"
                >
                    Reset Filter
                </Button>

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

            {/* Error Display */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center py-8">
                    <CircularProgress />
                </div>
            ) : (
                <>
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
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="p-8 text-center text-gray-500">
                                            {searchTerm || appliedFilters.length > 0 
                                                ? 'No big products found matching your criteria.' 
                                                : 'No big products available.'}
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product, idx) => (
                                        <tr key={product._id || product.id} className="border-t hover:bg-gray-50">
                                            <td className="p-3">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                                            <td className="p-3">
                                                <img 
                                                    src={product.productImage || pvc} 
                                                    alt="Product" 
                                                    className="w-12 h-12 rounded-full border object-cover" 
                                                />
                                            </td>
                                            <td className="p-3">{product.productName || product.name}</td>
                                            <td className="p-3">{product.productCategory || product.category}</td>
                                            <td className="p-3">₹{product.productPrice || product.price}</td>
                                            <td className="p-3">
                                                <button
                                                    onClick={() => handleStatusUpdate(
                                                        product._id || product.id,
                                                        product.productName || product.name,
                                                        product.status || 'Pending'
                                                    )}
                                                    className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:opacity-80 transition-opacity ${
                                                        product.status === 'Approved' 
                                                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                                            : product.status === 'Rejected'
                                                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                            : product.status === 'Add By Admin'
                                                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                                    }`}
                                                    title="Click to change status"
                                                >
                                                    {product.status || 'Pending'}
                                                </button>
                                            </td>
                                            <td className="p-3 flex space-x-2">
                                                <button
                                                    onClick={() =>
                                                        navigate(`/admin/bigproduct/view/${product._id || product.id}`, {
                                                            state: product
                                                        })
                                                    }
                                                >
                                                    <Eye className="text-red-600" size={18} />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        navigate(`/admin/bigproduct/edit/${product._id || product.id}`, {
                                                            state: product
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
                                                <button
                                                    onClick={() => handleDeleteProduct(
                                                        product._id || product.id, 
                                                        product.productName || product.name
                                                    )}
                                                >
                                                    <Trash2 className="text-red-600" size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
                <div className="flex justify-between items-center mt-4 bg-gray-100 px-3 py-2 rounded-lg text-sm">
                    <span>
                        Showing {products.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
                        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} Entries
                        {searchTerm && ` for "${searchTerm}"`}
                        {appliedFilters.length > 0 && ` in ${appliedFilters.join(", ")}`}
                    </span>
                    <div className="space-x-1">
                        {/* Previous Button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-2 py-1 rounded-full ${
                                currentPage === 1 ? "bg-gray-200 text-gray-400" : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        >
                            ‹
                        </button>
                        
                        {/* Page Numbers */}
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const pageNum = Math.max(1, currentPage - 2) + i;
                            if (pageNum > totalPages) return null;
                            
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`px-2 py-1 rounded-full ${
                                        pageNum === currentPage ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                        
                        {/* Next Button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-2 py-1 rounded-full ${
                                currentPage === totalPages ? "bg-gray-200 text-gray-400" : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        >
                            ›
                        </button>
                    </div>
                </div>
            )}

            {/* Results Info */}
            {!loading && (
                <div className="mt-2 text-center text-sm text-gray-600">
                    Total: {totalItems} big products
                    {searchTerm && ` matching "${searchTerm}"`}
                    {appliedFilters.length > 0 && ` in ${appliedFilters.join(", ")} category`}
                </div>
            )}
        </div>
    );
}
