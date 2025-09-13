import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import conf from "../../../config";
import useFetch from "../../../hook/useFetch";

export default function SetLimitAmount() {
  const [limit, setLimit] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [fetchData] = useFetch();

  // ✅ Fetch current wallet limit on mount
  useEffect(() => {
    const getLimit = async () => {
      try {
        setLoading(true);
        const res = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/admin/limit-amount/get-limit-amount`,
        });

        if (res?.success && res?.data) {
          // Some APIs return { nagativeLimit: ... } instead of { limitAmount: ... }
          setLimit(res.data.limitAmount || res.data.nagativeLimit || "");
        } else {
          toast.error(res?.message || "Failed to fetch limit");
        }
      } catch (err) {
        toast.error(err.message || "Failed to fetch wallet limit");
      } finally {
        setLoading(false);
      }
    };

    getLimit();
  }, [fetchData]);

  // ✅ Update wallet limit
  const handleUpdate = async () => {
    if (!limit) return toast.error("Please enter a limit amount");

    try {
      setLoading(true);
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}/admin/limit-amount/update-limit-amount`,
        data: { limitAmount: Number(limit) },
      });

      if (res?.success) {
        setMsg("Limit updated successfully!");
        toast.success(res.message || "Limit updated successfully");
      } else {
        toast.error(res?.message || "Failed to update limit");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-5">
      <div className="bg-white rounded-lg border border-gray-300 p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Set Wallet Negative Limit
        </h2>

        <div className="flex items-center gap-4 mb-4">
          <label className="w-64 text-sm font-medium text-gray-700">
            Wallet Balance Negative Limit :
          </label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder="₹ 1000"
            className="flex-1 border border-gray-300 rounded px-3 py-2 bg-blue-100 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>

        {msg && <p className="text-sm text-green-600 mb-3">{msg}</p>}

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="px-6 py-2 rounded bg-blue-800 text-white hover:bg-blue-900 transition-colors disabled:opacity-60"
        >
          {loading ? "Saving..." : "Update"}
        </button>
      </div>
    </div>
  );
}
