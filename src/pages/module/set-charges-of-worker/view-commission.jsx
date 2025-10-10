import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import conf from "../../../config";
import useFetch from "../../../hook/useFetch";

const ViewCommission = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fetchData] = useFetch();

  const [category, setCategory] = useState("");
  const [charges, setCharges] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/admin/worker-charges/get-single-worker-charges/${id}`,
        });

        if (res?.success) {
          const record = res.data || res.workerCharge || res.workerCharges || res;
          setCategory(record.category || "N/A");
          setCharges(record.charges ?? "N/A");
        } else {
          toast.error(res?.message || "Failed to load data");
        }
      } catch (err) {
        console.error("Error loading data:", err);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchData, id]);

  const handleBack = () => navigate("/admin/set-charges-of-worker");
  const handleEdit = () => navigate(`/admin/set-charges-of-worker/edit/${id}`);

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
      <ToastContainer />
      <div className="flex-1 px-4 md:px-0 m mx-auto">
        {/* Header */}
        <div className="flex items-center bg-white px-4 py-3 rounded-lg shadow mb-4">
          <img
            src="/Back Button (1).png"
            onClick={handleBack}
            className="mr-3 cursor-pointer w-8"
            alt="Back"
          />
          <h2 className="text-lg font-medium text-[#0D2E28]">
            View Commission Details
          </h2>
        </div>

        {/* Main Container */}
        <div className="bg-white p-4 rounded-lg shadow min-h-[830px]">
          <div className="border border-[#616666] rounded-lg p-6 min-h-[742px] space-y-6">
            <div className="flex items-center gap-[70px]">
              <label className="w-1/4 font-medium">Category:</label>
              <input
                type="text"
                value={category}
                readOnly
                className="flex-1 border font-medium rounded-lg px-3 py-3 border-[#001580] bg-[#E4E5EB] text-[#0D2E28] outline-none"
              />
            </div>

            <div className="flex items-center gap-[70px]">
              <label className="w-1/4 font-medium">Charges:</label>
              <input
                type="text"
                value={charges}
                readOnly
                className="flex-1 font-medium border rounded-lg px-3 py-3 border-[#001580] bg-[#E4E5EB] text-[#0D2E28] outline-none"
              />
            </div>
          </div>

          {/* Buttons */}
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
};

export default ViewCommission;
