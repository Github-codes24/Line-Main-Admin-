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
    const [currentPage, setCurrentPage] = React.useState(1);
const recordsPerPage = 5;


    const expertiseOptions = ["Electrician", "Plumber", "Tiler", "Painter", "AC & Refrigerator Mechanic"];

    const workerData = [
        {
            name: "Ravi Kumar",
            expertise: "Electrician",
            contact: "ravi.kumar@gmail.com / +91-9876543210",
            address: "Banjara Hills, Hyderabad, Telangana",
            status: "Active",
            aadhaarNumber: "123456789101",
            aadhaarImage: "https://via.placeholder.com/200x120?text=Aadhaar+Ravi",
        },
        {
            name: "Anjali Mehta",
            expertise: "Plumber",
            contact: "anjali.mehta@yahoo.com / +91-9123456789",
            address: "Sector 22, Noida, Uttar Pradesh",
            status: "Active",
            aadhaarNumber: "234567891012",
            aadhaarImage: "https://via.placeholder.com/200x120?text=Aadhaar+Anjali",
        },
        {
            name: "Sunil Sharma",
            expertise: "Painter",
            contact: "sunil.sharma@outlook.com / +91-9988776655",
            address: "MG Road, Pune, Maharashtra",
            status: "Active",
            aadhaarNumber: "345678910123",
            aadhaarImage: "https://via.placeholder.com/200x120?text=Aadhaar+Sunil",
        },
        {
            name: "Preeti Verma",
            expertise: "Electrician",
            contact: "preeti.verma@gmail.com / +91-8765432109",
            address: "Indiranagar, Bengaluru, Karnataka",
            status: "Active",
            aadhaarNumber: "456789101234",
            aadhaarImage: "https://via.placeholder.com/200x120?text=Aadhaar+Preeti",
        },
        {
            name: "Amit Das",
            expertise: "AC & Refrigerator Mechanic",
            contact: "amit.das@hotmail.com / +91-8899776655",
            address: "Salt Lake, Kolkata, West Bengal",
            status: "Inactive",
            aadhaarNumber: "567891012345",
            aadhaarImage: "https://via.placeholder.com/200x120?text=Aadhaar+Amit",
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

    // const filteredWorkers = workerData.filter((worker) => {
    //     const matchesSearch =
    //         searchText.trim() === "" ||
    //         worker.name.toLowerCase().includes(searchText.toLowerCase()) ||
    //         worker.expertise.toLowerCase().includes(searchText.toLowerCase()) ||
    //         worker.contact.toLowerCase().includes(searchText.toLowerCase()) ||
    //         worker.address.toLowerCase().includes(searchText.toLowerCase()) ||
    //         worker.status.toLowerCase().includes(searchText.toLowerCase());

    //     const matchesFilter = appliedFilters.length === 0 || appliedFilters.includes(worker.expertise);

    //     return matchesSearch && matchesFilter;
    // });
    // Pagination calculations
// Filtering
const filteredWorkers = workerData.filter((worker) => {
  const matchesSearch =
    searchText.trim() === "" ||
    worker.name.toLowerCase().includes(searchText.toLowerCase()) ||
    worker.expertise.toLowerCase().includes(searchText.toLowerCase()) ||
    worker.contact.toLowerCase().includes(searchText.toLowerCase()) ||
    worker.address.toLowerCase().includes(searchText.toLowerCase()) ||
    worker.status.toLowerCase().includes(searchText.toLowerCase());

  const matchesFilter =
    appliedFilters.length === 0 || appliedFilters.includes(worker.expertise);

  return matchesSearch && matchesFilter;
});

// Pagination calculations
const totalPages = Math.ceil(filteredWorkers.length / recordsPerPage);
const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
const currentRecords = filteredWorkers.slice(indexOfFirstRecord, indexOfLastRecord);

const goToPage = (pg) => {
  if (pg >= 1 && pg <= totalPages) setCurrentPage(pg);
};



    return (
        <Box sx={{width: "100%", minHeight: "auto", display: "flex", flexDirection: "column", gap: "24px"}}>
            <Worker
                title="Worker List"
                searchValue={searchText}
                setSearchValue={setSearchText}
                buttonText="+ Add New Worker"
                btnpath="/admin/workermanagement/add"
            />

            <Card>
                <CardHeader
                    sx={{paddingX: 3}}
                    title={
                        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: 2}}>
                            <Box
                                sx={{
                                    background: "#E4E5EB",
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

                            <Box sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
                                {appliedFilters.map((filter, index) => (
                                    // <Chip
                                    //     key={index}
                                    //     label={filter}
                                    //     size="small"
                                    //     onDelete={() => setAppliedFilters((prev) => prev.filter((f) => f !== filter))}
                                    //     sx={{backgroundColor: "#F0F0F0"}}
                                    // />
                                    <Chip
  key={index}
  label={filter}
  size="small"
  onDelete={() => setAppliedFilters((prev) => prev.filter((f) => f !== filter))}
  sx={{
    backgroundColor: "#E4E5EB",        //  your Figma background
    color: "#0D2E28",                  //  your Figma text color
    "& .MuiChip-deleteIcon": {
      color: "#0D2E28",                //  your Figma delete (X) color
    },
  }}
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
                                borderColor: "#001580",
                                color: "#001580",
                                background: "#CECEF2",
                                paddingX: 4,
                                paddingY: "2px",
                                textTransform: "none",
                                fontWeight: 600,
                                
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
                        {/* <Table stickyHeader sx={{borderRadius: 2}}> */}
                        <Table
  stickyHeader
  sx={{
    borderRadius: 2,
    "& th, & td": {
      textAlign: "center",   // Centers header + body cells
    },
  }}
>
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
                                            sx={{fontWeight: 600, textAlign: "center", background: "#E4E5EB"}}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                               {currentRecords.map((item, index) => (

                                    <TableRow hover key={index}>
                                      <TableCell sx={{borderBottom: "none", py: 2}}>
  {indexOfFirstRecord + index + 1}
</TableCell>

                                        <TableCell sx={{borderBottom: "none"}}>{item.name}</TableCell>
                                        <TableCell sx={{borderBottom: "none"}}>{item.expertise}</TableCell>
                                        <TableCell sx={{borderBottom: "none"}}>{item.contact}</TableCell>
                                        <TableCell sx={{borderBottom: "none"}}>{item.address}</TableCell>
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
                                                    navigate(`/admin/workermanagement/view/${index + 1}`, {state: item})
                                                }
                                            >
                                                <ViewIcon />
                                            </IconButton>

                                            <IconButton
                                                size="small"
                                                onClick={() =>
                                                    navigate(`/admin/workermanagement/edit/${index + 1}`, {state: item})
                                                }
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
                    {/* Pagination Bar */}
<div className="flex flex-col md:flex-row items-center justify-between bg-gray-200 mt-5 rounded-lg shadow text-sm text-gray-700 gap-4 py-4 px-6">
  <p className="font-bold text-black">
    Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredWorkers.length)} of {filteredWorkers.length} Entries
  </p>
  <div className="flex items-center space-x-2">
    <button
      onClick={() => goToPage(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-2 py-1 bg-white text-green-600 border border-green-300 rounded-md hover:bg-green-50 disabled:opacity-50"
    >
      &lt;
    </button>
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
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
    <button
      onClick={() => goToPage(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-2 py-1 bg-white text-green-600 border border-green-300 rounded-md hover:bg-green-50 disabled:opacity-50"
    >
      &gt;
    </button>
  </div>
</div>

                </CardContent>
            </Card>
        </Box>
    );
}

export default WorkerList;
