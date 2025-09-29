// AddCommission.jsx
import React, { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import conf from "../../../config";

/* --- token helper (same logic as other components) --- */
function getStoredToken() {
  try {
    const keys = ["token", "accessToken", "authToken", "access_token"];
    for (const k of keys) {
      const v = localStorage.getItem(k) || sessionStorage.getItem(k);
      if (v) return v;
    }
    const cookies = document.cookie.split(";").map((c) => c.trim());
    for (const c of cookies) {
      if (c.startsWith("token=")) return decodeURIComponent(c.split("=")[1]);
      if (c.startsWith("accessToken=")) return decodeURIComponent(c.split("=")[1]);
      if (c.startsWith("access_token=")) return decodeURIComponent(c.split("=")[1]);
    }
    return null;
  } catch (e) {
    return null;
  }
}

/* --- axios instance with Authorization header --- */
const base = conf?.apiBaseUrl || "https://linemen-be-1.onrender.com";
const api = axios.create({ baseURL: base, timeout: 15000 });
api.interceptors.request.use((cfg) => {
  const token = getStoredToken();
  if (token) {
    cfg.headers = cfg.headers || {};
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  if (!cfg.headers?.["Content-Type"] && cfg.data) {
    cfg.headers["Content-Type"] = "application/json";
  }
  return cfg;
});

export default function AddCommission() {
  const navigate = useNavigate();

  // controlled form state
  const [category, setCategory] = useState("");
  const [operation, setOperation] = useState(""); // optional, kept for UI compatibility
  const [charges, setCharges] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    "Electrician",
    "Plumbing",
    "Tiler",
    "Painter",
    "AC & Refrigerator Mechanic",
  ];

  const operations = [
    "Board Fitting",
    "Plumber",
    "Tile Fitting",
    "Wall Painting",
    "Refrigerator Repair",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!category) {
      toast.error("Please select a category.");
      return;
    }
    if (charges === "" || isNaN(Number(charges)) || Number(charges) < 0) {
      toast.error("Please enter a valid positive charges amount.");
      return;
    }

    const payload = {
      category,
      charges: Number(charges),
      // if backend expects operation field, include it; remove if not needed
      operation: operation || undefined,
    };

    try {
      setIsLoading(true);
      const res = await api.post("/admin/worker-charges/add-worker-charges", payload);

      const data = res?.data;
      if (data && data.success === true) {
        toast.success(data.message || "Charges added successfully");
        // navigate back to charges list after brief pause so user sees toast
        setTimeout(() => navigate("/admin/set-charges-of-worker"), 800);
      } else if (data && data.success === false) {
        // handle access denied or validation errors from server
        const msg = data.message || "Failed to add charges";
        if (msg.toLowerCase().includes("access denied") || res.status === 401) {
          const stored = getStoredToken();
          if (!stored) {
            toast.error("Authentication required — please login.");
            setTimeout(() => navigate("/login"), 800);
            return;
          }
          toast.error(msg);
        } else {
          toast.error(msg);
        }
      } else {
        // unexpected shape
        toast.success("Charges added (response shape unexpected).");
        setTimeout(() => navigate("/admin/set-charges-of-worker"), 800);
      }
    } catch (err) {
      console.error("Add charges error:", err);
      const serverMsg = err?.response?.data?.message || err?.message || "Failed to add charges";
      if (serverMsg.toLowerCase().includes("access denied")) {
        const stored = getStoredToken();
        if (!stored) {
          toast.error("Authentication required — please login.");
          setTimeout(() => navigate("/login"), 800);
        } else {
          toast.error("Session expired or invalid. Please login again.");
          localStorage.removeItem("token");
          localStorage.removeItem("accessToken");
          sessionStorage.removeItem("token");
          setTimeout(() => navigate("/login"), 800);
        }
      } else {
        toast.error(serverMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 max-h-screen p-4">
      <ToastContainer />
      <div>
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-300 mb-2">
          <div className="flex items-center p-4 bg-white rounded-lg border-b border-gray-300">
            <button
              className="text-gray-600 hover:text-gray-800 mr-3"
              onClick={() => navigate(-1)}
              title="Back"
            >
              <IoArrowBackCircleOutline size={30} />
            </button>
            <h2 className="text-lg font-medium text-gray-800">Add Commission</h2>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg pt-3">
          <div
            className="border border-gray-300 rounded-lg px-6 py-8 mb-4 mx-4"
            style={{ marginTop: "10px" }}
          >
            <div className="space-y-6">
              {/* Category */}
              <div className="flex items-center">
                <label className="w-48 text-sm font-medium text-gray-700">Category :</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                >
                  <option value="">Select</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Crud Operations (optional) */}
              <div className="flex items-center">
                <label className="w-48 text-sm font-medium text-gray-700">Crud Operations :</label>
                <select
                  value={operation}
                  onChange={(e) => setOperation(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                >
                  <option value="">Select (optional)</option>
                  {operations.map((op) => (
                    <option key={op} value={op}>
                      {op}
                    </option>
                  ))}
                </select>
              </div>

              {/* Charges */}
              <div className="flex items-center">
                <label className="w-48 text-sm font-medium text-gray-700"> Set Charges :</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={charges}
                  onChange={(e) => setCharges(e.target.value)}
                  placeholder="Enter Charges "
                  className="flex-1 border border-gray-300 rounded px-3 py-2 bg-white placeholder-gray-500 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-center gap-4 px-6 pb-6">
            <button
              type="button"
              className="px-12 py-2 rounded border border-gray-300 bg-blue-100 text-gray-700 hover:bg-blue-200 transition-colors"
              onClick={() => navigate(-1)}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-12 py-2 rounded bg-blue-800 text-white hover:bg-blue-900 transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
