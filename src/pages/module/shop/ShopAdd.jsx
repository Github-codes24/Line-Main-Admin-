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

            // Prepare API data with exact field names the backend expects
            const apiData = {
                shopName: shopData.shopName || "",
                ownerName: shopData.name || "", // Backend only accepts ownerName, not name
                contact: shopData.contact || "",
                address: shopData.address || ""
            };

            // Only add optional fields if they have values
            if (shopData.aadhaarNumber) {
                apiData.aadhaarNumber = shopData.aadhaarNumber;
            }
            if (shopData.gstinNumber) {
                apiData.gstin = shopData.gstinNumber; // Backend uses gstin, not gstinNumber
            }

            console.log('Adding shop with data:', apiData);
            console.log('API URL:', `${conf.apiBaseUrl}/admin/shop/add-shop`);

            const result = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}/admin/shop/add-shop`,
                data: apiData
            });

            console.log('Add shop API response:', result);

            if (result.success || result.status === 'success' || result.data) {
                toast.success(result.message || "Shop added successfully!");
                setTimeout(() => {
                    navigate("/admin/shopmanagement"); // Navigate back to shop list
                }, 1500);
                return { success: true, data: result };
            } else {
                throw new Error(result.message || 'Failed to add shop');
            }
        } catch (error) {
            console.error('Error adding shop:', error);
            console.error('Full error response:', error.response);
            console.error('Error response data:', error.response?.data);

            // Handle error messages
            let errorMessage = 'Failed to add shop';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (error.response?.data) {
                errorMessage = typeof error.response.data === 'string'
                    ? error.response.data
                    : JSON.stringify(error.response.data);
            } else if (error.message) {
                errorMessage = error.message;
            }

            toast.error(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.shopName || !formData.name || !formData.contact || !formData.address) {
            toast.error("Please fill in all required fields (Shop Name, Owner Name, Contact, Address)");
            return;
        }

        console.log('Form data being submitted:', formData);
        await addShop(formData);
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
            <ToastContainer />
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
                                            ? formData.aadhaarImage.name || formData.aadhaarImage
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
                                            ? formData.gstinImage.name || formData.gstinImage
                                            : "Upload GSTIN Card"}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

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
                                    background: isLoading ? "#gray" : "#001580",
                                    color: "#FFFFFF",
                                    paddingX: 4,
                                    paddingY: "2px",
                                    textTransform: "none",
                                }}
                            >
                                {isLoading ? 'Adding...' : 'Add Shop'}
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}

export default ShopAdd;
