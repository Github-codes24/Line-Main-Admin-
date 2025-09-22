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
      if(res?.data) setCommission(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch commission!");
    }
  };

  useEffect(() => {
    getCommission();
  }, [id]);

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
          <h2 className="text-lg font-medium text-gray-800">View Commission</h2>
        </div>

        <div className="border border-gray-300 rounded-lg px-6 py-12 mb-4 ml-4 mr-4 mt-4 space-y-6">
          <div className="flex items-center">
            <label className="w-48 text-sm font-medium text-gray-700">Category:</label>
            <input
              type="text"
              value={commission.category || ""}
              readOnly
              className="flex-1 border border-gray-300 rounded px-3 py-2 bg-gray-100"
            />
          </div>

          <div className="flex items-center">
            <label className="w-48 text-sm font-medium text-gray-700">Crud Operations:</label>
            <input
              type="text"
              value={commission.operation || ""}
              readOnly
              className="flex-1 border border-gray-300 rounded px-3 py-2 bg-gray-100"
            />
          </div>

          <div className="flex items-center">
            <label className="w-48 text-sm font-medium text-gray-700">Commission From Worker:</label>
            <input
              type="text"
              value={commission.workerCommission || ""}
              readOnly
              className="flex-1 border border-gray-300 rounded px-3 py-2 bg-gray-100"
            />
          </div>

          <div className="flex items-center">
            <label className="w-48 text-sm font-medium text-gray-700">Commission From Shopkeeper:</label>
            <input
              type="text"
              value={commission.shopkeeperCommission || ""}
              readOnly
              className="flex-1 border border-gray-300 rounded px-3 py-2 bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}