import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../../../hook/useFetch";
import useDropdown from "../../../hook/dropdown/useDropdown";
import conf from "../../../config";


const validationSchema = Yup.object({
    name: Yup.string().required("Worker name is required"),
    experties: Yup.string().required("Expertise is required"),
    subCategory: Yup.string().when('experties', {
        is: (val) => val && val !== "",
        then: () => Yup.string().required("Sub-category is required"),
        otherwise: () => Yup.string()
    }),
    contact: Yup.string().required("Email or phone number is required"),
    address: Yup.string()
        .min(10, "Address must be at least 10 characters long")
        .required("Address is required"),
    aadhaarNumber: Yup.string()
        .matches(/^\d{12}$/, "Aadhaar number must be 12 digits")
        .required("Aadhaar number is required"),
    aadhaarCardImage: Yup.mixed()
        .required("Aadhaar card image is required")
        .test(
            "fileType",
            "Only image files are accepted",
            (value) => value && ["image/jpeg", "image/png"].includes(value.type)
        ),
});
const AddWorker = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [fetchData] = useFetch();
    const {
        productCategory,
        productSubCategory,
        setProductSubCategory,
        fetchProductCategory,
        fetchProductSubCategory,
    } = useDropdown();

    // Fetch categories on component mount
    useEffect(() => {
        fetchProductCategory();
    }, []);

    const handleBack = () => {
        navigate(-1);
    };


    const addWorker = async (workerData) => {
        try {
            setIsLoading(true);

            console.log('Adding worker with data:', workerData);
            console.log('API URL:', `${conf.apiBaseUrl}/admin/Worker/add-worker`);

            const result = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}/admin/Worker/add-worker`,
                data: workerData,
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (result.success || result.data || result._id || result.user) {
                console.log('Worker added successfully:', result);
                toast.success(result.message || "Worker added successfully!");
                setTimeout(() => navigate("/admin/workermanagement", { state: { refresh: true } }), 1500);
                return { success: true, data: result };
            } else {
                throw new Error(result.message || "Failed to add worker");
            }
        } catch (error) {
            console.error('Add worker error:', error);
            const errorMessage =
                error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                "Failed to add worker";
            toast.error(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    return (

        <div className="bg-[#E0E9E9] w-full min-h-screen overflow-auto">

            <ToastContainer />
            <div className="bg-white border rounded-md shadow mb-2">
                <div className="flex items-center gap-2 p-4">
                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={handleBack}
                        className="cursor-pointer"
                    >
                        <path
                            d="M20.0007 36.6663C29.2054 36.6663 36.6673 29.2044 36.6673 19.9997C36.6673 10.7949 29.2054 3.33301 20.0007 3.33301C10.7959 3.33301 3.33398 10.7949 3.33398 19.9997C3.33398 29.2044 10.7959 36.6663 20.0007 36.6663Z"
                            stroke="#0D2E28"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M20.0007 13.333L13.334 19.9997L20.0007 26.6663"
                            stroke="#0D2E28"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M26.6673 20H13.334"
                            stroke="#0D2E28"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <h2 className="text-lg font-semibold text-[#0D2E28]">Add New Worker</h2>
                </div>
            </div>

            <div className="bg-white border rounded-md shadow p-4 mt-4 mb-4">

                <Formik
                    initialValues={{
                        name: "",
                        experties: "",
                        subCategory: "",
                        contact: "",
                        address: "",
                        aadhaarNumber: "",
                        aadhaarCardImage: null,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { resetForm, setSubmitting }) => {
                        setSubmitting(true);

                        // Create FormData for file upload
                        const formData = new FormData();

                        // Map form fields to API expected fields
                        formData.append("name", values.name);
                        formData.append("contact", values.contact);
                        formData.append("address", values.address);
                        formData.append("aadhaarNumber", values.aadhaarNumber);
                        // Don't send experties - API doesn't accept it, categoryId is enough

                        // Find category ID from the selected expertise name
                        if (values.experties && productCategory.length > 0) {
                            const selectedCategory = productCategory.find(cat => cat.tabName === values.experties);
                            if (selectedCategory) {
                                formData.append("categoryId", selectedCategory._id);
                            }
                        }

                        // Find subcategory ID from the selected subcategory name
                        if (values.subCategory && productSubCategory.length > 0) {
                            const selectedSubCategory = productSubCategory.find(sub => sub.name === values.subCategory);
                            if (selectedSubCategory) {
                                formData.append("subCategoryId", selectedSubCategory._id);
                            }
                        }

                        // Add file if present
                        if (values.aadhaarCardImage) {
                            formData.append("aadhaarCardImage", values.aadhaarCardImage);
                        }

                        const result = await addWorker(formData); // Send FormData
                        if (result.success) resetForm();

                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form>
                            <div className="border border-[#616666] rounded-md p-8">
                                <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
                                    <label className="w-full md:w-1/4 font-medium text-[#0D2E28] mb-2 md:mb-0">
                                        Worker Name:
                                    </label>
                                    <div className="w-full md:w-3/4">
                                        <Field
                                            name="name"
                                            type="text"
                                            placeholder="Enter Full Name"
                                            className="w-full border border-[#001580] rounded-md px-8 py-2 focus:outline-none bg-[#CED4F2] placeholder-[#0D2E28]"
                                        />
                                        <ErrorMessage
                                            name="name"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
                                    <label className="w-full md:w-1/4 font-medium text-[#0D2E28] mb-2 md:mb-0">
                                        Expertise:
                                    </label>
                                    <div className="w-full md:w-3/4">
                                        <Field name="experties">
                                            {({ field, form }) => (
                                                <select
                                                    {...field}
                                                    className="w-full border border-[#001580] rounded-md px-8 py-2 focus:outline-none bg-[#CED4F2] text-[#0D2E28]"
                                                    onChange={async (e) => {
                                                        const categoryId = e.target.value;
                                                        form.setFieldValue("experties", categoryId);
                                                        form.setFieldValue("subCategory", "");

                                                        // Clear old subcategories
                                                        setProductSubCategory([]);

                                                        // Find the selected category and fetch subcategories
                                                        if (categoryId && productCategory.length > 0) {
                                                            const selectedCategory = productCategory.find(cat => cat.tabName === categoryId);
                                                            if (selectedCategory) {
                                                                await fetchProductSubCategory(selectedCategory._id);
                                                            }
                                                        }
                                                    }}
                                                >
                                                    <option value="">Select Expertise</option>
                                                    {productCategory.map((category) => (
                                                        <option key={category._id} value={category.tabName}>
                                                            {category.tabName}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        </Field>
                                        <ErrorMessage
                                            name="experties"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                </div>

                                {/* Sub Category Field */}
                                <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
                                    <label className="w-full md:w-1/4 font-medium text-[#0D2E28] mb-2 md:mb-0">
                                        Sub Category:
                                    </label>
                                    <div className="w-full md:w-3/4">
                                        <Field
                                            as="select"
                                            name="subCategory"
                                            className="w-full border border-[#001580] rounded-md px-8 py-2 focus:outline-none bg-[#CED4F2] text-[#0D2E28]"
                                            disabled={!productSubCategory.length}
                                        >
                                            <option value="">Select Sub Category</option>
                                            {productSubCategory.map((sub) => (
                                                <option key={sub._id} value={sub.name}>
                                                    {sub.name}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage
                                            name="subCategory"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                        {productSubCategory.length === 0 && (
                                            <div className="text-gray-500 text-sm mt-1">
                                                {productCategory.length > 0 ? "Select expertise first to see sub-categories" : "Loading categories..."}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
                                    <label className="w-full md:w-1/4 font-medium text-[#0D2E28] mb-2 md:mb-0">
                                        Email ID/Phone Number:
                                    </label>
                                    <div className="w-full md:w-3/4">
                                        <Field
                                            name="contact"
                                            type="text"
                                            placeholder="Enter your Email ID/phone number"
                                            className="w-full border border-[#001580] rounded-md px-8 py-2 focus:outline-none bg-[#CED4F2] placeholder-[#0D2E28]"
                                        />
                                        <ErrorMessage
                                            name="contact"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
                                    <label className="w-full md:w-1/4 font-medium text-[#0D2E28] mb-2 md:mb-0">
                                        Address:
                                    </label>
                                    <div className="w-full md:w-3/4">
                                        <Field
                                            name="address"
                                            type="text"
                                            placeholder="Enter complete address with street, area, city, state, and pincode"
                                            className="w-full border border-[#001580] rounded-md px-8 py-2 focus:outline-none bg-[#CED4F2] placeholder-[#0D2E28] resize-none"
                                        />

                                    </div>
                                </div>
                                {/* Aadhaar Number */}
                                <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
                                    <label className="w-full md:w-1/4 font-medium text-[#0D2E28] mb-2 md:mb-0">
                                        Aadhaar Number:
                                    </label>
                                    <div className="w-full md:w-3/4">
                                        <Field
                                            name="aadhaarNumber"
                                            type="text"
                                            placeholder="Enter 12-digit Aadhaar number"
                                            className="w-full border border-[#001580] rounded-md px-8 py-2 focus:outline-none bg-[#CED4F2] placeholder-[#0D2E28]"
                                        />
                                        <ErrorMessage
                                            name="aadhaarNumber"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                </div>

                                {/* Aadhaar Card Image */}
                                <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
                                    <label className="w-full md:w-1/4 font-medium text-[#0D2E28] mb-2 md:mb-0">
                                        Aadhaar Card Image:
                                    </label>
                                    <div className="w-full md:w-3/4">
                                        <div className="flex items-center border border-[#001580] rounded-md bg-[#CED4F2] p-2">
                                            <label className="flex items-center gap-2 bg-[#00158099] text-white px-3 py-2 rounded-md cursor-pointer hover:bg-[#3A57A6] text-sm">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Upload Photo
                                                <input
                                                    name="aadhaarCardImage"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(event) => {
                                                        setFieldValue("aadhaarCardImage", event.currentTarget.files[0]);
                                                    }}
                                                    className="hidden"
                                                />
                                            </label>
                                            <span className="ml-2 text-[#0D2E28] font-medium text-sm">
                                                {/* Show file name if selected, otherwise show default text */}
                                                <Field name="aadhaarCardImage">
                                                    {({ field }) => (
                                                        field.value ? field.value.name : "Upload Aadhaar Card"
                                                    )}
                                                </Field>
                                            </span>
                                        </div>
                                        <ErrorMessage
                                            name="aadhaarCardImage"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center gap-6 mt-8 pt-4">
                                <button
                                    type="reset"
                                    className="w-[200px] h-[40px] border border-[#001580] text-[#001580] rounded-md hover:bg-teal-50 text-sm bg-[#CED4F2]"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || isLoading}
                                    className={`w-[200px] h-[40px] text-white rounded-md text-sm ${isSubmitting || isLoading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-[#001580] hover:bg-[#001580]/90'
                                        }`}
                                >
                                    {isSubmitting || isLoading ? 'Adding...' : 'Add Worker'}
                                </button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddWorker;