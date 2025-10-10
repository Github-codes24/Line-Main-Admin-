// src/pages/module/set-charges-of-worker/EditCharges.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { CircularProgress, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const EditCharges = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fetchData] = useFetch();

  const [category, setCategory] = useState(""); // stores selected tab _id or "custom"
  const [commission, setCommission] = useState(""); // stores charges
  const [tabs, setTabs] = useState([]); // tabs fetched from backend
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [backendCategory, setBackendCategory] = useState(""); // backend category string

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch all tabs
        const tabsRes = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/admin/tabs/experties`,
        });
        if (!tabsRes?.success) throw new Error("Failed to fetch tabs");
        setTabs(tabsRes.data || []);

        // Fetch single worker charges
        const chargesRes = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/admin/worker-charges/get-single-worker-charges/${id}`,
        });
        if (!chargesRes?.success || !chargesRes.workerCharges)
          throw new Error("Failed to fetch worker charges");

        const record = chargesRes.workerCharges;
        setCommission(record.charges ?? "");
        setBackendCategory(record.category);

        // Map backend category to tab _id if exists
        const matchedTab = (tabsRes.data || []).find(
          (t) => t.tabName === record.category
        );
        if (matchedTab) {
          setCategory(matchedTab._id); // category exists in tabs
        } else {
          setCategory("custom"); // custom category not in tabs
        }
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchData, id]);

  const handleBack = () => navigate("/admin/set-charges-of-worker");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !commission) {
      toast.warning("Please fill all fields");
      return;
    }

    setSubmitting(true);
    try {
      // ✅ Payload fix: Only send "category" if custom, otherwise "tabId"
      const payload = category === "custom"
        ? { category: backendCategory, charges: Number(commission) }
        : { tabId: category, charges: Number(commission) };

      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}/admin/worker-charges/update-worker-charges/${id}`,
        data: payload,
      });

      if (res?.success) {
        toast.success("Worker charges updated successfully");
        setTimeout(() => navigate("/admin/set-charges-of-worker"), 1500);
      } else {
        toast.error(res?.message || "Failed to update charges");
      }
    } catch (err) {
      console.error(err);
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
    <div className="flex bg-[#E0E9E9] font-[Poppins] w-full min-h-screen">
      <div className="flex-1 px-4 md:px-0 m mx-auto">
        {/* Header */}
        <div className="flex items-center bg-white px-4 py-3 rounded-lg shadow mb-4">
          <img
            src="/Back Button (1).png"
            onClick={handleBack}
            className="mr-3 cursor-pointer w-8"
            alt="Back"
          />
          <h2 className="text-lg font-medium text-[#0D2E28]">Edit Charges</h2>
        </div>

        {/* Form */}
        <div className="bg-white p-4 rounded-lg shadow min-h-screen">
          <form
            onSubmit={handleSubmit}
            className="border border-[#616666] rounded-lg p-6 space-y-6 min-h-screen"
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
                  {category === "custom" && (
                    <option value="custom">{backendCategory}</option>
                  )}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0D2E28]" />
              </div>
            </div>

            {/* Commission */}
            <div className="flex items-center gap-[70px]">
              <label className="w-1/4 font-medium">Commission from Worker:</label>
              <input
                type="number"
                value={commission}
                onChange={(e) => setCommission(e.target.value)}
                placeholder="Enter commission"
                className="flex-1 border font-medium rounded-lg px-3 py-3 border-[#001580] bg-[#CED4F2] placeholder:text-[#0D2E28] outline-none"
              />
            </div>
          </form>

          {/* Buttons */}
          <div className="flex justify-center gap-4 pt-6">
            <button
              type="button"
              onClick={handleBack}
              className="w-[200px] bg-[#CECEF2] text-[#001580] px-6 py-2 rounded-lg border border-[#001580]"
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

export default EditCharges;
