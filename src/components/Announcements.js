import React from 'react';
import './Announcements.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Announcements = () => {
  return (
    <>
      <Navbar />

      <div className="downloads-wrapper">
        {/* Hero Banner */}
        <section className="downloads-hero">
          <h1 className="downloads-title">Announcements</h1>
          <p className="downloads-subtitle">Stay informed with the latest official documents</p>
        </section>

        {/* Download Section */}
        <section className="downloads-content">
          {/* Brochure */}
          <div className="download-card">
            <h3>Announcement Brochure</h3>
            <p>Details about STIS-V 2025, including themes, schedule highlights, and venue information.</p>
            <a href="./brochure.pdf" download="STIS_Brochure.pdf" className="download-btn">
              Download Brochure
            </a>
          </div>

          {/* Flyer */}
          <div className="download-card">
            <h3>Event Flyer</h3>
            <p>A quick overview of key conference dates, topics, and participation details.</p>
            <a href="./flyer.pdf" download="STIS_Flyer.pdf" className="download-btn">
              Download Flyer
            </a>
          </div>

          {/* Abstract Template */}
          <div className="download-card">
            <h3>Abstract Template</h3>
            <p>Use this official template to format your abstract for submission.</p>
            <a href="./Abstract-Template.docx" download className="download-btn">
              Download Abstract Template
            </a>
          </div>
        </section>

        {/* Latest Announcements Section */}
        <section className="announcement-board">
          <div className="announcement-container">
            <h2 className="announcement-heading">Latest Announcements</h2>
            <ul className="announcement-list">
              <li>
                <div className="announcement-meta">
                  <span className="announcement-badge new">New</span>
                  <span className="announcement-date">April 1, 2025</span>
                </div>
                Registration details will be updated shortly.
              </li>
              <li>
                <div className="announcement-meta">
                  <span className="announcement-badge info">Info</span>
                  <span className="announcement-date">March 30, 2025</span>
                </div>
                Abstract submission deadline: <strong>30th April, 2025</strong>.
              </li>
              <li>
                <div className="announcement-meta">
                  <span className="announcement-badge info">Info</span>
                  <span className="announcement-date">March 25, 2025</span>
                </div>
                Abstract Template is now available for download.
              </li>
            </ul>
          </div>
        </section>
      </div>

      <br />
      <br />
      <Footer />
    </>
  );
};

export default Announcements;
