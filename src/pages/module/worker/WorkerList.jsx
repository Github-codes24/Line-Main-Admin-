import React from "react";
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

import {DeleteIcon, EditIcon, FilterIcon, ViewIcon} from "../../../assets/CommonAssets";
import {useNavigate} from "react-router-dom";

function WorkerList() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = React.useState("");
    const [appliedFilters, setAppliedFilters] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const expertiseOptions = ["Electrician", "Plumber", "Tiler", "Painter", "AC & Refrigerator Mechanic"];

    const workerData = [
        {
            name: "Ravi Kumar",
            expertise: "Electrician",
            contact: "ravi.kumar@gmail.com / +91-9876543210",
            address: "Banjara Hills, Hyderabad, Telangana",
            status: "Active",
        },
        {
            name: "Anjali Mehta",
            expertise: "Plumber",
            contact: "anjali.mehta@yahoo.com / +91-9123456789",
            address: "Sector 22, Noida, Uttar Pradesh",
            status: "Active",
        },
        {
            name: "Sunil Sharma",
            expertise: "Painter",
            contact: "sunil.sharma@outlook.com / +91-9988776655",
            address: "MG Road, Pune, Maharashtra",
            status: "Active",
        },
        {
            name: "Preeti Verma",
            expertise: "Electrician",
            contact: "preeti.verma@gmail.com / +91-8765432109",
            address: "Indiranagar, Bengaluru, Karnataka",
            status: "Active",
        },
        {
            name: "Amit Das",
            expertise: "AC & Refrigerator Mechanic",
            contact: "amit.das@hotmail.com / +91-8899776655",
            address: "Salt Lake, Kolkata, West Bengal",
            status: "Inactive",
        },
    ];

    const handleFilterClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setAnchorEl(null);
    };

    const handleCheckboxChange = (option) => {
        setAppliedFilters((prev) => (prev.includes(option) ? prev.filter((f) => f !== option) : [...prev, option]));
    };

    const handleResetFilters = () => {
        setAppliedFilters([]);
    };

    const open = Boolean(anchorEl);

    // ✅ Combined search + filter logic
    const filteredWorkers = workerData.filter((worker) => {
        const matchesSearch =
            searchText.trim() === "" ||
            worker.name.toLowerCase().includes(searchText.toLowerCase()) ||
            worker.expertise.toLowerCase().includes(searchText.toLowerCase()) ||
            worker.contact.toLowerCase().includes(searchText.toLowerCase()) ||
            worker.address.toLowerCase().includes(searchText.toLowerCase()) ||
            worker.status.toLowerCase().includes(searchText.toLowerCase());

        const matchesFilter = appliedFilters.length === 0 || appliedFilters.includes(worker.expertise);

        return matchesSearch && matchesFilter;
    });

    return (
        <Box sx={{width: "100%", minHeight: "auto", display: "flex", flexDirection: "column", gap: "24px"}}>
            <Worker
                title="Worker List"
                searchValue={searchText}
                setSearchValue={setSearchText}
                buttonText="Add New Worker"
                btnpath="/admin/workermanagement/workeradd"
            />
            <Card>
                <CardHeader
                    sx={{paddingX: 3}}
                    title={
                        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: 2}}>
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

                            {/* Applied Filters Display */}
                            <Box sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
                                {appliedFilters.map((filter, index) => (
                                    <Chip
                                        key={index}
                                        label={filter}
                                        size="small"
                                        onDelete={() => setAppliedFilters((prev) => prev.filter((f) => f !== filter))}
                                        sx={{backgroundColor: "#F0F0F0"}}
                                    />
                                ))}
                            </Box>

                            {/* Filter Options Popover */}
                            <Popover
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleFilterClose}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                            >
                                <Box sx={{p: 2, minWidth: 200}}>
                                    <strong>Expertise</strong>
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
                                borderColor: "#007E74",
                                color: "#007E74",
                                background: "#D9F1EB",
                                paddingX: 4,
                                paddingY: "2px",
                                textTransform: "none",
                            }}
                        >
                            Reset Filter
                        </Button>
                    }
                />

                <CardContent sx={{paddingTop: 0}}>
                    <TableContainer
                        component={Paper}
                        elevation={0}
                        sx={{
                            border: "1px solid black",
                            maxHeight: 300,
                            overflowY: "scroll",
                            "&::-webkit-scrollbar": {display: "none"},
                        }}
                    >
                        <Table stickyHeader sx={{borderRadius: 2}}>
                            <TableHead>
                                <TableRow>
                                    {[
                                        "Sr.No.",
                                        "Worker Name",
                                        "Expertise",
                                        "Email ID/Phone Number",
                                        "Address",
                                        "Status",
                                        "Action",
                                    ].map((head, i) => (
                                        <TableCell
                                            key={i}
                                            sx={{fontWeight: 600, textAlign: "center", background: "#E0E9E9"}}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredWorkers.map((item, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell sx={{borderBottom: "none", py: 2}}>{index + 1}</TableCell>
                                        <TableCell sx={{borderBottom: "none"}}>{item.name}</TableCell>
                                        <TableCell sx={{borderBottom: "none"}}>{item.expertise}</TableCell>
                                        <TableCell sx={{borderBottom: "none"}}>{item.contact}</TableCell>
                                        <TableCell sx={{borderBottom: "none"}}>{item.address}</TableCell>
                                        <TableCell
                                            sx={{
                                                borderBottom: "none",
                                                color: item.status === "Active" ? "green" : "red",
                                                fontWeight: 600,
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
                                                    navigate("/admin/workermanagement/workerview", {state: item})
                                                }
                                            >
                                                <ViewIcon />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => navigate("/admin/workermanagement/workeredit")}
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
