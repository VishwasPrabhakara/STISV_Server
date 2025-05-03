import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./AllPayments.css";
import receiptHeader from "../assets/STISV_HEADER.png";
import rupeeSymbol from "../assets/symbols/rupee.jpeg";
import dollarSymbol from "../assets/symbols/dollar.jpeg";

const AllPayments = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const uid = sessionStorage.getItem("uid");
  const token = localStorage.getItem("token");
  const API_BASE_URL = "https://stisv.onrender.com";

  useEffect(() => {
    const fetchPayments = async () => {
      if (!uid || !token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/user-info/${uid}`);
        const user = res.data;

        if (user?.payments?.length > 0) {
          const enrichedPayments = user.payments.map(pmt => ({
            ...pmt,
            selectedCategoryDetails: user.selectedCategoryDetails,
            categoriesSelected: user.selectedCategoryDetails?.categories || []
          }));
          setPaymentData(enrichedPayments);
        } else {
          setError("No payment records found.");
        }
      } catch (err) {
        setError("Failed to load payment info.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [uid, token]);

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

  const formatTimestamp = (timestamp) => {
    const d = new Date(timestamp);
    return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
  };

  const generatePDF = (payment) => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

    const name = sessionStorage.getItem("fullName") || "N/A";
    const email = sessionStorage.getItem("email") || "N/A";
    const phone = "+91 8792826161";
    const country = sessionStorage.getItem("country") || "N/A";
    const dateObj = new Date(payment.timestamp);
    const date = `${String(dateObj.getDate()).padStart(2, '0')}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${dateObj.getFullYear()}`;
    const confirmationNumber = generateConfirmationNumber(payment.paymentId);
    const getSymbolImage = (currency) => currency === "INR" ? rupeeSymbol : dollarSymbol;

    const header = new Image();
    header.src = receiptHeader;

    header.onload = () => {
      doc.addImage(header, "PNG", 0, 0, pageWidth, 30);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(0, 51, 153);
      doc.text("STIS-V 2025 – Registration Fee Payment Receipt", pageWidth / 2, 44, { align: "center" });

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

      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("Payment Details", 15, 96);
      doc.line(15, 98, pageWidth - 15, 98);

      doc.setFont("helvetica", "normal");
      doc.text(`Payment ID: ${payment.paymentId}`, 15, 105);
      doc.text(`Order ID: ${payment.orderId}`, 15, 112);
      doc.text(`Date: ${date}`, 15, 119);
      doc.text(`Confirmation Number: ${confirmationNumber}`, 15, 126);

      let y = 139;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("Fee Breakdown", 15, y);
      y += 5;

      const col1X = 15, col2X = pageWidth - 55, tableWidth = pageWidth - 30;
      doc.setDrawColor(0);
      doc.setFillColor(220, 230, 241);
      doc.rect(col1X, y, tableWidth, 8, "FD");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("Type", col1X + 2, y + 6);
      doc.text("Amount", col2X + 2, y + 6);
      y += 8;

      let grandTotal = 0;
      const items = payment.selectedCategoryDetails?.categories || [];

      items.forEach((item) => {
        const symbol = getSymbolImage(item.currency);
        const rowHeight = 7;

        doc.setDrawColor(180);
        doc.rect(col1X, y, tableWidth, rowHeight);
        doc.setFont("helvetica", "bold");
        doc.text(`Registration Fee for ${item.category}`, col1X + 2, y + 5);
        doc.addImage(symbol, "PNG", col2X - 4, y + 1.5, 3, 3);
        doc.text(`${item.baseFee}`, col2X + 2, y + 5);
        y += rowHeight;

        doc.rect(col1X, y, tableWidth, rowHeight);
        doc.setFont("helvetica", "normal");
        doc.text("GST (18%)", col1X + 2, y + 5);
        doc.addImage(symbol, "PNG", col2X - 4, y + 1.5, 3, 3);
        doc.text(`${item.gst}`, col2X + 2, y + 5);
        y += rowHeight;

        doc.rect(col1X, y, tableWidth, rowHeight);
        doc.text("Platform Fee", col1X + 2, y + 5);
        doc.addImage(symbol, "PNG", col2X - 4, y + 1.5, 3, 3);
        doc.text(`${item.platform}`, col2X + 2, y + 5);
        y += rowHeight;

        grandTotal += item.baseFee + item.gst + item.platform;
      });

      y += 10;
      doc.setFont("helvetica", "bold");
      doc.text("Grand Total", col1X + 105, y);
      doc.addImage(getSymbolImage(payment.currency), "PNG", col2X - 6, y - 3, 3, 3);
      doc.text(`${grandTotal}`, col2X + 2, y);

      y += 30;
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

      doc.save(`STIS2025_Receipt_${payment.paymentId}.pdf`);
    };
  };

  return (
    <>
      <Navbar />
      <div className="all-payments-container">
        <h2>Your Payment History</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : paymentData.length === 0 ? (
          <p>No payments found.</p>
        ) : (
          <table className="payments-table">
            <thead>
              <tr>
                <th style={{ width: "15%" }}>Payment ID</th>
                <th style={{ width: "15%" }}>Confirmation No.</th>
                <th style={{ width: "10%" }}>Amount</th>
                <th style={{ width: "30%" }}>Categories</th>
                <th style={{ width: "20%" }}>Timestamp</th>
                <th style={{ width: "15%" }}>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {paymentData.map((pmt, idx) => (
                <tr key={idx}>
                  <td>{pmt.paymentId}</td>
                  <td>{generateConfirmationNumber(pmt.paymentId)}</td>
                  <td>{pmt.currency === "INR" ? "₹" : "$"}{pmt.amount}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>
                    {(pmt.categoriesSelected || pmt.selectedCategoryDetails?.categories || [])
                      .map(cat => cat.category)
                      .join("\n")}
                  </td>
                  <td>{formatTimestamp(pmt.timestamp)}</td>
                  <td>
                    <button onClick={() => generatePDF(pmt)}>Download Receipt</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <br /><br />
      <br /><br />
      <Footer />
    </>
  );
};

export default AllPayments;
