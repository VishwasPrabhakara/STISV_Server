import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "./PaymentSuccess.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import receiptHeader from "../assets/STISV_HEADER.png";
import receiptFooter from "../assets/STISV_FOOTER.png";
import rupeeSymbol from "../assets/symbols/rupee.jpeg";
import dollarSymbol from "../assets/symbols/dollar.jpeg";

const PaymentSuccess = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const status = new URLSearchParams(location.search).get("status") || "success";

  const uid = sessionStorage.getItem("uid");
  const token = sessionStorage.getItem("token");
  const API_BASE_URL = "https://stisv.onrender.com";

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      if (!uid || !token) {
        setError("You are not logged in. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/user-info/${uid}`);
        const user = res.data;

        if (user && user.payments?.length > 0) {
          const latestPayment = user.payments[user.payments.length - 1];
          latestPayment.selectedCategoryDetails = user.selectedCategoryDetails;
          latestPayment.categoriesSelected = user.selectedCategoryDetails?.categories || [];
          setPaymentData(latestPayment);
        } else {
          setError("No payment records found or session expired.");
        }
      } catch (err) {
        console.error("❌ Failed to fetch payment info:", err);
        setError("Failed to load payment details.");
      } finally {
        setLoading(false);
      }
    };

    if (status === "success") fetchPaymentInfo();
    else setLoading(false);
  }, [uid, token, status]);

  const handleDownloadPDF = () => {
    if (!paymentData) return;

    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const name = sessionStorage.getItem("fullName") || "N/A";
    const email = sessionStorage.getItem("email") || "N/A";
    const phone = sessionStorage.getItem("phone") || "N/A";
    const country = sessionStorage.getItem("country") || "N/A";
    const date = new Date(paymentData.timestamp).toLocaleDateString();

    const getSymbolImage = (currency) => currency === "INR" ? rupeeSymbol : dollarSymbol;

    const header = new Image();
    const footer = new Image();
    let imagesLoaded = 0;

    const renderPDF = () => {
      doc.addImage(header, "PNG", 0, 0, pageWidth, 30);
      doc.setFontSize(16);
      doc.setTextColor(34, 82, 160);
      doc.text("Registration Fee Payment Receipt/Invoice", pageWidth / 2, 42, null, null, "center");

      // === Participant Details ===
    doc.setFontSize(13);
    doc.setFont(undefined, "bold");
    doc.text("Participant Details", 15, 50);
    doc.setLineWidth(0.5);
    doc.line(15, 52, pageWidth - 15, 52);

    doc.setFontSize(11);
    doc.setFont(undefined, "normal");
    doc.text(`Name: ${name}`, 15, 60);
    doc.text(`Email: ${email}`, 15, 67);
    doc.text(`Phone: ${phone}`, 15, 74);
    doc.text(`Country: ${country}`, 15, 81);

    // === Payment Details ===
    doc.setFontSize(13);
    doc.setFont(undefined, "bold");
    doc.text("Payment Details", 15, 90 );
    doc.line(15, 92, pageWidth - 15, 92);

    doc.setFontSize(11);
    doc.setFont(undefined, "normal");
    doc.text(`Payment ID: ${paymentData.paymentId}`, 15, 100);
    doc.text(`Order ID: ${paymentData.orderId}`, 15, 107);
    doc.text(`Date: ${date}`, 15, 114);

      let yPos = 125;
      doc.setFontSize(13);
      doc.setFont(undefined, "bold");
      doc.text("Fee Breakdown:", 15, yPos);
      
      yPos += 8;

      const items = paymentData.categoriesSelected || [];

      items.forEach((item) => {
        const sym = getSymbolImage(item.currency);
        doc.setFont(undefined, "bold");
        doc.text(`Registration Fee for ${item.category}`, 15, yPos);
        doc.addImage(sym, "PNG", pageWidth - 30, yPos - 3, 3, 3);
        doc.text(`${item.baseFee}`, pageWidth - 25, yPos, { align: "left" });
        yPos += 7;

        doc.setFont(undefined, "normal");
        if (item.gst > 0) {
          doc.text("GST (18%)", 15, yPos);
          doc.addImage(sym, "PNG", pageWidth - 30, yPos - 3, 3, 3);
          doc.text(`${item.gst}`, pageWidth - 25, yPos, { align: "left" });
          yPos += 7;
        }

        if (item.platform > 0) {
          doc.text("Platform Fee", 15, yPos);
          doc.addImage(sym, "PNG", pageWidth - 30, yPos - 3, 3, 3);
          doc.text(`${item.platform}`, pageWidth - 25, yPos, { align: "left" });
          yPos += 7;
        }

        doc.setDrawColor(200);
        doc.line(15, yPos, pageWidth - 15, yPos);
        yPos += 8;
      });

      const sym = getSymbolImage(paymentData.currency);
      doc.setFont(undefined, "bold");
      doc.text("Grand Total", 15, yPos);
      doc.addImage(sym, "PNG", pageWidth - 30, yPos - 3, 3, 3);
      doc.text(`${paymentData.amount}`, pageWidth - 25, yPos, { align: "left" });

      doc.addImage(footer, "PNG", 0, pageHeight - 30, pageWidth, 30);
      doc.save(`STIS2025_Receipt_${paymentData.paymentId}.pdf`);
    };

    header.src = receiptHeader;
    footer.src = receiptFooter;
    header.onload = () => ++imagesLoaded === 2 && renderPDF();
    footer.onload = () => ++imagesLoaded === 2 && renderPDF();
  };

  return (
    <>
      <Navbar />
      <div className="payment-success-container">
        <div className="payment-box">
          <h2>{status === "success" ? "🎉 Payment Successful" : "❌ Payment Failed"}</h2>
          {loading ? (
            <p>Loading payment details...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : (
            <>
              <p><strong>Payment ID:</strong> {paymentData.paymentId}</p>
              <p><strong>Order ID:</strong> {paymentData.orderId}</p>
              <p><strong>Amount:</strong> {paymentData.currency === "INR" ? "₹" : "$"}{paymentData.amount}</p>
              <p><strong>Status:</strong> ✅ Success</p>
              <p><strong>Category:</strong> {paymentData.categoriesSelected.map(item => item.category).join(", ")}</p>
              <p><strong>Timestamp:</strong> {new Date(paymentData.timestamp).toLocaleString()}</p>
              <div className="btn-group">
                <button onClick={handleDownloadPDF}>Download Receipt (PDF)</button>
                <button onClick={() => navigate("/")}>Back to Home</button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentSuccess;
