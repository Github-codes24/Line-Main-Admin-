import React from "react";
import {ArrowDropDown} from "@mui/icons-material";
import {Avatar, Box, IconButton, Typography} from "@mui/material";
import profileImage from "../../assets/images/profileImage.jpg";

function Navbar() {
    return (
        <Box
            sx={{
                minWidth: "100vw",
                paddingY: "8px",
                paddingX: "18px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#F5FFFF",
                boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
                position: "sticky",
                top: 0,
                zIndex: 10,
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
                <Avatar src={profileImage} alt="profile">
                    GS
                </Avatar>

                <IconButton size="small" sx={{p: 0}}>
                    <ArrowDropDown />
                </IconButton>
            </Box>
        </Box>
    );
}

export default Navbar;
