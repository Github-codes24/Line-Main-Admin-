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

    const [searchTerm, setSearchTerm] = useState("");
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch all customers when component mounts
    useEffect(() => {
        fetchAllCustomers();
    }, []);

    const deleteCustomer = async (customerId) => {
        if (!window.confirm('Are you sure you want to delete this customer?')) {
            return;
        }

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
        } catch (error) {
            console.error('Delete error:', error);
            toast.error(error.response?.data?.message || error.message || 'Error deleting customer');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAllCustomers = async () => {
        try {
            setIsLoading(true);

            const result = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/admin/customer/get-all-customer`,
            });

            if (result.success) {
                // Simple data extraction - we know it's result.users based on previous logs
                const customerData = result.users || [];

                // Normalize customer data
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
                toast.error(result.message || 'Failed to fetch customers');
                setCustomers([]);
            }
        } catch (error) {
            console.error('Error fetching customers:', error);
            toast.error(error.response?.data?.message || error.message || 'Error fetching customers');
            setCustomers([]);
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

    return (
        <div className="p-8 bg-[#E0E9E9]">
            <ToastContainer />

            <div className="bg-white p-1 shadow-md mb-4 rounded-md relative flex justify-between items-center min-h-[48px]">
                <h1 className="text-xl font-semibold ml-2">Customer List</h1>

                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-full p-1 px-4 w-64 text-sm "
                    />
                </div>

                {/* Right side - Button */}
                <Button
                    className="px-4 py-2  text-white rounded hover:bg-blue-800"
                    onClick={() => navigate("/admin/customermanagement/add")}
                >
                    Add Customer
                </Button>
            </div>

            {/* Main Content Box */}
            <div className="bg-white p-4 shadow rounded-md">
                {/* Table Data Box */}
                <div className="">
                    <div className="overflow-x-auto bg-white shadow-md rounded-lg min-h-[600px] border border-gray-400">
                        <table className="w-full text-sm text-left text-gray-700  ">
                            <thead className="bg-[#e6efef] text-black text-base font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Sr.No.</th>
                                    <th className="px-6 py-4">Customer Name</th>
                                    <th className="px-6 py-4">Email ID/Phone Number</th>
                                    <th className="px-6 py-4">Address</th>
                                    <th className="px-6 py-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center">
                                            <div className="text-lg">Loading customers...</div>
                                        </td>
                                    </tr>
                                ) : filteredCustomers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center">
                                            <div className="text-lg text-gray-500">No customers found</div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCustomers.map((customer, index) => (
                                        <tr key={customer.id || customer._id} className="">
                                            <td className="px-6 py-4">{index + 1}</td>
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
                                                    <button className="text-[#F15A29] hover:text-orange-700">
                                                        <svg
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            onClick={() => navigate(`/admin/customermanagement/edit/${customer.id || customer._id}`)}
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
                    </div>
                </div>

                {/* Pagination Box */}
                <div className="p-4 ">
                    <div className="flex justify-between items-center text-sm text-black">
                        <span>Showing 1 to {filteredCustomers.length} of {customers.length} entries</span>
                        <div>
                            <button className="px-3 py-1 border border-gray-300 rounded mr-2">Previous</button>
                            <button className="px-3 py-1 border border-gray-300 rounded">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerList;
