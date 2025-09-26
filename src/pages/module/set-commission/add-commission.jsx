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
    <div className="bg-gray-200 min-h-screen p-2">
      <div className="mx-auto">
        {/* Top Navbar */}
        <div className="flex items-center p-4 bg-white rounded-lg border border-gray-300 mb-3">
          <button
            className="text-black hover:text-gray-800 mr-3"
            onClick={() => navigate(-1)}
          >
            <IoArrowBackCircleOutline size={30} />
          </button>
          <h2 className="text-lg font-medium text-gray-800">Add Commission</h2>
        </div>

        {/* Outer Form Card */}
        <div className="bg-white rounded-lg border border-gray-300 p-6">
          {/* Inner Box (newly added) */}
          <div className="border border-gray-300 rounded-lg p-6 space-y-6">
            {/* Category */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
              <label className="sm:w-48 text-sm font-medium text-gray-700">
                Category:
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded px-3 py-2 bg-[#d6d9fd]"
              >
                <option>Select</option>
                <option>Electrician</option>
                <option>Plumbing</option>
                <option>Tiler</option>
                <option>Painter</option>
                <option>AC & Refrigerator Mechanic</option>
              </select>
            </div>

            {/* Worker Commission */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="sm:w-48 text-sm font-medium text-gray-700">
                Commission From Worker:
              </label>
              <input
                type="text"
                name="workerCommission"
                value={form.workerCommission}
                onChange={handleChange}
                placeholder="Enter Commission (%)"
                className="flex-1 border border-gray-300 rounded px-3 py-2 bg-[#d6d9fd]"
              />
            </div>

            {/* Shopkeeper Commission */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="sm:w-48 text-sm font-medium text-gray-700">
                Commission From Shopkeeper:
              </label>
              <input
                type="text"
                name="shopkeeperCommission"
                value={form.shopkeeperCommission}
                onChange={handleChange}
                placeholder="Enter Commission (%)"
                className="flex-1 border border-gray-300 rounded px-3 py-2 bg-[#d6d9fd]"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <button
              className="w-full sm:w-auto px-12 py-2 rounded border border-gray-300 bg-[#cecef2]"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              className="w-full sm:w-auto px-12 py-2 rounded bg-[#001580] text-white"
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
