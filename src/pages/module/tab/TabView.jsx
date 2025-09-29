import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Edit, ArrowLeft } from "lucide-react";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const TabView = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get tab ID from URL
    const location = useLocation();
    const [fetchData] = useFetch();
    const [isLoading, setIsLoading] = useState(false);
    const [tabData, setTabData] = useState({
        tabName: "",
        subTabNames: [],
        isActive: true,
        isEditable: true,
        createdAt: "",
        updatedAt: ""
    });

    // Check if tab data was passed via navigation state
    const passedTabData = location.state?.tab;

    useEffect(() => {
        if (passedTabData) {
            // Use passed data if available
            setTabData({
                tabName: passedTabData.name || passedTabData.tabName || "",
                subTabNames: passedTabData.subTabs || passedTabData.subTabNames || [],
                isActive: passedTabData.isActive !== undefined ? passedTabData.isActive : true,
                isEditable: passedTabData.isEditable !== undefined ? passedTabData.isEditable : true,
                createdAt: passedTabData.createdAt || "",
                updatedAt: passedTabData.updatedAt || ""
            });
        } else if (id) {
            // Fetch data from API if not passed
            fetchSingleTab(id);
        }
    }, [id, passedTabData]);

    const fetchSingleTab = async (tabId) => {
        try {
            setIsLoading(true);

            const result = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/admin/tabs/${tabId}`,
            });

            console.log('Fetch single tab result:', result);

            if (result.success || result.data) {
                const tab = result.data || result.tab || result;
                setTabData({
                    tabName: tab.tabName || tab.name || "",
                    subTabNames: tab.subTabNames || tab.subTabs || [],
                    isActive: tab.isActive !== undefined ? tab.isActive : true,
                    isEditable: tab.isEditable !== undefined ? tab.isEditable : true,
                    createdAt: tab.createdAt || "",
                    updatedAt: tab.updatedAt || ""
                });
            } else {
                toast.error(result.message || 'Failed to fetch tab data');
                navigate(-1); // Go back if failed to fetch
            }
        } catch (error) {
            console.error('Error fetching tab:', error);
            toast.error(error.response?.data?.message || error.message || 'Error fetching tab data');
            navigate(-1); // Go back on error
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleEdit = () => {
        navigate(`/admin/tabmanagement/edit/${id}`, {
            state: { tab: { ...tabData, id } }
        });
    };

    if (isLoading) {
        return (
            <div className="flex flex-col font-medium text-[#0D2E28] p-2 h-full font-[Poppins]">
                <ToastContainer />
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">Loading tab details...</div>
                </div>
            </div>
        );
    }

    return (
        // <div className="flex flex-col font-medium text-[#0D2E28] p-2 h-full font-[Poppins]">
        <div className="w-full min-h-screen font-medium text-[#0D2E28] font-[Poppins] ">
            <ToastContainer />

            {/* Header */}
            <div className="flex items-center justify-between bg-white border rounded-lg shadow p-3 mb-4">
                <div className="flex items-center">
                    <button
                        onClick={handleBack}
                        className="mr-3 p-2 hover:bg-gray-100 rounded-full"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="text-lg font-semibold">View Tab</h2>
                </div>

                {tabData.isEditable && (
                    <button
                        onClick={handleEdit}
                        // className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        {/* <Edit size={16} /> */}
                        {/* Edit Tab */}
                    </button>
                )}
            </div>

            {/* Main Content */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-white border rounded-lg p-6 space-y-6 border-[#616666]">

                    {/* Tab Name */}
                    <div className="flex items-center gap-6">
                        <label className="w-1/4 font-medium text-gray-700">Tab Name:</label>
                        <div className="flex-1">
                            <div className="border rounded-lg px-4 py-3 bg-[#E4E5EB] text-gray-800 border-[#001580]">
                                {tabData.tabName || 'N/A'}
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-6">
                        <label className="w-1/4 font-medium text-gray-700">Status:</label>
                        <div className="flex-1">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${tabData.isActive
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                {tabData.isActive ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>

                    {/* Editable Status */}
                    <div className="flex items-center gap-6">
                        <label className="w-1/4 font-medium text-gray-700">Editable:</label>
                        <div className="flex-1">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${tabData.isEditable
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                {tabData.isEditable ? 'Yes' : 'No'}
                            </span>
                        </div>
                    </div>

                    {/* Sub Tabs */}
                    <div className="flex gap-6">
                        <label className="w-1/4 font-medium text-gray-700">Sub Tabs:</label>
                        <div className="flex-1">
                            {tabData.subTabNames && tabData.subTabNames.length > 0 ? (
                                <div className="space-y-2">
                                    {tabData.subTabNames.map((subTab, index) => (
                                        <div
                                            key={index}
                                            className="border rounded-lg px-4 py-3 bg-[#E4E5EB] text-gray-800 border-[#001580]"
                                        >
                                            {subTab.name || subTab}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="border rounded-lg px-4 py-3 bg-[#E4E5EB] text-gray-500 border-[#001580]">
                                    No sub tabs available
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Created Date */}
                    {tabData.createdAt && (
                        <div className="flex items-center gap-6">
                            <label className="w-1/4 font-medium text-gray-700">Created Date:</label>
                            <div className="flex-1">
                                <div className="border rounded-lg px-4 py-3 bg-[#E4E5EB] text-gray-500 border-[#001580]">
                                    {new Date(tabData.createdAt).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Updated Date */}
                    {tabData.updatedAt && (
                        <div className="flex items-center gap-6">
                            <label className="w-1/4 font-medium text-gray-700">Last Updated:</label>
                            <div className="flex-1">
                                <div className="border rounded-lg px-4 py-3 bg-[#E4E5EB] text-gray-500 border-[#001580]">
                                    {new Date(tabData.updatedAt).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 mt-6">
                    {/* <button
                        onClick={handleBack}
                        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                        Back to List
                    </button> */}
                    {tabData.isEditable && (
                        <button
                            onClick={handleEdit}
                            className="px-6 py-2 bg-[#001580] text-white rounded-lg hover:bg-[#CED4F2]"
                        >
                            Edit Tab
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TabView;