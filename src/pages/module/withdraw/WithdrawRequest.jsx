// src/pages/module/withdraw/WithdrawRequest.jsx
import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../components/ui/Pagination";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WithdrawRequest = () => {
  const [fetchData] = useFetch();
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const recordsPerPage = 5;

  const navigate = useNavigate();

  // Fetch withdraw requests list
  const getWithdrawRequests = async () => {
    try {
      setError("");
      setIsLoading(true); // Start loader
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/admin/payouts/withdrawal-requests`,
      });
      if (res?.success && res?.requests) {
        setRequests(res.requests);
      } else {
        setRequests([]);
        toast.info(res?.message || "No withdraw requests found");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch withdraw requests");
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  useEffect(() => {
    getWithdrawRequests();
  }, []);

  // Filter requests by search term
  const filteredRequests = requests.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      (item.withdrawalId || "").toLowerCase().includes(term) ||
      (item.workerId?.name || "").toLowerCase().includes(term)
    );
  });

  const totalRecords = filteredRequests.length;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRequests.slice(indexOfFirstRecord, indexOfLastRecord);

  const goToPage = (pg) => setCurrentPage(pg);

  // Navigate to view page
  const handleView = (id) => {
    navigate(`/admin/withdraw-request/view/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#E0E9E9] w-full font-[Poppins]">
      <ToastContainer />

      {/* Header Section */}
      <div className="bg-white p-2 shadow-md mb-4 rounded-md relative flex items-center min-h-[65px] w-full">
        <h1 className="text-xl font-medium ml-3 z-10">Withdraw Request</h1>

        {/* Search Bar */}
        <div className="absolute left-0 right-0 mx-auto w-full max-w-[400px] px-4">
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M6.5 13C4.68333 13 3.146 12.3707 1.888 11.112C0.63 9.85333 0.000667196 8.316 5.29101e-07 6.5C-0.000666138 4.684 0.628667 3.14667 1.888 1.888C3.14733 0.629333 4.68467 0 6.5 0C8.31533 0 9.853 0.629333 11.113 1.888C12.373 3.14667 13.002 4.684 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L17.3 15.9C17.4833 16.0833 17.575 16.3167 17.575 16.6C17.575 16.8833 17.4833 17.1167 17.3 17.3C17.1167 17.4833 16.8833 17.575 16.6 17.575C16.3167 17.575 16.0833 17.4833 15.9 17.3L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13ZM6.5 11C7.75 11 8.81267 10.5627 9.688 9.688C10.5633 8.81333 11.0007 7.75067 11 6.5C10.9993 5.24933 10.562 4.187 9.688 3.313C8.814 2.439 7.75133 2.00133 6.5 2C5.24867 1.99867 4.18633 2.43633 3.313 3.313C2.43967 4.18967 2.002 5.252 2 6.5C1.998 7.748 2.43567 8.81067 3.313 9.688C4.19033 10.5653 5.25267 11.0027 6.5 11Z"
                fill="#0D2E28"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by Withdraw ID or Worker..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-12 pr-4 placeholder:font-medium placeholder:text-[#0D2E28] rounded-full text-sm border border-[#001580] bg-[#E4E5EB] text-[#0D2E28] focus:outline-none"
          />
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white p-4 shadow rounded-md">
        <div className="overflow-x-auto bg-white shadow-md rounded-lg min-h-[600px] border border-gray-400">
          <div className="min-w-[1028px] w-full">
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
              <table className="w-full text-sm text-[#0D2E28] table-fixed">
                <thead className="bg-[#E4E5EB] font-[Poppins] text-base leading-[100%] tracking-[0%] align-middle">
                  <tr>
                    <th className="w-[80px] h-[56px] text-center font-medium align-middle">Sr.No.</th>
                    <th className="min-w-[160px] h-[56px] text-center font-medium align-middle">Withdrawal ID</th>
                    <th className="min-w-[200px] h-[56px] text-center font-medium align-middle">Worker Name</th>
                    <th className="min-w-[150px] h-[56px] text-center font-medium align-middle">Amount</th>
                    <th className="min-w-[150px] h-[56px] text-center font-medium align-middle">Status</th>
                    <th className="min-w-[100px] h-[56px] text-center font-medium align-middle">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center">
                        <div className="text-lg text-gray-500">No withdraw requests found</div>
                      </td>
                    </tr>
                  ) : (
                    currentRecords.map((item, idx) => (
                      <tr key={item._id} className="text-center">
                        <td className="w-[80px] h-[56px] align-middle">{indexOfFirstRecord + idx + 1}</td>
                        <td className="min-w-[160px] h-[56px] align-middle">{item.withdrawalId || "N/A"}</td>
                        <td className="min-w-[200px] h-[56px] align-middle">{item.workerId?.name || "N/A"}</td>
                        <td className="min-w-[150px] h-[56px] align-middle">₹{item?.transactionId?.amount || item.amount || 0}</td>
                        <td
                          className={`min-w-[150px] h-[56px] align-middle font-medium ${
                            item.status === "PENDING"
                              ? "text-[#FFCC00]"
                              : item.status === "PROCESSED"
                              ? "text-[#34C759]"
                              : item.status === "REJECTED"
                              ? "text-[#FF383C]"
                              : ""
                          }`}
                        >
                          {item.status || "N/A"}
                        </td>
                        <td className="min-w-[100px] h-[56px] align-middle">
                          <div className="flex justify-center space-x-4 flex-wrap">
                            <button className="text-[#EC2D01] hover:text-orange-700" onClick={() => handleView(item._id)}>
                              <Eye size={20} />
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
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalRecords={totalRecords}
          recordsPerPage={recordsPerPage}
          goToPage={goToPage}
          label="entries"
        />
      </div>
    </div>
  );
};

export default WithdrawRequest;
