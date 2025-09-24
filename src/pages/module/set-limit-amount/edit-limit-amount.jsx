import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const EditLimitAmount = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fetchData] = useFetch();
  const [category, setCategory] = useState("");
  const [limitAmount, setLimitAmount] = useState("");

  const loadData = async () => {
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/admin/limit-amount/${id}`,
      });
      if (res.success) {
        setCategory(res.data.category);
        setLimitAmount(res.data.charges);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleSubmit = async () => {
    if (!category || !limitAmount) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}/admin/limit-amount/${id}`,
        data: { category, charges: Number(limitAmount) },
      });
      if (res.success) {
        alert("Updated successfully");
        navigate("/admin/set-limit-amount");
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="p-4 bg-gray-200 min-h-screen">
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center gap-4 border-b pb-4 mb-4">
          <img
            src="/Back Button (1).png"
            onClick={() => navigate("/admin/set-limit-amount")}
            className="w-8 cursor-pointer"
            alt="Back"
          />
          <h2 className="text-lg font-semibold">Edit Limit Amount</h2>
        </div>

        <div className="border border-[#001580] rounded-lg p-6">
          <div className="mb-4 flex items-center">
            <label className="w-64 font-medium">Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 border border-[#001580] rounded p-3"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-64 font-medium">Wallet Balance Negative Limit:</label>
            <input
              type="number"
              value={limitAmount}
              onChange={(e) => setLimitAmount(e.target.value)}
              className="flex-1 border border-[#001580] rounded p-3"
            />
          </div>
        </div>

        <div className="flex justify-center mt-6 gap-4">
          <button
            className="px-6 py-2 border rounded bg-gray-100"
            onClick={() => navigate("/admin/set-limit-amount")}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-[#001580] text-white rounded"
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLimitAmount;
