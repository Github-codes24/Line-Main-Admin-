import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, Trash2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";
import Pagination from "../../../components/ui/Pagination.jsx";

const ShopList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [fetchData] = useFetch();

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  // Add window focus listener to refresh data when returning to the page
  useEffect(() => {
    const handleFocus = () => {
      console.log("Window focused, refreshing shop list");
      fetchAllShops(currentPage);
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [currentPage]);



  useEffect(() => {
    if (location.state?.updated) {
      console.log("Refreshing shop list due to update from view page");
      fetchAllShops(currentPage); // refresh list after returning from View page
      navigate(location.pathname, { replace: true, state: {} }); // clear state to prevent infinite loop
    }
  }, [location.state]);

  // Also refresh when component mounts or page changes
  useEffect(() => {
    fetchAllShops(currentPage);
  }, [currentPage]);


  const fetchAllShops = async (page = currentPage) => {
    try {
      setError("");
      setIsLoading(true);

      // Try with pagination first, fallback to without pagination
      let result;
      try {
        result = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/admin/shop/get-all-shop?page=${page}&limit=${recordsPerPage}`,
        });
      } catch (paginationError) {
        console.log('Pagination API failed, trying without pagination:', paginationError);
        result = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/admin/shop/get-all-shop`,
        });
      }

      console.log('Full API Response:', result);

      // More flexible success condition
      if (result.success || result.data || result.shops || result.users) {
        // Try different possible data structures
        let shopData = [];

        if (result.shops) {
          shopData = result.shops;
        } else if (result.users) {
          shopData = result.users;
        } else if (result.data?.shops) {
          shopData = result.data.shops;
        } else if (Array.isArray(result.data)) {
          shopData = result.data;
        } else if (result.data) {
          shopData = [result.data];
        }

        console.log('Extracted shop data:', shopData);

        // Debug each shop's ID fields
        shopData.forEach((shop, index) => {
          console.log(`Shop ${index}:`, {
            originalId: shop.id,
            originalMongoId: shop._id,
            shopName: shop.shopName,
            hasId: !!shop.id,
            hasMongoId: !!shop._id
          });
        });

        const normalizedShops = shopData.map((shop, index) => {
          // Determine status more reliably
          let status = "Inactive"; // default
          if (shop.status === "Active" || shop.status === "active") {
            status = "Active";
          } else if (shop.status === "Inactive" || shop.status === "inactive") {
            status = "Inactive";
          } else if (shop.isActive === true) {
            status = "Active";
          } else if (shop.isActive === false) {
            status = "Inactive";
          }

          const normalizedShop = {
            ...shop,
            name: shop.ownerName || shop.name || 'N/A',
            shopName: shop.shopName || 'N/A',
            contact: shop.contact || shop.phone || shop.email || 'N/A',
            address: shop.address || shop.location || 'N/A',
            aadhaar: shop.aadhaarNumber || shop.aadhaar || 'N/A',
            gstin: shop.gstin || shop.gstinNumber || 'N/A',
            status: status,
            isActive: status === "Active",
            id: shop.id || shop._id || `temp-id-${index}` // Fallback ID
          };

          console.log(`Normalized shop ${index}:`, {
            finalId: normalizedShop.id,
            shopName: normalizedShop.shopName
          });

          return normalizedShop;
        });

        setShops(normalizedShops);

        // Use API pagination data if available
        if (result.pagination) {
          setTotalRecords(result.pagination.totalShops || result.pagination.totalUsers || result.pagination.total || 0);
          setTotalPages(result.pagination.totalPages || 1);
        } else {
          // Fallback: use client-side pagination
          setTotalRecords(shopData.length);
          setTotalPages(Math.ceil(shopData.length / recordsPerPage));
        }

        if (normalizedShops.length === 0) {
          toast.info('No shops found');
        } else {
          console.log('Fetched shops:', normalizedShops.length, 'shops');
        }
      } else {
        console.log('API call failed or no data:', result);
        setError(result.message || 'Failed to fetch shops');
        setShops([]);
      }
    } catch (err) {
      console.error('Error fetching shops:', err);
      setError(err.response?.data?.message || err.message || 'Error fetching shops');
      setShops([]);
    } finally {
      setIsLoading(false);
    }
  };





  const deleteShop = async (shopId) => {
    try {
      setIsLoading(true);

      const result = await fetchData({
        method: "DELETE",
        url: `${conf.apiBaseUrl}/admin/Shop/delete-shop/${shopId}`,
      });

      if (result.success) {
        toast.success(result.message || 'Shop deleted successfully');
        fetchAllShops(); // Refresh list
      } else {
        toast.error(result.message || 'Failed to delete shop');
      }
    } catch (err) {
      console.error('Delete error:', err);
      toast.error(err.response?.data?.message || err.message || 'Error deleting shop');
    } finally {
      setIsLoading(false);
    }
  };

  // For search, we'll filter client-side for now
  const filteredShops = shops.filter((shop) => {
    if (!shop) return false;

    const searchLower = searchTerm.toLowerCase();
    return (
      (shop.name && shop.name.toLowerCase().includes(searchLower)) ||
      (shop.shopName && shop.shopName.toLowerCase().includes(searchLower)) ||
      (shop.contact && shop.contact.toLowerCase().includes(searchLower)) ||
      (shop.address && shop.address.toLowerCase().includes(searchLower))
    );
  });

  // Use API pagination data instead of calculating client-side
  const currentRecords = searchTerm ? filteredShops : shops;
  const displayTotalPages = searchTerm ? Math.ceil(filteredShops.length / recordsPerPage) : totalPages;
  const displayTotalRecords = searchTerm ? filteredShops.length : totalRecords;
  const indexOfFirstRecord = searchTerm ? 0 : (currentPage - 1) * recordsPerPage;

  const goToPage = (pg) => {
    if (pg >= 1 && pg <= displayTotalPages) {
      setCurrentPage(pg);
      if (!searchTerm) {
        // Only fetch new data if not searching (since search is client-side for now)
        fetchAllShops(pg);
      }
    }
  };

  return (
    <div className="bg-[#E0E9E9] min-h-screen w-full font-myfont">
      <ToastContainer />

      {/* Header */}
      <div className="bg-white p-3 shadow-md mb-4 rounded-md min-h-[65px]">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-3 relative">

          {/* Title */}
          <h1 className="text-xl text-[#333333] font-semibold">Shop List</h1>

          {/* Search Bar */}
          {/* Desktop Centered */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-[400px]">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M6.5 13C4.68 13 3.15 12.37 1.89 11.11C0.63 9.85 0 8.32 0 6.5C0 4.68 0.63 3.15 1.89 1.89C3.15 0.63 4.68 0 6.5 0C8.32 0 9.85 0.63 11.11 1.89C12.37 3.15 13 4.68 13 6.5C13 7.23 12.88 7.93 12.65 8.58C12.42 9.23 12.1 9.8 11.7 10.3L17.3 15.9C17.48 16.08 17.58 16.32 17.58 16.6C17.58 16.88 17.48 17.12 17.3 17.3C17.12 17.48 16.88 17.58 16.6 17.58C16.32 17.58 16.08 17.48 15.9 17.3L10.3 11.7C9.8 12.1 9.23 12.42 8.58 12.65C7.93 12.88 7.23 13 6.5 13ZM6.5 11C7.75 11 8.81 10.56 9.69 9.69C10.56 8.81 11 7.75 11 6.5C11 5.25 10.56 4.19 9.69 3.31C8.81 2.44 7.75 2 6.5 2C5.25 2 4.19 2.44 3.31 3.31C2.44 4.19 2 5.25 2 6.5C2 7.75 2.44 8.81 3.31 9.69C4.19 10.56 5.25 11 6.5 11Z"
                    fill="#0D2E28"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by Name, Phone Number, Email, Shop..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-12 pr-4 placeholder:font-semibold placeholder:text-[#0D2E28] rounded-full text-sm border border-[#001580] bg-[#E4E5EB] text-[#0D2E28] focus:outline-none"
              />
            </div>
          </div>

          {/* Mobile Full Width */}
          <div className="block md:hidden w-full">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M6.5 13C4.68 13 3.15 12.37 1.89 11.11C0.63 9.85 0 8.32 0 6.5C0 4.68 0.63 3.15 1.89 1.89C3.15 0.63 4.68 0 6.5 0C8.32 0 9.85 0.63 11.11 1.89C12.37 3.15 13 4.68 13 6.5C13 7.23 12.88 7.93 12.65 8.58C12.42 9.23 12.1 9.8 11.7 10.3L17.3 15.9C17.48 16.08 17.58 16.32 17.58 16.6C17.58 16.88 17.48 17.12 17.3 17.3C17.12 17.48 16.88 17.58 16.6 17.58C16.32 17.58 16.08 17.48 15.9 17.3L10.3 11.7C9.8 12.1 9.23 12.42 8.58 12.65C7.93 12.88 7.23 13 6.5 13ZM6.5 11C7.75 11 8.81 10.56 9.69 9.69C10.56 8.81 11 7.75 11 6.5C11 5.25 10.56 4.19 9.69 3.31C8.81 2.44 7.75 2 6.5 2C5.25 2 4.19 2.44 3.31 3.31C2.44 4.19 2 5.25 2 6.5C2 7.75 2.44 8.81 3.31 9.69C4.19 10.56 5.25 11 6.5 11Z"
                    fill="#0D2E28"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-12 pr-4 rounded-full text-sm border border-[#001580] bg-[#E4E5EB] text-[#0D2E28] focus:outline-none"
              />
            </div>
          </div>

          {/* Add Button */}
          <div className="w-full md:w-auto">
            <button
              onClick={() => navigate('/admin/shopmanagement/add')}
              className="w-full md:w-auto flex items-center gap-2 bg-[#001580] text-white px-4 py-2 rounded-md hover:bg-[#001580]/90 transition-colors justify-center"
            >
              + Add New Shop
            </button>
          </div>
        </div>
      </div>


      {/* Main Content Box */}
      <div className="bg-white p-4 shadow rounded-md">
        <div className="overflow-x-auto bg-white shadow-md rounded-lg min-h-[600px] border border-gray-400">

          {isLoading ? (
            <div className="flex justify-center items-center h-[400px]">
              <svg
                className="animate-spin h-10 w-10 text-[#001580]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-100"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="60"
                  strokeDashoffset="20"
                ></circle>
              </svg>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-[400px]">
              <div className="text-lg text-red-500">{error}</div>
            </div>
          ) : (
            <table className="w-full text-center text-sm text-[#0D2E28]">

              <thead className="bg-[#E4E5EB]">
                <tr className="h-14">
                  <th
                    className="text-center align-middle text-[#0D2E28] font-poppins font-medium text-[16px] pl-2"
                    style={{ opacity: 1 }}
                  >
                    Sr.No.
                  </th>
                  <th
                    className="text-center align-middle text-[#0D2E28] font-poppins font-medium text-[16px] pl-3"
                    style={{ opacity: 1 }}
                  >
                    Shop Name
                  </th>
                  <th
                    className="text-center align-middle text-[#0D2E28] font-poppins font-medium text-[16px] pl-3"
                    style={{ opacity: 1 }}
                  >
                    Owner Name
                  </th>
                  <th
                    className="text-center align-middle text-[#0D2E28] font-poppins font-medium text-[16px] pl-3"
                    style={{ opacity: 1 }}
                  >
                    Email ID/Phone Number
                  </th>
                  <th
                    className="text-center align-middle text-[#0D2E28] font-poppins font-medium text-[16px]"
                    style={{ opacity: 1 }}
                  >
                    Shop Address
                  </th>
                  <th
                    className="text-center align-middle text-[#0D2E28] font-poppins font-medium text-[16px]"
                    style={{ opacity: 1 }}
                  >
                    Status
                  </th>
                  <th
                    className="text-center align-middle text-[#0D2E28] font-poppins font-medium text-[16px]"
                    style={{ opacity: 1 }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-lg text-gray-500">
                      No shops found
                    </td>
                  </tr>
                ) : (
                  currentRecords.map((shop, index) => (
                    <tr key={shop.id || shop._id}>
                      <td
                        className="text-center align-middle text-[#0D2E28] font-poppins font-normal text-[14px] leading-[100%]"
                        style={{ opacity: 1 }}
                      >
                        {indexOfFirstRecord + index + 1}
                      </td>
                      <td
                        className="text-center align-middle text-[#0D2E28] font-poppins font-normal text-[14px] leading-[100%]"
                        style={{ opacity: 1 }}
                      >
                        {shop.shopName}
                      </td>
                      <td
                        className="text-center align-middle text-[#0D2E28] font-poppins font-normal text-[14px] leading-[100%]"
                        style={{ opacity: 1 }}
                      >
                        {shop.name}
                      </td>
                      <td
                        className="text-center align-middle text-[#0D2E28] font-poppins font-normal text-[14px] leading-[100%]"
                        style={{ opacity: 1 }}
                      >
                        {shop.contact}
                      </td>
                      {/* <td
                        className="text-center align-middle text-[#0D2E28] font-poppins font-normal text-[14px] leading-[100%]"
                        style={{ opacity: 1 }}
                      >
                        {shop.address}
                      </td> */}
                      <td
                    className="text-center align-middle text-[#0D2E28] font-poppins font-normal text-[14px] leading-[100%]"
                     style={{ opacity: 1 }}
                      title={shop.address} // full address shown on hover
                      >
                  {shop.address
                   ? shop.address.split(" ").slice(0, 3).join(" ") + (shop.address.split(" ").length > 3 ? "" : "")
                   : "N/A"}
                      </td>

                      <td
                        className="text-center align-middle text-[#0D2E28] font-poppins font-normal text-[14px] leading-[100%]"
                        style={{ opacity: 1 }}
                      >
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${shop.status === 'Active' ? 'text-[#34C759]' : 'text-[#FF383C]'}`}>
                          {shop.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center space-x-4">
                          <button
                            onClick={() => navigate(`/admin/shopmanagement/view/${shop.id || shop._id}`, {
                              state: { shop }
                            })}
                            className="text-[#F15A29] hover:text-orange-700"
                          >
                            <Eye size={20} />
                          </button>
                          <button
                            onClick={() => {
                              console.log('Edit button clicked for shop:', shop);
                              console.log('Shop ID for navigation:', shop.id || shop._id);
                              navigate(`/admin/shopmanagement/edit/${shop.id || shop._id}`, {
                                state: { shop }
                              });
                            }}
                            className="text-[#F15A29] hover:text-orange-700"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                                stroke="#EC2D01"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z"
                                stroke="#EC2D01"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedShop(shop);
                              setDeleteModalOpen(true);
                            }}
                            className="text-[#F15A29] hover:text-orange-700"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {deleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
              {/* Heading */}
              <h2 className="text-xl font-bold text-center text-[#0D2E28] mb-3">
                Delete Shop
              </h2>

              {/* Paragraph */}
              <p className="text-[#0D2E28] text-center mb-6 leading-relaxed">
                Are you sure you want to delete this shop? <br />
              </p>

              {/* Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-16 py-2 rounded-md border border-[#001580] bg-[#CED4F2] text-[#001580] font-medium hover:opacity-90 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteShop(selectedShop.id || selectedShop._id);
                    setDeleteModalOpen(false);
                  }}
                  className="px-16 py-2 rounded-md border border-[#001580] bg-[#001580] text-white font-medium hover:opacity-90 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalRecords={displayTotalRecords}
          recordsPerPage={recordsPerPage}
          goToPage={goToPage}
          label="entries"
        />

      </div>
    </div>
  );
};

export default ShopList;