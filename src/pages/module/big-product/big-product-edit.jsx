import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import editBig from "../../../assets/images/editBigImage.png";
import useFetch from "../../../hook/useFetch";
import useDropdown from "../../../hook/dropdown/useDropdown";
import conf from "../../../config";

const BigProductEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const fileInputRef = useRef(null);
    const [fetchData] = useFetch();
    const { productCategory: categories, productSubCategory, setProductSubCategory, fetchProductCategory, fetchProductSubCategory } = useDropdown();

    // State management
    const [isLoading, setIsLoading] = useState(false);
    const [productImage, setProductImage] = useState(editBig);
    const [selectedFile, setSelectedFile] = useState(null);
    const [productName, setProductName] = useState("");
    const [productCategoryId, setProductCategoryId] = useState("");
    const [productSubCategoryValue, setProductSubCategoryValue] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [originalProductData, setOriginalProductData] = useState(null);

    // Check if product data was passed via navigation state
    const passedProductData = location.state?.product;

    useEffect(() => {
        fetchProductCategory();
        if (passedProductData) {
            // Use passed data if available
            initializeFormData(passedProductData);
        } else if (id) {
            // Fetch data from API if not passed
            fetchSingleProduct(id);
        }
    }, [id, passedProductData]);

    // Fetch subcategories when product data is loaded and has a category
    useEffect(() => {
        if (productCategoryId) {
            fetchProductSubCategory(productCategoryId);
        }
    }, [productCategoryId]);



    const initializeFormData = (productData) => {
        setOriginalProductData(productData);
        setProductName(productData.productName || productData.name || "");

        // Handle category - it might be an object with {_id, tabName} or a string
        let categoryValue = '';
        if (productData.productCategory) {
            if (typeof productData.productCategory === 'object') {
                categoryValue = productData.productCategory._id || productData.productCategory.id || '';
            } else {
                categoryValue = productData.productCategory;
            }
        } else if (productData.category) {
            if (typeof productData.category === 'object') {
                categoryValue = productData.category._id || productData.category.id || '';
            } else {
                categoryValue = productData.category;
            }
        }

        setProductCategoryId(categoryValue);
        setProductSubCategoryValue(productData.productSubCategory || "");
        setProductPrice(productData.productPrice || productData.price || "");
        setProductDescription(productData.productDescription || productData.description || "");
        setProductImage(productData.productImageUrl || productData.image || editBig);
    };

    const fetchSingleProduct = async (productId) => {
        try {
            setIsLoading(true);

            const result = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/admin/big-products/${productId}`,
            });

            if (result.success || result.data) {
                const productData = result.data || result.product || result;
                initializeFormData(productData);
            } else {
                toast.error(result.message || 'Failed to fetch product data');
                navigate(-1);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            toast.error(error.response?.data?.message || error.message || 'Error fetching product data');
            navigate(-1);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setProductImage(URL.createObjectURL(file));
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    const updateProduct = async (productData) => {
        try {
            setIsLoading(true);

            const result = await fetchData({
                method: "PUT",
                url: `${conf.apiBaseUrl}/admin/big-products/${id}`,
                data: productData,
                isFormData: true
            });

            console.log('Update product result:', result);

            if (result.success || result.status === 'success' || result.data) {
                toast.success(result.message || "Product updated successfully!");
                setTimeout(() => {
                    navigate(`/admin/bigproduct/view/${id}`);
                }, 1500);
                return { success: true, data: result };
            } else {
                throw new Error(result.message || 'Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            let errorMessage = 'Failed to update product';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (error.response?.data) {
                errorMessage = typeof error.response.data === 'string'
                    ? error.response.data
                    : JSON.stringify(error.response.data);
            } else if (error.message) {
                errorMessage = error.message;
            }

            toast.error(errorMessage);
            return { success: false, error: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!productName.trim()) {
            toast.error("Product name is required");
            return;
        }

        if (!productCategoryId) {
            toast.error("Product category is required");
            return;
        }

        // Validate that category exists in admin-tab-management
        const selectedCategory = categories.find(cat => cat._id === productCategoryId);
        if (!selectedCategory) {
            toast.error("Selected category is not valid. Please select a valid category from admin-tab-management.");
            return;
        }

        if (!productPrice.trim()) {
            toast.error("Product price is required");
            return;
        }

        if (isNaN(productPrice) || parseFloat(productPrice) <= 0) {
            toast.error("Please enter a valid price");
            return;
        }

        if (!productDescription.trim()) {
            toast.error("Product description is required");
            return;
        }

        // Get shopkeeperId from sessionStorage (logged-in admin ID)
        const shopkeeperId = sessionStorage.getItem("userID") || sessionStorage.getItem("Id");

        if (!shopkeeperId) {
            toast.error("User session expired. Please login again.");
            return;
        }

        // Prepare form data
        const formData = new FormData();
        formData.append('productName', productName.trim());
        formData.append('productCategory', productCategoryId);
        formData.append('productPrice', productPrice.trim());
        formData.append('productDescription', productDescription.trim());
        formData.append('shopkeeperId', shopkeeperId); // Add required shopkeeperId

        // Only append sub-category if it exists and is selected
        if (productSubCategoryValue) {
            formData.append('productSubCategory', productSubCategoryValue);
        }

        // Only append image if a new file was selected
        if (selectedFile) {
            formData.append('productImage', selectedFile);
        }

        console.log("Updating product with data:", {
            productName: productName.trim(),
            productCategory: selectedCategory.tabName,
            productSubCategory: productSubCategoryValue,
            productPrice: productPrice.trim(),
            productDescription: productDescription.trim(),
            shopkeeperId: shopkeeperId,
            hasNewImage: !!selectedFile
        });

        await updateProduct(formData);
    };

    if (isLoading && !originalProductData) {
        return (
            <div className="p-2">
                <ToastContainer />
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">Loading product data...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-2">
            <ToastContainer />

            {/* Header */}
            <div className="border rounded-md p-4 shadow bg-white w-[100%] flex items-center mb-6">
                <button onClick={handleBack} className="text-xl text-black hover:text-gray-600">
                    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19.9997 36.6673C29.2044 36.6673 36.6663 29.2054 36.6663 20.0007C36.6663 10.7959 29.2044 3.33398 19.9997 3.33398C10.7949 3.33398 3.33301 10.7959 3.33301 20.0007C3.33301 29.2054 10.7949 36.6673 19.9997 36.6673Z"
                            stroke="#0D2E28"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M19.9997 13.334L13.333 20.0007L19.9997 26.6673"
                            stroke="#0D2E28"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M26.6663 20H13.333"
                            stroke="#0D2E28"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <h1 className="ml-4 text-xl font-semibold">Edit Big Product</h1>
            </div>

            {/* Main Form */}
            <div className="border rounded-md p-6 shadow bg-white w-[100%]">
                <form onSubmit={handleSubmit}>
                    {/* Product Image */}
                    <div className="flex items-center gap-6 mb-6">
                        <label className="w-[160px] font-semibold">Product Image:</label>
                        <div className="rounded-lg p-2 w-[200px] h-[200px] flex flex-col items-center justify-center relative border border-gray-300">
                            <img
                                src={productImage}
                                alt="Product"
                                className="max-h-[140px] max-w-[140px] object-contain mb-2"
                                onError={(e) => {
                                    e.target.src = editBig;
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="text-sm text-blue-600 hover:text-blue-800 underline"
                            >
                                Change Image
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Product Name */}
                        <div className="flex items-start gap-4">
                            <label className="min-w-[160px] font-semibold pt-2">Product Name:</label>
                            <input
                                type="text"
                                className="bg-[#CED4F2] rounded-md px-4 py-2 w-full outline-none"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                placeholder="Enter product name"
                                required
                            />
                        </div>

                        {/* Product Category */}
                        <div className="flex items-start gap-4">
                            <label className="min-w-[160px] font-semibold pt-2">Product Category:</label>
                            <div className="w-full">
                                <select
                                    className="bg-[#CED4F2] rounded-md px-4 py-2 w-full outline-none"
                                    value={productCategoryId}
                                    onChange={async (e) => {
                                        const categoryId = e.target.value;
                                        setProductCategoryId(categoryId);
                                        setProductSubCategoryValue(""); // Reset subcategory when category changes

                                        // Clear old subcategory options first
                                        setProductSubCategory([]);

                                        if (categoryId) {
                                            await fetchProductSubCategory(categoryId);
                                        }
                                    }}
                                    required
                                >
                                    <option value="">-- Select Category --</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.tabName}
                                        </option>
                                    ))}
                                </select>
                                {categories.length === 0 && (
                                    <div className="text-orange-500 text-sm mt-1">
                                        Note: Categories must exist in admin-tab-management to edit products
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product Sub Category */}
                        <div className="flex items-start gap-4">
                            <label className="min-w-[160px] font-semibold pt-2">Product Sub Category:</label>
                            <div className="w-full">
                                <select
                                    className="bg-[#CED4F2] rounded-md px-4 py-2 w-full outline-none"
                                    value={productSubCategoryValue}
                                    onChange={(e) => setProductSubCategoryValue(e.target.value)}
                                    disabled={!productSubCategory.length}
                                >
                                    <option value="">-- Select Sub-Category (Optional) --</option>
                                    {productSubCategory.map((sub) => (
                                        <option key={sub._id} value={sub.name}>
                                            {sub.name}
                                        </option>
                                    ))}
                                </select>
                                {productCategoryId && productSubCategory.length === 0 && (
                                    <div className="text-gray-500 text-sm mt-1">
                                        No sub-categories available for selected category
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product Price */}
                        <div className="flex items-start gap-4">
                            <label className="min-w-[160px] font-semibold pt-2">Product Price:</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                className="bg-[#CED4F2] rounded-md px-4 py-2 w-full outline-none"
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                                placeholder="Enter product price"
                                required
                            />
                        </div>

                        {/* Product Description */}
                        <div className="flex items-start gap-4">
                            <label className="min-w-[160px] font-semibold pt-2">Product Description:</label>
                            <textarea
                                rows="5"
                                className="bg-[#CED4F2] rounded-md px-4 py-2 w-full outline-none resize-none"
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                placeholder="Enter product description"
                                required
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center mt-6 gap-4">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="bg-[#CED4F2]  px-10 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`px-10 py-2 rounded-lg text-white ${isLoading
                                ? 'bg-[#001580] cursor-not-allowed'
                                : 'bg-[#001580] hover:bg-[#CED4F2]'
                                }`}
                        >
                            {isLoading ? 'Updating...' : 'Update Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BigProductEdit;
