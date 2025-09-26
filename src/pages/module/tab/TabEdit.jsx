import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { X, ArrowLeft } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const TabEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get tab ID from URL
    const location = useLocation();
    const [fetchData] = useFetch();
    const [isLoading, setIsLoading] = useState(false);
    const [tabName, setTabName] = useState("");
    const [subTabs, setSubTabs] = useState([{ id: Date.now(), name: "" }]);
    const [originalTabData, setOriginalTabData] = useState(null);

    // Predefined tabs that cannot be edited (as per Figma requirement)
    const nonEditableTabs = [
        "Plumbing", 
        "Painting", 
        "Electrician", 
        "TilesFitting", 
        "AC & Refrigerator"
    ];

    // Check if tab data was passed via navigation state
    const passedTabData = location.state?.tab;

    useEffect(() => {
        if (passedTabData) {
            // Use passed data if available
            initializeFormData(passedTabData);
        } else if (id) {
            // Fetch data from API if not passed
            fetchSingleTab(id);
        }
    }, [id, passedTabData]);

    const initializeFormData = (tabData) => {
        const tabNameValue = tabData.name || tabData.tabName || "";
        const subTabsData = tabData.subTabs || tabData.subTabNames || [];
        
        setOriginalTabData(tabData);
        setTabName(tabNameValue);
        
        // Initialize sub tabs
        if (subTabsData.length > 0) {
            setSubTabs(subTabsData.map((subTab, index) => ({
                id: Date.now() + index,
                name: subTab.name || subTab || ""
            })));
        } else {
            setSubTabs([{ id: Date.now(), name: "" }]);
        }

        // Check if this tab is editable
        if (nonEditableTabs.includes(tabNameValue)) {
            toast.error(`Editing of "${tabNameValue}" tab is not allowed as per system requirements.`);
            navigate(-1);
        }
    };

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
                initializeFormData(tab);
            } else {
                toast.error(result.message || 'Failed to fetch tab data');
                navigate(-1);
            }
        } catch (error) {
            console.error('Error fetching tab:', error);
            toast.error(error.response?.data?.message || error.message || 'Error fetching tab data');
            navigate(-1);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleAddSubTab = () => {
        setSubTabs([...subTabs, { id: Date.now(), name: "" }]);
    };

    const handleRemoveSubTab = (id) => {
        if (subTabs.length > 1) {
            setSubTabs(subTabs.filter((sub) => sub.id !== id));
        }
    };

    const handleChangeSubTab = (id, value) => {
        setSubTabs(subTabs.map((sub) => (sub.id === id ? { ...sub, name: value } : sub)));
    };

    const updateTab = async (tabData) => {
        try {
            setIsLoading(true);

            const result = await fetchData({
                method: "PUT",
                url: `${conf.apiBaseUrl}/admin/tabs/${id}`,
                data: tabData
            });

            console.log('Update tab result:', result);

            if (result.success || result.status === 'success' || result.data) {
                toast.success(result.message || "Tab updated successfully!");
                setTimeout(() => {
                    navigate(-1);
                }, 1500);
                return { success: true, data: result };
            } else {
                throw new Error(result.message || 'Failed to update tab');
            }
        } catch (error) {
            console.error('Error updating tab:', error);
            let errorMessage = 'Failed to update tab';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (error.response?.data) {
                errorMessage = typeof error.response.data === 'string'
                    ? error.response.data
                    : JSON.stringify(error.response.data);
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            toast.error(errorMessage);
            return { success: false, error: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!tabName.trim()) {
            toast.error("Tab name is required");
            return;
        }

        // Check if tab name is in non-editable list
        if (nonEditableTabs.includes(tabName.trim())) {
            toast.error(`"${tabName.trim()}" tab cannot be edited as per system requirements.`);
            return;
        }

        // Filter out empty sub tabs
        const validSubTabs = subTabs.filter(sub => sub.name.trim() !== "");
        
        if (validSubTabs.length === 0) {
            toast.error("At least one sub tab is required");
            return;
        }

        // Based on the API structure, prepare the data
        const tabData = {
            tabName: tabName.trim(),
            subTabNames: validSubTabs.map(sub => ({ name: sub.name.trim() }))
        };

        console.log("Updating tab with data:", tabData);
        await updateTab(tabData);
    };

    if (isLoading && !originalTabData) {
        return (
            <div className="flex flex-col font-medium text-[#0D2E28] p-2 h-full font-[Poppins]">
                <ToastContainer />
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">Loading tab data...</div>
                </div>
            </div>
        );
    }

    return (
        // <div className="flex flex-col font-medium text-[#0D2E28] p-2 h-full font-[Poppins]">
//         <div className="w-full min-h-screen font-medium text-[#0D2E28] font-[Poppins] bg-[#E0E9E9]">
//   {/* <ToastContainer /> */}
//             <ToastContainer />
            
//             {/* Header */}
//             <div className="flex items-center bg-white border rounded-lg shadow p-3 mb-4">
//                 <button
//                     onClick={handleBack}
//                     className="mr-3 p-2 hover:bg-gray-100 rounded-full"
//                 >
//                     <ArrowLeft size={20} />
//                 </button>
//                 <h2 className="text-lg font-semibold">Edit Tab</h2>
//             </div>

//             {/* Restriction Notice */}
//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
//                 <div className="flex">
//                     <div className="text-yellow-800">
//                         <strong>Note:</strong> Editing of Plumbing, Painting, Electrician, TilesFitting, and AC & Refrigerator tabs is not allowed as per system requirements.
//                     </div>
//                 </div>
//             </div>

//             <div className="bg-white p-4 rounded-lg shadow-md h-screen">
//                 <form
//                     onSubmit={handleSubmit}
//                     className="bg-white border rounded-lg p-6 space-y-5 h-[85%] border-[#616666]"
//                 >
//                     {/* Tab Name */}
//                     <div className="flex items-center gap-[24px]">
//                         <label className="w-1/4 font-medium">Tab Name:</label>
//                         <input
//                             type="text"
//                             value={tabName}
//                             onChange={(e) => setTabName(e.target.value)}
//                             placeholder="Enter Tab Name"
//                             className={`flex-1 border rounded-lg px-3 py-3 border-[#001580] bg-[#CED4F2] placeholder:text-black ${
//                                 nonEditableTabs.includes(tabName) 
//                                     ? 'opacity-50 cursor-not-allowed' 
//                                     : ''
//                             }`}
//                             disabled={nonEditableTabs.includes(tabName)}
//                         />
//                     </div>

//                     {/* Sub Tabs */}
//                     {subTabs.map((sub, index) => (
//                         <div key={sub.id} className="flex items-center gap-[24px]">
//                             <label className="w-1/4 font-medium">
//                                 {index === 0 ? "Sub Tab Name:" : ""}
//                             </label>
//                             <div className="relative flex-1">
//                                 <input
//                                     type="text"
//                                     value={sub.name}
//                                     onChange={(e) => handleChangeSubTab(sub.id, e.target.value)}
//                                     placeholder="Enter Sub Tab Name"
//                                     className="w-full rounded-lg px-3 py-3 pr-8 outline-none border bg-[#CED4F2] border-[#001580] placeholder:text-black"
//                                 />
//                                 {subTabs.length > 1 && (
//                                     <X
//                                         onClick={() => handleRemoveSubTab(sub.id)}
//                                         className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-black cursor-pointer hover:text-red-600"
//                                     />
//                                 )}
//                             </div>
//                         </div>
//                     ))}

//                     {/* Add More Sub Tab Button */}
//                     <button
//                         type="button"
//                         onClick={handleAddSubTab}
//                         className="text-base text-[#001580] hover:underline ml-[82%]"
//                     >
//                         + Add More Sub Tab
//                     </button>
//                 </form>

//                 {/* Action Buttons */}
//                 <div className="flex justify-center gap-4 pt-4">
//                     <button
//                         type="button"
//                         onClick={handleBack}
//                         className="w-[200px] bg-[#CED4F2] text-[#001580] px-6 py-2 rounded-lg border border-[#001580]"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         type="submit"
//                         disabled={isLoading || nonEditableTabs.includes(tabName)}
//                         className={`w-[200px] px-6 py-2 rounded-lg text-white ${
//                             isLoading || nonEditableTabs.includes(tabName)
//                                 ? 'bg-gray-400 cursor-not-allowed' 
//                                 : 'bg-[#001580] hover:bg-[#001580]'
//                         }`}
//                         onClick={handleSubmit}
//                     >
//                         {isLoading ? 'Updating...' : 'Update Tab'}
//                     </button>
//                 </div>
//             </div>
//         </div>
<div className="w-full min-h-screen font-medium text-[#0D2E28] font-[Poppins] bg-[#E0E9E9]">
  <ToastContainer />

  {/* Header */}
  <div className="flex items-center bg-white border rounded-lg shadow p-3 mb-4">
    <button
      onClick={handleBack}
      className="mr-3 p-2 hover:bg-gray-100 rounded-full"
    >
      <ArrowLeft size={20} />
    </button>
    <h2 className="text-lg font-semibold">Edit Tab</h2>
  </div>

  {/* Restriction Notice */}
  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
    <div className="flex">
      <div className="text-yellow-800">
        <strong>Note:</strong> Editing of Plumbing, Painting, Electrician, TilesFitting, and AC & Refrigerator tabs is not allowed as per system requirements.
      </div>
    </div>
  </div>

  <div className="bg-white p-4 rounded-lg shadow-md h-screen overflow-y-auto">
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-lg p-6 space-y-5 h-[85%] border-[#616666]"
    >
      {/* Tab Name */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-[24px] w-full">
        <label className="w-full md:w-1/4 font-medium">Tab Name:</label>
        <input
          type="text"
          value={tabName}
          onChange={(e) => setTabName(e.target.value)}
          placeholder="Enter Tab Name"
          className={`flex-1 w-full md:w-auto border rounded-lg px-3 py-3 border-[#001580] bg-[#CED4F2] placeholder:text-black ${
            nonEditableTabs.includes(tabName) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={nonEditableTabs.includes(tabName)}
        />
      </div>

      {/* Sub Tabs */}
      {subTabs.map((sub, index) => (
        <div key={sub.id} className="flex flex-col md:flex-row items-start md:items-center gap-[24px] w-full">
          <label className="w-full md:w-1/4 font-medium">{index === 0 ? "Sub Tab Name:" : ""}</label>
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={sub.name}
              onChange={(e) => handleChangeSubTab(sub.id, e.target.value)}
              placeholder="Enter Sub Tab Name"
              className="w-full rounded-lg px-3 py-3 pr-8 outline-none border bg-[#CED4F2] border-[#001580] placeholder:text-black"
            />
            {subTabs.length > 1 && (
              <X
                onClick={() => handleRemoveSubTab(sub.id)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-black cursor-pointer hover:text-red-600"
              />
            )}
          </div>
        </div>
      ))}

      {/* Add More Sub Tab Button */}
      <button
        type="button"
        onClick={handleAddSubTab}
        className="text-base text-[#001580] hover:underline ml-auto block"
      >
        + Add More Sub Tab
      </button>
    </form>

    {/* Action Buttons */}
    <div className="flex justify-center gap-4 pt-4 flex-wrap">
      <button
        type="button"
        onClick={handleBack}
        className="w-[200px] bg-[#CED4F2] text-[#001580] px-6 py-2 rounded-lg border border-[#001580]"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isLoading || nonEditableTabs.includes(tabName)}
        className={`w-[200px] px-6 py-2 rounded-lg text-white ${
          isLoading || nonEditableTabs.includes(tabName)
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-[#001580] hover:bg-[#001580]'
        }`}
        onClick={handleSubmit}
      >
        {isLoading ? 'Updating...' : 'Update Tab'}
      </button>
    </div>
  </div>
</div>

    );
};

export default TabEdit;