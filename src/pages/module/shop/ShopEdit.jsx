import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { UploadIcon } from "lucide-react";
import { KeyboardArrowDown } from "@mui/icons-material";

function ShopEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const shop = location.state?.shop;

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [expertise, setExpertise] = React.useState(shop?.expertise || "");

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center bg-white border rounded-lg shadow p-3 mb-4">
        <img
          src="/Back Button (1).png"
          onClick={handleBack}
          className="mr-3 cursor-pointer w-8"
          alt="Back"
        />
        <h1 className="text-[20px] font-semibold text-[#0D2E28]">Edit Shop</h1>
      </div>

      <div className="absolute top-[178px] left-[316px] w-[1108px] h-[830px] bg-white rounded-lg p-4 flex flex-col gap-4">
        <form>
          <div className="flex flex-col gap-4 border border-black rounded p-4 pb-10 box-border">
            {/* Expertise */}
            <div className="grid grid-cols-3 gap-4">
              <label className="flex items-center font-medium">Expertise:</label>
              <div className="relative col-span-2">
                <select
                  name="expertise"
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                  className="w-full text-lg font-medium text-[#0D2E28] p-4 rounded-lg bg-[#CED4F2] border border-[#001580] appearance-none pr-10"
                >
                  <option value="">Select Expertise</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Painter">Painter</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <KeyboardArrowDown style={{ color: "#0D2E28", width: 24, height: 24 }} />
                </div>
              </div>
            </div>

            {/* Shop Name */}
            <div className="grid grid-cols-3 gap-4">
              <label className="flex items-center font-medium">Shop Name:</label>
              <input
                type="text"
                name="shopName"
                defaultValue={shop?.shopName || ""}
                placeholder="Enter Shop Name"
                className="col-span-2 w-full p-3 bg-[#CED4F2] rounded border border-gray-300 placeholder-black"
              />
            </div>

            {/* Owner Name */}
            <div className="grid grid-cols-3 gap-4">
              <label className="flex items-center font-medium">Owner Name:</label>
              <input
                type="text"
                name="name"
                defaultValue={shop?.name || ""}
                placeholder="Enter Owner Name"
                className="col-span-2 w-full p-3 bg-[#CED4F2] rounded border border-gray-300 placeholder-black"
              />
            </div>

            {/* Email/Phone */}
            <div className="grid grid-cols-3 gap-4">
              <label className="flex items-center font-medium">Email ID/Phone Number:</label>
              <input
                type="text"
                name="contact"
                defaultValue={shop?.contact || ""}
                placeholder="Enter Email ID/Phone Number"
                className="col-span-2 w-full p-3 bg-[#CED4F2] rounded border border-gray-300 placeholder-black"
              />
            </div>

            {/* Address */}
            <div className="grid grid-cols-3 gap-4">
              <label className="flex items-center font-medium">Shop Address:</label>
              <input
                type="text"
                name="address"
                defaultValue={shop?.address || ""}
                placeholder="Enter Full Address"
                className="col-span-2 w-full p-3 bg-[#CED4F2] rounded border border-gray-300 placeholder-black"
              />
            </div>

            {/* Aadhaar Number */}
            <div className="grid grid-cols-3 gap-4">
              <label className="flex items-center font-medium">Aadhaar Number:</label>
              <input
                type="text"
                name="aadhaarNumber"
                defaultValue={shop?.aadhaarNumber || ""}
                placeholder="Enter Aadhaar Number"
                className="col-span-2 w-full p-3 bg-[#CED4F2] rounded border border-gray-300 placeholder-black"
              />
            </div>

            {/* Aadhaar Image */}
            <div className="grid grid-cols-3 gap-4">
              <label className="flex items-center font-medium">Aadhaar Card Image:</label>
              <div className="col-span-2 flex items-center border border-[#A3AED0] bg-[#CED4F2] rounded px-2 py-2">
                <label className="inline-flex items-center bg-[#00158099] text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-[#3A57A6]">
                  <UploadIcon size={16} className="mr-2" />
                  Upload Photo
                  <input type="file" accept="image/*" name="aadhaarImage" className="hidden" />
                </label>
                <span className="ml-4 text-sm font-medium text-[#1C1C1C]">
                  Upload Aadhaar Card
                </span>
              </div>
            </div>

            {/* GSTIN Number */}
            <div className="grid grid-cols-3 gap-4">
              <label className="flex items-center font-medium">GSTIN Number:</label>
              <input
                type="text"
                name="gstinNumber"
                defaultValue={shop?.gstinNumber || ""}
                placeholder="Enter GSTIN Number"
                className="col-span-2 w-full p-3 bg-[#CED4F2] rounded border border-gray-300 placeholder-black"
              />
            </div>

            {/* GSTIN Image */}
            <div className="grid grid-cols-3 gap-4">
              <label className="flex items-center font-medium">GSTIN Image:</label>
              <div className="col-span-2 flex items-center border border-[#A3AED0] bg-[#CED4F2] rounded px-2 py-2">
                <label className="inline-flex items-center bg-[#00158099] text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-[#3A57A6]">
                  <UploadIcon size={16} className="mr-2" />
                  Upload Photo
                  <input type="file" accept="image/*" name="gstinImage" className="hidden" />
                </label>
                <span className="ml-4 text-sm font-medium text-[#1C1C1C]">
                  Upload GSTIN Card
                </span>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="text-center text-red-600 text-sm mt-4">{error}</div>
          )}

          {/* Buttons */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-1 border border-[#001580] text-[#001580] bg-[#CECEF2] rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-1 rounded text-white ${
                loading ? "bg-gray-400 text-gray-600" : "bg-[#001580]"
              }`}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShopEdit;
