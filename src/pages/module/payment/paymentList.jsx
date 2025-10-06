import React, { useEffect, useState } from "react";
import { Eye, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import usePayment from "../../../hook/payment/usePayment";

const PaymentList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const { searchPayment, fetchPayment } = usePayment();
  const [search, setSearch] = useState("");

  // Fetch data on mount
  useEffect(() => {
    fetchPayment(search, currentPage, recordsPerPage);
  }, [search, currentPage]);

  const filteredData = searchPayment.filter((item) =>
    item._id?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / recordsPerPage) || 1;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const goToPage = (pg) => {
    if (pg >= 1 && pg <= totalPages) setCurrentPage(pg);
  };

  return (
    <div className="">
      {/* Header + Search */}
      <div className="bg-white p-3 rounded-lg shadow">
        <div className="flex items-center justify-between flex-wrap gap-4 w-full">
          <h2 className="text-lg font-semibold">Payment List</h2>

          <div className="flex-1 flex justify-center w-full sm:w-auto">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by Transaction Id..."
                className="w-full rounded-full border px-4 py-2 text-black bg-[#e3e5eb] shadow pl-10 border-blue-900"
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mt-6">
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-[#e3e5eb] text-black">
              <tr>
                <th className="px-4 py-3 text-left">Sr.No.</th>
                <th className="px-4 py-3 text-left">Transaction ID</th>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Transaction Mode</th>
                <th className="px-4 py-3 text-left">Remarks</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((item, index) => (
                <tr key={item._id} className="border-t">
                  <td className="px-4 py-4">{indexOfFirstRecord + index + 1}</td>
                  <td className="px-4 py-4 break-words max-w-[150px]">
                    {item._id}
                  </td>
                  <td className="px-4 py-4 break-words max-w-[150px]">
                    {item.orderId}
                  </td>
                  <td
                    className={`px-4 py-4 font-semibold ${
                      item.amount < 0 ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {item.amount < 0
                      ? `-₹${Math.abs(item.amount)}`
                      : `+₹${item.amount}`}
                  </td>
                  <td className="px-4 py-4">
                    {item.status === "settled" ? "Online" : "Wallet"}
                  </td>
                  <td className="px-4 py-4 break-words max-w-[200px]">
                    {item.status === "settled"
                      ? "Payment Received From Customer"
                      : "Amount Refunded / Deducted"}
                  </td>
                  <td
                    className="px-4 py-4 text-center text-red-500 cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/payment/details/${item._id}`)
                    }
                  >
                    <Eye size={18} />
                  </td>
                </tr>
              ))}
              {currentRecords.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-5 text-sm text-black bg-[#f9fafb] gap-4 p-3 rounded-md">
          <p className="font-medium text-gray-600 text-center sm:text-left">
            Showing {filteredData.length > 0 ? indexOfFirstRecord + 1 : 0} to{" "}
            {Math.min(indexOfLastRecord, filteredData.length)} of{" "}
            {filteredData.length} Entries
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => goToPage(pg)}
                className={`w-8 h-8 border text-sm font-medium rounded-md transition ${
                  pg === currentPage
                    ? "bg-blue-900 text-white"
                    : "bg-gray-200 text-blue-900 hover:bg-gray-300"
                }`}
              >
                {pg}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentList;
