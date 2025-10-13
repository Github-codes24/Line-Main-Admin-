import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { CircularProgress, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const AddCommission = () => {
  const navigate = useNavigate();
  const [fetchData] = useFetch();

  const [category, setCategory] = useState(""); // store exact category string
  const [charges, setCharges] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // allowed categories as per backend validation
  const allowedCategories = [
    "Electrician",
    "Plumber",
    "Tiler",
    "Painter",
    "AC & Refrigerator Mechanic",
  ];

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/admin/tabs/experties`,
        });

        if (res?.success) {
          // filter tabs that match allowed categories
          const filtered = res.data.filter((tab) =>
            allowedCategories.includes(tab.tabName)
          );
          setCategories(filtered);
        } else {
          toast.error("Failed to load categories");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [fetchData]);

  const handleBack = () => navigate("/admin/set-charges-of-worker");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || charges === "") {
      toast.warning("Please fill all fields");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        category, // exact string required by backend
        charges: Number(charges),
      };

      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}/admin/worker-charges/add-worker-charges`,
        data: payload,
      });

      if (res?.success) {
        toast.success("Charges added successfully");
        setTimeout(() => navigate("/admin/set-charges-of-worker"), 1500);
      } else {
        toast.error(res?.message || "Failed to add charges");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong!");
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
      <div className="flex-1 px-4 md:px-0 mx-auto">
        {/* Header */}
        <div className="flex items-center bg-white px-4 py-3 rounded-lg shadow mb-4">
          <img
            src="/Back Button (1).png"
            onClick={handleBack}
            className="mr-3 cursor-pointer w-8"
            alt="Back"
          />
          <h2 className="text-lg font-medium text-[#0D2E28]">Add Commission</h2>
        </div>

        {/* Form Container */}
        <div className="bg-white p-4 rounded-lg shadow min-h-screen">
          <form
            onSubmit={handleSubmit}
            className="border border-[#616666] rounded-lg p-6 space-y-6 min-h-screen"
          >
            {/* Category */}
            <div className="flex items-center gap-[70px]">
              <label className="w-1/4 font-medium text-[#0D2E28]">Category:</label>
              <div className="relative flex-1">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="appearance-none w-full font-medium h-[48px] px-4 pr-10 bg-[#CED4F2] text-[#0D2E28] border border-[#001580] rounded-lg outline-none"
                >
                  <option value="">Select</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c.tabName}>
                      {c.tabName}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#0D2E28]" />
              </div>
            </div>

            {/* Charges */}
            <div className="flex items-center gap-[70px]">
              <label className="w-1/4 font-medium text-[#0D2E28]">Set Charges:</label>
              <input
                type="number"
                value={charges}
                onChange={(e) => setCharges(e.target.value)}
                placeholder="Enter Charges"
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
              className="w-[200px] bg-[#001580] text-white px-6 py-2 rounded-lg hover:bg-[#001580] disabled:opacity-50"
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
