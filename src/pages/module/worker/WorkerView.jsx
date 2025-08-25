import React from "react";
import {Box, Button, Card, CardContent, TextField, Typography} from "@mui/material";
import Worker from "../../../components/cards/worker";
import {useNavigate, useLocation} from "react-router-dom";

function WorkerView() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const worker = state?.worker;

    if (!state) {
        return (
            <Box sx={{p: 3}}>
                <Typography variant="h6" color="error">
                    No worker data found.
                </Typography>
                <Button variant="contained" sx={{mt: 2}} onClick={() => navigate("/admin/workermanagement")}>
                    Back to List
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{width: "100%", minHeight: "auto", display: "flex", flexDirection: "column", gap: "24px"}}>
            <Worker back title="View Worker" />
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
                                    <Typography sx={{fontWeight: 500}}>Worker Name:</Typography>
                                </Box>
                                <Box sx={{gridColumn: "span 2"}}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        value={state.name || ""}
                                        variant="outlined"
                                        sx={{background: "#CED4F2"}}
                                        InputProps={{readOnly: true}}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2}}>
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{fontWeight: 500}}>Expertise:</Typography>
                                </Box>
                                <Box sx={{gridColumn: "span 2"}}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        value={state.expertise || ""}
                                        variant="outlined"
                                        sx={{background: "#CED4F2"}}
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
                                        value={state.contact || ""}
                                        variant="outlined"
                                        sx={{background: "#CED4F2"}}
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
                                        value={state.address || ""}
                                        variant="outlined"
                                        sx={{background: "#CED4F2"}}
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
                                        value={state.aadhaarNumber || ""}
                                        variant="outlined"
                                        sx={{background: "#CED4F2"}}
                                        InputProps={{readOnly: true}}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2}}>
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{fontWeight: 500}}>Aadhaar Card Image:</Typography>
                                </Box>
                                <Box sx={{gridColumn: "span 2"}}>
                                    {state.aadhaarImage ? (
                                        <img
                                            src={state.aadhaarImage}
                                            alt="Aadhaar Card"
                                            style={{
                                                width: "200px",
                                                height: "120px",
                                                borderRadius: "8px",
                                                border: "1px solid #ccc",
                                            }}
                                        />
                                    ) : (
                                        <Typography>No Aadhaar image available</Typography>
                                    )}
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
                                variant="contained"
                                sx={{
                                    background: state.status === "Active" ? "#CECEF2" : "#D1F2CE",
                                    color: state.status === "Active" ? "#001580" : "#006400",
                                    paddingX: 4,
                                    paddingY: "2px",
                                    textTransform: "none",
                                }}
                                onClick={() => {
                                    const newStatus = state.status === "Active" ? "Inactive" : "Active";
                                    alert(`Worker marked as ${newStatus}`);
                                }}
                            >
                                {state.status === "Active" ? "Inactive" : "Active"}
                            </Button>

                            <Button
                                variant="outlined"
                                sx={{background: "#001580", color: "#FFFFFF", px: 4}}
                                onClick={() => navigate("/admin/workermanagement/workeredit", {state: {worker}})}
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

export default WorkerView;
