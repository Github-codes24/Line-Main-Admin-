// src/pages/module/set-limit-amount/set-limit-amount.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const SetLimitAmount = () => {
  const navigate = useNavigate();
  const [fetchData] = useFetch();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const loadData = async () => {
    try {
      const result = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/admin/limit-amount`,
      });
      if (result.success) {
        setData(result.data);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEdit = (id) => navigate(`/admin/set-limit-amount/edit/${id}`);
  const handleView = (id) => navigate(`/admin/set-limit-amount/view/${id}`);
  const handleAdd = () => navigate("/admin/set-limit-amount/alt");

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this limit?")) return;
    try {
      const res = await fetchData({
        method: "DELETE",
        url: `${conf.apiBaseUrl}/admin/limit-amount/${id}`,
      });
      if (res.success) {
        alert("Deleted successfully");
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage]);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="flex bg-[#E0E9E9] font-[Poppins] min-h-screen">
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4 bg-white px-4 py-3 rounded-lg shadow">
          <h1 className="text-xl font-medium">Limit Amount List</h1>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-[#001580] text-white rounded-lg"
          >
            + Add Limit Amount
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="border border-[#616666] rounded-lg overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#E4E5EB] text-center text-[#0D2E28] font-medium">
                  <th className="px-4 py-3">Sr.No.</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Charges</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length ? (
                  paginatedData.map((item, index) => (
                    <tr key={item._id} className="text-center h-14">
                      <td className="px-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td className="px-4">{item.category}</td>
                      <td className="px-4">₹{item.charges}</td>
                      <td className="px-4">
                        <div className="flex items-center justify-center space-x-3">
                          <Eye
                            className="w-5 h-5 text-red-600 cursor-pointer"
                            onClick={() => handleView(item._id)}
                            title="View"
                          />
                          <Edit
                            className="w-5 h-5 text-red-600 cursor-pointer"
                            onClick={() => handleEdit(item._id)}
                            title="Edit"
                          />
                          <Trash2
                            className="w-5 h-5 text-red-600 cursor-pointer"
                            onClick={() => handleDelete(item._id)}
                            title="Delete"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {data.length > itemsPerPage && (
            <div className="flex justify-between items-center mt-4 bg-[#F5F5F5] rounded-lg py-2 px-4">
              <span className="text-sm font-semibold">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} Entries
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`w-8 h-8 flex items-center justify-center rounded-xl ${
                    currentPage === 1
                      ? "bg-gray-200 text-[#001580]"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  &lt;
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (page < currentPage - 1 || page > currentPage + 1)
                    return null;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 flex items-center justify-center rounded-xl font-semibold ${
                        page === currentPage
                          ? "bg-[#001580] text-white"
                          : "bg-[#CECEF2] text-[#001580] hover:bg-[#CECEF2]"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`w-8 h-8 flex items-center justify-center rounded-xl ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-[#001580]"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetLimitAmount;
