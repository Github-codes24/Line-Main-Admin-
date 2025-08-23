import React, {useState} from "react";
import {Eye} from "lucide-react";
import {Button} from "../../../components/ui/button";
import {Popover, Checkbox, FormGroup, FormControlLabel, Box} from "@mui/material";

const orderData = [
    {
        id: 1,
        orderId: "ORD84681",
        customer: "Freida Varnes",
        service: "Electrician",
        status: "Pending",
    },
    {
        id: 2,
        orderId: "ORD846812",
        customer: "Hannah Burress",
        service: "Plumber",
        status: "Work In Progress",
    },
    {
        id: 3,
        orderId: "ORD846813",
        customer: "Leatrice Handler",
        service: "Tiler",
        status: "Work In Progress",
    },
    {
        id: 4,
        orderId: "ORD846814",
        customer: "Krishna Barbe",
        service: "Painter",
        status: "Completed",
    },
    {
        id: 5,
        orderId: "ORD846815",
        customer: "Marx Hershey",
        service: "AC & Refrigerator Mechanic",
        status: "Rejected",
    },
];

const statusColor = {
    Pending: "text-yellow-500",
    "Work In Progress": "text-blue-500",
    Completed: "text-green-500",
    Rejected: "text-red-500",
};

export default function ListOrder() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilters, setActiveFilters] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    const allServices = ["Electrician", "Plumber", "Painter", "Tiler", "AC & Refrigerator Mechanic"];

    // Search
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Popover open/close
    const handleFilterClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setAnchorEl(null);
    };

    // Checkbox toggle
    const handleCheckboxChange = (service) => {
        setActiveFilters((prev) => (prev.includes(service) ? prev.filter((f) => f !== service) : [...prev, service]));
    };

    // Reset
    const resetFilters = () => {
        setActiveFilters([]);
        setSearchTerm("");
    };

    // Filtering logic
    const filteredData = orderData.filter((order) => {
        const matchesSearch =
            searchTerm.trim() === "" ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.orderId.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = activeFilters.length === 0 || activeFilters.includes(order.service);

        return matchesSearch && matchesFilter;
    });

    const open = Boolean(anchorEl);

    return (
        <div className="p-2">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold">Order List</h2>

                {/* Search Bar */}
                <div className="relative w-full max-w-md mx-6">
                    <input
                        type="text"
                        placeholder="Search by Order ID or Customer..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full pl-10 placeholder-black text-black pr-4 py-1 border rounded-full outline-none"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                        />
                    </svg>
                </div>

                {/* Filter Icon */}
                <button onClick={handleFilterClick} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="black">
                        <path
                            d="M4 6h16M6 12h12M10 18h4"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                {/* Popover */}
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
                        <strong>Filter by Service</strong>
                        <FormGroup>
                            {allServices.map((service) => (
                                <FormControlLabel
                                    key={service}
                                    control={
                                        <Checkbox
                                            checked={activeFilters.includes(service)}
                                            onChange={() => handleCheckboxChange(service)}
                                        />
                                    }
                                    label={service}
                                />
                            ))}
                        </FormGroup>
                    </Box>
                </Popover>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {activeFilters.map((filter) => (
                    <span key={filter} className="px-3 py-1 bg-gray-200 rounded-full flex items-center gap-1">
                        {filter}
                        <button onClick={() => setActiveFilters((prev) => prev.filter((f) => f !== filter))}>✕</button>
                    </span>
                ))}

                <Button onClick={resetFilters} className="ml-auto border border-teal-600 text-teal-800 bg-white">
                    Reset Filter
                </Button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3">Sr.No.</th>
                            <th className="p-3">Order Id.</th>
                            <th className="p-3">Customer Name</th>
                            <th className="p-3">Service Booked</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((order, idx) => (
                            <tr key={order.id} className="border-t">
                                <td className="p-3">{idx + 1}</td>
                                <td className="p-3">{order.orderId}</td>
                                <td className="p-3">{order.customer}</td>
                                <td className="p-3">{order.service}</td>
                                <td className={`p-3 font-medium ${statusColor[order.status]}`}>{order.status}</td>
                                <td className="p-3">
                                    <button>
                                        <Eye className="text-red-600" size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex justify-between items-center mt-4">
                <span className="text-sm">
                    Showing {filteredData.length} of {orderData.length} Entries
                </span>
                <div className="space-x-1">
                    {[1, 2, 3].map((page) => (
                        <button
                            key={page}
                            className={`px-2 py-1 rounded-full ${
                                page === 1 ? "bg-teal-600 text-white" : "bg-gray-100"
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
