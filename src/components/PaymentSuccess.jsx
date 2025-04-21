import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PaymentSuccess.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PaymentSuccess = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status") || "success"; // success | failure

  const uid = sessionStorage.getItem("uid") || localStorage.getItem("uid");
  const token = localStorage.getItem("token");

  const API_BASE_URL = "https://stisv.onrender.com";

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      if (!uid || !token) {
        setError("You are not logged in. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/get-payments/${uid}`, {
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

    if (status === "success") {
      fetchPaymentInfo();
    } else {
      setLoading(false);
    }
  }, [uid, token, status]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Navbar />
      <div className="payment-success-container">
        <div className="payment-box">
          <h2>{status === "success" ? "🎉 Payment Successful" : "❌ Payment Failed"}</h2>

          {loading ? (
            <p className="loading-text">Loading payment details...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : status === "failure" ? (
            <>
              <p>Unfortunately, your payment could not be processed at this time.</p>
              <p>If any amount was debited, it will be refunded automatically.</p>
              <p>Please try again after some time.</p>
              <div className="btn-group">
                <button onClick={() => navigate("/stis2025/")}>Back to Home</button>
              </div>
            </>
          ) : (
            <>
              <p><strong>Payment ID:</strong> {paymentData.paymentId}</p>
              <p><strong>Order ID:</strong> {paymentData.orderId}</p>
              <p><strong>Amount:</strong> {paymentData.currency === "INR" ? "₹" : "$"}{paymentData.amount}</p>
              <p><strong>Status:</strong> {paymentData.status}</p>
              <p><strong>Category:</strong> {paymentData.category}</p>
              <p><strong>Timestamp:</strong> {new Date(paymentData.timestamp).toLocaleString()}</p>

              <div className="btn-group">
                <button onClick={handlePrint}>🖨 Print / Save Receipt</button>
                <button onClick={() => navigate("/stis2025/")}>🏠 Back to Home</button>
              </div>
            </>
          )}
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default PaymentSuccess;
