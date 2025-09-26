import React from "react";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import Worker from "../../../components/cards/worker.jsx";
import { useNavigate } from "react-router-dom";
import { UploadIcon } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

function ShopAdd() {
    const navigate = useNavigate();
    const [fetchData] = useFetch();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const [formData, setFormData] = React.useState({
        shopName: "",
        name: "",
        contact: "",
        address: "",
        aadhaarNumber: "",
        aadhaarImage: null,
        gstinNumber: "",
        gstinImage: null,
    });

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

    const addShop = async (shopData) => {
        try {
            setIsLoading(true);
            setError("");

            const formDataObj = new FormData();
            formDataObj.append("shopName", shopData.shopName);
            formDataObj.append("ownerName", shopData.name);
            formDataObj.append("contact", shopData.contact);
            formDataObj.append("address", shopData.address);

            if (shopData.aadhaarNumber) formDataObj.append("aadhaarNumber", shopData.aadhaarNumber);
            if (shopData.aadhaarImage) formDataObj.append("aadhaarImage", shopData.aadhaarImage);
            if (shopData.gstinNumber) formDataObj.append("gstin", shopData.gstinNumber);
            if (shopData.gstinImage) formDataObj.append("gstinImage", shopData.gstinImage);

            const result = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}/admin/shop/add-shop`,
                data: formDataObj,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (result.success || result.status === "success" || result.data) {
                toast.success(result.message || "Shop added successfully!");
                setTimeout(() => {
                    navigate("/admin/shopmanagement");
                }, 1500);
            } else {
                throw new Error(result.message || "Failed to add shop");
            }
        } catch (err) {
            console.error("Error adding shop:", err);
            let errorMessage = err.response?.data?.message || err.message || "Failed to add shop";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.shopName || !formData.name || !formData.contact || !formData.address) {
            toast.error("Please fill in all required fields (Shop Name, Owner Name, Contact, Address)");
            return;
        }

        await addShop(formData);
    };

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "auto",
                display: "flex",
                flexDirection: "column",
                //  gap: 2,
            }}
        >
            <ToastContainer />
            <Worker back title="Add New Shop" />
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
                            {/* Function to generate input rows */}
                            {[
                                { label: "Shop Name", name: "shopName", placeholder: "Enter Shop Name" },
                                { label: "Owner Name", name: "name", placeholder: "Enter Full Name" },
                                { label: "Email ID/Phone Number", name: "contact", placeholder: "Enter Email/Phone" },
                                { label: "Address", name: "address", placeholder: "Enter Full Address" },
                                { label: "Aadhaar Number", name: "aadhaarNumber", placeholder: "Enter 12-digit Aadhaar Number" },
                                { label: "GSTIN Number", name: "gstinNumber", placeholder: "Enter GSTIN number" },
                            ].map((field, idx) => (
                                <Box
                                    key={idx}
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(3,1fr)",
                                        gap: 2,
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography sx={{ fontWeight: 500 }}>{field.label}:</Typography>
                                    </Box>
                                    <Box sx={{ gridColumn: "span 2" }}>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            variant="outlined"
                                            placeholder={field.placeholder}
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            sx={{ background: "#CED4F2" }}
                                            InputProps={{
                                                sx: {
                                                    "& input::placeholder": { color: "black", opacity: 1 },
                                                },
                                            }}
                                        />
                                    </Box>
                                </Box>
                            ))}

                            {/* File upload fields */}
                            {[
                                { label: "Aadhaar Card Image", name: "aadhaarImage", text: "Upload Aadhaar Card" },
                                { label: "GSTIN Image", name: "gstinImage", text: "Upload GSTIN Card" },
                            ].map((fileField, idx) => (
                                <Box
                                    key={idx}
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(3,1fr)",
                                        gap: 2,
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography sx={{ fontWeight: 500 }}>{fileField.label}:</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            gridColumn: "span 2",
                                            display: "flex",
                                            alignItems: "center",
                                            border: "1px solid #A3AED0",
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
                                            <input
                                                hidden
                                                accept="image/*"
                                                type="file"
                                                name={fileField.name}
                                                onChange={handleFileChange}
                                            />
                                        </Button>
                                        <Typography
                                            variant="body2"
                                            sx={{ ml: 2, color: "#1C1C1C", fontWeight: 500 }}
                                        >
                                            {formData[fileField.name]
                                                ? formData[fileField.name].name || formData[fileField.name]
                                                : fileField.text}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>

                        {error && (
                            <Box sx={{ mb: 2, textAlign: "center" }}>
                                <Typography color="error" variant="body2">
                                    {error}
                                </Typography>
                            </Box>
                        )}

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            <Button
                                variant="outlined"
                                sx={{
                                    borderColor: "#001580",
                                    color: "#001580",
                                    background: "#CECEF2",
                                    paddingX: 4,
                                    paddingY: "2px",
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
                                    background: isLoading ? "gray" : "#001580",
                                    color: "#FFFFFF",
                                    paddingX: 4,
                                    paddingY: "2px",
                                    textTransform: "none",
                                    "&:disabled": {
                                        background: "#cccccc",
                                        color: "#666666",
                                    },
                                }}
                            >
                                {isLoading ? "Adding..." : "Add Shop"}
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}

export default ShopAdd;
