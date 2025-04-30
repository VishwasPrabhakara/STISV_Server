import React, { useState } from "react";
import axios from "axios";
import "./BankPaymentTransaction.css";
import Navbar from "./Navbar";
import Footer from "./Footer";


const API_BASE_URL = "https://stisv.onrender.com"; // ✅ your backend server

const BankPaymentTransaction = () => {
  const [transactionId, setTransactionId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [uploadStep, setUploadStep] = useState(false);

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();

    if (transactionId.trim() === "") {
      alert("Please enter a valid Transaction ID.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/save-transaction-id`, {
        transactionId: transactionId,
      });

      setUploadStep(true); // ✅ Now show Upload Button
    } catch (err) {
      console.error("Failed to save Transaction ID", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleDone = () => {
    setSubmitted(true); // ✅ Finally show Thank You message
  };

  return (
    <> 
    <Navbar />

    <div className="bank-transaction-container">
      {!submitted ? (
        <>
          <h2>Submit Bank Transfer Transaction ID</h2>

          {!uploadStep ? (
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
              <button type="submit" className="submit-button">
                Submit Transaction ID
              </button>
            </form>
          ) : (
            <>
              <p className="instructions">
                Your Transaction ID has been received.<br />
                Now upload your Bank Receipt using the button below:
              </p>

              <a
                href="https://indianinstituteofscience-my.sharepoint.com/:f:/g/personal/swarajk_iisc_ac_in/Ekl-4haACA9Bp984fu6X0v8BwpNKTay8R2cIglu8YaCRvg?e=ZN8FDl"
                target="_blank"
                rel="noopener noreferrer"
                className="upload-button"
              >
                Upload Receipt
              </a>

              <button onClick={handleDone} className="done-button">
                Done
              </button>
            </>
          )}
        </>
      ) : (
        <div className="confirmation-message">
          <h3>Thank you!</h3>
          <p>
            After successful payment verification, we will send you a confirmation email and receipt within 1–2 weeks.
          </p>
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
