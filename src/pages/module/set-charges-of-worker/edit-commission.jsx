import React, { useEffect, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import conf from "../../../config";

/* --- Token helper --- */
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

/* --- Axios instance with Authorization --- */
const base = conf?.apiBaseUrl || "https://linemen-be-1.onrender.com";
const api = axios.create({ baseURL: base, timeout: 15000 });
api.interceptors.request.use((cfg) => {
  const token = getStoredToken();
  if (token) {
    cfg.headers = cfg.headers || {};
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  if (cfg.data && !cfg.headers?.["Content-Type"]) {
    cfg.headers["Content-Type"] = "application/json";
  }
  return cfg;
});

export default function EditCommission() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const preloaded = location?.state?.item || null;

  const [category, setCategory] = useState("");
  const [operation, setOperation] = useState("");
  const [charges, setCharges] = useState("");
  const [isLoading, setIsLoading] = useState(!preloaded);

  const categories = [
    "Electrician",
    "Plumber",
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

  /* Fetch current commission data */
  useEffect(() => {
    if (preloaded) {
      setCategory(preloaded.category || "");
      setOperation(preloaded.operation || "");
      setCharges(preloaded.charges || "");
      return;
    }

    const fetchData = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const res = await api.get(
          `/admin/worker-charges/get-single-worker-charges/${encodeURIComponent(id)}`
        );
        const data = res?.data?.workerCharge || res?.data?.data || res?.data;
        setCategory(data.category || "");
        setOperation(data.operation || "");
        setCharges(data.charges || "");
      } catch (err) {
        const msg = err?.response?.data?.message || err?.message || "Failed to fetch data";
        toast.error(msg);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, preloaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category) {
      toast.error("Please select a category.");
      return;
    }
    if (charges === "" || isNaN(Number(charges)) || Number(charges) < 0) {
      toast.error("Please enter valid positive charges.");
      return;
    }

    const payload = {
      category,
      operation: operation || undefined,
      charges: Number(charges),
    };

    try {
      setIsLoading(true);
      const res = await api.put(
        `/admin/worker-charges/update-worker-charges/${encodeURIComponent(id)}`,
        payload
      );

      if (res.data?.success) {
        toast.success(res.data.message || "Commission updated successfully!");
        setTimeout(() => navigate(-1), 800);
      } else if (res.data?.message?.includes("already exists")) {
        toast.error("Worker charges for this category and operation already exists.");
      } else {
        toast.error(res.data?.message || "Failed to update commission");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Error updating commission";
      toast.error(msg);
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
            <h2 className="text-lg font-medium text-gray-800">Edit Commission</h2>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg pt-3">
          <div
            className="border border-gray-300 rounded-lg px-6 py-12 mb-4 mx-4"
            style={{ marginTop: "10px" }}
          >
            {isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="space-y-6">
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

                <div className="flex items-center">
                  <label className="w-48 text-sm font-medium text-gray-700">Set Charges :</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={charges}
                    onChange={(e) => setCharges(e.target.value)}
                    placeholder="Enter Charges"
                    className="flex-1 border border-gray-300 rounded px-3 py-2 bg-white placeholder-gray-500 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                  />
                </div>
              </div>
            )}
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
              {isLoading ? "Updating..." : "Edit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
