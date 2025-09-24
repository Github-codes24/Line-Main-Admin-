import React, { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import conf from "../../../config";
import useFetch from "../../../hook/useFetch";

export default function AddCommission() {
  const navigate = useNavigate();
  const [fetchData] = useFetch();
  const [form, setForm] = useState({
    category: "",
    operation: "",
    workerCommission: "",
    shopkeeperCommission: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}/admin/commissions/add-commission`,
        data: form,
      });
      alert("Commission added successfully!");
      navigate("/admin/set-commission");
    } catch (err) {
      console.error(err);
      alert("Failed to add commission!");
    }
  };

  return (
    <div className="bg-gray-200 max-h-screen p-4">
      <div className="bg-white rounded-lg border border-gray-300 mb-4">
        <div className="flex items-center p-4 bg-white rounded-lg border-b border-gray-300">
          <button
            className="text-gray-600 hover:text-gray-800 mr-3"
            onClick={() => navigate(-1)}
          >
            <IoArrowBackCircleOutline size={30} />
          </button>
          <h2 className="text-lg font-medium text-gray-800">Add Commission</h2>
        </div>

        <div className="border border-gray-300 rounded-lg px-6 py-12 mb-4 ml-4 mr-4 mt-4 space-y-6">
          <div className="flex items-center">
            <label className="w-48 text-sm font-medium text-gray-700">Category:</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="flex-1 border border-gray-300 rounded px-3 py-2"
            >
              <option>Select</option>
              <option>Electrician</option>
              <option>Plumbing</option>
              <option>Tiler</option>
              <option>Painter</option>
              <option>AC & Refrigerator Mechanic</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="w-48 text-sm font-medium text-gray-700">Crud Operations:</label>
            <select
              name="operation"
              value={form.operation}
              onChange={handleChange}
              className="flex-1 border border-gray-300 rounded px-3 py-2"
            >
              <option>Select</option>
              <option>Board Fitting</option>
              <option>Plumber</option>
              <option>Tile Fitting</option>
              <option>Wall Painting</option>
              <option>Refrigerator Repair</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="w-48 text-sm font-medium text-gray-700">Commission From Work        er:</label>
            <input
              type="text"
              name="workerCommission"
              value={form.workerCommission}
              onChange={handleChange}
              placeholder="Enter Commission (%)"
              className="flex-1 border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="flex items-center">
            <label className="w-48 text-sm font-medium text-gray-700">Commission From Shopkeeper:</label>
            <input
              type="text"
              name="shopkeeperCommission"
              value={form.shopkeeperCommission}
              onChange={handleChange}
              placeholder="Enter Commission (%)"
              className="flex-1 border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 px-6 pb-6">
          <button
            className="px-12 py-2 rounded border border-gray-300 bg-blue-100"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            className="px-12 py-2 rounded bg-blue-800 text-white"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}