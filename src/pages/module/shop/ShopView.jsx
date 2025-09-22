import React from "react";
import { Box, Button, Card, CardContent, TextField, Typography, CircularProgress } from "@mui/material";
import Worker from "../../../components/cards/worker.jsx";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

function ShopView() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { id } = useParams(); // Get shop ID from URL
    const [fetchData] = useFetch();

    // State management
    const [shop, setShop] = React.useState(state?.shop || null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    // Fetch shop data if not provided via state or if data is incomplete
    React.useEffect(() => {
        if (id && (!shop || !shop.aadhaarNumber)) {
            // Fetch full data if no shop data or if essential fields are missing
            fetchShopData(id);
        }
    }, [id, shop]);

    const fetchShopData = async (shopId) => {
        try {
            setLoading(true);
            setError("");

            console.log("Fetching shop data for ID:", shopId);

            // Try multiple possible endpoints and ID formats
            const endpoints = [
                `${conf.apiBaseUrl}/admin/shop/get-single-shop/${shopId}`,
                `${conf.apiBaseUrl}/admin/shop/get-shop/${shopId}`,
                `${conf.apiBaseUrl}/admin/shop/${shopId}`,
            ];

            let result = null;
            let success = false;

            for (const endpoint of endpoints) {
                try {
                    console.log("Trying endpoint:", endpoint);
                    result = await fetchData({
                        method: "GET",
                        url: endpoint,
                    });

                    if (result && result.success && result.data) {
                        console.log("Shop data loaded successfully from:", endpoint);
                        console.log("Full shop data:", result.data);
                        setShop(result.data);
                        success = true;
                        break;
                    }
                } catch (err) {
                    console.log("Failed with endpoint:", endpoint, err.message);
                    continue;
                }
            }

            if (!success) {
                console.log("All endpoints failed, keeping existing shop data");
                // If API fails but we have basic data from navigation, keep it
                if (shop && shop.shopName) {
                    console.log("Using basic shop data from navigation");
                    return;
                }
                setError("Shop not found or failed to load shop data");
            }
        } catch (error) {
            console.error("Error loading shop data:", error);
            setError("Error loading shop data: " + (error.message || "Unknown error"));
        } finally {
            setLoading(false);
        }
    };

    const ImagePreviewBox = ({ label, src, alt, fallback }) => (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontWeight: 500 }}>{label}</Typography>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
                <Box
                    sx={{
                        width: 200,
                        height: 120,
                        border: "1px solid #ccc",
                        borderRadius: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#fff",
                        cursor: src ? "pointer" : "default",
                    }}
                    onClick={() => {
                        if (src) window.open(src, "_blank");
                    }}
                >
                    {src ? (
                        <img
                            src={src}
                            alt={alt}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                                borderRadius: "4px",
                            }}
                        />
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            {fallback}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );

    // Show loading state
    if (loading) {
        return (
            <Box
                sx={{
                    width: "100%",
                    minHeight: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 4,
                }}
            >
                <CircularProgress />
                <Typography>Loading shop data...</Typography>
            </Box>
        );
    }

    // Show error state
    if (error) {
        return (
            <Box
                sx={{
                    width: "100%",
                    minHeight: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 4,
                }}
            >
                <Worker back title="View Shop" />
                <Typography color="error" variant="h6">
                    {error}
                </Typography>
                <Button onClick={() => navigate(-1)} variant="contained">
                    Go Back
                </Button>
            </Box>
        );
    }

    // Show shop not found state
    if (!shop) {
        return (
            <Box
                sx={{
                    width: "100%",
                    minHeight: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 4,
                }}
            >
                <Worker back title="View Shop" />
                <Typography color="error" variant="h6">
                    Shop not found
                </Typography>
                <Button onClick={() => navigate(-1)} variant="contained">
                    Go Back
                </Button>
            </Box>
        );
    }

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
            <Worker back title="View Shop" />
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
                                        value={shop.shopName || ""}
                                        variant="outlined"
                                        sx={{ background: "#CED4F2" }}
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
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
                                        value={shop.ownerName || ""}
                                        variant="outlined"
                                        sx={{ background: "#CED4F2" }}
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
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
                                        value={shop.contact || ""}
                                        variant="outlined"
                                        sx={{ background: "#CED4F2" }}
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
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
                                        value={shop.address || ""}
                                        variant="outlined"
                                        sx={{ background: "#CED4F2" }}
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
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
                                        value={shop.aadhaarNumber || ""}
                                        variant="outlined"
                                        sx={{ background: "#CED4F2" }}
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>

                            <ImagePreviewBox
                                label="Aadhaar Card Image:"
                                src={shop.aadhaarImage}
                                alt={`Aadhaar Card of ${shop.ownerName || shop.shopName}`}
                                fallback="No Aadhaar image available"
                            />

                            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ fontWeight: 500 }}>GSTIN Number:</Typography>
                                </Box>
                                <Box sx={{ gridColumn: "span 2" }}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        value={shop.gstin || "N/A"}
                                        variant="outlined"
                                        sx={{ background: "#CED4F2" }}
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>

                            <ImagePreviewBox
                                label="GSTIN Image:"
                                src={shop.gstinImage}
                                alt={`GSTIN Certificate of ${shop.shopName}`}
                                fallback="No GSTIN image available"
                            />
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
                                variant="contained"
                                sx={{
                                    background: shop.status === "Active" ? "#CECEF2" : "#D1F2CE",
                                    color: shop.status === "Active" ? "#001580" : "#006400",
                                    paddingX: 4,
                                    paddingY: "2px",
                                    textTransform: "none",
                                }}
                                onClick={() => {
                                    const newStatus = shop.status === "Active" ? "Inactive" : "Active";
                                    alert(`Shop marked as ${newStatus}`);
                                }}
                            >
                                {shop.status === "Active" ? "Inactive" : "Active"}
                            </Button>

                            <Button
                                variant="outlined"
                                sx={{
                                    background: "#001580",
                                    color: "#FFFFFF",
                                    paddingX: 4,
                                    paddingY: "2px",
                                    textTransform: "none",
                                }}
                                onClick={() =>
                                    navigate(`/admin/shopmanagement/edit/${shop.id}`, {
                                        state: {
                                            shop: {
                                                ...shop,
                                                // Ensure field mapping consistency for edit form
                                                name: shop.ownerName,
                                                gstinNumber: shop.gstin,
                                            },
                                        },
                                    })
                                }
                            >
                                Edit
                            </Button>

                            <Button
                                variant="outlined"
                                sx={{
                                    background: "#dc3545",
                                    color: "#FFFFFF",
                                    paddingX: 4,
                                    paddingY: "2px",
                                    textTransform: "none",
                                    "&:hover": {
                                        background: "#c82333",
                                    },
                                }}
                            >
                                Delete
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}

export default ShopView;
