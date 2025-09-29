// WorkerList.jsx
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hook/useFetch";
import { IoClose } from "react-icons/io5";
import conf from "../../../config";

const WorkerList = () => {
  const navigate = useNavigate();
  const [fetchData] = useFetch();

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3; // Show only 3 workers per page

  const [searchTerm, setSearchTerm] = useState("");
  const [workers, setWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Filter states
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const expertiseList = ["Plumber", "Electrician"];

  const toggleFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
    setCurrentPage(1);
  };

  const removeFilter = (filter) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setActiveFilters([]);
    setCurrentPage(1);
  };

  // Fetch all workers when component mounts
  useEffect(() => {
    fetchAllWorkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAllWorkers = async () => {
    try {
      setError("");
      setIsLoading(true);

      const result = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/admin/Worker/get-all-worker`,
      });

      if (result && result.success) {
        const workerData = result.workers || result.users || [];

        const normalizedWorkers = (workerData || [])
          .map((worker) => ({
            ...worker,
            name: worker.name || worker.workerName || worker.fullName || "Unknown",
            expertise: worker.experties || worker.expertise || worker.service || "N/A",
            contact: worker.contact || worker.phone || worker.email || "N/A",
            address: worker.address || worker.location || "N/A",
            status: worker.status || "Active",
            id: worker.id || worker._id,
          }))
          .filter((w) => w.name !== "Unknown");

        setWorkers(normalizedWorkers);

        if (normalizedWorkers.length === 0) {
          toast.info("No workers found");
        }
      } else {
        setError(result?.message || "Failed to fetch workers");
        setWorkers([]);
      }
    } catch (err) {
      console.error("Error fetching workers:", err);
      setError(err?.response?.data?.message || err?.message || "Error fetching workers");
      setWorkers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteWorker = async (workerId) => {
    if (!window.confirm("Are you sure you want to delete this worker?")) return;

    try {
      setIsLoading(true);

      const result = await fetchData({
        method: "DELETE",
        url: `${conf.apiBaseUrl}/admin/Worker/delete-worker/${workerId}`,
      });

      if (result && result.success) {
        toast.success(result.message || "Worker deleted successfully");
        // re-fetch
        await fetchAllWorkers();
      } else {
        toast.error(result?.message || "Failed to delete worker");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err?.response?.data?.message || err?.message || "Error deleting worker");
    } finally {
      setIsLoading(false);
    }
  };

  // Filtering logic
  const filteredWorkers = workers.filter((worker) => {
    if (!worker || !worker.name) return false;

    const searchLower = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !searchLower ||
      worker.name.toLowerCase().includes(searchLower) ||
      (worker.contact && worker.contact.toLowerCase().includes(searchLower)) ||
      (worker.address && worker.address.toLowerCase().includes(searchLower)) ||
      (worker.expertise && worker.expertise.toLowerCase().includes(searchLower));

    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(worker.expertise);

    return matchesSearch && matchesFilter;
  });

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredWorkers.length / recordsPerPage));
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredWorkers.slice(indexOfFirstRecord, indexOfLastRecord);

  const goToPage = (pg) => {
    if (pg >= 1 && pg <= totalPages) setCurrentPage(pg);
  };

  return (
    <div className="bg-[#E0E9E9] w-full min-h-screen p-6">
      <ToastContainer />
      <div className="bg-white p-3 shadow-md mb-4 rounded-md flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 relative">
        <h1 className="text-xl font-semibold sm:ml-2">Worker List</h1>

        <div className="w-full sm:w-[400px] mx-auto sm:mx-0 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              {/* search icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.5 13C4.68333 13 3.146 12.3707 1.888 11.112C0.63 9.85333 0.000667196 8.316 5.29101e-07 6.5C-0.000666138 4.684 0.628667 3.14667 1.888 1.888C3.14733 0.629333 4.68467 0 6.5 0C8.31533 0 9.853 0.629333 11.113 1.888C12.373 3.14667 13.002 4.684 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L17.3 15.9C17.4833 16.0833 17.575 16.3167 17.575 16.6C17.575 16.8833 17.4833 17.1167 17.3 17.3C17.1167 17.4833 16.8833 17.575 16.6 17.575C16.3167 17.575 16.0833 17.4833 15.9 17.3L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13ZM6.5 11C7.75 11 8.81267 10.5627 9.688 9.688C10.5633 8.81333 11.0007 7.75067 11 6.5C10.9993 5.24933 10.562 4.187 9.688 3.313C8.814 2.439 7.75133 2.00133 6.5 2C5.24867 1.99867 4.18633 2.43633 3.313 3.313C2.43967 4.18967 2.002 5.252 2 6.5C1.998 7.748 2.43567 8.81067 3.313 9.688C4.19033 10.5653 5.25267 11.0027 6.5 11Z"
                  fill="#0D2E28"
                />
              </svg>
            </div>

            <input
              type="text"
              placeholder="Search by Name, Phone, Email, Expertise..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-10 pl-12 pr-4 placeholder:font-bold placeholder:text-[#0D2E28] rounded-full text-sm border border-[#001580] bg-[#E4E5EB] text-[#0D2E28] focus:outline-none"
            />
          </div>
        </div>

        <div className="sm:ml-auto sm:mr-2 flex justify-center sm:justify-end">
          <button
            onClick={() => navigate("/admin/workermanagement/add")}
            className="flex items-center gap-2 bg-[#001580] text-white px-4 py-2 rounded-md hover:bg-[#001580]/90 transition-colors w-full sm:w-auto justify-center"
          >
            <Plus size={18} />
            Add New Worker
          </button>
        </div>
      </div>

      {/* Workers Table */}
      <div className="bg-white p-4 shadow rounded-md">
        {/* Filter header + active filters */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button
            onClick={() => setShowFilterPanel((s) => !s)}
            className="p-2 bg-[#E4E5EB] rounded-md"
            aria-expanded={showFilterPanel}
          >
            Filters
          </button>

          {activeFilters.map((filter) => (
            <span
              key={filter}
              className="px-3 py-1 bg-[#E4E5EB] text-[#0D2E28] font-medium rounded-full flex items-center gap-2"
            >
              {filter}
              <button onClick={() => removeFilter(filter)} aria-label={`remove ${filter}`}>
                <IoClose />
              </button>
            </span>
          ))}

          {activeFilters.length > 0 && (
            <button onClick={resetFilters} className="ml-auto border px-4 py-1 rounded-md">
              Reset Filter
            </button>
          )}
        </div>

        {/* Filter Panel */}
        {showFilterPanel && (
          <div className="mb-4 p-3 border rounded-md bg-[#FAFAFA]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Expertise</h3>
              <button onClick={() => setShowFilterPanel(false)}>
                <IoClose />
              </button>
            </div>
            <div className="flex gap-4 flex-wrap">
              {expertiseList.map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters.includes(item)}
                    onChange={() => toggleFilter(item)}
                    className="w-4 h-4"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-[#E0E9E9]">
                {["Sr.No.", "Worker Name", "Expertise", "Contact", "Address", "Status", "Action"].map(
                  (head, i) => (
                    <th key={i} className="px-4 py-2 text-center font-medium">
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-6">
                    Loading...
                  </td>
                </tr>
              ) : currentRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6">
                    {error ? error : "No records found."}
                  </td>
                </tr>
              ) : (
                currentRecords.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-center">{indexOfFirstRecord + idx + 1}</td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.expertise}</td>
                    <td className="px-4 py-3">{item.contact}</td>
                    <td className="px-4 py-3">{item.address}</td>
                    <td className="px-4 py-3 text-center" style={{ color: item.status === "Active" ? "#34C759" : "#FF383C", fontWeight: 500 }}>
                      {item.status}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          title="View"
                          onClick={() => navigate(`/admin/workermanagement/workerview/${item.id}`)}
                          className="p-2 border rounded-md"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => deleteWorker(item.id)}
                          className="p-2 border rounded-md text-[#F15A29]"
                          disabled={isLoading}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#F5F5F5] mt-5 rounded-lg shadow text-sm text-gray-700 gap-4 py-4 px-6">
          <p className="font-bold text-black">
            Showing {Math.min(indexOfFirstRecord + 1, filteredWorkers.length || 0)} to{" "}
            {Math.min(indexOfLastRecord, filteredWorkers.length)} of {filteredWorkers.length} Entries
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 bg-white text-[#001580] border rounded-md hover:bg-green-50 disabled:opacity-50"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => goToPage(pg)}
                className={`w-8 h-8 border text-sm font-medium rounded-md transition ${
                  pg === currentPage ? "bg-[#001580] text-white" : "bg-[#CECEF2] text-[#001580] hover:bg-[#CECEF2]"
                }`}
              >
                {pg}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 bg-white text-[#001580] border rounded-md hover:bg-green-50 disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerList;
