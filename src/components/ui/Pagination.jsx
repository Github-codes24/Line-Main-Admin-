// src/components/common/Pagination.jsx
import React from "react";

const Pagination = ({
  currentPage,
  totalRecords,
  recordsPerPage,
  goToPage,
  label = "entries",
}) => {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  if (totalRecords === 0) return null; // hide pagination if no data

  // Determine which page numbers to show
  const maxVisiblePages = 3; // show only 3 pages at a time
  let startPage = Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-200 mt-5 rounded-lg shadow text-sm text-gray-700 gap-4 py-2 px-6">
      {/* Showing info */}
      <p className="font-bold text-black">
        Showing {indexOfFirstRecord + 1} to{" "}
        {Math.min(indexOfLastRecord, totalRecords)} of {totalRecords} {label}
      </p>

      {/* Buttons */}
      <div className="flex items-center space-x-2">
        {/* Prev Button */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 bg-white text-black border border-gray-300 rounded-md disabled:opacity-50"
        >
          &lt;
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((pg) => (
          <button
            key={pg}
            onClick={() => goToPage(pg)}
            className={`w-8 h-8 border text-sm font-medium rounded-md transition ${
              pg === currentPage
                ? "bg-[#001580] text-white"
                : "bg-[#CECEF2] text-black hover:bg-[#CECEF2]"
            }`}
          >
            {pg}
          </button>
        ))}

        {/* Ellipsis & Last Page */}
        {endPage < totalPages && (
          <>
            <span className="px-2">...</span>
            <button
              onClick={() => goToPage(totalPages)}
              className={`w-8 h-8 border text-sm font-medium rounded-md transition ${
                currentPage === totalPages
                  ? "bg-[#001580] text-white"
                  : "bg-[#CECEF2] text-black hover:bg-[#CECEF2]"
              }`}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 bg-white text-black border border-gray-300 rounded-md disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
