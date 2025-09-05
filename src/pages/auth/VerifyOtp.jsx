import React, {useState} from "react";
import {Box, Button, Container, Grid, IconButton, InputAdornment, TextField, Typography, Paper} from "@mui/material";
import {motion} from "framer-motion";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {MdOutlineMailOutline} from "react-icons/md";
import {IoMdRefresh} from "react-icons/io";
import {FaLock} from "react-icons/fa";
import useAuth from "../../hook/auth/useAuth";

const VerifyOtp = () => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    // const userId = "68b2fdb7f10397bf39e97c89";
    const contact = sessionStorage.getItem("contact");
    const {verifyOtp, regenerateOtp} = useAuth();
    const handleVerify = () => {
        verifyOtp(otp, contact);
    };

    // const handleResend = () => {
    //     regenerateOtp(userId);
    // };

    return (
        <Box sx={{backgroundColor: "#0d9488", marginX: 0}}>
            <Grid container justifyContent="center" alignItems="center" style={{minHeight: "100vh"}}>
                <Grid item xs={12}>
                    <motion.div
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 0.5}}
                    >
                        <Paper
                            elevation={6}
                            sx={{
                                p: 5,
                                borderRadius: 4,
                                textAlign: "center",
                                background: "linear-gradient(to bottom, #ffffff, #f0fdfa)",
                            }}
                        >
                            <MdOutlineMailOutline size={40} color="#0d9488" />
                            <Typography variant="h5" fontWeight="bold" color="teal" mt={2} gutterBottom>
                                Verify OTP
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={3}>
                                Enter the 6-digit OTP sent to your registered email
                            </Typography>

                            <TextField
                                fullWidth
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                inputProps={{maxLength: 6, style: {textAlign: "center"}}}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FaLock color="#0d9488" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleVerify}
                                sx={{
                                    mt: 3,
                                    py: 1.5,
                                    borderRadius: 3,
                                    backgroundColor: "#0d9488",
                                    "&:hover": {backgroundColor: "#0f766e"},
                                }}
                                disabled={loading}
                            >
                                {loading ? "Verifying..." : "Verify OTP"}
                            </Button>

                            <Box mt={3} display="flex" justifyContent="center" alignItems="center">
                                <Typography variant="body2" color="text.secondary">
                                    Didn’t receive the OTP?
                                </Typography>
                                <IconButton
                                    color="primary"
                                    // onClick={handleResend}
                                    sx={{ml: 1}}
                                >
                                    <IoMdRefresh size={22} />
                                </IconButton>
                            </Box>
                        </Paper>
                    </motion.div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default VerifyOtp;
