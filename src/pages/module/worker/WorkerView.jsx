import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import Worker from "../../../components/cards/worker";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

function WorkerView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const [fetchData] = useFetch();

  const [worker, setWorker] = useState(() => {
    const initialWorker = state?.worker || null;
    if (initialWorker) {
      // Ensure status is properly set
      return {
        ...initialWorker,
        status: initialWorker.status || (initialWorker.isActive ? "Active" : "Inactive"),
        isActive: initialWorker.isActive !== undefined ? initialWorker.isActive : (initialWorker.status === "Active")
      };
    }
    return null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeModalOpen, setActiveModalOpen] = useState(false);
  const [inactiveModalOpen, setInactiveModalOpen] = useState(false);

  // Fetch worker data if not provided via state or if data is incomplete
  useEffect(() => {
    if (id && (!worker || !worker.aadhaarNumber)) {
      // Fetch full data if no worker data or if essential fields are missing
      fetchWorkerData(id);
    }
  }, [id, worker]);

  const fetchWorkerData = async (workerId) => {
    try {
      setLoading(true);
      setError("");

      console.log("Fetching worker data for ID:", workerId);

      // Try multiple possible endpoints and ID formats
      const endpoints = [
        `${conf.apiBaseUrl}/admin/Worker/get-single-worker/${workerId}`,
        `${conf.apiBaseUrl}/admin/worker/get-single-worker/${workerId}`,
        `${conf.apiBaseUrl}/admin/Worker/${workerId}`,
        `${conf.apiBaseUrl}/admin/worker/${workerId}`,
      ];

      let result = null;
      let success = false;

      for (const endpoint of endpoints) {
        try {
          console.log("Trying endpoint:", endpoint);
          result = await fetchData({
            method: "GET",
            url: endpoint,
          });

          if (result && result.success && (result.user || result.data)) {
            console.log("Worker data loaded successfully from:", endpoint);
            const data = result.user || result.data || result.worker;
            console.log("Full worker data:", data);

            // Ensure proper status handling
            const workerData = {
              ...data,
              status: data.status || (data.isActive ? "Active" : "Inactive"),
              isActive: data.isActive !== undefined ? data.isActive : (data.status === "Active")
            };

            setWorker(workerData);
            success = true;
            break;
          }
        } catch (err) {
          console.log("Failed with endpoint:", endpoint, err.message);
          continue;
        }
      }

      if (!success) {
        console.log("All endpoints failed, keeping existing worker data");
        // If API fails but we have basic data from navigation, keep it
        if (worker && worker.name) {
          console.log("Using basic worker data from navigation");
          return;
        }
        setError("Worker not found or failed to load worker data");
      }
    } catch (error) {
      console.error("Error loading worker data:", error);
      setError("Error loading worker data: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",        // Full viewport height to center vertically
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          className="animate-spin h-10 w-10 text-[#001580]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-100"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="60"
            strokeDashoffset="20"
          ></circle>
        </svg>
      </Box>
    );
  }

  // Show error state
  if (error) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <Worker back title="View Worker" />
        <Typography color="error" variant="h6">
          {error}
        </Typography>
        <Button onClick={() => navigate(-1)} variant="contained">
          Go Back
        </Button>
      </Box>
    );
  }

  // Show worker not found state
  if (!worker) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <Worker back title="View Worker" />
        <Typography color="error" variant="h6">
          Worker not found
        </Typography>
        <Button onClick={() => navigate(-1)} variant="contained">
          Go Back
        </Button>
      </Box>
    );
  }

  // Worker details UI
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        color: "#0D2E28", // 🔹 all text color
      }}
    >
      {/* Header */}
      <Worker back title="View Worker" />

      {/* Worker Details Card */}
      <Card>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginBottom: 2,
              border: "1px solid black",
              borderRadius: 1,
              padding: 2,
              boxSizing: "border-box",
              paddingBottom: 10,
              color: "#0D2E28", // ensure all text inside is greenish
              minHeight: "550px",
              height: "auto",
            }}
          >
            {/* Worker Name */}
            <Field label="Worker Name" value={worker.name || worker.workerName} />

            {/* Expertise */}
            <Field label="Expertise" value={worker.experties || worker.expertise || "N/A"} />

            {/* Sub Category - Show if available */}
            {worker.subCategory && (
              <Field label="Sub Category" value={worker.subCategory?.name || worker.subCategory || "N/A"} />
            )}

            {/* Contact */}
            <Field
              label="Email ID/Phone Number"
              value={worker.contact || worker.phone || worker.email}
            />

            {/* Address */}
            <Field label="Address" value={worker.address} />

            {/* Aadhaar Number */}
            <Field label="Aadhaar Number" value={worker.aadhaarNumber || worker.aadhaar} />

            {/* Aadhaar Image */}
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0, mb: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontWeight: 500, color: "#0D2E28" }}>Aadhaar Card Image:</Typography>
              </Box>
              <Box sx={{ gridColumn: "span 2" }}>
                <Box
                  sx={{
                    width: 200,
                    height: 120,
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#fff",
                    cursor: (worker.aadhaarCardImageUrl || worker.aadhaarCardImage || worker.aadhaarImage) ? "pointer" : "default",
                  }}
                  onClick={() => {
                    const imageUrl = worker.aadhaarCardImageUrl || worker.aadhaarCardImage || worker.aadhaarImage;
                    if (imageUrl) {
                      window.open(imageUrl, "_blank");
                    }
                  }}
                >
                  {(worker.aadhaarCardImageUrl || worker.aadhaarCardImage || worker.aadhaarImage) ? (
                    <img
                      src={worker.aadhaarCardImageUrl || worker.aadhaarCardImage || worker.aadhaarImage}
                      alt={`Aadhaar Card of ${worker.name}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        borderRadius: "4px",
                      }}
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No Aadhaar image available
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                border: "1px solid #001580",
                width: "200px",
                height: "40px",
                background: "#CECEF2",
                color: worker.status === "Active" ? "#001580" : "#001580",
                textTransform: "none",
              }}
              onClick={() => {
                if (worker.status === "Active") {
                  setInactiveModalOpen(true);
                } else {
                  setActiveModalOpen(true);
                }
              }}
            >
              {worker.status === "Active" ? "Inactive" : "Active"}
            </Button>

            <Button
              variant="outlined"
              sx={{
                width: "200px",
                height: "40px",
                background: "#001580",
                color: "#FFFFFF",
                textTransform: "none",
              }}
              onClick={() =>
                navigate(`/admin/workermanagement/edit/${worker._id || worker.id}`, {
                  state: {
                    worker: {
                      ...worker,
                      name: worker.name,
                    },
                  },
                })
              }
            >
              Edit
            </Button>
          </Box>

        </CardContent>
      </Card>

      {/* Active Modal */}
      {activeModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
            <h2 className="text-xl font-bold text-center text-[#0D2E28] mb-3">
              Mark as Active
            </h2>
            <p className="text-[#0D2E28] text-center mb-6 leading-relaxed">
              Are you sure you want to change this worker status from Inactive to Active?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setActiveModalOpen(false)}
                className="px-16 py-2 rounded-md border border-[#001580] bg-[#CED4F2] text-[#001580] font-medium hover:opacity-90 transition"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    setLoading(true);
                    const statusEndpoints = [
                      `${conf.apiBaseUrl}/admin/worker/${worker._id || worker.id}/status`,
                      `${conf.apiBaseUrl}/admin/Worker/${worker._id || worker.id}/status`,
                      `${conf.apiBaseUrl}/admin/worker/update-status/${worker._id || worker.id}`,
                      `${conf.apiBaseUrl}/admin/Worker/update-status/${worker._id || worker.id}`,
                    ];

                    let success = false;
                    for (const endpoint of statusEndpoints) {
                      try {
                        const result = await fetchData({
                          method: "PATCH",
                          url: endpoint,
                          data: { status: "Active", isActive: true },
                        });
                        if (result && (result.success || result.status === "success")) {
                          success = true;
                          break;
                        }
                      } catch (error) {
                        continue;
                      }
                    }

                    if (success) {
                      setWorker((prev) => ({ ...prev, status: "Active", isActive: true }));
                      navigate("/admin/workermanagement", {
                        state: { updated: true, workerId: worker._id || worker.id, newStatus: "Active" },
                      });
                    }
                  } catch (error) {
                    console.error("Error updating status:", error);
                  } finally {
                    setLoading(false);
                    setActiveModalOpen(false);
                  }
                }}
                className="px-16 py-2 rounded-md border border-[#001580] bg-[#001580] text-white font-medium hover:opacity-90 transition"
              >
                Active
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inactive Modal */}
      {inactiveModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
            <h2 className="text-xl font-bold text-center text-[#0D2E28] mb-3">
              Mark as Inactive
            </h2>
            <p className="text-[#0D2E28] text-center mb-6 leading-relaxed">
              Are you sure you want to change this worker status from Active to Inactive?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setInactiveModalOpen(false)}
                className="px-16 py-2 rounded-md border border-[#001580] bg-[#CED4F2] text-[#001580] font-medium hover:opacity-90 transition"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    setLoading(true);
                    const statusEndpoints = [
                      `${conf.apiBaseUrl}/admin/worker/${worker._id || worker.id}/status`,
                      `${conf.apiBaseUrl}/admin/Worker/${worker._id || worker.id}/status`,
                      `${conf.apiBaseUrl}/admin/worker/update-status/${worker._id || worker.id}`,
                      `${conf.apiBaseUrl}/admin/Worker/update-status/${worker._id || worker.id}`,
                    ];

                    let success = false;
                    for (const endpoint of statusEndpoints) {
                      try {
                        const result = await fetchData({
                          method: "PATCH",
                          url: endpoint,
                          data: { status: "Inactive", isActive: false },
                        });
                        if (result && (result.success || result.status === "success")) {
                          success = true;
                          break;
                        }
                      } catch (error) {
                        continue;
                      }
                    }

                    if (success) {
                      setWorker((prev) => ({ ...prev, status: "Inactive", isActive: false }));
                      navigate("/admin/workermanagement", {
                        state: { updated: true, workerId: worker._id || worker.id, newStatus: "Inactive" },
                      });
                    }
                  } catch (error) {
                    console.error("Error updating status:", error);
                  } finally {
                    setLoading(false);
                    setInactiveModalOpen(false);
                  }
                }}
                className="px-16 py-2 rounded-md border border-[#001580] bg-[#001580] text-white font-medium hover:opacity-90 transition"
              >
                Inactive
              </button>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

//  Reusable Field component
const Field = ({ label, value }) => (
  <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography sx={{ fontWeight: 500, color: "#0D2E28" }}>{label}:</Typography>
    </Box>
    <Box sx={{ gridColumn: "span 2" }}>
      <TextField
        fullWidth
        type="text"
        value={value || ""}
        variant="outlined"
        sx={{
          background: "#E4E5EB",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#001580", //  border color
            },
            "&:hover fieldset": {
              borderColor: "#001580", // hover border color
            },
            "&.Mui-focused fieldset": {
              borderColor: "#001580", // focus border color
            },
          },
          input: { color: "#0D2E28" },
          // height: "40px"

        }}
        slotProps={{ input: { readOnly: true } }}
      />
    </Box>
  </Box>
);

export default WorkerView;