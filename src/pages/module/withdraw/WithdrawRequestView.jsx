// src/pages/module/withdraw/WithdrawRequestView.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const WithdrawRequestView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fetchData] = useFetch();

  const [withdraw, setWithdraw] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [processingBtn, setProcessingBtn] = useState(""); // "approve" or "reject"

  const getWithdraw = async () => {
    try {
      setIsLoading(true);
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/admin/payouts/withdrawal/${id}`,
      });
      if (res?.success && res?.request) {
        setWithdraw(res.request);
      } else {
        toast.error(res?.message || "Withdraw request not found");
      }
    } catch (err) {
      toast.error(err.message || "Failed to fetch withdraw request");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWithdraw();
  }, [id]);

  const handleBack = () => navigate(-1);

  const handleApprove = async () => {
    if (!withdraw) return;
    try {
      setProcessingBtn("approve");
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}/admin/payouts/process-payout`,
        data: { withdrawalId: withdraw.withdrawalId },
      });
      if (res?.success) {
        toast.success("Withdraw request approved");
        getWithdraw();
      } else toast.error(res?.message || "Failed to approve");
    } catch (err) {
      toast.error(err.message || "Error approving withdraw");
    } finally {
      setProcessingBtn("");
    }
  };

  const handleReject = async () => {
    if (!withdraw) return;
    try {
      setProcessingBtn("reject");
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}/admin/payouts/reject-withdrawal`,
        data: { withdrawalId: withdraw.withdrawalId },
      });
      if (res?.success) {
        toast.success("Withdraw request rejected");
        getWithdraw();
      } else toast.error(res?.message || "Failed to reject");
    } catch (err) {
      toast.error(err.message || "Error rejecting withdraw");
    } finally {
      setProcessingBtn("");
    }
  };

  // Loader in center for all devices
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#E0E9E9] font-[Poppins] text-[#0D2E28]">
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
      </div>
    );
  }

  if (!withdraw) return null;

  const displayAmount = withdraw.transactionId?.amount || withdraw.amount || 0;
  const displayStatus = (withdraw.transactionId?.status || withdraw.status || "PENDING").toUpperCase();

  return (
    <div className="w-full min-h-screen font-medium text-[#0D2E28] font-[Poppins]">
      <ToastContainer />
      <div className="flex items-center bg-white border rounded-lg shadow p-4 mb-4">
        <img
          src="/Back Button (1).png"
          onClick={handleBack}
          className="mr-3 cursor-pointer w-8"
          alt="Back"
        />
        <h2 className="text-lg font-semibold">View Withdraw Details</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow min-h-[830px]">
        <div className="border border-[#616666] rounded-lg pt-10 pl-20 min-h-[718px] flex flex-col gap-8">
          {/* Withdraw ID */}
          <div className="flex items-center gap-[8px]">
            <label className="w-[151px] h-[30px] text-[#0D2E28] font-bold text-[20px] leading-[100%]">
              Withdraw ID:
            </label>
            <input
              type="text"
              value={withdraw.withdrawalId || ""}
              readOnly
              className="w-[309px] h-[46px] rounded-[8px] border border-[#001580] px-[16px] py-[8px] text-[#0D2E28] font-bold text-[20px] leading-[100%] bg-[#E4E5EB] outline-none"
            />
          </div>

          {/* Worker Details */}
          <div className="flex flex-col gap-[8px] w-full max-w-[598px]">
            <p className="w-[71px] h-[30px] text-[#0D2E28] font-semibold text-[20px] leading-[100%]">
              Details
            </p>
            {[
              { label: "Worker Name", value: withdraw.workerId?.name || "" },
              { label: "Worker Amount", value: `₹${displayAmount}` },
              { label: "Worker On", value: new Date(withdraw.createdAt).toLocaleString() },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-[16px] w-[488px] h-[40px]">
                <label className="w-[151px] text-[#0D2E28] font-medium text-[16px] leading-[100%]">
                  {item.label}:
                </label>
                <input
                  type="text"
                  value={item.value}
                  readOnly
                  className="w-[309px] h-[40px] rounded-[8px] border border-[#001580] px-[16px] py-[8px] text-[#0D2E28] font-normal text-[16px] leading-[100%] bg-[#E4E5EB] outline-none"
                />
              </div>
            ))}
          </div>

          <div className="w-[598px] border-t border-[#616666]" />

          {/* Bank Details */}
          <div className="flex flex-col gap-[8px] w-[598px]">
            <p className="text-[#0D2E28] font-semibold text-[20px] leading-[100%]">Bank Details</p>
            {[
              { label: "Account Number", value: withdraw.bankDetails?.accountNumber || "N/A" },
              { label: "IFSC Code", value: withdraw.bankDetails?.ifscCode || "N/A" },
              { label: "Account Type", value: withdraw.bankDetails?.accountType || "N/A" },
              { label: "Account Holder Name", value: withdraw.bankDetails?.accountHolderName || "N/A" },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-[16px] w-[488px] h-[40px] ${i === 3 ? "mt-4" : ""}`}>
                <label className="w-[151px] text-[#0D2E28] font-medium text-[16px]">{item.label}:</label>
                <input
                  type="text"
                  value={item.value}
                  readOnly
                  className="w-[309px] h-[40px] rounded-[8px] border border-[#001580] px-[16px] py-[8px] text-[#0D2E28] text-[16px] font-normal bg-[#E4E5EB]"
                />
              </div>
            ))}
          </div>

          <div className="w-[598px] border-t border-[#616666]" />

          {/* Status */}
          <div className="flex items-center gap-[16px] w-[488px] h-[40px]">
            <label className="w-[151px] text-[#0D2E28] font-medium text-[16px]">Status:</label>
            <input
              type="text"
              value={displayStatus}
              readOnly
              className={`w-[309px] h-[40px] rounded-[8px] border border-[#001580] px-[16px] py-[8px] font-medium text-[16px] ${
                displayStatus === "PENDING"
                  ? "text-[#FFCC00]"
                  : displayStatus === "PROCESSED"
                  ? "text-[#34C759]"
                  : displayStatus === "REJECTED"
                  ? "text-[#FF383C]"
                  : "text-[#0D2E28]"
              } bg-[#E4E5EB]`}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-[16px] mt-6">
          <button
            onClick={handleReject}
            disabled={processingBtn === "reject"}
            className="w-[200px] h-[40px] rounded-[8px] border border-[#001580] text-[#001580] font-medium text-[16px] flex items-center justify-center hover:bg-[#001580] hover:text-white transition"
          >
            {processingBtn === "reject" ? "Processing..." : "Reject"}
          </button>
          <button
            onClick={handleApprove}
            disabled={processingBtn === "approve"}
            className="w-[200px] h-[40px] rounded-[8px] bg-[#001580] text-white font-medium text-[16px] flex items-center justify-center hover:bg-[#0A1050] transition"
          >
            {processingBtn === "approve" ? "Processing..." : "Approve"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawRequestView;
