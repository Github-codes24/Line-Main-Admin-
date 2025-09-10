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
import axios from "axios";
import { toast } from "react-toastify";

function WorkerView() {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ worker id from URL
  //console.log("Worker ID from URL:", id);

  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGI2ODFkZGI4YzdmOTU5MDA2ZjE0MGYiLCJlbWFpbCI6ImRpdnlhMTIzNEBnbWFpbC5jb20iLCJpYXQiOjE3NTY3OTE0NzQsImV4cCI6MTc1OTM4MzQ3NH0.b99vHox8Sjvc6KJHMwdlygK8zspf8-Hf50UVs5ntS4M";

  // 🔹 Fetch worker by ID
  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const res = await axios.get(
          `https://linemen-be-1.onrender.com/admin/Worker/get-single-worker/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Raw API response:", res.data);  // 🔎 log full response
        setWorker(res.data.user || res.data.worker || null);
      } catch (err) {
        console.error("Error fetching worker:", err);
        toast.error("Failed to fetch worker details");
      } finally {
        setLoading(false);
      }
    };
    fetchWorker();
  }, [id]);

  // 🔹 Loading state
  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading worker details...</Typography>
      </Box>
    );
  }

  // 🔹 If worker not found
  if (!worker) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Worker not found.
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
        gap: "24px",
      }}
    >
      <Worker back title="View Worker" />
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
            }}
          >
            {/* Worker Name */}
            <Field label="Worker Name" value={worker.name} />

            {/* Expertise */}
            <Field label="Expertise" value={worker.experties} />

            {/* Contact */}
            <Field label="Email ID/Phone Number" value={worker.contact} />

            {/* Address */}
            <Field label="Address" value={worker.address} />

            {/* Aadhaar Image */}
            {/* <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontWeight: 500 }}>Aadhaar Card Image:</Typography>
              </Box>
              <Box sx={{ gridColumn: "span 2" }}>
                {worker.aadhaarImage ? (
                  <img
                    src={worker.aadhaarImage}
                    alt="Aadhaar Card"
                    style={{
                      width: "200px",
                      height: "120px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                ) : (
                  <Typography>No Aadhaar image available</Typography>
                )}
              </Box>
            </Box> */}
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
                background: worker.status === "Active" ? "#CECEF2" : "#D1F2CE",
                color: worker.status === "Active" ? "#001580" : "#006400",
                paddingX: 4,
                paddingY: "2px",
                textTransform: "none",
              }}
              onClick={() => {
                const newStatus = worker.status === "Active" ? "Inactive" : "Active";
                toast.success(`Worker marked as ${newStatus}`);
                // TODO: API call for status update
              }}
            >
              {worker.status === "Active" ? "Inactive" : "Active"}
            </Button>

            {/* Edit */}
            <Button
              variant="outlined"
              sx={{ background: "#001580", color: "#FFFFFF", px: 4 }}
              onClick={() =>
                navigate(`/admin/workermanagement/workeredit/${worker._id}`)
              }
            >
              Edit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

// 🔹 Reusable Field component
const Field = ({ label, value }) => (
  <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography sx={{ fontWeight: 500 }}>{label}:</Typography>
    </Box>
    <Box sx={{ gridColumn: "span 2" }}>
      <TextField
        fullWidth
        type="text"
        value={value || ""}
        variant="outlined"
        sx={{ background: "#CED4F2" }}
        InputProps={{ readOnly: true }}
      />
    </Box>
  </Box>
);

export default WorkerView;
