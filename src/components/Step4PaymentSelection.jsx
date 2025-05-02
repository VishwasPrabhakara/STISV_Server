import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Step4PaymentSelection.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCopy } from '@fortawesome/free-solid-svg-icons';

const API_BASE_URL = "https://stisv.onrender.com";

const Step4PaymentSelection = ({ formData, updateFormData }) => {
  const [paymentMode, setPaymentMode] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [error, setError] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);


  const today = new Date();
  const earlyBirdDeadline = new Date("2025-07-15");
  const regularDeadline = new Date("2025-11-20");

  const determinePeriod = () => {
    if (today <= earlyBirdDeadline) return "early";
    if (today <= regularDeadline) return "regular";
    return "late";
  };
  const period = determinePeriod();

  const nationalFees = {
    "Speaker / Participant": { early: { base: 13000, gst: 2340, platform: 360 }, regular: { base: 16000, gst: 2880, platform: 420 }, late: { base: 19000, gst: 3420, platform: 500 } },
    "Accompanying Person": { early: { base: 7000, gst: 1260, platform: 200 }, regular: { base: 9000, gst: 1620, platform: 300 }, late: { base: 9000, gst: 1620, platform: 300 } },
    "Student / Speaker": { early: { base: 1000, gst: 180, platform: 30 }, regular: { base: 1000, gst: 180, platform: 30 }, late: { base: 1000, gst: 180, platform: 30 } },
    "Student / Participant": { early: { base: 4, gst: 7, platform: 1 }, regular: { base: 4000, gst: 720, platform: 120 }, late: { base: 4000, gst: 720, platform: 120 } },
  };

  const internationalFees = {
    "Speaker / Participant": { early: { base: 350, platform: 13 }, regular: { base: 400, platform: 14 }, late: { base: 500, platform: 18 } },
    "Accompanying Person": { early: { base: 200, platform: 7 }, regular: { base: 250, platform: 9 }, late: { base: 250, platform: 9 } },
    "Student / Speaker": { early: { base: 100, platform: 4 }, regular: { base: 100, platform: 4 }, late: { base: 100, platform: 4 } },
    "Student / Participant": { early: { base: 150, platform: 5 }, regular: { base: 150, platform: 5 }, late: { base: 150, platform: 5 } },
  };

  const bankDetails = [
    { label: "Account Name", value: "STIS" },
    { label: "Account Number", value: "43706710216" },
    { label: "Bank Name", value: "State Bank of India, IISc" },
    { label: "SWIFT Code", value: "SBININBB425" },
    { label: "IFSC Code", value: "SBIN0002215" },
    { label: "Branch Code", value: "2215" },
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const getCategoryDetails = (key, currencyType) => {
    if (currencyType === "INR") {
      const { base, gst, platform } = nationalFees[key][period];
      const total = paymentMode === "online" ? base + gst + platform : base + gst;
      return { base, gst, platform: paymentMode === "online" ? platform : 0, total, currency: "INR" };
    }
    if (currencyType === "USD") {
      const { base, platform } = internationalFees[key][period];
      const total = paymentMode === "online" ? base + platform : base;
      return { base, gst: 0, platform: paymentMode === "online" ? platform : 0, total, currency: "USD" };
    }
    return { base: 0, gst: 0, platform: 0, total: 0, currency: currencyType };
  };

  const toggleCategory = (key, currencyType) => {
    if (selectedItems.length > 0 && selectedItems[0].currency !== currencyType) {
      alert("You can only select categories within the same currency.");
      return;
    }
    const item = getCategoryDetails(key, currencyType);
    setSelectedItems([...selectedItems, {
      key,
      category: key,
      currency: item.currency,
      baseFee: item.base,
      gst: item.gst,
      platform: item.platform,
      totalAmount: item.total
    }]);
  };

  const removeItem = (index) => {
    const updated = [...selectedItems];
    updated.splice(index, 1);
    setSelectedItems(updated);
  };

  useEffect(() => {
    const total = selectedItems.reduce((acc, item) => acc + item.totalAmount, 0);
    updateFormData({
      selectedCategoryDetails: {
        categories: selectedItems,
        totalAmount: total
      }
    });
  }, [selectedItems]);

  const handlePayment = async () => {
    if (!paymentMode) {
      setError("Please select a payment mode first.");
      return;
    }
    if (selectedItems.length === 0) {
      setError("Please select at least one category.");
      return;
    }
    if (totalPayable === 0) {
      setError("Total payable cannot be zero.");
      return;
    }

    setIsPaying(true);

    if (paymentMode === "bank") {
      window.location.href = "/stis2025/bank-payment-upload";
      return;
    }

    const totalAmount = selectedItems.reduce((acc, item) => acc + item.totalAmount, 0);
    const currencyType = selectedItems[0].currency;

    try {
      const storedUid = sessionStorage.getItem("uid");
      const storedEmail = sessionStorage.getItem("email");
      const storedName = sessionStorage.getItem("fullName");
      const storedPhone = sessionStorage.getItem("phone");

      const res = await axios.post(`${API_BASE_URL}/create-order`, {
        amount: totalAmount,
        currency: currencyType,
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
          categoriesSelected: JSON.stringify(selectedItems),
          paymentMode: paymentMode,
        },
        prefill: {
          name: storedName,
          email: storedEmail,
          contact: storedPhone,
        },
        handler: async function (response) {
          setIsRedirecting(true);
          try {
            console.log("Sending to save-payment:", {
              categoriesSelected: selectedItems,
              amount: totalAmount
            });
            
            await axios.post(`${API_BASE_URL}/save-payment`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              email: storedEmail,
              name: storedName,
              phone: storedPhone,
              categoriesSelected: selectedItems,
              currency: currencyType,
              amount: totalAmount,
              paymentMode: paymentMode,
            });
            window.location.href = `/stis2025/payment-success?paymentId=${response.razorpay_payment_id}`;
          } catch (saveErr) {
            if (saveErr.response && saveErr.response.status === 409) {
              window.location.href = `/stis2025/payment-success?paymentId=${response.razorpay_payment_id}`;
            } else {
              console.error("Saving error:", saveErr);
              alert("Payment save failed! Contact support.");
            }
          }
        },
        theme: { color: "#0056b3" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setError("Payment initiation failed.");
    } finally {
      setIsPaying(false);
    }
  };

  const totalPayable = selectedItems.reduce((acc, item) => acc + item.totalAmount, 0);

  return (
  <>
    {isRedirecting && (
      <div className="redirect-overlay">
        <div className="spinner"></div>
        <div>Redirecting to payment success...</div>
      </div>
    )}
    <div className="step4-container">
      <h2 className="step4-title">Payment</h2>

      <div className="payment-tabs">
        <button className={paymentMode === "bank" ? "active-tab" : ""} onClick={() => { setPaymentMode("bank"); setSelectedItems([]); }}>
          Direct Bank Transfer<br/>(No Platform Fees)
        </button>
        <button className={paymentMode === "online" ? "active-tab" : ""} onClick={() => { setPaymentMode("online"); setSelectedItems([]); }}>
          Payment Gateway<br/>(Platform Fees Included)
        </button>
      </div>

      {paymentMode && (
        <>
          <div className="columns-container">
            <div className="column">
              <h3 className="column-title">National Delegates (INR)</h3>
              <div className="registration-grid">
                {Object.keys(nationalFees).map((key) => {
                  const { base, gst, platform, total } = getCategoryDetails(key, "INR");
                  return (
                    <div key={key} className="registration-tile" onClick={() => toggleCategory(key, "INR")}>
                      <div className="tile-header">{key}</div>
                      <div>Base: ₹{base}</div>
                      <div>GST: ₹{gst}</div>
                      {paymentMode === "online" && <div>Platform: ₹{platform}</div>}
                      <div><b>Total: ₹{total}</b></div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="column">
              <h3 className="column-title">International Delegates (USD)</h3>
              <div className="registration-grid">
                {Object.keys(internationalFees).map((key) => {
                  const { base, platform, total } = getCategoryDetails(key, "USD");
                  return (
                    <div key={key} className="registration-tile" onClick={() => toggleCategory(key, "USD")}>
                      <div className="tile-header">{key}</div>
                      <div>Base: ${base}</div>
                      {paymentMode === "online" && <div>Platform: ${platform}</div>}
                      <div><b>Total: ${total}</b></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {selectedItems.length > 0 && (
            <div className="cart-summary">
              <h3 className="cart-summary-title">Selected Items</h3>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Base</th>
                    <th>GST</th>
                    <th>Platform</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.category}</td>
                      <td>{item.currency === "INR" ? `₹${item.baseFee}` : `$${item.baseFee}`}</td>
                      <td>{item.currency === "INR" ? `₹${item.gst}` : "-"}</td>
                      <td>{item.currency === "INR" ? `₹${item.platform}` : `$${item.platform}`}</td>
                      <td>{item.currency === "INR" ? `₹${item.totalAmount}` : `$${item.totalAmount}`}</td>
                      <td>
                        <button className="remove-button" onClick={() => removeItem(idx)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="total-payable">
                Grand Total: {selectedItems[0]?.currency === "INR" ? `₹${totalPayable}` : `$${totalPayable}`}
              </div>
            </div>
          )}
        </>
      )}

      {paymentMode === "bank" && (
        <div className="bank-details">
          <h3>Bank Details for Transfer</h3>
          <div className="bank-details-table">
            {bankDetails.map((item, idx) => (
              <div key={idx} className="bank-details-row">
                <div className="bank-label">{item.label}</div>
                <div className="bank-value">
                  {item.value}
                  <FontAwesomeIcon icon={faCopy} className="copy-icon" onClick={() => handleCopy(item.value)} title="Copy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
      {paymentMode && (
        <>
          {paymentMode === "bank" && (
            <p className="bank-note" style={{ marginTop: "10px", color: "#b33", fontSize: "18px", fontWeight: "bold" }}>
              ⚠️ Please ensure that you transfer the amount to the provided bank account and then click proceed.
            </p>
          )}
          <button className="payment-button" onClick={handlePayment} disabled={isPaying}>
            {isPaying ? "Processing..." : (paymentMode === "online" ? "Proceed to Pay" : "Proceed to upload details")}
          </button>
        </>
      )}
    </div>
    </>
  );
};

export default Step4PaymentSelection;
