import React from "react";
import {Search} from "@mui/icons-material";
import {Box, Button, InputAdornment, TextField, Typography} from "@mui/material";
import {BackArrowIcon} from "../../assets/CommonAssets";
import {useNavigate} from "react-router-dom";

function Worker({back = false, title = "", searchValue, setSearchValue, buttonText = "", btnpath = ""}) {
    const navigate = useNavigate();

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/admin/dashboard");
        }
    };

    const handleButtonClick = () => {
        if (btnpath) navigate(btnpath);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#ffffff",
                py: 2,
                px: 2,
                borderRadius: 2,
                flexWrap: "wrap",
                gap: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 2,
                    flexBasis: "30%",
                    minWidth: "200px",
                }}
            >
                {back && (
                    <Box
                        sx={{
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onClick={handleBack}
                    >
                        <BackArrowIcon />
                    </Box>
                )}
                <Typography fontWeight={600} fontSize="20px" color="#0D2E28">
                    {title}
                </Typography>
            </Box>

            {searchValue !== undefined && typeof setSearchValue === "function" ? (
                <Box sx={{flexBasis: "35%", minWidth: "250px"}}>
                    <TextField
                        fullWidth
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        size="small"
                        placeholder="Search by Name, Phone Number, Email..."
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                            sx: {
                                borderRadius: 5,
                                background: "#E4E5EB",
                                fontWeight: 600,
                                fontSize: "14px",
                                color: "#001580",
                            },
                        }}
                    />
                </Box>
            ) : null}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexBasis: "30%",
                    minWidth: "200px",
                }}
            >
                {buttonText ? (
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: 1,
                            backgroundColor: "#001580",
                            py: "4px",
                            px: 3,
                            textTransform: "none",
                        }}
                        onClick={handleButtonClick}
                    >
                        {buttonText}
                    </Button>
                ) : (
                    <Box sx={{width: 100}} /> // placeholder button size
                )}
            </Box>
        </Box>
    );
}

export default Worker;
