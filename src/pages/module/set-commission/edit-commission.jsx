import React, { useState, useEffect } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import conf from "../../../config";
import useFetch from "../../../hook/useFetch";

export default function EditCommission() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fetchData] = useFetch();
  const [form, setForm] = useState({
    category: "",
    workerPercentageCommission: "",
    shopkeeperPercentageCommission: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Fetch single commission
  const getCommission = async () => {
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/admin/commissions/get-single-commission/${id}`,
      });
      if (res?.commission) setForm(res.commission); // ✅ corrected
    } catch (err) {
      console.error(err);
      alert("Failed to fetch commission!");
    }
  };

  useEffect(() => {
    getCommission();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}/admin/commissions/update-commission/${id}`,
        data: form,
      });
      alert("Commission updated successfully!");
      navigate("/admin/set-commission");
    } catch (err) {
      console.error(err);
      alert("Failed to update commission!");
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
          <h2 className="text-lg font-medium text-gray-800">Edit Commission</h2>
        </div>

        {/* Outer Card */}
        <div className="bg-white rounded-lg border border-gray-300 p-6">
          {/* Inner Box */}
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
                className="flex-1 border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Tiler">Tiler</option>
                <option value="Painter">Painter</option>
                <option value="AC & Refrigerator Mechanic">
                  AC & Refrigerator Mechanic
                </option>
              </select>
            </div>

            {/* Worker Commission */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="sm:w-48 text-sm font-medium text-gray-700">
                Commission From Worker:
              </label>
              <input
                type="number"
                name="workerPercentageCommission"
                value={form.workerPercentageCommission || ""}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded px-3 py-2 bg-[#d6d9fd]"
              />
            </div>

            {/* Shopkeeper Commission */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="sm:w-48 text-sm font-medium text-gray-700">
                Commission From Shopkeeper:
              </label>
              <input
                type="number"
                name="shopkeeperPercentageCommission"
                value={form.shopkeeperPercentageCommission || ""}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded px-3 py-2 bg-[#d6d9fd]"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 pt-6">
            <button
              className="px-12 py-2 rounded border border-gray-300 bg-[#cecef2]"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              className="px-12 py-2 rounded bg-[#001580] text-white"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
