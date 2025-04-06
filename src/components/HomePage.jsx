import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './HomePage.css';

const calculateTimeRemaining = (endTime) => {
  const now = new Date().getTime();
  const diff = endTime - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const HomePage = () => {
  const [timeRemaining, setTimeRemaining] = useState({});
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const endTime = new Date('2025-12-09T00:00:00').getTime();
    const update = () => setTimeRemaining(calculateTimeRemaining(endTime));

    update();
    const interval = setInterval(update, 1000);
    setFadeIn(true);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      {/* Announcement Banner (Scrolling) */}
      <div className="announcement-bar">
        <marquee behavior="scroll" direction="left" scrollamount="15">
          📢 Last Date of Abstract Submission: 30th April 2025
          &nbsp;&nbsp;&nbsp; • Acceptance Notification: 30th May 2025
          &nbsp;&nbsp;&nbsp; • Final Submission: 30th September 2025
          &nbsp;&nbsp;&nbsp; • Abstract Template is now available for download
        </marquee>
      </div>

      {/* Hero Section */}
      <section className={`hero-section ${fadeIn ? 'fade-in' : ''}`}>
        <div className="hero-content">
          <h1 className="hero-title">
            Fifth International Conference on the
            Science & <br />Technology of Ironmaking and Steelmaking
          </h1>
          <h2 className="hero-subtitle">STIS - V 2025</h2>

          <p className="conference-info">
            9 - 12 December 2025 |{' '}
            <a
              className="location"
              href="https://www.google.com/maps/place/IISc+Bengaluru/@13.0170414,77.5633512,17z"
              target="_blank"
              rel="noopener noreferrer"
            >
              Indian Institute of Science, Bengaluru
            </a>
          </p>

          {/* 📄 Abstract Available Note */}
          <p className="abstract-template-note">
           Abstract Template is now available for download. 
          </p>

          {/* Call to Action Buttons */}
          <div className="cta-buttons">
            <a
              href="stis2025/assets/Abstract-Template.docx"
              className="cta-btn cta-download"
              download
            >
              Download Abstract Template
            </a>
            <a
              href="/stis2025/register"
              className="cta-btn cta-register"
            >
              Join the Conference
            </a>
          </div>

          {/* Countdown Timer */}
          <div className="countdown-wrapper">
            {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
              <div className="countdown-box" key={unit}>
                <span className="countdown-value">
                  {String(timeRemaining[unit]).padStart(2, '0')}
                </span>
                <span className="countdown-label">
                  {unit.charAt(0).toUpperCase() + unit.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <br />
      <br />
      
      <Footer />
    </>
  );
};

export default HomePage;
