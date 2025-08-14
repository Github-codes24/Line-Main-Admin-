import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import viewBig from "../../../assets/images/viewBigImage.png";

const SmallProductView = () => {
    const navigate = useNavigate();

    // Initial values (can be fetched from API later)
    // const [productImage] = useState(
    //   "/uploads/93098cce-43f3-46c5-a324-fd0829edd88f.png"
    // );
    const [productName, setProductName] = useState("PVC Wire Cable (Red Colour)");
    const [productCategory, setProductCategory] = useState("Electrician");
    const [productPrice, setProductPrice] = useState("₹499");
    const [productDescription, setProductDescription] = useState(
        "Lorem ipsum dolor sit amet consectetur. Dolor pulvinar aliquet donec in auctor ultrices nunc. In ut ipsum varius egestas dolor senectus. Posuere ut urna ac aliquam. Et tellus consequat consectetur ornare massa augue. Odio mauris."
    );

    return (
        <div className="p-2">
            {/* Back Button and Heading */}
            <div className="flex items-center mb-4 bg-white rounded-lg shadow-md p-4">
                <button
                    onClick={() => navigate(-1)}
                    className="text-xl text-black hover:text-gray-600"
                >
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19.9997 36.6673C29.2044 36.6673 36.6663 29.2054 36.6663 20.0007C36.6663 10.7959 29.2044 3.33398 19.9997 3.33398C10.7949 3.33398 3.33301 10.7959 3.33301 20.0007C3.33301 29.2054 10.7949 36.6673 19.9997 36.6673Z"
                            stroke="#0D2E28"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                        <path
                            d="M19.9997 13.334L13.333 20.0007L19.9997 26.6673"
                            stroke="#0D2E28"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                        <path
                            d="M26.6663 20H13.333"
                            stroke="#0D2E28"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                    </svg>
                </button>
                <h1 className="ml-4 text-xl font-semibold">View Small Product</h1>
            </div>

            {/* Left-aligned product view box */}
            <div className="border rounded-xl p-4 shadow-md bg-white">
                <div className="border border-black p-6 rounded-lg">
                    {/* Product Image */}
                    <div className="flex gap-6 mb-6">
                        <label className="w-[240px] font-medium text-lg text-[#0D2E28]">Product Image:</label>
                        <div className="border border-[#007E74] rounded-3xl p-3 w-[240px] h-[240px] flex items-center justify-center">
                            <img
                                src={viewBig}
                                alt="Product"
                                className="max-h-full max-w-full object-contain"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                                Product Name:
                            </label>
                            <input
                                type="text"
                                className="bg-[#E0E9E9] border border-[#007E74] text-[#0D2E28] text-lg font-medium rounded-md px-4 py-2 w-full outline-none"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </div>

                        <div className="flex items-start gap-4">
                            <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                                Product For:
                            </label>
                            <input
                                type="text"
                                className="bg-[#E0E9E9] border border-[#007E74] text-[#0D2E28] text-lg font-medium rounded-md px-4 py-2 w-full outline-none"
                                value={productCategory}
                                onChange={(e) => setProductCategory(e.target.value)}
                            />
                        </div>

                        <div className="flex items-start gap-4">
                            <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                                Product Price:
                            </label>
                            <input
                                type="text"
                                className="bg-[#E0E9E9] border border-[#007E74] text-[#0D2E28] text-lg font-medium rounded-md px-4 py-2 w-full outline-none"
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                            />
                        </div>

                        <div className="flex items-start gap-4">
                            <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                                Product Description:
                            </label>
                            <textarea
                                rows="5"
                                className="bg-[#E0E9E9] border border-[#007E74] text-[#0D2E28] text-lg  font-medium rounded-md px-4 py-2 w-full outline-none resize-none"
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center mt-6 gap-4">
                    <button className="w-[200px] bg-[#007E74] text-white font-medium px-10 py-2 rounded-lg">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SmallProductView;