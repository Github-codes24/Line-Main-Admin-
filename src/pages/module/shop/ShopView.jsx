import React from "react";
import { Box, Button, Card, CardContent, TextField, Typography, CircularProgress } from "@mui/material";
import Worker from "../../../components/cards/worker.jsx";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

function ShopView() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { id } = useParams(); // Get shop ID from URL
    const [fetchData] = useFetch();

    // State management
    const [shop, setShop] = React.useState(() => {
        const initialShop = state?.shop || null;
        if (initialShop) {
            // Ensure status is properly set
            return {
                ...initialShop,
                status: initialShop.status || (initialShop.isActive ? "Active" : "Inactive"),
                isActive: initialShop.isActive !== undefined ? initialShop.isActive : (initialShop.status === "Active")
            };
        }
        return null;
    });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [activeModalOpen, setActiveModalOpen] = React.useState(false);
    const [inactiveModalOpen, setInactiveModalOpen] = React.useState(false);

    // Fetch shop data if not provided via state or if data is incomplete
    React.useEffect(() => {
        if (id && (!shop || !shop.aadhaarNumber)) {
            // Fetch full data if no shop data or if essential fields are missing
            fetchShopData(id);
        }
    }, [id, shop]);

    const fetchShopData = async (shopId) => {
        try {
            setLoading(true);
            setError("");

            console.log("Fetching shop data for ID:", shopId);

            // Try multiple possible endpoints and ID formats
            const endpoints = [
                `${conf.apiBaseUrl}/admin/shop/get-single-shop/${shopId}`,
                `${conf.apiBaseUrl}/admin/shop/get-shop/${shopId}`,
                `${conf.apiBaseUrl}/admin/shop/${shopId}`,
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

                    if (result && result.success && result.data) {
                        console.log("Shop data loaded successfully from:", endpoint);
                        console.log("Full shop data:", result.data);

                        // Ensure proper status handling
                        const shopData = {
                            ...result.data,
                            status: result.data.status || (result.data.isActive ? "Active" : "Inactive"),
                            isActive: result.data.isActive !== undefined ? result.data.isActive : (result.data.status === "Active")
                        };

                        setShop(shopData);
                        success = true;
                        break;
                    }
                } catch (err) {
                    console.log("Failed with endpoint:", endpoint, err.message);
                    continue;
                }
            }

            if (!success) {
                console.log("All endpoints failed, keeping existing shop data");
                // If API fails but we have basic data from navigation, keep it
                if (shop && shop.shopName) {
                    console.log("Using basic shop data from navigation");
                    return;
                }
                setError("Shop not found or failed to load shop data");
            }
        } catch (error) {
            console.error("Error loading shop data:", error);
            setError("Error loading shop data: " + (error.message || "Unknown error"));
        } finally {
            setLoading(false);
        }
    };

    const ImagePreviewBox = ({ label, src, alt, fallback }) => (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0, mb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontWeight: 500 }}>{label}</Typography>
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
                        cursor: src ? "pointer" : "default",
                    }}
                    onClick={() => {
                        if (src) window.open(src, "_blank");
                    }}
                >
                    {src ? (
                        <img
                            src={src}
                            alt={alt}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                                borderRadius: "4px",
                            }}
                        />
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            {fallback}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );

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
                <Worker back title="View Shop" />
                <Typography color="error" variant="h6">
                    {error}
                </Typography>
                <Button onClick={() => navigate(-1)} variant="contained">
                    Go Back
                </Button>
            </Box>
        );
    }

    // Show shop not found state
    if (!shop) {
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
                <Worker back title="View Shop" />
                <Typography color="error" variant="h6">
                    Shop not found
                </Typography>
                <Button onClick={() => navigate(-1)} variant="contained">
                    Go Back
                </Button>
            </Box>
        );
    }

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
            <Worker back title="View Shop" />
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
                            {[
                                { label: "Shop Name", value: shop.shopName || "" },
                                { label: "Expertise", value: shop.experties || "N/A" },
                                { label: "Owner Name", value: shop.ownerName || "" },
                                { label: "Email ID/Phone Number", value: shop.contact || "" },
                                { label: "Address", value: shop.address || "" },
                                { label: "Aadhaar Number", value: shop.aadhaarNumber || "" },
                                { label: "GSTIN Number", value: shop.gstin || "N/A" },
                            ].map((field, idx) => (
                                <Box key={idx} sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography sx={{ fontWeight: 500, color: "#0D2E28" }}>
                                            {field.label}:
                                        </Typography>
                                    </Box>
                                    <Box sx={{ gridColumn: "span 2" }}>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            value={field.value}
                                            variant="outlined"
                                            sx={{
                                                background: "#E4E5EB",
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": { borderColor: "#001580" },
                                                    "&:hover fieldset": { borderColor: "#001580" },
                                                    "&.Mui-focused fieldset": { borderColor: "#001580" },
                                                },
                                                "& input": { color: "#0D2E28" },
                                            }}
                                            slotProps={{
                                                input: {
                                                    readOnly: true,
                                                },
                                            }}
                                        />
                                    </Box>
                                </Box>
                            ))}

                            <ImagePreviewBox
                                label="Aadhaar Card Image:"
                                src={shop.aadhaarImage}
                                alt={`Aadhaar Card of ${shop.ownerName || shop.shopName}`}
                                fallback="No Aadhaar image available"
                            />

                            <ImagePreviewBox
                                label="GSTIN Image:"
                                src={shop.gstinImage}
                                alt={`GSTIN Certificate of ${shop.shopName}`}
                                fallback="No GSTIN image available"
                            />
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
                                variant="contained"
                                sx={{
                                    border: "1px solid #001580",
                                    width: "200px",
                                    height: "40px",
                                    background: "#CECEF2",
                                    color: shop.status === "Active" ? "#001580" : "#001580",
                                    textTransform: "none",
                                }}
                                onClick={() => {
                                    if (shop.status === "Active") {
                                        setInactiveModalOpen(true);
                                    } else {
                                        setActiveModalOpen(true);
                                    }
                                }}
                            >
                                {shop.status === "Active" ? "Inactive" : "Active"}
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
                                    navigate(`/admin/shopmanagement/edit/${shop.id}`, {
                                        state: {
                                            shop: {
                                                ...shop,
                                                name: shop.ownerName,
                                                gstinNumber: shop.gstin,
                                            },
                                        },
                                    })
                                }
                            >
                                Edit
                            </Button>

                        </Box>
                    </form>
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
                            Are you sure you want to change this shop status from Inactive to Active?
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
                                            `${conf.apiBaseUrl}/admin/shop/${shop._id || shop.id}/status`,
                                            `${conf.apiBaseUrl}/admin/Shop/${shop._id || shop.id}/status`,
                                            `${conf.apiBaseUrl}/admin/shop/update-status/${shop._id || shop.id}`,
                                            `${conf.apiBaseUrl}/admin/Shop/update-status/${shop._id || shop.id}`,
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
                                            setShop((prev) => ({ ...prev, status: "Active", isActive: true }));
                                            navigate("/admin/shopmanagement", {
                                                state: { updated: true, shopId: shop._id || shop.id, newStatus: "Active" },
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
                            Are you sure you want to change this shop status from Active to Inactive?
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
                                            `${conf.apiBaseUrl}/admin/shop/${shop._id || shop.id}/status`,
                                            `${conf.apiBaseUrl}/admin/Shop/${shop._id || shop.id}/status`,
                                            `${conf.apiBaseUrl}/admin/shop/update-status/${shop._id || shop.id}`,
                                            `${conf.apiBaseUrl}/admin/Shop/update-status/${shop._id || shop.id}`,
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
                                            setShop((prev) => ({ ...prev, status: "Inactive", isActive: false }));
                                            navigate("/admin/shopmanagement", {
                                                state: { updated: true, shopId: shop._id || shop.id, newStatus: "Inactive" },
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
}

export default ShopView;
