// ViewCommission.jsx
import React, { useEffect, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import conf from "../../../config";

/* token helper (same as other components) */
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

/* axios instance with Authorization header */
const base = conf?.apiBaseUrl || "https://linemen-be-1.onrender.com";
const api = axios.create({ baseURL: base, timeout: 15000 });
api.interceptors.request.use((cfg) => {
  const token = getStoredToken();
  if (token) {
    cfg.headers = cfg.headers || {};
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

export default function ViewCommission() {
  const navigate = useNavigate();
  const { id } = useParams(); // URL param
  const location = useLocation(); // may have state.item from list
  const preloaded = location?.state?.item || null;

  const [item, setItem] = useState(preloaded);
  const [isLoading, setIsLoading] = useState(!preloaded);
  const [error, setError] = useState("");

  // Fetch single record if not preloaded
  const fetchItem = async (attempt = 1) => {
    if (!id) {
      setError("Missing id parameter");
      setItem(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const res = await api.get(`/admin/worker-charges/get-single-worker-charges/${encodeURIComponent(id)}`);
      const payload = res?.data;

      // handle wrapper response: success:false, access denied, etc.
      if (payload && payload.success === false) {
        const msg = payload.message || "Failed to fetch record";
        if (msg.toLowerCase().includes("access denied") || res.status === 401) {
          const stored = getStoredToken();
          if (!stored) {
            toast.error("Authentication required — please login.");
            setTimeout(() => navigate("/login"), 800);
            setError(msg);
            setItem(null);
            return;
          }
          // allow one retry in case token was refreshed elsewhere
          if (attempt <= 1) {
            await new Promise((r) => setTimeout(r, 300));
            return fetchItem(attempt + 1);
          }
          toast.error(msg);
          setError(msg);
          setItem(null);
          return;
        } else {
          setError(msg);
          setItem(null);
          return;
        }
      }

      // find record in payload: could be payload.workerCharge or payload.data or payload directly
      let record = null;
      if (payload?.workerCharge) record = payload.workerCharge;
      else if (payload?.data) record = payload.data;
      else if (payload && (payload._id || payload.id || payload.category)) record = payload;
      else {
        // fallback: first object with _id
        const firstObj = Object.values(payload || {}).find(
          (v) => v && typeof v === "object" && (v._id || v.id)
        );
        record = firstObj || null;
      }

      if (!record) {
        setError("Record not found in API response.");
        setItem(null);
        return;
      }

      const normalized = {
        id: record._id || record.id,
        category: record.category || record.title || "Unknown",
        charges: typeof record.charges === "number" ? record.charges : Number(record.charges) || 0,
        createdAt: record.createdAt || record.created_at || null,
        updatedAt: record.updatedAt || record.updated_at || null,
        raw: record,
      };

      setItem(normalized);
    } catch (err) {
      console.error("Fetch single charge error:", err);
      const serverMsg = err?.response?.data?.message || err?.message || "Error fetching record";
      // handle auth messages
      if (typeof serverMsg === "string" && serverMsg.toLowerCase().includes("access denied")) {
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
        setError(serverMsg);
      }
      setItem(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // only fetch if we didn't receive preloaded item via location.state
    if (!preloaded) fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
            <h2 className="text-lg font-medium text-gray-800">View Commission Details</h2>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg pt-3">
          <div className="border border-gray-300 rounded-lg px-6 py-12 mb-4 mx-4" style={{ marginTop: "10px" }}>
            {isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-600">{error}</div>
            ) : !item ? (
              <div className="text-center py-8">No data to display</div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center">
                  <label className="w-48 text-sm font-medium text-gray-700">Category :</label>
                  <input
                    type="text"
                    value={item.category}
                    readOnly
                    className="flex-1 border border-gray-300 rounded px-3 py-2 bg-blue-100 text-gray-700 focus:outline-none"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-48 text-sm font-medium text-gray-700"> Set Charges :</label>
                  <input
                    type="text"
                    value={item.charges ? `₹ ${item.charges}` : ""}
                    readOnly
                    className="flex-1 border border-gray-300 rounded px-3 py-2 bg-blue-100 text-gray-700 focus:outline-none"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-48 text-sm font-medium text-gray-700"> Created At :</label>
                  <input
                    type="text"
                    value={item.createdAt ? new Date(item.createdAt).toLocaleString() : "-"}
                    readOnly
                    className="flex-1 border border-gray-300 rounded px-3 py-2 bg-blue-100 text-gray-700 focus:outline-none"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-48 text-sm font-medium text-gray-700"> Updated At :</label>
                  <input
                    type="text"
                    value={item.updatedAt ? new Date(item.updatedAt).toLocaleString() : "-"}
                    readOnly
                    className="flex-1 border border-gray-300 rounded px-3 py-2 bg-blue-100 text-gray-700 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-center gap-4 px-6 pb-6">
            <button
              className="px-12 py-2 rounded border border-gray-300 bg-blue-100 text-gray-700 hover:bg-blue-200 transition-colors"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button
              className="px-12 py-2 rounded bg-blue-800 text-white hover:bg-blue-900 transition-colors"
              onClick={() => navigate(`/admin/set-charges-of-worker/edit/${encodeURIComponent(item?.id)}`)}
              disabled={!item}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
