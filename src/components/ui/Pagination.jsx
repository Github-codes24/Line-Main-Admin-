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
  const maxVisiblePages = 3; // show up to 5 pages at a time
  let startPage, endPage;

  if (totalPages <= maxVisiblePages) {
    // If total pages is less than max visible, show all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // Calculate start and end pages based on current page
    const halfVisible = Math.floor(maxVisiblePages / 2);

    if (currentPage <= halfVisible) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage + halfVisible >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfVisible;
      endPage = currentPage + halfVisible;
    }
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-200 mt-5 rounded-lg shadow text-sm text-[#001580] gap-4 py-2 px-6">
      {/* Showing info */}
      <p className="font-bold text-[#0D2E28]">
        Showing {indexOfFirstRecord + 1} to{" "}
        {Math.min(indexOfLastRecord, totalRecords)} of {totalRecords} {label}
      </p>

      {/* Buttons */}
      <div className="flex items-center space-x-2">
        {/* Prev Button */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 bg-white text-[#0D2E28] border border-gray-300 rounded-md disabled:opacity-50"
        >
          &lt;
        </button>

        {/* Show first page and ellipsis if needed */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => goToPage(1)}
              className={`w-8 h-8 border text-sm font-medium rounded-md transition ${currentPage === 1
                ? "bg-[#001580] text-white"
                : "bg-[#CECEF2] text-[#001580] hover:bg-[#CECEF2]"
                }`}
            >
              1
            </button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((pg) => (
          <button
            key={pg}
            onClick={() => goToPage(pg)}
            className={`w-8 h-8 border text-sm font-medium rounded-md transition ${pg === currentPage
              ? "bg-[#001580] text-white"
              : "bg-[#CECEF2] text-[#001580] hover:bg-[#CECEF2]"
              }`}
          >
            {pg}
          </button>
        ))}

        {/* Show ellipsis and last page if needed */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
            <button
              onClick={() => goToPage(totalPages)}
              className={`w-8 h-8 border text-sm font-medium rounded-md transition ${currentPage === totalPages
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
