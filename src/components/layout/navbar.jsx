// export default Navbar;
import { useState, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import profileImage from "../../assets/images/profileImage.jpg";
import useAuth from "../../hook/auth/useAuth";
import conf from "../../config";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme(); // 
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600–900px

  const [anchorEl, setAnchorEl] = useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const { getProfile, adminProfile } = useAuth();

  useEffect(() => {
    getProfile();
  }, []);

  // Refresh profile when window regains focus
  useEffect(() => {
    const handleFocus = () => {
      getProfile();
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  // Refresh profile when navigating to profile/edit-profile pages
  useEffect(() => {
    if (
      location.pathname === "/admin-profile" ||
      location.pathname === "/admin/edit-profile"
    ) {
      getProfile();
    }
  }, [location.pathname]);

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

  // Logout handlers
  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
    handleMenuClose();
  };
  const handleCancelLogout = () => setOpenLogoutDialog(false);

  const handleConfirmLogout = () => {
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
        paddingX: isTablet ? "60px" : "16px", 
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
      {/* Logo */}
      <Typography color="#001580" fontWeight={700} fontSize={"28px"}>
        LineMan Logo
      </Typography>

      {/* Profile + Dropdown */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <Avatar
          key={adminProfile?.profileImage || "default"}
          src={adminProfile?.profileImage || profileImage}
          alt="profile"
          onError={(e) => {
            console.log("Navbar avatar image load error, falling back to default");
            e.target.src = profileImage;
          }}
        >
          {adminProfile?.name ? adminProfile.name.charAt(0) : "A"}
        </Avatar>

        <IconButton size="large" sx={{ p: 0 }} onClick={handleMenuOpen}>
          <RiArrowDropDownLine />
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

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={openLogoutDialog}
        onClose={handleCancelLogout}
        PaperProps={{
          sx: {
            width: 496,
            height: 264,
            backgroundColor: "#FFFFFF",
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
            color="#0D2E28"
          >
            Confirm Logout
          </Typography>
          <Typography color="#616666" textAlign="center">
            You’ll need to login again to access admin panel.
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{ display: "flex", justifyContent: "center", gap: "16px" }}
        >
          <Button
            variant="outlined"
            sx={{
              width: 416,
              height: 40,
              backgroundColor: "#CECEF2",
              borderColor: "#001580",
              color: "#001580",
              "&:hover": {
                backgroundColor: "#bfc0e0",
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
              backgroundColor: "#001580",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#001060",
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
