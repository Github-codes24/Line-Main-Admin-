import React, {useState, useRef} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import editBig from "../../../assets/images/editBigImage.png";

const BigProductEdit = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const fileInputRef = useRef(null);
    const {state} = useLocation();

    // ✅ Use data from state if available
    const [productImage, setProductImage] = useState(state?.image || editBig);
    const [productName, setProductName] = useState(state?.name || "");
    const [productCategory, setProductCategory] = useState(state?.category || "");
    const [productPrice, setProductPrice] = useState(state?.price || "");
    const [productDescription, setProductDescription] = useState(state?.description || "");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setProductImage(URL.createObjectURL(file));
    };

    const handleCancel = () => {
        navigate("/admin/bigproduct");
    };

    const handleUpdate = () => {
        // do your update logic here...
        navigate(`/admin/bigproduct/view/${id}`, {
            state: {
                image: productImage,
                name: productName,
                category: productCategory,
                price: productPrice,
                description: productDescription,
            },
        });
    };

    return (
        <div className="p-6">
            {/* Back Button and Heading */}
            <div className="flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="text-xl text-black hover:text-gray-600">
                    {/* ✅ Keeping your original back arrow SVG */}
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

            {/* Left-aligned product edit box */}
            <div className="border rounded-xl p-6 shadow bg-white w-[900px]">
                {/* Product Image */}
                <div className="flex items-center gap-6 mb-6">
                    <label className="w-[160px] font-semibold">Product Image:</label>
                    <div className="rounded-lg p-2 w-[200px] h-[200px] flex flex-col items-center justify-center relative">
                        <img
                            src={productImage}
                            alt="Product"
                            className="max-h-[140px] max-w-[140px] object-contain mb-2"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                </div>

                {/* Editable Fields */}
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Product Name:</label>
                        <input
                            type="text"
                            className="bg-teal-100 rounded-md px-4 py-2 w-full outline-none"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>

                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Product Category:</label>
                        <input
                            type="text"
                            className="bg-teal-100 rounded-md px-4 py-2 w-full outline-none"
                            value={productCategory}
                            onChange={(e) => setProductCategory(e.target.value)}
                        />
                    </div>

                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Product Price:</label>
                        <input
                            type="text"
                            className="bg-teal-100 rounded-md px-4 py-2 w-full outline-none"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                        />
                    </div>

                    <div className="flex items-start gap-4">
                        <label className="min-w-[160px] font-semibold pt-2">Product Description:</label>
                        <textarea
                            rows="5"
                            className="bg-teal-100 rounded-md px-4 py-2 w-full outline-none resize-none"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center mt-6 gap-4">
                    <button
                        onClick={handleCancel}
                        className="bg-teal-100 hover:bg-teal-200 text-teal-700 px-10 py-2 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="bg-teal-700 hover:bg-teal-800 text-white px-10 py-2 rounded-lg"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BigProductEdit;
