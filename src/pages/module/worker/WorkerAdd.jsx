// WorkerAdd.jsx
import React from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function WorkerAdd() {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [experties, setExperties] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [address, setAddress] = React.useState("");

  
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGI2ODFkZGI4YzdmOTU5MDA2ZjE0MGYiLCJlbWFpbCI6ImRpdnlhMTIzNEBnbWFpbC5jb20iLCJpYXQiOjE3NTY3OTE0NzQsImV4cCI6MTc1OTM4MzQ3NH0.b99vHox8Sjvc6KJHMwdlygK8zspf8-Hf50UVs5ntS4M";

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !experties || !contact || !address) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      const payload = {
        name,
        experties,
        contact,
        address,
      };

      const response = await axios.post(
        "https://linemen-be-1.onrender.com/admin/Worker/add-worker",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Worker added successfully!");
        navigate("/admin/workermanagement");
      } else {
        toast.error(response.data.message || "Failed to add worker");
      }
    } catch (error) {
      console.error("Error adding worker:", error);
      toast.error(error.response?.data?.message || "Failed to add worker");
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
      <Worker back title="Add New Worker" />
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Worker Name */}
            <Box
              sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontWeight: 500 }}>Worker Name:</Typography>
              </Box>
              <Box sx={{ gridColumn: "span 2" }}>
                <TextField
                  fullWidth
                  type="text"
                  variant="outlined"
                  placeholder="Enter Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ background: "#CED4F2" }}
                />
              </Box>
            </Box>

            {/* Expertise */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 2,
                marginTop: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontWeight: 500 }}>Expertise:</Typography>
              </Box>
              <Box sx={{ gridColumn: "span 2" }}>
                <Select
                  fullWidth
                  displayEmpty
                  variant="outlined"
                  value={experties}
                  onChange={(e) => setExperties(e.target.value)}
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
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 2,
                marginTop: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontWeight: 500 }}>
                  Email ID/Phone Number:
                </Typography>
              </Box>
              <Box sx={{ gridColumn: "span 2" }}>
                <TextField
                  fullWidth
                  type="text"
                  variant="outlined"
                  placeholder="Enter Email ID/Phone Number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  sx={{ background: "#CED4F2" }}
                />
              </Box>
            </Box>

            {/* Address */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 2,
                marginTop: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontWeight: 500 }}>Address:</Typography>
              </Box>
              <Box sx={{ gridColumn: "span 2" }}>
                <TextField
                  fullWidth
                  type="text"
                  variant="outlined"
                  placeholder="Enter Full Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  sx={{ background: "#CED4F2" }}
                />
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
                marginTop: 4,
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
                sx={{
                  background: "#001580",
                  color: "#FFFFFF",
                  paddingX: 4,
                  paddingY: "2px",
                  textTransform: "none",
                }}
              >
                Add Worker
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default WorkerAdd;
