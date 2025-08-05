import {ArrowDropDown} from "@mui/icons-material";
import {Avatar, Box, IconButton, Typography} from "@mui/material";
import React from "react";

function Navbar() {
    return (
        <Box
            sx={{
                minWidth: "100vw",
                paddingY: "8px",
                paddingX: "16px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0px 2px 2px rgba(0,0,0,0.25)",
            }}
        >
            <Typography color="#007E74" fontWeight={700} fontSize={"28px"}>
                LineMan Logo
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "5px",
                }}
            >
                <Avatar alt="profile">GS</Avatar>

                <IconButton size="small" sx={{p: 0}}>
                    <ArrowDropDown />
                </IconButton>
            </Box>
        </Box>
    );
}

export default Navbar;