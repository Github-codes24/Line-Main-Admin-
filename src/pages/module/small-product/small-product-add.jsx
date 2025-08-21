import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BG from "../../../assets/images/BG.png";
import { MdOutlineFileUpload } from "react-icons/md";

const SmallProductAdd = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [setProductImage] = useState(
    "/uploads/93098cce-43f3-46c5-a324-fd0829edd88f.png"
  );
  const [productName, setProductName] = useState("Enter Product Name");
  const [productCategory, setProductCategory] = useState("Enter Product Category");
  const [productPrice, setProductPrice] = useState("Enter Price");
  const [productDescription, setProductDescription] = useState("Enter Product Description");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-2">
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        {/* Back Button and Heading */}
        <div className="flex items-center">
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
          <h1 className="ml-4 text-xl font-semibold">Add New Small Product</h1>
        </div>
      </div>

      {/* Left-aligned product view box */}
      <div className="border rounded-lg p-4 shadow bg-white">
        <div className="border border-black p-4 rounded-lg">
          {/* Product Image */}
          <div className="flex gap-4 mb-6">
            <label className="w-[240px] font-medium text-lg text-[#001580]">Product Image:</label>
            <div className=" rounded-lg p-0 w-[240px] h-[240px] flex flex-col items-center justify-center relative">
              <img
                src={BG}
                alt="Product"
                onClick={() => fileInputRef.current.click()}
                className="min-h-[240px] w-[240px] object-cover mb-2 cursor-pointer border-2 border-[#001580] rounded-3xl"
              />
              <button
                className="w-[200px] h-[40px] top-50 right-50 absolute bg-[#00158099] text-white text-base font-medium px-3 py-1 rounded-lg"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                type="button"
              >
                <div className="relative left-4">
                  <MdOutlineFileUpload className="absolute h-6 w-6 left-2 top-1/2 transform -translate-y-1/2" />
                  Upload Photo
                </div>
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden cursor-pointer"
              />
              {/* <button
              onClick={() => fileInputRef.current.click()}
              className="bg-teal-400 text-white text-sm px-3 py-1 rounded-md hover:bg-gray-500"
            >
              Upload Photo
            </button> */}
            </div>
          </div>

          {/* Editable Fields */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <label className="min-w-[240px] font-medium text-lg text-[#001580] pt-2">
                Product Name:
              </label>
              <input
                type="text"
                className="bg-[#CED4F2] border border-[#001580] text-[#001580] text-lg font-medium rounded-lg px-4 py-2 w-full outline-none"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="flex items-start gap-4">
              <label className="min-w-[240px] font-medium text-lg text-[#001580] pt-2">
                Product Category:
              </label>
              <input
                type="text"
                className="bg-[#CED4F2] border border-[#001580] text-[#001580] text-lg  font-medium rounded-lg px-4 py-2 w-full outline-none"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
              />
            </div>

            <div className="flex items-start gap-4">
              <label className="min-w-[240px] font-medium text-lg text-[#001580] pt-2">
                Product Price:
              </label>
              <input
                type="text"
                className="bg-[#CED4F2] border border-[#001580] text-[#001580] text-lg  font-medium rounded-lg px-4 py-2 w-full outline-none"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>

            <div className="flex items-start gap-4">
              <label className="min-w-[240px] font-medium text-lg text-[#001580] pt-2">
                Product Description:
              </label>
              <textarea
                rows="5"
                className="bg-[#CED4F2] border border-[#001580] text-[#001580] text-lg  font-medium rounded-lg px-4 py-2 w-full outline-none resize-none"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-[200px] bg-[#CECEF2] text-[#001580] border border-[#001580] font-medium px-10 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate("/admin/smallproduct/small-product-list")}
            className="w-[200px] bg-[#001580] text-white font-medium px-10 py-2 rounded-lg"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmallProductAdd;