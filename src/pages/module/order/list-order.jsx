// OrderList.jsx
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hook/useFetch";
import { IoClose } from "react-icons/io5";
import conf from "../../../config";
import Pagination from "../../../components/ui/Pagination";

const OrderList = () => {
  const navigate = useNavigate();
  const [fetchData] = useFetch();

  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // only 5 rows per page

  // Filter states
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const expertiseList = ["Plumber", "Electrician", "Cleaner", "Painter"];

  const statusColor = {
    Pending: "text-[#FFCC00]",
    "Work In Progress": "text-[#3B82F6]",
    Completed: "text-[#22C55E]",
    Rejected: "text-[#EF4444]",
  };

  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter) =>
    setActiveFilters(activeFilters.filter((f) => f !== filter));

  const resetFilters = () => setActiveFilters([]);

  // Fetch orders
  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      setIsLoading(true);
      setError("");

      const result = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}/admin/order`,
        data: { service_category: "", status: "", page: 1, limit: 50 },
      });

      if (result.success) {
        const normalizedOrders = (result.orders || []).map((order) => ({
          id: order.id || order._id,
          orderId: order.orderId || order.orderID || "N/A",
          customer: order.customer?.name || "Unknown",
          service: order.specificServiceName || order.service || "N/A",
          status: order.orderStatus || "Pending",
        }));
        setOrders(normalizedOrders);

        if (normalizedOrders.length === 0) toast.info("No orders found");
      } else {
        setError(result.message || "Failed to fetch orders");
        setOrders([]);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Error fetching orders");
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter & Search
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchLower) ||
      order.customer.toLowerCase().includes(searchLower) ||
      order.service.toLowerCase().includes(searchLower);

    const matchesFilter =
      activeFilters.length === 0 || activeFilters.includes(order.service);

    return matchesSearch && matchesFilter;
  });

  // Pagination
  const paginatedData = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleView = (status, id) => {
    switch (status) {
      case "Pending":
        navigate(`/admin/order/pending/${id}`);
        break;
      case "Work In Progress":
        navigate(`/admin/order/progress/${id}`);
        break;
      case "Completed":
        navigate(`/admin/order/complete/${id}`);
        break;
      case "Rejected":
        navigate(`/admin/order/reject/${id}`);
        break;
      default:
        console.warn("Unknown status");
    }
  };

  return (
    <div className="min-h-screen bg-[#E0E9E9] w-full">

      <ToastContainer />

      {/* Header */}
      <div className="bg-white p-1 shadow-md mb-4 rounded-md relative flex items-center min-h-[65px] w-full">
        <h1 className="text-xl font-semibold ml-2 z-10">Order List</h1>
        <div className="absolute left-0 right-0 mx-auto w-full max-w-[400px] px-4">
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
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
            placeholder="Search by Order Id..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-12 pr-4 placeholder:font-bold placeholder:text-[#0D2E28] rounded-full text-sm border border-[#001580] bg-[#E4E5EB] text-[#0D2E28] focus:outline-none"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white p-4 shadow rounded-md w-full max-w-full overflow-x-auto">

        {/* Filter Section */}
        <div className="relative flex flex-wrap gap-2 pb-4">
          <svg
            onClick={() => setShowFilterPanel(true)}
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            className="cursor-pointer"
          >
            <path
              d="M0 10C0 4.47715 4.47715 0 10 0H30C35.5228 0 40 4.47715 40 10V30C40 35.5228 35.5228 40 30 40H10C4.47715 40 0 35.5228 0 30V10Z"
              fill="#E4E5EB"
            />
            <path
              d="M16.8571 20.506C14.3701 18.646 12.5961 16.6 11.6271 15.45C11.3271 15.094 11.2291 14.833 11.1701 14.374C10.9681 12.802 10.8671 12.016 11.3281 11.508C11.7891 11 12.6041 11 14.2341 11H25.7661C27.3961 11 28.2111 11 28.6721 11.507C29.1331 12.015 29.0321 12.801 28.8301 14.373C28.7701 14.832 28.6721 15.093 28.3731 15.449C27.4031 16.601 25.6261 18.651 23.1331 20.514C23.0178 20.6037 22.9225 20.7165 22.8533 20.8451C22.7841 20.9737 22.7425 21.1154 22.7311 21.261C22.4841 23.992 22.2561 25.488 22.1141 26.244C21.8851 27.466 20.1541 28.201 19.2261 28.856C18.6741 29.246 18.0041 28.782 17.9331 28.178C17.6676 25.8765 17.4429 23.5705 17.2591 21.261C17.2488 21.114 17.2077 20.9708 17.1385 20.8407C17.0692 20.7106 16.9733 20.5966 16.8571 20.506Z"
              stroke="#0D2E28"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {showFilterPanel && (
            <div className="absolute left-0 top-14 bg-white rounded-lg shadow-lg px-4 py-2 w-[280px] max-w-full border border-gray-300 z-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#0D2E28]">Expertise</h3>
                <button
                  onClick={() => setShowFilterPanel(false)}
                  className="text-[#0D2E28] hover:text-[#0D2E28] text-2xl"
                >
                  <IoClose />
                </button>
              </div>
              <div className="space-y-3">
                {expertiseList.map((item) => (
                  <label
                    key={item}
                    className="flex items-center space-x-2 cursor-pointer text-[#0D2E28]"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#0D2E28] border-gray-300 rounded"
                      checked={activeFilters.includes(item)}
                      onChange={() => toggleFilter(item)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Active Filters */}
          {activeFilters.map((filter) => (
            <span
              key={filter}
              className="px-3 py-1 bg-[#E4E5EB] text-[#0D2E28] font-medium rounded-full flex items-center gap-1"
            >
              {filter}
              <button
                onClick={() => removeFilter(filter)}
                className="text-[#0D2E28] font-semibold ml-1"
              >
                <IoClose />
              </button>
            </span>
          ))}

          {activeFilters.length > 0 && (
            <button
              onClick={resetFilters}
              className="w-[200px] ml-auto border border-[#0D2E28] bg-[#CECEF2] text-[#0D2E28] font-medium px-6 py-2 rounded-lg"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full bg-white shadow-md rounded-lg border border-gray-400">
          {isLoading ? (
            <div className="flex justify-center items-center h-[400px]">
              <div className="text-lg">Loading orders...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-[400px]">
              <div className="text-lg text-red-500">{error}</div>
            </div>
          ) : (
            <table className="min-w-full w-full text-sm text-left text-gray-700">
              <thead className="bg-[#E4E5EB] text-black text-base font-semibold">
                <tr>
                  <th className="px-6 py-4">Sr.No.</th>
                  <th className="px-6 py-4">Order Id</th>
                  <th className="px-6 py-4">Customer Name</th>
                  <th className="px-6 py-4">Service Booked</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center">
                      <div className="text-lg text-gray-500">No orders found</div>
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((order, index) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-6 py-4">{order.orderId}</td>
                      <td className="px-6 py-4">{order.customer}</td>
                      <td className="px-6 py-4">{order.service}</td>
                      <td
                        className={`px-6 py-4 font-medium ${statusColor[order.status]}`}
                      >
                        {order.status}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleView(order.status, order.id)}
                          className="text-[#F15A29] hover:text-orange-700"
                        >
                          <Eye size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalRecords={filteredOrders.length}
          recordsPerPage={itemsPerPage}
          goToPage={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default OrderList;
