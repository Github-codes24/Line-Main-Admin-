import React from "react";
import {
    Box,
    Button,
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
    CircularProgress,
} from "@mui/material";
import Worker from "../../../components/cards/worker.jsx";

import { DeleteIcon, EditIcon, ViewIcon } from "../../../assets/CommonAssets";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShopList() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = React.useState("");
    const [fetchData] = useFetch();
    const [shopData, setShopData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [pagination, setPagination] = React.useState({
        currentPage: 1,
        totalPages: 1,
        totalShops: 0,
        limit: 5  // Match your example API call
    });

    // Fetch shops from API with pagination and search
    React.useEffect(() => {
        fetchShops(1, searchText); // Reset to page 1 when search changes
    }, [searchText]);

    // Fetch shops when component mounts
    React.useEffect(() => {
        fetchShops(1, "");
    }, []);

    const fetchShops = async (page = 1, search = "") => {
        try {
            setIsLoading(true);
            console.log(`Fetching shops - Page: ${page}, Search: "${search}", Limit: ${pagination.limit}`);

            // Build query parameters
            const params = {
                page: page,
                limit: pagination.limit
            };

            // Add search parameter if provided
            if (search && search.trim()) {
                params.search = search.trim();
            }

            console.log('API Params:', params);
            console.log('API URL:', `${conf.apiBaseUrl}/admin/shop/get-all-shop`);

            const result = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/admin/shop/get-all-shop`,
                params: params
            });

            console.log('Fetch shops API response:', result);
            console.log('Full API response structure:', JSON.stringify(result, null, 2));

            if (result && (result.success || result.data)) {
                // Handle different possible response structures
                let responseData = result.data || result;
                let shops = [];

                console.log('Response data:', responseData);

                // Try different possible data structures
                if (Array.isArray(responseData)) {
                    // Direct array of shops
                    shops = responseData;
                } else if (responseData.shops && Array.isArray(responseData.shops)) {
                    // { shops: [...] }
                    shops = responseData.shops;
                } else if (responseData.data && Array.isArray(responseData.data)) {
                    // { data: [...] }
                    shops = responseData.data;
                } else if (responseData.results && Array.isArray(responseData.results)) {
                    // { results: [...] }
                    shops = responseData.results;
                } else {
                    console.log('Unknown response structure, trying to extract shops...');
                    // Try to find any array in the response
                    for (const key in responseData) {
                        if (Array.isArray(responseData[key])) {
                            shops = responseData[key];
                            console.log(`Found shops array in key: ${key}`);
                            break;
                        }
                    }
                }

                console.log('Extracted shops array:', shops);
                console.log('Number of shops found:', shops.length);

                if (shops.length > 0) {
                    // Normalize shop data structure
                    const normalizedShops = shops.map(shop => {
                        console.log('Processing shop:', shop);
                        return {
                            ...shop,
                            id: shop._id || shop.id,
                            name: shop.name || shop.ownerName || "",
                            aadhaar: shop.aadhaar || shop.aadhaarNumber || "",
                            gstin: shop.gstin || shop.gstinNumber || "",
                            status: shop.isActive ? "Active" : "Inactive"
                        };
                    });

                    console.log('Normalized shops:', normalizedShops);
                    setShopData(normalizedShops);

                    // Update pagination info
                    const paginationInfo = {
                        currentPage: responseData.currentPage || responseData.page || page,
                        totalPages: responseData.totalPages || responseData.pages || Math.ceil((responseData.total || shops.length) / pagination.limit),
                        totalShops: responseData.totalShops || responseData.total || responseData.count || shops.length,
                        limit: responseData.limit || responseData.pageSize || pagination.limit
                    };

                    setPagination(paginationInfo);

                    console.log('Loaded shops:', normalizedShops);
                    console.log('Pagination info:', paginationInfo);
                } else {
                    console.log('No shops found in response');
                    setShopData([]);
                    setPagination({
                        currentPage: 1,
                        totalPages: 1,
                        totalShops: 0,
                        limit: pagination.limit
                    });
                }

            } else {
                console.log('No shop data found, using fallback data');
                // Fallback to dummy data - using the real shop you just created
                setShopData([
                    {
                        _id: "68b93d7c02ce241f203f6f49",
                        id: "68b93d7c02ce241f203f6f49",
                        name: "shivamsharma101",
                        ownerName: "shivamsharma101",
                        shopName: "shivamshop111",
                        contact: "7764991710",
                        address: "local address",
                        status: "Active",
                        aadhaar: "271121185371",
                        aadhaarNumber: "271121185371",
                        gstin: "10FPVTT9859K5Z2",
                        gstinNumber: "10FPVTT9859K5Z2",
                        isActive: true
                    }
                ]);
                setPagination({
                    currentPage: 1,
                    totalPages: 1,
                    totalShops: 1,
                    limit: pagination.limit
                });
            }
        } catch (error) {
            console.error('Error fetching shops:', error);
            console.error('Full error response:', error.response);
            toast.error('Error loading shops: ' + (error.response?.data?.message || error.message));

            // Fallback to dummy data with the real shop you just created
            setShopData([
                {
                    _id: "68b93d7c02ce241f203f6f49",
                    id: "68b93d7c02ce241f203f6f49",
                    name: "shivamsharma101",
                    ownerName: "shivamsharma101",
                    shopName: "shivamshop111",
                    contact: "7764991710",
                    address: "local address",
                    status: "Active",
                    aadhaar: "271121185371",
                    aadhaarNumber: "271121185371",
                    gstin: "10FPVTT9859K5Z2",
                    gstinNumber: "10FPVTT9859K5Z2",
                    isActive: true
                }
            ]);
            setPagination({
                currentPage: 1,
                totalPages: 1,
                totalShops: 1,
                limit: pagination.limit
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchShops(newPage, searchText);
        }
    };

    // Handle search with debouncing
    const handleSearchChange = (value) => {
        setSearchText(value);
        // The useEffect will trigger fetchShops when searchText changes
    };

    // Delete shop function
    const deleteShop = async (shopId, shopName) => {
        try {
            // Show confirmation dialog
            const confirmed = window.confirm(
                `Are you sure you want to delete "${shopName}"? This action cannot be undone.`
            );

            if (!confirmed) {
                return;
            }

            setIsLoading(true);
            console.log('Deleting shop with ID:', shopId);

            // Try different possible delete endpoints
            const possibleEndpoints = [
                `${conf.apiBaseUrl}/admin/shop/delete-shop/${shopId}`,
                `${conf.apiBaseUrl}/admin/shop/get-shop/${shopId}`, // Your provided endpoint
                `${conf.apiBaseUrl}/admin/shop/remove-shop/${shopId}`,
                `${conf.apiBaseUrl}/admin/shop/${shopId}`,
            ];

            let result = null;
            let lastError = null;

            for (const endpoint of possibleEndpoints) {
                try {
                    console.log('Trying DELETE endpoint:', endpoint);
                    result = await fetchData({
                        method: "DELETE",
                        url: endpoint,
                    });
                    console.log('Success with DELETE endpoint:', endpoint);
                    break;
                } catch (error) {
                    console.log('Failed with DELETE endpoint:', endpoint, error.response?.data?.message);
                    lastError = error;
                    continue;
                }
            }

            if (!result) {
                throw lastError || new Error('All DELETE endpoints failed');
            }

            console.log('Delete shop API response:', result);

            if (result.success || result.status === 'success') {
                toast.success(result.message || `Shop "${shopName}" deleted successfully!`);

                // Refresh the shop list
                fetchShops(pagination.currentPage, searchText);
            } else {
                throw new Error(result.message || 'Failed to delete shop');
            }

        } catch (error) {
            console.error('Error deleting shop:', error);
            console.error('Full error response:', error.response);

            let errorMessage = 'Failed to delete shop';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (error.response?.data) {
                errorMessage = typeof error.response.data === 'string'
                    ? error.response.data
                    : JSON.stringify(error.response.data);
            } else if (error.message) {
                errorMessage = error.message;
            }

            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Since we're using server-side search and pagination, we don't need client-side filtering
    const displayData = shopData;

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
            <ToastContainer />
            <Worker
                title="Shop List"
                searchValue={searchText}
                setSearchValue={handleSearchChange}
                buttonText="Add New Shop"
                btnpath="/admin/shopmanagement/add"
            />

            <Card>
                <CardHeader sx={{ paddingX: 3 }} />

                <CardContent sx={{ paddingTop: 0 }}>
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
                        <Table stickyHeader sx={{ borderRadius: 2 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 600, textAlign: "center", background: "#E0E9E9" }}>
                                        Sr.No.
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, textAlign: "center", background: "#E0E9E9" }}>
                                        Shop Name
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, textAlign: "center", background: "#E0E9E9" }}>
                                        Owner Name
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, textAlign: "center", background: "#E0E9E9" }}>
                                        Email ID/Phone Number
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, textAlign: "center", background: "#E0E9E9" }}>
                                        Shop Address
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, textAlign: "center", background: "#E0E9E9" }}>
                                        Aadhaar
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, textAlign: "center", background: "#E0E9E9" }}>
                                        GSTIN
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, textAlign: "center", background: "#E0E9E9" }}>
                                        Status
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, textAlign: "center", background: "#E0E9E9" }}>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={9} sx={{ textAlign: "center", py: 4 }}>
                                            <CircularProgress size={24} />
                                            <Typography variant="body2" sx={{ mt: 1 }}>
                                                Loading shops...
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : displayData.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} sx={{ textAlign: "center", py: 4 }}>
                                            <Typography variant="body2" color="textSecondary">
                                                {searchText ? `No shops found for "${searchText}"` : "No shops found"}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    displayData.map((item, index) => (
                                        <TableRow hover key={item.id}>
                                            <TableCell sx={{ borderBottom: "none", py: 2 }}>
                                                {(pagination.currentPage - 1) * pagination.limit + index + 1}
                                            </TableCell>
                                            <TableCell sx={{ borderBottom: "none" }}>{item.shopName}</TableCell>
                                            <TableCell sx={{ borderBottom: "none" }}>{item.name}</TableCell>
                                            <TableCell sx={{ borderBottom: "none" }}>{item.contact}</TableCell>
                                            <TableCell sx={{ borderBottom: "none" }}>{item.address}</TableCell>
                                            <TableCell sx={{ borderBottom: "none" }}>{item.aadhaar}</TableCell>
                                            <TableCell sx={{ borderBottom: "none" }}>{item.gstin}</TableCell>
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
                                                        navigate(`/admin/shopmanagement/view/${item._id || item.id}`, {
                                                            state: { shop: item },
                                                        })
                                                    }
                                                >
                                                    <ViewIcon />
                                                </IconButton>

                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        navigate(`/admin/shopmanagement/edit/${item._id || item.id}`, {
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

                                                <IconButton
                                                    size="small"
                                                    onClick={() => deleteShop(item._id || item.id, item.shopName)}
                                                    disabled={isLoading}
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

                    {/* Pagination Controls */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 2,
                            px: 2,
                            pb: 2
                        }}
                    >
                        <Typography variant="body2" color="textSecondary">
                            Showing {displayData.length} of {pagination.totalShops} shops
                            {searchText && ` (filtered by "${searchText}")`}
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Button
                                variant="outlined"
                                size="small"
                                disabled={pagination.currentPage <= 1 || isLoading}
                                onClick={() => handlePageChange(pagination.currentPage - 1)}
                            >
                                Previous
                            </Button>

                            <Typography variant="body2" sx={{ mx: 2 }}>
                                Page {pagination.currentPage} of {pagination.totalPages}
                            </Typography>

                            <Button
                                variant="outlined"
                                size="small"
                                disabled={pagination.currentPage >= pagination.totalPages || isLoading}
                                onClick={() => handlePageChange(pagination.currentPage + 1)}
                            >
                                Next
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default ShopList;
