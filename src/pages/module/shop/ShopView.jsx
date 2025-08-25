import React from "react";
import {Box, Button, Card, CardContent, TextField, Typography} from "@mui/material";
import Worker from "../../../components/cards/worker.jsx";
import {useNavigate, useLocation} from "react-router-dom";

function ShopView() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const shop = state?.shop;

    if (!shop) {
        return <Typography>No shop data available</Typography>;
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
                                        value={shop.shopName}
                                        variant="outlined"
                                        sx={{background: "#E4E5EB"}}
                                        InputProps={{readOnly: true}}
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
                                        value={shop.name}
                                        variant="outlined"
                                        sx={{background: "#E4E5EB"}}
                                        InputProps={{readOnly: true}}
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
                                        value={shop.contact}
                                        variant="outlined"
                                        sx={{background: "#E4E5EB"}}
                                        InputProps={{readOnly: true}}
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
                                        value={shop.address}
                                        variant="outlined"
                                        sx={{background: "#E4E5EB"}}
                                        InputProps={{readOnly: true}}
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
                                        value={shop.aadhaar}
                                        variant="outlined"
                                        sx={{background: "#E4E5EB"}}
                                        InputProps={{readOnly: true}}
                                    />
                                </Box>
                            </Box>

                            <ImagePreviewBox
                                label="Aadhaar Card Image:"
                                src={shop.aadhaarImage}
                                alt={`Aadhaar Card of ${shop.name}`}
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
                                        value={shop.gstin}
                                        variant="outlined"
                                        sx={{background: "#E4E5EB"}}
                                        InputProps={{readOnly: true}}
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
                                                aadhaarNumber: shop.aadhaar,
                                                gstinNumber: shop.gstin,
                                            },
                                        },
                                    })
                                }
                            >
                                Edit
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}

export default ShopView;
