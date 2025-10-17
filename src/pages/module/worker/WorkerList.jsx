// WorkerList.jsx
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, Trash2, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import useFetch from "../../../hook/useFetch";
import { IoClose } from "react-icons/io5";
import conf from "../../../config";
import Pagination from "../../../components/ui/Pagination";

const WorkerList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [fetchData] = useFetch();


  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; // Show 10 workers per page
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [workers, setWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // Added error state

  // Filter states
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  // const expertiseList = ["Plumber", "Electrician"];
  const expertiseList = ["Plumber", "Electrician", "Tiler", "Painter", "AC & Refrigerator Mechanic"];


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

  // Add window focus listener to refresh data when returning to the page
  useEffect(() => {

    const handleFocus = () => {
      console.log("Window focused, refreshing worker list");
      fetchAllWorkers(currentPage);
    };


    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [currentPage]);

  useEffect(() => {
    if (location.state?.updated || location.state?.refresh) {
      console.log("Refreshing worker list due to update/add from other page");
      fetchAllWorkers(currentPage); // refresh list after returning from View/Add page
      navigate(location.pathname, { replace: true, state: {} }); // clear state to prevent infinite loop
    }
  }, [location.state]);

  // Also refresh when component mounts or page changes
  useEffect(() => {
    fetchAllWorkers(currentPage);
  }, [currentPage]);

  // Force refresh when component mounts (in case of navigation from add/edit)
  useEffect(() => {
    console.log("WorkerList component mounted, fetching workers");
    fetchAllWorkers(1); // Always start from page 1 when component mounts
    setCurrentPage(1);
  }, []);




  const fetchAllWorkers = async (page = currentPage) => {
    try {
      setError(""); // Reset error
      setIsLoading(true);

      // Use the exact API endpoint you provided
      const result = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/admin/Worker/get-all-worker?page=${page}&limit=${recordsPerPage}`,
      });

      if (result.success || result.workers || result.users || result.data) {
        console.log('Full API Response:', result);
        const workerData = result.workers || result.users || result.data || [];
        console.log('Worker Data Array:', workerData);

        const normalizedWorkers = workerData.map(worker => {
          console.log('Processing worker:', worker);
          
          // Determine status more reliably
          let status = "Inactive"; // default
          if (worker.status === "Active" || worker.status === "active") {
            status = "Active";
          } else if (worker.status === "Inactive" || worker.status === "inactive") {
            status = "Inactive";
          } else if (worker.isActive === true) {
            status = "Active";
          } else if (worker.isActive === false) {
            status = "Inactive";
          }
          
          return {
            ...worker,
            name: worker.name || worker.workerName || worker.fullName || 'Unknown',
            expertise: worker.experties || worker.expertise || worker.service || 'N/A',
            contact: worker.contact || worker.phone || worker.email || 'N/A',
            address: worker.address || worker.location || 'N/A',
            status: status,
            isActive: status === "Active",
            id: worker.id || worker._id
          };
        }).filter(worker => worker.name !== 'Unknown');

        console.log('Normalized Workers:', normalizedWorkers);
        setWorkers(normalizedWorkers);

        // Use API pagination data
        if (result.pagination) {
          setTotalRecords(result.pagination.totalWorkers || result.pagination.total || normalizedWorkers.length);
          setTotalPages(result.pagination.totalPages || Math.ceil(normalizedWorkers.length / recordsPerPage));
          console.log('Worker Pagination:', result.pagination);
        } else {
          // Fallback if no pagination data
          setTotalRecords(normalizedWorkers.length);
          setTotalPages(Math.ceil(normalizedWorkers.length / recordsPerPage));
        }

        if (normalizedWorkers.length === 0) {
          console.log('No workers found in response');
          toast.info('No workers found');
        } else {
          console.log(`Found ${normalizedWorkers.length} workers`);
        }
      } else {
        console.log('API response failed or empty:', result);
        setError(result?.message || 'Failed to fetch workers');
        setWorkers([]);
      }
    } catch (err) {
      console.error('Error fetching workers:', err);
      setError(err.response?.data?.message || err.message || 'Error fetching workers');
      setWorkers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteWorker = async (workerId) => {
    try {
      setIsLoading(true);

      const result = await fetchData({
        method: "DELETE",
        url: `${conf.apiBaseUrl}/admin/Worker/delete-worker/${workerId}`,
      });

      if (result.success) {
        toast.success(result.message || 'Worker deleted successfully');
        fetchAllWorkers(); // Refresh list
      } else {
        toast.error(result.message || 'Failed to delete worker');
      }
    } catch (err) {
      console.error('Delete error:', err);
      toast.error(err.response?.data?.message || err.message || 'Error deleting worker');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredWorkers = workers.filter((worker) => {
    if (!worker || !worker.name) return false;

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = (
      worker.name.toLowerCase().includes(searchLower) ||
      (worker.contact && worker.contact.toLowerCase().includes(searchLower)) ||
      (worker.address && worker.address.toLowerCase().includes(searchLower)) ||
      (worker.expertise && worker.expertise.toLowerCase().includes(searchLower))
    );

    const matchesFilter =
      activeFilters.length === 0 || activeFilters.includes(worker.expertise);

    return matchesSearch && matchesFilter;
  });

  // Use API pagination data instead of calculating client-side
  const hasFilters = searchTerm || activeFilters.length > 0;
  const currentRecords = hasFilters ? filteredWorkers : workers;
  const displayTotalPages = hasFilters ? Math.ceil(filteredWorkers.length / recordsPerPage) : totalPages;
  const displayTotalRecords = hasFilters ? filteredWorkers.length : totalRecords;
  const indexOfFirstRecord = hasFilters ? 0 : (currentPage - 1) * recordsPerPage;

  const goToPage = (pg) => {
    if (pg >= 1 && pg <= displayTotalPages) {
      setCurrentPage(pg);
      if (!hasFilters) {
        // Only fetch new data if not filtering (since filters are client-side for now)
        fetchAllWorkers(pg);
      }
    }
  };


  return (


    <div className="bg-[#E0E9E9] w-full min-h-screen overflow-auto">
      <ToastContainer />

      {/* Header */}
      <div className="bg-white p-3 shadow-md mb-4 rounded-md flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 relative">

        {/* Title on left */}
        <h1 className="text-xl font-semibold sm:ml-2">Worker List</h1>

        {/* Search Bar (center, responsive) */}
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
              placeholder="Search by Name, Phone Number, Email, Expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              // className="w-full h-10 pl-12 pr-4 placeholder:font-semibold placeholder:text-[#0D2E28] rounded-full text-sm border border-[#001580] bg-[#E4E5EB] text-[#0D2E28] focus:outline-none"
              className="w-full h-10 pl-12 pr-4 placeholder:font-bold placeholder:text-[#0D2E28] rounded-full text-sm border border-[#001580] bg-[#E4E5EB] text-[#0D2E28] focus:outline-none"
            />
          </div>
        </div>

        {/* Add Worker Button on right */}
        <div className="sm:ml-auto sm:mr-2 flex justify-center sm:justify-end">
          <button
            onClick={() => navigate('/admin/workermanagement/add')}
            className="flex items-center gap-2 bg-[#001580] text-white px-4 py-2 rounded-md hover:bg-[#001580]/90 transition-colors w-full sm:w-auto justify-center"
          >
            <Plus size={18} />
            Add New Worker
          </button>
        </div>
      </div>



      {/* Workers Table */}
      <div className="bg-white p-4 shadow rounded-md">
        {/* Filter Section */}
        <div className="relative flex flex-wrap gap-2 pb-4"> {/* added pb-4 for bottom padding */}
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
                 {/* Filter section started from here */}
          {showFilterPanel && (
            <div className="absolute left-0 top-14 bg-white rounded-lg shadow-lg px-4 py-2 w-70 border border-gray-300 z-50">
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

        <div className="overflow-x-auto bg-white shadow-md rounded-lg min-h-[600px] border border-gray-400">
          {isLoading ? (
            <div className="flex justify-center items-center h-[400px]">
              {/* <div className="text-lg">Loading customers...</div> */}
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
            <table className="w-full text-sm text-left text-[#0D2E28]">
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
                    Worker Name
                  </th>
                  <th
                    className="text-center align-middle text-[#0D2E28] font-poppins font-medium text-[16px] pl-4"
                    style={{ opacity: 1 }}
                  >
                    Expertise
                  </th>
                  <th
                    className="text-center align-middle text-[#0D2E28] font-poppins font-medium text-[16px] pl-4"
                    style={{ opacity: 1 }}
                  >
                    Email ID/Phone Number
                  </th>
                  <th
                    className="text-center align-middle text-[#0D2E28] font-poppins font-medium text-[16px] pl-3"
                    style={{ opacity: 1 }}
                  >
                    Address
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
                {filteredWorkers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-8 text-center text-lg text-gray-500"
                    >
                      No workers found
                    </td>
                  </tr>
                ) : (
                  currentRecords.map((worker, index) => (
                    <tr key={worker.id || worker._id} className="bg-white">
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
                        {worker.name}
                      </td>
                      <td
                        className="text-center align-middle text-[#0D2E28] font-poppins font-normal text-[14px] leading-[100%]"
                        style={{ opacity: 1 }}
                      >
                        {worker.expertise}
                      </td>
                      <td
                        className="text-center align-middle text-[#0D2E28] font-poppins font-normal text-[14px] leading-[100%]"
                        style={{ opacity: 1 }}
                      >
                        {worker.contact}
                      </td>
                      <td
                        className="text-center align-middle text-[#0D2E28] font-poppins font-normal text-[14px] leading-[100%]"
                        style={{ opacity: 1 }}
                      >
                        {worker.address.split(" ").slice(0, 3).join(" ")}{worker.address.split(" ").length > 3 ? "..":""}
                      </td>
                      <td
                        className="text-center align-middle font-poppins font-normal text-[14px] leading-[100%]"
                        style={{ opacity: 1 }}
                      >
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${worker.status === "Active"
                              ? "text-[#34C759]"
                              : "text-[#FF383C]"
                            }`}
                        >
                          {worker.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center space-x-4">
                          <button
                            onClick={() => navigate(`/admin/workermanagement/view/${worker.id || worker._id}`, {
                              state: { worker }
                            })}
                            className="text-[#F15A29] hover:text-orange-700"
                          >
                            <Eye size={20} />
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/admin/workermanagement/edit/${worker.id || worker._id}`)
                            }
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
                              setSelectedWorker(worker);
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
              <h2 className="text-xl font-bold text-center text-[#0D2E28] mb-3">
                Delete Worker
              </h2>
              <p className="text-[#0D2E28] text-center mb-6 leading-relaxed">
                Are you sure you want to delete this worker?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-16 py-2 rounded-md border border-[#001580] bg-[#CED4F2] text-[#001580] font-medium hover:opacity-90 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteWorker(selectedWorker.id); // call your delete API
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

export default WorkerList;
