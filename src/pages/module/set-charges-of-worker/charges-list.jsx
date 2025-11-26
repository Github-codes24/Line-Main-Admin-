// src/pages/module/set-charges-of-worker/ChargesList.jsx
import React, { useState, useEffect } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../../components/ui/Pagination";
import conf from "../../../config";
import useFetch from "../../../hook/useFetch";

const ChargesList = () => {
  const navigate = useNavigate();
  const [fetchData] = useFetch();

  const [charges, setCharges] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const [selectedCharge, setSelectedCharge] = useState(null);

  const fetchChargesList = async () => {
    try {
      setError("");
      setIsLoading(true);

      // fetch tabs first
      const tabsRes = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/admin/tabs/experties`,
      });
      if (tabsRes?.success) setTabs(tabsRes.data || []);

      // fetch charges
      const result = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/admin/worker-charges/get-all-worker-charges`,
      });

      if (result?.success) {
        const normalized = (result.workerCharges || []).map((r) => {
          const matchedTab = tabsRes.data?.find((t) => t._id === r.categoryId);
          return {
            ...r,
            id: r._id || r.id || Math.random().toString(36).slice(2),
            categoryName: matchedTab?.tabName || r.category || "N/A",
          };
        });
        setCharges(normalized);
      } else {
        setCharges([]);
        toast.info(result?.message || "No charges found");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Error fetching charges");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChargesList();
  }, []);

  const handleAdd = () => navigate("/admin/set-charges-of-worker/add");
  const handleEdit = (id) => navigate(`/admin/set-charges-of-worker/edit/${id}`);
  const handleView = (id) => navigate(`/admin/set-charges-of-worker/view/${id}`);

  const deleteCharge = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetchData({
        method: "DELETE",
        url: `${conf.apiBaseUrl}/admin/worker-charges/delete-worker-charges/${id}`,
      });
      if (res?.success) {
        toast.success(res.message || "Deleted successfully");
        fetchChargesList();
      } else {
        toast.error(res?.message || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
      setSelectedCharge(null);
    }
  };

  // Pagination logic
  const totalRecords = charges.length;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = charges.slice(indexOfFirstRecord, indexOfLastRecord);

  const goToPage = (pg) => setCurrentPage(pg);

  return (
    <div className="bg-[#E0E9E9] min-h-screen w-full font-[Poppins]">
      <ToastContainer />

      {/* Header */}
      <div className="bg-white p-3 shadow-md mb-4 rounded-md min-h-[65px] flex flex-col md:flex-row items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Charges List</h1>
        <button
          onClick={handleAdd}
          className="w-full md:w-auto flex items-center gap-2 bg-[#001580] text-white px-4 py-2 rounded-md hover:bg-[#001580]/90 transition-colors justify-center"
        >
          + Add Charges
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-white p-4 shadow rounded-md">
        <div className="overflow-x-auto bg-white shadow-md rounded-lg min-h-[600px] border border-gray-400">
          <div className="min-w-[1028px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center min-h-[400px]">
                <CircularProgress />
                <Typography sx={{ mt: 2 }}>Loading charges...</Typography>
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
                    <th className="w-[200px] h-[56px] text-center font-medium align-middle">Category</th>
                    <th className="w-[328px] h-[56px] text-center font-medium align-middle">Charges</th>
                    <th className="w-[140px] h-[56px] text-center font-medium align-middle">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center">
                        <div className="text-lg text-gray-500">No charges found</div>
                      </td>
                    </tr>
                  ) : (
                    currentRecords.map((item, idx) => (
                      <tr key={item.id} className="text-center">
                        <td className="w-[80px] h-[56px] align-middle">{indexOfFirstRecord + idx + 1}</td>
                        <td className="w-[200px] h-[56px] align-middle">{item.categoryName}</td>
                        <td className="w-[328px] h-[56px] align-middle">₹{item.charges ?? "N/A"}</td>
                        <td className="w-[140px] h-[56px] align-middle">
                          <div className="flex justify-center space-x-4 flex-wrap">
                            <button onClick={() => handleView(item.id)} className="text-[#EC2D01] hover:text-orange-700">
                              <Eye size={20} />
                            </button>
                            <button onClick={() => handleEdit(item.id)} className="text-[#EC2D01] hover:text-orange-700">
                              <Edit size={20} />
                            </button>
                            <button onClick={() => setSelectedCharge(item)} className="text-[#EC2D01] hover:text-orange-700">
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

        {/* Delete Confirmation Modal */}
        {selectedCharge && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
              <h2 className="text-xl font-bold text-center text-[#0D2E28] mb-3">Delete Charge</h2>
              <p className="text-[#0D2E28] text-center mb-6 leading-relaxed">
                Are you sure you want to delete this charge?
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  onClick={() => setSelectedCharge(null)}
                  className="px-16 py-2 rounded-md border border-[#001580] bg-[#CED4F2] text-[#001580] font-medium hover:opacity-90 transition w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteCharge(selectedCharge.id)}
                  className="px-16 py-2 rounded-md border border-[#001580] bg-[#001580] text-white font-medium hover:opacity-90 transition w-full sm:w-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

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

export default ChargesList;
