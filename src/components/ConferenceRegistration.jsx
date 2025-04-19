import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ConferenceRegistration.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ConferenceRegistration = ({ user }) => {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ added
  const navigate = useNavigate();

  // Fallback to sessionStorage
  const storedEmail = sessionStorage.getItem("email");
  const storedName = sessionStorage.getItem("fullName");
  const storedCountry = sessionStorage.getItem("country");
  const storedPhone = sessionStorage.getItem("phone");
  const storedUid = sessionStorage.getItem("uid");

  const loggedInUser =
    user?.email && user?.country
      ? user
      : storedEmail && storedEmail !== "null"
      ? {
          uid: storedUid,
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
      notes: {
        uid: loggedInUser?.uid || "",
        email: loggedInUser?.email || "",
      },
      theme: {
        color: "#0a3d62",
      },
      handler: async function (response) {
        setLoading(true);
        const paymentData = {
          uid: loggedInUser?.uid,
          email: loggedInUser?.email,
          name: loggedInUser?.name,
          phone: loggedInUser?.phone,
          country: loggedInUser?.country,
          amount,
          currency,
          type,
          region,
          paymentId: response.razorpay_payment_id,
          status: "Success",
          timestamp: new Date().toISOString(),
        };

        try {
          await fetch("https://stisv.onrender.com/save-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
          });

          navigate(`/stis2025/payment-success?paymentId=${response.razorpay_payment_id}`);
        } catch (err) {
          console.error("Error saving payment:", err);
          alert("Payment succeeded but saving failed. Contact admin.");
        } finally {
          setLoading(false);
        }
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
          <h3 style={{ textAlign: "center", marginTop: "1rem" }}>Registration Fees</h3>
          <div className="pricing-grid">
            <div className="pricing-table">
              <h4>For Indian Delegates (INR)</h4>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Early Bird<br /><small>(Till 15th June, 2025)</small></th>
                    <th>Regular<br /><small>(From 16th June 2025 - 20th Nov, 2025)</small></th>
                    <th>After 20th Nov, 2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Speaker / Participant</td><td>INR 13,000 + INR 2,340(18% GST) = <b>₹15,340</b></td><td>INR 16,000 + INR 2,880 (18% GST) = <b>₹18,880</b></td><td>INR 19,000 + INR 3,420 (18% GST) = <b>₹22,420</b></td></tr>
                  <tr><td>Student / Speaker</td><td colSpan="3">INR 1,000 + INR 180 (18% GST) = <b>₹1,180</b></td></tr>
                  <tr><td>Student / Participant</td><td colSpan="3">INR 4,000 + INR 720 (18% GST) = <b>₹4,720</b></td></tr>
                  <tr><td>Spouse / Partner</td><td colSpan="3">INR 7,000 + INR 1,260 (18% GST) = <b>₹8,260</b></td></tr>
                </tbody>
              </table>
            </div>

            <div className="pricing-table">
              {/* <h4>*For Foreign Delegates (USD)</h4> */}
              <h4>
  <span style={{ fontSize: '1.5em' }}>*</span>For Foreign Delegates (USD)
</h4>

              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Early Bird<br /><small>(Till 15th June, 2025)</small></th>
                    <th>Regular<br /><small>(From 16th June 2025 - 20th Nov, 2025)</small></th>
                    <th>After 20th Nov, 2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Speaker / Participant</td><td><b>$350</b></td><td><b>$400</b></td><td><b>$500</b></td></tr>
                  <tr><td>Student / Speaker</td><td colSpan="3"><b>$100</b></td></tr>
                  <tr><td>Student / Participant</td><td colSpan="3"><b>$150</b></td></tr>
                  <tr><td>Spouse / Partner</td><td colSpan="3"><b>$200</b></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* <p className="note"><strong>*Note:</strong> All charges including GST(18%).</p> */}
          <p className="note">
  <strong>
    <span style={{ fontSize: '1.3em' }}>*</span>Note:
  </strong> All charges including GST(18%).
</p>

          

  <div className="refund-policy-box">
    <h4>Refund & Cancellation Policy</h4>
    <ul>
      <li><strong>80%</strong> refund for cancellations made <strong>on or before 15th October 2025</strong>.</li>
      <li><strong>60%</strong> refund for cancellations made <strong>between 16th October and 20th November 2025</strong>.</li>
    </ul>
    <p><strong>Note:</strong></p>
    <ol>
      <li>No refunds will be provided for cancellations made <strong>after 20th November 2025</strong>.</li>
      <li>In case of <strong>visa denial</strong>, a <strong>full refund</strong> (excluding GST and 5% administrative charges) will be provided upon submission of valid proof of visa refusal issued by the concerned authority.</li>
    </ol>
  </div>
</section>

      

        {/* {loggedInUser?.email ? (
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
              { heading: "Student Delegates", type: "Author" },
              { heading: "Student Participants", type: "Participant" },
              { heading: "Delegate Registration", type: "Delegate" },
              { heading: "Spouse / Partner", type: "Spouse" },
            ].map(({ heading, type }) => (
              <div key={type} className="pricing-group">
                <h4>{heading}</h4>
                <div className="registration-options">
                  {["Indian", "Foreigner"].map((region) => {
                    const price = getPrice(type, region);
                    const regionCurrency = region === "Indian" ? "INR" : "USD";

                    return (
                      <div key={type + region} className="registration-card">
                        <h5>{region}</h5>
                        <p className="price">{price} {regionCurrency}</p>
                        <button onClick={() => handlePayment(type, region)} disabled={loading}>
                          {loading ? "Processing..." : "Pay Now"}
                        </button>
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
                I agree to the <a href="/terms-and-conditions" target="_blank">Terms & Conditions</a> and <a href="/cancellation-and-refunds" target="_blank">Cancellation & Refund Policy</a>.
              </label>
            </div>
          </section>
        ) : (
          <div className="login-warning-box">
            <p>
              Please{" "}
              <a href={`/stis2025/login-signup?redirect=${encodeURIComponent(window.location.pathname)}`}>
                <strong>log in</strong>
              </a>{" "}
              to complete your registration and payment.
            </p>
          </div>
        )} */}
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default ConferenceRegistration;
