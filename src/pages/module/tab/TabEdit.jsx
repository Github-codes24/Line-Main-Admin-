import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
const TabEdit = () => {
  const [tabName, setTabName] = useState("Plumbing");
  const [subTabs, setSubTabs] = useState(["Plumber", "Tank Cleaner"]);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleBack = () => {
    navigate("/admin/tabmanagement");
  };

  const handleAddSubTab = () => {
    setSubTabs([...subTabs, ""]);
  };
  const handleRemoveSubTab = (index) => {
    const updated = subTabs.filter((_, i) => i !== index);
    setSubTabs(updated);
  };
  const handleChangeSubTab = (index, value) => {
    const updated = [...subTabs];
    updated[index] = value;
    setSubTabs(updated);
  };
  return (
    <div className="p-2 font-[Poppins]">
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
        <div className="p-6 space-y-4 shadow border rounded-lg h-[90%] border-[#616666]">
          <div className="flex items-center">
            <label className="w-80 text-black font-medium">Tab Name:</label>
            <input
              type="text"
              value={tabName}
              onChange={(e) => setTabName(e.target.value)}
              className="flex-1 rounded-md px-3 py-3 border border-[#001580] bg-[#CED4F2] focus: outline-none"
            />
          </div>
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
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={
                    <div className="flex justify-end mt-2">
                      <button
                        type="button"
                        onClick={handleAddSubTab}
                        className="w-[163px] h-[24px] text-[#001580] font-medium text-[16px] leading-[24px] text-center"
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: 500,
                          fontStyle: "Medium",
                          letterSpacing: "0%",
                          verticalAlign: "middle",
                          opacity: 1,
                        }}
                      >
                        + Add More Sub Tab
                      </button>
                    </div>
                  }
                  className="w-[163px] h-[24px] text-[#001580] font-medium text-[16px] leading-[24px] text-center"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    fontStyle: "Medium",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                    opacity: 1,
                  }}
                >
                  + Add More Sub Tab
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center p-4 space-x-4">
          <button
            className="w-[200px] px-5 py-2 rounded-md border-2 bg-[#CED4F2] text-[#001580] border-[#001580] "
            onClick={handleBack}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              navigate(`/admin/tabmanagement/view/${id}`);
            }}
            className="w-[200px] px-5 py-2 rounded-md bg-[#001580] text-white hover:bg-[#001580]"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
export default TabEdit;
