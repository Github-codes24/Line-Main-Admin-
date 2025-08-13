import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Worker from "../../../components/cards/worker.jsx";

import {
  DeleteIcon,
  EditIcon,
  FilterIcon,
  ViewIcon,
} from "../../../assets/CommonAssets";
import { useNavigate } from "react-router-dom";

function ShopList() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = React.useState("");
  const shopData = [
    {
      name: "Ravi Kumar",
      shopName: "Electrical shop",
      contact: "ravi.kumar@gmail.com / +91-9876543210",
      address: "Banjara Hills,Telangana",
    },
    {
      name: "Anjali Mehta",
      shopName: "Plumber  shop",
      contact: "anjali.mehta@yahoo.com / +91-9123456789",
      address: "Sector 22, Noida, Uttar Pradesh",
    },
    {
      name: "Sunil Sharma",
      shopName: "Carpenter shop",
      contact: "sunil.sharma@outlook.com / +91-9988776655",
      address: "MG Road, Pune, Maharashtra",
    },
    {
      name: "Preeti Verma",
      shopName: "Gardener shop",
      contact: "preeti.verma@gmail.com / +91-8765432109",
      address: "Indiranagar, Bengaluru, Karnataka",
    },
    {
      name: "Amit Das",
      shopName: "Painter shop",
      contact: "amit.das@hotmail.com / +91-8899776655",
      address: "Salt Lake, Kolkata, West Bengal",
    },
  ];
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
      <Worker
        title="Shop List"
        searchValue={searchText}
        setSearchValue={setSearchText}
        buttonText="Add New Shop"
        btnpath="/admin/shopmanagement/shopadd"
      />
      <Card>
        <CardHeader
          sx={{ paddingX: 3 }}
          title={
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  background: "#E0E9E9",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "5px",
                  borderRadius: 1,
                  cursor: "pointer",
                }}
              >
                <FilterIcon />
              </Box>
            </Box>
          }
          action={
            <Button
              variant="outlined"
              sx={{
                marginTop: 1,
                borderColor: "#007E74",
                color: "#007E74",
                background: "#D9F1EB",
                paddingX: 4,
                paddingY: "2px",
                textTransform: "none",
              }}
            >
              Reset Filter
            </Button>
          }
        />

        <CardContent sx={{ paddingTop: 0 }}>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              border: "1px solid black",
              maxHeight: 300,
              overflowY: "scroll",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <Table
              stickyHeader
              size="small"
              sx={{
                borderRadius: 2,
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      textAlign: "center",
                      background: "#E0E9E9",
                    }}
                  >
                    Sr.No.
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      textAlign: "center",
                      background: "#E0E9E9",
                    }}
                  >
                    Shop Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      textAlign: "center",
                      background: "#E0E9E9",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Owner Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      textAlign: "center",
                      background: "#E0E9E9",
                    }}
                  >
                    Email ID/Phone Number
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      textAlign: "center",
                      background: "#E0E9E9",
                    }}
                  >
                    Shop Address
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      textAlign: "center",
                      background: "#E0E9E9",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shopData.map((item, index) => {
                  return (
                    <TableRow hover>
                      <TableCell sx={{ borderBottom: "none", py: 2 }}>
                        {index + 1}
                      </TableCell>
                      <TableCell
                        sx={{ borderBottom: "none", whiteSpace: "nowrap" }}
                      >
                        {item.shopName}
                      </TableCell>
                      <TableCell
                        sx={{ borderBottom: "none", whiteSpace: "nowrap" }}
                      >
                        {item.name}
                      </TableCell>
                      <TableCell
                        sx={{ borderBottom: "none", whiteSpace: "nowrap" }}
                      >
                        {item.contact}
                      </TableCell>
                      <TableCell
                        sx={{ borderBottom: "none", whiteSpace: "nowrap" }}
                      >
                        {item.address}
                      </TableCell>
                      <TableCell
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 1,
                          borderBottom: "none",
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            navigate("/admin/shopmanagement/shopview")
                          }
                        >
                          <ViewIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() =>
                            navigate("/admin/shopmanagement/shopedit")
                          }
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ShopList;
