// TabView.jsx
import React from "react";

import { useNavigate } from "react-router";


const TabView = () => {
 const navigate = useNavigate();

   const handleBack = () => {
    navigate("/admin/tabmanagement"); // adjust route as per your setup
  };

  return (
    <div className=" bg-gray-50 p-4 h-full">
      {/* Header */}
      <div className="bg-white shadow-xl rounded-xl p-3 flex items-center gap-2 border-2">
             <img
  src="/Back Button (1).png"
  onClick={handleBack}
  className="mr-3 cursor-pointer w-8"
  alt="Back"
/>
        <h2 className="text-lg font-semibold text-gray-800">View Tab</h2>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow-xl rounded-lg p-6 mt-4 border-2 h-[78%] border-[#001580]">
        {/* Tab Name */}
        <div className="mb-4 flex items-center ">
          <label className="w-32 font-medium text-black ">Tab Name:</label>
          <input
            type="text"
            value="Plumbing"
            disabled
            className="flex-1 p-2 rounded  text-black border-2 border-[#001580] bg-[#E4E5EB] "
          />
        </div>

        {/* Sub Tab Names */}
        <div className="mb-4 flex items-start">
          <label className="w-32 font-medium text-black border-2 ">Sub Tab Name:</label>
          <div className="flex-1 space-y-2 ">
            <input
              type="text"
              value="Plumber"
              disabled
              className="w-full p-2  rounded  text-black border-2 bg-[#E4E5EB] border-[#001580]"
            />
            <input
              type="text"
              value="Tank Cleaner"
              disabled
              className="w-full p-2  rounded   text-black border-2 bg-[#E4E5EB] border-[#001580]"
            />
          </div>
        </div>

        {/* Edit Button */}
        
      </div>
      <div className="flex justify-center p-4 ">
          <button className="bg-[#001580] hover:bg-[#001580] text-white px-6 py-1 rounded">
            Edit
          </button>
        </div>
    </div>
  );
};

export default TabView;
