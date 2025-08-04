import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BigProductView = () => {
  const navigate = useNavigate();

  // Initial values (can be fetched from API later)
  const [productImage] = useState(
    "/uploads/93098cce-43f3-46c5-a324-fd0829edd88f.png"
  );
  const [productName, setProductName] = useState("PVC Wire Cable (Red Colour)");
  const [productCategory, setProductCategory] = useState("Electrician");
  const [productPrice, setProductPrice] = useState("₹499");
  const [productDescription, setProductDescription] = useState(
    "Lorem ipsum dolor sit amet consectetur. Dolor pulvinar aliquet donec in auctor ultrices nunc. In ut ipsum varius egestas dolor senectus. Posuere ut urna ac aliquam. Et tellus consequat consectetur ornare massa augue. Odio mauris."
  );

  return (
    <div className="p-6">
      {/* Back Button and Heading */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-xl text-black hover:text-gray-600"
        >
          ←
        </button>
        <h1 className="ml-4 text-xl font-semibold">View Big Product</h1>
      </div>

      {/* Left-aligned product view box */}
      <div className="border rounded-xl p-6 shadow bg-white w-[900px]">
        {/* Product Image */}
        <div className="flex items-center gap-6 mb-6">
          <label className="w-[160px] font-semibold">Product Image:</label>
          <div className="border rounded-lg p-2 w-[200px] h-[200px] flex items-center justify-center">
            <img
              src={productImage}
              alt="Product"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <label className="min-w-[160px] font-semibold pt-2">
              Product Name:
            </label>
            <input
              type="text"
              className="bg-teal-100 rounded-md px-4 py-2 w-full outline-none"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div className="flex items-start gap-4">
            <label className="min-w-[160px] font-semibold pt-2">
              Product Category:
            </label>
            <input
              type="text"
              className="bg-teal-100 rounded-md px-4 py-2 w-full outline-none"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            />
          </div>

          <div className="flex items-start gap-4">
            <label className="min-w-[160px] font-semibold pt-2">
              Product Price:
            </label>
            <input
              type="text"
              className="bg-teal-100 rounded-md px-4 py-2 w-full outline-none"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>

          <div className="flex items-start gap-4">
            <label className="min-w-[160px] font-semibold pt-2">
              Product Description:
            </label>
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
          <button className="bg-teal-700 hover:bg-teal-800 text-white px-10 py-2 rounded-lg">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BigProductView;
