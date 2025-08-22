import React from "react";
import { ArrowLeft } from "lucide-react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";  // Import this hook


export default function EditCommission() {
      const navigate = useNavigate(); 
  
  return (
    <div className="bg-gray-200 max-h-screen p-4">
      <div className=" ">
        {/* Header Section */}
        <div className="bg-white rounded-lg border border-gray-300" style={{marginBottom: '5px'}}>
          <div className="flex items-center p-4 bg-white rounded-lg border-b border-gray-300">
            <button className="text-gray-600 hover:text-gray-800 mr-3">
              <IoArrowBackCircleOutline size={30}  onClick={()=> navigate (-1) } /> 
            </button>
            <h2 className="text-lg font-medium text-gray-800">Edit Commission</h2>
          </div>
        </div>

        {/* Form and Buttons Section */}
        <div className="bg-white rounded-lg pt-3">
          {/* Form Section with Border */}
          <div className="border border-gray-300 rounded-lg px-6 py-12  mb-4 ml-4 mr-4  "style={{ marginTop: '10px' }}>
            <div className="space-y-6">
              {/* Category */}
              <div className="flex items-center">
                <label className="w-48 text-sm font-medium text-gray-700">Category:</label>
                <select className="flex-1 border border-gray-300 rounded px-3 py-2 bg-blue-100 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400">
                  <option>Select</option>
                  <option>Electrician</option>
                  <option>Plumbing</option>
                  <option>Tiler</option>
                  <option>Painter</option>
                  <option>AC & Refrigerator Mechanic</option>
                </select>
              </div>

              {/* Crud Operations */}
              <div className="flex items-center">
                <label className="w-48 text-sm font-medium text-gray-700">Crud Operations:</label>
                <select className="flex-1 border border-gray-300 rounded px-3 py-2 bg-blue-100 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400">
                  <option>Select</option>
                  <option>Board Fitting</option>
                  <option>Plumber</option>
                  <option>Tile Fitting</option>
                  <option>Wall Painting</option>
                  <option>Refrigerator Repair</option>
                </select>
              </div>

              {/* Commission From Worker */}
              <div className="flex items-center">
                <label className="w-48 text-sm font-medium text-gray-700">Commission From Worker:</label>
                <input
                  type="text"
                  placeholder="10 % "
                  className=" flex-1 border border-gray-300 rounded px-3 py-2 bg-blue-100 placeholder-gray-500 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>

              {/* Commission From Shopkeeper */}
              <div className="flex items-center">
                <label className="w-48 text-sm font-medium text-gray-700">Commission From Shopkeeper:</label>
                <input
                  type="text"
                  placeholder="10 %"
                  className="flex-1 border border-gray-300 rounded px-3 py-2 bg-blue-100 placeholder-gray-500 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Footer Buttons - Inside the same div but outside the border */}
          <div className="flex justify-center gap-4 px-6 pb-6">
            <button className="px-12 py-2 rounded border border-gray-300 bg-blue-100 text-gray-700 hover:bg-blue-200 transition-colors">
              Cancel
            </button>
            <button className="px-12 py-2 rounded bg-blue-800 text-white hover:bg-blue-900 transition-colors" onClick={() => alert("Commission Update successfully!")}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}