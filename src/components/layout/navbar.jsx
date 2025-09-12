// import React, { useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import React, { useState } from "react";

import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import profileImage from "../../assets/images/profileImage.jpg";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        background: "#CED4F2",
        boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Typography color="#001580" fontWeight={700} fontSize={"28px"}>
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

        <IconButton size="small" sx={{ p: 0 }} onClick={handleClick}>
          <ArrowDropDown />
        </IconButton>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Admin Profile</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

export default Navbar;
