import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import Navbar from "./Navbar";
import Footer from "./Footer";
import "./AllPayments.css";

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

    // --- Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(34, 82, 160);
    doc.text("STIS-V 2025", pageWidth / 2, 20, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("Contact Information:", 14, 28);
    doc.text("Phone: [Update Phone]", 14, 32);
    doc.text("Email: [Update Email]", 14, 36);
    doc.text("Website: [Update Website URL]", 14, 40);

    // --- Summary
    doc.setFontSize(14);
    doc.text("Summary", 14, 50);

    doc.setFontSize(10);
    doc.text(`Payment Date: ${new Date(payment.timestamp).toLocaleDateString()}`, 14, 58);
    doc.text(`Total Value: ₹${payment.amount}`, 14, 62);
    doc.text(`Payment Processed: ₹${payment.amount}`, 14, 66);
    doc.text(`Ref. Number: ${payment.paymentId}`, 14, 70);
    doc.text(`Bank Auth: ${payment.bankAuth || "N/A"}`, 14, 74);

    // --- Receipt Table
    doc.setFontSize(14);
    doc.text("Receipt", 14, 84);

    const tableRows = [];

    if (payment.items && payment.items.length > 0) {
      payment.items.forEach((item) => {
        tableRows.push([`${item.key} - Registration Fee`, 1, `₹${item.base}`, `₹${item.base}`]);
        if (item.gst && item.gst > 0) {
          tableRows.push(["GST (18%)", 1, `₹${item.gst}`, `₹${item.gst}`]);
        }
        if (item.platform && item.platform > 0) {
          tableRows.push(["Platform Fee", 1, `₹${item.platform}`, `₹${item.platform}`]);
        }
      });
    } else {
      // fallback if items not present
      tableRows.push(["Registration Fee", 1, `₹${payment.amount}`, `₹${payment.amount}`]);
    }

    autoTable(doc, {
      startY: 88,
      head: [["Description", "Quantity", "Unit Amount", "Amount"]],
      body: tableRows,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    const finalY = doc.lastAutoTable.finalY + 5;

    // --- Grand Total
    doc.setFontSize(10);
    doc.text(`Grand Total: ₹${payment.amount}`, 14, finalY + 5);

    // --- Tax Summary
    doc.setFontSize(14);
    doc.text("Tax Summary", 14, finalY + 15);

    doc.setFontSize(10);
    if (payment.items && payment.items.length > 0) {
      const totalGst = payment.items.reduce((sum, item) => sum + (item.gst || 0), 0);
      doc.text(`* GST Included: ₹${totalGst}`, 14, finalY + 22);
    } else {
      doc.text("* GST Included: ₹0", 14, finalY + 22);
    }

    // --- Booking Confirmation
    doc.setFontSize(14);
    doc.text("Booking Confirmation", 14, finalY + 32);

    doc.setFontSize(10);
    doc.text(`Conference: STIS-V 2025`, 14, finalY + 40);
    doc.text(`Dates: 9-12 December, 2025`, 14, finalY + 44);
    doc.text(`Venue: IISc, Bengaluru`, 14, finalY + 48);
    doc.text(`Reference Code: ${payment.orderId}`, 14, finalY + 52);

    // --- Attendee Details
    doc.setFontSize(14);
    doc.text("Attendee Details", 14, finalY + 62);

    doc.setFontSize(10);
    doc.text(`First Name: ${userName.split(" ")[0]}`, 14, finalY + 70);
    doc.text(`Last Name: ${userName.split(" ")[1] || ""}`, 14, finalY + 74);
    doc.text(`Email: ${userEmail}`, 14, finalY + 78);
    doc.text(`Phone: ${userPhone}`, 14, finalY + 82);
    doc.text(`University/Organization: [Update University]`, 14, finalY + 86);
    doc.text(`Designation: [Update Designation]`, 14, finalY + 90);

    // --- Refund Policy
    doc.setFontSize(14);
    doc.text("Refund Policy", 14, finalY + 100);

    doc.setFontSize(10);
    doc.text("To request a refund, please contact the event coordinator with your name,", 14, finalY + 108);
    doc.text("email address, invoice/receipt number, and reason for request.", 14, finalY + 112);
    doc.text("Approval of refund is at the discretion of organizers.", 14, finalY + 116);

    doc.save(`STISV2025_Receipt_${payment.paymentId}.pdf`);
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
