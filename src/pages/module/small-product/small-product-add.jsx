import React, {useState, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import BG from "../../../assets/images/BG.png";
import {MdOutlineFileUpload} from "react-icons/md";
import useSmallProduct from "../../../hook/smallproducts/useSmallProduct";
import {useFormik} from "formik";
import * as Yup from "yup";
import useDropdown from "../../../hook/dropdown/useDropdown";

const SmallProductAdd = () => {
    const {createSmallProducts} = useSmallProduct();
    const {productCategory, productSubCategory, setProductSubCategory, fetchProductCategory, fetchProductSubCategory} =
        useDropdown();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [productImage, setProductImage] = useState("");
    const [imageFile, setImageFile] = useState(null);
    console.log("Product category", productCategory);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductImage(URL.createObjectURL(file));
            setImageFile(file);
        }
    };

    const formik = useFormik({
        initialValues: {
            productName: "",
            productCategory: "",
            productPrice: "",
            productDescription: "",
            productSubCategory: "",
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

            createSmallProducts(formData);
        },
    });

    useEffect(() => {
        fetchProductCategory();
    }, []);

    return (
        <div className="p-2 font-[Poppins]">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <div className="flex items-center">
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
                    <h1 className="ml-4 text-xl font-medium">Add New Small Product</h1>
                </div>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className="border rounded-lg p-4 shadow bg-white">
                    <div className="border border-black p-4 rounded-lg">
                        <div className="flex gap-4 mb-6">
                            <label className="w-[240px] font-medium text-lg text-[#001580]">Product Image:</label>
                            <div className="rounded-lg p-0 w-[240px] h-[240px] flex flex-col items-center justify-center relative">
                                <img
                                    src={productImage || BG}
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
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <label className="min-w-[240px] font-medium text-lg text-[#001580] pt-2">
                                    Product Name:
                                </label>
                                <input
                                    type="text"
                                    name="productName"
                                    className="bg-[#CED4F2] border border-[#001580] text-[#001580] text-lg font-medium rounded-lg px-4 py-2 w-full outline-none"
                                    value={formik.values.productName}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {/* Product Category */}
                            <div className="flex items-start gap-4">
                                <label className="min-w-[240px] font-medium text-lg text-[#001580] pt-2">
                                    Product Category:
                                </label>
                                <select
                                    className="bg-[#CED4F2] border border-[#001580] text-[#001580] text-lg font-medium rounded-lg px-4 py-2 w-full outline-none"
                                    name="productCategory"
                                    value={formik.values.productCategory}
                                    onChange={async (e) => {
                                        const categoryId = e.target.value;
                                        formik.setFieldValue("productCategory", categoryId);
                                        formik.setFieldValue("productSubCategory", "");

                                        // Clear old options first
                                        setProductSubCategory([]);

                                        if (categoryId) {
                                            await fetchProductSubCategory(categoryId);
                                        }
                                    }}
                                >
                                    <option value="">-- Select Category --</option>
                                    {productCategory.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.tabName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Product Sub-Category */}
                            <div className="flex items-start gap-4">
                                <label className="min-w-[240px] font-medium text-lg text-[#001580] pt-2">
                                    Product Sub-Category:
                                </label>
                                <select
                                    className="bg-[#CED4F2] border border-[#001580] text-[#001580] text-lg font-medium rounded-lg px-4 py-2 w-full outline-none"
                                    name="productSubCategory"
                                    value={formik.values.productSubCategory}
                                    onChange={formik.handleChange}
                                    disabled={!productSubCategory.length}
                                >
                                    <option value="">-- Select Sub-Category --</option>
                                    {productSubCategory.map((sub) => (
                                        <option key={sub._id} value={sub.name}>
                                            {sub.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-start gap-4">
                                <label className="min-w-[240px] font-medium text-lg text-[#001580] pt-2">
                                    Product Price:
                                </label>
                                <input
                                    type="text"
                                    name="productPrice"
                                    className="bg-[#CED4F2] border border-[#001580] text-[#001580] text-lg font-medium rounded-lg px-4 py-2 w-full outline-none"
                                    value={formik.values.productPrice}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="flex items-start gap-4">
                                <label className="min-w-[240px] font-medium text-lg text-[#001580] pt-2">
                                    Product Description:
                                </label>
                                <textarea
                                    rows="5"
                                    name="productDescription"
                                    className="bg-[#CED4F2] border border-[#001580] text-[#001580] text-lg font-medium rounded-lg px-4 py-2 w-full outline-none resize-none"
                                    value={formik.values.productDescription}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-6 gap-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="w-[200px] bg-[#CECEF2] text-[#001580] border border-[#001580] font-medium px-10 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-[200px] bg-[#001580] text-white font-medium px-10 py-2 rounded-lg"
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SmallProductAdd;
