import React, { useEffect } from 'react';
import './InternationalTravel.css';
import Navbar from './Navbar';
import Footer from './Footer';

const InternationalTravel = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
    <div className="international-travel-container">
      <div className="content-wrapper">
        <h1 className="main-title">International Travel to Bengaluru</h1>

        {/* Direct Flights */}
        <div className="info-card direct-flights">
          <h2>Direct International Flights</h2>
          <p>
            Bengaluru International Airport (BLR) is well-connected with direct flights from major cities worldwide. Preferred airlines include:
          </p>
          <ul className="airlines-list">
            <li>Lufthansa</li>
            <li>Singapore Airlines</li>
            <li>Air France</li>
            <li>British Airways</li>
            <li>Malaysian Airlines</li>
            <li>Air India</li>
          </ul>
          <p className="recommendation">
            We recommend flying directly into Bengaluru for the most convenient and time-efficient experience.
          </p>
        </div>

        {/* Alternative Routes */}
        <div className="info-card alternative-routes">
          <h2>Alternative Routes via Major Cities</h2>
          <div className="city-connections">
            <div className="city-card">
              <h3>Via Chennai</h3>
              <p>Flight Duration: Approximately 45 minutes</p>
              <p>International and domestic terminals are in the same building.</p>
              <p className="highlight">Recommended for smoother transit.</p>
            </div>
            <div className="city-card">
              <h3>Via Mumbai</h3>
              <p>Flight Duration: Approximately 90 minutes</p>
              <p>Requires transfer between terminals via shuttle bus.</p>
            </div>
            <div className="city-card">
              <h3>Via Delhi</h3>
              <p>Flight Duration: Around 2.5 hours</p>
              <p>Separate international and domestic terminals; bus transfer needed.</p>
            </div>
          </div>
        </div>

        {/* Train Options */}
        <div className="info-card transport-options">
          <h2>Train Travel from Nearby Cities</h2>
          <p>
            If arriving via another major Indian city, train services provide an efficient option to reach Bengaluru. A recommended option is:
          </p>
          <ul>
            <li>
              <strong>Shatabdi Express (Chennai to Bengaluru)</strong> – A high-speed, air-conditioned service.
            </li>
            <li>Journey Duration: Approximately 5 hours</li>
            <li>Comfortable seating and meal service on board</li>
            <li>
              Book in advance via{' '}
              <a href="https://www.irctc.co.in" target="_blank" rel="noopener noreferrer">
                Indian Railways Booking Portal
              </a>
            </li>
          </ul>
        </div>

        {/* Travel Tips */}
        <div className="info-card travel-tips">
          <h2>Travel Tips</h2>
          <ul className="tips-list">
            <li>Check for international flight combos with domestic segments.</li>
            <li>Account for layover time when booking multi-city travel.</li>
            <li>Carry local currency (INR) for terminal transfers or local taxis.</li>
            <li>Install the Bengaluru Airport mobile app for real-time flight updates.</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="useful-links">
          <h2>Useful Resources</h2>
          <div className="links-grid">
            <a href="https://www.bengaluruairport.com" target="_blank" rel="noopener noreferrer">Bengaluru Airport</a>
            <a href="https://www.airindia.in" target="_blank" rel="noopener noreferrer">Air India</a>
            <a href="https://www.irctc.co.in" target="_blank" rel="noopener noreferrer">Indian Railways (IRCTC)</a>
            <a href="https://www.incredibleindia.org" target="_blank" rel="noopener noreferrer">Incredible India Tourism</a>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />
    <Footer />
    </>
  );
};

export default InternationalTravel;
