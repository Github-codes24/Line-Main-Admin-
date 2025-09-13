import React, {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import addImage from "../../../assets/images/addImage.png";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const BigProductAdd = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [fetchData] = useFetch();
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        productName: "",
        productCategory: "",
        productPrice: "",
        productDescription: "",
        productImage: null,
    });
    const [imagePreview, setImagePreview] = useState(null);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
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
        if (!formData.productCategory.trim()) {
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

        try {
            setIsLoading(true);

            // Prepare form data for API
            const submitData = new FormData();
            submitData.append("productName", formData.productName.trim());
            submitData.append("productCategory", formData.productCategory.trim());
            submitData.append("productPrice", formData.productPrice.trim());
            submitData.append("productDescription", formData.productDescription.trim());

            if (formData.productImage) {
                submitData.append("productImage", formData.productImage);
            }

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
                            className="bg-teal-100 rounded-md px-4 py-2 w-full outline-none"
                            value={formData.productName}
                            onChange={handleInputChange}
                            placeholder="Enter product name"
                        />
                    </div>

                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Product Category:</label>
                        <input
                            type="text"
                            name="productCategory"
                            className="bg-teal-100 rounded-md px-4 py-2 w-full outline-none"
                            value={formData.productCategory}
                            onChange={handleInputChange}
                            placeholder="Enter product category"
                        />
                    </div>

                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Product Price:</label>
                        <input
                            type="text"
                            name="productPrice"
                            className="bg-teal-100 rounded-md px-4 py-2 w-full outline-none"
                            value={formData.productPrice}
                            onChange={handleInputChange}
                            placeholder="Enter product price (e.g., ₹499)"
                        />
                    </div>

                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Product Description:</label>
                        <textarea
                            rows="5"
                            name="productDescription"
                            className="bg-teal-100 rounded-md px-4 py-2 w-full outline-none resize-none"
                            value={formData.productDescription}
                            onChange={handleInputChange}
                            placeholder="Enter product description"
                        />
                    </div>
                </div>

                <div className="flex justify-center mt-6 gap-4">
                    <button
                        type="button"
                        className="bg-teal-100 hover:bg-teal-200 text-teal-700 px-10 py-2 rounded-lg"
                        onClick={() => navigate(-1)}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-teal-700 hover:bg-teal-800 text-white px-10 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
