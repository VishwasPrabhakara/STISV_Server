import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "./PaymentSuccess.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import receiptHeader from "../assets/STISV_HEADER.png";
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
  
    const name = sessionStorage.getItem("fullName") || "N/A";
    const email = sessionStorage.getItem("email") || "N/A";
    const phone = "+91 8792826161";
    const country = sessionStorage.getItem("country") || "N/A";
    const dateObj = new Date(paymentData.timestamp);
    const date = `${String(dateObj.getDate()).padStart(2, '0')}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${dateObj.getFullYear()}`;
    const confirmationNumber = `STISV_2025${Math.floor(1000 + Math.random() * 9000)}`;
  
    const getSymbolImage = (currency) => currency === "INR" ? rupeeSymbol : dollarSymbol;
  
    const header = new Image();
    let headerLoaded = false;
  
    const renderPDF = () => {
      if (header.complete && header.naturalWidth !== 0) {
        doc.addImage(header, "PNG", 0, 0, pageWidth, 30);
      }
  
      // Heading
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(0, 51, 153);
      doc.text("STIS-V 2025 – Registration Fee Payment Receipt", pageWidth / 2, 40, { align: "center" });
  
      // Participant Details
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(0, 0, 0);
      doc.text("Participant Details", 15, 52);
      doc.line(15, 54, pageWidth - 15, 54);
  
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text(`Name: ${name}`, 15, 61);
      doc.text(`Email: ${email}`, 15, 68);
      doc.text(`Phone: ${phone}`, 15, 75);
      doc.text(`Country: ${country}`, 15, 82);
  
      // Payment Details
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("Payment Details", 15, 92);
      doc.line(15, 94, pageWidth - 15, 94);
  
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text(`Payment ID: ${paymentData.paymentId}`, 15, 101);
      doc.text(`Order ID: ${paymentData.orderId}`, 15, 108);
      doc.text(`Date: ${date}`, 15, 115);
      doc.text(`Confirmation Number: ${confirmationNumber}`, 15, 122);
  
      // === Fee Breakdown Table ===
      let y = 135;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("Fee Breakdown", 15, y);
      y += 5;
  
      // Table Borders & Headers
      const col1X = 15, col2X = pageWidth - 55, tableWidth = pageWidth - 30;
      doc.setDrawColor(0);
      doc.setFillColor(220, 230, 241);
      doc.rect(col1X, y, tableWidth, 8, "FD");
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text("Type", col1X + 2, y + 6);
      doc.text("Amount", col2X + 2, y + 6);
      y += 8;
  
      let grandTotal = 0;
      const items = paymentData.selectedCategoryDetails?.categories || [];
      
      items.forEach((item) => {
        const symbol = getSymbolImage(item.currency);
        const rowHeight = 7;
  
        // Registration Fee
        doc.setDrawColor(180);
        doc.setLineWidth(0.1);
        doc.rect(col1X, y, tableWidth, rowHeight);
        doc.setFont("helvetica", "bold");
        doc.text(`Registration Fee for ${item.category}`, col1X + 2, y + 5);
        doc.addImage(symbol, "PNG", col2X - 4, y + 1.5, 3, 3);
        doc.text(`${item.baseFee}`, col2X + 2, y + 5);
        y += rowHeight;
  
        // GST
        doc.rect(col1X, y, tableWidth, rowHeight);
        doc.setFont("helvetica", "normal");
        doc.text("GST (18%)", col1X + 2, y + 5);
        doc.addImage(symbol, "PNG", col2X - 4, y + 1.5, 3, 3);
        doc.text(`${item.gst}`, col2X + 2, y + 5);
        y += rowHeight;
  
        // Platform
        doc.rect(col1X, y, tableWidth, rowHeight);
        doc.text("Platform Fee", col1X + 2, y + 5);
        doc.addImage(symbol, "PNG", col2X - 4, y + 1.5, 3, 3);
        doc.text(`${item.platform}`, col2X + 2, y + 5);
        y += rowHeight;
  
        grandTotal += item.baseFee + item.gst + item.platform;
         // vertical separator between columns

      });
  
      // === Grand Total (outside table) ===
      y += 10;
      doc.setFont("helvetica", "bold");
      doc.text("Grand Total", col1X+100, y);
      doc.addImage(getSymbolImage(paymentData.currency), "PNG", col2X - 6, y - 3, 3, 3);
      doc.text(`${grandTotal}`, col2X + 2, y);
  
      // === Footer: STISV Conference ===
      y += 15;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("Conference Secretariat", pageWidth / 2, y, { align: "center" });
      y += 6;
  
      doc.setFont("helvetica", "normal");
      doc.text("STIS-V 2025", pageWidth / 2, y, { align: "center" }); y += 6;
      doc.text("Department of Materials Engineering", pageWidth / 2, y, { align: "center" }); y += 6;
      doc.text("Indian Institute of Science (IISc), Bengaluru – 560012, India", pageWidth / 2, y, { align: "center" }); y += 6;
      doc.text("Webpage: https://materials.iisc.ac.in/stis2025/", pageWidth / 2, y, { align: "center" }); y += 6;
      doc.text("Email: stis.mte@iisc.ac.in, Phone: +91-80-22933240", pageWidth / 2, y, { align: "center" });
  
      doc.save(`STIS2025_Receipt_${paymentData.paymentId}.pdf`);
    };
  
    header.onload = () => {
      headerLoaded = true;
      renderPDF();
    };
  
    header.onerror = () => {
      console.warn("❌ Header image failed to load.");
      renderPDF();
    };
  
    setTimeout(() => {
      if (!headerLoaded) renderPDF();
    }, 2000);
  
    header.src = receiptHeader;
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
