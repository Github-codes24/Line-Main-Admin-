import React, {useEffect, useState} from "react";
import {Eye, Search} from "lucide-react";
import {useNavigate} from "react-router-dom";
import usePayment from "../../../hook/payment/usePayment";

const PaymentList = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);
    const recordsPerPage = 5;
    const {searchPayment, fetchPayment} = usePayment();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState("");
    const [limit, setLimit] = useState("");
    console.log("payment", searchPayment);
    useEffect(() => {
        fetchPayment(search, page, limit);
    }, [search, page, limit]);

    const filteredData = searchPayment.filter((item) => item.bookingId?.toLowerCase().includes(search.toLowerCase()));

    const totalPages = Math.ceil(filteredData.length / recordsPerPage) || 1;
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
    const goToPage = (pg) => {
        if (pg >= 1 && pg <= totalPages) setCurrentPage(pg);
    };

    return (
        <div>
            {/* Header + Search */}
            <div className="bg-gray-100 p-3 rounded-lg shadow">
                <div className="flex items-center justify-between flex-wrap gap-4 w-full">
                    <h2 className="text-xl font-semibold">Payment List</h2>

                    <div className="flex-1 flex justify-center">
                        <div className="relative w-full max-w-md">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder="Search by Transaction Id..."
                                className="w-full rounded-full border border-blue-500 px-4 py-2 pl-10 focus:outline-none focus:ring focus:border-blue-300"
                            />
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-gray-100 p-6 rounded-lg shadow mt-6">
                <div className="overflow-x-auto border border-black rounded-lg">
                    <table className="min-w-full text-sm border-collapse mb-20">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="px-4 py-6">Sr.No.</th>
                                <th className="px-4 py-6">Transaction ID</th>
                                <th className="px-4 py-6">User ID</th>
                                <th className="px-4 py-6">Order ID</th>
                                <th className="px-4 py-6">Receipt</th>
                                <th className="px-4 py-6">Amount</th>
                                <th className="px-4 py-6">Currency</th>
                                <th className="px-4 py-6">Status</th>
                                <th className="px-4 py-6">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.map((item, index) => (
                                <tr key={item._id}>
                                    <td className="text-center px-2 py-5">{indexOfFirstRecord + index + 1}</td>
                                    <td className="text-center px-2 py-5">{item.bookingId}</td>
                                    <td className="text-center px-2 py-5">{item.userId}</td>
                                    <td className="text-center px-2 py-5">{item.orderId}</td>
                                    <td className="text-center px-2 py-5">{item.receipt}</td>
                                    <td
                                        className={`text-center px-2 py-5 font-semibold ${
                                            item.amount < 0 ? "text-red-500" : "text-green-600"
                                        }`}
                                    >
                                        {item.amount < 0 ? `-₹${Math.abs(item.amount)}` : `+₹${item.amount}`}
                                    </td>
                                    <td className="text-center px-2 py-5">{item.currency}</td>
                                    <td className="text-center px-2 py-5">{item.status}</td>
                                    <td
                                        className="text-center px-10 py-5 text-red-500 cursor-pointer"
                                        onClick={() => navigate(`/admin/payment/details/${item._id}`)}
                                    >
                                        <Eye size={18} />
                                    </td>
                                </tr>
                            ))}
                            {currentRecords.length === 0 && (
                                <tr>
                                    <td colSpan="9" className="text-center py-5 text-gray-500">
                                        No results found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col md:flex-row items-center justify-between bg-gray-200 mt-5 rounded-lg shadow text-sm text-gray-700 gap-4 py-4 px-6">
                    <p className="font-bold text-black">
                        Showing {filteredData.length > 0 ? indexOfFirstRecord + 1 : 0} to{" "}
                        {Math.min(indexOfLastRecord, filteredData.length)} of {filteredData.length} Entries
                    </p>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-2 py-1 bg-white text-green-600 border border-green-300 rounded-md hover:bg-green-50 disabled:opacity-50"
                        >
                            &lt;
                        </button>
                        {Array.from({length: totalPages}, (_, i) => i + 1).map((pg) => (
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
            </div>
        </div>
    );
};

export default PaymentList;
