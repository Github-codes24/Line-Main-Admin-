import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const ViewLimitAmount = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fetchData] = useFetch();
  const [data, setData] = useState({});

  const loadData = async () => {
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/admin/limit-amount/${id}`,
      });
      if (res.success) setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

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
          <h2 className="text-lg font-semibold">View Limit Amount</h2>
        </div>

        <div className="border border-[#001580] rounded-lg p-6">
          <div className="mb-4 flex items-center">
            <label className="w-64 font-medium">Category:</label>
            <span className="flex-1 p-3 bg-gray-100 rounded">{data.category}</span>
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-64 font-medium">Wallet Balance Negative Limit:</label>
            <span className="flex-1 p-3 bg-gray-100 rounded">₹{data.charges}</span>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-2 border rounded bg-gray-100"
            onClick={() => navigate("/admin/set-limit-amount")}
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewLimitAmount;
