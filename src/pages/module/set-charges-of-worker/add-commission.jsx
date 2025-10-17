// src/pages/module/set-commission/AddCommission.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const AddCommission = () => {
  const navigate = useNavigate();
  const [fetchData] = useFetch();

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [workerCommission, setWorkerCommission] = useState("");
  const [shopkeeperCommission, setShopkeeperCommission] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Load Categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/admin/tabs/experties`,
        });
        if (res?.success) setCategories(res.data || []);
        else toast.error("Failed to load categories");
      } catch (err) {
        console.error("Error loading categories:", err);
        toast.error("Failed to load categories");
      }
    };
    loadCategories();
  }, [fetchData]);

  // Load Sub-Categories when category changes
  useEffect(() => {
    const loadSubCategories = async () => {
      if (!category) {
        setSubCategories([]);
        setSubCategory("");
        return;
      }
      try {
        const res = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/admin/tabs/${category}/subtabs`,
        });
        if (res?.success) {
          setSubCategories(res.data || []);
        } else {
          setSubCategories([]);
          toast.error("Failed to load sub-categories");
        }
      } catch (err) {
        console.error("Error loading sub-categories:", err);
        toast.error("Failed to load sub-categories");
      }
    };
    loadSubCategories();
  }, [category, fetchData]);

  const handleBack = () => navigate("/admin/set-commission");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !workerCommission || !shopkeeperCommission) {
      toast.warning("Please fill all required fields");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        categoryId: category,
        subCategoryId: subCategory || null, // optional
        workerPercentageCommission: Number(workerCommission),
        shopkeeperPercentageCommission: Number(shopkeeperCommission),
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

        {/* Form */}
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
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.tabName}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0D2E28]" />
              </div>
            </div>

            {/* Sub-Category */}
            {subCategories.length > 0 && (
              <div className="flex items-center gap-[70px]">
                <label className="w-1/4 font-medium text-[#0D2E28]">Sub-Category:</label>
                <div className="relative flex-1">
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="appearance-none w-full font-medium h-[48px] px-4 pr-10 bg-[#CED4F2] text-[#0D2E28] border border-[#001580] rounded-lg outline-none"
                  >
                    <option value="">Select</option>
                    {subCategories.map((sub) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.tabName}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0D2E28]" />
                </div>
              </div>
            )}

            {/* Worker Commission */}
            <div className="flex items-center gap-[70px]">
              <label className="w-1/4 font-medium text-[#0D2E28]">Commission From Worker:</label>
              <input
                type="number"
                value={workerCommission}
                onChange={(e) => setWorkerCommission(e.target.value)}
                placeholder="Enter Commission (%)"
                className="flex-1 border font-medium rounded-lg px-3 py-3 border-[#001580] bg-[#CED4F2] placeholder:text-[#0D2E28] outline-none"
              />
            </div>

            {/* Shopkeeper Commission */}
            <div className="flex items-center gap-[70px]">
              <label className="w-1/4 font-medium text-[#0D2E28]">Commission From Shopkeeper:</label>
              <input
                type="number"
                value={shopkeeperCommission}
                onChange={(e) => setShopkeeperCommission(e.target.value)}
                placeholder="Enter Commission (%)"
                className="flex-1 border font-medium rounded-lg px-3 py-3 border-[#001580] bg-[#CED4F2] placeholder:text-[#0D2E28] outline-none"
              />
            </div>

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
                disabled={submitting}
                className="w-[200px] bg-[#001580] text-white px-6 py-2 rounded-lg hover:bg-[#001580]"
              >
                {submitting ? "Adding..." : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddCommission;
