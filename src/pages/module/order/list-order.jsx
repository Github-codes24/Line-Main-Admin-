// import React, {useState, useMemo} from "react";
// import {Eye} from "lucide-react";
// import {IoClose} from "react-icons/io5";
// import {useNavigate} from "react-router-dom";

// const orderData = [
//     {id: 1, orderId: "ORD84681", customer: "Freida Varnes", service: "Electrician", status: "Pending"},
//     {id: 2, orderId: "ORD846812", customer: "Hannah Burress", service: "Plumber", status: "Work In Progress"},
//     {id: 3, orderId: "ORD846813", customer: "Leatrice Handler", service: "Tiler", status: "Work In Progress"},
//     {id: 4, orderId: "ORD846814", customer: "Krishna Barbe", service: "Painter", status: "Completed"},
//     {id: 5, orderId: "ORD846815", customer: "Marx Hershey", service: "AC & Refrigerator Mechanic", status: "Rejected"},
//     {id: 6, orderId: "ORD846816", customer: "John Doe", service: "Plumber", status: "Pending"},
//     {id: 7, orderId: "ORD846817", customer: "Jane Smith", service: "Electrician", status: "Completed"},
// ];

// const statusColor = {
//     Pending: "text-[#FFCC00]",
//     "Work In Progress": "text-[#3B82F6]",
//     Completed: "text-[#22C55E]",
//     Rejected: "text-[#EF4444]",
// };

// export default function ListOrder() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [activeFilters, setActiveFilters] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [showFilterPanel, setShowFilterPanel] = useState(false);

//     const navigate = useNavigate();

//     const itemsPerPage = 5;
//     const allServices = ["Electrician", "Plumber", "Painter", "Tiler", "AC & Refrigerator Mechanic"];

//     const handleSearch = (e) => {
//         setSearchTerm(e.target.value);
//         setCurrentPage(1);
//     };

//     const toggleFilter = (filter) => {
//         if (activeFilters.includes(filter)) {
//             setActiveFilters(activeFilters.filter((f) => f !== filter));
//         } else {
//             setActiveFilters([...activeFilters, filter]);
//         }
//         setCurrentPage(1);
//     };

//     const removeFilter = (filter) => {
//         setActiveFilters(activeFilters.filter((f) => f !== filter));
//     };

//     const resetFilters = () => {
//         setActiveFilters([]);
//         setSearchTerm("");
//         setCurrentPage(1);
//     };

//     const filteredData = useMemo(() => {
//         let data = orderData;

//         if (searchTerm.trim()) {
//             data = data.filter(
//                 (order) =>
//                     order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                     order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                     order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         if (activeFilters.length > 0) {
//             data = data.filter((order) => activeFilters.includes(order.service));
//         }

//         return data;
//     }, [searchTerm, activeFilters]);

//     const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//     const paginatedData = useMemo(() => {
//         const startIndex = (currentPage - 1) * itemsPerPage;
//         return filteredData.slice(startIndex, startIndex + itemsPerPage);
//     }, [filteredData, currentPage]);

//     const handlePrev = () => {
//         if (currentPage > 1) setCurrentPage(currentPage - 1);
//     };

//     const handleNext = () => {
//         if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//     };

//     const handleView = (status, id) => {
//         switch (status) {
//             case "Pending":
//                 navigate(`/admin/order/pending/${id}`);
//                 break;
//             case "Work In Progress":
//                 navigate(`/admin/order/progress/${id}`);
//                 break;
//             case "Completed":
//                 navigate(`/admin/order/complete/${id}`);
//                 break;
//             case "Rejected":
//                 navigate(`/admin/order/reject/${id}`);
//                 break;
//             default:
//                 console.warn("Unknown status");
//         }
//     };

//     return (
//         <div className="p-2 font-[Poppins]">
//             <div className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-white px-4 py-3 rounded-lg shadow">
//                 <h2 className="text-xl font-medium">Order List</h2>

//                 <div className="relative w-full max-w-xs flex-grow md:flex-grow-0">
//                     <input
//                         type="text"
//                         placeholder="Search by Order Id..."
//                         value={searchTerm}
//                         onChange={handleSearch}
//                         className="w-full pl-10 pr-4 bg-[#E4E5EB] text-[#001580] font-medium placeholder-[#001580] py-1 border-2 border-[#001580] rounded-full focus:outline-none"
//                     />
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#001580]"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
//                         />
//                     </svg>
//                 </div>
//                 <div className="w-32"></div>
//             </div>

//             <div className="p-4 bg-white rounded-lg shadow-sm">
//                 <div className="relative flex flex-wrap gap-2 mb-4">
//                     <svg
//                         onClick={() => setShowFilterPanel(true)}
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="40"
//                         height="40"
//                         viewBox="0 0 40 40"
//                         fill="none"
//                         className="cursor-pointer"
//                     >
//                         <path
//                             d="M0 10C0 4.47715 4.47715 0 10 0H30C35.5228 0 40 4.47715 40 10V30C40 35.5228 35.5228 40 30 40H10C4.47715 40 0 35.5228 0 30V10Z"
//                             fill="#E4E5EB"
//                         />
//                         <path
//                             d="M16.8571 20.506C14.3701 18.646 12.5961 16.6 11.6271 15.45C11.3271 15.094 11.2291 14.833 11.1701 14.374C10.9681 12.802 10.8671 12.016 11.3281 11.508C11.7891 11 12.6041 11 14.2341 11H25.7661C27.3961 11 28.2111 11 28.6721 11.507C29.1331 12.015 29.0321 12.801 28.8301 14.373C28.7701 14.832 28.6721 15.093 28.3731 15.449C27.4031 16.601 25.6261 18.651 23.1331 20.514C23.0178 20.6037 22.9225 20.7165 22.8533 20.8451C22.7841 20.9737 22.7425 21.1154 22.7311 21.261C22.4841 23.992 22.2561 25.488 22.1141 26.244C21.8851 27.466 20.1541 28.201 19.2261 28.856C18.6741 29.246 18.0041 28.782 17.9331 28.178C17.6676 25.8765 17.4429 23.5705 17.2591 21.261C17.2488 21.114 17.2077 20.9708 17.1385 20.8407C17.0692 20.7106 16.9733 20.5966 16.8571 20.506Z"
//                             stroke="#001580"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                         />
//                     </svg>

//                     {showFilterPanel && (
//                         <div className="absolute left-0 top-14 bg-white rounded-lg shadow-lg px-4 py-2 w-72 border border-gray-300 z-50">
//                             <div className="flex justify-between items-center mb-4">
//                                 <h3 className="text-lg font-semibold text-gray-800">Expertise</h3>
//                                 <button
//                                     onClick={() => setShowFilterPanel(false)}
//                                     className="text-gray-600 hover:text-gray-800 text-2xl"
//                                 >
//                                     <IoClose />
//                                 </button>
//                             </div>
//                             <div className="space-y-3">
//                                 {allServices.map((item) => (
//                                     <label
//                                         key={item}
//                                         className="flex items-center space-x-2 cursor-pointer text-gray-700"
//                                     >
//                                         <input
//                                             type="checkbox"
//                                             className="w-4 h-4 text-[#001580] border-gray-300 rounded"
//                                             checked={activeFilters.includes(item)}
//                                             onChange={() => toggleFilter(item)}
//                                         />
//                                         <span>{item}</span>
//                                     </label>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {activeFilters.map((filter) => (
//                         <span
//                             key={filter}
//                             className="px-3 py-1 bg-[#E4E5EB] text-[#001580] font-medium rounded-full flex items-center gap-1"
//                         >
//                             {filter}
//                             <button onClick={() => removeFilter(filter)} className="text-[#001580] font-semibold ml-1">
//                                 <IoClose />
//                             </button>
//                         </span>
//                     ))}

//                     {activeFilters.length > 0 && (
//                         <button
//                             onClick={resetFilters}
//                             className="ml-auto border border-[#001580] bg-[#CECEF2] text-[#001580] font-medium px-6 py-2 rounded-lg"
//                         >
//                             Reset Filter
//                         </button>
//                     )}
//                 </div>

//                 <div className="border border-[#616666] rounded-lg shadow-sm h-screen overflow-x-auto">
//                     <table className="min-w-full bg-white rounded-lg">
//                         <thead>
//                             <tr className="bg-[#E4E5EB] text-center text-[#001580] font-medium">
//                                 <th className="p-3">Sr.No.</th>
//                                 <th className="p-3">Order Id.</th>
//                                 <th className="p-3">Customer Name</th>
//                                 <th className="p-3">Service Booked</th>
//                                 <th className="p-3">Status</th>
//                                 <th className="p-3">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {paginatedData.length > 0 ? (
//                                 paginatedData.map((order, idx) => (
//                                     <tr key={order.id} className="text-center">
//                                         <td className="px-3 py-5">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
//                                         <td className="px-3 py-5">{order.orderId}</td>
//                                         <td className="px-3 py-5">{order.customer}</td>
//                                         <td className="px-3 py-5">{order.service}</td>
//                                         <td className={`px-3 py-5 font-medium ${statusColor[order.status]}`}>
//                                             {order.status}
//                                         </td>
//                                         <td className="px-3 py-5">
//                                             <button onClick={() => handleView(order.status, order.id)}>
//                                                 <Eye className="text-red-600" size={18} />
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="6" className="text-center py-4">
//                                         No results found
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 {filteredData.length > itemsPerPage && (
//                     <div className="flex justify-between items-center mt-4 bg-[#F5F5F5] rounded-lg py-2 px-4">
//                         <span className="text-sm font-semibold">
//                             Showing {paginatedData.length} of {filteredData.length} Entries
//                         </span>
//                         <div className="flex items-center space-x-2">
//                             <button
//                                 onClick={handlePrev}
//                                 disabled={currentPage === 1}
//                                 className={`w-8 h-8 flex items-center justify-center rounded-xl ${
//                                     currentPage === 1 ? "bg-gray-200 text-[#001580]" : "bg-white hover:bg-gray-100"
//                                 }`}
//                             >
//                                 &lt;
//                             </button>

//                             {[...Array(totalPages)].map((_, i) => {
//                                 const page = i + 1;
//                                 return (
//                                     <button
//                                         key={page}
//                                         onClick={() => setCurrentPage(page)}
//                                         className={`w-8 h-8 flex items-center justify-center rounded-xl font-semibold ${
//                                             page === currentPage
//                                                 ? "bg-[#001580] text-white"
//                                                 : "bg-[#CECEF2] text-[#001580] hover:bg-[#CECEF2]"
//                                         }`}
//                                     >
//                                         {page}
//                                     </button>
//                                 );
//                             })}

//                             <button
//                                 onClick={handleNext}
//                                 disabled={currentPage === totalPages}
//                                 className={`w-8 h-8 flex items-center justify-center rounded-xl ${
//                                     currentPage === totalPages
//                                         ? "bg-gray-200 text-[#001580]"
//                                         : "bg-white hover:bg-gray-100"
//                                 }`}
//                             >
//                                 &gt;
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
// OrderList.jsx
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const OrderList = () => {
  const navigate = useNavigate();
  const [fetchData] = useFetch();

  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const statusColor = {
    Pending: "text-[#FFCC00]",
    "Work In Progress": "text-[#3B82F6]",
    Completed: "text-[#22C55E]",
    Rejected: "text-[#EF4444]",
  };

  // Fetch all orders
  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      setError("");
      setIsLoading(true);

     const result = await fetchData({
    method: "POST",
    url: `${conf.apiBaseUrl}/admin/order`,
    data: {
        service_category: "", // or "all" if backend expects
        status: "",           // optional filters
        page: 1,              // if pagination is supported
        limit: 50
    },
});
      if (result.success) {
        const orderData = result.orders || [];

        const normalizedOrders = orderData.map((order) => ({
          id: order.id || order._id,
          orderId: order.orderId || order.orderID || "N/A",
          customer: order.customer?.name || "Unknown",
          service: order.specificServiceName || order.service || "N/A",
          status: order.orderStatus || "Pending",
        }));

        setOrders(normalizedOrders);

        if (normalizedOrders.length === 0) {
          toast.info("No orders found");
        }
      } else {
        setError(result.message || "Failed to fetch orders");
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.response?.data?.message || err.message || "Error fetching orders");
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

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

  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order.orderId.toLowerCase().includes(searchLower) ||
      order.customer.toLowerCase().includes(searchLower) ||
      order.service.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedData = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-8 bg-[#E0E9E9]">
      <ToastContainer />

      <div className="bg-white p-1 shadow-md mb-4 rounded-md relative flex justify-between items-center min-h-[48px]">
        <h1 className="text-xl font-semibold ml-2">Order List</h1>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <input
            type="text"
            placeholder="Search by Order Id, Customer, Service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 bg-[#E4E5EB] rounded-full p-1 px-4 w-64 text-sm"
          />
        </div>
      </div>

      {/* Main Content Box */}
      <div className="bg-white p-4 shadow rounded-md">
        <div className="overflow-x-auto bg-white shadow-md rounded-lg min-h-[600px] border border-gray-400">
          {isLoading ? (
            <div className="flex justify-center items-center h-[400px]">
              <div className="text-lg">Loading orders...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-[400px]">
              <div className="text-lg text-red-500">{error}</div>
            </div>
          ) : (
            <table className="w-full text-sm text-left text-gray-700">
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
                      <td className="px-6 py-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td className="px-6 py-4">{order.orderId}</td>
                      <td className="px-6 py-4">{order.customer}</td>
                      <td className="px-6 py-4">{order.service}</td>
                      <td className={`px-6 py-4 font-medium ${statusColor[order.status]}`}>
                        {order.status}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => handleView(order.status, order.id)} className="text-[#F15A29] hover:text-orange-700">
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
        <div className="p-4">
          <div className="flex justify-between items-center text-sm text-black">
            <span>
              Showing {paginatedData.length} of {filteredOrders.length} entries
            </span>
            <div>
              <button
                className="px-3 py-1 border border-gray-300 rounded mr-2"
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="px-3 py-1 border border-gray-300 rounded"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;