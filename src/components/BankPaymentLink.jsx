import React, { useState } from "react";
import axios from "axios";
import "./BankPaymentLink.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const API_BASE_URL = "https://stisv.onrender.com";

const BankPaymentTransaction = () => {
  const [transactionId, setTransactionId] = useState("");
  const [receiptFile, setReceiptFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [uploadedReceiptUrl, setUploadedReceiptUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && !file.type.startsWith("image/")) {
      alert("Only image files (JPG, PNG) are allowed.");
      return;
    }

    setReceiptFile(file);
  };

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();

    if (!transactionId.trim() || !receiptFile) {
      alert("Please enter Transaction ID and upload the receipt image.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("receiptFile", receiptFile);
      formData.append("transactionId", transactionId);

      const backendRes = await axios.post(
        `${API_BASE_URL}/upload-receipt`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("✅ Upload Success:", backendRes.data);
      setUploadedReceiptUrl(backendRes.data.url || "");
      setSubmitted(true);
      setTransactionId("");
      setReceiptFile(null);
    } catch (err) {
      console.error("❌ Upload Error:", err);
      alert(
        err?.response?.data?.message ||
          "Submission failed. Please try again later."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bank-transaction-container">
        {!submitted ? (
          <>
            <h2>Bank Transfer Submission</h2>
            <form className="transaction-form" onSubmit={handleTransactionSubmit}>
              <label htmlFor="transactionId">Transaction ID:</label>
              <input
                type="text"
                id="transactionId"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter your Transaction ID"
                required
              />

              <label htmlFor="receiptFile">Upload Bank Receipt (JPG/PNG only):</label>
              <input
                type="file"
                id="receiptFile"
                accept="image/*"
                onChange={handleFileChange}
                required
              />

              <button type="submit" className="submit-button" disabled={uploading}>
                {uploading ? "Uploading..." : "Submit"}
              </button>
            </form>
          </>
        ) : (
          <div className="confirmation-message">
            <h3>Thank you!</h3>
            <p>Your bank transfer details have been submitted successfully.</p>
            {uploadedReceiptUrl && (
              <p>
                ✅ View your uploaded receipt:{" "}<br  />
                <a href={uploadedReceiptUrl} target="_blank" rel="noopener noreferrer">
  Receipt
</a>

              </p>
            )}
            <p>We will review and confirm your payment within 1–2 weeks.</p>
          </div>
        )}
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default BankPaymentTransaction;
