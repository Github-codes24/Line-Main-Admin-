import React from "react";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import Worker from "../../../components/cards/worker.jsx";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { UploadIcon } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

function ShopEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams(); // Get shop ID from URL
    const [fetchData] = useFetch();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const shop = location.state?.shop;

    // Debug the received data
    console.log('ShopEdit - URL ID:', id);
    console.log('ShopEdit - Shop from state:', shop);
    console.log('ShopEdit - Shop ID from state:', shop?.id);
    console.log('ShopEdit - Shop _id from state:', shop?._id);

    const [formData, setFormData] = React.useState({
        shopName: shop?.shopName || "",
        name: shop?.name || "",
        contact: shop?.contact || "",
        address: shop?.address || "",
        aadhaarNumber: shop?.aadhaarNumber || "",
        aadhaarImage: shop?.aadhaarImage || null,
        gstinNumber: shop?.gstinNumber || "",
        gstinImage: shop?.gstinImage || null,
        experties: "",
    });

    React.useEffect(() => {
        if (id && !shop) {
            fetchShopData(id);
        } else if (id && shop) {
            setFormData({
                shopName: shop.shopName || "",
                 experties: shop.experties || "",
                name: shop.name || shop.ownerName || "",
                contact: shop.contact || "",
                address: shop.address || "",
                aadhaarNumber: shop.aadhaar || shop.aadhaarNumber || "",
                aadhaarImage: shop.aadhaarImage || null,
                gstinNumber: shop.gstin || shop.gstinNumber || "",
                gstinImage: shop.gstinImage || null,
            });
        }
    }, [id, shop]);

    const fetchShopData = async (shopId) => {
        try {
            setIsLoading(true);

            const result = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/admin/shop/get-single-shop/${shopId}`,
            });

            if (result.success && result.data) {
                const shopData = result.data;
                setFormData({
                    shopName: shopData.shopName || "",
                    name: shopData.name || shopData.ownerName || "",
                    contact: shopData.contact || "",
                    address: shopData.address || "",
                    aadhaarNumber: shopData.aadhaar || shopData.aadhaarNumber || "",
                    aadhaarImage: shopData.aadhaarImage || null,
                    gstinNumber: shopData.gstin || shopData.gstinNumber || "",
                    gstinImage: shopData.gstinImage || null,
                });
                toast.success("Shop data loaded successfully");
            } else {
                toast.error("Shop not found or failed to load shop data");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error loading shop data: " + (error.message || "Unknown error"));
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        }
    };

    const updateShop = async (shopData) => {
        try {
            setIsLoading(true);
            setError("");

            const shopId = id || shop?.id || shop?._id;
            if (!shopId) throw new Error("No shop ID available for update");

            const apiData = {
                shopName: shopData.shopName || "",
                ownerName: shopData.name || "",
                contact: shopData.contact || "",
                address: shopData.address || "",
                 experties: shopData.experties || "", 
            };

            if (shopData.aadhaarNumber) apiData.aadhaarNumber = shopData.aadhaarNumber;
            if (shopData.gstinNumber) apiData.gstin = shopData.gstinNumber;

            console.log('Update API URL:', `${conf.apiBaseUrl}/admin/shop/update-shop/${shopId}`);
            console.log('Update API Data:', apiData);

            // Try different URL formats since update-shop is giving 404
            const updateEndpoints = [
                `${conf.apiBaseUrl}/admin/shop/update-shop/${shopId}`,
                `${conf.apiBaseUrl}/admin/Shop/update-shop/${shopId}`, // Try capital S like delete
                `${conf.apiBaseUrl}/admin/shop/edit-shop/${shopId}`,
                `${conf.apiBaseUrl}/admin/Shop/edit-shop/${shopId}`,
                `${conf.apiBaseUrl}/admin/shop/${shopId}`, // RESTful format
                `${conf.apiBaseUrl}/admin/Shop/${shopId}`, // RESTful with capital S
            ];

            let result;
            let lastError;

            for (let i = 0; i < updateEndpoints.length; i++) {
                try {
                    console.log(`Trying endpoint ${i + 1}/${updateEndpoints.length}:`, updateEndpoints[i]);

                    // Try both PUT and PATCH methods
                    try {
                        result = await fetchData({
                            method: "PUT",
                            url: updateEndpoints[i],
                            data: apiData,
                        });
                    } catch (putError) {
                        console.log(`PUT failed for ${updateEndpoints[i]}, trying PATCH:`, putError.message);
                        result = await fetchData({
                            method: "PATCH",
                            url: updateEndpoints[i],
                            data: apiData,
                        });
                    }

                    console.log(`Success with endpoint:`, updateEndpoints[i]);
                    break; // Success, exit loop

                } catch (error) {
                    console.log(`Endpoint ${i + 1} failed:`, error.message || error);
                    lastError = error;

                    // If this is the last endpoint, throw the error
                    if (i === updateEndpoints.length - 1) {
                        throw lastError;
                    }
                }
            }

            console.log('Update API Response:', result);

            if (result.success || result.status === "success" || result.data) {
                toast.success(result.message || "Shop updated successfully!");
                setTimeout(() => navigate(-1), 1500);
            } else {
                throw new Error(result.message || "Failed to update shop");
            }
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || err.message || "Failed to update shop";
            setError(msg);
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateShop(formData);
    };

    return (
       <Box sx={{ width: "100%", minHeight: "auto", display: "flex", flexDirection: "column" }}>
  <ToastContainer />
  <Worker back title="Edit Shop" />
  <Card sx={{ mt: 2 }}>
    <CardContent>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginBottom: 2,
            border: "1px solid black",
            borderRadius: 1,
            padding: 2,
            boxSizing: "border-box",
            paddingBottom: 10,
          }}
        >
          {/* Shop Name */}
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: 500, color: "#0D2E28" }}>Shop Name:</Typography>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
              <TextField
                fullWidth
                type="text"
                placeholder="Enter Shop Name"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                sx={{
                  background: "#CED4F2",
                  "& .MuiInputBase-input": { color: "#0D2E28" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#001580" },
                    "&:hover fieldset": { borderColor: "#001580" },
                    "&.Mui-focused fieldset": { borderColor: "#001580" },
                  },
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
    <TextField
      select
      fullWidth
      name="experties"
      value={formData.experties}
      onChange={handleChange}
      sx={{
        background: "#CED4F2",
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#001580" },
          "&:hover fieldset": { borderColor: "#001580" },
          "&.Mui-focused fieldset": { borderColor: "#001580" },
        },
        "& .MuiSelect-select": { color: "#0D2E28" },
      }}
      SelectProps={{ native: true }}
    >
      <option value="">Select Expertise</option>
      {["Plumber", "Electrician", "Cleaner", "Painter"].map((opt, i) => (
        <option key={i} value={opt}>{opt}</option>
      ))}
    </TextField>
  </Box>
</Box>

          {/* Owner Name */}
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: 500, color: "#0D2E28" }}>Owner Name:</Typography>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
              <TextField
                fullWidth
                type="text"
                placeholder="Enter Owner Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                sx={{
                  background: "#CED4F2",
                  "& .MuiInputBase-input": { color: "#0D2E28" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#001580" },
                    "&:hover fieldset": { borderColor: "#001580" },
                    "&.Mui-focused fieldset": { borderColor: "#001580" },
                  },
                }}
              />
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
                type="text"
                placeholder="Enter Email ID/Phone Number"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                sx={{
                  background: "#CED4F2",
                  "& .MuiInputBase-input": { color: "#0D2E28" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#001580" },
                    "&:hover fieldset": { borderColor: "#001580" },
                    "&.Mui-focused fieldset": { borderColor: "#001580" },
                  },
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
                type="text"
                placeholder="Enter Full Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                sx={{
                  background: "#CED4F2",
                  "& .MuiInputBase-input": { color: "#0D2E28" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#001580" },
                    "&:hover fieldset": { borderColor: "#001580" },
                    "&.Mui-focused fieldset": { borderColor: "#001580" },
                  },
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
                type="text"
                placeholder="Enter Aadhaar Number"
                name="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={handleChange}
                sx={{
                  background: "#CED4F2",
                  "& .MuiInputBase-input": { color: "#0D2E28" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#001580" },
                    "&:hover fieldset": { borderColor: "#001580" },
                    "&.Mui-focused fieldset": { borderColor: "#001580" },
                  },
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
                <input hidden accept="image/*" type="file" name="aadhaarImage" onChange={handleFileChange} />
              </Button>
              <Typography variant="body2" sx={{ ml: 2, color: "#0D2E28", fontWeight: 500 }}>
                {formData.aadhaarImage ? formData.aadhaarImage.name : "Upload Aadhaar Card"}
              </Typography>
            </Box>
          </Box>

          {/* GSTIN Number */}
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: 500, color: "#0D2E28" }}>GSTIN Number:</Typography>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
              <TextField
                fullWidth
                type="text"
                placeholder="Enter GSTIN Number"
                name="gstinNumber"
                value={formData.gstinNumber}
                onChange={handleChange}
                sx={{
                  background: "#CED4F2",
                  "& .MuiInputBase-input": { color: "#0D2E28" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#001580" },
                    "&:hover fieldset": { borderColor: "#001580" },
                    "&.Mui-focused fieldset": { borderColor: "#001580" },
                  },
                }}
              />
            </Box>
          </Box>

          {/* GSTIN Image */}
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: 500, color: "#0D2E28" }}>GSTIN Image:</Typography>
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
                <input hidden accept="image/*" type="file" name="gstinImage" onChange={handleFileChange} />
              </Button>
              <Typography variant="body2" sx={{ ml: 2, color: "#0D2E28", fontWeight: 500 }}>
                {formData.gstinImage ? formData.gstinImage.name : "Upload GSTIN Card"}
              </Typography>
            </Box>
          </Box>
        </Box>

        {error && (
          <Box sx={{ mb: 2, textAlign: "center" }}>
            <Typography color="error" variant="body2">{error}</Typography>
          </Box>
        )}

      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "10px" }}>
  <Button
    variant="outlined"
    sx={{
      width: "200px",
      height: "40px",
      borderColor: "#001580",
      color: "#001580",
      background: "#CECEF2",
      textTransform: "none",
    }}
    onClick={() => navigate(-1)}
  >
    Cancel
  </Button>
  
  <Button
    type="submit"
    variant="outlined"
    disabled={isLoading}
    sx={{
      width: "200px",
      height: "40px",
      background: isLoading ? "gray" : "#001580",
      color: "#FFFFFF",
      textTransform: "none",
      "&:disabled": { background: "#cccccc", color: "#666666" },
    }}
  >
    {isLoading ? "Updating..." : "Update"}
  </Button>
</Box>

      </form>
    </CardContent>
  </Card>
</Box>

    );
}

export default ShopEdit;
