// CustomerList.jsx
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const CustomerList = () => {
    const navigate = useNavigate();
    const [fetchData] = useFetch();

    const [currentPage, setCurrentPage] = useState(1);
const recordsPerPage = 5; // you can adjust number of records per page

    const [searchTerm, setSearchTerm] = useState("");
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(""); // Added error state

    // Fetch all customers when component mounts
    useEffect(() => {
        fetchAllCustomers();
    }, []);

    const fetchAllCustomers = async () => {
        try {
            setError(""); // Reset error
            setIsLoading(true);

            const result = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/admin/customer/get-all-customer`,
            });

            if (result.success) {
                const customerData = result.users || [];

                const normalizedCustomers = customerData.map(customer => ({
                    ...customer,
                    name: customer.name || customer.customerName || customer.fullName || 'Unknown',
                    contact: customer.contact || customer.phone || customer.email || 'N/A',
                    address: customer.address || customer.location || 'N/A',
                    id: customer.id || customer._id
                })).filter(customer => customer.name !== 'Unknown');

                setCustomers(normalizedCustomers);

                if (normalizedCustomers.length === 0) {
                    toast.info('No customers found');
                }
            } else {
                setError(result.message || 'Failed to fetch customers');
                setCustomers([]);
            }
        } catch (err) {
            console.error('Error fetching customers:', err);
            setError(err.response?.data?.message || err.message || 'Error fetching customers');
            setCustomers([]);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteCustomer = async (customerId) => {
        if (!window.confirm('Are you sure you want to delete this customer?')) return;

        try {
            setIsLoading(true);

            const result = await fetchData({
                method: "DELETE",
                url: `${conf.apiBaseUrl}/admin/Customer/delete-customer/${customerId}`,
            });

            if (result.success) {
                toast.success(result.message || 'Customer deleted successfully');
                fetchAllCustomers(); // Refresh list
            } else {
                toast.error(result.message || 'Failed to delete customer');
            }
        } catch (err) {
            console.error('Delete error:', err);
            toast.error(err.response?.data?.message || err.message || 'Error deleting customer');
        } finally {
            setIsLoading(false);
        }
    };

   const filteredCustomers = customers.filter((customer) => {
    if (!customer || !customer.name) return false;

    const searchLower = searchTerm.toLowerCase();
    return (
        customer.name.toLowerCase().includes(searchLower) ||
        (customer.contact && customer.contact.toLowerCase().includes(searchLower)) ||
        (customer.address && customer.address.toLowerCase().includes(searchLower))
    );
});

const totalPages = Math.ceil(filteredCustomers.length / recordsPerPage);
const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
const currentRecords = filteredCustomers.slice(indexOfFirstRecord, indexOfLastRecord);

const goToPage = (pg) => {
    if (pg >= 1 && pg <= totalPages) setCurrentPage(pg);
};


    return (
        <div className="p-8 bg-[#E0E9E9]">
            <ToastContainer />
<div className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-white px-4 py-3 rounded-lg shadow">
    {/* Heading */}
    <h2 className="text-xl font-medium">Customer List</h2>

    {/* Search Input */}
    <div className="relative w-full max-w-xs flex-grow md:flex-grow-0">
        <input
            type="text"
            placeholder="Search by Name, Phone Number, Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 bg-[#E4E5EB] text-[#0D2E28] font-medium placeholder-[#0D2E28] py-2 border-2 border-[#001580] rounded-full focus:outline-none"
            style={{ fontFamily: 'Poppins, sans-serif' }}
        />
        {/* Search Icon */}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#0D2E28]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
        </svg>
    </div>

    {/* Add Customer Button */}
    <button
        onClick={() => navigate("/admin/customermanagement/add")}
        className="w-[200px] bg-[#001580] text-white font-medium px-4 py-2 rounded-lg"
    >
        + Add New Customer
    </button>
</div>


            {/* Main Content Box */}
            <div className="bg-white p-4 shadow rounded-md">
                <div className="overflow-x-auto bg-white shadow-md rounded-lg min-h-[600px] border border-gray-400">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-[400px]">
                            <div className="text-lg">Loading customers...</div>
                        </div>
                    ) : error ? (
                        <div className="flex justify-center items-center h-[400px]">
                            <div className="text-lg text-red-500">{error}</div>
                        </div>
                    ) : (
                        <table className="w-full text-sm text-left text-gray-700">
                            <thead className="bg-[#E4E5EB] text-black text-base font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Sr.No.</th>
                                    <th className="px-6 py-4">Customer Name</th>
                                    <th className="px-6 py-4">Email ID/Phone Number</th>
                                    <th className="px-6 py-4">Address</th>
                                    <th className="px-6 py-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center">
                                            <div className="text-lg text-gray-500">No customers found</div>
                                        </td>
                                    </tr>
                                ) : (
                                   currentRecords.map((customer, index) => (
                                      <tr key={customer.id || customer._id}>
                                             <td className="px-6 py-4">{indexOfFirstRecord + index + 1}</td>
                                            <td className="px-6 py-4">{customer.name}</td>
                                            <td className="px-6 py-4">{customer.contact}</td>
                                              <td className="px-6 py-4">{customer.address}</td>
                                              <td className="px-6 py-4">
                                                <div className="flex justify-center space-x-4">
                                                    <button
                                                        onClick={() => navigate(`/admin/customermanagement/view/${customer.id || customer._id}`)}
                                                        className="text-[#F15A29] hover:text-orange-700"
                                                    >
                                                        <Eye size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => navigate(`/admin/customermanagement/edit/${customer.id || customer._id}`)}
                                                        className="text-[#F15A29] hover:text-orange-700"
                                                    >
                                                        <svg
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                                                                stroke="#EC2D01"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z"
                                                                stroke="#EC2D01"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => deleteCustomer(customer.id || customer._id)}
                                                        className="text-[#F15A29] hover:text-orange-700"
                                                        disabled={isLoading}
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Pagination Box */} 
              <div className="flex flex-col md:flex-row items-center justify-between bg-gray-200 mt-5 rounded-lg shadow text-sm text-gray-700 gap-4 py-4 px-6">
    <p className="font-bold text-black">
        Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredCustomers.length)} of {filteredCustomers.length} entries
    </p>
    <div className="flex items-center space-x-2">
        <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 bg-white text-black border border-gray-300 rounded-md disabled:opacity-50"
        >
            &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
            <button
                key={pg}
                onClick={() => goToPage(pg)}
                className={`w-8 h-8 border text-sm font-medium rounded-md transition ${
                    pg === currentPage ? "bg-[#001580] text-white" : "bg-white text-black hover:bg-gray-100"
                }`}
            >
                {pg}
            </button>
        ))}
        <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 bg-white text-black border border-gray-300 rounded-md disabled:opacity-50"
        >
            &gt;
        </button>
    </div>
</div>

              
            </div>
        </div>
    );
};

export default CustomerList;
