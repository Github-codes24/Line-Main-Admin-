import React from "react";
import {Eye, Search} from "lucide-react";
import {useNavigate} from "react-router-dom";

const PaymentList = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);
    const recordsPerPage = 5;

    const data = [
        {
            id: 1,
            transactionId: "TRN64486644FHD6",
            orderId: "OD54845478",
            amount: -5894,
            mode: "Online",
            remarks: "Amount Refunded To Worker’s Wallet",
        },
        {
            id: 2,
            transactionId: "TRN64486644FHD6",
            orderId: "OD54845478",
            amount: 5894,
            mode: "Wallet",
            remarks: "Amount Deducted From Worker’s Wallet",
        },
        {
            id: 3,
            transactionId: "TRN64486644FHD6",
            orderId: "OD54845478",
            amount: -5894,
            mode: "Online",
            remarks: "Amount Refunded To Customer Account",
        },
        {
            id: 4,
            transactionId: "TRN64486644FHD6",
            orderId: "OD54845478",
            amount: 225894,
            mode: "Online",
            remarks: "Payment Received From Customer",
        },
        {
            id: 5,
            transactionId: "TRN64486644FHD6",
            orderId: "OD54845478",
            amount: 5894,
            mode: "Online",
            remarks: "Payment Received From Customer",
        },
        {
            id: 6,
            transactionId: "TRN7766558899",
            orderId: "OD99887766",
            amount: 12000,
            mode: "Wallet",
            remarks: "Payment Added To Worker’s Wallet",
        },
        {
            id: 7,
            transactionId: "TRN1122334455",
            orderId: "OD11223344",
            amount: -2500,
            mode: "Online",
            remarks: "Refund to Customer",
        },
    ];

    const filteredData = data.filter((item) => item.transactionId.toLowerCase().includes(searchText.toLowerCase()));

    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

    const goToPage = (pg) => {
        if (pg >= 1 && pg <= totalPages) setCurrentPage(pg);
    };

    return (
        <div className="">
            <div className="bg-gray-100 p-3 rounded-lg shadow">
                <div className="flex items-center justify-between flex-wrap gap-4 w-full">
                    <h2 className="text-xl font-semibold">Payment List</h2>

                    <div className="flex-1 flex justify-center">
                        <div className="relative w-full max-w-md">
                            <input
                                type="text"
                                value={searchText}
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder="Search by Transaction Id..."
                                className="w-full rounded-full border border-green-500 px-4 py-2 pl-10 focus:outline-none focus:ring focus:border-blue-300"
                            />
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 #0D2E28" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow mt-6">
                <div className="overflow-x-auto border border-black rounded-lg">
                    <table className="min-w-full text-sm border-collapse mb-20">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="px-4 py-6">Sr.No.</th>
                                <th className="px-4 py-6">Transaction ID</th>
                                <th className="px-4 py-6">Order ID</th>
                                <th className="px-4 py-6">Amount</th>
                                <th className="px-4 py-6">Transaction Mode</th>
                                <th className="px-4 py-6">Remarks</th>
                                <th className="px-4 py-6">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="text-center px-2 py-5">{indexOfFirstRecord + index + 1}</td>
                                    <td className="text-center px-2 py-5">{item.transactionId}</td>
                                    <td className="text-center px-2 py-5">{item.orderId}</td>
                                    <td
                                        className={`text-center px-2 py-5 font-semibold ${
                                            item.amount < 0 ? "text-red-500" : "text-green-600"
                                        }`}
                                    >
                                        {item.amount < 0 ? `-₹${Math.abs(item.amount)}` : `+₹${item.amount}`}
                                    </td>
                                    <td className="text-center px-2 py-5">{item.mode}</td>
                                    <td className="text-center px-2 py-5">{item.remarks}</td>
                                    <td
                                        className="text-center px-10 py-5 text-red-500 cursor-pointer"
                                        onClick={() =>
                                            navigate(`/admin/payment/details/${item.id}`, {
                                                state: {payment: item},
                                            })
                                        }
                                    >
                                        <Eye size={18} />
                                    </td>
                                </tr>
                            ))}
                            {currentRecords.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="text-center py-5 text-gray-500">
                                        No results found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between bg-gray-200 mt-5 rounded-lg shadow text-sm text-gray-700 gap-4 py-4 px-6">
                    <p className="font-bold text-black">
                        Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredData.length)} of{" "}
                        {filteredData.length} Entries
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
