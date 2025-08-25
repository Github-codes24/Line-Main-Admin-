import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import addImage from "../../../assets/images/addImage.png";
import { Button } from "../../../components/ui/button";

const BigProductAdd = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [setProductImage] = useState(
    "/uploads/93098cce-43f3-46c5-a324-fd0829edd88f.png"
  );
  const [productName, setProductName] = useState("PVC Wire Cable (Red Colour)");
  const [productCategory, setProductCategory] = useState("Electrician");
  const [productPrice, setProductPrice] = useState("₹499");
  const [productDescription, setProductDescription] = useState(
    "Lorem ipsum dolor sit amet consectetur. Dolor pulvinar aliquet donec in auctor ultrices nunc. In ut ipsum varius egestas dolor senectus. Posuere ut urna ac aliquam. Et tellus consequat consectetur ornare massa augue. Odio mauris."
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6">
      {/* Back Button and Heading */}
      <div className="flex items-center mb-6">
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

      {/* Main Card */}
      <div className="border rounded-xl p-6 shadow bg-white w-[900px]">
        {/* Product Image */}
        <div className="flex items-center gap-6 mb-6">
          <label className="w-[160px] font-semibold">Product Image:</label>
          <div className="rounded-lg p-2 w-[200px] h-[200px] flex flex-col items-center justify-center border border-gray-300 relative">
            <img
              src={addImage}
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
            <button
              onClick={() => fileInputRef.current.click()}
              className="bg-[#001580] text-white text-sm px-4 py-2 rounded-md hover:bg-blue-900"
            >
              Upload Photo
            </button>
          </div>
        </div>

        {/* Editable Fields */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <label className="min-w-[160px] font-semibold pt-2">
              Product Name:
            </label>
            <input
              type="text"
              className="bg-[#E9ECF6] rounded-md px-4 py-2 w-full outline-none"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter Product Name"
            />
          </div>

          <div className="flex items-start gap-4">
            <label className="min-w-[160px] font-semibold pt-2">
              Product Category:
            </label>
            <select
              className="bg-[#E9ECF6] rounded-md px-4 py-2 w-full outline-none"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <option value="">Select Product Category</option>
              <option value="Electrician">Electrician</option>
              <option value="Plumber">Plumber</option>
              <option value="Painter">Painter</option>
            </select>
          </div>

          <div className="flex items-start gap-4">
            <label className="min-w-[160px] font-semibold pt-2">
              Product Price:
            </label>
            <input
              type="text"
              className="bg-[#E9ECF6] rounded-md px-4 py-2 w-full outline-none"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="Enter Price"
            />
          </div>

          <div className="flex items-start gap-4">
            <label className="min-w-[160px] font-semibold pt-2">
              Product Description:
            </label>
            <textarea
              rows="5"
              className="bg-[#E9ECF6] rounded-md px-4 py-2 w-full outline-none resize-none"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Enter Product Description"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-6 gap-4">
          <button className="bg-[#E9ECF6] hover:bg-gray-300 text-gray-800 px-10 py-2 rounded-lg">
            Cancel
          </button>
          <Button className="bg-[#001580] hover:bg-blue-900 text-white px-10 py-2 rounded-lg">
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BigProductAdd;
