import React from 'react';
import './Programme.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Programme = () => {
  return (
<>
<Navbar />
    <div className="programme-container">
      {/* Hero Section */}
      <section className="programme-hero">
        <div className="programme-hero-overlay">
          <h1 className="programme-title">Conference Programme</h1>
          <p className="programme-subtitle">Your Roadmap to STIS-V 2025</p>
        </div>
      </section>

      {/* Important Dates */}
      <section className="important-dates-section">
        <h2 className="important-dates-heading">Important Dates</h2>
        <div className="dates-cards-container">
          <div className="date-card">
            <h3>Abstract Submission Deadine</h3>
            <p>30<sup>th</sup> April 2025</p>
          </div>
          <div className="date-card">
            <h3>Acceptance Notification</h3>
            <p>30<sup>th</sup> May 2025</p>
          </div>
          <div className="date-card">
            <h3>Final Paper Submission Deadline</h3>
            <p>30<sup>th</sup> September 2025</p>
          </div>
        </div>
      </section>
    </div>
    <br />
    <br />
    <Footer />
    </>
  );
};

export default Programme;
