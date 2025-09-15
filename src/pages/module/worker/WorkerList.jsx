// WorkerList.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Popover,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Tooltip,
} from "@mui/material";
import Worker from "../../../components/cards/worker.jsx";
import { DeleteIcon, EditIcon, FilterIcon, ViewIcon } from "../../../assets/CommonAssets";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

function WorkerList() {
  const navigate = useNavigate();
  const [fetchData] = useFetch();

  const [searchText, setSearchText] = useState("");
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const [workerData, setWorkerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const expertiseOptions = ["Electrician", "Plumber", "Tiler", "Painter", "AC & Refrigerator Mechanic"];

  // 👇 Fetch workers with custom hook
  useEffect(() => {
    fetchAllWorkers();
  }, []);

  const fetchAllWorkers = async () => {
    try {
      setError("");
      setLoading(true);

      const result = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/admin/Worker/get-all-worker`,
      });

      if (result.success) {
        const normalizedWorkers = (result.workers || [])
          .map((worker) => ({
            ...worker,
            name: worker.name || "Unknown",
            expertise: worker.experties || worker.expertise || "N/A",
            contact: worker.contact || worker.phone || worker.email || "N/A",
            address: worker.address || "N/A",
            id: worker._id || worker.id,
            status: worker.status || "Inactive",
          }))
          .filter((w) => w.name !== "Unknown");

        setWorkerData(normalizedWorkers);

        if (normalizedWorkers.length === 0) {
          toast.info("No workers found");
        }
      } else {
        setError(result.message || "Failed to fetch workers");
        setWorkerData([]);
      }
    } catch (err) {
      console.error("Error fetching workers:", err);
      setError(err.response?.data?.message || err.message || "Error fetching workers");
      setWorkerData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (workerId) => {
    if (!window.confirm("Are you sure you want to delete this worker?")) return;

    try {
      setLoading(true);

      const result = await fetchData({
        method: "DELETE",
        url: `${conf.apiBaseUrl}/admin/Worker/delete-worker/${workerId}`,
      });

      if (result.success) {
        toast.success(result.message || "Worker deleted successfully");
        fetchAllWorkers(); // refresh list
      } else {
        toast.error(result.message || "Failed to delete worker");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err.response?.data?.message || err.message || "Error deleting worker");
    } finally {
      setLoading(false);
    }
  };

  // 👇 Filter workers
  const filteredWorkers = workerData.filter((worker) => {
    const searchLower = searchText.toLowerCase();

    const matchesSearch =
      searchText.trim() === "" ||
      worker.name?.toLowerCase().includes(searchLower) ||
      worker.expertise?.toLowerCase().includes(searchLower) ||
      worker.contact?.toLowerCase().includes(searchLower) ||
      worker.address?.toLowerCase().includes(searchLower) ||
      worker.status?.toLowerCase().includes(searchLower);

    const matchesFilter = appliedFilters.length === 0 || appliedFilters.includes(worker.expertise);

    return matchesSearch && matchesFilter;
  });

  if (loading) return <p>Loading workers...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "24px" }}>
      <Worker
        onClick={() => navigate("/admin/workermanagement/add")}
        title="Worker List"
        searchValue={searchText}
        setSearchValue={setSearchText}
        buttonText="Add New Worker"
        btnpath="/admin/workermanagement/add"
      />

      <Card>
        <CardHeader
          sx={{ paddingX: 3 }}
          title={
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  background: "#E0E9E9",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "5px",
                  borderRadius: 1,
                  cursor: "pointer",
                }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <FilterIcon />
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {appliedFilters.map((filter, index) => (
                  <Chip
                    key={index}
                    label={filter}
                    size="small"
                    onDelete={() => setAppliedFilters((prev) => prev.filter((f) => f !== filter))}
                    sx={{ backgroundColor: "#F0F0F0" }}
                  />
                ))}
              </Box>

              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Box sx={{ p: 2, minWidth: 200 }}>
                  <strong>Expertise</strong>
                  <FormGroup>
                    {expertiseOptions.map((option) => (
                      <FormControlLabel
                        key={option}
                        control={
                          <Checkbox
                            checked={appliedFilters.includes(option)}
                            onChange={() =>
                              setAppliedFilters((prev) =>
                                prev.includes(option)
                                  ? prev.filter((f) => f !== option)
                                  : [...prev, option]
                              )
                            }
                          />
                        }
                        label={option}
                      />
                    ))}
                  </FormGroup>
                </Box>
              </Popover>
            </Box>
          }
          action={
            <Button
              variant="outlined"
              onClick={() => setAppliedFilters([])}
              sx={{
                marginTop: 1,
                borderColor: "#001580",
                color: "#001580",
                background: "#CECEF2",
                paddingX: 4,
                paddingY: "2px",
                textTransform: "none",
              }}
            >
              Reset Filter
            </Button>
          }
        />

        <CardContent sx={{ paddingTop: 0 }}>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              border: "1px solid black",
              maxHeight: 300,
              overflowY: "scroll",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {["Sr.No.", "Worker Name", "Expertise", "Contact", "Address", "Status", "Action"].map(
                    (head, i) => (
                      <TableCell
                        key={i}
                        sx={{ fontWeight: 600, textAlign: "center", background: "#E0E9E9" }}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredWorkers.map((item, index) => (
                  <TableRow hover key={item.id || index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.expertise}</TableCell>
                    <TableCell>{item.contact}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell
                      sx={{
                        color: item.status === "Active" ? "#34C759" : "#FF383C",
                        fontWeight: 500,
                      }}
                    >
                      {item.status}
                    </TableCell>
                    <TableCell sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                      {/* View */}
                      <Tooltip title="View Worker">
                        <IconButton
                          size="small"
                          sx={{ color: "#1976d2" }}
                          onClick={() => navigate(`/admin/workermanagement/workerview/${item.id}`)}
                        >
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>

                      {/* Edit */}
                      <Tooltip title="Edit Worker">
                        <IconButton
                          size="small"
                          sx={{ color: "#ed6c02" }}
                          onClick={() => navigate(`/admin/workermanagement/workeredit/${item.id}`)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>

                      {/* Delete */}
                      <Tooltip title="Delete Worker">
                        <IconButton
                          size="small"
                          sx={{ color: "#d32f2f" }}
                          onClick={() => handleDelete(item.id)}
                          disabled={loading}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}

export default WorkerList;
