import {useLocation, useParams} from "react-router-dom";

const Payment = () => {
    const {id} = useParams();
    const location = useLocation();
    const payment = location.state?.payment;

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            {payment ? (
                <div className="space-y-2">
                    <p>
                        <strong>ID:</strong> {id}
                    </p>
                    <p>
                        <strong>Transaction ID:</strong> {payment.transactionId}
                    </p>
                    <p>
                        <strong>Order ID:</strong> {payment.orderId}
                    </p>
                    <p>
                        <strong>Amount:</strong> {payment.amount}
                    </p>
                    <p>
                        <strong>Mode:</strong> {payment.mode}
                    </p>
                    <p>
                        <strong>Remarks:</strong> {payment.remarks}
                    </p>
                </div>
            ) : (
                <p>No payment data found.</p>
            )}
        </div>
    );
};

export default Payment;
