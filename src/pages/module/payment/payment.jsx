import { useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
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
    <div className="min-h-screen w-full flex flex-col p-2">
      {/* Header */}
      <div className="w-full flex items-center p-4 bg-white shadow rounded-lg mb-6">
        <button
          className="text-gray-600 hover:text-gray-800 mr-3"
          onClick={() => navigate(-1)}
        >
          <IoArrowBackCircleOutline size={30} />
        </button>
        <h2 className="text-lg font-medium text-gray-800">
          View Payment Details
        </h2>
      </div>

      {/* Table container filling remaining space */}
      <div className="flex-1 w-full bg-white shadow rounded-b-lg overflow-auto rounded-lg p-6">
        {paymentById ? (
          <div className="space-y-4 h-full">
            {fields.map((field, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start"
              >
                <p className="text-gray-700 font-medium">{field.label}:</p>
                <div className="md:col-span-2">
                  <div className="bg-gray-100 px-4 py-2 rounded-md text-gray-800 break-words">
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
    </div>
  );
};

export default Payment;
