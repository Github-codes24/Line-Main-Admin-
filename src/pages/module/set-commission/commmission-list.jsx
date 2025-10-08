// src/pages/module/set-commission/CommissionList.jsx

import React, { useState, useEffect } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../../components/ui/Pagination";

const CommissionList = () => {
  const navigate = useNavigate();
  const [fetchData] = useFetch();

  const [commissions, setCommissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const [selectedCommission, setSelectedCommission] = useState(null);

  const fetchAllCommissions = async () => {
    try {
      setError("");
      setIsLoading(true);

      const result = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/admin/commissions/get-all-commission`,
      });

      if (result.commissions) {
        setCommissions(result.commissions);
      } else {
        setCommissions([]);
        toast.info("No commissions found");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Error fetching commissions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCommissions();
  }, []);

  const deleteCommission = async (id) => {
    try {
      setIsLoading(true);
      const result = await fetchData({
        method: "DELETE",
        url: `${conf.apiBaseUrl}/admin/commissions/delete-commission/${id}`,
      });

      if (result.success) {
        toast.success(result.message || "Commission deleted successfully");
        fetchAllCommissions();
      } else {
        toast.error(result.message || "Failed to delete commission");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error deleting commission");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Calculate pagination records
  const totalRecords = commissions.length;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = commissions.slice(indexOfFirstRecord, indexOfLastRecord);

  // ✅ Handle page change
  const goToPage = (pg) => {
    setCurrentPage(pg);
  };

  return (
    <div className="bg-[#E0E9E9] min-h-screen w-full">
      <ToastContainer />

      {/* ✅ Header Section */}
      <div className="bg-white p-3 shadow-md mb-4 rounded-md min-h-[65px]">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-3 relative">
          <h1 className="text-xl font-semibold">Commission List</h1>

          <div className="w-full md:w-auto">
            <button
              onClick={() => navigate("/admin/set-commission/add")}
              className="w-full md:w-auto flex items-center gap-2 bg-[#001580] text-white px-4 py-2 rounded-md hover:bg-[#001580]/90 transition-colors justify-center"
            >
              + Add Commission
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Main Container (form-like UI) */}
      <div className="bg-white p-4 shadow rounded-md ">
        <div className="overflow-x-auto bg-white shadow-md rounded-lg min-h-[600px] border border-gray-400">
          <div className="min-w-[1028px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center min-h-[400px]">
                <CircularProgress />
                <Typography sx={{ mt: 2 }}>Loading commissions...</Typography>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-[400px]">
                <div className="text-lg text-red-500">{error}</div>
              </div>
            ) : (
              <table className="w-full text-sm text-[#0D2E28] table-fixed">
                <thead className="bg-[#E4E5EB] font-[Poppins] text-base leading-[100%] tracking-[0%] align-middle">
                  <tr>
                    <th className="w-[80px] h-[56px] text-center font-medium align-middle">
                      Sr.No.
                    </th>
                    <th className="w-[200px] h-[56px] text-center font-medium align-middle">
                      Category
                    </th>
                    <th className="w-[328px] h-[56px] text-center font-medium align-middle">
                      Commission From Worker
                    </th>
                    <th className="w-[328px] h-[56px] text-center font-medium align-middle">
                      Commission From Shopkeeper
                    </th>
                    <th className="w-[140px] h-[56px] text-center font-medium align-middle">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center">
                        <div className="text-lg text-gray-500">
                          No commissions found
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentRecords.map((c, idx) => (
                      <tr key={c._id} className="text-center">
                        <td className="w-[80px] h-[56px] align-middle">
                          {indexOfFirstRecord + idx + 1}
                        </td>
                        <td className="w-[200px] h-[56px] align-middle">
                          {c.category}
                        </td>
                        <td className="w-[328px] h-[56px] align-middle">
                          {c.workerPercentageCommission} %
                        </td>
                        <td className="w-[328px] h-[56px] align-middle">
                          {c.shopkeeperPercentageCommission} %
                        </td>
                        <td className="w-[140px] h-[56px] align-middle">
                          <div className="flex justify-center space-x-4 flex-wrap">
                            <button
                              onClick={() =>
                                navigate(`/admin/set-commission/view/${c._id}`)
                              }
                              className="text-[#EC2D01] hover:text-orange-700"
                            >
                              <Eye size={20} />
                            </button>
                            <button
                              onClick={() =>
                                navigate(`/admin/set-commission/edit/${c._id}`)
                              }
                              className="text-[#EC2D01] hover:text-orange-700"
                            >
                              <Edit size={20} />
                            </button>
                            <button
                              onClick={() => setSelectedCommission(c)}
                              className="text-[#EC2D01] hover:text-orange-700"
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
        </div>

        {/* ✅ Delete Confirmation Modal */}
        {selectedCommission && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
              <h2 className="text-xl font-bold text-center text-[#0D2E28] mb-3">
                Delete Commission
              </h2>
              <p className="text-[#0D2E28] text-center mb-6 leading-relaxed">
                Are you sure you want to delete this commission?
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  onClick={() => setSelectedCommission(null)}
                  className="px-16 py-2 rounded-md border border-[#001580] bg-[#CED4F2] text-[#001580] font-medium hover:opacity-90 transition w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteCommission(selectedCommission._id);
                    setSelectedCommission(null);
                  }}
                  className="px-16 py-2 rounded-md border border-[#001580] bg-[#001580] text-white font-medium hover:opacity-90 transition w-full sm:w-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ✅ Reusable Pagination Component */}
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

export default CommissionList;
