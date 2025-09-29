import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";
const TabAdd = () => {
    const navigate = useNavigate();
    const [fetchData] = useFetch();
    const [isLoading, setIsLoading] = useState(false);
    const [tabName, setTabName] = useState("");
    const [subTabs, setSubTabs] = useState([{ id: Date.now(), name: "" }]);
    const handleBack = () => {
        navigate("/admin/tabmanagement");
    };
    const handleAddSubTab = () => {
        setSubTabs([...subTabs, { id: Date.now(), name: "" }]);
    };
    const handleRemoveSubTab = (id) => {
        setSubTabs(subTabs.filter((sub) => sub.id !== id));
    };
    const handleChangeSubTab = (id, value) => {
        setSubTabs(subTabs.map((sub) => (sub.id === id ? { ...sub, name: value } : sub)));
    };
    const addTab = async (tabData) => {
        try {
            setIsLoading(true);

            const result = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}/admin/tabs`,
                data: tabData
            });

            if (result.success || result.status === 'success' || result.data) {
                toast.success(result.message || "Tab added successfully!");
                setTimeout(() => {
                    navigate("/admin/tabmanagement");
                }, 1500);
                return { success: true, data: result };
            } else {
                throw new Error(result.message || 'Failed to add tab');
            }
        } catch (error) {
            console.error('Error adding tab:', error);
            console.error('Error response:', error.response?.data);
            console.error('Error status:', error.response?.status);

            let errorMessage = 'Failed to add tab';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (error.response?.data) {
                errorMessage = typeof error.response.data === 'string'
                    ? error.response.data
                    : JSON.stringify(error.response.data);
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

        // Filter out empty sub tabs
        const validSubTabs = subTabs.filter(sub => sub.name.trim() !== "");

        if (validSubTabs.length === 0) {
            toast.error("At least one sub tab is required");
            return;
        }

        // Based on your Postman response, the API expects this structure:
        const tabData = {
            tabName: tabName.trim(),
            subTabNames: validSubTabs.map(sub => ({ name: sub.name.trim() }))
        };

        console.log("Submitting tab data:", tabData);
        await addTab(tabData);
    };
    return (
        // // <div className="flex flex-col font-medium text-[#0D2E28] p-2 h-full font-[Poppins]">
        // <div className="w-full min-h-screen font-medium text-[#0D2E28] font-[Poppins] ">
        //     <ToastContainer />
        //     <div className="flex items-center bg-white border rounded-lg shadow p-4 mb-4">
        //         <img src="/Back Button (1).png" onClick={handleBack} className="mr-3 cursor-pointer w-8" alt="Back" />
        //         <h2 className="text-lg font-semibold">Add New Tab</h2>
        //     </div>
        //     <div className="bg-white p-4 rounded-lg shadow-md h-screen">
        //         <form
        //             onSubmit={handleSubmit}
        //             className="bg-white border rounded-lg p-6 space-y-5 h-[85%] border-[#616666]"
        //         >
        //             <div className="flex items-center gap-[24px]">
        //                 <label className="w-1/4 font-medium">Tab Name:</label>
        //                 <input
        //                     type="text"
        //                     value={tabName}
        //                     onChange={(e) => setTabName(e.target.value)}
        //                     placeholder="Enter Tab Name"
        //                     className="flex-1 border  rounded-lg px-3 py-3 border-[#001580]  bg-[#CED4F2] placeholder:text-black "
        //                 />
        //             </div>
        //             {subTabs.map((sub, index) => (
        //                 <div key={sub.id} className="flex items-center gap-[24px]">
        //                     <label className="w-1/4 font-medium">{index === 0 ? "Sub Tab Name:" : ""}</label>
        //                     <div className="relative flex-1">
        //                         <input
        //                             type="text"
        //                             value={sub.name}
        //                             onChange={(e) => handleChangeSubTab(sub.id, e.target.value)}
        //                             placeholder="Enter Sub Tab Name"
        //                             className="w-full rounded-lg px-3 py-3 pr-8 outline-none border bg-[#CED4F2] border-[#001580] placeholder:text-black"
        //                         />
        //                         {subTabs.length > 1 && (
        //                             <X
        //                                 onClick={() => handleRemoveSubTab(sub.id)}
        //                                 className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-black cursor-pointer"
        //                             />
        //                         )}
        //                     </div>
        //                 </div>
        //             ))}
        //             <button
        //                 type="button"
        //                 onClick={handleAddSubTab}
        //                 className="text-base text-[#001580] hover:underline ml-[82%]"
        //             >
        //                 + Add More Sub Tab
        //             </button>
        //         </form>
        //         <div className="flex justify-center gap-4 pt-4">
        //             <button
        //                 type="button"
        //                 onClick={handleBack}
        //                 className="w-[200px] bg-[#CED4F2] text-[#001580] px-6 py-2 rounded-lg border border-[#001580]"
        //             >
        //                 Cancel
        //             </button>
        //             <button
        //                 type="submit"
        //                 disabled={isLoading}
        //                 className={`w-[200px] px-6 py-2 rounded-lg text-white ${isLoading
        //                     ? 'bg-gray-400 cursor-not-allowed'
        //                     : 'bg-[#001580] hover:bg-[#001580]'
        //                     }`}
        //                 onClick={handleSubmit}
        //             >
        //                 {isLoading ? 'Adding...' : 'Add Tab'}
        //             </button>
        //         </div>
        //     </div>
        // </div>

       <div className="w-full min-h-screen font-medium text-[#0D2E28] font-[Poppins]">
  <ToastContainer />

  {/* Header */}
  <div className="flex items-center bg-white border rounded-lg shadow p-4 mb-4">
    <img
      src="/Back Button (1).png"
      onClick={handleBack}
      className="mr-3 cursor-pointer w-8"
      alt="Back"
    />
    <h2 className="text-lg font-semibold">Add New Tab</h2>
  </div>

  {/* Form Container */}
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
          className="flex-1 w-full md:w-auto border rounded-lg px-3 py-3 border-[#001580] bg-[#CED4F2] placeholder:text-black"
        />
      </div>

      {/* Sub Tabs */}
      {subTabs.map((sub, index) => (
        <div key={sub.id} className="flex flex-col md:flex-row items-start md:items-center gap-[24px] w-full">
          <label className="w-full md:w-1/4 font-medium">
            {index === 0 ? "Sub Tab Name:" : ""}
          </label>
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
                className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-black cursor-pointer"
              />
            )}
          </div>
        </div>
      ))}

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
        disabled={isLoading}
        className={`w-[200px] px-6 py-2 rounded-lg text-white ${
          isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#001580] hover:bg-[#001580]'
        }`}
        onClick={handleSubmit}
      >
        {isLoading ? 'Adding...' : 'Add Tab'}
      </button>
    </div>
  </div>
</div>

    );
};
export default TabAdd;
