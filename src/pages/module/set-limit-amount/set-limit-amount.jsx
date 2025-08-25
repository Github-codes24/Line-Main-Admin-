import React from "react";
import { ArrowLeft } from "lucide-react";

export default function SetLimitAmount() {
  
  return (
    <div className="max-h-screen bg-gray-200 p-5 pb-40 mb-30">
      <div className="">
        {/* Header Section */}
        <div className="bg-white rounded-lg border border-gray-300" style={{marginBottom: '5px'}}>
          <div className="flex items-center p-4 bg-white rounded-lg border-b border-gray-300">
            <button className="text-gray-600 hover:text-gray-800 mr-3">
            </button>
            <h2 className="text-lg font-medium text-gray-800">Set Limit Amount</h2>
          </div>
        </div>

        {/* Form and Buttons Section */}
        <div className="bg-white rounded-lg pt-3  pb-10 h-100">
          {/* Form Section with Extended Border */}
          <div className="border border-gray-300 rounded-lg px-6 py-12 mb-6 ml-4 mr-4 h-96" style={{ marginTop: '10px' }}>
            <div className="space-y-6">
              {/* Category */}
              <div className="flex items-center">
                <label className="w-80 text-sm font-medium text-gray-700">wallet Balance Negative Limit :</label>
                <input 
                  type="text"
                  placeholder="₹ 1000"
                  className="flex-1 border border-gray-300 rounded px-3 py-2 bg-blue-100 placeholder-gray-500 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Footer Buttons - Outside the border but closer */}
          <div className="flex justify-center gap-4 px-6 pt-7 ">
            <button 
              className="px-12 py-2 rounded bg-blue-800 text-white hover:bg-blue-900 transition-colors" 
              onClick={() => alert("Set Limit Amount Edited successfully!")}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}