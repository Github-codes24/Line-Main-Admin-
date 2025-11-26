// src/pages/module/set-limit-amount/AddLimitAmount.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const AddLimitAmount = () => {
  const navigate = useNavigate();
  const [fetchData] = useFetch();

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [limitAmount, setLimitAmount] = useState("");
  const [roles, setRoles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Fetch categories + subcategories
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const res = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/admin/tabs/worker-roles`,
        });

        if (res?.success) {
          setRoles(res.roles || []);

          // Extract unique categories
          const uniqueCategories = [];
          res.roles.forEach((role) => {
            if (role.category && !uniqueCategories.some(c => c.category === role.category)) {
              uniqueCategories.push(role);
            }
          });
          setCategories(uniqueCategories);
        } else {
          toast.error("Failed to load categories");
        }
      } catch (err) {
        console.error("Error loading roles:", err);
        toast.error("Failed to load data");
      }
    };
    loadRoles();
  }, [fetchData]);

  // Update subcategories when category changes
  useEffect(() => {
    if (category) {
      const filtered = roles.filter(
        (r) => r.category === category && r.subCategory
      );
      setFilteredSubCategories(filtered);
      setSubCategory(""); // reset subcategory selection
    } else {
      setFilteredSubCategories([]);
      setSubCategory("");
    }
  }, [category, roles]);

  const handleBack = () => navigate("/admin/set-limit-amount");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !limitAmount) {
      toast.warning("Please fill all required fields");
      return;
    }

    const payload = {
      categoryId: category,
      subCategoryId: subCategory || null,
      nagativeLimit: Number(limitAmount),
    };

    setSubmitting(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}/admin/limit-amount`,
        data: payload,
      });

      if (res?.success) {
        toast.success("Limit added successfully!");
        setTimeout(() => navigate("/admin/set-limit-amount"), 1500);
      } else {
        toast.error(res?.message || "Failed to add limit");
      }
    } catch (err) {
      console.error("Error adding limit:", err);
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
          <h2 className="text-lg font-medium text-[#0D2E28]">Add Limit Amount</h2>
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
                    <option key={cat.category} value={cat.category}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0D2E28]" />
              </div>
            </div>

            {/* Sub-Category (always same style, disabled until category selected) */}
            {/* Sub-Category (always same style) */}
<div className="flex items-center gap-[70px]">
  <label className="w-1/4 font-medium text-[#0D2E28]">Sub Category:</label>
  <div className="relative flex-1">
    <select
      value={subCategory}
      onChange={(e) => {
        if (category) setSubCategory(e.target.value);
      }}
      className="appearance-none w-full font-medium h-[48px] px-4 pr-10 bg-[#CED4F2] text-[#0D2E28] border border-[#001580] rounded-lg outline-none"
    >
      <option value="">Select</option>
      {category &&
        filteredSubCategories.map((sub) => (
          <option key={sub.subCategory} value={sub.subCategory}>
            {sub.name}
          </option>
        ))}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0D2E28]" />
  </div>
</div>


            {/* Wallet Balance Negative Limit */}
            <div className="flex items-center gap-[70px]">
              <label className="w-1/4 font-medium text-[#0D2E28]">
                Wallet Balance Negative Limit:
              </label>
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
              {submitting ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddLimitAmount;
