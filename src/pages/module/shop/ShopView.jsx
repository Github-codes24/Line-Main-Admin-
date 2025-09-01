import React from "react";
import {Box, Button, Card, CardContent, TextField, Typography, CircularProgress} from "@mui/material";
import Worker from "../../../components/cards/worker.jsx";
import {useNavigate, useLocation, useParams} from "react-router-dom";
import {getSingleShop, deleteShop} from "../../../config/index.js";

function ShopView() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {id} = useParams(); // Get shop ID from URL
    
    // State management
    const [shop, setShop] = React.useState(state?.shop || null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    // Fetch shop data from API
    const fetchShop = async (shopId) => {
        setLoading(true);
        setError("");
        
        try {
            console.log("Fetching shop with ID:", shopId);
            const response = await getSingleShop(shopId);
            
            if (response.success) {
                setShop(response.data);
                console.log("Shop data loaded:", response.data);
            } else {
                setError(response.message || "Failed to fetch shop details");
            }
        } catch (error) {
            console.error("Error fetching shop:", error);
            setError("Failed to load shop details");
        } finally {
            setLoading(false);
        }
    };

    // Handle delete shop
    const handleDeleteShop = async () => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${shop.shopName}"? This action cannot be undone.`
        );
        
        if (!confirmDelete) return;

        try {
            console.log("Deleting shop with ID:", shop.id || shop._id);
            const response = await deleteShop(shop.id || shop._id);
            
            if (response.success) {
                alert("Shop deleted successfully!");
                navigate("/admin/shopmanagement/list");
            } else {
                alert(response.message || "Failed to delete shop");
            }
        } catch (error) {
            console.error("Error deleting shop:", error);
            alert("Failed to delete shop. Please try again.");
        }
    };

    // Load shop data on component mount if not already available
    React.useEffect(() => {
        if (!shop && id) {
            fetchShop(id);
        }
    }, [id, shop]);

    // Loading state
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Error state
    if (error) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="error" variant="h6">
                    {error}
                </Typography>
                <Button 
                    variant="contained" 
                    onClick={() => navigate(-1)}
                    sx={{ mt: 2 }}
                >
                    Go Back
                </Button>
            </Box>
        );
    }

    // No shop data
    if (!shop) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6">No shop data available</Typography>
                <Button 
                    variant="contained" 
                    onClick={() => navigate(-1)}
                    sx={{ mt: 2 }}
                >
                    Go Back
                </Button>
            </Box>
        );
    }

    const ImagePreviewBox = ({label, src, alt, fallback}) => (
        <Box sx={{display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, mb: 2}}>
            <Box sx={{display: "flex", alignItems: "center"}}>
                <Typography sx={{fontWeight: 500}}>{label}</Typography>
            </Box>
            <Box sx={{gridColumn: "span 2"}}>
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
                            <Box sx={{display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2}}>
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{fontWeight: 500}}>Shop Name:</Typography>
                                </Box>
                                <Box sx={{gridColumn: "span 2"}}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        value={shop.shopName || ''}
                                        variant="outlined"
                                        sx={{background: "#E4E5EB"}}
                                        slotProps={{
                                            input: {
                                                readOnly: true
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2}}>
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{fontWeight: 500}}>Owner Name:</Typography>
                                </Box>
                                <Box sx={{gridColumn: "span 2"}}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        value={shop.ownerName || ''}
                                        variant="outlined"
                                        sx={{background: "#E4E5EB"}}
                                        slotProps={{
                                            input: {
                                                readOnly: true
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2}}>
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{fontWeight: 500}}>Email ID/Phone Number:</Typography>
                                </Box>
                                <Box sx={{gridColumn: "span 2"}}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        value={shop.contact || ''}
                                        variant="outlined"
                                        sx={{background: "#E4E5EB"}}
                                        slotProps={{
                                            input: {
                                                readOnly: true
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2}}>
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{fontWeight: 500}}>Address:</Typography>
                                </Box>
                                <Box sx={{gridColumn: "span 2"}}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        value={shop.address || ''}
                                        variant="outlined"
                                        sx={{background: "#E4E5EB"}}
                                        slotProps={{
                                            input: {
                                                readOnly: true
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2}}>
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{fontWeight: 500}}>Aadhaar Number:</Typography>
                                </Box>
                                <Box sx={{gridColumn: "span 2"}}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        value={shop.aadhaarNumber || ''}
                                        variant="outlined"
                                        sx={{background: "#E4E5EB"}}
                                        slotProps={{
                                            input: {
                                                readOnly: true
                                            }
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

                            <Box sx={{display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2}}>
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{fontWeight: 500}}>GSTIN Number:</Typography>
                                </Box>
                                <Box sx={{gridColumn: "span 2"}}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        value={shop.gstin || 'N/A'}
                                        variant="outlined"
                                        sx={{background: "#E4E5EB"}}
                                        slotProps={{
                                            input: {
                                                readOnly: true
                                            }
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
                                    }
                                }}
                                onClick={handleDeleteShop}
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
