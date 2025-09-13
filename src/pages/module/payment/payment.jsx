import {useLocation, useParams} from "react-router-dom";
import {useEffect} from "react";
import usePayment from "../../../hook/payment/usePayment";

const Payment = () => {
    const {id} = useParams();
    const location = useLocation();
    const payment = location.state?.payment;
    const {paymentById, fetchPaymentById} = usePayment();
    useEffect(() => {
        fetchPaymentById(id);
    }, []);
    console.log("paymentid", paymentById);

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            {paymentById ? (
                <div className="space-y-2">
                    <p>
                        <strong>ID:</strong> {id}
                    </p>
                    <p>
                        <strong>Transaction ID:</strong> {paymentById.bookingId}
                    </p>
                    <p>
                        <strong>User ID:</strong> {paymentById.userId}
                    </p>

                    <p>
                        <strong>Order ID:</strong> {paymentById.orderId}
                    </p>
                    <p>
                        <strong>Receipt:</strong> {paymentById.receipt}
                    </p>
                    <p>
                        <strong>Amount:</strong> {paymentById.amount}
                    </p>
                    <p>
                        <strong>Currency:</strong> {paymentById.currency}
                    </p>
                    <p>
                        <strong>Status:</strong> {paymentById.status}
                    </p>
                    {/* <p>
                        <strong>Mode:</strong> {paymentById.mode}
                    </p>
                    <p>
                        <strong>Remarks:</strong> {paymentById.remarks}
                    </p> */}
                </div>
            ) : (
                <p>No payment data found.</p>
            )}
        </div>
    );
};

export default Payment;
