import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import viewBig from "../../../assets/images/viewBigImage.png";
import {BackArrowIcon} from "../../../assets/CommonAssets";

const BigProductView = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const productId = state?.id;

    const [productName, setProductName] = useState("PVC Wire Cable (Red Colour)");
    const [productCategory, setProductCategory] = useState("Electrician");
    const [productPrice, setProductPrice] = useState("₹499");
    const [productDescription, setProductDescription] = useState(
        "Lorem ipsum dolor sit amet consectetur. Dolor pulvinar aliquet donec in auctor ultrices nunc. In ut ipsum varius egestas dolor senectus. Posuere ut urna ac aliquam. Et tellus consequat consectetur ornare massa augue. Odio mauris."
    );

    useEffect(() => {
        document.title = "View Big Product";
    }, []);

    return (
        <div className="p-2">
            <div className="border rounded-md bg-white w-[100%] flex items-center mb-6 p-4 shadow">
                <button onClick={() => navigate(-1)} className="text-xl text-black hover:text-gray-600">
                    <BackArrowIcon />
                </button>
                <h1 className="ml-4 text-xl font-semibold">Edit Big Product</h1>
            </div>

            <div className="border rounded-md p-6 shadow bg-white w-[100%]">
                <div className="flex items-center gap-6 mb-6">
                    <label className="w-[160px] font-semibold">Product Image:</label>
                    <div className="rounded-lg p-2 w-[200px] h-[200px] flex items-center justify-center">
                        <img src={viewBig} alt="Product" className="max-h-full max-w-full object-contain" />
                    </div>
                </div>

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

                <div className="flex justify-center mt-6 gap-4">
                    <button
                        onClick={() => navigate(`/admin/bigproduct/edit/${productId}`, {state})}
                        className="bg-teal-700 hover:bg-teal-800 text-white px-10 py-2 rounded-lg"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BigProductView;
