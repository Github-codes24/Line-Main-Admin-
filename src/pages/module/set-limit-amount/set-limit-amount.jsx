import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import conf from "../../../config";
import useFetch from "../../../hook/useFetch";


export default function SetLimitAmount() {
  const [limit, setLimit] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [fetchData] = useFetch();

  // Fetch current wallet limit on mount
  useEffect(() => {
    const getLimit = async () => {
      try {
        setLoading(true);
        const res = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/admin/limit-amount/get-limit-amount`,
        });
        if (res?.success && res?.data) {
          setLimit(res.data.limitAmount);
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

  // Update wallet limit
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
    <div className="max-h-screen bg-gray-200 p-5 pb-40 mb-30">
      <div>
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-300 mb-2">
          <div className="flex items-center p-4 border-b border-gray-300">
            <h2 className="text-lg font-medium text-gray-800">Set Limit Amount</h2>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg pt-3 pb-10 h-100">
          <div className="border border-gray-300 rounded-lg px-6 py-12 mb-6 ml-4 mr-4 h-96">
            <div className="space-y-6">
              <div className="flex items-center">
                <label className="w-80 text-sm font-medium text-gray-700">
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
              {msg && <p className="text-sm text-center pt-2 text-gray-700">{msg}</p>}
            </div>
          </div>

          <div className="flex justify-center gap-4 px-6 pt-7">
            <button
              className="px-12 py-2 rounded bg-blue-800 text-white hover:bg-blue-900 transition-colors disabled:opacity-60"
              disabled={loading}
              onClick={handleUpdate}
            >
              {loading ? "Saving..." : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
