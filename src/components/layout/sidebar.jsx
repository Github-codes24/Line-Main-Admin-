import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import {
  DashboardIcon,
  UserIcon,
  WorkerIcon,
  ShopIcon,
  TabIcon,
  SmallProductIcon,
  BigProductIcon,
  OrderIcon,
  PaymentIcon,
  SetCommision,
  SetCharges,
  SetLimit,
} from "../../assets/CommonAssets";
import { useNavigate , useLocation} from "react-router-dom";

const drawerWidth = 270; // sidebar width

function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
    const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const sideBarContent = [
    { icon: (c) => <DashboardIcon color={c} />, title: "Dashboard", path: "/admin/dashboard" },
    { icon: (c) => <UserIcon color={c} />, title: "Customer Management", path: "/admin/customermanagement" },
    { icon: (c) => <WorkerIcon color={c} />, title: "Worker Management", path: "/admin/workermanagement" },
    { icon: (c) => <ShopIcon color={c} />, title: "Shop Management", path: "/admin/shopmanagement" },
    { icon: (c) => <TabIcon color={c} />, title: "Tab Management", path: "/admin/tabmanagement" },
    { icon: (c) => <SmallProductIcon color={c} />, title: "Small Product", path: "/admin/smallproduct" },
    { icon: (c) => <BigProductIcon color={c} />, title: "Big Product", path: "/admin/bigproduct" },
    { icon: (c) => <OrderIcon color={c} />, title: "Order Management", path: "/admin/order/list" },
    { icon: (c) => <PaymentIcon color={c} />, title: "Payment Management", path: "/admin/payment" },
    { icon: (c) => <SetCommision color={c} />, title: "Set Commission", path: "/admin/set-commission" },
    { icon: (c) => <SetCharges color={c} />, title: "Set Charges Of Worker", path: "/admin/set-charges-of-worker" },
    { icon: (c) => <SetLimit color={c} />, title: "Set Limit Amount", path: "/admin/set-limit-amount" },
  ];

  const renderSidebarContent = () => (
    <Box
      sx={{
        width: drawerWidth,
        font: "myfont",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        overflowY: "auto",
        scrollbarWidth: "none",
        backgroundColor: "#3D55CC",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
     {sideBarContent.map((content, index) => {
  const selectedMenu = location.pathname.startsWith(content.path);
  const background = selectedMenu ? "#001580" : "#ffffff";
  const color = selectedMenu ? "white" : "#001580";

  return (
    <Box
      key={index}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "14px",
        borderRadius: "8px",
        paddingY: "6px",
        paddingX: 2,
        boxSizing: "border-box",
        background,
        cursor: "pointer",
      }}
      onClick={() => {
        setActiveTab(content.path);
        navigate(content.path);
        if (isMobile) setMobileOpen(false);
      }}
    >
      <Box
        sx={{
          width: "24px",
          height: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "color 0.3s ease",
          color,
        }}
      >
        {content.icon(color)}
      </Box>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontWeight: 500,
          fontSize: "14px",
          color,
          whiteSpace: "nowrap",
        }}
      >
        {content.title}
      </Typography>
    </Box>
  );
})}

    </Box>
  );

  return (
    <>
      {/* Navbar Toggle Button for Mobile */}
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            top: 10,
            left: 10,
            zIndex: 2000,
          }}
        >
          <IconButton onClick={toggleDrawer} sx={{ color: "#001580" }}>
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      {/* Permanent Sidebar on Desktop */}
      {!isMobile && (
        <Box
          sx={{
            width: drawerWidth,
            flexShrink: 0,
          }}
        >
          {renderSidebarContent()}
        </Box>
      )}

      {/* Drawer for Mobile */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
        {renderSidebarContent()}
      </Drawer>
    </>
  );
}

export default Sidebar;
