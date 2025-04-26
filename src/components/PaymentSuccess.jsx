import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "./PaymentSuccess.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import logo from "../assets/logo-iisc.png"; // Use your actual path // ✅ Local image import (Webpack will base64 it)

const PaymentSuccess = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status") || "success";

  const uid = sessionStorage.getItem("uid") || localStorage.getItem("uid");
  const token = sessionStorage.getItem("token") || localStorage.getItem("token");


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
          headers: { Authorization: `Bearer ${token}` },
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
  
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

    const userName = sessionStorage.getItem("fullName") || "N/A";
    const userEmail = sessionStorage.getItem("email") || "N/A";
    const userPhone = sessionStorage.getItem("phone") || "N/A";

    const img = new Image();
    img.src = logo;

    img.onload = () => {
      doc.addImage(img, "PNG", pageWidth / 2 - 25, 10, 50, 40); // Logo

      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(34, 82, 160);
      doc.text("STIS-V 2025 – Payment Receipt", pageWidth / 2, 55, null, null, "center");

      doc.setDrawColor(180);
      doc.line(20, 60, 190, 60);

      doc.setDrawColor(200);
      doc.roundedRect(15, 65, 180, 130, 2, 2);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text("Participant Information", 20, 72);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(50, 50, 50);
      doc.text(`Name     : ${userName}`, 25, 80);
      doc.text(`Email    : ${userEmail}`, 25, 88);
      doc.text(`Phone    : ${userPhone}`, 25, 96);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text("Payment Details", 20, 112);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(50, 50, 50);
      doc.text(`Payment ID : ${paymentData.paymentId}`, 25, 120);
      doc.text(`Order ID   : ${paymentData.orderId}`, 25, 128);
      doc.text("Amount     :", 25, 136);
      doc.text(`${paymentData.amount} ${paymentData.currency === "INR" ? "Rupees" : "USD"}`,50, 136);
      doc.text(`Category   : ${paymentData.category}`, 25, 144);
      doc.text(`Status     : ${paymentData.status}`, 25, 152);
      doc.text(`Date       : ${new Date(paymentData.timestamp).toLocaleString()}`, 25, 160);

      doc.setFont("times", "italic");
      doc.setFontSize(11);
      doc.setTextColor(80);
      doc.text("Thank you for your payment. We look forward to seeing you at STIS-V 2025!", 20, 180);
      doc.text("For queries, contact: stis.mte@iisc.ac.in", 20, 187);

      doc.save(`STIS2025_Receipt_${paymentData.paymentId}.pdf`);
    };
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
                <button onClick={() => navigate("/")}>Back to Home</button>
              </div>
            </>
          ) : (
            <>
              <p><strong>Payment ID:</strong> {paymentData.paymentId}</p>
              <p><strong>Order ID:</strong> {paymentData.orderId}</p>
              <p><strong>Amount:</strong> {paymentData.currency === "INR" ? "₹" : "$"}{paymentData.amount}</p>
              <p><strong>Status:</strong> {paymentData.status === "captured" ? "Success" : paymentData.status}</p>

              <p><strong>Category:</strong> {paymentData.category}</p>
              <p><strong>Timestamp:</strong> {new Date(paymentData.timestamp).toLocaleString()}</p>

              <div className="btn-group">
                <button onClick={handleDownloadPDF}>Download Receipt (PDF)</button>
                <button onClick={() => navigate("/")}>Back to Home</button>
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
