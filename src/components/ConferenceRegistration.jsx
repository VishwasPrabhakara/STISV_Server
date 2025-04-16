import React, { useState } from "react";
import "./ConferenceRegistration.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ConferenceRegistration = ({ user }) => {
  const [agreed, setAgreed] = useState(false);

  // Fallback to sessionStorage
  const storedEmail = sessionStorage.getItem("email");
  const storedName = sessionStorage.getItem("fullName");
  const storedCountry = sessionStorage.getItem("country");
  const storedPhone = sessionStorage.getItem("phone");

  const loggedInUser =
    user?.email && user?.country
      ? user
      : storedEmail && storedEmail !== "null"
      ? {
          email: storedEmail,
          name: storedName || "",
          country: storedCountry || "India",
          phone: storedPhone || "",
        }
      : null;

  const today = new Date();
  const earlyBirdDeadline = new Date("2025-06-15");
  const regularDeadline = new Date("2025-11-20");

  const getPrice = (type, region) => {
    const isIndian = region === "Indian";
    if (isIndian) {
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

  const handlePayment = (type, region) => {
    if (!agreed) {
      alert("Please agree to the terms and conditions before proceeding.");
      return;
    }

    const amount = getPrice(type, region);
    const currency = region === "Indian" ? "INR" : "USD";

    const options = {
      key: "rzp_test_zr7KV5WoIMCMbV",
      amount: amount * 100,
      currency,
      name: "STIS 2025 Conference",
      description: `${type} Registration - ${region}`,
      prefill: {
        name: loggedInUser?.name,
        email: loggedInUser?.email,
        contact: loggedInUser?.phone || "",
      },
      theme: {
        color: "#0a3d62",
      },
      handler: function (response) {
        alert("Payment successful. Payment ID: " + response.razorpay_payment_id);
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
          <p>
            Welcome to the registration portal for <strong>STIS 2025</strong>. Below are the detailed categories and applicable charges.
          </p>

          <div className="pricing-grid">
            <div className="pricing-table">
              <h4>For Indian Delegates (INR)</h4>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Early Bird<br /><small>(till 15 June)</small></th>
                    <th>Regular<br /><small>(till 20 Nov)</small></th>
                    <th>Late Registration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Delegate Registration</td>
                    <td>₹15,340</td>
                    <td>₹18,880</td>
                    <td>₹22,420</td>
                  </tr>
                  <tr>
                    <td>Student Delegates</td>
                    <td colSpan="3">₹1,180</td>
                  </tr>
                  <tr>
                    <td>Student Participant</td>
                    <td colSpan="3">₹4,720</td>
                  </tr>
                  <tr>
                    <td>Spouse / Partner</td>
                    <td colSpan="3">₹8,260</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pricing-table">
              <h4>For Foreign Delegates (USD)</h4>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Early Bird<br /><small>(till 15 June)</small></th>
                    <th>Regular<br /><small>(till 20 Nov)</small></th>
                    <th>Late</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Delegate Registration</td>
                    <td>$350</td>
                    <td>$400</td>
                    <td>$500</td>
                  </tr>
                  <tr>
                    <td>Student Delegates</td>
                    <td colSpan="3">$100</td>
                  </tr>
                  <tr>
                    <td>Student Participants</td>
                    <td colSpan="3">$150</td>
                  </tr>
                  <tr>
                    <td>Spouse / Partner</td>
                    <td colSpan="3">$200</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="note">
            <strong>Note:</strong> Charges are inclusive of applicable taxes. Early Bird ends on <strong>15th June 2025</strong>. Prices are subject to change for late registrations.
          </p>
        </section>

        {loggedInUser?.email ? (
          <section className="payment-section">
           <h3>Your Details</h3>
              <div className="user-info-box">
                <p><strong>Name:</strong> {loggedInUser.name}</p>
                <p><strong>Email:</strong> {loggedInUser.email}</p>
                <p><strong>Phone:</strong> {loggedInUser.phone || "N/A"}</p>
                <p><strong>Country:</strong> {loggedInUser.country}</p>
              </div>

            <h3>Select Registration Type & Pay</h3>
            {[
              {
                heading: "Student Delegates",
                type: "Author",
                label: "",
              },
              {
                heading: "Student Participants",
                type: "Participant",
                label: "",
              },
              {
                heading: "Delegate Registration",
                type: "Delegate",
                label: "",
              },
              {
                heading: "Spouse / Partner",
                type: "Spouse",
                label: "",
              },
            ].map(({ heading, type, label }) => (
              <div key={type} className="pricing-group">
                <h4>{heading}</h4>
                <div className="registration-options">
                  {["Indian", "Foreigner"].map((region) => {
                    const price = getPrice(type, region);
                    const regionCurrency = region === "Indian" ? "INR" : "USD";

                    return (
                      <div key={type + region} className="registration-card">
                        <h5>{label}  {region}</h5>
                        <p className="price">{price} {regionCurrency}</p>
                        <button onClick={() => handlePayment(type, region)}>Pay Now</button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                I agree to the{" "}
                <a href="/terms-and-conditions" target="_blank">Terms & Conditions</a>{" "}
                and{" "}
                <a href="/cancellation-and-refunds" target="_blank">Cancellation & Refund Policy</a>.
              </label>
            </div>
          </section>
        ) : (
          <div className="login-warning-box">
            <p>
              Please{" "}
              <a
                href={`/stis2025/login-signup?redirect=${encodeURIComponent(
                  window.location.pathname
                )}`}
              >
                <strong>log in</strong>
              </a>{" "}
              to complete your registration and payment.
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

export default ConferenceRegistration;
