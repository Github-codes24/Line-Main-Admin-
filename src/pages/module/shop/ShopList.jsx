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
import { useNavigate, useLocation } from "react-router-dom";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function ShopList() {
  const navigate = useNavigate();
  const location = useLocation();

  
// Delete modal state
const [deleteModalOpen, setDeleteModalOpen] = useState(false);
const [selectedShop, setSelectedShop] = useState(null);

  // State management
  const [searchText, setSearchText] = React.useState("");
  const [fetchData] = useFetch();
  const [shopData, setShopData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [pagination, setPagination] = React.useState({
    currentPage: 1,
    totalPages: 1,
    totalShops: 0,
    limit: 3,  // Show 5 shops per page
  });


  // Fetch shops from API with pagination and search
  React.useEffect(() => {
    fetchShops(1, searchText); // Reset to page 1 when search changes
  }, [searchText]);

  // Function to get total count of shops
  const getTotalShopsCount = async () => {
    try {
      const countResult = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/admin/Shop/get-all-shop`,
        params: { page: 1, limit: 1 } // Just get 1 item to check total
      });
      
      console.log('Count API response:', countResult);
      return countResult.totalShops || countResult.total || countResult.count || countResult.totalCount || 0;
    } catch (error) {
      console.error('Error getting total count:', error);
      return 0;
    }
  };

  // Fetch shops when component mounts and when location changes
 React.useEffect(() => {
  fetchShops(1, searchText);
}, [searchText, location.pathname, location.key]);


const fetchShops = async (page = 1, search = "") => {
  try {
    setIsLoading(true);

    const params = {
      page: page, // IMPORTANT: use the page param here
      limit: pagination.limit, // 5 per page
    };

    if (search && search.trim()) params.search = search.trim();

    const result = await fetchData({
      method: "GET",
      url: `${conf.apiBaseUrl}/admin/shop/get-all-shop`,
      params: params,
    });

    if (!result.data) throw new Error("Invalid API response");

    const shops = Array.isArray(result.data)
      ? result.data
      : Array.isArray(result.data.shops)
      ? result.data.shops
      : [];

    setShopData(shops);
    // Get total shops count from API
    const totalShops =
      result.data.totalShops ||
      result.data.total ||
      result.totalShops ||
      shops.length;

    // Normalize shops
    const normalizedShops = shops.map((shop) => ({
      ...shop,
      id: shop._id || shop.id,
      name: shop.ownerName || shop.name || "",
      shopName: shop.shopName || "",
      contact: shop.contact || "",
      address: shop.address || "",
      aadhaar: shop.aadhaarNumber || shop.aadhaar || "",
      gstin: shop.gstin || shop.gstinNumber || "",
      status: shop.isActive ? "Active" : "Inactive",
    }));

    setShopData(normalizedShops);

    // Update pagination info
     setPagination({
      currentPage: result.pagination?.currentPage || page,
      totalPages: result.pagination?.totalPages || 1,
      totalShops: result.pagination?.totalUsers || shops.length,
      limit: result.pagination?.usersPerPage || pagination.limit,
    });

  } catch (err) {
    console.error(err);
    setShopData([]);
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
  fetchShops(1, value); // always start from page 1
};



const deleteShop = async (shopId) => {
  try {
    setIsLoading(true);
    const result = await fetchData({
      method: "DELETE",
      url: `${conf.apiBaseUrl}/admin/shop/delete-shop/${shopId}`, // use your proper endpoint
    });

    if (result.success || result.status === 'success') {
      toast.success(result.message || `Shop deleted successfully!`);
      fetchShops(pagination.currentPage, searchText);
    } else {
      throw new Error(result.message || 'Failed to delete shop');
    }
  } catch (error) {
    console.error(error);
    toast.error(error.message || 'Failed to delete shop');
  } finally {
    setIsLoading(false);
    setDeleteModalOpen(false); // close modal
  }
};



  // Since we're using server-side search and pagination, we don't need client-side filtering
  const displayData = shopData;

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 0 }}>
      <ToastContainer />

      {/* Header Layout */}
      {/* <div className="bg-white p-1 shadow-md mb-0 rounded-md relative flex items-center min-h-[65px]"> */}
      <div className="bg-white p-2 shadow-md mt-0 rounded-md flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 relative min-h-[65px]">
  {/* Title on left */}
  <h1 className="text-xl font-semibold ml-2 z-10">Shop List</h1>

  {/* Search Bar */}
  <div className="w-full sm:w-[400px] mx-auto sm:mx-0 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">
    <div className="relative">
      {/* Search Icon */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
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

      {/* Input */}
      <input
        type="text"
        placeholder="Search by Name, Phone Number, Email, Shop....."
        value={searchText}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="w-full h-10 pl-12 pr-4 placeholder:font-bold placeholder:text-[#0D2E28] rounded-full text-sm border border-[#001580] bg-[#E4E5EB] text-[#0D2E28] focus:outline-none"
      />
    </div>
  </div>

  {/* Add Shop Button */}
  <div className="sm:ml-auto sm:mr-2 w-full sm:w-auto flex justify-center sm:justify-end">
    <button
      onClick={() => navigate('/admin/shopmanagement/add')}
      className="flex items-center gap-2 bg-[#001580] text-white px-4 py-2 rounded-md hover:bg-[#001580]/90 transition-colors w-full sm:w-auto justify-center"
    >
      + Add New Shop
    </button>
  </div>
</div>


      {/* Table */}
      <Card sx={{ mt: 2 }}>
        <CardHeader sx={{ px: 3 }} />
        <CardContent sx={{ pt: 0 }}>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              border: "1px solid #bbb"

              
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
  <CircularProgress size={24} sx={{ color: "#001580" }} /> 
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
    <TableCell sx={{ borderBottom: 'none' }}>
      {(pagination.currentPage - 1) * pagination.limit + index + 1}
    </TableCell>
    <TableCell sx={{ borderBottom: 'none' }}>{item.shopName}</TableCell>
    <TableCell sx={{ borderBottom: 'none' }}>{item.name}</TableCell>
    <TableCell sx={{ borderBottom: 'none' }}>{item.contact}</TableCell>
    <TableCell sx={{ borderBottom: 'none' }}>{item.address}</TableCell>
    <TableCell sx={{ borderBottom: 'none' }}>{item.aadhaar}</TableCell>
    <TableCell sx={{ borderBottom: 'none' }}>{item.gstin}</TableCell>
<TableCell
  sx={{
    borderBottom: "none",
    color: item.status === "Active" ? "green" : "red",
  }}
>
  {item.status}
</TableCell>

<TableCell sx={{ borderBottom: "none" }}>
  <span style={{ display: "inline-flex", gap: "4px", verticalAlign: "middle" }}>
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
          state: { shop: { ...item, aadhaarNumber: item.aadhaar, gstinNumber: item.gstin } },
        })
      }
    >
      <EditIcon />
    </IconButton>
    <IconButton
      size="small"
      onClick={() => {
        setSelectedShop(item);
        setDeleteModalOpen(true);
      }}
      disabled={isLoading}
    >
      <DeleteIcon />
    </IconButton>
  </span>
</TableCell>

  </TableRow>
))

                  
                )}
              </TableBody>
            </Table>
          </TableContainer>

{deleteModalOpen && selectedShop && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
      <h2 className="text-xl font-bold text-center text-[#0D2E28] mb-3">
        Delete Shop
      </h2>
      <p className="text-[#0D2E28] text-center mb-6 leading-relaxed">
        Are you sure you want to delete "{selectedShop.shopName}"?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setDeleteModalOpen(false)}
          className="px-16 py-2 rounded-md border border-[#001580] bg-[#CED4F2] text-[#001580] font-medium hover:opacity-90 transition"
        >
          Cancel
        </button>
        <button
          onClick={() => deleteShop(selectedShop._id || selectedShop.id)}
          className="px-16 py-2 rounded-md border border-[#001580] bg-[#001580] text-white font-medium hover:opacity-90 transition"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

          {/* Pagination */}
          {pagination && pagination.totalShops > 0 && pagination.totalPages > 0 && (
            <div className="flex flex-col md:flex-row items-center justify-between bg-[#F5F5F5] mt-5 rounded-lg shadow text-sm text-gray-700 gap-4 py-4 px-6">
              <p className="font-bold text-black">
                Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
                {Math.min(pagination.currentPage * pagination.limit, pagination.totalShops)} of {pagination.totalShops} Entries
                {/* {pagination.totalPages > 1 && ` (Page ${pagination.currentPage} of ${pagination.totalPages})`} */}
              </p>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="px-2 py-1 bg-white text-[#001580] border rounded-md hover:bg-green-50 disabled:opacity-50"
                >
                  &lt;
                </button>

                {console.log('Rendering pagination - totalPages:', pagination.totalPages, 'currentPage:', pagination.currentPage)}
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pg) => {
                  console.log('Rendering page button:', pg);
                  return (
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
                  );
                })}

                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
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