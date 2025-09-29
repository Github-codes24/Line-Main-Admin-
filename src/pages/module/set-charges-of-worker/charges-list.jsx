// ChargesList.jsx
import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import conf from "../../../config";

/* --- Utility to find stored auth token --- */
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

/* --- axios instance with automatic Authorization header --- */
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

export default function ChargesList() {
  const navigate = useNavigate();

  const [commissions, setCommissions] = useState([]); // normalized items
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Client-side pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch data from API (handles token / access denied)
  const fetchCharges = async (attempt = 1) => {
    try {
      setIsLoading(true);
      setError("");
      const res = await api.get("/admin/worker-charges/get-all-worker-charges");

      const payload = res?.data;

      // handle server-side access-denied wrapper
      if (payload && payload.success === false) {
        const msg = payload.message || "Failed to load charges";
        if (msg.toLowerCase().includes("access denied") || res.status === 401) {
          const stored = getStoredToken();
          if (!stored) {
            toast.error("Authentication required — please login.");
            setTimeout(() => navigate("/login"), 900);
            setCommissions([]);
            setError(msg);
            return;
          }
          if (attempt <= 1) {
            await new Promise((r) => setTimeout(r, 400));
            return fetchCharges(attempt + 1);
          }
          toast.error(msg);
          setCommissions([]);
          setError(msg);
          return;
        } else {
          setError(msg);
          setCommissions([]);
          return;
        }
      }

      // API returns workerCharges array and pagination object (per example)
      const workerCharges = Array.isArray(payload?.workerCharges) ? payload.workerCharges : [];
      // Normalize items to the shape we display
      const normalized = (workerCharges || []).map((r) => ({
        id: r._id || r.id || r._doc?.id || Math.random().toString(36).slice(2),
        category: r.category || "Unknown",
        charges: typeof r.charges === "number" ? r.charges : Number(r.charges) || 0,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
        raw: r,
      }));

      setCommissions(normalized);
    } catch (err) {
      console.error("Error fetching charges:", err);
      const serverMsg = err?.response?.data?.message || err?.message;
      if (serverMsg && serverMsg.toLowerCase().includes("access denied")) {
        const stored = getStoredToken();
        if (!stored) {
          toast.error("Authentication required — please login.");
          setTimeout(() => navigate("/login"), 900);
          setError(serverMsg);
          setCommissions([]);
        } else {
          toast.error("Session expired or invalid. Please login again.");
          localStorage.removeItem("token");
          localStorage.removeItem("accessToken");
          sessionStorage.removeItem("token");
          setTimeout(() => navigate("/login"), 900);
        }
      } else {
        setError(serverMsg || "Failed to load charges. Check console for details.");
        toast.error("Failed to load charges");
        setCommissions([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCharges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Client-side pagination computations
  const totalPages = Math.max(1, Math.ceil(commissions.length / rowsPerPage));
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = commissions.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Local delete placeholder (replace with API delete if available)
  const deleteChargeLocal = (id) => {
    if (!window.confirm("Delete this charge?")) return;
    setCommissions((prev) => prev.filter((x) => x.id !== id));
    toast.success("Deleted locally (implement server delete if needed)");
  };

  // Navigate to view page — also pass the item via state to avoid refetching in ViewCommission
  const goToView = (item) => {
    const path = `/admin/set-charges-of-worker/view/${encodeURIComponent(item.id)}`;
    navigate(path, { state: { item } }); // ViewCommission can read location.state.item
  };

  // Navigate to edit page
  const goToEdit = (item) => {
    const path = `/admin/set-charges-of-worker/edit/${encodeURIComponent(item.id)}`;
    navigate(path, { state: { item } }); // pass item for prefill if desired
  };

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <ToastContainer />
      <div className="space-y-4">
        {/* Top Section */}
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Charges List</h2>
          <Button
            className="px-4 py-2 text-white rounded hover:bg-blue-800"
            onClick={() => navigate("/admin/set-charges-of-worker/add")}
          >
            Add Charges
          </Button>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-md pt-4 pl-4 pr-4 pb-4">
          <div className="border border-gray-400 rounded-lg">
            <table className="w-full mb-60 h-full text-sm text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-3 py-2 font-medium">Sr.No.</th>
                  <th className="px-3 py-2 font-medium">Category</th>
                  <th className="px-3 py-2 font-medium">Charges</th>
                  <th className="px-3 py-2 font-medium">Created</th>
                  <th className="px-3 py-2 font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-6 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : currentRows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-6 text-center">
                      {error ? error : "No records found."}
                    </td>
                  </tr>
                ) : (
                  currentRows.map((c, idx) => (
                    <tr
                      key={c.id}
                      className="hover:bg-gray-50 transition-colors cursor-default"
                    >
                      <td className="px-3 py-2">{indexOfFirstRow + idx + 1}</td>
                      <td className="px-3 py-2">{c.category}</td>
                      <td className="px-3 py-2">₹ {c.charges}</td>
                      <td className="px-3 py-2">
                        {c.createdAt ? new Date(c.createdAt).toLocaleString() : "-"}
                      </td>
                      <td className="px-3 py-2 text-center space-x-3 text-blue-600">
                        <button
                          className="text-blue-600 mx-1"
                          onClick={() => goToView(c)}
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button
                          className="text-green-600 mx-1"
                          onClick={() => goToEdit(c)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-600 mx-1"
                          onClick={() => deleteChargeLocal(c.id)}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg shadow-md px-4 py-3 flex justify-between items-center text-sm text-gray-600 bg-slate-200 mt-2">
            <span className="text-zinc-950">
              Showing {commissions.length === 0 ? 0 : indexOfFirstRow + 1} to{" "}
              {Math.min(indexOfLastRow, commissions.length)} of {commissions.length} Entries
            </span>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-1 border rounded-full hover:bg-gray-200 disabled:opacity-50"
              >
                &lt;
              </button>
              {[...Array(totalPages)].map((_, page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page + 1)}
                  className={`px-3 py-1 border rounded-full ${
                    currentPage === page + 1 ? "bg-blue-700 text-white" : "hover:bg-gray-200"
                  }`}
                >
                  {page + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 border rounded-full hover:bg-gray-200 disabled:opacity-50"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
