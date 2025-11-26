// src/components/common/DynamicTable.jsx
import React, { useState, useMemo } from "react";
import { IoClose } from "react-icons/io5";

const LoadingSpinner = ({ size = "lg" }) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-4",
    lg: "h-10 w-10 border-4",
  };

  return (
    <div className="flex justify-center items-center h-full my-8">
      <div
        className={`animate-spin rounded-full border-t-transparent border-solid ${sizeClasses[size]} border-[#1c136f]`}
      />
    </div>
  );
};

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

  if (totalRecords === 0) return null;

  const maxVisiblePages = 3;
  let startPage, endPage;

  if (totalPages <= maxVisiblePages) {
    startPage = 1;
    endPage = totalPages;
  } else {
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
      <p className="font-bold text-[#0D2E28]">
        Showing {indexOfFirstRecord + 1} to{" "}
        {Math.min(indexOfLastRecord, totalRecords)} of {totalRecords} {label}
      </p>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 bg-white text-[#0D2E28] border border-gray-300 rounded-md disabled:opacity-50"
        >
          &lt;
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => goToPage(1)}
              className={`w-8 h-8 border text-sm font-medium rounded-md transition ${
                currentPage === 1
                  ? "bg-[#001580] text-white"
                  : "bg-[#CECEF2] text-[#001580] hover:bg-[#CECEF2]"
              }`}
            >
              1
            </button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}

        {pageNumbers.map((pg) => (
          <button
            key={pg}
            onClick={() => goToPage(pg)}
            className={`w-8 h-8 border text-sm font-medium rounded-md transition ${
              pg === currentPage
                ? "bg-[#001580] text-white"
                : "bg-[#CECEF2] text-[#001580] hover:bg-[#CECEF2]"
            }`}
          >
            {pg}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
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

const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    className="cursor-pointer"
  >
    <path
      d="M0 10C0 4.47715 4.47715 0 10 0H30C35.5228 0 40 4.47715 40 10V30C40 35.5228 35.5228 40 30 40H10C4.47715 40 0 35.5228 0 30V10Z"
      fill="#E4E5EB"
    />
    <path
      d="M16.8571 20.506C14.3701 18.646 12.5961 16.6 11.6271 15.45C11.3271 15.094 11.2291 14.833 11.1701 14.374C10.9681 12.802 10.8671 12.016 11.3281 11.508C11.7891 11 12.6041 11 14.2341 11H25.7661C27.3961 11 28.2111 11 28.6721 11.507C29.1331 12.015 29.0321 12.801 28.8301 14.373C28.7701 14.832 28.6721 15.093 28.3731 15.449C27.4031 16.601 25.6261 18.651 23.1331 20.514C23.0178 20.6037 22.9225 20.7165 22.8533 20.8451C22.7841 20.9737 22.7425 21.1154 22.7311 21.261C22.4841 23.992 22.2561 25.488 22.1141 26.244C21.8851 27.466 20.1541 28.201 19.2261 28.856C18.6741 29.246 18.0041 28.782 17.9331 28.178C17.6676 25.8765 17.4429 23.5705 17.2591 21.261C17.2488 21.114 17.2077 20.9708 17.1385 20.8407C17.0692 20.7106 16.9733 20.5966 16.8571 20.506Z"
      stroke="#0D2E28"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function DynamicTable({
  columns = [],
  rows = [],
  currentPage = 1,
  totalEntries = 0,
  onPageChange = () => {},
  pageSize = 10,
  loading = false,
  error = null,
  // Filter props
  enableFilter = false,
  filterOptions = [],
  filterLabel = "Filter",
  onFilterChange = () => {},
  activeFilters = [],
  // Sorting props
  enableSorting = true,
  order = "asc",
  orderBy = "",
  onSort = () => {},
  // Style props
  headerBgColor = "#001580",
  headerTextColor = "white",
  nonSortableFields = ["srNo", "image", "action"],
}) {
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const handleRequestSort = (property) => {
    if (!enableSorting || nonSortableFields.includes(property)) return;

    const isAsc = orderBy === property && order === "asc";
    onSort(property, isAsc ? "desc" : "asc");
  };

  const sortedRows = useMemo(() => {
    if (!enableSorting || !orderBy) return rows;
    
    return [...rows].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      const aSort =
        typeof aValue === "object" && aValue?.sortValue !== undefined
          ? aValue.sortValue
          : aValue;
      const bSort =
        typeof bValue === "object" && bValue?.sortValue !== undefined
          ? bValue.sortValue
          : bValue;

      if (aSort === undefined || bSort === undefined) return 0;
      if (typeof aSort === "string") {
        return order === "asc"
          ? aSort.localeCompare(bSort)
          : bSort.localeCompare(aSort);
      }
      return order === "asc" ? aSort - bSort : bSort - aSort;
    });
  }, [rows, order, orderBy, enableSorting]);

  const toggleFilter = (filter) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter((f) => f !== filter)
      : [...activeFilters, filter];
    onFilterChange(newFilters);
  };

  const removeFilter = (filter) => {
    onFilterChange(activeFilters.filter((f) => f !== filter));
  };

  const resetFilters = () => {
    onFilterChange([]);
  };

  return (
    <div className="w-full">
      {/* Filter Section */}
      {enableFilter && (
        <div className="relative flex flex-wrap gap-2 pb-4">
          <div onClick={() => setShowFilterPanel(true)}>
            <FilterIcon />
          </div>

          {/* Filter Panel */}
          {showFilterPanel && (
            <div className="absolute left-0 top-14 bg-white rounded-lg shadow-lg px-4 py-2 w-70 border border-gray-300 z-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#0D2E28]">
                  {filterLabel}
                </h3>
                <button
                  onClick={() => setShowFilterPanel(false)}
                  className="text-[#0D2E28] hover:text-[#0D2E28] text-2xl"
                >
                  <IoClose />
                </button>
              </div>
              <div className="space-y-3">
                {filterOptions.map((item) => (
                  <label
                    key={item}
                    className="flex items-center space-x-2 cursor-pointer text-[#0D2E28]"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#0D2E28] border-gray-300 rounded"
                      checked={activeFilters.includes(item)}
                      onChange={() => toggleFilter(item)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Active Filters */}
          {activeFilters.map((filter) => (
            <span
              key={filter}
              className="px-3 py-1 bg-[#E4E5EB] text-[#0D2E28] font-medium rounded-full flex items-center gap-1"
            >
              {filter}
              <button
                onClick={() => removeFilter(filter)}
                className="text-[#0D2E28] font-semibold ml-1"
              >
                <IoClose />
              </button>
            </span>
          ))}

          {activeFilters.length > 0 && (
            <button
              onClick={resetFilters}
              className="w-[200px] ml-auto border border-[#0D2E28] bg-[#CECEF2] text-[#0D2E28] font-medium px-6 py-2 rounded-lg"
            >
              Reset Filter
            </button>
          )}
        </div>
      )}

      {/* Table Container */}
      <div className="w-full overflow-hidden bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Head */}
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    className="px-6 py-3 text-left text-sm font-medium cursor-pointer"
                    style={{
                      backgroundColor: headerBgColor,
                      color: headerTextColor,
                      minWidth: column.minWidth,
                      cursor: nonSortableFields.includes(column.id)
                        ? "default"
                        : "pointer",
                    }}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      {enableSorting &&
                        !nonSortableFields.includes(column.id) && (
                          <span className="text-xs">
                            {orderBy === column.id ? (
                              order === "asc" ? (
                                "↑"
                              ) : (
                                "↓"
                              )
                            ) : (
                              <span className="opacity-50">↕</span>
                            )}
                          </span>
                        )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-8">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-8">
                    <span className="text-red-500 font-semibold text-lg">
                      {error}
                    </span>
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-8">
                    <span className="font-medium text-lg">No data found.</span>
                  </td>
                </tr>
              ) : (
                sortedRows.map((row, rowIndex) => (
                  <tr
                    key={row.id || rowIndex}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.id}
                        className="px-6 py-4 text-sm text-gray-900"
                      >
                        {column.id === "srNo"
                          ? String(
                              (currentPage - 1) * pageSize + rowIndex + 1
                            ).padStart(2, "0")
                          : typeof row[column.id] === "object" &&
                            row[column.id]?.render !== undefined
                          ? row[column.id].render
                          : row[column.id]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalRecords={totalEntries}
          recordsPerPage={pageSize}
          goToPage={onPageChange}
          label="entries"
        />
      </div>
    </div>
  );
}