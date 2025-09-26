import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";
import { FiEye } from "react-icons/fi";

export default function CommissionList() {
  const navigate = useNavigate();
  const [fetchData] = useFetch();
  const [commissions, setCommissions] = useState([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch all commissions
  const getCommissions = async () => {
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/admin/commissions/get-all-commission`,
      });
      if (res?.commissions) setCommissions(res.commissions);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch commissions!");
    }
  };

  useEffect(() => {
    getCommissions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this commission?")) return;
    try {
      await fetchData({
        method: "DELETE",
        url: `${conf.apiBaseUrl}/admin/commissions/delete-commission/${id}`,
      });
      alert("Commission deleted successfully!");
      getCommissions();
    } catch (err) {
      console.error(err);
      alert("Failed to delete commission!");
    }
  };

  // Pagination
  const totalPages = Math.ceil(commissions.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = commissions.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className=" bg-gray-200 min-h-screen">
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Commission List</h2>
          <Button
            className="px-5 py-2 text-white rounded hover:bg-blue-800"
            onClick={() => navigate("/admin/set-commission/add")}
          >
            Add Commission
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md pt-4 pl-4 pr-4 pb-4">
          <div className="border border-gray-400 rounded-lg">
           <div className="w-full overflow-x-auto">
 <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-semibold">
  <thead>
    <tr className="bg-[#e3e5eb] text-gray-700 text-center">
      <th className="px-4 py-3 font-semibold whitespace-nowrap border-b">
        Sr.No.
      </th>
      <th className="px-4 py-3 font-semibold whitespace-nowrap border-b">
        Category
      </th>
      <th className="px-4 py-3 font-semibold whitespace-nowrap border-b">
        Commission From Worker
      </th>
      <th className="px-4 py-3 font-semibold whitespace-nowrap border-b">
        Commission From Shopkeeper
      </th>
      <th className="px-4 py-3 font-semibold whitespace-nowrap border-b">
        Action
      </th>
    </tr>
  </thead>
  <tbody className="text-center text-gray-700">
    {currentRows.map((c, idx) => (
      <tr
        key={c._id}
        className="hover:bg-gray-50 transition-colors "
      >
        <td className="px-4 py-3 font-normal">{indexOfFirstRow + idx + 1}</td>
        <td className="px-4 py-3 font-normal">{c.category}</td>
        <td className="px-4 py-3 font-normal">
          {c.workerPercentageCommission} %
        </td>
        <td className="px-4 py-3 font-normal">
          {c.shopkeeperPercentageCommission} %
        </td>
        <td className="px-4 py-3 space-x-3 text-red-600 flex justify-center items-center">
          <button
            onClick={() => navigate(`/admin/set-commission/view/${c._id}`)}
          
          >
          <FiEye size={17}/>
          </button>
          <button
            onClick={() => navigate(`/admin/set-commission/edit/${c._id}`)}
           
          >
            <FaEdit size={17}/>
          </button>
          <button
            onClick={() => handleDelete(c._id)}
            className="hover:text-red-600"
          >
            <FaTrash size={17}/>
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

</div>

          </div>

          {/* Pagination */}
          <div className="rounded-lg shadow-md px-4 py-3 flex justify-between items-center text-sm mt-2 bg-[#f5f5f5]">
            <span className="text-zinc-950 ">
              Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, commissions.length)} of {commissions.length} Entries
            </span>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-1 border text-blue-950 bg-white rounded-full hover:bg-gray-200 disabled:opacity-50"
              >
                &lt;
              </button>
              {[...Array(totalPages)].map((_, page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page + 1)}
                  className={`px-3 py-1 border rounded-lg ${
                    currentPage === page + 1 ? "bg-blue-900 text-white" : "hover:bg-gray-200"
                  }`}
                >
                  {page + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 border text-blue-950 bg-white rounded-full hover:bg-gray-200 disabled:opacity-50"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
