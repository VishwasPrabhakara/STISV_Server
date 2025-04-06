import React, { useEffect } from 'react';
import './Venue.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Venue = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
        <Navbar />
    <div className="venue-wrapper">
      {/* Banner Section */}
      <div className="venue-banner">
        <div className="venue-content">
          <h1 className="venue-heading">Venue & Location</h1>
          <p className="venue-tagline">Join us at one of India's most prestigious academic institutions</p>
        </div>
      </div>

      {/* Venue Intro */}
      <div className="venue-info-section">
        <div className="venue-intro">
          <h2>Indian Institute of Science, Bengaluru</h2>
          <p>
            Nestled in the heart of Bengaluru, the <strong>Indian Institute of Science (IISc)</strong> is an iconic institution
            known globally for its contribution to science, engineering and research. The tranquil, tree-lined campus and world-class infrastructure offer a perfect blend of tradition and innovation.
          </p>
        </div>

        {/* Venue Cards */}
        <div className="venue-details-grid">
          <div className="venue-card">
            <h3>📍 Location</h3>
            <p>National Science Seminar Complex (J.N. Tata Auditorium), IISc Campus</p>
          </div>
          <div className="venue-card">
            <h3>📅 Dates</h3>
            <p>December 9–12, 2025</p>
          </div>
          <div className="venue-card">
            <h3>🌐 Facilities</h3>
            <p>High-speed internet, printing and lounge access.</p>
          </div>
          <div className="venue-card">
            <h3>🌿 Campus</h3>
            <p>Green, serene, and conducive to learning and collaboration.</p>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="venue-split-section">
  {/* Left: How to Reach */}
  <div className="map-section">
    <h2>How to Reach</h2>
    <p className="map-description">
      The venue is centrally located and well connected by road, rail, and air. Detailed travel assistance will be provided to all registered delegates.
    </p>
    <div className="map-container">
      <iframe
        title="IISc Location Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15553.867420936048!2d77.5652489!3d13.0148257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae166b2e68f1a3%3A0x8583c93d79113b6f!2sIndian%20Institute%20of%20Science!5e0!3m2!1sen!2sin!4v1693847769244!5m2!1sen!2sin"
        width="100%"
        height="350"
        style={{ border: 0, borderRadius: '12px' }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
    <button
      className="download-map-button"
      onClick={() =>
        window.open(
          'https://www.google.com/maps/dir/?api=1&destination=Indian+Institute+of+Science,+Bengaluru',
          '_blank'
        )
      }
    >
      Get Directions on Google Maps
    </button>
  </div>

  {/* Right: Navigating Inside */}
  <div className="in-campus-travel-section">
    <h2>Navigating Inside the Campus</h2>
    <p>
      IISc's vast campus offers several ways to move around, from pedestrian-friendly walkways to bicycle paths and e-carts. Volunteers and maps will be available near all key zones.
    </p>
    <div className="travel-cards">
      <div className="travel-card">
        <h4>Shuttle Services</h4>
        <p>Free shuttle carts called Transvahan will operate between key buildings and accommodations.</p>
      </div>
      <div className="travel-card">
        <h4>Signage & Help Desks</h4>
        <p>Digital maps, signs, and help desks will guide participants to all important spots.</p>
      </div>
      <div className="travel-card">
        <h4>Campus  Map</h4>
        <p>Download the official IISc campus map to guide yourself effortlessly across the venue.</p>
        <a
      href="/New-IISc-Map.pdf"  // Replace with actual file path or S3 URL
      download
      className="download-map-button"
    >
      Download Campus Map
    </a>
      </div>
      
   
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

export default Venue;
