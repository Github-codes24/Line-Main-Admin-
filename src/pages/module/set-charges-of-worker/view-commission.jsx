import React, { useEffect, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom"; 
import axios from "axios";

export default function ViewCommission() {
  const navigate = useNavigate(); 
  const { id } = useParams();   // get id from URL
  const [commission, setCommission] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch worker charges by ID
  useEffect(() => {
    const fetchCommission = async () => {
      try {
        const res = await axios.get(
          `https://linemen-be-1.onrender.com/admin/worker-charges/get-single-worker-charges/${id}`
        );
        setCommission(res.data); 
      } catch (err) {
        console.error("Error fetching worker charges:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCommission();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!commission) {
    return <div className="p-6 text-center text-red-600">No data found!</div>;
  }

  return (
    <div className="bg-gray-200 max-h-screen p-4">
      <div>
        {/* Header Section */}
        <div
          className="bg-white rounded-lg border border-gray-300"
          style={{ marginBottom: "5px" }}
        >
          <div className="flex items-center p-4 bg-white rounded-lg border-b border-gray-300">
            <button
              className="text-gray-600 hover:text-gray-800 mr-3"
              onClick={() => navigate(-1)}
            >
              <IoArrowBackCircleOutline size={30} />
            </button>
            <h2 className="text-lg font-medium text-gray-800">
              View Commission Details
            </h2>
          </div>
        </div>

        {/* Form and Buttons Section */}
        <div className="bg-white rounded-lg pt-3">
          {/* Form Section */}
          <div
            className="border border-gray-300 rounded-lg px-6 py-12 mb-4 ml-4 mr-4"
            style={{ marginTop: "10px" }}
          >
            <div className="space-y-6">
              {/* Category */}
              <div className="flex items-center">
                <label className="w-48 text-sm font-medium text-gray-700">
                  Category :
                </label>
                <input
                  type="text"
                  value={commission.category || ""}
                  readOnly
                  className="flex-1 border border-gray-300 rounded px-3 py-2 bg-blue-100 text-gray-700"
                />
              </div>

              {/* Crud Operations */}
              <div className="flex items-center">
                <label className="w-48 text-sm font-medium text-gray-700">
                  Crud Operations :
                </label>
                <input
                  type="text"
                  value={commission.crudOperation || ""}
                  readOnly
                  className="flex-1 border border-gray-300 rounded px-3 py-2 bg-blue-100 text-gray-700"
                />
              </div>

              {/* Commission From Worker */}
              <div className="flex items-center">
                <label className="w-48 text-sm font-medium text-gray-700">
                  Set Charges :
                </label>
                <input
                  type="text"
                  value={commission.setCharges || ""}
                  readOnly
                  className="flex-1 border border-gray-300 rounded px-3 py-2 bg-blue-100 text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-center gap-4 px-6 pb-6">
            <button
              className="px-12 py-2 rounded bg-blue-800 text-white hover:bg-blue-900 transition-colors"
              onClick={() => alert("Commission Edit successfully!")}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
