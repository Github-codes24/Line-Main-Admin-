import React from "react";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import Worker from "../../../components/cards/worker.jsx";

import {DeleteIcon, EditIcon, ViewIcon} from "../../../assets/CommonAssets";
import {useNavigate} from "react-router-dom";

function ShopList() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = React.useState("");

    const shopData = [
        {
            id: 1,
            name: "Ravi Kumar",
            shopName: "Kumar Electricals",
            contact: "ravi.kumar@gmail.com / +91-9876543210",
            address: "Banjara Hills, Hyderabad, Telangana",
            status: "Active",
            aadhaar: "XXXX-XXXX-1234",
            gstin: "36ABCDE1234F1Z5",
        },
        {
            id: 2,
            name: "Anjali Mehta",
            shopName: "Mehta Plumbing Works",
            contact: "anjali.mehta@yahoo.com / +91-9123456789",
            address: "Sector 22, Noida, Uttar Pradesh",
            status: "Active",
            aadhaar: "XXXX-XXXX-5678",
            gstin: "09ABCDE5678G1Z6",
        },
        {
            id: 3,
            name: "Sunil Sharma",
            shopName: "Sharma Carpentry",
            contact: "sunil.sharma@outlook.com / +91-9988776655",
            address: "MG Road, Pune, Maharashtra",
            status: "Active",
            aadhaar: "XXXX-XXXX-8765",
            gstin: "27ABCDE8765H1Z2",
        },
        {
            id: 4,
            name: "Preeti Verma",
            shopName: "Green Thumb Gardening",
            contact: "preeti.verma@gmail.com / +91-8765432109",
            address: "Indiranagar, Bengaluru, Karnataka",
            status: "Active",
            aadhaar: "XXXX-XXXX-4321",
            gstin: "29ABCDE4321J1Z8",
        },
        {
            id: 5,
            name: "Amit Das",
            shopName: "Das Paints & Decor",
            contact: "amit.das@hotmail.com / +91-8899776655",
            address: "Salt Lake, Kolkata, West Bengal",
            status: "Inactive",
            aadhaar: "XXXX-XXXX-2468",
            gstin: "19ABCDE2468K1Z4",
        },
    ];

    const filteredData = shopData.filter((item) => {
        const searchLower = searchText.toLowerCase();
        return (
            item.name.toLowerCase().includes(searchLower) ||
            item.shopName.toLowerCase().includes(searchLower) ||
            item.contact.toLowerCase().includes(searchLower) ||
            item.address.toLowerCase().includes(searchLower) ||
            item.status.toLowerCase().includes(searchLower) ||
            (item.aadhaar && item.aadhaar.toLowerCase().includes(searchLower)) ||
            (item.gstin && item.gstin.toLowerCase().includes(searchLower))
        );
    });

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
            }}
        >
            <Worker
                title="Shop List"
                searchValue={searchText}
                setSearchValue={setSearchText}
                buttonText="Add New Shop"
                btnpath="/admin/shopmanagement/add"
            />

            <Card>
                <CardHeader sx={{paddingX: 3}} />

                <CardContent sx={{paddingTop: 0}}>
                    <TableContainer
                        component={Paper}
                        elevation={0}
                        sx={{
                            border: "1px solid black",
                            maxHeight: 500,
                            overflowY: "scroll",
                            scrollbarWidth: "thin",
                        }}
                    >
                        <Table stickyHeader sx={{borderRadius: 2}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 600, textAlign: "center", background: "#E0E9E9"}}>
                                        Sr.No.
                                    </TableCell>
                                    <TableCell sx={{fontWeight: 600, textAlign: "center", background: "#E0E9E9"}}>
                                        Shop Name
                                    </TableCell>
                                    <TableCell sx={{fontWeight: 600, textAlign: "center", background: "#E0E9E9"}}>
                                        Owner Name
                                    </TableCell>
                                    <TableCell sx={{fontWeight: 600, textAlign: "center", background: "#E0E9E9"}}>
                                        Email ID/Phone Number
                                    </TableCell>
                                    <TableCell sx={{fontWeight: 600, textAlign: "center", background: "#E0E9E9"}}>
                                        Shop Address
                                    </TableCell>
                                    <TableCell sx={{fontWeight: 600, textAlign: "center", background: "#E0E9E9"}}>
                                        Aadhaar
                                    </TableCell>
                                    <TableCell sx={{fontWeight: 600, textAlign: "center", background: "#E0E9E9"}}>
                                        GSTIN
                                    </TableCell>
                                    <TableCell sx={{fontWeight: 600, textAlign: "center", background: "#E0E9E9"}}>
                                        Status
                                    </TableCell>
                                    <TableCell sx={{fontWeight: 600, textAlign: "center", background: "#E0E9E9"}}>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData.map((item, index) => (
                                    <TableRow hover key={item.id}>
                                        <TableCell sx={{borderBottom: "none", py: 2}}>{index + 1}</TableCell>
                                        <TableCell sx={{borderBottom: "none"}}>{item.shopName}</TableCell>
                                        <TableCell sx={{borderBottom: "none"}}>{item.name}</TableCell>
                                        <TableCell sx={{borderBottom: "none"}}>{item.contact}</TableCell>
                                        <TableCell sx={{borderBottom: "none"}}>{item.address}</TableCell>
                                        <TableCell sx={{borderBottom: "none"}}>{item.aadhaar}</TableCell>
                                        <TableCell sx={{borderBottom: "none"}}>{item.gstin}</TableCell>
                                        <TableCell
                                            sx={{
                                                borderBottom: "none",
                                                color: item.status === "Active" ? "green" : "red",
                                            }}
                                        >
                                            {item.status}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: 1,
                                                borderBottom: "none",
                                            }}
                                        >
                                            <IconButton
                                                size="small"
                                                onClick={() =>
                                                    navigate(`/admin/shopmanagement/view/${item.id}`, {
                                                        state: {shop: item},
                                                    })
                                                }
                                            >
                                                <ViewIcon />
                                            </IconButton>

                                            <IconButton
                                                size="small"
                                                onClick={() =>
                                                    navigate(`/admin/shopmanagement/edit/${item.id}`, {
                                                        state: {
                                                            shop: {
                                                                ...item,
                                                                aadhaarNumber: item.aadhaar,
                                                                gstinNumber: item.gstin,
                                                            },
                                                        },
                                                    })
                                                }
                                            >
                                                <EditIcon />
                                            </IconButton>

                                            <IconButton size="small">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
}

export default ShopList;
