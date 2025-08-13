import React from "react";
import {Box, Button, Card, CardContent, TextField, Typography} from "@mui/material";
import Worker from "../../../components/cards/worker";
import {useNavigate} from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import Worker from "../../../components/cards/worker.jsx";
import { useNavigate } from "react-router-dom"

function ShopAdd() {
  const navigate = useNavigate();
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
      <Worker back title="Add New Shop" />
      <Card>
        <CardContent>
          <form>
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
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: 500 }}>Shop Name:</Typography>
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                  <TextField
                    fullWidth
                    type="text"
                    variant="outlined"
                    placeholder="Enter Shop Name"
                    sx={{ background: "#F5FFFF" }}
                    InputProps={{
                      sx: {
                        "& input::placeholder": {
                          color: "black",
                          opacity: 1,
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: 500 }}>Owner Name:</Typography>
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                  {" "}
                  <TextField
                    fullWidth
                    type="text"
                    variant="outlined"
                    placeholder="Enter Full Name"
                    sx={{ background: "#F5FFFF" }}
                    InputProps={{
                      sx: {
                        "& input::placeholder": {
                          color: "black",
                          opacity: 1,
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: 2,
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
                    sx={{ background: "#F5FFFF" }}
                    InputProps={{
                      sx: {
                        "& input::placeholder": {
                          color: "black",
                          opacity: 1,
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: 2,
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
                    sx={{ background: "#F5FFFF" }}
                    InputProps={{
                      sx: {
                        "& input::placeholder": {
                          color: "black",
                          opacity: 1,
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>
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
                  borderColor: "#007E74",
                  color: "#007E74",
                  background: "#D9F1EB",
                  paddingX: 4,
                  paddingY: "2px",
                  textTransform: "none",
                }}
                onClick={() => navigate(-1)}
              >
                cancel
              </Button>
              <Button
                variant="outlined"
                sx={{
                  background: "#007E74",
                  color: "#ffffff",
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

export default ShopAdd;
