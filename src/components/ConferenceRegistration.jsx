import React, { useEffect, useState } from 'react';
import './ConferenceRegistration.css';

const ConferenceRegistration = ({ user }) => {
  const [agreed, setAgreed] = useState(false);
  const [regionType, setRegionType] = useState('Indian');
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const today = new Date();
  const earlyBirdDeadline = new Date('2025-06-15');
  const regularDeadline = new Date('2025-11-20');

  useEffect(() => {
    if (!user || !user.email) {
      setShowLoginMessage(true);
      setTimeout(() => {
        window.location.href = '/stis2025/login-signup';
      }, 2000);
    } else if (user.country.toLowerCase() !== 'india') {
      setRegionType('Foreign');
    }
  }, [user]);

  if (showLoginMessage) {
    return (
      <div className="registration-container" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>Please Login</h2>
        <p>You must be logged in to register. Redirecting to login page...</p>
      </div>
    );
  }

  const getPrice = (type) => {
    if (regionType === 'Indian') {
      switch (type) {
        case 'Delegate':
          if (today <= earlyBirdDeadline) return 15340;
          if (today <= regularDeadline) return 18880;
          return 22420;
        case 'Author': return 1180;
        case 'Participant': return 4720;
        case 'Spouse': return 8260;
        default: return 0;
      }
    } else {
      switch (type) {
        case 'Delegate':
          if (today <= earlyBirdDeadline) return 350;
          if (today <= regularDeadline) return 400;
          return 500;
        case 'Author': return 100;
        case 'Participant': return 150;
        case 'Spouse': return 200;
        default: return 0;
      }
    }
  };

  const handlePay = (type) => {
    if (!agreed) {
      alert('Please agree to the terms and conditions.');
      return;
    }
    const amount = getPrice(type);
    alert(`Proceeding to pay ${amount} ${regionType === 'Indian' ? 'INR' : 'USD'} for ${type}`);
    // Razorpay integration here
  };

  const options = [
    { key: 'Delegate', label: 'Delegate Registration' },
    { key: 'Author', label: 'Student Author (Presenting)' },
    { key: 'Participant', label: 'Student Participant (Attending)' },
    { key: 'Spouse', label: 'Spouse / Partner' },
  ];

  return (
    <div className="registration-container">
      <h2>Conference Registration</h2>

      <div className="user-info">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Country:</strong> {user?.country}</p>
      </div>

      <div className="registration-options">
        {options.map(({ key, label }) => (
          <div key={key} className="registration-card">
            <h3>{label}</h3>
            <p className="price">{getPrice(key)} {regionType === 'Indian' ? 'INR' : 'USD'}</p>
            <button onClick={() => handlePay(key)}>Pay</button>
          </div>
        ))}
      </div>

      <div className="form-group checkbox">
        <label>
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          I agree to the <a href="/terms-and-conditions" target="_blank">Terms & Conditions</a> and <a href="/cancellation-and-refund" target="_blank">Cancellation & Refund Policy</a>
        </label>
      </div>
    </div>
  );
};

export default ConferenceRegistration;
