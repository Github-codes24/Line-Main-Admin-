import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import Worker from "../../../components/cards/worker";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

function WorkerView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fetchData] = useFetch();

  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch worker by ID
  useEffect(() => {
    const fetchWorker = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/admin/Worker/get-single-worker/${id}`,
        });

        console.log("API Response:", result);

        if (result.success) {
          const workerData = result.user || result.worker || result.data;
          setWorker(workerData);
        } else {
          setError(result.message || 'Failed to fetch worker details');
          toast.error(result.message || 'Failed to fetch worker details');
        }
      } catch (err) {
        console.error("Error fetching worker:", err);
        const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch worker details';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWorker();
    }
  }, [id, fetchData]);

  // 🔹 Loading state
  if (loading) {
    return (
   <Box
  sx={{
    height: "100vh", // or "100%" if inside a fixed-height container
    display: "flex",
    alignItems: "center", // vertical center
    justifyContent: "center", // horizontal center
    flexDirection: "column",
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

  {/* Optional text */}
  {/* <Typography sx={{ mt: 2 }}>Loading worker details...</Typography> */}
</Box>

    );
  }

  // If worker not found or error
  if (!loading && (error || !worker)) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          {error || "Worker not found."}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/admin/workermanagement")}
        >
          Back to List
        </Button>
      </Box>
    );
  }

  // 🔹 Worker details UI
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
            }}
          >
            {/* Worker Name */}
            <Field label="Worker Name" value={worker.name || worker.workerName} />

            {/* Expertise */}
            <Field label="Expertise" value={worker.experties || worker.expertise} />

            {/* Contact */}
            <Field
              label="Email ID/Phone Number"
              value={worker.contact || worker.phone || worker.email}
            />

            {/* Address */}
            <Field label="Address" value={worker.address} />

            {/* Status */}
            <Field label="Status" value={worker.status || "Active"} />
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
            {/* Toggle Status */}
            <Button
              variant="contained"
              sx={{
                background: "#CECEF2",
                color: "#001580",
                border: "1px solid #001580",
                paddingX: 4,
                paddingY: "4px",
                textTransform: "none",
              }}
              onClick={() => {
                const newStatus =
                  worker.status === "Active" ? "Inactive" : "Active";
                toast.success(`Worker marked as ${newStatus}`);
                // TODO: API call for status update
              }}
            >
              {worker.status === "Active" ? "Inactive" : "Active"}
            </Button>

            {/* Edit */}
            <Button
              variant="outlined"
              sx={{
                background: "#001580",
                color: "#FFFFFF",
                px: 4,
                border: "1px solid #001580",
              }}
              onClick={() =>
                navigate(`/admin/workermanagement/edit/${worker._id || worker.id}`)
              }
            >
              Edit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

// 🔹 Reusable Field component
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
              borderColor: "#001580", // 🔵 border color
            },
            "&:hover fieldset": {
              borderColor: "#001580", // hover border color
            },
            "&.Mui-focused fieldset": {
              borderColor: "#001580", // focus border color
            },
          },
          input: { color: "#0D2E28" },
        
        }}
        InputProps={{ readOnly: true }}
      />
    </Box>
  </Box>
);

export default WorkerView;