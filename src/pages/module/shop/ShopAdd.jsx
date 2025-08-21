import React from "react";
import {Box, Button, Card, CardContent, TextField, Typography} from "@mui/material";
import Worker from "../../../components/cards/worker.jsx";
import {useNavigate} from "react-router-dom";
import {UploadIcon} from "lucide-react";

function ShopAdd() {
    const navigate = useNavigate();
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
                            {/* Shop Name */}
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3,1fr)",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{fontWeight: 500}}>Shop Name:</Typography>
                                </Box>
                                <Box sx={{gridColumn: "span 2"}}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        variant="outlined"
                                        placeholder="Enter Shop Name"
                                        sx={{background: "#CED4F2"}}
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

                            {/* Owner Name */}
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3,1fr)",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{fontWeight: 500}}>Owner Name:</Typography>
                                </Box>
                                <Box sx={{gridColumn: "span 2"}}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        variant="outlined"
                                        placeholder="Enter Full Name"
                                        sx={{background: "#CED4F2"}}
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

                            {/* Email/Phone */}
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3,1fr)",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{fontWeight: 500}}>Email ID/Phone Number:</Typography>
                                </Box>
                                <Box sx={{gridColumn: "span 2"}}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        variant="outlined"
                                        placeholder="Enter Email ID/Phone Number"
                                        sx={{background: "#CED4F2"}}
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

                            {/* Address */}
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3,1fr)",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{fontWeight: 500}}>Address:</Typography>
                                </Box>
                                <Box sx={{gridColumn: "span 2"}}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        variant="outlined"
                                        placeholder="Enter Full Address"
                                        sx={{background: "#CED4F2"}}
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

                            {/* Aadhaar Number */}
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3,1fr)",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{fontWeight: 500}}>Aadhaar Number:</Typography>
                                </Box>
                                <Box sx={{gridColumn: "span 2"}}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        variant="outlined"
                                        placeholder="Enter 12 digit Aadhaar number of shop owner"
                                        sx={{background: "#CED4F2"}}
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

                            {/* Aadhaar Card Image */}
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
                                        <input hidden accept="image/*" type="file" />
                                    </Button>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            ml: 2,
                                            color: "#1C1C1C",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Upload Aadhaar Card
                                    </Typography>
                                </Box>
                            </Box>

                            {/* GSTIN Number */}
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3,1fr)",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{fontWeight: 500}}>GSTIN Number:</Typography>
                                </Box>
                                <Box sx={{gridColumn: "span 2"}}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        variant="outlined"
                                        placeholder="Enter GSTIN number"
                                        sx={{background: "#CED4F2"}}
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

                            {/* GSTIN Image */}
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
                                        <input hidden accept="image/*" type="file" />
                                    </Button>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            ml: 2,
                                            color: "#1C1C1C",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Upload GSTIN Card
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* Action Buttons */}
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
                                variant="outlined"
                                sx={{
                                    background: "#001580",
                                    color: "#FFFFFF",
                                    paddingX: 4,
                                    paddingY: "2px",
                                    textTransform: "none",
                                }}
                            >
                                Add Worker
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}

export default ShopAdd;
