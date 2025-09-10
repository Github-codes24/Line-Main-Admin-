import React, {useState, useRef, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {MdOutlineFileUpload} from "react-icons/md";
import useSmallProduct from "../../../hook/smallproducts/useSmallProduct";
import {useFormik} from "formik";
import * as Yup from "yup";

const SmallProductEdit = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {updateSmallProducts, fetchSmallProductById, getsmallProductById} = useSmallProduct();
    const data = getsmallProductById;
    console.log("Data", data);

    const fileInputRef = useRef(null);

    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        fetchSmallProductById(id);
    }, [id]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            productName: data?.productName || "",
            productCategory: data?.productCategory?._id,
            productPrice: data?.productPrice || "",
            productDescription: data?.productDescription || "",
            productSubCategory: "Painter",
        },
        validationSchema: Yup.object({
            productName: Yup.string().required("Product name is required"),
            productCategory: Yup.string().required("Category is required"),
            productSubCategory: Yup.string().required("Sub-category is required"),
            productPrice: Yup.number().typeError("Price must be a number").required("Price is required"),
            productDescription: Yup.string().required("Description is required"),
        }),
        onSubmit: (values) => {
            const formData = new FormData();

            formData.append("productName", values.productName);
            formData.append("productCategory", values.productCategory);
            formData.append("productPrice", values.productPrice);
            formData.append("productDescription", values.productDescription);
            formData.append("productSubCategory", values.productSubCategory);

            if (imageFile) {
                formData.append("productImage", imageFile);
            }

            updateSmallProducts(id, formData);
        },
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="p-2 font-[Poppins]">
            <div className="flex items-center align-middle mb-4 bg-white rounded-lg shadow-sm p-4">
                <button onClick={() => navigate(-1)} className="text-xl text-black hover:text-gray-600">
                    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <h1 className="ml-4 text-xl font-medium">Edit Small Product</h1>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className="border rounded-lg p-4 shadow-md bg-white">
                    <div className="border border-black p-6 rounded-lg">
                        {/* IMAGE UPLOAD */}
                        <div className="flex items-center gap-4 mb-6">
                            <label className="w-[240px] font-medium text-lg text-[#001580]">Product Image:</label>
                            <div className="border border-[#001580] rounded-3xl p-0 w-[240px] h-[240px] flex flex-col items-center justify-center relative">
                                <img
                                    src={previewImage || data?.productImageUrl}
                                    alt="Product"
                                    className="max-h-full max-w-full object-contain"
                                />
                                <button
                                    type="button"
                                    className="w-[200px] h-[40px] absolute bg-[#00158099] text-white text-base font-medium px-3 py-1 rounded-lg bottom-2"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <MdOutlineFileUpload className="inline-block mr-2" />
                                    Upload Photo
                                </button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        {/* PRODUCT NAME */}
                        <div className="flex items-start gap-4 mb-4">
                            <label className="min-w-[240px] font-medium text-lg text-[#001580] pt-2">
                                Product Name:
                            </label>
                            <input
                                type="text"
                                name="productName"
                                value={formik.values.productName}
                                onChange={formik.handleChange}
                                className="bg-[#CED4F2] border border-[#001580] text-[#001580] text-lg font-medium rounded-lg px-4 py-2 w-full outline-none"
                            />
                        </div>

                        {/* PRODUCT CATEGORY */}
                        <div className="flex items-start gap-4 mb-4">
                            <label className="min-w-[240px] font-medium text-lg text-[#001580] pt-2">
                                Product Category:
                            </label>
                            <input
                                type="text"
                                name="productCategory"
                                value={formik.values.productCategory}
                                onChange={formik.handleChange}
                                className="bg-[#CED4F2] border border-[#001580] text-[#001580] text-lg font-medium rounded-lg px-4 py-2 w-full outline-none"
                            />
                        </div>

                        {/* PRODUCT SUBCATEGORY */}
                        <div className="flex items-start gap-4 mb-4">
                            <label className="min-w-[240px] font-medium text-lg text-[#001580] pt-2">
                                Product Subcategory:
                            </label>
                            <input
                                type="text"
                                name="productSubCategory"
                                value={formik.values.productSubCategory}
                                onChange={formik.handleChange}
                                className="bg-[#CED4F2] border border-[#001580] text-[#001580] text-lg font-medium rounded-lg px-4 py-2 w-full outline-none"
                            />
                        </div>

                        {/* PRODUCT PRICE */}
                        <div className="flex items-start gap-4 mb-4">
                            <label className="min-w-[240px] font-medium text-lg text-[#001580] pt-2">
                                Product Price:
                            </label>
                            <input
                                type="text"
                                name="productPrice"
                                value={formik.values.productPrice}
                                onChange={formik.handleChange}
                                className="bg-[#CED4F2] border border-[#001580] text-[#001580] text-lg font-medium rounded-lg px-4 py-2 w-full outline-none"
                            />
                        </div>

                        {/* PRODUCT DESCRIPTION */}
                        <div className="flex items-start gap-4">
                            <label className="min-w-[240px] font-medium text-lg text-[#001580] pt-2">
                                Product Description:
                            </label>
                            <textarea
                                name="productDescription"
                                rows="5"
                                value={formik.values.productDescription}
                                onChange={formik.handleChange}
                                className="bg-[#CED4F2] border border-[#001580] text-[#001580] text-lg font-medium rounded-lg px-4 py-2 w-full outline-none resize-none"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center mt-6 gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            type="button"
                            className="w-[200px] bg-[#CED4F2] text-[#001580] font-medium border border-[#001580] px-10 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-[200px] bg-[#001580] text-white font-medium px-10 py-2 rounded-lg"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SmallProductEdit;
