import React from "react";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import Worker from "../../../components/cards/worker.jsx";
import { useNavigate } from "react-router-dom";
import { UploadIcon } from "lucide-react";
import { addShop } from "../../../config/index.js";

function ShopAdd() {
    const navigate = useNavigate();

    // Form state
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

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            console.log("Form Data being sent:", formData);

            // Map form data to match backend expectations
            const shopAddData = {
                shopName: formData.shopName,
                ownerName: formData.name,
                contact: formData.contact,
                address: formData.address,
                aadhaarNumber: formData.aadhaarNumber
            };

            // Only add GSTIN if it's provided and has valid format
            if (formData.gstinNumber && formData.gstinNumber.trim() !== '') {
                const gstinValue = formData.gstinNumber.trim();
                // Basic GSTIN format validation (15 characters, alphanumeric)
                if (gstinValue.length === 15 && /^[0-9A-Z]+$/.test(gstinValue)) {
                    console.log("Adding valid GSTIN:", gstinValue);
                    shopAddData.gstin = gstinValue;
                } else {
                    console.log("Invalid GSTIN format - skipping. GSTIN must be 15 alphanumeric characters.");
                    setError("GSTIN must be 15 characters long and contain only numbers and capital letters (e.g., 10FPVTT9859K5Z1)");
                    setLoading(false);
                    return;
                }
            } else {
                console.log("Skipping GSTIN - empty");
            }

            // Only add images if they're provided
            if (formData.aadhaarImage) {
                shopAddData.aadhaarImage = formData.aadhaarImage;
            }
            if (formData.gstinImage) {
                shopAddData.gstinImage = formData.gstinImage;
            }

            console.log("Mapped data for backend:", shopAddData);

            const response = await addShop(shopAddData);
            console.log("Shop added successfully:", response);

            // Navigate to shop list on success
            navigate("/admin/shopmanagement");
        } catch (error) {
            console.error("Error adding shop:", error);
            setError(error.message || "Failed to add shop");
        } finally {
            setLoading(false);
        }
    };
    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
            }}
        >
            <Worker back title="Add New Shop" />
            <Card>
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
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3,1fr)",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ fontWeight: 500 }}>Shop Name:</Typography>
                                </Box>
                                <Box sx={{ gridColumn: "span 2" }}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        variant="outlined"
                                        placeholder="Enter Shop Name"
                                        name="shopName"
                                        value={formData.shopName}
                                        onChange={handleChange}
                                        sx={{ background: "#CED4F2" }}
                                        InputProps={{
                                            sx: {
                                                "& input::placeholder": {
                                                    color: "black",
                                                    opacity: 1,
                                                },
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3,1fr)",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ fontWeight: 500 }}>Owner Name:</Typography>
                                </Box>
                                <Box sx={{ gridColumn: "span 2" }}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        variant="outlined"
                                        placeholder="Enter Full Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        sx={{ background: "#CED4F2" }}
                                        InputProps={{
                                            sx: {
                                                "& input::placeholder": {
                                                    color: "black",
                                                    opacity: 1,
                                                },
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3,1fr)",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ fontWeight: 500 }}>Email ID/Phone Number:</Typography>
                                </Box>
                                <Box sx={{ gridColumn: "span 2" }}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        variant="outlined"
                                        placeholder="Enter Email ID/Phone Number"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleChange}
                                        sx={{ background: "#CED4F2" }}
                                        InputProps={{
                                            sx: {
                                                "& input::placeholder": {
                                                    color: "black",
                                                    opacity: 1,
                                                },
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3,1fr)",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ fontWeight: 500 }}>Address:</Typography>
                                </Box>
                                <Box sx={{ gridColumn: "span 2" }}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        variant="outlined"
                                        placeholder="Enter Full Address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        sx={{ background: "#CED4F2" }}
                                        InputProps={{
                                            sx: {
                                                "& input::placeholder": {
                                                    color: "black",
                                                    opacity: 1,
                                                },
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3,1fr)",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ fontWeight: 500 }}>Aadhaar Number:</Typography>
                                </Box>
                                <Box sx={{ gridColumn: "span 2" }}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        variant="outlined"
                                        placeholder="Enter 12 digit Aadhaar number of shop owner"
                                        name="aadhaarNumber"
                                        value={formData.aadhaarNumber}
                                        onChange={handleChange}
                                        sx={{ background: "#CED4F2" }}
                                        InputProps={{
                                            sx: {
                                                "& input::placeholder": {
                                                    color: "black",
                                                    opacity: 1,
                                                },
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3,1fr)",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ fontWeight: 500 }}>Aadhaar Card Image:</Typography>
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
                                            name="aadhaarImage"
                                            onChange={handleFileChange}
                                        />
                                    </Button>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            ml: 2,
                                            color: "#1C1C1C",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {formData.aadhaarImage
                                            ? formData.aadhaarImage.name
                                            : "Upload Aadhaar Card"}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3,1fr)",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ fontWeight: 500 }}>GSTIN Number:</Typography>
                                </Box>
                                <Box sx={{ gridColumn: "span 2" }}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        variant="outlined"
                                        placeholder="Enter GSTIN number"
                                        name="gstinNumber"
                                        value={formData.gstinNumber}
                                        onChange={handleChange}
                                        sx={{ background: "#CED4F2" }}
                                        InputProps={{
                                            sx: {
                                                "& input::placeholder": {
                                                    color: "black",
                                                    opacity: 1,
                                                },
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3,1fr)",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ fontWeight: 500 }}>GSTIN Image:</Typography>
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
                                            name="gstinImage"
                                            onChange={handleFileChange}
                                        />
                                    </Button>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            ml: 2,
                                            color: "#1C1C1C",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {formData.gstinImage
                                            ? formData.gstinImage.name
                                            : "Upload GSTIN Card"}
                                    </Typography>
                                </Box>
                            </Box>
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
                                disabled={loading}
                                sx={{
                                    background: "#001580",
                                    color: "#FFFFFF",
                                    paddingX: 4,
                                    paddingY: "2px",
                                    textTransform: "none",
                                    "&:disabled": {
                                        background: "#cccccc",
                                        color: "#666666"
                                    }
                                }}
                            >
                                {loading ? "Adding..." : "Add Shop"}
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}

export default ShopAdd;
