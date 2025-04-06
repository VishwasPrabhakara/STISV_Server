import React, { useState } from 'react';
import './Sponsors.css'; // Reuse same styles
import Navbar from './Navbar';
import Footer from './Footer';

const MediaPartner = () => {
  const [mediaError, setMediaError] = useState(false);

  const mediaPartner = {
    name: 'All Conference Alert',
    location: 'Media Partner',
    website: 'https://allconferencealert.net/',
    imageUrl: 'https://raw.githubusercontent.com/VishwasPrabhakara/STISV/refs/heads/main/public/All-conference-alert.png',
  };

  return (
    <>
      <Navbar />
      <div className="sponsors-wrapper">
        {/* Header */}
        <div className="sponsors-header">
          <h1>Our Media Partner</h1>
          <p>Partnering with leading media platforms to drive awareness, participation, and engagement.</p>
        </div>

        {/* Media Partner Card */}
        <div className="sponsor-cards-row">
          <div className="sponsor-card">
            {!mediaError && mediaPartner.imageUrl ? (
              <div className="sponsor-logo">
                <img
                  src={mediaPartner.imageUrl}
                  alt="Media Partner Logo"
                  onError={() => setMediaError(true)}
                />
              </div>
            ) : (
              <div className="fallback-image">
                <p>{mediaPartner.name}</p>
              </div>
            )}
            <div className="sponsor-details">
              <h3>{mediaPartner.name}</h3>
              <p className="sponsor-location">{mediaPartner.location}</p>
              <a
                href={mediaPartner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="visit-button"
              >
                Visit Website →
              </a>
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

export default MediaPartner;
