// src/pages/module/set-commission/EditCommission.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { CircularProgress, Typography } from "@mui/material";
import conf from "../../../config";
import useFetch from "../../../hook/useFetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCommission = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fetchData] = useFetch();

  const [form, setForm] = useState({
    category: "",
    workerCommission: "",
    shopkeeperCommission: "",
  });
  const [tabs, setTabs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ Fetch commission + categories
  const loadData = async () => {
    setLoading(true);
    try {
      const [tabsRes, commissionRes] = await Promise.all([
        fetchData({ method: "GET", url: `${conf.apiBaseUrl}/admin/tabs/experties` }),
        fetchData({ method: "GET", url: `${conf.apiBaseUrl}/admin/commissions/get-single-commission/${id}` }),
      ]);

      if (tabsRes?.success) setTabs(tabsRes.data || []);

      if (commissionRes?.commission) {
        setForm({
          category: commissionRes.commission.category?._id || "",
          workerCommission: commissionRes.commission.workerPercentageCommission || "",
          shopkeeperCommission: commissionRes.commission.shopkeeperPercentageCommission || "",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load commission data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  // ✅ Update Commission API
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!form.category || !form.workerCommission || !form.shopkeeperCommission) {
      toast.warning("Please fill all fields");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        categoryId: form.category,
        workerPercentageCommission: Number(form.workerCommission),
        shopkeeperPercentageCommission: Number(form.shopkeeperCommission),
      };

      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}/admin/commissions/update-commission/${id}`,
        data: payload,
      });

      if (res?.success) {
        toast.success("Commission updated successfully");
        setTimeout(() => navigate("/admin/set-commission"), 1500);
      } else {
        toast.error(res?.message || "Failed to update commission");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

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
          <img
            src="/Back Button (1).png"
            onClick={handleBack}
            className="mr-3 cursor-pointer w-8"
            alt="Back"
          />
          <h2 className="text-lg font-medium text-[#0D2E28]">Edit Commission</h2>
        </div>

        {/* Form Container */}
        <div className="bg-white p-4 rounded-lg shadow min-h-screen">
          <form
            onSubmit={handleUpdate}
            className="border border-[#616666] rounded-lg p-6 space-y-6 min-h-screen"
          >
            {/* Category */}
            <div className="flex items-center gap-[70px]">
              <label className="w-1/4 font-medium">Category:</label>
              <div className="relative flex-1">
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
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

            {/* Worker Commission */}
            <div className="flex items-center gap-[70px]">
              <label className="w-1/4 font-medium">Commission From Worker (%):</label>
              <input
                type="number"
                name="workerCommission"
                value={form.workerCommission}
                onChange={handleChange}
                placeholder="Enter worker commission"
                className="flex-1 border font-medium rounded-lg px-3 py-3 border-[#001580] bg-[#CED4F2] placeholder:text-[#0D2E28] outline-none"
              />
            </div>

            {/* Shopkeeper Commission */}
            <div className="flex items-center gap-[70px]">
              <label className="w-1/4 font-medium">Commission From Shopkeeper (%):</label>
              <input
                type="number"
                name="shopkeeperCommission"
                value={form.shopkeeperCommission}
                onChange={handleChange}
                placeholder="Enter shopkeeper commission"
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
              onClick={handleUpdate}
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

export default EditCommission;
