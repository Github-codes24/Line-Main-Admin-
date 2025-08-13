
// import {Box, Typography} from "@mui/material";
// import React from "react";
// import {
//     DashboardIcon,
//     UserIcon,
//     WorkerIcon,
//     ShopIcon,
//     TabIcon,
//     SmallProductIcon,
//     BigProductIcon,
//     OrderIcon,
//     PaymentIcon,
// } from "../../assets/CommonAssets";

// function Sidebar() {

//     const [isSelectMenu, setIsSelectMenu] = React.useState(0);

//     const sideBarContent = [
//         {
//             icon: (color) => <DashboardIcon color={color} />,
//             title: "Dashboard",
//         },
//         {
//             icon: (color) => <UserIcon color={color} />,
//             title: "Customer Management",
//         },
//         {
//             icon: (color) => <WorkerIcon color={color} />,
//             title: "Worker Management",
//         },
//         {
//             icon: (color) => <ShopIcon color={color} />,
//             title: "Shop Management",
//         },
//         {
//             icon: (color) => <TabIcon color={color} />,
//             title: "Tab Management",
//         },
//         {
//             icon: (color) => <SmallProductIcon color={color} />,
//             title: "Small Product",
//         },
//         {
//             icon: (color) => <BigProductIcon color={color} />,
//             title: "Big Product",
//         },
//         {
//             icon: (color) => <OrderIcon color={color} />,
//             title: "Order Management",
//         },
//         {
//             icon: (color) => <PaymentIcon color={color} />,
//             title: "Payment Management",
//         },
//     ];
//     return (
//         <Box
//             sx={{
//                 width: "270px",
//                 minHeight: "100vh",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "10px",
//                 overflowY: "auto",
//                 scrollbarWidth: "none",
//                 backgroundColor: "#19A699",
//                 padding: "16px",
//                 boxSizing: "border-box",
//             }}
//         >
//             {sideBarContent.map((content, index) => {
//                 const selectedMenu = isSelectMenu === index;
//                 const background = selectedMenu ? "#007E74" : "#ffffff";
//                 const color = selectedMenu ? "white" : "#007E74";

//                 return (
//                     <Box
//                         key={index}
//                         sx={{
//                             width: "100%",
//                             display: "flex",
//                             flexDirection: "row",
//                             alignItems: "center",
//                             gap: "14px",
//                             borderRadius: "8px",
//                             paddingY: "6px",
//                             paddingX: 2,
//                             boxSizing: "border-box",
//                             background,
//                             cursor: "pointer",
//                         }}
//                         onClick={() => {
//                             setIsSelectMenu(index);
//                         }}
//                     >
//                         <Box
//                             sx={{
//                                 width: "24px",
//                                 height: "24px",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 transition: "color 0.3s ease",
//                                 color,
//                             }}
//                         >
//                             {content.icon(color)}
//                         </Box>
//                         <Typography
//                             sx={{
//                                 fontFamily: "Poppins",
//                                 fontWeight: 500,
//                                 fontSize: "14px",
//                                 color,
//                                 whiteSpace: "nowrap",
//                             }}
//                         >
//                             {content.title}
//                         </Typography>
//                     </Box>
//                 );
//             })}
//         </Box>
//     );
// }

// export default Sidebar;

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
      path: "/admin/shopmanagement/big-product-list",
    },
    {
      icon: (color) => <OrderIcon color={color} />,
      title: "Order Management",
      path: "/admin/shopmanagement/order/list",
    },
    {
      icon: (color) => <PaymentIcon color={color} />,
      title: "Payment Management",
      path: "/admin/paymentmanagement",
    },

    {
      icon: (color) => <PaymentIcon color={color} />,
      title: "Big Product Approve",
      path: "/admin/shopmanagement/big-product-approve/:id",
    },
    {
      icon: (color) => <PaymentIcon color={color} />,
      title: "List Order",
      path: "/admin/shopmanagement/pending-order/:id",
    },
    {
      icon: (color) => <PaymentIcon color={color} />,
      title: "Progress Order",
      path: "/admin/shopmanagement/progress-order/:id",
    },
  ];
  return (
    <Box
      sx={{
        width: "270px",
        minWidth: "270px",
        maxWidth: "270px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        overflowY: "auto",
        scrollbarWidth: "none",
        backgroundColor: "#19A699",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      {sideBarContent.map((content, index) => {
        const selectedMenu = activeTab === content.path;
        const background = selectedMenu ? "#007E74" : "#ffffff";
        const color = selectedMenu ? "white" : "#007E74";

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

