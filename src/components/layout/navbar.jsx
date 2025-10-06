

// export default Navbar;
import React, { useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import profileImage from "../../assets/images/profileImage.jpg";

function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/admin-profile");
    handleMenuClose();
  };

  // Open logout dialog instead of direct logout
  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
    handleMenuClose();
  };

  const handleCancelLogout = () => {
    setOpenLogoutDialog(false);
  };

 const handleConfirmLogout = () => {
  console.log("User logged out");

  // Clear tokens
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  setOpenLogoutDialog(false);
navigate("/");
 };



  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{
        minWidth: "100vw",
        paddingY: "8px",
        paddingX: "48px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#CED4F2",
        boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Typography color="#001580" fontWeight={700} fontSize={"28px"} >
        LineMan Logo
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <Avatar src={profileImage} alt="profile">
          GS
        </Avatar>
        <IconButton size="small" sx={{ p: 0 }} onClick={handleMenuOpen}>
          <ArrowDropDown />
        </IconButton>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{ style: { width: 128 } }}
        >
          <MenuItem onClick={handleProfileClick} sx={{ color: "#001580" }}>
            Admin Profile
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={handleLogoutClick}
            sx={{ color: "#EC2D01", justifyContent: "center" }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>

      {/* Logout Confirmation Card/Dialog */}
     <Dialog
  open={openLogoutDialog}
  onClose={handleCancelLogout}
  PaperProps={{
    sx: {
      width: 496,
      height: 264,
      backgroundColor: "#FFFFFF", // ✅ correct property
      borderRadius: "16px",
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
  }}
>
  <DialogContent>
    <Typography
      variant="h6"
      fontWeight={700}
      mb={2}
      textAlign="center"
      color="#0D2E28" // ✅ correct way to set text color
    >
      Confirm Logout
    </Typography>
    <Typography color="#616666" textAlign="center">
      You’ll need to login again to access admin panel.
    </Typography>
  </DialogContent>

  <DialogActions sx={{ display: "flex", justifyContent: "center", gap: "16px" }}>
    <Button
      variant="outlined"
      sx={{
        width: 416,
        height: 40,
        backgroundColor: "#CECEF2", //  background color
        borderColor: "#001580", // order color
        color: "#001580", //text color
        "&:hover": {
          backgroundColor: "#bfc0e0", // optional hover effect
          borderColor: "#001580",
        },
      }}
      onClick={handleCancelLogout}
    >
      Cancel
    </Button>
   <Button
  variant="contained"
  sx={{
    width: 416,
    height: 40,
    backgroundColor: "#001580", // ✅ custom background
    color: "#FFFFFF",           // ✅ white text
    "&:hover": {
      backgroundColor: "#001060", // ✅ darker blue on hover
    },
  }}
  onClick={handleConfirmLogout}
>
  Logout
</Button>
  </DialogActions>
</Dialog>

    </Box>
  );
}

export default Navbar;
