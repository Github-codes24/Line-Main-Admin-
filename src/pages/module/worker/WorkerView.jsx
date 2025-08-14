import React from "react";
import {Box, Button, Card, CardContent, TextField, Typography} from "@mui/material";
import Worker from "../../../components/cards/Worker";
import {useNavigate, useLocation} from "react-router-dom";

function WorkerView() {
    const navigate = useNavigate();
    const {state} = useLocation(); // Get worker data passed from WorkerList

    // If no state (user opened page directly), handle gracefully
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
                            {/* Worker Name */}
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
                                        sx={{background: "#F5FFFF"}}
                                        InputProps={{readOnly: true}}
                                    />
                                </Box>
                            </Box>

                            {/* Expertise */}
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
                                        sx={{background: "#F5FFFF"}}
                                        InputProps={{readOnly: true}}
                                    />
                                </Box>
                            </Box>

                            {/* Contact */}
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
                                        sx={{background: "#F5FFFF"}}
                                        InputProps={{readOnly: true}}
                                    />
                                </Box>
                            </Box>

                            {/* Address */}
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
                                        sx={{background: "#F5FFFF"}}
                                        InputProps={{readOnly: true}}
                                    />
                                </Box>
                            </Box>
                        </Box>

                        {/* Edit Button */}
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
                                    background: "#007E74",
                                    color: "#ffffff",
                                    paddingX: 4,
                                    paddingY: "2px",
                                    textTransform: "none",
                                }}
                                onClick={() => navigate("/admin/workermanagement/workeredit", {state})}
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
