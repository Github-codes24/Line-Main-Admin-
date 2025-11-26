import {useState, useRef, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {MdOutlineFileUpload} from "react-icons/md";
import useSmallProduct from "../../../hook/smallproducts/useSmallProduct";
import useDropdown from "../../../hook/dropdown/useDropdown";
import {useFormik} from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SmallProductEdit = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {updateSmallProducts, fetchSmallProductById, getsmallProductById, loading} = useSmallProduct();
    const {productCategory, productSubCategory, setProductSubCategory, fetchProductCategory, fetchProductSubCategory} = useDropdown();
    const data = getsmallProductById;
    console.log("Data", data);

    const fileInputRef = useRef(null);

    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchSmallProductById(id);
        fetchProductCategory();
    }, [id]);

    // Fetch subcategories when product data is loaded and has a category
    useEffect(() => {
        if (data?.productCategory?._id) {
            fetchProductSubCategory(data.productCategory._id);
        }
    }, [data?.productCategory?._id]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            productName: data?.productName || "",
            productCategory: data?.productCategory?._id || "",
            productPrice: data?.productPrice || "",
            productDescription: data?.productDescription || "",
            productSubCategory: data?.productSubCategory || "",
        },
        validationSchema: Yup.object({
            productName: Yup.string().required("Product name is required"),
            productCategory: Yup.string().required("Category is required"),
            productSubCategory: Yup.string().when('productCategory', {
                is: (val) => val && productSubCategory.length > 0,
                then: () => Yup.string().required("Sub-category is required"),
                otherwise: () => Yup.string()
            }),
            productPrice: Yup.number().typeError("Price must be a number").positive("Price must be positive").required("Price is required"),
            productDescription: Yup.string().required("Description is required"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setIsSubmitting(true);
                setSubmitting(true);

                // Validate that category exists in admin-tab-management
                const selectedCategory = productCategory.find(cat => cat._id === values.productCategory);
                if (!selectedCategory) {
                    toast.error("Selected category is not valid. Please select a valid category from admin-tab-management.");
                    return;
                }

                // Get shopkeeperId from sessionStorage (logged-in admin ID)
                const shopkeeperId = sessionStorage.getItem("userID") || sessionStorage.getItem("Id");
                
                if (!shopkeeperId) {
                    toast.error("User session expired. Please login again.");
                    return;
                }

                const formData = new FormData();
                formData.append("productName", values.productName);
                formData.append("productCategory", values.productCategory);
                formData.append("productPrice", values.productPrice);
                formData.append("productDescription", values.productDescription);
                formData.append("shopkeeperId", shopkeeperId); // Add required shopkeeperId
                
                // Only append sub-category if it exists and is selected
                if (values.productSubCategory) {
                    formData.append("productSubCategory", values.productSubCategory);
                }

                if (imageFile) {
                    formData.append("productImage", imageFile);
                }

                console.log('Updating small product with data:', {
                    productName: values.productName,
                    productCategory: selectedCategory.tabName,
                    productSubCategory: values.productSubCategory,
                    productPrice: values.productPrice,
                    productDescription: values.productDescription,
                    shopkeeperId: shopkeeperId,
                    hasImage: !!imageFile
                });

                await updateSmallProducts(id, formData);
                
            } catch (error) {
                console.error('Error updating small product:', error);
                toast.error(error.message || 'Failed to update small product');
            } finally {
                setIsSubmitting(false);
                setSubmitting(false);
            }
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
        // <div className="p-2 font-[Poppins]">
        <div className="bg-[#E0E9E9] min-h-screen w-full">
            <ToastContainer />
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
                            <label className="w-[240px] font-medium text-lg text-[#0D2E28]">Product Image</label>
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
                            <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                                Product Name
                            </label>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="productName"
                                    placeholder="Enter product name"
                                    value={formik.values.productName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="bg-[#CED4F2] border border-[#001580] text-[#0D2E28] text-lg font-medium rounded-lg px-4 py-2 w-full outline-none"
                                />
                                {formik.touched.productName && formik.errors.productName && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.productName}</div>
                                )}
                            </div>
                        </div>

                        {/* PRODUCT CATEGORY */}
                        <div className="flex items-start gap-4 mb-4">
                            <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                                Product Category
                            </label>
                            <div className="w-full">
                                <select
                                    className="bg-[#CED4F2] border border-[#001580] text-[#0D2E28] text-lg font-medium rounded-lg px-4 py-2 w-full outline-none"
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
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Select </option>
                                    {productCategory.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.tabName}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.productCategory && formik.errors.productCategory && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.productCategory}</div>
                                )}
                                {productCategory.length === 0 && (
                                    <div className="text-orange-500 text-sm mt-1">
                                        Note: Categories must exist in admin-tab-management to edit products
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* PRODUCT SUBCATEGORY */}
                        <div className="flex items-start gap-4 mb-4">
                            <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                                Product Subcategory
                            </label>
                            <div className="w-full">
                                <select
                                    className="bg-[#CED4F2] border border-[#001580] text-[#0D2E28] text-lg font-medium rounded-lg px-4 py-2 w-full outline-none"
                                    name="productSubCategory"
                                    value={formik.values.productSubCategory}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    disabled={!productSubCategory.length}
                                >
                                    <option value="">Select</option>
                                    {productSubCategory.map((sub) => (
                                        <option key={sub._id} value={sub.name}>
                                            {sub.name}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.productSubCategory && formik.errors.productSubCategory && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.productSubCategory}</div>
                                )}
                                {formik.values.productCategory && productSubCategory.length === 0 && (
                                    <div className="text-gray-500 text-sm mt-1">
                                        No sub-categories available for selected category
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* PRODUCT PRICE */}
                        <div className="flex items-start gap-4 mb-4">
                            <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                                Product Price
                            </label>
                            <div className="w-full">
                                <input
                                    type="number"
                                    name="productPrice"
                                    placeholder="Enter product price"
                                    value={formik.values.productPrice}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    min="0"
                                    step="0.01"
                                    className="bg-[#CED4F2] border border-[#001580] text-[#0D2E28] text-lg font-medium rounded-lg px-4 py-2 w-full outline-none"
                                />
                                {formik.touched.productPrice && formik.errors.productPrice && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.productPrice}</div>
                                )}
                            </div>
                        </div>

                        {/* PRODUCT DESCRIPTION */}
                        <div className="flex items-start gap-4">
                            <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                                Product Description
                            </label>
                            <div className="w-full">
                                <textarea
                                    name="productDescription"
                                    rows="5"
                                    placeholder="Enter product description"
                                    value={formik.values.productDescription}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="bg-[#CED4F2] border border-[#001580] text-[#0D2E28] text-lg font-medium rounded-lg px-4 py-2 w-full outline-none resize-none"
                                />
                                {formik.touched.productDescription && formik.errors.productDescription && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.productDescription}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-6 gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            type="button"
                            className="w-[200px] bg-[#CED4F2] text-[#001580] font-medium border border-[#001580] px-10 py-2 rounded-lg hover:bg-gray-100"
                            disabled={isSubmitting || loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || loading || !formik.isValid}
                            className={`w-[200px] font-medium px-10 py-2 rounded-lg ${
                                isSubmitting || loading || !formik.isValid
                                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                                    : "bg-[#001580] text-white hover:bg-[#CED4F2]"
                            }`}
                        >
                            {isSubmitting || loading ? "Updating..." : "Update"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SmallProductEdit;
