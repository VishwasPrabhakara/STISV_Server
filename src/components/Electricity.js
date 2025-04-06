import React, { useState, useEffect } from 'react';
import './Electricity.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Electricity = () => {
  const [activeTab, setActiveTab] = useState('voltage');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const specifications = {
    voltage: {
      title: "Standard Voltage & Frequency",
      content: "India operates on 230V AC at 50Hz frequency. It's essential to check your equipment compatibility before use.",
      details: [
        "Voltage fluctuations are common in certain regions.",
        "Three-phase power is used in commercial buildings and some homes.",
        "Most conference venues provide power backup systems."
      ]
    },
    sockets: {
      title: "Power Socket Types",
      content: "The most common plug types in India are Type C and Type D.",
      details: [
        "Type C: Two round pins (2.5A), compatible with European devices.",
        "Type D: Three round pins (5A), common in Indian households.",
        "Type M: Three round pins (15A), used for heavy appliances."
      ]
    },
    adaptors: {
      title: "Adaptor Recommendations",
      content: "International visitors should bring a multi-socket universal adaptor.",
      details: [
        "Choose adaptors with surge protection.",
        "USB-compatible ports offer added convenience.",
        "Check that your adaptor supports 230V, 50Hz."
      ]
    }
  };

  return (
    <>
        <Navbar />
    <main className="electricity-container">
      <div className="content-wrapper">
        <header className="header">
          <h1 className="page-title">Electrical Specifications in India</h1>
          <p className="intro-text">
            This section provides important information on electrical standards in India to help you prepare your devices and adaptors before arrival.
          </p>
        </header>

        {/* Tabs */}
        <nav className="tab-navigation" role="tablist" aria-label="Electrical Info Tabs">
          {Object.keys(specifications).map((key) => (
            <button
              key={key}
              role="tab"
              className={`tab-button ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
              aria-selected={activeTab === key}
              aria-controls={`tab-panel-${key}`}
            >
              {specifications[key].title}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <section
          id={`tab-panel-${activeTab}`}
          className="tab-panel"
          role="tabpanel"
          aria-labelledby={activeTab}
        >
          <article className="tab-content">
            <h2 className="section-title">{specifications[activeTab].title}</h2>
            <p className="section-summary">{specifications[activeTab].content}</p>
            <ul className="spec-details">
              {specifications[activeTab].details.map((item, index) => (
                <li key={index} className="spec-item">{item}</li>
              ))}
            </ul>
          </article>
        </section>

        {/* Safety Note */}
        <section className="safety-section">
          <h3 className="safety-heading">Safety Note</h3>
          <p className="safety-text">
            Ensure that your devices support 230V, 50Hz input. For laptops, cameras, and sensitive electronics, using surge-protected adaptors is strongly recommended.
          </p>
        </section>
      </div>
    </main>
    <br />
    <br />
    <Footer />
    </>
  );
};

export default Electricity;
