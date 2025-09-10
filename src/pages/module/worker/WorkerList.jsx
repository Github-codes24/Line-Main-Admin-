// WorkerList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
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
} from "@mui/material";
import Worker from "../../../components/cards/worker.jsx";
import { DeleteIcon, EditIcon, FilterIcon, ViewIcon } from "../../../assets/CommonAssets";
import { useNavigate } from "react-router-dom";

function WorkerList() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleAddworker = () => {
        toast.success("Add worker clicked!");

        navigate("/admin/workermanagement/add");

    };

    // 👇 API data state
    const [workerData, setWorkerData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const expertiseOptions = ["Electrician", "Plumber", "Tiler", "Painter", "AC & Refrigerator Mechanic"];

    // 👇 JWT Token
    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGI2ODFkZGI4YzdmOTU5MDA2ZjE0MGYiLCJlbWFpbCI6ImRpdnlhMTIzNEBnbWFpbC5jb20iLCJpYXQiOjE3NTY3OTE0NzQsImV4cCI6MTc1OTM4MzQ3NH0.b99vHox8Sjvc6KJHMwdlygK8zspf8-Hf50UVs5ntS4M";

    // 👇 Fetch workers from API with token
    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await axios.get(
                    "https://linemen-be-1.onrender.com/admin/Worker/get-all-worker",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // ✅ attach token here
                        },
                    }
                );
                setWorkerData(response.data?.workers || []); // adjust if backend sends { workers: [] }
            } catch (err) {
                console.error("Error fetching workers:", err);
                setError("Failed to load workers");
            } finally {
                setLoading(false);
            }
        };

        fetchWorkers();
    }, []);

    const handleFilterClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setAnchorEl(null);
    };

    const handleCheckboxChange = (option) => {
        setAppliedFilters((prev) =>
            prev.includes(option) ? prev.filter((f) => f !== option) : [...prev, option]
        );
    };

    const handleResetFilters = () => {
        setAppliedFilters([]);
    };

    const open = Boolean(anchorEl);

    // 👇 Filter workers with search + filters
    const filteredWorkers = workerData.filter((worker) => {
        const matchesSearch =
            searchText.trim() === "" ||
            worker.name?.toLowerCase().includes(searchText.toLowerCase()) ||
            worker.expertise?.toLowerCase().includes(searchText.toLowerCase()) ||
            worker.contact?.toLowerCase().includes(searchText.toLowerCase()) ||
            worker.address?.toLowerCase().includes(searchText.toLowerCase()) ||
            worker.status?.toLowerCase().includes(searchText.toLowerCase());

        const matchesFilter =
            appliedFilters.length === 0 || appliedFilters.includes(worker.experties);

        return matchesSearch && matchesFilter;
    });

    if (loading) return <p>Loading workers...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Box sx={{ width: "100%", minHeight: "auto", display: "flex", flexDirection: "column", gap: "24px" }}>
            <Worker
                onClick={handleAddworker}
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
                                onClick={handleFilterClick}
                            >
                                <FilterIcon />
                            </Box>

                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                {appliedFilters.map((filter, index) => (
                                    <Chip
                                        key={index}
                                        label={filter}
                                        size="small"
                                        onDelete={() =>
                                            setAppliedFilters((prev) => prev.filter((f) => f !== filter))
                                        }
                                        sx={{ backgroundColor: "#F0F0F0" }}
                                    />
                                ))}
                            </Box>

                            <Popover
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleFilterClose}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                            >
                                <Box sx={{ p: 2, minWidth: 200 }}>
                                    <strong>Experties</strong>
                                    <FormGroup>
                                        {expertiseOptions.map((option) => (
                                            <FormControlLabel
                                                key={option}
                                                control={
                                                    <Checkbox
                                                        checked={appliedFilters.includes(option)}
                                                        onChange={() => handleCheckboxChange(option)}
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
                            onClick={handleResetFilters}
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
                        <Table stickyHeader sx={{ borderRadius: 2 }}>
                            <TableHead>
                                <TableRow>
                                    {[
                                        "Sr.No.",
                                        "Worker Name",
                                        "experties",
                                        "Email ID/Phone Number",
                                        "Address",
                                        "Status",
                                        "Action",
                                    ].map((head, i) => (
                                        <TableCell
                                            key={i}
                                            sx={{ fontWeight: 600, textAlign: "center", background: "#E0E9E9" }}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredWorkers.map((item, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell sx={{ borderBottom: "none", py: 2 }}>{index + 1}</TableCell>
                                        <TableCell sx={{ borderBottom: "none" }}>{item.name}</TableCell>
                                        <TableCell sx={{ borderBottom: "none" }}>{item.experties}</TableCell>
                                        <TableCell sx={{ borderBottom: "none" }}>{item.contact}</TableCell>
                                        <TableCell sx={{ borderBottom: "none" }}>{item.address}</TableCell>
                                        <TableCell
                                            sx={{
                                                borderBottom: "none",
                                                color: item.status === "Active" ? "#34C759" : "#FF383C",
                                                fontWeight: 400,
                                                fontSize: "16px",
                                            }}
                                        >
                                            {item.status}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                gap: 1,
                                                borderBottom: "none",
                                            }}
                                        >
                                            <IconButton
                                                size="small"
                                                onClick={() =>
                                                    navigate(`/admin/workermanagement/workerview/${item._id}`)}
                                                
                                            >
                                                <ViewIcon />
                                            </IconButton>

                                            <IconButton
                                                size="small"
                                                onClick={() => navigate(`/admin/workermanagement/workeredit/${item._id}`)}
                                            >
                                                <EditIcon />
                                            </IconButton>


                                            <IconButton size="small">
                                                <DeleteIcon />
                                            </IconButton>
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
