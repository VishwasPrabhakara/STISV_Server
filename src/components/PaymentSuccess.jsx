import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const uid = sessionStorage.getItem("uid");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      if (!uid || !token) {
        setError("User not authenticated. Please login again.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/get-payments/${uid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.payments && res.data.payments.length > 0) {
          const latestPayment = res.data.payments[res.data.payments.length - 1];
          setPaymentData(latestPayment);
        } else {
          setError("No payment records found.");
        }
      } catch (err) {
        console.error("❌ Failed to fetch payment info:", err);
        setError("Failed to load payment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentInfo();
  }, [uid, token]);

  return (
    <div className="payment-success-container">
      <div className="success-card">
        <h2>🎉 Payment Successful</h2>

        {loading ? (
          <p className="loading-text">Loading payment details...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <>
            <p><strong>Payment ID:</strong> {paymentData.paymentId}</p>
            <p><strong>Order ID:</strong> {paymentData.orderId}</p>
            <p><strong>Amount:</strong> {paymentData.currency === "INR" ? "₹" : "$"}{paymentData.amount}</p>
            <p><strong>Status:</strong> {paymentData.status}</p>
            <p><strong>Timestamp:</strong> {new Date(paymentData.timestamp).toLocaleString()}</p>
          </>
        )}

        <a href="/stis2025/" className="back-btn">⬅ Back to Home</a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
