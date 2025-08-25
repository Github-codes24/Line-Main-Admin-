import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
const TabEdit = () => {
  const [tabName, setTabName] = useState("Plumbing");
  const [subTabs, setSubTabs] = useState(["Plumber", "Tank Cleaner"]);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleBack = () => {
    navigate("/admin/tabmanagement"); // adjust route as per your setup
  };


  // Add new sub tab
  const handleAddSubTab = () => {
    setSubTabs([...subTabs, ""]);
  };
  // Remove sub tab
  const handleRemoveSubTab = (index) => {
    const updated = subTabs.filter((_, i) => i !== index);
    setSubTabs(updated);
  };
  // Update sub tab value
  const handleChangeSubTab = (index, value) => {
    const updated = [...subTabs];
    updated[index] = value;
    setSubTabs(updated);
  };
  return (
    <div className="p-2 font-[Poppins]">
      {/* Header */}
      <div className="flex items-center gap-2 border-b px-4 py-3 bg-gray-50 rounded-lg shadow border-2 ">
        <img
          src="/Back Button (1).png"
          onClick={handleBack}
          className="mr-3 cursor-pointer w-8"
          alt="Back"
        />
        <h2 className="text-lg font-semibold text-gray-800">Edit Tab</h2>
      </div>
      <div className="bg-white shadow rounded-lg p-4 mt-4 h-screen">
        {/* Form */}
      <div className="p-6 space-y-4 shadow border rounded-lg h-[90%] border-[#616666]">
        {/* Tab Name */}
        <div className="flex items-center">
          <label className="w-80 text-black font-medium">Tab Name:</label>
          <input
            type="text"
            value={tabName}
            onChange={(e) => setTabName(e.target.value)}
            className="flex-1 rounded-md px-3 py-3 border border-[#001580] bg-[#CED4F2] focus: outline-none"
          />
        </div>
        {/* Sub Tabs */}
        <div className="flex items-start">
          <label className="w-80 text-black font-medium ">
            Sub Tab Name:
          </label>
          <div className="flex-1 space-y-4 ">
            {subTabs.map((subTab, index) => (
              <div
                key={index}
                className="flex items-center gap-2 border rounded-md px-3 py-3 bg-[#CED4F2] border-[#001580]"
              >
                <input
                  type="text"
                  value={subTab}
                  onChange={(e) => handleChangeSubTab(index, e.target.value)}
                  className="flex-1 outline-none bg-[#CED4F2]"
                />
                <X
                  className="w-5 h-5 text-black cursor-pointer"
                  onClick={() => handleRemoveSubTab(index)}
                />
              </div>
            ))}
            {/* Add more */}
            <button
              type="button"
              onClick={handleAddSubTab}
              className="text-base font-medium text-[#001580] hover:underline ml-[72%]"
            >
              + Add More Sub Tab
            </button>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="flex justify-center p-4 space-x-4">
        <button className="w-[200px] px-5 py-2 rounded-md border-2 bg-[#CED4F2] text-[#001580] border-[#001580] " onClick={handleBack}>
          Cancel
        </button>
        <button
          onClick={() => {
            navigate(`/admin/tabmanagement/view/${id}`);
          }}
          className="w-[200px] px-5 py-2 rounded-md bg-[#001580] text-white hover:bg-[#001580]">
          Update
        </button>
      </div>
      </div>
    </div>
  );
};
export default TabEdit;