import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, Trash2, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const TabList = () => {
    const navigate = useNavigate();
    const [fetchData] = useFetch();

    const [searchTerm, setSearchTerm] = useState("");
    const [tabs, setTabs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    



    // Fetch all tabs when component mounts or search term changes
    useEffect(() => {
        fetchAllTabs();
    }, []);

    // Debounced search effect - reset to page 1 when searching
    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            if (currentPage !== 1) {
                setCurrentPage(1);
            } else {
                fetchAllTabs();
            }
        }, 500); // 500ms delay for debouncing

        return () => clearTimeout(delayedSearch);
    }, [searchTerm]);

    // Fetch tabs when page changes
    useEffect(() => {
        fetchAllTabs();
    }, [currentPage, itemsPerPage]);

    const fetchAllTabs = async () => {
        try {
            setIsLoading(true);

            // Build URL with pagination and search parameters
            let url = `${conf.apiBaseUrl}/admin/tabs?page=${currentPage}&limit=${itemsPerPage}`;
            if (searchTerm.trim()) {
                url += `&search=${encodeURIComponent(searchTerm.trim())}`;
            }

            const result = await fetchData({
                method: "GET",
                url: url,
            });



            if (result.success || result.data) {
                // Extract tabs data from response
                const tabsData = result.data || result.tabs || [];

                // Extract pagination info
                const pagination = result.pagination || {};
                setTotalPages(pagination.totalPages || Math.ceil((result.total || tabsData.length) / itemsPerPage));
                setTotalItems(pagination.total || result.total || tabsData.length);

                // Normalize tab data
                const normalizedTabs = tabsData.map(tab => ({
                    ...tab,
                    id: tab.id || tab._id,
                    name: tab.tabName || tab.name,
                    subTabs: (tab.subTabNames || tab.subTabs || []).map(subTab => {
                        // Handle different sub-tab structures
                        if (typeof subTab === 'string') {
                            return { name: subTab };
                        } else if (typeof subTab === 'object' && subTab !== null) {
                            return {
                                id: subTab._id || subTab.id,
                                name: subTab.tabName || subTab.name || subTab
                            };
                        }
                        return { name: subTab };
                    }),
                    isActive: tab.isActive !== undefined ? tab.isActive : true,
                    createdAt: tab.createdAt
                }));

                setTabs(normalizedTabs);

                if (normalizedTabs.length === 0) {
                    toast.info('No tabs found');
                }
            } else {
                toast.error(result.message || 'Failed to fetch tabs');
                setTabs([]);
            }
        } catch (error) {
            console.error('Error fetching tabs:', error);
            toast.error(error.response?.data?.message || error.message || 'Error fetching tabs');
            setTabs([]);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteTab = async (tabId, tabName) => {
        // Predefined tabs that cannot be deleted (same as edit restrictions)
        const nonDeletableTabs = [
            "Plumbing", 
            "Painting", 
            "Electrician", 
            "TilesFitting", 
            "AC & Refrigerator"
        ];

        // Check if tab is deletable
        if (nonDeletableTabs.includes(tabName)) {
            toast.error(`Deletion of "${tabName}" tab is not allowed as per system requirements.`);
            return;
        }

        if (!window.confirm(`Are you sure you want to delete "${tabName}"? This action cannot be undone.`)) {
            return;
        }

        try {
            setIsLoading(true);

            const result = await fetchData({
                method: "DELETE",
                url: `${conf.apiBaseUrl}/admin/tabs/${tabId}`,
            });

            console.log('Delete tab result:', result);

            if (result.success || result.status === 'success') {
                toast.success(result.message || 'Tab deleted successfully');
                fetchAllTabs(); // Refresh list
            } else {
                toast.error(result.message || 'Failed to delete tab');
            }
        } catch (error) {
            console.error('Delete error:', error);
            let errorMessage = 'Error deleting tab';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (error.message) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Since we're doing server-side search, we don't need client-side filtering
    const filteredTabs = tabs;

    return (
        <div className="p-8 bg-[#E0E9E9]">
            <ToastContainer />

            <div className="bg-white p-1 shadow-md mb-4 rounded-md relative flex justify-between items-center min-h-[48px]">
                <h1 className="text-xl font-semibold ml-2">Tab List</h1>

                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <input
                        type="text"
                        placeholder="Search by Tab Name, Sub Tab Name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 bg-[#E4E5EB] rounded-full p-1 px-4 w-64 text-sm"
                    />
                </div>

                <button
                    className="px-2 py-2 bg-[#001580] text-white rounded"
                    onClick={() => navigate("/admin/tabmanagement/add")}
                >
                    + Add New Tab
                </button>
            </div>

            {/* Main Content Box */}
            <div className="bg-white p-4 shadow rounded-md">
                <div className="overflow-x-auto bg-white shadow-md rounded-lg min-h-[600px] border border-gray-400">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="bg-[#E4E5EB] text-black text-base font-semibold">
                            <tr>
                                <th className="px-6 py-4">Sr.No.</th>
                                <th className="px-6 py-4">Tab Name</th>
                                <th className="px-6 py-4">Sub Tabs</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Created Date</th>
                                <th className="px-6 py-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center">
                                        <div className="text-lg">Loading tabs...</div>
                                    </td>
                                </tr>
                            ) : filteredTabs.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center">
                                        <div className="text-lg text-gray-500">
                                            {searchTerm ? `No tabs found matching "${searchTerm}"` : 'No tabs available'}
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredTabs.map((tab, index) => (
                                    <tr key={tab.id} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {tab.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {tab.subTabs && tab.subTabs.length > 0 ? (
                                                    tab.subTabs.map((subTab, subIndex) => (
                                                        <span
                                                            key={subTab.id || subIndex}
                                                            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                                        >
                                                            {subTab.name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-500 text-sm">No sub tabs</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${tab.isActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {tab.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {tab.createdAt ? new Date(tab.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    onClick={() => navigate(`/admin/tabmanagement/view/${tab.id}`, {
                                                        state: { tab }
                                                    })}
                                                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                                                    title="View Tab"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/admin/tabmanagement/edit/${tab.id}`, {
                                                        state: { tab }
                                                    })}
                                                    className="p-2 text-green-600 hover:bg-green-100 rounded-full"
                                                    title="Edit Tab"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => deleteTab(tab.id, tab.name)}
                                                    className={`p-2 rounded-full ${
                                                        ["Plumbing", "Painting", "Electrician", "TilesFitting", "AC & Refrigerator"].includes(tab.name)
                                                            ? "text-gray-400 cursor-not-allowed"
                                                            : "text-red-600 hover:bg-red-100"
                                                    }`}
                                                    title={
                                                        ["Plumbing", "Painting", "Electrician", "TilesFitting", "AC & Refrigerator"].includes(tab.name)
                                                            ? "System tab cannot be deleted"
                                                            : "Delete Tab"
                                                    }
                                                    disabled={isLoading || ["Plumbing", "Painting", "Electrician", "TilesFitting", "AC & Refrigerator"].includes(tab.name)}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-4 px-4">
                        <div className="text-sm text-gray-700">
                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
                        </div>

                        <div className="flex items-center space-x-2">
                            {/* Items per page selector */}
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-700">Show:</span>
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => {
                                        setItemsPerPage(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                                <span className="text-sm text-gray-700">entries</span>
                            </div>

                            {/* Pagination buttons */}
                            <div className="flex items-center space-x-1">
                                <button
                                    onClick={() => setCurrentPage(1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    First
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>

                                {/* Page numbers */}
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`px-3 py-1 text-sm border border-gray-300 rounded ${currentPage === pageNum
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'hover:bg-gray-50'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                                <button
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Last
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TabList;