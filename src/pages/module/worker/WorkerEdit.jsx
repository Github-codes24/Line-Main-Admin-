import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { UploadIcon } from "lucide-react";
import Worker from "../../../components/cards/worker.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "../../../hook/useFetch";
import useDropdown from "../../../hook/dropdown/useDropdown";
import conf from "../../../config";

function WorkerEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fetchData] = useFetch();
  const [loading, setLoading] = useState(false);
  const {
    productCategory,
    productSubCategory,
    setProductSubCategory,
    fetchProductCategory,
    fetchProductSubCategory,
  } = useDropdown();

  // form states
  const [workerData, setWorkerData] = useState({
    name: "",
    experties: "", // Will store category ID
    subCategory: "", // Will store subcategory name
    subCategoryId: "", // Store the subcategory ID
    contact: "",
    address: "",
    aadhaarNumber: "",
    aadhaarCardImage: null,
  });

  const [originalData, setOriginalData] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    fetchProductCategory();
  }, []);

  // Fetch subcategories when worker data is loaded and has a category
  useEffect(() => {
    if (originalData?.category) {
      fetchProductSubCategory(originalData.category);
    }
  }, [originalData?.category]);

  // Resolve subcategory name from ID when subcategories are loaded
  useEffect(() => {
    if (productSubCategory.length > 0 && workerData.subCategoryId && !workerData.subCategory) {
      const foundSubCategory = productSubCategory.find(sub => sub._id === workerData.subCategoryId);
      if (foundSubCategory) {
        setWorkerData(prev => ({ ...prev, subCategory: foundSubCategory.name }));
      }
    }
  }, [productSubCategory, workerData.subCategoryId, workerData.subCategory]);



  // fetch worker details for pre-fill
  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const result = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/admin/Worker/get-single-worker/${id}`,
        });

        if (result.success) {
          const data = result.user || result.data || result.worker;
          console.log('Worker data in edit:', data);

          // Store original data for reference - same as small-product-edit
          setOriginalData(data);

          // Set form data based on actual API response structure
          const newWorkerData = {
            name: data.name || "",
            experties: data.category || "", // Use category ID for the select
            subCategory: "", // Will be resolved from subCategory ID
            subCategoryId: data.subCategory || "", // Store subcategory ID
            contact: data.contact || data.phone || data.email || "",
            address: data.address || "",
            aadhaarNumber: data.aadhaarNumber || data.aadhaar || "",
            aadhaarCardImage: data.aadhaarCardImageUrl || data.aadhaarCardImage || data.aadhaarImage || null,
          };

          console.log('Setting worker data:', newWorkerData);
          setWorkerData(newWorkerData);
        } else {
          toast.error(result.message || "Failed to fetch worker details");
        }
      } catch (err) {
        console.error("Error fetching worker:", err);
        toast.error(err.response?.data?.message || err.message || "Failed to fetch worker details");
      }
    };

    if (id) {
      fetchWorker();
    }
  }, [id, fetchData]);

  // This effect is now handled in the previous useEffect, so we can remove this one

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkerData({
      ...workerData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setWorkerData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { name, experties, contact, address } = workerData;
    if (!name || !experties || !contact || !address) {
      toast.error("Please fill all required fields!");
      return;
    }

    setLoading(true);

    try {
      // Create FormData for file upload (similar to WorkerAdd)
      const formData = new FormData();
      formData.append("name", workerData.name);
      formData.append("contact", workerData.contact);
      formData.append("address", workerData.address);
      formData.append("aadhaarNumber", workerData.aadhaarNumber);
      // Don't send experties - API doesn't accept it, categoryId is enough

      // Add categoryId directly if expertise holds id, else resolve from name
      if (workerData.experties) {
        if (typeof workerData.experties === 'string' && workerData.experties.length === 24) {
          formData.append("categoryId", workerData.experties);
        } else if (productCategory.length > 0) {
          const selectedCategory = productCategory.find(cat => cat.tabName === workerData.experties);
          if (selectedCategory) {
            formData.append("categoryId", selectedCategory._id);
          }
        }
      }

      // Use the stored subcategory ID
      if (workerData.subCategoryId) {
        formData.append("subCategoryId", workerData.subCategoryId);
      }

      // Only append file if it's a new file (File object)
      if (workerData.aadhaarCardImage && workerData.aadhaarCardImage instanceof File) {
        formData.append("aadhaarCardImage", workerData.aadhaarCardImage);
      }

      const result = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}/admin/Worker/update-worker/${id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (result.success) {
        toast.success(result.message || "Worker updated successfully!");
        navigate("/admin/workermanagement");
      } else {
        toast.error(result.message || "Failed to update worker");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.response?.data?.message || err.message || "Failed to update worker");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{

        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#E0E9E9",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        color: "#0D2E28",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
      }}
    >
      <Worker back title="Edit Worker" />

      <Card sx={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        // minHeight: "600px"
      }}>
        <CardContent sx={{ padding: "24px" }}>
          <form onSubmit={handleUpdate}>
            <Box
              sx={{

                display: "flex",
                flexDirection: "column",
                gap: 2,
                marginBottom: 2,
                border: "1px solid #616666",
                borderRadius: 1,
                padding: 3,          // slightly more space all around
                paddingBottom: 5,    //  extra space at bottom if needed
                boxSizing: "border-box",


              }}
            >


              {/* Worker Name */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: 500, color: "#0D2E28" }}>Worker Name:</Typography>
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                  <TextField
                    fullWidth
                    name="name"
                    type="text"
                    variant="outlined"
                    placeholder="Enter Full Name"
                    value={workerData.name}
                    onChange={handleChange}
                    sx={{
                      background: "#CED4F2",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#001580" },
                        "&:hover fieldset": { borderColor: "#001580" },
                        "&.Mui-focused fieldset": { borderColor: "#001580" },
                      },
                      input: { color: "#0D2E28" },
                    }}
                  />
                </Box>
              </Box>

              {/* Expertise */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: 500, color: "#0D2E28" }}>Expertise:</Typography>
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                  <Select
                    fullWidth
                    displayEmpty
                    variant="outlined"
                    name="experties"
                    value={workerData.experties || ""}
                    onChange={async (e) => {
                      const selectedCategoryId = e.target.value;
                      const selectedCategory = productCategory.find(cat => cat._id === selectedCategoryId);

                      // Update expertise and reset subcategory - same as small-product-edit
                      setWorkerData(prev => ({
                        ...prev,
                        experties: selectedCategoryId,
                        subCategory: "",
                        subCategoryId: "",
                      }));

                      // Clear current subcategory list and fetch new based on selected category id
                      setProductSubCategory([]);
                      if (selectedCategoryId) {
                        await fetchProductSubCategory(selectedCategoryId);
                      }
                    }}
                    disabled={!productCategory.length}
                    sx={{
                      background: "#CED4F2",
                      color: "#0D2E28",
                      "& .MuiOutlinedInput-notchedOutline": { borderColor: "#001580" },
                      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#001580" },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#001580" },
                    }}
                  >
                    <MenuItem value="">Select Expertise</MenuItem>
                    {productCategory.map((category) => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.tabName}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Box>

              {/* Sub Category */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: 500, color: "#0D2E28" }}>Sub Category:</Typography>
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                  <Select
                    fullWidth
                    displayEmpty
                    variant="outlined"
                    name="subCategory"
                    value={workerData.subCategory || ""}
                    onChange={(e) => {
                      const subCategoryName = e.target.value;
                      const selectedSubCategory = productSubCategory.find(sub => sub.name === subCategoryName);
                      setWorkerData(prev => ({
                        ...prev,
                        subCategory: subCategoryName,
                        subCategoryId: selectedSubCategory ? selectedSubCategory._id : ""
                      }));
                    }}
                    disabled={!productSubCategory.length}
                    sx={{
                      background: "#CED4F2",
                      color: "#0D2E28",
                      "& .MuiOutlinedInput-notchedOutline": { borderColor: "#001580" },
                      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#001580" },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#001580" },
                    }}
                  >
                    <MenuItem value="">Select</MenuItem>
                    {productSubCategory.map((sub) => (
                      <MenuItem key={sub._id} value={sub.name}>
                        {sub.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {workerData.experties && productSubCategory.length === 0 && (
                    <Typography variant="body2" sx={{ color: "#666", mt: 1, fontSize: "12px" }}>
                      No sub-categories available for selected expertise
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Contact */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: 500, color: "#0D2E28" }}>Email ID/Phone Number:</Typography>
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                  <TextField
                    fullWidth
                    name="contact"
                    type="text"
                    variant="outlined"
                    placeholder="Enter Email ID/Phone Number"
                    value={workerData.contact}
                    onChange={handleChange}
                    sx={{
                      background: "#CED4F2",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#001580" },
                        "&:hover fieldset": { borderColor: "#001580" },
                        "&.Mui-focused fieldset": { borderColor: "#001580" },
                      },
                      input: { color: "#0D2E28" },
                    }}
                  />
                </Box>
              </Box>

              {/* Address */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: 500, color: "#0D2E28" }}>Address:</Typography>
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                  <TextField
                    fullWidth
                    name="address"
                    type="text"
                    variant="outlined"
                    placeholder="Enter Full Address"
                    value={workerData.address}
                    onChange={handleChange}
                    sx={{
                      background: "#CED4F2",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#001580" },
                        "&:hover fieldset": { borderColor: "#001580" },
                        "&.Mui-focused fieldset": { borderColor: "#001580" },
                      },
                      input: { color: "#0D2E28" },
                    }}
                  />
                </Box>
              </Box>

              {/* Aadhaar Number */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: 500, color: "#0D2E28" }}>Aadhaar Number:</Typography>
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                  <TextField
                    fullWidth
                    name="aadhaarNumber"
                    type="text"
                    variant="outlined"
                    placeholder="Enter 12-digit Aadhaar Number"
                    value={workerData.aadhaarNumber}
                    onChange={handleChange}
                    sx={{
                      background: "#CED4F2",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#001580" },
                        "&:hover fieldset": { borderColor: "#001580" },
                        "&.Mui-focused fieldset": { borderColor: "#001580" },
                      },
                      input: { color: "#0D2E28" },
                    }}
                  />
                </Box>
              </Box>

              {/* Aadhaar Image */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: 500, color: "#0D2E28" }}>Aadhaar Card Image:</Typography>
                </Box>
                <Box
                  sx={{
                    gridColumn: "span 2",
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #001580",
                    borderRadius: "3px",
                    background: "#CED4F2",
                    padding: "8px 8px",
                  }}
                >
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<UploadIcon size={16} />}
                    sx={{
                      background: "#00158099",
                      textTransform: "none",
                      fontSize: "14px",
                      boxShadow: "none",
                      borderRadius: 2.5,
                      "&:hover": { background: "#3A57A6" },
                    }}
                  >
                    Upload Photo
                    <input hidden accept="image/*" type="file" name="aadhaarCardImage" onChange={handleFileChange} />
                  </Button>
                  <Typography variant="body2" sx={{ ml: 2, color: "#0D2E28", fontWeight: 500 }}>
                    {workerData.aadhaarCardImage ? workerData.aadhaarCardImage.name : "Upload Aadhaar Card"}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Buttons */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "24px",
                marginTop: "32px",
                paddingTop: "16px",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  width: "200px",
                  height: "40px",
                  borderColor: "#001580",
                  color: "#001580",
                  backgroundColor: "#CED4F2",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#B8C4F0",
                    borderColor: "#001580",
                  }
                }}
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  width: "200px",
                  height: "40px",
                  backgroundColor: "#001580",
                  color: "#FFFFFF",
                  textTransform: "none",
                  fontWeight: 500,
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#000d66",
                    boxShadow: "none",
                  },
                  "&:disabled": {
                    backgroundColor: "#cccccc",
                    color: "#666666",
                  }
                }}
              >
                {loading ? "Updating..." : "Update"}
              </Button>
            </Box>

          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WorkerEdit;