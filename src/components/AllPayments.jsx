import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllPayments.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import logo from "../assets/logo-iisc.png"; // Base64 image import
import jsPDF from "jspdf";

const AllPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const uid = sessionStorage.getItem("uid") || localStorage.getItem("uid");
  const token = localStorage.getItem("token");
  const API_BASE_URL = "https://stisv.onrender.com";

  useEffect(() => {
    if (!sessionStorage.getItem("email")) {
      window.location.href = `/stis2025/login-signup?redirect=/stis2025/payment-reciepts`;
      return;
    }

    const fetchPayments = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/get-payments/${uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPayments(res.data.payments || []);
      } catch (err) {
        setError("Failed to load payments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [uid, token]);

  const generatePDF = (payment) => {
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
      doc.text(`Payment ID : ${payment.paymentId}`, 25, 120);
      doc.text(`Order ID   : ${payment.orderId}`, 25, 128);
      doc.text("Amount     :", 25, 136);
      doc.text(`${payment.amount} ${payment.currency === "INR" ? "Rupees" : "USD"}`,50, 136);
      doc.text(`Category   : ${payment.category}`, 25, 144);
      doc.text(`Status     : ${payment.status}`, 25, 152);
      doc.text(`Date       : ${new Date(payment.timestamp).toLocaleString()}`, 25, 160);

      doc.setFont("times", "italic");
      doc.setFontSize(11);
      doc.setTextColor(80);
      doc.text("Thank you for your payment. We look forward to seeing you at STIS-V 2025!", 20, 180);
      doc.text("For queries, contact: stis.mte@iisc.ac.in", 20, 187);

      doc.save(`STIS2025_Receipt_${payment.paymentId}.pdf`);
    };
  };

  return (
    <>
      <Navbar />
      <div className="all-payments-container">
        <h2>Your Payment History</h2>
        {loading ? (
          <p className="loading">Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : payments.length === 0 ? (
          <p>No payments found.</p>
        ) : (
          <table className="payments-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Order ID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Category</th>
                <th>Timestamp</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pmt, index) => (
                <tr key={index}>
                  <td>{pmt.paymentId}</td>
                  <td>{pmt.orderId}</td>
                  <td>{pmt.amount} {pmt.currency === "INR" ? "Rupees" : "USD"}</td>
                  <td>{pmt.status}</td>
                  <td>{pmt.category}</td>
                  <td>{new Date(pmt.timestamp).toLocaleString()}</td>
                  <td>
                    <button onClick={() => generatePDF(pmt)}>Download Receipt</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default AllPayments;
