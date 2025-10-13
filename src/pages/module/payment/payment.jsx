import { Navigate, useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import usePayment from "../../../hook/payment/usePayment";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const Payment = () => {
  const { id } = useParams();
  const location = useLocation();
  const payment = location.state?.payment;
  const { paymentById, fetchPaymentById } = usePayment();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPaymentById(id);
  }, []);

  // Convert payment object into key-value array
  const fields = paymentById
    ? [
        { label: "ID", value: id },
        { label: "Transaction ID", value: paymentById.bookingId },
        { label: "User ID", value: paymentById.userId },
        { label: "Order ID", value: paymentById.orderId },
        { label: "Receipt", value: paymentById.receipt },
        { label: "Amount", value: paymentById.amount },
        { label: "Currency", value: paymentById.currency },
        { label: "Status", value: paymentById.status },
      ]
    : [];

  return (
    <div className="  rounded-lg shadow">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-300 mb-4">
        <div className="flex items-center p-3 sm:p-4 bg-white rounded-lg border-b border-gray-300">
          <button
            className="text-gray-600 hover:text-gray-800 mr-3"
            onClick={() => navigate(-1)}
          >
            <IoArrowBackCircleOutline size={30} />
          </button>
          <h2 className="text-base sm:text-lg font-medium text-gray-800">
            View Payment Details
          </h2>
        </div>
      </div>

      {/* Structured Table */}
      {paymentById ? (
        <div className="border rounded-lg p-4 sm:p-6 space-y-4 bg-white px-4">
          {fields.map((field, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start"
            >
              {/* Label */}
              <p className="text-gray-700 font-medium">{field.label}:</p>

              {/* Value */}
              <div className="md:col-span-2">
                <div className="bg-gray-100 px-3 sm:px-4 py-2 rounded-md text-gray-800 break-words">
                  {field.value || "—"}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No payment data found.</p>
      )}
    </div>
  );
};

export default Payment;
