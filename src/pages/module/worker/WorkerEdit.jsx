import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Worker from "../../../components/cards/worker.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function WorkerEdit() {
  const navigate = useNavigate();
  const { id } = useParams(); // worker id from route
  const [loading, setLoading] = useState(false);

  // form states
  const [workerData, setWorkerData] = useState({
    name: "",
    experties: "",
    contact: "",
    address: "",
  });

  // 👇 JWT Token
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGI2ODFkZGI4YzdmOTU5MDA2ZjE0MGYiLCJlbWFpbCI6ImRpdnlhMTIzNEBnbWFpbC5jb20iLCJpYXQiOjE3NTY3OTE0NzQsImV4cCI6MTc1OTM4MzQ3NH0.b99vHox8Sjvc6KJHMwdlygK8zspf8-Hf50UVs5ntS4M";

  // fetch worker details for pre-fill
  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const res = await axios.get(
          `https://linemen-be-1.onrender.com/admin/Worker/get-single-worker/${id}`,         {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = res.data.user;
        setWorkerData({
          name: data.name || "",
          experties: data.experties || "",
          contact: data.contact || "",
          address: data.address || "",
        });
      } catch (err) {
        console.error("Error fetching worker:", err);
        toast.error("Failed to fetch worker details");
      }
    };
    fetchWorker();
  }, [id]);

  const handleChange = (e) => {
    setWorkerData({
      ...workerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { name, experties, contact, address } = workerData;
    if (!name || !experties || !contact || !address) {
      toast.error("Please fill all required fields!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.put(
        `https://linemen-be-1.onrender.com/admin/Worker/update-worker/${id}`,
        workerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        toast.success("Worker updated successfully!");
        navigate("/admin/workermanagement");
      } else {
        toast.error(res.data.message || "Failed to update worker");
      }
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to update worker");
    } finally {
      setLoading(false);
    }
  };

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
      <Worker back title="Edit Worker" />
      <Card>
        <CardContent>
          <form onSubmit={handleUpdate}>
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
                paddingBottom: 6,
              }}
            >
              {/* Worker Name */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: 500 }}>Worker Name:</Typography>
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                  <TextField
                    fullWidth
                    name="name"
                    type="text"
                    variant="outlined"
                    placeholder="Enter Full Name"
                    value={workerData.name}
                    onChange={handleChange}
                    sx={{ background: "#CED4F2" }}
                  />
                </Box>
              </Box>

              {/* Expertise (Dropdown) */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: 500 }}>Expertise:</Typography>
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                  <Select
                    fullWidth
                    displayEmpty
                    variant="outlined"
                    name="experties"
                    value={workerData.experties}
                    onChange={handleChange}
                    sx={{ background: "#CED4F2" }}
                  >
                    <MenuItem value="" disabled hidden>
                      Select Expertise
                    </MenuItem>
                    <MenuItem value="Electrician">Electrician</MenuItem>
                    <MenuItem value="Plumber">Plumber</MenuItem>
                    <MenuItem value="Tiler">Tiler</MenuItem>
                    <MenuItem value="Painter">Painter</MenuItem>
                    <MenuItem value="AC & Refrigerator Mechanic">
                      AC & Refrigerator Mechanic
                    </MenuItem>
                  </Select>
                </Box>
              </Box>

              {/* Contact */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: 500 }}>Email ID/Phone Number:</Typography>
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                  <TextField
                    fullWidth
                    name="contact"
                    type="text"
                    variant="outlined"
                    placeholder="Enter Email ID/Phone Number"
                    value={workerData.contact}
                    onChange={handleChange}
                    sx={{ background: "#CED4F2" }}
                  />
                </Box>
              </Box>

              {/* Address */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: 500 }}>Address:</Typography>
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                  <TextField
                    fullWidth
                    name="address"
                    type="text"
                    variant="outlined"
                    placeholder="Enter Full Address"
                    value={workerData.address}
                    onChange={handleChange}
                    sx={{ background: "#CED4F2" }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Buttons */}
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
                variant="outlined"
                sx={{
                  borderColor: "#001580",
                  color: "#001580",
                  background: "#CECEF2",
                  paddingX: 4,
                  paddingY: "2px",
                  textTransform: "none",
                }}
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="outlined"
                disabled={loading}
                sx={{
                  background: "#001580",
                  color: "#FFFFFF",
                  paddingX: 4,
                  paddingY: "2px",
                  textTransform: "none",
                }}
              >
                {loading ? "Updating..." : "Update"}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default WorkerEdit;
