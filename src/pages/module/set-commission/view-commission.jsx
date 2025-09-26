import React, { useState, useEffect } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import conf from "../../../config";
import useFetch from "../../../hook/useFetch";

export default function ViewCommission() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fetchData] = useFetch();
  const [commission, setCommission] = useState({});

  const getCommission = async () => {
  try {
    const res = await fetchData({
      method: "GET",
      url: `${conf.apiBaseUrl}/admin/commissions/get-single-commission/${id}`,
    });
    if (res?.commission) setCommission(res.commission); // ✅ correct key
  } catch (err) {
    console.error(err);
    alert("Failed to fetch commission!");
  }
};


  useEffect(() => {
    getCommission();
  }, [id]);

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
          <h2 className="text-lg font-medium text-gray-800">
            View Commission Details
          </h2>
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
              <input
                type="text"
                value={commission.category || ""}
                readOnly
                className="flex-1 border border-gray-300 rounded px-3 py-2 bg-[#d6d9fd]"
              />
            </div>

            {/* Worker Commission */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="sm:w-48 text-sm font-medium text-gray-700">
                Commission From Worker:
              </label>
              <input
                type="text"
                value={
                  commission.workerPercentageCommission
                    ? `${commission.workerPercentageCommission} %`
                    : ""
                }
                readOnly
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
                value={
                  commission.shopkeeperPercentageCommission
                    ? `${commission.shopkeeperPercentageCommission} %`
                    : ""
                }
                readOnly
                className="flex-1 border border-gray-300 rounded px-3 py-2 bg-[#d6d9fd]"
              />
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex justify-center pt-6">
            <button
              className="px-12 py-2 rounded bg-[#001580] text-white"
              onClick={() => navigate(`/admin/set-commission/edit/${id}`)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
