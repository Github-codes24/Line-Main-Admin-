import React, {useState, useMemo} from "react";
import {Eye, Pencil, Trash2} from "lucide-react";
import {useNavigate} from "react-router-dom";

const tabs = [
    {id: 1, name: "Plumbing", subTabs: "Plumber, Tank Cleaner"},
    {id: 2, name: "Electrician", subTabs: "NA"},
    {id: 3, name: "Tiles Fitting", subTabs: "NA"},
    {id: 4, name: "Painting", subTabs: "Painter, POP Person"},
    {id: 5, name: "AC & Refrigerator Repairing", subTabs: "NA"},
    {id: 6, name: "Carpentry", subTabs: "NA"},
    {id: 7, name: "Masonry", subTabs: "NA"},
    {id: 8, name: "Gardening", subTabs: "NA"},
    {id: 9, name: "Cleaning", subTabs: "NA"},
    {id: 10, name: "Housekeeping", subTabs: "NA"},
];

const TabList = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleEdit = (id) => navigate(`/admin/tabmanagement/edit/${id}`);
    const handleView = (id) => navigate(`/admin/tabmanagement/view/${id}`);
    const handleAdd = () => navigate("/admin/tabmanagement/add");

    const filteredData = useMemo(() => {
        return tabs.filter(
            (tab) =>
                tab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tab.subTabs.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage]);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="flex bg-[#E0E9E9] font-medium min-h-screen h-full font-[Poppins]">
            <div className="flex-1 p-2 gap-2">
                <div className="flex justify-between items-center mb-4 shadow bg-white h-70 border rounded-lg p-2">
                    <h1 className="text-xl font-semibold ml-2">Tab List</h1>
                    <div className="relative w-full max-w-sm flex-grow md:flex-grow-0">
                        <input
                            type="text"
                            placeholder="Search by Tab Name, Sub Tab Name..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-10 pr-4 bg-[#E4E5EB] text-[#001580] font-medium placeholder-[#001580] py-1 border-2 border-[#001580] rounded-full focus:outline-none"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#001580]"
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

                    <button onClick={handleAdd} className="w-[200px] bg-[#001580] text-white px-6 rounded-lg h-10 mr-2">
                        + Add New Tab
                    </button>
                </div>

                <div className="bg-white p-4 rounded-lg shadow mb-4">
                    <div className="border border-[#616666] rounded-lg shadow-sm h-screen overflow-x-auto">
                        <table className="w-full text-left bg-white p-4">
                            <thead>
                                <tr className="bg-[#E4E5EB] text-center text-[#001580] font-medium">
                                    <th className="p-3">Sr.No.</th>
                                    <th className="p-3">Tab Name</th>
                                    <th className="p-3">Sub Tabs</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((tab, index) => (
                                        <tr key={tab.id} className="h-20 text-center">
                                            <td className="p-2 ">{(currentPage - 1) * itemsPerPage + (index + 1)}</td>
                                            <td className="p-2 ">{tab.name}</td>
                                            <td className="p-2">{tab.subTabs}</td>
                                            <td className="p-2 space-x-2 flex justify-center">
                                                <Eye
                                                    onClick={() => handleView(tab.id)}
                                                    className="w-5 h-5 cursor-pointer text-red-600"
                                                />
                                                <button onClick={() => handleEdit(tab.id)}>
                                                    <Pencil className="w-5 h-5 text-red-600" />
                                                </button>
                                                <Trash2 className="w-5 h-5 cursor-pointer text-red-600" />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center p-4">
                                            No results found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {filteredData.length > itemsPerPage && (
                        <div className="flex justify-between items-center mt-4 bg-[#F5F5F5] rounded-lg py-2 px-4">
                            <span className="text-sm font-semibold">
                                Showing {paginatedData.length} of {filteredData.length} Entries
                            </span>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handlePrev}
                                    disabled={currentPage === 1}
                                    className={`w-8 h-8 flex items-center justify-center rounded-xl ${
                                        currentPage === 1 ? "bg-gray-200 text-[#001580]" : "bg-white hover:bg-gray-100"
                                    }`}
                                >
                                    &lt;
                                </button>

                                {[...Array(totalPages)].map((_, i) => {
                                    const page = i + 1;
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-8 h-8 flex items-center justify-center rounded-xl font-semibold ${
                                                page === currentPage
                                                    ? "bg-[#001580] text-white"
                                                    : "bg-[#CECEF2] text-[#001580] hover:bg-[#CECEF2]"
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                    className={`w-8 h-8 flex items-center justify-center rounded-xl ${
                                        currentPage === totalPages
                                            ? "bg-gray-200 text-[#001580]"
                                            : "bg-white hover:bg-gray-100"
                                    }`}
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TabList;
