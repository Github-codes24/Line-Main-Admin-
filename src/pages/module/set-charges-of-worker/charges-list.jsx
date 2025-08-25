import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";  // Import this hook
import { Button } from "../../../components/ui/button";

export default function ChargesList() {
  // Dummy commissions
  const navigate = useNavigate(); 
  
  
  const commissions = [
    {
      id: 1,
      category: "Electrician",
      operation: "Board Fitting",
      worker: "100",
    },
    {
      id: 2,
      category: "Plumbing",
      operation: "Plumber",
      worker: "100 ",
    },
    {
      id: 3,
      category: "Tiler",
      operation: "Tile fitting",
      worker: "100",
    },
    {
      id: 4,
      category: "Painter",
      operation: "Wall Painting",
      worker: "100",
    },
    {
      id: 5,
      category: "AC & Refrigerator Mechanic",
      operation: "Refrigerator Repair",
      worker: "100",
    },
  
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(commissions.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = commissions.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      {" "}
      {/* light cement background */}
      <div className="space-y-4">
        {" "}
        {/* spacing between sections */}
        {/* Top Section */}
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Charges List</h2>
          <Button className="px-4 py-2  text-white rounded hover:bg-blue-800"   onClick={() => navigate('/admin/set-charges-of-worker/add')} >
            Add Charges
          </Button>
        </div>
        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-md pt-4 pl-4 pr-4 pb-4   ">
          <div className="border  border-gray-400 rounded-lg  "> 
            <table className="w-full mb-60  h-full text-sm text-left ">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-3 py-2 font-medium">Sr.No.</th>
                  <th className="px-3 py-2 font-medium">Category</th>
                  <th className="px-3 py-2 font-medium">Crud Operations</th>
                  <th className="px-3 py-2 font-medium">
                    Charges
                  </th>
                 
                  <th className="px-3 py-2 font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((c, idx) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2">{indexOfFirstRow + idx + 1}</td>
                    <td className="px-3 py-2">{c.category}</td>
                    <td className="px-3 py-2">{c.operation}</td>
                    <td className="px-3 py-2">{c.worker}</td>
                    <td className="px-3 py-2 text-center space-x-3 text-blue-600" >
                      <button className="text-red-600"  onClick={() => navigate(`/admin/set-charges-of-worker/view/:id`)}>
                        <FaEye  />
                      </button>
                      <button className="text-red-600"  onClick={() => navigate(`/admin/set-charges-of-worker/edit/:id`)}>
                        <FaEdit />
                      </button>
                      <button className="text-red-600">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="  rounded-lg shadow-md px-4 py-3 flex justify-between items-center text-sm text-gray-600 bg-slate-200 mt-2">
            <span className="text-zinc-950">
              Showing {indexOfFirstRow + 1} to{" "}
              {Math.min(indexOfLastRow, commissions.length)} of{" "}
              {commissions.length} Entries
            </span>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-1 border rounded-full hover:bg-gray-200 disabled:opacity-50"
              >
                &lt;
              </button>
              {[...Array(totalPages)].map((_, page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page + 1)}
                  className={`px-3 py-1 border rounded-full ${
                    currentPage === page + 1
                      ? "bg-blue-700 text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {page + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 border rounded-full hover:bg-gray-200 disabled:opacity-50"
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
