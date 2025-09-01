import React, { useEffect, useState } from "react";
import { api, API_ENDPOINTS } from "../../../config";

export default function SetLimitAmount() {
  const [limit, setLimit] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchLimit();
  }, []);

  const fetchLimit = async () => {
    setLoading(true);
    setMsg("");
    try {
      const res = await api.get(API_ENDPOINTS.GET_WALLET_LIMIT);
      const data = res.data;

      if (data?.success) {
        setLimit(data.data?.nagativeLimit ?? ""); // 👈 backend spelling
      } else {
        setMsg(data?.message || "Failed to fetch wallet limit");
      }
    } catch (err) {
      console.error("❌ fetchLimit error:", err.response || err.message);
      const serverMsg = err?.response?.data?.message;
      setMsg(serverMsg || "Error fetching wallet limit");
    } finally {
      setLoading(false);
    }
  };

  const onEdit = async () => {
    if (limit === "" || isNaN(Number(limit))) {
      return alert("Please enter a valid numeric limit.");
    }

    setLoading(true);
    setMsg("");
    try {
      const res = await api.put(API_ENDPOINTS.UPDATE_WALLET_LIMIT, {
        nagativeLimit: Number(limit), // 👈 backend spelling
      });
      const data = res.data;

      if (data?.success) {
        setMsg("Set Limit Amount edited successfully!");
      } else {
        setMsg(data?.message || "Failed to update limit");
      }
    } catch (err) {
      console.error("❌ update error:", err.response || err.message);
      const serverMsg = err?.response?.data?.message;
      setMsg(serverMsg || "Error updating wallet limit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-h-screen bg-gray-200 p-5 pb-40 mb-30">
      <div>
        {/* Header Section */}
        <div className="bg-white rounded-lg border border-gray-300 mb-2">
          <div className="flex items-center p-4 border-b border-gray-300">
            <h2 className="text-lg font-medium text-gray-800">
              Set Limit Amount
            </h2>
          </div>
        </div>

        {/* Form and Buttons Section */}
        <div className="bg-white rounded-lg pt-3 pb-10 h-100">
          <div className="border border-gray-300 rounded-lg px-6 py-12 mb-6 ml-4 mr-4 h-96">
            <div className="space-y-6">
              <div className="flex items-center">
                <label className="w-80 text-sm font-medium text-gray-700">
                  Wallet Balance Nagative Limit :
                </label>
                <input
                  type="number"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  placeholder="₹ 1000"
                  className="flex-1 border border-gray-300 rounded px-3 py-2 bg-blue-100 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>

              {msg && (
                <p className="text-sm text-center pt-2 text-gray-700">{msg}</p>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-4 px-6 pt-7">
            <button
              className="px-12 py-2 rounded bg-blue-800 text-white hover:bg-blue-900 transition-colors disabled:opacity-60"
              onClick={onEdit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
