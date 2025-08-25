import React from "react";
import {Box, Button, Card, CardContent, TextField, Typography} from "@mui/material";
import Worker from "../../../components/cards/worker.jsx";
import {useNavigate, useLocation} from "react-router-dom";
import {UploadIcon} from "lucide-react";

function ShopEdit() {
    const navigate = useNavigate();
    const location = useLocation();
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

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleFileChange = (e) => {
        const {name, files} = e.target;
        if (files.length > 0) {
            setFormData((prev) => ({...prev, [name]: files[0]}));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated shop data:", formData);
        navigate(-1);
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
            <Worker back title="Edit Shop" />
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
                            <Box sx={{display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2}}>
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{fontWeight: 500}}>Shop Name:</Typography>
                                </Box>
                                <Box sx={{gridColumn: "span 2"}}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        variant="outlined"
                                        placeholder="Enter Shop Name"
                                        name="shopName"
                                        value={formData.shopName}
                                        onChange={handleChange}
                                        sx={{background: "#CED4F2"}}
                                        InputProps={{
                                            sx: {"& input::placeholder": {color: "black", opacity: 1}},
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
                                        variant="outlined"
                                        placeholder="Enter Owner Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        sx={{background: "#CED4F2"}}
                                        InputProps={{
                                            sx: {"& input::placeholder": {color: "black", opacity: 1}},
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
                                        variant="outlined"
                                        placeholder="Enter Email ID/Phone Number"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleChange}
                                        sx={{background: "#CED4F2"}}
                                        InputProps={{
                                            sx: {"& input::placeholder": {color: "black", opacity: 1}},
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
                                        variant="outlined"
                                        placeholder="Enter Full Address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        sx={{background: "#CED4F2"}}
                                        InputProps={{
                                            sx: {"& input::placeholder": {color: "black", opacity: 1}},
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
                                        variant="outlined"
                                        placeholder="Enter Aadhaar Number"
                                        name="aadhaarNumber"
                                        value={formData.aadhaarNumber}
                                        onChange={handleChange}
                                        sx={{background: "#CED4F2"}}
                                        InputProps={{
                                            sx: {"& input::placeholder": {color: "black", opacity: 1}},
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
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{fontWeight: 500}}>Aadhaar Card Image:</Typography>
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
                                            "&:hover": {background: "#3A57A6"},
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

                            <Box sx={{display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2}}>
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{fontWeight: 500}}>GSTIN Number:</Typography>
                                </Box>
                                <Box sx={{gridColumn: "span 2"}}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        variant="outlined"
                                        placeholder="Enter GSTIN Number"
                                        name="gstinNumber"
                                        value={formData.gstinNumber}
                                        onChange={handleChange}
                                        sx={{background: "#CED4F2"}}
                                        InputProps={{
                                            sx: {"& input::placeholder": {color: "black", opacity: 1}},
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
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{fontWeight: 500}}>GSTIN Image:</Typography>
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
                                            "&:hover": {background: "#3A57A6"},
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
                                sx={{
                                    background: "#001580",
                                    color: "#FFFFFF",
                                    px: 4,
                                    textTransform: "none",
                                }}
                            >
                                Update
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}

export default ShopEdit;
