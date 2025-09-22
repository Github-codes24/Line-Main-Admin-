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
import { toast } from "react-toastify";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

function WorkerEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fetchData] = useFetch();
  const [loading, setLoading] = useState(false);

  // form states
  const [workerData, setWorkerData] = useState({
    name: "",
    experties: "",
    contact: "",
    address: "",
  });

  // fetch worker details for pre-fill
  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const result = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/admin/Worker/get-single-worker/${id}`,
        });

        if (result.success) {
          const data = result.user || result.worker || result.data;
          setWorkerData({
            name: data.name || "",
            experties: data.experties || data.expertise || "",
            contact: data.contact || data.phone || data.email || "",
            address: data.address || "",
          });
        } else {
          toast.error(result.message || "Failed to fetch worker details");
        }
      } catch (err) {
        console.error("Error fetching worker:", err);
        toast.error(err.response?.data?.message || err.message || "Failed to fetch worker details");
      }
    };

    if (id) {
      fetchWorker();
    }
  }, [id, fetchData]);

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
      const result = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}/admin/Worker/update-worker/${id}`,
        data: workerData,
      });

      if (result.success) {
        toast.success(result.message || "Worker updated successfully!");
        navigate("/admin/workermanagement");
      } else {
        toast.error(result.message || "Failed to update worker");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.response?.data?.message || err.message || "Failed to update worker");
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
