import React from "react";
import { Box, Typography } from "@mui/material";
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
import { useNavigate } from "react-router-dom";

function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const sideBarContent = [
    {
      icon: (color) => <DashboardIcon color={color} />,
      title: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: (color) => <UserIcon color={color} />,
      title: "Customer Management",
      path: "/admin/customermanagement",
    },
    {
      icon: (color) => <WorkerIcon color={color} />,
      title: "Worker Management",
      path: "/admin/workermanagement",
    },
    {
      icon: (color) => <ShopIcon color={color} />,
      title: "Shop Management",
      path: "/admin/shopmanagement",
    },
    {
      icon: (color) => <TabIcon color={color} />,
      title: "Tab Management",
      path: "/admin/tabmanagement",
    },
    {
      icon: (color) => <SmallProductIcon color={color} />,
      title: "Small Product",
      path: "/admin/smallproduct",
    },
    {
      icon: (color) => <BigProductIcon color={color} />,
      title: "Big Product",
      path: "/admin/bigproduct",
    },
    {
      icon: (color) => <OrderIcon color={color} />,
      title: "Order Management",
      path: "/admin/order/list",
    },
    {
      icon: (color) => <PaymentIcon color={color} />,
      title: "Payment Management",
      path: "/admin/payment",
    },
    {
      icon: (color) => <SetCommision color={color} />,
      title: "Set Commission",
      path: "/admin/set-commission", // demo id
    },
    {
      icon: (color) => <SetCharges color={color} />,
      title: "Set Charges Of Worker",
      path: "/admin/set-charges-of-worker",
    },
    {
      icon: (color) => <SetLimit color={color} />,
      title: "Set Limit Amount",
      path: "/admin/set-limit-amount", // demo id
    },
  ];

  return (
    <Box
      sx={{
        width: "270px",
        minWidth: "270px",
        maxWidth: "270px",
        font:"myfont",
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
        const selectedMenu = activeTab === content.path;
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
}

export default Sidebar;
