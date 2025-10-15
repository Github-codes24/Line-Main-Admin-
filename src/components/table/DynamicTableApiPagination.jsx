// src/components/common/DynamicTable.jsx
import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import LoadingSpinner from "../ui/LoadingSpinner";
import Pagination from "../ui/Pagination";

export default function DynamicTableApiPagination({
  columns = [],
  rows = [],
  currentPage = 1,
  totalEntries = 0,
  onPageChange = () => {},
  pageSize = 10,
  stickyHeader = true,
  fontFamily = "Poppins, sans-serif",
  headerStyle = {},
  cellStyle = {},
  order,
  orderBy,
  setOrder,
  setOrderBy,
  loading = true,
  error,
}) {
  const handleRequestSort = (property) => {
    const nonSortableFields = ["srNo", "image", "action"];
    if (nonSortableFields.includes(property)) return;

    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = React.useMemo(() => {
    if (!orderBy) return rows;
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
  }, [rows, order, orderBy]);

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden", fontFamily, boxShadow: "none" }}
      className="flex flex-col"
    >
      <TableContainer sx={{ fontFamily }} className="flex-1">
        <Table stickyHeader={stickyHeader} aria-label="dynamic table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  sortDirection={orderBy === column.id ? order : false}
                  sx={{
                    backgroundColor: "#ff8c12",
                    color: "white",
                    fontWeight: 500,
                    fontSize: "1rem",
                    fontFamily,
                    minWidth: column.minWidth,
                    cursor: ["srNo", "image", "action"].includes(column.id)
                      ? "default"
                      : "pointer",
                    ...headerStyle,
                  }}
                  onClick={() => handleRequestSort(column.id)}
                >
                  {!["srNo", "image", "action"].includes(column.id) ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      sx={{
                        color: "white !important",
                        "& .MuiTableSortLabel-icon": {
                          color: "white !important",
                        },
                      }}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          {loading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <LoadingSpinner />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : error ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <span className="text-red-500 font-semibold text-lg">
                    {error}
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : rows.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <span className="font-medium text-lg">No data found.</span>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {sortedRows.map((row, rowIndex) => (
                <TableRow hover tabIndex={-1} key={row.id || rowIndex}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align || "left"}
                      sx={{ fontFamily, ...cellStyle }}
                    >
                      {column.id === "srNo"
                        ? String(
                            (currentPage - 1) * pageSize + rowIndex + 1
                          ).padStart(2, "0")
                        : typeof row[column.id] === "object" &&
                          row[column.id]?.render !== undefined
                        ? row[column.id].render
                        : row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {/* ✅ Use new Pagination component */}
      <Pagination
        currentPage={currentPage}
        totalRecords={totalEntries}
        recordsPerPage={pageSize}
        goToPage={onPageChange}
        label="entries"
      />
    </Paper>
  );
}
