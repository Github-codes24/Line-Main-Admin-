import { useState, useEffect } from "react";
import { Eye, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pvc from "../../../assets/images/pvc.png";
import { Box, Chip, Checkbox, FormGroup, FormControlLabel, Popover } from "@mui/material";
import { FilterIcon } from "../../../assets/CommonAssets";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const statusColor = {
    "Add By Admin": "text-blue-500",
    "Approved": "text-green-500",
    "Pending": "text-yellow-500",
    "Active": "text-green-500",
    "Inactive": "text-red-500",
};

export default function BigProductList() {
    const navigate = useNavigate();
    const [fetchData] = useFetch();

    // State management
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [appliedFilters, setAppliedFilters] = useState([]); // Will store category IDs
    const [approvalStatusFilter, setApprovalStatusFilter] = useState(""); // Will store approval status filter
    const [subCategoryFilter, setSubCategoryFilter] = useState(""); // Will store sub-category filter
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [categories, setCategories] = useState([]); // Will store categories with IDs
    const [subCategories, setSubCategories] = useState([]); // Will store sub-categories

    const itemsPerPage = 5; // Changed to match your API example

    // Fetch categories when component mounts
    useEffect(() => {
        fetchCategories();
    }, []);

    // Fetch products once categories are loaded or after a timeout
    useEffect(() => {
        if (categories.length > 0) {
            fetchAllBigProducts();
        } else {
            // Fallback: fetch products after 2 seconds even if categories didn't load
            const timeout = setTimeout(() => {
                fetchAllBigProducts();
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [categories]);

    // Fetch all big products when search/filter changes or categories are loaded
    useEffect(() => {
        if (categories.length > 0) {
            fetchAllBigProducts();
        }
    }, [currentPage, searchTerm, appliedFilters, approvalStatusFilter, subCategoryFilter, categories]);

    // Fetch sub-categories when category filter changes
    useEffect(() => {
        if (appliedFilters.length > 0) {
            fetchSubCategories(appliedFilters[0]);
        } else {
            setSubCategories([]);
            setSubCategoryFilter(""); // Clear sub-category when no category selected
        }
    }, [appliedFilters]);

    const fetchCategories = async () => {
        try {
            // First try to get categories from the tabs API (since categories might be tabs)
            const result = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/admin/tabs/form-data`,
            });

            if (result.success || result.data) {
                const tabsData = result.data || result.tabs || [];
                const categoryOptions = tabsData.map(tab => ({
                    id: tab.id || tab._id,
                    name: tab.tabName || tab.name,
                }));
                setCategories(categoryOptions);
            } else {
                // Fallback to hardcoded categories if API fails
                setCategories([
                    { id: 'electrician', name: 'Electrician' },
                    { id: 'plumber', name: 'Plumber' },
                    { id: 'painter', name: 'Painter' }
                ]);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            // Fallback to hardcoded categories
            setCategories([
                { id: 'electrician', name: 'Electrician' },
                { id: 'plumber', name: 'Plumber' },
                { id: 'painter', name: 'Painter' }
            ]);
        }
    };

    const fetchSubCategories = async (categoryId) => {
        try {
            // Fetch the specific category to get its sub-categories
            const result = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/admin/tabs/${categoryId}`,
            });

            if (result.success || result.data) {
                const tabData = result.data || result.tab || result;
                const subTabs = tabData.subTabNames || tabData.subTabs || [];
                const subCats = subTabs.map(subTab => ({
                    name: subTab.name || subTab,
                    value: subTab.name || subTab
                }));
                setSubCategories(subCats);
            } else {
                setSubCategories([]);
            }
        } catch (error) {
            console.error('Error fetching sub-categories:', error);
            setSubCategories([]);
        }
    };

    const fetchAllBigProducts = async () => {
        try {
            setIsLoading(true);

            // Build query parameters
            const queryParams = new URLSearchParams({
                page: currentPage.toString(),
                limit: itemsPerPage.toString(),
            });

            if (searchTerm.trim()) {
                queryParams.append('search', searchTerm.trim());
            }

            if (appliedFilters.length > 0) {
                // For multiple categories, we'll make separate API calls or use the first one
                // Based on your API example, it seems to support single category filtering
                queryParams.append('productCategory', appliedFilters[0]);
            }

            if (approvalStatusFilter.trim()) {
                console.log('Sending approvalStatus filter:', approvalStatusFilter.trim());
                queryParams.append('approvalStatus', approvalStatusFilter.trim());
            }

            if (subCategoryFilter.trim()) {
                console.log('Sending productSubCategory filter:', subCategoryFilter.trim());
                queryParams.append('productSubCategory', subCategoryFilter.trim());
            }

            const result = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/admin/big-products?${queryParams.toString()}`,
            });

            console.log('API Response:', result);
            console.log('Query URL:', `${conf.apiBaseUrl}/admin/big-products?${queryParams.toString()}`);

            if (result) {
                // Extract products data from response - handle different response structures
                let productsData = [];

                // Try different extraction methods based on common API response patterns
                if (Array.isArray(result)) {
                    // Direct array response
                    productsData = result;
                } else if (result.data && Array.isArray(result.data)) {
                    // Data is array: {data: [...]}
                    productsData = result.data;
                } else if (result.data?.products && Array.isArray(result.data.products)) {
                    // Nested in data.products: {data: {products: [...]}}
                    productsData = result.data.products;
                } else if (result.products && Array.isArray(result.products)) {
                    // Direct products property: {products: [...]}
                    productsData = result.products;
                } else if (result.data && typeof result.data === 'object' && !Array.isArray(result.data)) {
                    // Check if data object has any array property
                    const dataKeys = Object.keys(result.data);
                    for (const key of dataKeys) {
                        if (Array.isArray(result.data[key])) {
                            productsData = result.data[key];
                            break;
                        }
                    }
                }

                console.log('Extracted products data:', productsData);
                console.log('Products data length:', productsData.length);

                // Ensure productsData is an array
                if (!Array.isArray(productsData)) {
                    console.warn('Products data is not an array:', productsData);
                    console.warn('Full result object:', result);
                    productsData = [];
                }

                // Normalize product data - only include safe, primitive values
                const normalizedProducts = productsData.map(product => {
                    const rawStatus = product.status || product.approvalStatus || 'pending';
                    console.log('Raw product status from API:', rawStatus, 'for product:', product.productName || product.name);

                    // Get category name from ID
                    let categoryName = 'Unknown Category';
                    if (product.productCategory || product.category) {
                        const categoryId = product.productCategory || product.category;
                        if (typeof categoryId === 'object' && categoryId.tabName) {
                            // If category is already populated with name
                            categoryName = categoryId.tabName;
                        } else if (typeof categoryId === 'string') {
                            // If category is just an ID, find the name from categories list
                            const foundCategory = categories.find(cat => cat.id === categoryId);
                            if (foundCategory) {
                                categoryName = foundCategory.name;
                            } else {
                                // If categories are not loaded yet or category not found, show loading or ID
                                categoryName = categories.length === 0 ? 'Loading...' : categoryId;
                            }
                        }
                    }

                    return {
                        id: product.id || product._id,
                        name: product.productName || product.name || 'Unknown Product',
                        category: categoryName,
                        subCategory: product.productSubCategory || product.subCategory || 'N/A',
                        price: product.productPrice || product.price || 'N/A',
                        status: rawStatus,
                        image: product.productImageUrl || product.productImage || product.image || pvc,
                        description: product.productDescription || product.description || '',
                        createdAt: product.createdAt,
                        updatedAt: product.updatedAt
                    };
                });

                console.log('Normalized products:', normalizedProducts);

                // Debug: Show status distribution when no filter is applied
                if (!approvalStatusFilter && normalizedProducts.length > 0) {
                    const statusCounts = normalizedProducts.reduce((acc, product) => {
                        const status = product.status || 'unknown';
                        acc[status] = (acc[status] || 0) + 1;
                        return acc;
                    }, {});
                    console.log('🔍 STATUS DISTRIBUTION IN YOUR DATA:', statusCounts);
                    console.log('🔍 Available status values:', Object.keys(statusCounts));
                }

                setProducts(normalizedProducts);
                setTotalProducts(result.data?.total || result.total || normalizedProducts.length);
                setTotalPages(Math.ceil((result.data?.total || result.total || normalizedProducts.length) / itemsPerPage));

                if (normalizedProducts.length === 0 && (searchTerm || approvalStatusFilter)) {
                    const filterText = searchTerm ? `"${searchTerm}"` : `status "${approvalStatusFilter}"`;
                    toast.info(`No products found matching ${filterText}`);
                } else if (normalizedProducts.length === 0) {
                    toast.info('No big products found');
                }
            } else {
                console.error('API response not recognized:', result);
                toast.error(result.message || 'Failed to fetch big products');
                setProducts([]);
            }
        } catch (error) {
            console.error('Error fetching big products:', error);
            toast.error(error.response?.data?.message || error.message || 'Error fetching big products');
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleFilterClick = (event) => setAnchorEl(event.currentTarget);
    const handleFilterClose = () => setAnchorEl(null);

    const handleCheckboxChange = (categoryId) => {
        setAppliedFilters((prev) => (prev.includes(categoryId) ? prev.filter((f) => f !== categoryId) : [...prev, categoryId]));
        setCurrentPage(1); // Reset to first page when filtering
    };

    const handleResetFilters = () => {
        setAppliedFilters([]);
        setApprovalStatusFilter("");
        setSubCategoryFilter("");
        setCurrentPage(1);
    };

    const deleteProduct = async (productId, productName) => {
        if (!window.confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
            return;
        }

        try {
            setIsLoading(true);

            const result = await fetchData({
                method: "DELETE",
                url: `${conf.apiBaseUrl}/admin/big-products/${productId}`,
            });

            console.log('Delete product result:', result);

            if (result.success || result.status === 'success') {
                toast.success(result.message || 'Product deleted successfully');
                fetchAllBigProducts(); // Refresh list
            } else {
                toast.error(result.message || 'Failed to delete product');
            }
        } catch (error) {
            console.error('Delete error:', error);
            let errorMessage = 'Error deleting product';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (error.message) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const updateProductStatus = async (productId, productName, newStatus) => {
        const statusText = newStatus === 'Approved' ? 'approve' : 'reject';
        if (!window.confirm(`Are you sure you want to ${statusText} "${productName}"?`)) {
            return;
        }

        try {
            setIsLoading(true);

            const result = await fetchData({
                method: "PATCH",
                url: `${conf.apiBaseUrl}/admin/big-products/${productId}/status`,
                data: { status: newStatus }
            });

            console.log('Update product status result:', result);

            if (result.success || result.status === 'success') {
                toast.success(result.message || `Product ${statusText}d successfully`);
                fetchAllBigProducts(); // Refresh list
            } else {
                toast.error(result.message || `Failed to ${statusText} product`);
            }
        } catch (error) {
            console.error('Update status error:', error);
            let errorMessage = `Error ${statusText}ing product`;
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (error.message) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const open = Boolean(anchorEl);

    // Since we're doing server-side filtering, we use the products directly
    const paginatedData = products;

    return (
        <div className="p-2">
            <ToastContainer />
            <div className="flex items-center justify-between bg-[#FFFFFF] rounded-lg p-4 mb-4">
                <h2 className="text-xl font-bold">Big Product List</h2>

                <div className="relative w-1/3">
                    <input
                        type="text"
                        placeholder="Search by Product Name..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 py-2 text-sm text-black placeholder:text-black placeholder:font-bold bg-[#E4E5EB] border border-blue-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-800"
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
                    className="bg-[#001580] text-white rounded-lg px-4 py-2"
                >
                    + Add New Product
                </Button>
            </div>

            <div className="overflow-x-auto bg-white shadow rounded-lg">
                {/* Filter section inside table div */}
                <div className="flex items-center justify-start gap-2 flex-wrap px-4 pt-4 pb-2 border-b border-gray-200">
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

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {appliedFilters.map((filterId, index) => {
                            const category = categories.find(cat => cat.id === filterId);
                            return (
                                <Chip
                                    key={index}
                                    label={category?.name || filterId}
                                    size="small"
                                    onDelete={() => setAppliedFilters((prev) => prev.filter((f) => f !== filterId))}
                                    sx={{ backgroundColor: "#E4E5EB" }}
                                />
                            );
                        })}
                        {approvalStatusFilter && (
                            <Chip
                                label={`Status: ${approvalStatusFilter}`}
                                size="small"
                                onDelete={() => setApprovalStatusFilter("")}
                                sx={{ backgroundColor: "#E4E5EB" }}
                            />
                        )}
                        {subCategoryFilter && (
                            <Chip
                                label={`Sub-Category: ${subCategoryFilter}`}
                                size="small"
                                onDelete={() => setSubCategoryFilter("")}
                                sx={{ backgroundColor: "#E4E5EB" }}
                            />
                        )}
                    </Box>

                    <button
                        onClick={handleResetFilters}
                        className="ml-auto px-4 py-2 rounded-md font-bold text-[#001580] bg-[#CECEF2] border border-[#001580] hover:bg-[#babbf0] transition"
                    >
                        Reset Filter
                    </button>

                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleFilterClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    >
                        <Box sx={{ p: 2, minWidth: 200 }}>
                            <strong>Product Category</strong>
                            <FormGroup>
                                {categories.map((category) => (
                                    <FormControlLabel
                                        key={category.id}
                                        control={
                                            <Checkbox
                                                checked={appliedFilters.includes(category.id)}
                                                onChange={() => handleCheckboxChange(category.id)}
                                            />
                                        }
                                        label={category.name}
                                    />
                                ))}
                            </FormGroup>
                        </Box>
                    </Popover>
                </div>

                {/* Table section */}
                <table className="min-w-full bg-white rounded-lg">

                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3">Sr.No.</th>
                            <th className="p-3 leading-none">Product Image</th>
                            <th className="p-3">Product Name</th>
                            <th className="p-3 leading-none">Product Category</th>
                            <th className="p-3 leading-none">Product Sub-Category</th>
                            <th className="p-3 leading-none">Product Price</th>
                            <th className="p-3 leading-none">Approval Status</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="7" className="p-8 text-center">
                                    <div className="text-lg">Loading big products...</div>
                                </td>
                            </tr>
                        ) : paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="p-8 text-center">
                                    <div className="text-lg text-gray-500">
                                        {searchTerm ? `No products found matching "${searchTerm}"` : 'No big products available'}
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((product, idx) => (
                                <tr key={product.id} className="border-t hover:bg-gray-50">
                                    <td className="p-3">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                                    <td className="p-3">
                                        <img
                                            src={product.image || pvc}
                                            alt="Product"
                                            className="w-12 h-12 border-2 border-blue-500 rounded-lg object-cover"
                                            onError={(e) => {
                                                e.target.src = pvc;
                                            }}
                                        />
                                    </td>


                                    <td className="p-3 max-w-xs truncate" title={product.name}>
                                        {String(product.name || 'Unknown')}
                                    </td>
                                    <td className="p-3">{String(product.category || 'Unknown')}</td>
                                    <td className="p-3">{String(product.subCategory || 'N/A')}</td>
                                    <td className="p-3">{String(product.price || 'N/A')}</td>
                                    <td className="p-3">
                                        <div className="flex flex-col gap-1">
                                            <span className={`font-medium text-sm ${statusColor[product.status] || 'text-gray-500'}`}>
                                                {String(product.status || 'Pending')}
                                            </span>
                                            {product.status === 'Pending' && (
                                                <div className="flex gap-1">
                                                    <button
                                                        onClick={() => updateProductStatus(product.id, product.name, 'Approved')}
                                                        disabled={isLoading}
                                                        className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 disabled:opacity-50"
                                                        title="Approve Product"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => updateProductStatus(product.id, product.name, 'Rejected')}
                                                        disabled={isLoading}
                                                        className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50"
                                                        title="Reject Product"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-3 flex space-x-2">
                                        <button
                                            onClick={() =>
                                                navigate(`/admin/bigproduct/view/${product.id}`, {
                                                    state: {
                                                        id: product.id,
                                                        name: product.name,
                                                        category: product.category,
                                                        price: product.price,
                                                        status: product.status,
                                                        image: product.image,
                                                        description: product.description
                                                    }
                                                })
                                            }
                                            title="View Product"
                                        >
                                            <Eye className="text-red-600" size={18} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                navigate(`/admin/bigproduct/edit/${product.id}`, {
                                                    state: {
                                                        id: product.id,
                                                        name: product.name,
                                                        category: product.category,
                                                        price: product.price,
                                                        status: product.status,
                                                        image: product.image,
                                                        description: product.description
                                                    }
                                                })
                                            }
                                            title="Edit Product"
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
                                            onClick={() => deleteProduct(product.id, product.name)}
                                            title="Delete Product"
                                            disabled={isLoading}
                                            className="p-2 rounded-full hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4 bg-gray-100 px-3 py-2 rounded-lg text-sm">
                    <span>
                        Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                        {Math.min(currentPage * itemsPerPage, totalProducts)} of {totalProducts} Entries
                    </span>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1 || isLoading}
                            className="px-3 py-1 bg-white border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>

                        <div className="flex space-x-1">
                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        disabled={isLoading}
                                        className={`px-3 py-1 rounded ${pageNum === currentPage
                                            ? "bg-blue-600 text-white"
                                            : "bg-white border border-gray-300 hover:bg-gray-50"
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || isLoading}
                            className="px-3 py-1 bg-white border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
