// src/pages/module/set-commission/ViewCommission.jsx
import React, { useEffect, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

export default function ViewCommission() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fetchData] = useFetch();

  const [commission, setCommission] = useState({});
  const [loading, setLoading] = useState(false);

  const getCommission = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/admin/commissions/get-single-commission/${id}`,
      });
      if (res?.commission) setCommission(res.commission);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch commission!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCommission();
  }, [id]);

  const handleEdit = () => navigate(`/admin/set-commission/edit/${id}`);
  const handleBack = () => navigate("/admin/set-commission");

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading commission data...</Typography>
      </div>
    );
  }

  return (
    <div className="flex bg-[#E0E9E9] font-[Poppins] w-full min-h-screen">
      <div className="flex-1 px-4 md:px-0 mx-auto">
        {/* Header */}
        <div className="flex items-center bg-white px-4 py-3 rounded-lg shadow mb-4">
          <IoArrowBackCircleOutline
            size={30}
            className="mr-3 cursor-pointer text-[#0D2E28]"
            onClick={handleBack}
          />
          <h2 className="text-lg font-medium text-[#0D2E28]">View Commission</h2>
        </div>

        {/* Main Container */}
        <div className="bg-white p-4 rounded-lg shadow min-h-[830px]">
          <div className="border border-[#616666] rounded-lg p-6 min-h-[742px] space-y-6">
            {/* Category */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-[70px] gap-3">
              <label className="md:w-1/4 font-medium text-[#0D2E28]">
                Category:
              </label>
              <input
                type="text"
                value={commission.category || ""}
                readOnly
                className="flex-1 border font-medium rounded-lg px-3 py-3 border-[#001580] bg-[#E4E5EB] text-[#0D2E28] outline-none"
              />
            </div>

            {/* Worker Commission */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-[70px] gap-3">
              <label className="md:w-1/4 font-medium text-[#0D2E28]">
                Commission From Worker:
              </label>
              <input
                type="text"
                value={`${commission.workerPercentageCommission ?? ""} %`}
                readOnly
                className="flex-1 border font-medium rounded-lg px-3 py-3 border-[#001580] bg-[#E4E5EB] text-[#0D2E28] outline-none"
              />
            </div>

            {/* Shopkeeper Commission */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-[70px] gap-3">
              <label className="md:w-1/4 font-medium text-[#0D2E28]">
                Commission From Shopkeeper:
              </label>
              <input
                type="text"
                value={`${commission.shopkeeperPercentageCommission ?? ""} %`}
                readOnly
                className="flex-1 border font-medium rounded-lg px-3 py-3 border-[#001580] bg-[#E4E5EB] text-[#0D2E28] outline-none"
              />
            </div>
          </div>

          {/* Button Section */}
          <div className="flex justify-center gap-4 pt-6">
            <button
              type="button"
              onClick={handleEdit}
              className="w-[200px] bg-[#001580] text-white px-6 py-2 rounded-lg hover:bg-[#001580] border border-[#001580]"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
