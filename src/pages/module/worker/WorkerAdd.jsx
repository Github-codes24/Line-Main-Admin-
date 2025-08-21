import React from "react";
import {Box, Button, Card, CardContent, MenuItem, Select, TextField, Typography} from "@mui/material";
import Worker from "../../../components/cards/worker.jsx";
import {useNavigate} from "react-router-dom";
import UploadIcon from "@mui/icons-material/Upload";

function WorkerAdd() {
    const navigate = useNavigate();
    const [expertise, setExpertise] = React.useState("");
    const [aadhaarNumber, setAadhaarNumber] = React.useState("");
    const [aadhaarImage, setAadhaarImage] = React.useState(null);

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
            <Worker back title="Add New Worker" />
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
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3,1fr)",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{fontWeight: 500}}>Worker Name:</Typography>
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

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3,1fr)",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{fontWeight: 500}}>Expertise:</Typography>
                                </Box>
                                <Box sx={{gridColumn: "span 2"}}>
                                    <Select
                                        fullWidth
                                        displayEmpty
                                        variant="outlined"
                                        value={expertise}
                                        onChange={(e) => setExpertise(e.target.value)}
                                        sx={{background: "#CED4F2"}}
                                    >
                                        <MenuItem value="" disabled hidden>
                                            Select Expertise
                                        </MenuItem>
                                        <MenuItem value="Electrician">Electrician</MenuItem>
                                        <MenuItem value="Plumber">Plumber</MenuItem>
                                        <MenuItem value="Tiler">Tiler</MenuItem>
                                        <MenuItem value="Painter">Painter</MenuItem>
                                        <MenuItem value="AC & Refrigerator Mechanic">
                                            AC & Refrigerator Mechanic
                                        </MenuItem>
                                    </Select>
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
                                        sx={{background: "#CED4F2", color: "black"}}
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
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{fontWeight: 500}}>Aadhaar Number:</Typography>
                                </Box>
                                <Box sx={{gridColumn: "span 2"}}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        variant="outlined"
                                        placeholder="Enter 12 digit Aadhaar number of worker"
                                        value={aadhaarNumber}
                                        onChange={(e) => setAadhaarNumber(e.target.value)}
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

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3,1fr)",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{fontWeight: 500}}>Aadhaar Image:</Typography>
                                </Box>

                                <Box sx={{gridColumn: "span 2"}}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 2,
                                            border: "1px solid #9FA8DA",
                                            background: "#CED4F2",
                                            borderRadius: "4px",
                                            padding: "6px 12px",
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            component="label"
                                            startIcon={<UploadIcon />}
                                            sx={{
                                                background: "#3F51B5",
                                                color: "#fff",
                                                textTransform: "none",
                                                "&:hover": {background: "#303F9F"},
                                            }}
                                        >
                                            Upload Photo
                                            <input
                                                type="file"
                                                hidden
                                                onChange={(e) => setAadhaarImage(e.target.files[0])}
                                            />
                                        </Button>
                                        <Typography sx={{fontWeight: 500, color: "#1B2E35"}}>
                                            Upload Aadhaar Card
                                        </Typography>
                                    </Box>
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
                                cancel
                            </Button>
                            <Button
                                type="submit"
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

export default WorkerAdd;
