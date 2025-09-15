// ShopView.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import AadharImage from "../../../assets/images/aadhar.png";

function ShopView() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col font-medium text-[#0D2E28] p-2 h-full font-[Poppins]">
      {/* Header */}
      <div className="flex items-center bg-white border rounded-lg shadow p-3 mb-4">
        <img
          src="/Back Button (1).png"
          onClick={handleBack}
          className="mr-3 cursor-pointer w-8"
          alt="Back"
        />
        <h2 className="text-lg font-semibold text-gray-800">Shop View</h2>
      </div>

      {/* Main Layout */}
      <div
        className="bg-white rounded-lg p-4 flex flex-col gap-4"
        style={{
          width: "1108px",
          height: "830px",
          borderRadius: "8px",
          padding: "16px",
          gap: "16px",
        }}
      >
        {/* Table Container */}
        <div
          className="flex flex-col gap-6"
          style={{
            width: "1076px",
            height: "742px",
            borderRadius: "8px",
            padding: "24px",
            border: "1px solid #616666",
          }}
        >
          {/* Expertise */}
          <div className="flex w-full h-[62px] gap-6 items-center">
            <label className="w-[360px] text-[#0D2E28] font-[500] text-[20px]">
              Expertise:
            </label>
            <span className="flex items-center w-[644px] h-[62px] px-4 border border-[#001580] rounded-lg text-[20px] font-[500] bg-[#E4E5EB]">
              Electrician
            </span>
          </div>

          {/* Shop Name */}
          <div className="flex w-full h-[62px] gap-6 items-center">
            <label className="w-[360px] text-[#0D2E28] font-[500] text-[20px]">
              Shop Name:
            </label>
            <span className="flex items-center w-[644px] h-[62px] px-4 border border-[#001580] rounded-lg text-[20px] font-[500] bg-[#E4E5EB]">
              Surge Solutions
            </span>
          </div>

          {/* Owner Name */}
          <div className="flex w-full h-[62px] gap-6 items-center">
            <label className="w-[360px] text-[#0D2E28] font-[500] text-[20px]">
              Owner Name:
            </label>
            <span className="flex items-center w-[644px] h-[62px] px-4 border border-[#001580] rounded-lg text-[20px] font-[500] bg-[#E4E5EB]">
              Emma Watson
            </span>
          </div>

          {/* Email / Phone */}
          <div className="flex w-full h-[62px] gap-6 items-center">
            <label className="w-[360px] text-[#0D2E28] font-[500] text-[20px]">
              Email ID/Phone Number:
            </label>
            <span className="flex items-center w-[644px] h-[62px] px-4 border border-[#001580] rounded-lg text-[20px] font-[500] bg-[#E4E5EB]">
              emma@example.com / +91-9876543210
            </span>
          </div>

          {/* Shop Address */}
          <div className="flex w-full h-[62px] gap-6 items-center">
            <label className="w-[360px] text-[#0D2E28] font-[500] text-[20px]">
              Shop Address:
            </label>
            <span className="flex items-center w-[644px] h-[62px] px-4 border border-[#001580] rounded-lg text-[20px] font-[500] bg-[#E4E5EB]">
              123, Main Street, Nagpur
            </span>
          </div>

          {/* Aadhaar Number */}
          <div className="flex w-full h-[62px] gap-6 items-center">
            <label className="w-[360px] text-[#0D2E28] font-[500] text-[20px]">
              Aadhaar Number:
            </label>
            <span className="flex items-center w-[644px] h-[62px] px-4 border border-[#001580] rounded-lg text-[20px] font-[500] bg-[#E4E5EB]">
              1234 5678 9012
            </span>
          </div>

          {/* Aadhaar Card Image */}
          <div className="flex w-[1028px] h-[210px] gap-6 items-center">
            <label className="w-[360px] text-[#0D2E28] font-[500] text-[20px]">
              Aadhaar Card Image:
            </label>
            <img
              src={AadharImage}
              alt="aadhar"
              className="w-[644px] h-[200px] rounded-[24px] border border-[#001580] object-cover"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 w-[416px] mx-auto">
          <button
            type="button"
            className="w-[200px] h-[40px] rounded-lg border border-[#001580] bg-[#CECEF2] text-[#001580] text-[16px] font-[500]"
          >
            Inactive
          </button>
          <button
            type="button"
            className="w-[200px] h-[40px] rounded-lg bg-[#001580] text-white text-[16px] font-[500]"
          >
            Active
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShopView;
