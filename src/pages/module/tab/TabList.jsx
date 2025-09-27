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
  const recordsPerPage = 5; // Fixed records per page like customer list





  // Fetch all tabs when component mounts
  useEffect(() => {
    fetchAllTabs();
  }, []);

  const fetchAllTabs = async () => {
    try {
      setIsLoading(true);

      const result = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/admin/tabs`,
      });

      if (result.success || result.data) {
        // Extract tabs data from response
        const tabsData = result.data || result.tabs || [];

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

  // Client-side filtering like customer list
  const filteredTabs = tabs.filter((tab) => {
    if (!tab || !tab.name) return false;

    const searchLower = searchTerm.toLowerCase();
    return (
      tab.name.toLowerCase().includes(searchLower) ||
      (tab.subTabs && tab.subTabs.some(subTab =>
        subTab.name && subTab.name.toLowerCase().includes(searchLower)
      ))
    );
  });

  // Pagination calculations like customer list
  const totalPages = Math.ceil(filteredTabs.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredTabs.slice(indexOfFirstRecord, indexOfLastRecord);

  const goToPage = (pg) => {
    if (pg >= 1 && pg <= totalPages) setCurrentPage(pg);
  };

  return (
    <div className="p-8 bg-[#E0E9E9]">
      <ToastContainer />
      {/* Header */}
      <div className="bg-white p-1 shadow-md mb-4 rounded-md relative flex items-center min-h-[65px]">
        {/* Title on left */}
        <h1 className="text-xl font-semibold ml-2 z-10">Tab List</h1>

        {/* Search Bar centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-[400px]">
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.5 13C4.68333 13 3.146 12.3707 1.888 11.112C0.63 9.85333 0.000667196 8.316 5.29101e-07 6.5C-0.000666138 4.684 0.628667 3.14667 1.888 1.888C3.14733 0.629333 4.68467 0 6.5 0C8.31533 0 9.853 0.629333 11.113 1.888C12.373 3.14667 13.002 4.684 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L17.3 15.9C17.4833 16.0833 17.575 16.3167 17.575 16.6C17.575 16.8833 17.4833 17.1167 17.3 17.3C17.1167 17.4833 16.8833 17.575 16.6 17.575C16.3167 17.575 16.0833 17.4833 15.9 17.3L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13ZM6.5 11C7.75 11 8.81267 10.5627 9.688 9.688C10.5633 8.81333 11.0007 7.75067 11 6.5C10.9993 5.24933 10.562 4.187 9.688 3.313C8.814 2.439 7.75133 2.00133 6.5 2C5.24867 1.99867 4.18633 2.43633 3.313 3.313C2.43967 4.18967 2.002 5.252 2 6.5C1.998 7.748 2.43567 8.81067 3.313 9.688C4.19033 10.5653 5.25267 11.0027 6.5 11Z"
                fill="#0D2E28"
              />
            </svg>
          </div>

          {/* Input */}
          <input
            type="text"
            placeholder="Search by Name, Phone Number, Email...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-12 pr-4 placeholder:font-bold placeholder:text-[#0D2E28] rounded-full text-sm border border-[#001580] bg-[#E4E5EB] text-[#0D2E28] focus:outline-none"
          />
        </div>

        {/* Add Worker Button on right */}
        <div className="ml-auto mr-2">
          <button
            onClick={() => navigate('/admin/workermanagement/add')}
            className="flex items-center gap-2 bg-[#001580] text-white px-4 py-2 rounded-md hover:bg-[#001580]/90 transition-colors"
          >
            {/* <Plus size={18} /> */}
            + Add New Tab
          </button>
        </div>
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
                currentRecords.map((tab, index) => (
                  <tr key={tab.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{indexOfFirstRecord + index + 1}</td>
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
                        {/* View Button */}
                        <button
                          onClick={() =>
                            navigate(`/admin/tabmanagement/view/${tab.id}`, { state: { tab } })
                          }
                          className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                          title="View Tab"
                        >
                          <Eye size={16} />
                        </button>

                        {/* Edit Button */}
                        <button
                          onClick={() =>
                            navigate(`/admin/tabmanagement/edit/${tab.id}`, { state: { tab } })
                          }
                          className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                          title="Edit Tab"
                        >
                          <Edit size={16} />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => deleteTab(tab.id, tab.name)}
                          className={`p-2 rounded-full ${["Plumbing", "Painting", "Electrician", "TilesFitting", "AC & Refrigerator"].includes(tab.name)
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-red-600 hover:bg-red-100"
                            }`}
                          title={
                            ["Plumbing", "Painting", "Electrician", "TilesFitting", "AC & Refrigerator"].includes(tab.name)
                              ? "System tab cannot be deleted"
                              : "Delete Tab"
                          }
                          disabled={
                            isLoading ||
                            ["Plumbing", "Painting", "Electrician", "TilesFitting", "AC & Refrigerator"].includes(tab.name)
                          }
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

        {/* Pagination Controls - Same as Customer List */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-200 mt-5 rounded-lg shadow text-sm text-gray-700 gap-4 py-4 px-6">
          <p className="font-bold text-black">
            Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredTabs.length)} of {filteredTabs.length} entries
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
                className={`w-8 h-8 border text-sm font-medium rounded-md transition ${pg === currentPage ? "bg-[#001580] text-white" : "bg-[#CECEF2] text-black "
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

export default TabList;
