// src/pages/module/set-commission/AddCommission.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";
import { ChevronDown } from "lucide-react";

const AddCommission = () => {
  const navigate = useNavigate();
  const [fetchData] = useFetch();

  const [form, setForm] = useState({
    category: "",
    workerCommission: "",
    shopkeeperCommission: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Fetch categories dropdown
  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/admin/tabs/experties`,
        });
        if (res?.success) {
          // Use tabName for value to satisfy backend validation
          setCategories(res.data || []);
        }
      } catch (err) {
        console.error("Error loading categories:", err);
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category || !form.workerCommission || !form.shopkeeperCommission) {
      toast.warning("Please fill all fields");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        category: form.category, // send string, not _id
        workerPercentageCommission: Number(form.workerCommission),
        shopkeeperPercentageCommission: Number(form.shopkeeperCommission),
      };

      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}/admin/commissions/add-commission`,
        data: payload,
      });

      if (res?.success) {
        toast.success("Commission added successfully!");
        setTimeout(() => navigate("/admin/set-commission"), 1500);
      } else {
        toast.error(res?.message || "Failed to add commission");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <CircularProgress size={40} />
        <Typography sx={{ mt: 1 }}>Loading categories...</Typography>
      </div>
    );

  return (
    <div className="flex bg-[#E0E9E9] font-[Poppins] min-h-screen">
      <div className="flex-1 px-4 md:px-0 max-w-[1080px] mx-auto">
        {/* Header */}
        <div className="flex items-center bg-white px-4 py-3 rounded-lg shadow mb-4">
          <img
            src="/Back Button (1).png"
            onClick={() => navigate("/admin/set-commission")}
            className="mr-3 cursor-pointer w-8"
            alt="Back"
          />
          <h2 className="text-lg font-medium text-[#0D2E28]">Add Commission</h2>
        </div>

        {/* Form */}
        <div className="bg-white p-4 rounded-lg shadow min-h-[700px]">
          <form
            onSubmit={handleSubmit}
            className="border border-[#616666] rounded-lg p-6 space-y-6 min-h-[600px]"
          >
            {/* Category */}
            <div className="flex items-center gap-[70px]">
              <label className="w-1/4 font-medium">Category:</label>
              <div className="relative flex-1">
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="appearance-none w-full h-[48px] font-medium px-4 pr-10 bg-[#CED4F2] focus:bg-[#CED4F2] text-[#0D2E28] border border-[#001580] rounded-lg outline-none"
                >
                  <option value="">Select</option>
                  {categories.map((cat) => (
                    <option key={cat.tabName} value={cat.tabName}>
                      {cat.tabName}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0D2E28]" />
              </div>
            </div>

            {/* Worker Commission */}
            <div className="flex items-center gap-[70px]">
              <label className="w-1/4 font-medium">Commission From Worker:</label>
              <input
                type="number"
                name="workerCommission"
                value={form.workerCommission}
                onChange={handleChange}
                placeholder="Enter Commission (%)"
                className="flex-1 border font-medium rounded-lg px-3 py-3 border-[#001580] bg-[#CED4F2] focus:bg-[#CED4F2] placeholder:text-[#0D2E28] outline-none"
              />
            </div>

            {/* Shopkeeper Commission */}
            <div className="flex items-center gap-[70px]">
              <label className="w-1/4 font-medium">Commission From Shopkeeper:</label>
              <input
                type="number"
                name="shopkeeperCommission"
                value={form.shopkeeperCommission}
                onChange={handleChange}
                placeholder="Enter Commission (%)"
                className="flex-1 border font-medium rounded-lg px-3 py-3 border-[#001580] bg-[#CED4F2] focus:bg-[#CED4F2] placeholder:text-[#0D2E28] outline-none"
              />
            </div>
          </form>

          {/* Buttons */}
          <div className="flex justify-center gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate("/admin/set-commission")}
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
              {submitting ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddCommission;