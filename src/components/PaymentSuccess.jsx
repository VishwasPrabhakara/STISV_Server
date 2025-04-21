import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "./PaymentSuccess.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
const logo = "https://iisc.ac.in/wp-content/themes/iisc/images/favicon/apple-icon-57x57.png"; // use your actual image URL


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

  const handleDownloadPDF = () => {
    if (!paymentData) return;

    const doc = new jsPDF();

    const img = new Image();
    img.src = logo;

    img.onload = () => {
      doc.addImage(img, "PNG", 80, 10, 50, 20); // x, y, width, height

      doc.setFontSize(14);
      doc.text("STIS-V 2025 – Payment Receipt", 60, 40);

      doc.setFontSize(12);
      doc.text(`Name: ${sessionStorage.getItem("fullName") || "N/A"}`, 20, 60);
      doc.text(`Email: ${sessionStorage.getItem("email") || "N/A"}`, 20, 70);
      doc.text(`Phone: ${sessionStorage.getItem("phone") || "N/A"}`, 20, 80);

      doc.text(`Payment ID: ${paymentData.paymentId}`, 20, 100);
      doc.text(`Order ID: ${paymentData.orderId}`, 20, 110);
      doc.text(
        `Amount: ${paymentData.currency === "INR" ? "₹" : "$"}${paymentData.amount}`,
        20,
        120
      );
      doc.text(`Category: ${paymentData.category}`, 20, 130);
      doc.text(`Status: ${paymentData.status}`, 20, 140);
      doc.text(
        `Timestamp: ${new Date(paymentData.timestamp).toLocaleString()}`,
        20,
        150
      );

      doc.setFontSize(10);
      doc.text(
        "Thank you for your payment. We look forward to your participation!",
        20,
        170
      );

      doc.save("STIS2025_Payment_Receipt.pdf");
    };
  };

  return (
    <>
      <Navbar />
      <div className="payment-success-container">
        <div className="payment-box">
          <h2>
            {status === "success"
              ? "🎉 Payment Successful"
              : "❌ Payment Failed"}
          </h2>

          {loading ? (
            <p className="loading-text">Loading payment details...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : status === "failure" ? (
            <>
              <p>Unfortunately, your payment could not be processed at this time.</p>
              <p>If any amount was debited, it will be refunded.</p>
              <p>Please try again after some time.</p>
              <div className="btn-group">
                <button onClick={() => navigate("/")}>🏠 Back to Home</button>
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
                <button onClick={handleDownloadPDF}>🖨 Download Receipt (PDF)</button>
                <button onClick={() => navigate("/")}>🏠 Back to Home</button>
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
