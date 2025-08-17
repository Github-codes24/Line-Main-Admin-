import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const TabAdd = () => {
  const navigate = useNavigate();

  const [tabName, setTabName] = useState("");
  const [subTabs, setSubTabs] = useState([{ id: Date.now(), name: "" }]);

  const handleBack = () => {
    navigate("/admin/tabmanagement"); // adjust route as per your setup
  };

  const handleAddSubTab = () => {
    setSubTabs([...subTabs, { id: Date.now(), name: "" }]);
  };

  const handleRemoveSubTab = (id) => {
    setSubTabs(subTabs.filter((sub) => sub.id !== id));
  };

  const handleChangeSubTab = (id, value) => {
    setSubTabs(
      subTabs.map((sub) =>
        sub.id === id ? { ...sub, name: value } : sub
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tab Name:", tabName);
    console.log("Sub Tabs:", subTabs);
    // TODO: API call or form handling
  };

  return (
    <div className="flex flex-col bg-[#F9FAFA] font-medium text-[#0D2E28] p-4 h-full">
      {/* Header */}
      <div className="flex items-center bg-white border rounded-lg shadow-xl p-3 mb-4">
        <img
  src="/Back Button (1).png"
  onClick={handleBack}
  className="mr-3 cursor-pointer w-8"
  alt="Back"
/>

        <h2 className="text-lg font-semibold">Add New Tab</h2>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border-2 rounded-lg shadow-xl p-6 space-y-6 h-[78%]"
      >
        {/* Tab Name */}
        <div className="flex items-center gap-3">
          <label className="w-1/4 font-medium">Tab Name:</label>
          <input
            type="text"
            value={tabName}
            onChange={(e) => setTabName(e.target.value)}
            placeholder="Enter Tab Name"
            className="flex-1 border-2  rounded-md px-3 py-2  border-teal-600  placeholder:text-black "
          />
        </div>

        {/* Sub Tabs */}
        {subTabs.map((sub, index) => (
          <div key={sub.id} className="flex items-center gap-3">
            <label className="w-1/4 font-medium">
              {index === 0 ? "Sub Tab Name:" : ""}
            </label>
            <input
              type="text"
              value={sub.name}
              onChange={(e) => handleChangeSubTab(sub.id, e.target.value)}
              placeholder="Enter Sub Tab Name"
              className="flex-1  rounded-md px-3 py-2 outline-none border-2 border-teal-600 placeholder:text-black "
            />
            {subTabs.length > 1 && (
              <X
                onClick={() => handleRemoveSubTab(sub.id)}
                className="w-5 h-5 text-black cursor-pointer"
              />
            )}
          </div>
        ))}

        {/* Add More Sub Tab */}
        <button
          type="button"
          onClick={handleAddSubTab}
          className="text-m text-teal-700 hover:underline ml-[85%]"
        >
          + Add More Sub Tab
        </button>

        {/* Action Buttons */}
        
      </form>
      <div className="flex justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={handleBack}
            className="bg-[#E6F4F1] text-[#007E74] px-6 py-2 rounded border border-[#007E74] hover:bg-[#d0ebe7]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#007E74] text-white px-6 py-2 rounded hover:bg-[#005e56]"
          >
            Add Tab
          </button>
        </div>
    </div>
  );
};

export default TabAdd;
