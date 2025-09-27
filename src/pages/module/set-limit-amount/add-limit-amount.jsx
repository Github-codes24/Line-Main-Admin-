// src/pages/module/set-limit-amount/AddLimitAmount.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const AddLimitAmount = () => {
  const navigate = useNavigate();
  const [fetchData] = useFetch();
  const [category, setCategory] = useState("");
  const [limitAmount, setLimitAmount] = useState("");
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    const loadTabs = async () => {
      try {
        const res = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/admin/tabs/experties`,
        });
        if (res?.success) setTabs(res.data || []);
      } catch (err) {
        console.error("Error loading tabs:", err);
      }
    };
    loadTabs();
  }, [fetchData]);

  const handleBack = () => navigate("/admin/set-limit-amount");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !limitAmount) {
      alert("Please fill all fields");
      return;
    }

    try {
      const payload = {
        categoryId: category,
        nagativeLimit: Number(limitAmount),
      };

      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}/admin/limit-amount`,
        data: payload,
      });

      if (res?.success) {
        alert("Limit added successfully");
        navigate("/admin/set-limit-amount");
      } else {
        alert(res?.message || "Failed to add limit");
      }
    } catch (err) {
      console.error("Add error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex bg-[#E0E9E9] font-[Poppins] min-h-screen">
      <div className="flex-1 px-4 md:px-0 max-w-[1080px] mx-auto">
        {/* Header */}
        <div className="flex items-center bg-white px-4 py-3 rounded-lg shadow mb-4">
          <img
            src="/Back Button (1).png"
            onClick={handleBack}
            className="mr-3 cursor-pointer w-8"
            alt="Back"
          />
          <h2 className="text-lg font-medium text-[#0D2E28]">
            Add Limit Amount
          </h2>
        </div>

        {/* Main Container */}
        <div className="bg-white p-4 rounded-lg shadow min-h-[830px]">
          {/* Inner Border Form */}
          <form
            onSubmit={handleSubmit}
            className="border border-[#616666] rounded-lg p-6 space-y-6 min-h-[742px]"
          >
            {/* Category */}
            <div className="flex items-center gap-[70px]">
              <label className="w-1/4 font-medium">Category:</label>
              <div className="relative flex-1">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="appearance-none w-full h-[48px] font-medium px-4 pr-10 bg-[#CED4F2] text-[#0D2E28] border border-[#001580] rounded-lg outline-none"
                >
                  <option value="">Select</option>
                  {tabs.map((tab) => (
                    <option key={tab._id} value={tab._id}>
                      {tab.tabName}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0D2E28]" />
              </div>
            </div>

            {/* Limit Input */}
            <div className="flex items-center gap-[70px]">
              <label className="w-1/4 font-medium">
                Wallet Balance Negative Limit:
              </label>
              <input
                type="number"
                value={limitAmount}
                onChange={(e) => setLimitAmount(e.target.value)}
                placeholder="₹1000"
                className="flex-1 border font-medium rounded-lg px-3 py-3 border-[#001580] bg-[#CED4F2] placeholder:text-[#0D2E28] outline-none"
              />
            </div>
          </form>

          {/* Buttons Outside Border */}
          <div className="flex justify-center gap-4 pt-6">
            <button
              type="button"
              onClick={handleBack}
              className="w-[200px] bg-[#CED4F2] text-[#001580] px-6 py-2 rounded-lg border border-[#001580]"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-[200px] bg-[#001580] text-white px-6 py-2 rounded-lg hover:bg-[#001580]"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLimitAmount;
