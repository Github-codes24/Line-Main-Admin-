import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import viewBig from "../../../assets/images/viewBigImage.png";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const BigProductView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const [fetchData] = useFetch();

    // State management
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({
        productName: '',
        productCategory: '',
        productSubCategory: '',
        productPrice: '',
        productDescription: '',
        productImageUrl: '',
        approvalStatus: '',
        addedBy: '',
        isActive: true,
        createdAt: '',
        updatedAt: ''
    });

    // Check if product data was passed via navigation state
    const passedProductData = location.state?.product;

    useEffect(() => {
        if (passedProductData) {
            let categoryName = '';
            if (passedProductData.productCategory) {
                categoryName = typeof passedProductData.productCategory === 'object'
                    ? passedProductData.productCategory.tabName || passedProductData.productCategory.name || ''
                    : passedProductData.productCategory;
            } else if (passedProductData.category) {
                categoryName = typeof passedProductData.category === 'object'
                    ? passedProductData.category.tabName || passedProductData.category.name || ''
                    : passedProductData.category;
            }

            setProduct({
                productName: passedProductData.productName || '',
                productCategory: categoryName,
                productSubCategory: passedProductData.productSubCategory || '',
                productPrice: passedProductData.productPrice || '',
                productDescription: passedProductData.productDescription || '',
                productImageUrl: passedProductData.productImageUrl || '',
                approvalStatus: passedProductData.approvalStatus || '',
                addedBy: passedProductData.addedBy || '',
                isActive: passedProductData.isActive !== undefined ? passedProductData.isActive : true,
                createdAt: passedProductData.createdAt || '',
                updatedAt: passedProductData.updatedAt || ''
            });
        } else if (id) {
            fetchSingleProduct(id);
        }
    }, [id, passedProductData]);

    const fetchSingleProduct = async (productId) => {
        try {
            setIsLoading(true);

            const result = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/admin/big-products/${productId}`,
            });

            if (result.success || result.data) {
                const productData = result.data || result.product || result;

                let categoryName = '';
                if (productData.productCategory) {
                    categoryName = typeof productData.productCategory === 'object'
                        ? productData.productCategory.tabName || productData.productCategory.name || ''
                        : productData.productCategory;
                } else if (productData.category) {
                    categoryName = typeof productData.category === 'object'
                        ? productData.category.tabName || productData.category.name || ''
                        : productData.category;
                }

                setProduct({
                    productName: productData.productName || '',
                    productCategory: categoryName,
                    productSubCategory: productData.productSubCategory || '',
                    productPrice: productData.productPrice || '',
                    productDescription: productData.productDescription || '',
                    productImageUrl: productData.productImageUrl || '',
                    approvalStatus: productData.approvalStatus || '',
                    addedBy: productData.addedBy || '',
                    isActive: productData.isActive !== undefined ? productData.isActive : true,
                    createdAt: productData.createdAt || '',
                    updatedAt: productData.updatedAt || ''
                });
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

    const handleBack = () => {
        navigate(-1);
    };

    const handleEdit = () => {
        navigate(`/admin/bigproduct/edit/${id}`, {
            state: { product: { ...product, id } }
        });
    };

    if (isLoading) {
        return (
            <div className="p-2">
                <ToastContainer />
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">Loading product details...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-2">
            <ToastContainer />

            {/* Header */}
            <div className="border rounded-md p-4 shadow bg-white w-[100%] flex items-center justify-between mb-6">
                <div className="flex items-center">
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
                    <h1 className="ml-4 text-xl font-semibold">View Big Product</h1>
                </div>

                <button
                    onClick={handleEdit}
                    className="bg-[#001580] hover:bg-blue-900 text-white px-6 py-2 rounded-lg"
                >
                    Edit Product
                </button>
            </div>

            {/* Main Content */}
            <div className="border rounded-md p-6 shadow bg-white w-[100%]">
                {/* Product Image */}
                <div className="flex items-center gap-6 mb-6">
                    <label className="w-[160px] font-semibold">Product Image:</label>
                    <div className="rounded-lg p-2 w-[200px] h-[200px] flex items-center justify-center border border-gray-300">
                        <img
                            src={product.productImageUrl || viewBig}
                            alt="Product"
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                                e.target.src = viewBig;
                            }}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Product Name */}
                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Product Name:</label>
                        <div className="bg-[#E9ECF6] rounded-md px-4 py-2 w-full text-gray-800">
                            {product.productName || 'N/A'}
                        </div>
                    </div>

                    {/* Product Category */}
                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Product Category:</label>
                        <div className="bg-[#E9ECF6] rounded-md px-4 py-2 w-full text-gray-800">
                            {product.productCategory || 'N/A'}
                        </div>
                    </div>

                    {/* Product Sub Category */}
                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Product Sub Category:</label>
                        <div className="bg-[#E9ECF6] rounded-md px-4 py-2 w-full text-gray-800">
                            {product.productSubCategory || 'N/A'}
                        </div>
                    </div>

                    {/* Product Price */}
                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Product Price:</label>
                        <div className="bg-[#E9ECF6] rounded-md px-4 py-2 w-full text-gray-800">
                            {product.productPrice ? `${product.productPrice}` : 'N/A'}
                        </div>
                    </div>

                    {/* Approval Status */}
                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Approval Status:</label>
                        <div className="bg-[#E9ECF6] rounded-md px-4 py-2 w-full text-gray-800">
                            {product.approvalStatus || 'N/A'}
                        </div>
                    </div>

                    {/* Product Status */}
                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Status:</label>
                        <div className="flex items-center">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${product.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                                }`}>
                                {product.isActive ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Product Description:</label>
                        <div className="bg-[#E9ECF6] rounded-md px-4 py-2 w-full text-gray-800 min-h-[120px]">
                            {product.productDescription || 'No description available'}
                        </div>
                    </div>

                    {/* Created Date */}
                    {product.createdAt && (
                        <div className="flex items-start gap-4">
                            <label className="min-w-[160px] font-semibold pt-2">Created Date:</label>
                            <div className="bg-[#E9ECF6] rounded-md px-4 py-2 w-full text-gray-800">
                                {new Date(product.createdAt).toLocaleString()}
                            </div>
                        </div>
                    )}

                    {/* Updated Date */}
                    {product.updatedAt && (
                        <div className="flex items-start gap-4">
                            <label className="min-w-[160px] font-semibold pt-2">Last Updated:</label>
                            <div className="bg-[#E9ECF6] rounded-md px-4 py-2 w-full text-gray-800">
                                {new Date(product.updatedAt).toLocaleString()}
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        onClick={handleBack}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
                    >
                        Back to List
                    </button>
                    <button
                        onClick={handleEdit}
                        className="bg-[#001580] hover:bg-blue-900 text-white px-6 py-2 rounded-lg"
                    >
                        Edit Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BigProductView;
