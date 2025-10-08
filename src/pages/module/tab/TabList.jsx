import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, Trash2, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";
import Pagination from "../../../components/ui/Pagination";

const TabList = () => {
  const navigate = useNavigate();
  const [fetchData] = useFetch();


  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [tabs, setTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);





  // Fetch all tabs when component mounts
  useEffect(() => {
    fetchAllTabs();
  }, []);

  // Fetch tabs when page changes
  useEffect(() => {
    fetchAllTabs(currentPage);
  }, [currentPage]);

  const fetchAllTabs = async (page = currentPage) => {
    try {
      setIsLoading(true);

      const result = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/admin/tabs?page=${page}&limit=${recordsPerPage}`,
      });

      console.log('Tab API Response:', result);

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

        // Use API pagination data
        if (result.pagination) {
          setTotalRecords(result.pagination.totalCount || result.pagination.totalTabs || 0);
          setTotalPages(result.pagination.totalPages || 1);
          console.log('Tab Pagination:', result.pagination);
        }

        if (normalizedTabs.length === 0) {
          toast.info('No tabs found');
        } else {
          console.log('Fetched tabs:', normalizedTabs.length, 'tabs');
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

    // if (!window.confirm(`Are you sure you want to delete "${tabName}"? This action cannot be undone.`)) {
    //   return;
    // }

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

  // For search, we'll filter client-side for now
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

  // Use API pagination data instead of calculating client-side
  const currentRecords = searchTerm ? filteredTabs : tabs;
  const displayTotalPages = searchTerm ? Math.ceil(filteredTabs.length / recordsPerPage) : totalPages;
  const displayTotalRecords = searchTerm ? filteredTabs.length : totalRecords;
  const indexOfFirstRecord = searchTerm ? 0 : (currentPage - 1) * recordsPerPage;

  const goToPage = (pg) => {
    if (pg >= 1 && pg <= displayTotalPages) {
      setCurrentPage(pg);
      if (!searchTerm) {
        // Only fetch new data if not searching (since search is client-side for now)
        fetchAllTabs(pg);
      }
    }
  };

  return (
    // <div className="p-8 bg-[#E0E9E9]">
    <div className="bg-[#E0E9E9] min-h-screen">
      <ToastContainer />
      {/* Header */}
      <div className="bg-white p-2 shadow-md mb-4 rounded-md flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 relative min-h-[65px]">
        {/* Title on left */}
        <h1 className="text-xl font-semibold ml-2 z-10">Tab List</h1>

        {/* Search Bar */}
        <div className="w-full sm:w-[400px] mx-auto sm:mx-0 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">
          <div className="relative">
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
              placeholder="Search by Tab Name Sub Tab Name...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              // className="w-full h-10 pl-12 pr-4 placeholder:font- placeholder:text-[#0D2E28] rounded-full text-sm border border-[#001580] bg-[#E4E5EB] text-[#0D2E28] focus:outline-none"
              className="w-full h-10 pl-12 pr-4 placeholder:font-bold placeholder:text-[#0D2E28] rounded-full text-sm border border-[#001580] bg-[#E4E5EB] text-[#0D2E28] focus:outline-none"
            />
          </div>
        </div>

        {/* Add Tab Button */}
        <div className="sm:ml-auto sm:mr-2 w-full sm:w-auto flex justify-center sm:justify-end">
          <button
            onClick={() => navigate('/admin/tabmanagement/add')}
            className="flex items-center gap-2 bg-[#001580] text-white px-4 py-2 rounded-md hover:bg-[#001580]/90 transition-colors w-full sm:w-auto justify-center"
          >
            + Add New Tab
          </button>
        </div>
      </div>
      {/* Main Content Box */}
      <div className="bg-white p-4 shadow rounded-md ">
        <div className="overflow-x-auto bg-white shadow-md rounded-lg min-h-[600px] border border-gray-400">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-[#E4E5EB]  text-[#0D2E28] text-base font-semibold">
              <tr>
                <th className=" text-center align-middle text-[#0D2E28] font-poppins font-medium text-[16px] px-6 py-4">Sr.No.</th>
                <th className=" text-center align-middle text-[#0D2E28] font-poppins font-medium text-[16px] px-6 py-4">Tab Name</th>
                <th className="text-center align-middle text-[#0D2E28] font-poppins font-medium text-[16px] px-6 py-4">Sub Tabs</th>
                <th className="text-center align-middle text-[#0D2E28] font-poppins font-medium text-[16px] px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
              <tr>
  <td colSpan="6">
    <div className="flex justify-center items-center h-[200px]">
      <svg
        className="animate-spin h-10 w-10 text-[#001580]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-100"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="60"
          strokeDashoffset="20"
        ></circle>
      </svg>
    </div>
  </td>
</tr>


                
              ) : filteredTabs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-lg text-gray-500">
                    {searchTerm
                      ? `No tabs found matching "${searchTerm}"`
                      : 'No tabs available'}
                  </td>
                </tr>
              ) : (
                currentRecords.map((tab, index) => (
                  <tr key={tab.id || tab._id}>
                    {/* Serial Number */}
                    <td
                      className="text-center align-middle text-[#0D2E28] font-poppins font-normal text-[14px] leading-[100%]"
                      style={{ opacity: 1 }}
                    >
                      {indexOfFirstRecord + index + 1}
                    </td>

                    {/* Tab Name */}
                    <td
                      className="text-center align-middle text-[#0D2E28] font-poppins font-normal text-[14px] leading-[100%]"
                      style={{ opacity: 1 }}
                    >
                      {tab.name}
                    </td>

                    {/* Sub Tabs */}
                    <td
                      className="text-center align-middle text-[#0D2E28] font-poppins font-normal text-[14px] leading-[100%]"
                      style={{ opacity: 1 }}
                    >
                      {tab.subTabs && tab.subTabs.length > 0 ? (
                        tab.subTabs.map((subTab, subIndex) => (
                          <span key={subTab.id || subIndex}>
                            {subTab.name}
                            {subIndex < tab.subTabs.length - 1 ? ', ' : ''}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 text-sm">No sub tabs</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center space-x-4">
                        {/* View Button */}
                        <button
                          onClick={() =>
                            navigate(`/admin/tabmanagement/view/${tab.id}`, { state: { tab } })
                          }
                          className="text-[#F15A29] hover:text-orange-700"
                          title="View Tab"
                        >
                          <Eye size={20} />
                        </button>

                        {/* Edit Button */}
                        <button
                          onClick={() =>
                            navigate(`/admin/tabmanagement/edit/${tab.id}`, { state: { tab } })
                          }
                          className="text-[#F15A29] hover:text-orange-700"
                          title="Edit Tab"
                        >
                          <Edit size={20} />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => {
                            setSelectedWorker(tab);
                            setDeleteModalOpen(true);
                          }}
                          className="text-[#F15A29] hover:text-orange-700"
                          title="Delete Tab"
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

        {/* Delete Confirmation Modal */}
        {deleteModalOpen && selectedWorker && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
              <h2 className="text-xl font-bold text-center text-[#0D2E28] mb-3">
                Delete Tab
              </h2>
              <p className="text-[#0D2E28] text-center mb-6 leading-relaxed">
                Are you sure you want to delete "{selectedWorker.name}"? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-16 py-2 rounded-md border border-[#001580] bg-[#CED4F2] text-[#001580] font-medium hover:opacity-90 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteTab(selectedWorker.id, selectedWorker.name);
                    setDeleteModalOpen(false);
                  }}
                  className="px-16 py-2 rounded-md border border-[#001580] bg-[#001580] text-white font-medium hover:opacity-90 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalRecords={displayTotalRecords}
          recordsPerPage={recordsPerPage}
          goToPage={goToPage}
          label="tabs"
        />

      </div>
    </div>
  );
};

export default TabList;
