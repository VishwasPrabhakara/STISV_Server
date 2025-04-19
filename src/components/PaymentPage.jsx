import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PaymentPage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
countries.registerLocale(enLocale);


const PaymentPage = () => {
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("INR");
  const [error, setError] = useState("");

  const today = new Date();
  const earlyBirdDeadline = new Date("2025-06-15");
  const regularDeadline = new Date("2025-11-20");

  const pricing = {
    INR: {
      "Indian Speaker / Participant": 15340,
      "Indian Student / Speaker": 1180,
      "Indian Student / Participant": 4720,
      "Indian Spouse / Partner": 8260,
    },
    USD: {
      "International Speaker / Participant": 350,
      "International Student / Speaker": 100,
      "International Student / Participant": 150,
      "International Spouse / Partner": 200,
    },
  };

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    const storedName = sessionStorage.getItem("fullName");
    const storedCountry = sessionStorage.getItem("country");
    const storedPhone = sessionStorage.getItem("phone");

    if (!storedEmail) {
      window.location.href = `/stis2025/login-signup?redirect=/stis2025/conference-payment`;
    } else {
      setUser({
        email: storedEmail,
        name: storedName || "",
        country: storedCountry || "",
        phone: storedPhone || "",
      });
    }
  }, []);

  const handleCategoryClick = (cat, cur) => {
    setCategory(cat);
    setCurrency(cur);
    setAmount(pricing[cur][cat]);
  };

  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadRazorpay();
  }, []);

  const handlePayment = async () => {
    if (!category) return setError("Please select a category");

    const res = await axios.post("https://stisv.onrender.com/create-order", {
      amount,
      currency,
      name: user.name,
      email: user.email,
      phone: user.phone,
      category,
    });

    const options = {
      key: "rzp_test_zr7KV5WoIMCMbV", // Replace with real key
      amount: res.data.amount,
      currency: res.data.currency,
      name: "STIS-V 2025",
      description: category,
      order_id: res.data.id,
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
      },
      handler: function (response) {
        window.location.href = `/stis2025/payment-success?paymentId=${response.razorpay_payment_id}`;
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const formatPhone = (rawPhone, userCountryName = "India") => {
    if (!rawPhone) return "";
  
    // Get the 2-letter ISO code from country name
    const isoCode = countries.getAlpha2Code(userCountryName, "en") || "IN";
  
    const phoneNumber = parsePhoneNumberFromString(rawPhone, isoCode);
  
    if (phoneNumber && phoneNumber.isValid()) {
      return phoneNumber.formatInternational(); // e.g., +91 87928 23161
    } else {
      return `+${rawPhone}`;
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="payment-page">
        <h2>Conference Registration</h2>

        {user && (
  <div className="user-info">
    <table className="user-info-table">
      <tbody>
        <tr>
          <td className="label">Name:</td>
          <td className="value">{user.name}</td>
        </tr>
        <tr>
          <td className="label">Email:</td>
          <td className="value">{user.email}</td>
        </tr>
        <tr>
          <td className="label">Phone:</td>
          <td className="value">{formatPhone(user.phone, user.country)}</td>
        </tr>
        <tr>
          <td className="label">Country:</td>
          <td className="value">{user.country}</td>
        </tr>
      </tbody>
    </table>
  </div>
)}


        <h3>Select Payment Category</h3>
        <div className="category-grid">
          {Object.keys(pricing.INR).map((cat) => (
            <div
              key={cat}
              className={`category-box ${category === cat && currency === "INR" ? "selected" : ""}`}
              onClick={() => handleCategoryClick(cat, "INR")}
            >
              <span>{cat}</span>
              <strong>₹{pricing.INR[cat]}</strong>
            </div>
          ))}
        </div>

       
        <div className="category-grid">
          {Object.keys(pricing.USD).map((cat) => (
            <div
              key={cat}
              className={`category-box ${category === cat && currency === "USD" ? "selected" : ""}`}
              onClick={() => handleCategoryClick(cat, "USD")}
            >
              <span>{cat}</span>
              <strong>${pricing.USD[cat]}</strong>
            </div>
          ))}
        </div>

        {amount > 0 && (
          <div className="amount-display">
            <p><strong>Amount To Pay:</strong> {currency === "INR" ? `₹${amount}` : `$${amount}`}</p>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}

        <button className="pay-now-btn" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default PaymentPage;
