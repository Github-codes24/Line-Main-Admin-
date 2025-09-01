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
    Typography,
    Pagination,
    CircularProgress
} from "@mui/material";
import Worker from "../../../components/cards/worker.jsx";

import {DeleteIcon, EditIcon, ViewIcon} from "../../../assets/CommonAssets";
import {useNavigate} from "react-router-dom";
import {getAllShops, deleteShop} from "../../../config/index.js";

function ShopList() {
    const navigate = useNavigate();
    
    // State management
    const [searchText, setSearchText] = React.useState("");
    const [shops, setShops] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    
    // Pagination state
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage] = React.useState(5);
    const [totalPages, setTotalPages] = React.useState(1);
    const [totalItems, setTotalItems] = React.useState(0);

    // Fetch shops function
    const fetchShops = async (page = 1, search = "") => {
        setLoading(true);
        setError("");
        
        try {
            console.log("Fetching shops - Page:", page, "Search:", search);
            const response = await getAllShops(page, itemsPerPage, search);
            
            if (response.success) {
                setShops(response.data || []);
                setTotalPages(response.totalPages || 1);
                setTotalItems(response.totalItems || 0);
                setCurrentPage(page);
            } else {
                setError(response.message || "Failed to fetch shops");
            }
        } catch (error) {
            console.error("Error fetching shops:", error);
            setError("Failed to load shops");
        } finally {
            setLoading(false);
        }
    };

    // Handle search
    const handleSearch = (searchValue) => {
        setSearchText(searchValue);
        setCurrentPage(1); // Reset to first page when searching
        fetchShops(1, searchValue);
    };

    // Handle page change
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
        fetchShops(page, searchText);
    };

    // Handle delete shop
    const handleDeleteShop = async (shopId, shopName) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${shopName}"? This action cannot be undone.`
        );
        
        if (!confirmDelete) return;

        try {
            console.log("Deleting shop with ID:", shopId);
            const response = await deleteShop(shopId);
            
            if (response.success) {
                // Refresh the shop list after successful deletion
                fetchShops(currentPage, searchText);
                alert("Shop deleted successfully!");
            } else {
                alert(response.message || "Failed to delete shop");
            }
        } catch (error) {
            console.error("Error deleting shop:", error);
            alert("Failed to delete shop. Please try again.");
        }
    };

    // Load shops on component mount
    React.useEffect(() => {
        fetchShops(1, "");
    }, []);

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
                setSearchValue={handleSearch}
                buttonText="Add New Shop"
                btnpath="/admin/shopmanagement/add"
            />

            <Card>
                <CardHeader sx={{paddingX: 3}} />

                <CardContent sx={{paddingTop: 0}}>
                    {/* Error Display */}
                    {error && (
                        <Box sx={{ mb: 2, textAlign: "center" }}>
                            <Typography color="error" variant="body2">
                                {error}
                            </Typography>
                        </Box>
                    )}

                    {/* Loading State */}
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
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
                                        {shops.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={9} sx={{ textAlign: 'center', py: 4 }}>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {searchText ? 'No shops found matching your search.' : 'No shops available.'}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            shops.map((item, index) => (
                                                <TableRow hover key={item._id}>
                                                    <TableCell sx={{borderBottom: "none", py: 2}}>
                                                        {(currentPage - 1) * itemsPerPage + index + 1}
                                                    </TableCell>
                                                    <TableCell sx={{borderBottom: "none"}}>{item.shopName}</TableCell>
                                                    <TableCell sx={{borderBottom: "none"}}>{item.ownerName}</TableCell>
                                                    <TableCell sx={{borderBottom: "none"}}>{item.contact}</TableCell>
                                                    <TableCell sx={{borderBottom: "none"}}>{item.address}</TableCell>
                                                    <TableCell sx={{borderBottom: "none"}}>{item.aadhaarNumber}</TableCell>
                                                    <TableCell sx={{borderBottom: "none"}}>{item.gstin || 'N/A'}</TableCell>
                                                    <TableCell
                                                        sx={{
                                                            borderBottom: "none",
                                                            color: item.isActive ? "green" : "red",
                                                        }}
                                                    >
                                                        {item.isActive ? "Active" : "Inactive"}
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
                                                                navigate(`/admin/shopmanagement/view/${item._id}`, {
                                                                    state: {shop: item},
                                                                })
                                                            }
                                                        >
                                                            <ViewIcon />
                                                        </IconButton>

                                                        <IconButton
                                                            size="small"
                                                            onClick={() =>
                                                                navigate(`/admin/shopmanagement/edit/${item._id}`, {
                                                                    state: {
                                                                        shop: {
                                                                            ...item,
                                                                            name: item.ownerName,
                                                                            gstinNumber: item.gstin,
                                                                        },
                                                                    },
                                                                })
                                                            }
                                                        >
                                                            <EditIcon />
                                                        </IconButton>

                                                        <IconButton 
                                                            size="small"
                                                            onClick={() => handleDeleteShop(item._id, item.shopName)}
                                                            sx={{ color: 'error.main' }}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                    <Pagination
                                        count={totalPages}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        color="primary"
                                        showFirstButton
                                        showLastButton
                                    />
                                </Box>
                            )}

                            {/* Results Info */}
                            <Box sx={{ mt: 2, textAlign: 'center' }}>
                                <Typography variant="body2" color="textSecondary">
                                    Showing {shops.length} of {totalItems} shops
                                    {searchText && ` for "${searchText}"`}
                                </Typography>
                            </Box>
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}

export default ShopList;
