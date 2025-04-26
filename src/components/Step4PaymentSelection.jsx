import React, { useState } from "react";
import axios from "axios";
import "./Step4PaymentSelection.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const API_BASE_URL = "https://stisv.onrender.com";

const Step4PaymentSelection = ({ formData, updateFormData }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [error, setError] = useState("");

  const today = new Date();
  const earlyBirdDeadline = new Date("2025-06-15");
  const regularDeadline = new Date("2025-11-20");

  const determinePeriod = () => {
    if (today <= earlyBirdDeadline) return "early";
    if (today <= regularDeadline) return "regular";
    return "late";
  };

  const period = determinePeriod();

  const nationalFees = {
    "Speaker / Participant": { early: { base: 13000, gst: 2340, platform: 360 }, regular: { base: 16000, gst: 2880, platform: 420 }, late: { base: 19000, gst: 3420, platform: 500 } },
    "Spouse / Partner": { early: { base: 7000, gst: 1260, platform: 200 }, regular: { base: 9000, gst: 1620, platform: 300 }, late: { base: 9000, gst: 1620, platform: 300 } },
    "Student / Speaker": { early: { base: 100, gst: 18, platform: 3 }, regular: { base: 1000, gst: 180, platform: 30 }, late: { base: 1000, gst: 180, platform: 30 } },
    "Student / Participant": { early: { base: 4000, gst: 720, platform: 120 }, regular: { base: 4000, gst: 720, platform: 120 }, late: { base: 4000, gst: 720, platform: 120 } },
  };

  const internationalFees = {
    "Speaker / Participant": { early: { base: 350, platform: 13 }, regular: { base: 400, platform: 14 }, late: { base: 500, platform: 18 } },
    "Spouse / Partner": { early: { base: 200, platform: 7 }, regular: { base: 250, platform: 9 }, late: { base: 250, platform: 9 } },
    "Student / Speaker": { early: { base: 100, platform: 4 }, regular: { base: 100, platform: 4 }, late: { base: 100, platform: 4 } },
    "Student / Participant": { early: { base: 150, platform: 5 }, regular: { base: 150, platform: 5 }, late: { base: 150, platform: 5 } },
  };

  const getCategoryDetails = (key, currencyType) => {
    if (currencyType === "INR") {
      const { base, gst, platform } = nationalFees[key][period];
      const total = base + gst + platform;
      return { base, gst, platform, total, currency: "INR" };
    }
    if (currencyType === "USD") {
      const { base, platform } = internationalFees[key][period];
      const total = base + platform;
      return { base, gst: 0, platform, total, currency: "USD" };
    }
    return { base: 0, gst: 0, platform: 0, total: 0, currency: currencyType };
  };

  const toggleCategory = (key, currencyParam) => {
    if (selectedItems.length > 0 && selectedItems[0].currency !== currencyParam) {
      alert("You can only select categories within the same currency (either National or International).");
      return;
    }

    const { base, gst, platform, total, currency } = getCategoryDetails(key, currencyParam);
    setSelectedItems([...selectedItems, { key, currency, base, gst, platform, total }]);
  };

  const removeItem = (index) => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  };

  const handlePayment = async () => {
    if (selectedItems.length === 0) {
      setError("Please select at least one category to proceed.");
      return;
    }

    const totalAmount = selectedItems.reduce((acc, item) => acc + item.total, 0);
    const currencyType = selectedItems[0].currency;

    try {
      const storedUid = sessionStorage.getItem("uid");
      const storedEmail = sessionStorage.getItem("email");
      const storedName = sessionStorage.getItem("fullName");
      const storedPhone = sessionStorage.getItem("phone");

      const res = await axios.post(`${API_BASE_URL}/create-order`, {
        amount: totalAmount,
        currency: currencyType,
        name: storedName,
        email: storedEmail,
        phone: storedPhone,
        category: selectedItems.map(item => item.key).join(", "),
      });

      const options = {
        key: "rzp_live_VBcFKiPwDUl4SE",
        amount: res.data.amount,
        currency: res.data.currency,
        name: "STIS-V 2025",
        description: "Conference Registration",
        order_id: res.data.id,
        notes: {
          email: storedEmail,
          phone: storedPhone,
          category: selectedItems.map(item => item.key).join(", "),
        },
        prefill: {
          name: storedName,
          email: storedEmail,
          contact: storedPhone,
        },
        handler: function (response) {
          window.location.href = `/stis2025/payment-success?paymentId=${response.razorpay_payment_id}`;
        },
        theme: {
          color: "#0056b3",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initiation failed", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const totalPayable = selectedItems.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="step4-container">
      <h2 className="step4-title">Payment</h2>
    <p> Please select multiple categories if you wish to make a combined payment for all individuals.</p>
      <div className="columns-container">
        {/* National Delegates */}
        <div className="column">
          <h3 className="column-title">National Delegates (INR)</h3>
          <div className="registration-grid">
            {Object.keys(nationalFees).map((key) => {
              const { base, gst, platform, total } = getCategoryDetails(key, "INR");
              return (
                <div
                  key={key}
                  className="registration-tile"
                  onClick={() => toggleCategory(key, "INR")}
                >
                  <div className="tile-header">{key}</div>
                  <div className="tile-splitup">Registration Fee: ₹{base}</div>
                  <div className="tile-splitup">GST (18%): ₹{gst}</div>
                  <div className="tile-splitup">Platform Charges: ₹{platform}</div>
                  <div className="tile-total">Total Payable: ₹{total}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* International Delegates */}
        <div className="column">
          <h3 className="column-title">International Delegates (USD)</h3>
          <div className="registration-grid">
            {Object.keys(internationalFees).map((key) => {
              const { base, platform, total } = getCategoryDetails(key, "USD");
              return (
                <div
                  key={key}
                  className="registration-tile"
                  onClick={() => toggleCategory(key, "USD")}
                >
                  <div className="tile-header">{key}</div>
                  <div className="tile-splitup">Registration Fee: ${base}</div>
                  <div className="tile-splitup">Platform Charges: ${platform}</div>
                  <div className="tile-total">Total Payable: ${total}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      <div className="cart-summary">
        <h3 className="cart-summary-title">Total Registration Fees Payable</h3>
        <tbody>
      {selectedItems.map((item, idx) => (
        <tr key={idx}>
          <td>{item.key}</td>
          <td>{item.currency === "INR" ? `₹${item.total}` : `$${item.total}`}</td>
          <td>
            <button className="remove-button" onClick={() => removeItem(idx)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
        <div className="total-payable">
          {selectedItems.length > 0 &&
            (selectedItems[0].currency === "INR"
              ? `₹${totalPayable}`
              : `$${totalPayable}`)}
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <button className="payment-button" onClick={handlePayment}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default Step4PaymentSelection;
