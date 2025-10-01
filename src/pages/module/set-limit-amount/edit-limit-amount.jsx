// src/pages/module/set-limit-amount/EditLimitAmount.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { CircularProgress, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const EditLimitAmount = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fetchData] = useFetch();
  const [category, setCategory] = useState("");
  const [limitAmount, setLimitAmount] = useState("");
  const [tabs, setTabs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [tabsRes, limitRes] = await Promise.all([
          fetchData({ method: "GET", url: `${conf.apiBaseUrl}/admin/tabs/experties` }),
          fetchData({ method: "GET", url: `${conf.apiBaseUrl}/admin/limit-amount/${id}` }),
        ]);
        if (tabsRes?.success) setTabs(tabsRes.data || []);
        if (limitRes?.success) {
          setCategory(limitRes.data.category?._id || "");
          setLimitAmount(limitRes.data.nagativeLimit ?? "");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchData, id]);

  const handleBack = () => navigate("/admin/set-limit-amount");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !limitAmount) {
      toast.warning("Please fill all fields");
      return;
    }
    setSubmitting(true);
    try {
      const payload = { categoryId: category, nagativeLimit: Number(limitAmount) };
      const res = await fetchData({ method: "PUT", url: `${conf.apiBaseUrl}/admin/limit-amount`, data: payload });
      if (res?.success) {
        toast.success("Limit updated successfully");
        setTimeout(() => navigate("/admin/set-limit-amount"), 1500);
      } else {
        toast.error(res?.message || "Failed to update limit");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading data...</Typography>
      </div>
    );
  }

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
          <h2 className="text-lg font-medium text-[#0D2E28]">Edit Limit Amount</h2>
        </div>

        {/* Form Container */}
        <div className="bg-white p-4 rounded-lg shadow min-h-[830px]">
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
                  className="appearance-none w-full font-medium h-[48px] px-4 pr-10 bg-[#CED4F2] text-[#0D2E28] border border-[#001580] rounded-lg outline-none"
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

            {/* Limit */}
            <div className="flex items-center gap-[70px]">
              <label className="w-1/4 font-medium">Wallet Balance Negative Limit:</label>
              <input
                type="number"
                value={limitAmount}
                onChange={(e) => setLimitAmount(e.target.value)}
                placeholder="₹1000"
                className="flex-1 border font-medium rounded-lg px-3 py-3 border-[#001580] bg-[#CED4F2] placeholder:text-[#0D2E28] outline-none"
              />
            </div>
          </form>

          {/* Buttons */}
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
              disabled={submitting}
              className="w-[200px] bg-[#001580] text-white px-6 py-2 rounded-lg hover:bg-[#001580]"
            >
              {submitting ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EditLimitAmount;
