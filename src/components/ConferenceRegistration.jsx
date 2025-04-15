import React, { useState } from "react";
import "./ConferenceRegistration.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ConferenceRegistration = ({ user }) => {
  const [agreed, setAgreed] = useState(false);

  const today = new Date();
  const earlyBirdDeadline = new Date("2025-06-15");
  const regularDeadline = new Date("2025-11-20");

  const isForeign = user?.country?.toLowerCase() !== "india";

  const getPrice = (type) => {
    if (!isForeign) {
      switch (type) {
        case "Delegate":
          return today <= earlyBirdDeadline
            ? 15340
            : today <= regularDeadline
            ? 18880
            : 22420;
        case "Author":
          return 1180;
        case "Participant":
          return 4720;
        case "Spouse":
          return 8260;
        default:
          return 0;
      }
    } else {
      switch (type) {
        case "Delegate":
          return today <= earlyBirdDeadline
            ? 350
            : today <= regularDeadline
            ? 400
            : 500;
        case "Author":
          return 100;
        case "Participant":
          return 150;
        case "Spouse":
          return 200;
        default:
          return 0;
      }
    }
  };

  const currency = isForeign ? "USD" : "INR";

  const options = [
    { key: "Delegate", label: "Delegate Registration" },
    { key: "Author", label: "Student Author (Presenting)" },
    { key: "Participant", label: "Student Participant (Attending)" },
    { key: "Spouse", label: "Spouse / Partner" },
  ];

  const handlePayment = (type) => {
    if (!agreed) {
      alert("Please agree to the terms and conditions before proceeding.");
      return;
    }

    const amount = getPrice(type);

    const options = {
      key: "rzp_test_7Y3qYx6nLr1qE1", // replace with your actual test key
      amount: amount * 100, // in paise
      currency: currency,
      name: "STIS 2025 Conference",
      description: `${type} Registration`,
      prefill: {
        name: user?.name,
        email: user?.email,
      },
      theme: {
        color: "#0a3d62",
      },
      handler: function (response) {
        alert("Payment successful. Payment ID: " + response.razorpay_payment_id);
        // You can now send this response.payment_id to your backend
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Navbar />
    <div className="registration-container">
      <h2 className="reg-title">Conference Registration</h2>

      <section className="registration-info-box">
        <h3>Registration Information</h3>
        <p>Below are the registration charges based on your category and region:</p>

        <div className="pricing-table">
          <div className="pricing-header">
            <span>Category</span>
            <span>Early Bird</span>
            <span>Regular</span>
            <span>On-spot</span>
          </div>

          <div className="pricing-row">
            <span>Delegate</span>
            <span>{isForeign ? "$350" : "₹15,340"}</span>
            <span>{isForeign ? "$400" : "₹18,880"}</span>
            <span>{isForeign ? "$500" : "₹22,420"}</span>
          </div>

          <div className="pricing-row">
            <span>Student Author</span>
            <span colSpan="3">{isForeign ? "$100" : "₹1,180"}</span>
          </div>

          <div className="pricing-row">
            <span>Student Participant</span>
            <span colSpan="3">{isForeign ? "$150" : "₹4,720"}</span>
          </div>

          <div className="pricing-row">
            <span>Spouse / Partner</span>
            <span colSpan="3">{isForeign ? "$200" : "₹8,260"}</span>
          </div>
        </div>

        <p className="note">
          <strong>Note:</strong> Early bird deadline ends on <strong>15th June 2025</strong>.
        </p>
      </section>

      <section className="payment-section">
        <h3>Select Registration Type & Pay</h3>

        <div className="registration-options">
          {options.map(({ key, label }) => (
            <div key={key} className="registration-card">
              <h4>{label}</h4>
              <p className="price">
                {getPrice(key)} {currency}
              </p>
              <button onClick={() => handlePayment(key)}>Pay Now</button>
            </div>
          ))}
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            I agree to the{" "}
            <a href="/terms-and-conditions" target="_blank">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="/cancellation-and-refunds" target="_blank">
              Cancellation & Refund Policy
            </a>
          </label>
        </div>
      </section>
    </div>
    <br />
    <br />
    <Footer />
    </>
  );
};

export default ConferenceRegistration;
