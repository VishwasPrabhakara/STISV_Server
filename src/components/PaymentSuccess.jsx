import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import Navbar from "./Navbar";
import Footer from "./Footer";
import receiptHeader from "../assets/STISV_HEADER.png";
import rupeeSymbol from "../assets/symbols/rupee.jpeg";
import dollarSymbol from "../assets/symbols/dollar.jpeg";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

const PaymentSuccess = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const status = new URLSearchParams(location.search).get("status") || "success";

  const uid = sessionStorage.getItem("uid");
  const token = localStorage.getItem("token");
  const API_BASE_URL = "https://stisv.onrender.com";

  // Format phone to international E.164 display
  const formatPhoneInternational = (rawPhone, userCountry = "India") => {
    if (!rawPhone) return "N/A";
    const isoCode = countries.getAlpha2Code(userCountry, "en") || "IN";
    const phoneNumber = parsePhoneNumberFromString(rawPhone, isoCode);
    return phoneNumber && phoneNumber.isValid()
      ? phoneNumber.formatInternational()
      : rawPhone;
  };

  const generateConfirmationNumber = (paymentId) => {
    if (!paymentId || paymentId.length < 4) return "STISV_20250000";
    const last4 = paymentId.slice(-4);
    const asciiSum = last4
      .split("")
      .reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
      .toString()
      .padStart(4, "0")
      .slice(0, 4);
    return `STISV_2025${asciiSum}`;
  };

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
          const latest = user.payments[user.payments.length - 1];
          latest.selectedCategoryDetails = user.selectedCategoryDetails;
          latest.categoriesSelected = user.selectedCategoryDetails?.categories || [];
          setPaymentData(latest);
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
    const rawPhone = sessionStorage.getItem("phone") || "";
    const country = sessionStorage.getItem("country") || "India";
    const phone = formatPhoneInternational(rawPhone, country);
    const dateObj = new Date(paymentData.timestamp);
    const date = `${String(dateObj.getDate()).padStart(2, "0")}-${String(
      dateObj.getMonth() + 1
    ).padStart(2, "0")}-${dateObj.getFullYear()}`;

    const getSymbolImage = (currency) =>
      currency === "INR" ? rupeeSymbol : dollarSymbol;

    const header = new Image();
    let headerLoaded = false;

    const renderPDF = () => {
      if (header.complete && header.naturalWidth !== 0) {
        doc.addImage(header, "PNG", 0, 0, pageWidth, 30);
      }

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(0, 51, 153);
      doc.text(
        "STIS-V 2025 – Registration Fee Payment Receipt",
        pageWidth / 2,
        44,
        { align: "center" }
      );

      // Participant Details
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(0, 0, 0);
      doc.text("Participant Details", 15, 56);
      doc.line(15, 58, pageWidth - 15, 58);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text(`Name: ${name}`, 15, 65);
      doc.text(`Email: ${email}`, 15, 72);
      doc.text(`Phone: ${phone}`, 15, 79);
      doc.text(`Country: ${country}`, 15, 86);

      // Payment Details
      doc.setFont("helvetica", "bold");
      doc.text("Payment Details", 15, 96);
      doc.line(15, 98, pageWidth - 15, 98);

      doc.setFont("helvetica", "normal");
      doc.text(`Payment ID: ${paymentData.paymentId}`, 15, 105);
      doc.text(`Order ID: ${paymentData.orderId}`, 15, 112);
      doc.text(`Date: ${date}`, 15, 119);
      const confirmationNumber = generateConfirmationNumber(paymentData.paymentId);
      doc.text(`Confirmation Number: ${confirmationNumber}`, 15, 126);

      // Fee Breakdown
      let y = 139;
      doc.setFont("helvetica", "bold");
      doc.text("Fee Breakdown", 15, y);
      y += 5;

      const col1X = 15;
      const col2X = pageWidth - 55;
      const tableWidth = pageWidth - 30;
      const rowHeight = 7;

      // Header row
      doc.setDrawColor(0);
      doc.setFillColor(220, 230, 241);
      doc.rect(col1X, y, tableWidth, 8, "FD");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("Type", col1X + 2, y + 6);
      doc.text("Amount", col2X + 2, y + 6);
      y += 8;

      let grandTotal = 0;
      const items = paymentData.selectedCategoryDetails?.categories || [];
      items.forEach((item) => {
        const symbol = getSymbolImage(item.currency);

        // Registration Fee
        doc.rect(col1X, y, tableWidth, rowHeight);
        doc.setFont("helvetica", "bold");
        doc.text(`Registration Fee for ${item.category}`, col1X + 2, y + 5);
        doc.addImage(symbol, "PNG", col2X - 4, y + 1.5, 3, 3);
        doc.text(`${item.baseFee}`, col2X + 2, y + 5);
        y += rowHeight;

        // GST (always show)
        doc.rect(col1X, y, tableWidth, rowHeight);
        doc.setFont("helvetica", "normal");
        doc.text("GST (18%)", col1X + 2, y + 5);
        doc.addImage(symbol, "PNG", col2X - 4, y + 1.5, 3, 3);
        doc.text(`${item.gst}`, col2X + 2, y + 5);
        y += rowHeight;

        // Platform Fee
        doc.rect(col1X, y, tableWidth, rowHeight);
        doc.text("Platform Fee", col1X + 2, y + 5);
        doc.addImage(symbol, "PNG", col2X - 4, y + 1.5, 3, 3);
        doc.text(`${item.platform}`, col2X + 2, y + 5);
        y += rowHeight;

        grandTotal += item.baseFee + item.gst + item.platform;
      });



      // Grand Total
      y += 10;
      doc.setFont("helvetica", "bold");
      doc.text("Grand Total", col1X + 105, y);
      doc.addImage(getSymbolImage(paymentData.currency), "PNG", col2X - 6, y - 3, 3, 3);
      doc.text(`${grandTotal}`, col2X + 2, y);

      y += 20;
     doc.setFontSize(14)

  // the normal part
  const normalText = 'This payment will appear on your statement as ';
  const boldText   = '"Rescons Solutions Pvt. Ltd."';

  // 2. Get page width
      

      // 3. Measure each
      doc.setFont('helvetica','normal');
      const w1 = doc.getTextWidth(normalText);
      doc.setFont('helvetica','bold');
      const w2 = doc.getTextWidth(boldText);

      // 4. Compute starting X so (w1+w2) is centered
      const totalW = w1 + w2;
      const startX = (pageWidth - totalW) / 2;

      // 5. Render them
      // normal part
      doc.setFont('helvetica','normal');
      doc.text(normalText, startX, y);

      // bold part immediately after
      doc.setFont('helvetica','bold');
      doc.text(boldText, startX + w1, y);

      // Footer
      y += 30;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("Conference Secretariat", pageWidth / 2, y, { align: "center" });
      y += 6;
      doc.setFont("helvetica", "normal");
      [
        "STIS-V 2025",
        "Department of Materials Engineering",
        "Indian Institute of Science (IISc), Bengaluru – 560012, India",
        "Webpage: https://materials.iisc.ac.in/stis2025/",
        "Email: stis.mte@iisc.ac.in, Phone: +91-80-22933240",
      ].forEach((line) => {
        doc.text(line, pageWidth / 2, y, { align: "center" });
        y += 6;
      });

      doc.save(`STIS2025_Receipt_${paymentData.paymentId}.pdf`);
    };

    header.onload = () => {
      headerLoaded = true;
      renderPDF();
    };
    header.onerror = () => renderPDF();
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
