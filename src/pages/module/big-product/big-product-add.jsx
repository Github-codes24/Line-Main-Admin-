import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import addImage from "../../../assets/images/addImage.png";
import useFetch from "../../../hook/useFetch";
import useDropdown from "../../../hook/dropdown/useDropdown";
import conf from "../../../config";

const BigProductAdd = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [fetchData] = useFetch();
    const [isLoading, setIsLoading] = useState(false);
    const { productCategory, productSubCategory, setProductSubCategory, fetchProductCategory, fetchProductSubCategory } = useDropdown();

    // Form state
    const [formData, setFormData] = useState({
        productName: "",
        productCategory: "",
        productSubCategory: "",
        productPrice: "",
        productDescription: "",
        productImage: null,
    });

    const [imagePreview, setImagePreview] = useState(null);

    // Fetch categories on component mount
    useEffect(() => {
        fetchProductCategory();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCategoryChange = async (e) => {
        const categoryId = e.target.value;
        setFormData((prev) => ({
            ...prev,
            productCategory: categoryId,
            productSubCategory: "", // Reset subcategory when category changes
        }));

        // Clear old subcategory options first
        setProductSubCategory([]);

        if (categoryId) {
            await fetchProductSubCategory(categoryId);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                productImage: file,
            }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.productName.trim()) {
            toast.error("Product name is required");
            return;
        }
        if (!formData.productCategory) {
            toast.error("Product category is required");
            return;
        }
        if (!formData.productPrice.trim()) {
            toast.error("Product price is required");
            return;
        }
        if (!formData.productDescription.trim()) {
            toast.error("Product description is required");
            return;
        }

        // Validate that category exists in admin-tab-management
        const selectedCategory = productCategory.find(cat => cat._id === formData.productCategory);
        if (!selectedCategory) {
            toast.error("Selected category is not valid. Please select a valid category from admin-tab-management.");
            return;
        }

        try {
            setIsLoading(true);

            // Get shopkeeperId from sessionStorage (logged-in admin ID)
            const shopkeeperId = sessionStorage.getItem("userID") || sessionStorage.getItem("Id");

            if (!shopkeeperId) {
                toast.error("User session expired. Please login again.");
                return;
            }

            // Prepare form data for API
            const submitData = new FormData();
            submitData.append("productName", formData.productName.trim());
            submitData.append("productCategory", formData.productCategory); // Send category ID
            submitData.append("productPrice", formData.productPrice.trim());
            submitData.append("productDescription", formData.productDescription.trim());
            submitData.append("shopkeeperId", shopkeeperId); // Add required shopkeeperId

            // Only append sub-category if it exists and is selected
            if (formData.productSubCategory) {
                submitData.append("productSubCategory", formData.productSubCategory);
            }

            if (formData.productImage) {
                submitData.append("productImage", formData.productImage);
            }

            console.log('Submitting big product with data:', {
                productName: formData.productName,
                productCategory: selectedCategory.tabName,
                productSubCategory: formData.productSubCategory,
                productPrice: formData.productPrice,
                productDescription: formData.productDescription,
                shopkeeperId: shopkeeperId,
                hasImage: !!formData.productImage
            });

            const result = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}/admin/big-products`,
                data: submitData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (result.success || result.status === "success" || result.data) {
                toast.success(result.message || "Big Product added successfully!");
                setTimeout(() => {
                    navigate("/admin/bigproduct");
                }, 1500);
            } else {
                throw new Error(result.message || "Failed to add big product");
            }
        } catch (error) {
            console.error("Error adding big product:", error);

            let errorMessage = "Failed to add big product";
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

    return (
        <div className="p-2">
            <ToastContainer />
            <div className="border rounded-xl p-4 shadow bg-white w-[100%] flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="text-xl text-black hover:text-gray-600">
                    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19.9997 36.6673C29.2044 36.6673 36.6663 29.2054 36.6663 20.0007C36.6663 10.7959 29.2044 3.33398 19.9997 3.33398C10.7949 3.33398 3.33301 10.7959 3.33301 20.0007C3.33301 29.2054 10.7949 36.6673 19.9997 36.6673Z"
                            stroke="#0D2E28"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        <path
                            d="M19.9997 13.334L13.333 20.0007L19.9997 26.6673"
                            stroke="#0D2E28"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        <path
                            d="M26.6663 20H13.333"
                            stroke="#0D2E28"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                </button>
                <h1 className="ml-4 text-xl font-semibold">Add New Big Product</h1>
            </div>

            <div className="border rounded-xl p-6 shadow bg-white w-[100%]">
                <div className="flex items-center gap-6 mb-6">
                    <label className="w-[160px] font-semibold">Product Image:</label>
                    <div
                        className="rounded-lg p-2 w-[200px] h-[200px] flex flex-col items-center justify-center relative border-2 border-dashed border-gray-300 cursor-pointer hover:border-gray-400"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <img
                            src={imagePreview || addImage}
                            alt="Product"
                            className="max-h-[140px] max-w-[140px] object-contain mb-2"
                        />
                        <span className="text-sm text-gray-500">Click to upload image</span>
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
                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Product Name:</label>
                        <input
                            type="text"
                            name="productName"
                            className="bg-[#CED4F2] rounded-md px-4 py-2 w-full outline-none"
                            value={formData.productName}
                            onChange={handleInputChange}
                            placeholder="Enter product name"
                        />
                    </div>

                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Product Category:</label>
                        <div className="w-full">
                            <select
                                name="productCategory"
                                className="bg-[#CED4F2] rounded-md px-4 py-2 w-full outline-none"
                                value={formData.productCategory}
                                onChange={handleCategoryChange}
                            >
                                <option value="">Select Category</option>
                                {productCategory.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.tabName}
                                    </option>
                                ))}
                            </select>
                            {productCategory.length === 0 && (
                                <div className="text-orange-500 text-sm mt-1">
                                    Note: Categories must exist in admin-tab-management to add products
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Product Sub Category:</label>
                        <div className="w-full">
                            <select
                                name="productSubCategory"
                                className="bg-[#CED4F2] rounded-md px-4 py-2 w-full outline-none"
                                value={formData.productSubCategory}
                                onChange={handleInputChange}
                                disabled={!productSubCategory.length}
                            >
                                <option value="">Select Sub-Category  </option>
                                {productSubCategory.map((sub) => (
                                    <option key={sub._id} value={sub.name}>
                                        {sub.name}
                                    </option>
                                ))}
                            </select>
                            {formData.productCategory && productSubCategory.length === 0 && (
                                <div className="text-gray-500 text-sm mt-1">
                                    No sub-categories available for selected category
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Product Price:</label>
                        <input
                            type="number"
                            name="productPrice"
                            className="bg-[#CED4F2] rounded-md px-4 py-2 w-full outline-none"
                            value={formData.productPrice}
                            onChange={handleInputChange}
                            placeholder="Enter product price"
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Product Description:</label>
                        <textarea
                            rows="5"
                            name="productDescription"
                            className="bg-[#CED4F2] rounded-md px-4 py-2 w-full outline-none resize-none"
                            value={formData.productDescription}
                            onChange={handleInputChange}
                            placeholder="Enter product description"
                        />
                    </div>
                </div>

                <div className="flex justify-center mt-6 gap-4">
                    <button
                        type="button"
                        className="bg-[#CED4F2]  px-10 py-2 rounded-lg"
                        onClick={() => navigate(-1)}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-[#001580] hover:bg-[#CED4F2] text-white px-10 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Adding..." : "Add Product"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BigProductAdd;
