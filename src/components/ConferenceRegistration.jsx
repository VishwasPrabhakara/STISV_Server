import React from "react";
import "./ConferenceRegistration.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ConferenceRegistration = () => {
  return (
    <>
      <Navbar />
      <div className="registration-coming-soon">
  <h2 className="coming-title">Registration is Coming Soon</h2>
  <p className="coming-text">
    We’re excited to welcome participants to STIS 2025.
  </p>
  <p className="coming-text">
    The registration process will be opening shortly. Please stay tuned for updates.
  </p>
  <p className="coming-note">
    Thank you for your interest and enthusiasm!
  </p>
</div>

<br />
      <br />
      <Footer />
    </>
  );
};

export default ConferenceRegistration;
