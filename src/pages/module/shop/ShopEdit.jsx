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
    const shop = location.state?.shop;

    // Keep editable form state
    const [formData, setFormData] = React.useState({
        shopName: shop?.shopName || "",
        name: shop?.name || "",
        contact: shop?.contact || "",
        address: shop?.address || "",
        aadhaarNumber: shop?.aadhaarNumber || "",
        aadhaarImage: shop?.aadhaarImage || null,
        gstinNumber: shop?.gstinNumber || "",
        gstinImage: shop?.gstinImage || null,
    });

    // Fetch shop data when component mounts (if not passed via state)
    React.useEffect(() => {
        console.log('ShopEdit mounted with:');
        console.log('ID from useParams:', id);
        console.log('Shop from location state:', shop);
        console.log('Current URL:', window.location.href);

        if (id && !shop) {
            // If we have an ID but no shop data, fetch it from API
            fetchShopData(id);
        } else if (id && shop) {
            console.log('Shop data already available, using it');
            // Update form data with existing shop data
            setFormData({
                shopName: shop.shopName || "",
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
            console.log('Fetching shop data for ID:', shopId);

            // Try multiple possible endpoints for fetching shop data
            const possibleGetEndpoints = [
                `${conf.apiBaseUrl}/admin/shop/get-single-shop/${shopId}`,
                `${conf.apiBaseUrl}/admin/shop/get-shop/${shopId}`,
                `${conf.apiBaseUrl}/admin/shop/${shopId}`,
            ];

            let result = null;
            let lastError = null;

            for (const endpoint of possibleGetEndpoints) {
                try {
                    console.log('Trying GET endpoint:', endpoint);
                    result = await fetchData({
                        method: "GET",
                        url: endpoint,
                    });
                    console.log('Success with GET endpoint:', endpoint);
                    break;
                } catch (error) {
                    console.log('Failed with GET endpoint:', endpoint, error.response?.data?.message);
                    lastError = error;
                    continue;
                }
            }

            if (!result) {
                throw lastError || new Error('All GET endpoints failed');
            }

            console.log('Fetch shop result:', result);

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
                toast.success('Shop data loaded successfully');
            } else {
                toast.error('Shop not found or failed to load shop data');
            }
        } catch (error) {
            console.error('Error fetching shop data:', error);
            toast.error('Error loading shop data: ' + (error.response?.data?.message || error.message));
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

            // Debug: Check what ID we're using
            console.log('Shop ID from URL params:', id);
            console.log('Shop data from location state:', shop);

            // Use the shop ID from URL params or location state
            const shopId = id || shop?.id || shop?._id;
            console.log('Using shop ID:', shopId);

            if (!shopId) {
                throw new Error('No shop ID available for update');
            }

            // Use the exact field names from the successful Add Shop API response
            const apiData = {
                shopName: shopData.shopName || "",
                ownerName: shopData.name || "", // Backend expects ownerName
                contact: shopData.contact || "",
                address: shopData.address || ""
            };

            // Only add optional fields if they have values
            if (shopData.aadhaarNumber) {
                apiData.aadhaarNumber = shopData.aadhaarNumber;
            }
            if (shopData.gstinNumber) {
                apiData.gstin = shopData.gstinNumber; // Backend uses 'gstin' not 'gstinNumber'
            }

            console.log('Sending minimal API data:', apiData);
            console.log('API URL:', `${conf.apiBaseUrl}/admin/shop/update-shop/${shopId}`);

            const result = await fetchData({
                method: "PUT",
                url: `${conf.apiBaseUrl}/admin/shop/update-shop/${shopId}`,
                data: apiData
            });

            console.log('API Response:', result);

            if (result.success || result.status === 'success' || result.data) {
                toast.success(result.message || "Shop updated successfully!");
                setTimeout(() => {
                    navigate(-1); // Navigate back to shop list
                }, 1500);
                return { success: true, data: result };
            } else {
                throw new Error(result.message || 'Failed to update shop');
            }
        } catch (error) {
            console.error('Error updating shop:', error);
            console.error('Full error response:', error.response);
            console.error('Error response data:', error.response?.data);
            console.error('Error response status:', error.response?.status);

            // More detailed error handling
            let errorMessage = 'Failed to update shop';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (error.response?.data) {
                // If the error response data is a string or has other structure
                errorMessage = typeof error.response.data === 'string'
                    ? error.response.data
                    : JSON.stringify(error.response.data);
            } else if (error.message) {
                errorMessage = error.message;
            }

            console.error('Final error message:', errorMessage);
            toast.error(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Debug: Log form data before submission
        console.log('Form data being submitted:', formData);
        console.log('Shop ID being used:', id);

        await updateShop(formData);
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
            <Worker back title="Edit Shop" />
            <Card>
                <CardContent>
                    <form>
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
                            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
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
                                            sx: { "& input::placeholder": { color: "black", opacity: 1 } },
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ fontWeight: 500 }}>Owner Name:</Typography>
                                </Box>
                                <Box sx={{ gridColumn: "span 2" }}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        variant="outlined"
                                        placeholder="Enter Owner Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        sx={{ background: "#CED4F2" }}
                                        InputProps={{
                                            sx: { "& input::placeholder": { color: "black", opacity: 1 } },
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
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
                                            sx: { "& input::placeholder": { color: "black", opacity: 1 } },
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
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
                                            sx: { "& input::placeholder": { color: "black", opacity: 1 } },
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ fontWeight: 500 }}>Aadhaar Number:</Typography>
                                </Box>
                                <Box sx={{ gridColumn: "span 2" }}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        variant="outlined"
                                        placeholder="Enter Aadhaar Number"
                                        name="aadhaarNumber"
                                        value={formData.aadhaarNumber}
                                        onChange={handleChange}
                                        sx={{ background: "#CED4F2" }}
                                        InputProps={{
                                            sx: { "& input::placeholder": { color: "black", opacity: 1 } },
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
                                        <input hidden accept="image/*" type="file" name="aadhaarImage" />
                                    </Button>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            ml: 2,
                                            color: "#1C1C1C",
                                            fontWeight: 500,
                                        }}
                                    >
                                        "Upload Aadhaar Card"
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ fontWeight: 500 }}>GSTIN Number:</Typography>
                                </Box>
                                <Box sx={{ gridColumn: "span 2" }}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        variant="outlined"
                                        placeholder="Enter GSTIN Number"
                                        name="gstinNumber"
                                        value={formData.gstinNumber}
                                        onChange={handleChange}
                                        sx={{ background: "#CED4F2" }}
                                        InputProps={{
                                            sx: { "& input::placeholder": { color: "black", opacity: 1 } },
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
                                        <input hidden accept="image/*" type="file" name="gstinImage" />
                                    </Button>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            ml: 2,
                                            color: "#1C1C1C",
                                            fontWeight: 500,
                                        }}
                                    >
                                        "Upload GSTIN Card"
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        {error && (
                            <Box sx={{mb: 2, textAlign: "center"}}>
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
                                    px: 4,
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
                                    px: 4,
                                    textTransform: "none",
                                    "&:disabled": {
                                        background: "#cccccc",
                                        color: "#666666",
                                    },
                                }}
                            >
                                {isLoading ? 'Updating...' : 'Update'}
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}

export default ShopEdit;
