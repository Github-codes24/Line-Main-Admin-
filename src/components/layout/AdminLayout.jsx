import React from "react";
import {Box} from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function AdminLayout({activeTab, setActiveTab, children}) {
    return (
        <Box sx={{display: "flex", flexDirection: "column", height: "100vh"}}>
            <Navbar />

            <Box sx={{display: "flex", flexGrow: 1, overflow: "hidden"}}>
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

                <Box
                    sx={{
                        flexGrow: 1,
                        background: "#E0E9E9",
                        paddingY: 2,
                        paddingX: 2,
                        overflowY: "auto",
                        scrollbarWidth: "thin",
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

export default AdminLayout;
