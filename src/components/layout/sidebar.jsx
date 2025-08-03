import {Box, Typography} from "@mui/material";
import React from "react";
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

function Sidebar() {fontWeight: "510",

    const [isSelectMenu, setIsSelectMenu] = React.useState(0);

    const sideBarContent = [
        {
            icon: (color) => <DashboardIcon color={color} />,
            title: "Dashboard",
        },
        {
            icon: (color) => <UserIcon color={color} />,
            title: "Customer Management",
        },
        {
            icon: (color) => <WorkerIcon color={color} />,
            title: "Worker Management",
        },
        {
            icon: (color) => <ShopIcon color={color} />,
            title: "Shop Management",
        },
        {
            icon: (color) => <TabIcon color={color} />,
            title: "Tab Management",
        },
        {
            icon: (color) => <SmallProductIcon color={color} />,
            title: "Small Product",
        },
        {
            icon: (color) => <BigProductIcon color={color} />,
            title: "Big Product",
        },
        {
            icon: (color) => <OrderIcon color={color} />,
            title: "Order Management",
        },
        {
            icon: (color) => <PaymentIcon color={color} />,
            title: "Payment Management",
        },
    ];
    return (
        <Box
            sx={{
                width: "270px",
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
                const selectedMenu = isSelectMenu === index;
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
                            setIsSelectMenu(index);
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
