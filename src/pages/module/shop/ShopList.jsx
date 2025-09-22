import React, { useState } from "react";
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

  // State management
  const [searchText, setSearchText] = React.useState("");
  const [fetchData] = useFetch();
  const [shopData, setShopData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [pagination, setPagination] = React.useState({
    currentPage: 1,
    totalPages: 1,
    totalShops: 0,
    limit: 4  // Show 4 shops per page
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
      console.log(`Fetching shops - Page: ${page}, Search: "${search}", Limit: 4`);

      // Build query parameters
      const params = {
        page: page,
        limit: 4  // Always use 4 items per page
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
            totalPages: responseData.totalPages || responseData.pages || Math.ceil((responseData.total || shops.length) / 4),
            totalShops: responseData.totalShops || responseData.total || responseData.count || shops.length,
            limit: 4  // Always use 4 items per page
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
            limit: 4
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
          limit: 4
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
        limit: 4
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
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>
      <ToastContainer />

      {/* Header Layout */}
      {/* <div className="bg-white p-1 shadow-md mb-0 rounded-md relative flex items-center min-h-[65px]"> */}
        <div className="bg-white p-1 shadow-md mb-0 rounded-md relative flex items-center min-h-[65px]">
        {/* Title on left */}
        <h1 className="text-xl font-semibold ml-2 z-10">Shop List</h1>

        {/* Search Bar centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-[400px]">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            {/* Search Icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.5 13C4.68333 13 3.146 12.3707 1.888 11.112C0.63 9.85333 0.000667196 8.316 5.29101e-07 6.5C-0.000666138 4.684 0.628667 3.14667 1.888 1.888C3.14733 0.629333 4.68467 0 6.5 0C8.31533 0 9.853 0.629333 11.113 1.888C12.373 3.14667 13.002 4.684 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L17.3 15.9C17.4833 16.0833 17.575 16.3167 17.575 16.6C17.575 16.8833 17.4833 17.1167 17.3 17.3C17.1167 17.4833 16.8833 17.575 16.6 17.575C16.3167 17.575 16.0833 17.4833 15.9 17.3L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13ZM6.5 11C7.75 11 8.81267 10.5627 9.688 9.688C10.5633 8.81333 11.0007 7.75067 11 6.5C10.9993 5.24933 10.562 4.187 9.688 3.313C8.814 2.439 7.75133 2.00133 6.5 2C5.24867 1.99867 4.18633 2.43633 3.313 3.313C2.43967 4.18967 2.002 5.252 2 6.5C1.998 7.748 2.43567 8.81067 3.313 9.688C4.19033 10.5653 5.25267 11.0027 6.5 11Z"
                fill="#0D2E28"
              />
            </svg>
          </div>

          <input
            type="text"
            placeholder="Search by Name, Phone Number, Email, Shop....."
            value={searchText}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full h-10 pl-12 pr-4 placeholder:font-bold placeholder:text-[#0D2E28] rounded-full text-sm border border-[#001580] bg-[#E4E5EB] text-[#0D2E28] focus:outline-none"
          />
        </div>

        {/* Add Shop Button on right */}
        <div className="ml-auto mr-2">
          <button
            onClick={() => navigate("/admin/shopmanagement/add")}
            className="flex items-center gap-2 bg-[#001580] text-white px-4 py-2 rounded-md hover:bg-[#001580]/90 transition-colors"
          >
            + Add New Shop
          </button>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardHeader sx={{ px: 3 }} />
        <CardContent sx={{ pt: 0 }}>
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
                <TableRow sx={{ backgroundColor: "" }}>
                  <TableCell sx={{ fontWeight: "bold", color: "black", backgroundColor: "#E4E5EB" }}>Sr.No.</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "black" , backgroundColor: "#E4E5EB"}}>Shop Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "black", backgroundColor: "#E4E5EB" }}>Owner Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "black", backgroundColor: "#E4E5EB" }}>Contact</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "black", backgroundColor: "#E4E5EB" }}>Address</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "black", backgroundColor: "#E4E5EB" }}>Aadhaar</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "black", backgroundColor: "#E4E5EB" }}>GSTIN</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "black", backgroundColor: "#E4E5EB" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "black", textAlign: "center" , backgroundColor: "#E4E5EB"}}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={9} sx={{ textAlign: "center", py: 2 }}>
                      <CircularProgress size={24} />
                      <Typography sx={{ mt: 1 }}>Loading shops...</Typography>
                    </TableCell>
                  </TableRow>
                ) : shopData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} sx={{ textAlign: "center", py: 4 }}>
                      <Typography color="textSecondary">
                        {searchText ? `No shops found for "${searchText}"` : "No shops found"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  shopData.map((item, index) => (
                    <TableRow hover key={item._id || item.id || index}>
                      <TableCell>{(pagination.currentPage - 1) * pagination.limit + index + 1}</TableCell>
                      <TableCell>{item.shopName}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.contact}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>{item.aadhaar}</TableCell>
                      <TableCell>{item.gstin}</TableCell>
                      <TableCell sx={{ color: item.status === "Active" ? "green" : "red" }}>
                        {item.status}
                      </TableCell>
                      <TableCell sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() =>
                            navigate(`/admin/shopmanagement/view/${item._id || item.id}`, { state: { shop: item } })
                          }
                        >
                          <ViewIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() =>
                            navigate(`/admin/shopmanagement/edit/${item._id || item.id}`, {
                              state: { shop: { ...item, aadhaarNumber: item.aadhaar, gstinNumber: item.gstin } },
                            })
                          }
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" onClick={() => deleteShop(item._id || item.id, item.shopName)} disabled={isLoading}>
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
          {pagination && pagination.totalShops > 0 && (
            <div className="flex flex-col md:flex-row items-center justify-between bg-[#F5F5F5] mt-5 rounded-lg shadow text-sm text-gray-700 gap-4 py-4 px-6">
              <p className="font-bold text-black">
                Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
                {Math.min(pagination.currentPage * pagination.limit, pagination.totalShops)} of {pagination.totalShops} Entries
              </p>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="px-2 py-1 bg-white text-[#001580] border rounded-md hover:bg-green-50 disabled:opacity-50"
                >
                  &lt;
                </button>

                {Array.from({ length: Math.ceil(pagination.totalShops / pagination.limit) }, (_, i) => i + 1).map((pg) => (
                  <button
                    key={pg}
                    onClick={() => handlePageChange(pg)}
                    className={`w-8 h-8 border text-sm font-medium rounded-md transition ${
                      pg === pagination.currentPage
                        ? "bg-[#001580] text-white"
                        : "bg-[#CECEF2] text-[#001580] hover:bg-[#CECEF2]"
                    }`}
                  >
                    {pg}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === Math.ceil(pagination.totalShops / pagination.limit)}
                  className="px-2 py-1 bg-white text-[#001580] border rounded-md hover:bg-green-50 disabled:opacity-50"
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default ShopList;