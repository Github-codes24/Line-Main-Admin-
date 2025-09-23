import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const AddLimitAmount = () => {
  const navigate = useNavigate();
  const [fetchData] = useFetch();
  const [category, setCategory] = useState("");
  const [limitAmount, setLimitAmount] = useState("");

  const handleBack = () => navigate("/admin/set-limit-amount");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}/admin/limit-amount`,
        data: { category, charges: Number(limitAmount) },
      });
      if (res.success) {
        alert("Limit added successfully");
        navigate("/admin/set-limit-amount");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col font-medium text-[#0D2E28] p-2 h-full font-[Poppins]">
      {/* Header */}
      <div className="flex items-center bg-white border rounded-lg shadow p-3 mb-4">
        <img
          src="/Back Button (1).png"
          onClick={handleBack}
          className="mr-3 cursor-pointer w-8"
          alt="Back"
        />
        <h2 className="text-lg font-semibold text-gray-800">Add Limit Amount</h2>
      </div>

      {/* Form */}
      <div className="bg-white p-4 rounded-lg shadow-md h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#616666] rounded-lg p-6 space-y-6 h-[85%]"
        >
          <div className="flex items-center gap-[24px] h-[62px]">
            <label className="font-medium w-64 text-lg">Category:</label>
            <div className="relative w-[644px]">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="appearance-none w-full h-[62px] px-4 pr-10 bg-[#CED4F2] text-[#0D2E28] border border-[#001580] rounded-lg outline-none"
              >
                <option value="">Select</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Painter">Painter</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0D2E28]" />
            </div>
          </div>

          <div className="flex items-center gap-[24px] h-[62px]">
            <label className="font-medium w-64 text-lg">
              Wallet Balance Negative Limit:
            </label>
            <input
              type="number"
              value={limitAmount}
              onChange={(e) => setLimitAmount(e.target.value)}
              placeholder="₹1000"
              className="w-[644px] h-[62px] px-4 bg-[#CED4F2] border border-[#001580] rounded-lg text-[#0D2E28] placeholder:text-black outline-none"
            />
          </div>
        </form>

        <div className="flex justify-center gap-4 pt-4">
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
            className="w-[200px] bg-[#001580] text-white px-6 py-2 rounded-lg hover:bg-[#000e5a]"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLimitAmount;
