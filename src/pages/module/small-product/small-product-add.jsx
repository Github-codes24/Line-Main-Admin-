import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BG from "../../../assets/images/BG.png";
import { MdOutlineFileUpload } from "react-icons/md";
import useSmallProduct from "../../../hook/smallproducts/useSmallProduct";
import { useFormik } from "formik";
import * as Yup from "yup";
import useDropdown from "../../../hook/dropdown/useDropdown";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SmallProductAdd = () => {
  const { createSmallProducts, loading } = useSmallProduct();
  const {
    productCategory,
    productSubCategory,
    setProductSubCategory,
    fetchProductCategory,
    fetchProductSubCategory,
  } = useDropdown();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [productImage, setProductImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  // Unified input class for inputs, textarea, and selects
  const inputClass =
    "bg-[#E4E5EB] border border-[#001580] text-[#0D2E28] text-lg font-medium rounded-lg px-4 py-2 w-full outline-none focus:outline-none placeholder:text-[#0D2E28] placeholder:font-medium";

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
      productSubCategory: Yup.string().when("productCategory", {
        is: (val) => val && productSubCategory.length > 0,
        then: () => Yup.string().required("Sub-category is required"),
        otherwise: () => Yup.string(),
      }),
      productPrice: Yup.number()
        .typeError("Price must be a number")
        .positive("Price must be positive")
        .required("Price is required"),
      productDescription: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        setIsSubmitting(true);
        setSubmitting(true);

        const selectedCategory = productCategory.find(
          (cat) => cat._id === values.productCategory
        );
        if (!selectedCategory) {
          toast.error("Selected category is not valid.");
          return;
        }

        const shopkeeperId =
          sessionStorage.getItem("userID") || sessionStorage.getItem("Id");
        if (!shopkeeperId) {
          toast.error("User session expired.");
          return;
        }

        const formData = new FormData();
        formData.append("productName", values.productName);
        formData.append("productCategory", values.productCategory);
        formData.append("productPrice", values.productPrice);
        formData.append("productDescription", values.productDescription);
        formData.append("shopkeeperId", shopkeeperId);

        if (values.productSubCategory) {
          formData.append("productSubCategory", values.productSubCategory);
        }

        if (imageFile) {
          formData.append("productImage", imageFile);
        }

        await createSmallProducts(formData);
        resetForm();
        setProductImage("");
        setImageFile(null);
      } catch (error) {
        toast.error(error.message || "Failed to add small product");
      } finally {
        setIsSubmitting(false);
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    fetchProductCategory();
  }, []);

  return (
    <div className="bg-[#E0E9E9] min-h-screen w-full">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-xl text-[#0D2E28] hover:text-gray-600"
          >
            {/* SVG Back Icon */}
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
          <h1 className="ml-4 text-xl font-medium">Add New Small Product</h1>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="border rounded-lg p-4 shadow bg-white">
          <div className="border border-[#0D2E28] p-4 rounded-lg">
            {/* Product Image */}
            <div className="flex gap-4 mb-6">
              <label className="w-[240px] font-medium text-lg text-[#0D2E28]">
                Product Image
              </label>
              <div className="rounded-lg p-0 w-[240px] h-[240px] flex flex-col items-center justify-center relative">
                <img
                  src={productImage || BG}
                  alt="Product"
                  onClick={() => fileInputRef.current.click()}
                  className="min-h-[240px] w-[240px] object-cover mb-2 cursor-pointer border-2 border-[#001580] rounded-3xl"
                />
                <button
                  className="w-[200px] h-[40px] top-50 right-50 absolute bg-[#00158099] text-white text-base font-medium px-3 py-1 rounded-lg"
                  onClick={() =>
                    fileInputRef.current && fileInputRef.current.click()
                  }
                  type="button"
                >
                  <MdOutlineFileUpload className="absolute h-6 w-6 left-2 top-1/2 transform -translate-y-1/2" />
                  Upload Photo
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
              {/* Product Name */}
              <div className="flex items-start gap-4">
                <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                  Product Name
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Enter product name"
                    {...formik.getFieldProps("productName")}
                    className={inputClass}
                  />
                  {formik.touched.productName && formik.errors.productName && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.productName}
                    </div>
                  )}
                </div>
              </div>

              {/* Product Category */}
              <div className="flex items-start gap-4">
                <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                  Product Category
                </label>
                <div className="w-full">
                  <select
                    {...formik.getFieldProps("productCategory")}
                    className={inputClass}
                    onChange={async (e) => {
                      formik.setFieldValue("productCategory", e.target.value);
                      formik.setFieldValue("productSubCategory", "");
                      setProductSubCategory([]);
                      if (e.target.value) {
                        await fetchProductSubCategory(e.target.value);
                      }
                    }}
                  >
                    <option value="">Select</option>
                    {productCategory.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.tabName}
                      </option>
                    ))}
                  </select>
                  {formik.touched.productCategory &&
                    formik.errors.productCategory && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.productCategory}
                      </div>
                    )}
                </div>
              </div>

              {/* Product Sub-Category */}
              <div className="flex items-start gap-4">
                <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                  Product Sub-Category
                </label>
                <div className="w-full">
                  <select
                    {...formik.getFieldProps("productSubCategory")}
                    className={inputClass}
                    disabled={!productSubCategory.length}
                  >
                    <option value="">Select</option>
                    {productSubCategory.map((s) => (
                      <option key={s._id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.productSubCategory &&
                    formik.errors.productSubCategory && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.productSubCategory}
                      </div>
                    )}
                </div>
              </div>

              {/* Product Price */}
              <div className="flex items-start gap-4">
                <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                  Product Price
                </label>
                <div className="w-full">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Enter product price"
                    {...formik.getFieldProps("productPrice")}
                    className={inputClass}
                  />
                  {formik.touched.productPrice &&
                    formik.errors.productPrice && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.productPrice}
                      </div>
                    )}
                </div>
              </div>

              {/* Product Description */}
              <div className="flex items-start gap-4">
                <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                  Product Description
                </label>
                <div className="w-full">
                  <textarea
                    rows="5"
                    placeholder="Enter product description"
                    {...formik.getFieldProps("productDescription")}
                    className={`${inputClass} resize-none`}
                  />
                  {formik.touched.productDescription &&
                    formik.errors.productDescription && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.productDescription}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center mt-6 gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-[200px] bg-[#CECEF2] text-[#001580] border border-[#001580] font-medium px-10 py-2 rounded-lg hover:bg-gray-100"
              disabled={isSubmitting || loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className={`w-[200px] font-medium px-10 py-2 rounded-lg bg-[#001580] text-white hover:bg-[#001580cc] transition-colors`}
            >
              {isSubmitting || loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SmallProductAdd;
