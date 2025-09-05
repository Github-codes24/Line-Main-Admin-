import React, {useState, useEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import viewBig from "../../../assets/images/viewBigImage.png";
import {getSingleBigProduct} from "../../../config/index.js";

const BigProductView = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {id} = useParams(); // Get product ID from URL
    
    // State management
    const [product, setProduct] = useState(state || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    // Individual field states for display
    const [productName, setProductName] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productImage, setProductImage] = useState(viewBig);

    // Fetch product data from API
    const fetchProduct = async (productId) => {
        setLoading(true);
        setError("");
        
        try {
            console.log("Fetching big product with ID:", productId);
            const response = await getSingleBigProduct(productId);
            
            if (response.success) {
                const productData = response.data;
                setProduct(productData);
                
                // Set individual field states
                setProductName(productData.productName || "");
                setProductCategory(productData.productCategory || "");
                setProductPrice(productData.productPrice || "");
                setProductDescription(productData.productDescription || productData.description || "");
                setProductImage(productData.productImage || viewBig);
                
                console.log("Big product data loaded:", productData);
            } else {
                setError(response.message || "Failed to fetch big product details");
            }
        } catch (error) {
            console.error("Error fetching big product:", error);
            setError("Failed to load big product details");
        } finally {
            setLoading(false);
        }
    };

    // Load product data on component mount if not already available
    useEffect(() => {
        if (!product && id) {
            fetchProduct(id);
        } else if (product) {
            // If product data is passed via state, set the field states
            setProductName(product.productName || product.name || "");
            setProductCategory(product.productCategory || product.category || "");
            setProductPrice(product.productPrice || product.price || "");
            setProductDescription(product.productDescription || product.description || "");
            setProductImage(product.productImage || product.image || viewBig);
        }
    }, [id, product]);

    // Loading state
    if (loading) {
        return (
            <div className="p-6">
                <div className="flex items-center mb-6">
                    <button onClick={() => navigate(-1)} className="text-xl text-black hover:text-gray-600">
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
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="p-6">
                <div className="flex items-center mb-6">
                    <button onClick={() => navigate(-1)} className="text-xl text-black hover:text-gray-600">
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
                <div className="text-center py-8">
                    <div className="text-red-600 text-lg font-semibold mb-4">{error}</div>
                    <button 
                        onClick={() => navigate(-1)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-2">
            <div className="border rounded-md p-4 shadow bg-white w-[100%] flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="text-xl text-black hover:text-gray-600">
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

            <div className="border rounded-md p-6 shadow bg-white w-[100%]">
                <div className="flex items-center gap-6 mb-6">
                    <label className="w-[160px] font-semibold">Product Image:</label>
                    <div className="rounded-lg p-2 w-[200px] h-[200px] flex items-center justify-center border border-gray-300">
                        <img 
                            src={productImage} 
                            alt="Product" 
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                                e.target.src = viewBig; // Fallback to default image
                            }}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Product Name:</label>
                        <input
                            type="text"
                            className="bg-[#E9ECF6] rounded-md px-4 py-2 w-full outline-none"
                            value={productName}
                            readOnly
                        />
                    </div>

                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Product Category:</label>
                        <input
                            type="text"
                            className="bg-[#E9ECF6] rounded-md px-4 py-2 w-full outline-none"
                            value={productCategory}
                            readOnly
                        />
                    </div>

                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Product Price:</label>
                        <input
                            type="text"
                            className="bg-[#E9ECF6] rounded-md px-4 py-2 w-full outline-none"
                            value={`₹${productPrice}`}
                            readOnly
                        />
                    </div>

                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Product Description:</label>
                        <textarea
                            rows="5"
                            className="bg-[#E9ECF6] rounded-md px-4 py-2 w-full outline-none resize-none"
                            value={productDescription}
                            readOnly
                        />
                    </div>
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => navigate(`/admin/bigproduct/edit/${id}`, {
                            state: {
                                ...product,
                                // Ensure field mapping consistency for edit form
                                name: productName,
                                category: productCategory,
                                price: productPrice,
                                description: productDescription,
                                image: productImage
                            }
                        })}
                        className="bg-[#001580] hover:bg-blue-900 text-white px-10 py-2 rounded-lg"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BigProductView;
