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
import { UploadIcon } from "lucide-react";
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
    aadhaarNumber: "",
    aadhaarCardImage: null,
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
          console.log('Worker data in edit:', data);
          setWorkerData({
            name: data.name || "",
            experties: data.experties || data.expertise || "",
            contact: data.contact || data.phone || data.email || "",
            address: data.address || "",
            aadhaarNumber: data.aadhaarNumber || data.aadhaar || "",
            aadhaarCardImage: data.aadhaarCardImage || data.aadhaarImage || null,
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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setWorkerData((prev) => ({ ...prev, [name]: files[0] }));
    }
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
      // Create FormData for file upload (similar to WorkerAdd)
      const formData = new FormData();
      formData.append("name", workerData.name);
      formData.append("experties", workerData.experties);
      formData.append("contact", workerData.contact);
      formData.append("address", workerData.address);
      formData.append("aadhaarNumber", workerData.aadhaarNumber);

      // Only append file if it's a new file (File object)
      if (workerData.aadhaarCardImage && workerData.aadhaarCardImage instanceof File) {
        formData.append("aadhaarCardImage", workerData.aadhaarCardImage);
      }

      const result = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}/admin/Worker/update-worker/${id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
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
    minHeight: "100vh",
    backgroundColor: "#E0E9E9",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    color: "#0D2E28",
    margin: 0,
    padding: 0,
    overflowX: "hidden",
      }}
    >
      <Worker back title="Edit Worker" />

      <Card sx={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        // minHeight: "600px"
      }}>
        <CardContent sx={{ padding: "24px" }}>
          <form onSubmit={handleUpdate}>
            <Box
              sx={{
                
              display: "flex",
    flexDirection: "column",
    gap: 2,
    marginBottom: 2,
    border: "1px solid #616666",
    borderRadius: 1,
    padding: 3,          // slightly more space all around
    paddingBottom: 5,    //  extra space at bottom if needed
    boxSizing: "border-box",
               
                
              }}
            >
              {/* Worker Name */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: 500, color: "#0D2E28" }}>Worker Name:</Typography>
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
                    sx={{
                      background: "#CED4F2",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#001580" },
                        "&:hover fieldset": { borderColor: "#001580" },
                        "&.Mui-focused fieldset": { borderColor: "#001580" },
                      },
                      input: { color: "#0D2E28" },
                    }}
                  />
                </Box>
              </Box>

              {/* Expertise (Dropdown) */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: 500, color: "#0D2E28" }}>Expertise:</Typography>
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                  <Select
                    fullWidth
                    displayEmpty
                    variant="outlined"
                    name="experties"
                    value={workerData.experties}
                    onChange={handleChange}
                    sx={{
                      background: "#CED4F2",
                      color: "#0D2E28",
                      "& .MuiOutlinedInput-notchedOutline": { borderColor: "#001580" },
                      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#001580" },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#001580" },
                    }}
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
                  <Typography sx={{ fontWeight: 500, color: "#0D2E28" }}>Email ID/Phone Number:</Typography>
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
                    sx={{
                      background: "#CED4F2",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#001580" },
                        "&:hover fieldset": { borderColor: "#001580" },
                        "&.Mui-focused fieldset": { borderColor: "#001580" },
                      },
                      input: { color: "#0D2E28" },
                    }}
                  />
                </Box>
              </Box>

              {/* Address */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: 500, color: "#0D2E28" }}>Address:</Typography>
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
                    sx={{
                      background: "#CED4F2",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#001580" },
                        "&:hover fieldset": { borderColor: "#001580" },
                        "&.Mui-focused fieldset": { borderColor: "#001580" },
                      },
                      input: { color: "#0D2E28" },
                    }}
                  />
                </Box>
              </Box>

              {/* Aadhaar Number */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: 500, color: "#0D2E28" }}>Aadhaar Number:</Typography>
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                  <TextField
                    fullWidth
                    name="aadhaarNumber"
                    type="text"
                    variant="outlined"
                    placeholder="Enter 12-digit Aadhaar Number"
                    value={workerData.aadhaarNumber}
                    onChange={handleChange}
                    sx={{
                      background: "#CED4F2",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#001580" },
                        "&:hover fieldset": { borderColor: "#001580" },
                        "&.Mui-focused fieldset": { borderColor: "#001580" },
                      },
                      input: { color: "#0D2E28" },
                    }}
                  />
                </Box>
              </Box>

              {/* Aadhaar Image */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: 500, color: "#0D2E28" }}>Aadhaar Card Image:</Typography>
                </Box>
                <Box
                  sx={{
                    gridColumn: "span 2",
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #001580",
                    borderRadius: "3px",
                    background: "#CED4F2",
                    padding: "8px 8px",
                  }}
                >
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<UploadIcon size={16} />}
                    sx={{
                      background: "#00158099",
                      textTransform: "none",
                      fontSize: "14px",
                      boxShadow: "none",
                      borderRadius: 2.5,
                      "&:hover": { background: "#3A57A6" },
                    }}
                  >
                    Upload Photo
                    <input hidden accept="image/*" type="file" name="aadhaarCardImage" onChange={handleFileChange} />
                  </Button>
                  <Typography variant="body2" sx={{ ml: 2, color: "#0D2E28", fontWeight: 500 }}>
                    {workerData.aadhaarCardImage ? workerData.aadhaarCardImage.name : "Upload Aadhaar Card"}
                  </Typography>
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
                gap: "24px",
                marginTop: "32px",
                paddingTop: "16px",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  width: "200px",
                  height: "40px",
                  borderColor: "#001580",
                  color: "#001580",
                  backgroundColor: "#CED4F2",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#B8C4F0",
                    borderColor: "#001580",
                  }
                }}
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  width: "200px",
                  height: "40px",
                  backgroundColor: "#001580",
                  color: "#FFFFFF",
                  textTransform: "none",
                  fontWeight: 500,
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#000d66",
                    boxShadow: "none",
                  },
                  "&:disabled": {
                    backgroundColor: "#cccccc",
                    color: "#666666",
                  }
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
};

export default WorkerEdit;