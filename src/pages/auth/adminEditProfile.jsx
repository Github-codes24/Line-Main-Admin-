import {useEffect, useState} from "react";
import {FiUpload} from "react-icons/fi";
import {toast, ToastContainer} from "react-toastify";
import {useFormik} from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";

import manimage from "../../assets/images/man-image.png";
import useAuth from "../../hook/auth/useAuth";
import conf from "../../config";

const AdminEditProfile = () => {
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const navigate = useNavigate();

    const {loading, getProfile, adminProfile, updateAdminProfile} = useAuth();

    useEffect(() => {
        getProfile();
    }, []);

    // Cleanup photo preview URL on component unmount
    useEffect(() => {
        return () => {
            if (photoPreview) {
                URL.revokeObjectURL(photoPreview);
            }
        };
    }, [photoPreview]);

    const validationSchema = Yup.object({
        fullName: Yup.string().required("Full Name is required"),
        phone: Yup.string()
        .matches(/^(\+91[-\s]?)?[0-9]{10}$/, "Phone number must be 10 digits (with optional +91)")
        .required("Phone number is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullName: adminProfile?.name || "",
            phone: adminProfile?.mobile || "",
            email: adminProfile?.email || "",
        },
        validationSchema: validationSchema,

        onSubmit: async (values, {setSubmitting}) => {
            try {
                setSubmitting(true);
                console.log("=== FORM SUBMISSION STARTED ===");
                console.log("Form values:", values);
                console.log("Form errors:", formik.errors);
                console.log("Form touched:", formik.touched);
                console.log("Form isValid:", formik.isValid);
                console.log("Photo state:", photo ? `Photo selected: ${photo.name}` : "No photo selected");
                
                // Check if form is valid
                if (!formik.isValid) {
                    console.error("Form is not valid:", formik.errors);
                    toast.error("Please fix form errors before submitting");
                    return;
                }
                
                // Validate required fields manually as well
                if (!values.fullName.trim()) {
                    console.error("Full name is empty");
                    toast.error("Full name is required");
                    return;
                }
                if (!values.phone.trim()) {
                    console.error("Phone is empty");
                    toast.error("Phone number is required");
                    return;
                }
                if (!values.email.trim()) {
                    console.error("Email is empty");
                    toast.error("Email is required");
                    return;
                }
                
                console.log("All validations passed, creating FormData...");
                
                console.log("Preparing data for API call...");
                
                if (photo) {
                    // If photo is selected, use FormData
                    console.log("Photo selected, using FormData approach...");
                    const formData = new FormData();
                    formData.append('name', values.fullName.trim());
                    formData.append('mobile', values.phone.trim());
                    formData.append('email', values.email.trim());
                    formData.append('profileImage', photo, photo.name);
                    
                    console.log("FormData created with photo:", {
                        name: photo.name,
                        type: photo.type,
                        size: photo.size
                    });
                    
                    // Log FormData entries for debugging
                    console.log("FormData contents:");
                    for (let pair of formData.entries()) {
                        console.log("FormData entry:", pair[0], pair[0] === 'profileImage' ? `[File: ${photo?.name}]` : pair[1]);
                    }
                    
                    console.log("Calling updateAdminProfile with FormData...");
                    const result = await updateAdminProfile(formData);
                    console.log("updateAdminProfile result:", result);
                    
                    // Clear photo preview after successful upload
                    if (result?.success) {
                        console.log("Upload successful, clearing photo preview...");
                        setPhoto(null);
                        if (photoPreview) {
                            URL.revokeObjectURL(photoPreview);
                        }
                        setPhotoPreview(null);
                    }
                } else {
                    // If no photo, use regular JSON
                    console.log("No photo selected, using JSON approach...");
                    const jsonData = {
                        name: values.fullName.trim(),
                        mobile: values.phone.trim(),
                        email: values.email.trim()
                    };
                    
                    console.log("JSON data:", jsonData);
                    console.log("Calling updateAdminProfile with JSON...");
                    const result = await updateAdminProfile(jsonData);
                    console.log("updateAdminProfile result:", result);
                    
                    // Clear any existing photo preview after successful update
                    if (result?.success) {
                        console.log("Update successful, clearing any photo preview...");
                        setPhoto(null);
                        if (photoPreview) {
                            URL.revokeObjectURL(photoPreview);
                        }
                        setPhotoPreview(null);
                    }
                }
                
            } catch (error) {
                console.error("=== FORM SUBMISSION ERROR ===");
                console.error("Error object:", error);
                console.error("Error message:", error.message);
                console.error("Error stack:", error.stack);
                
                let errorMessage = "Error updating profile";
                if (error.response?.data?.message) {
                    errorMessage = error.response.data.message;
                } else if (error.message) {
                    errorMessage = error.message;
                } else if (typeof error === 'string') {
                    errorMessage = error;
                }
                
                toast.error(errorMessage);
            } finally {
                console.log("=== FORM SUBMISSION ENDED ===");
                setSubmitting(false);
            }
        },
    });
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("Selected file:", file.name, file.type, file.size);
            
            // Check file size (limit to 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size should be less than 5MB");
                e.target.value = ''; // Clear the input
                return;
            }
            
            // Check file type - be more specific about allowed types
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                toast.error("Please select a valid image file (JPEG, PNG, GIF, or WebP)");
                e.target.value = ''; // Clear the input
                return;
            }
            
            setPhoto(file);
            
            // Create preview URL and clean up previous one
            if (photoPreview) {
                URL.revokeObjectURL(photoPreview);
            }
            setPhotoPreview(URL.createObjectURL(file));
            toast.success("Photo selected successfully!");
        }
    };
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#E0E9E9] w-full">
            <ToastContainer />
            {/* Header */}
            <div className="bg-white rounded-lg p-4 mb-4 shadow-md flex items-center gap-2 w-full box-border text-[#0D2E28]">

    <svg
      width="30"
      height="30"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleBack}
      className="cursor-pointer"
    >
      {/* Arrow paths */}
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
    <h2 className="text-xl md:text-2xl font-semibold text-[#0D2E28]">Edit Profile</h2>
  </div>

  {/* Form + Profile Image */}
  <div className="flex-grow bg-white rounded-md shadow-md p-4 md:p-6 w-full box-border">
    {loading ? (
      <div className="text-center min-h-[400px] flex justify-center items-center">
        {/* Loading Spinner */}
      </div>
    ) : (
      <form onSubmit={formik.handleSubmit} className="w-full">
        <div className="flex flex-col md:flex-row gap-6 border border-[#616666] rounded-md p-6 min-h-[400px] w-full box-border flex-wrap">
          
          {/* Left Section - Form Fields */}
          <div className="flex-1 flex flex-col space-y-6 min-w-0">
            {/* Full Name */}
            <div className="flex flex-col sm:flex-row sm:items-start w-full gap-2 sm:gap-4 min-w-0 text-[#0D2E28]">
              <label className="sm:w-40 w-full font-medium sm:pt-2">Full Name:</label>
              <div className="flex-1 w-full min-w-0 text-[#0D2E28]">
                <input
                  type="text"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border border-[#001580] px-3 py-2 rounded-md bg-[#CED4F2] focus:outline-none min-w-0 text-[#0D2E28]"
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.fullName}</div>
                )}
              </div>
            </div>

{/* Phone Number */}
            <div className="flex flex-col sm:flex-row sm:items-start w-full gap-2 sm:gap-4 min-w-0 text-[#0D2E28]">
              <label className="sm:w-40 w-full font-medium sm:pt-2">Phone Number:</label>
              <div className="flex-1 w-full min-w-0 text-[#0D2E28]">
                <input
                  type="text"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border border-[#001580] px-3 py-2 rounded-md bg-[#CED4F2] focus:outline-none min-w-0"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
                )}
              </div>
            </div>

{/* Email */}
            <div className="flex flex-col sm:flex-row sm:items-start w-full gap-2 sm:gap-4 min-w-0 text-[#0D2E28]">
              <label className="sm:w-40 w-full font-medium sm:pt-2">Email ID:</label>
              <div className="flex-1 w-full min-w-0 text-[#0D2E28]">
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border border-[#001580] px-3 py-2 rounded-md bg-[#CED4F2] focus:outline-none min-w-0"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                )}
              </div>
            </div>
</div>

          {/* Right Section - Profile Image + Upload */}
        <div className="flex flex-col items-center md:items-center md:justify-start md:ml-auto w-full md:w-1/3 mt-6 md:mt-0">
  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-[#001580] overflow-hidden">
    <img
      key={photoPreview || adminProfile?.profileImage || 'default'} // Force re-render when photo changes
      src={photoPreview || adminProfile?.profileImage || manimage}
      alt="Profile"
      className="w-full h-full object-cover"
      onError={(e) => {
        console.log("Image load error in edit profile, falling back to default");
        e.target.src = manimage;
      }}
    />
  </div>

  {/* Upload Button */}
  <label className="mt-4 flex items-center justify-center gap-2 bg-[#001580] text-white px-5 py-2 rounded-md cursor-pointer">
    <FiUpload />
    Upload Photo
    <input
      type="file"
      accept="image/*"
      onChange={handlePhotoChange}
      className="hidden"
    />
  </label>
</div>
</div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <button
            type="button"
            onClick={() => {
              formik.resetForm();
              setPhoto(null);
              if (photoPreview) {
                URL.revokeObjectURL(photoPreview);
              }
              setPhotoPreview(null);
              navigate(-1);
            }}
            disabled={formik.isSubmitting || loading}
            className="border border-[#001580] text-[#001580] bg-[#CED4F2] px-6 py-2 rounded-md w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={formik.isSubmitting || loading}
            className={`px-6 py-2 rounded-md w-full md:w-auto ${
              formik.isSubmitting || loading
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-[#001580] text-white hover:bg-blue-700"
            }`}
          >
            {formik.isSubmitting || loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    )}
  </div>
</div>

    );
};

export default AdminEditProfile;
