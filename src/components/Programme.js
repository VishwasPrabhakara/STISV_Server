import React, { useEffect } from 'react';
import './Programme.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Programme = () => {
  useEffect(() => {
    const loadParticles = async () => {
      await import('particles.js');

      window.particlesJS('particles-js', {
        particles: {
          number: { value: 70 },
          size: { value: 3 },
          move: { speed: 1 },
          line_linked: { enable: true, opacity: 0.2 },
          color: { value: "#2196f3" },
        },
        interactivity: {
          events: { onhover: { enable: true, mode: "repulse" } }
        }
      });
    };

    loadParticles();
  }, []);

  return (
    <>
      <Navbar />
      <div className="programme-container">

        {/* Particle Background */}
        <div id="particles-js"></div>

        {/* Hero Section */}
        <section className="programme-hero">
          <div className="programme-hero-overlay">
            <h1 className="programme-title">Conference Programme</h1>
            <p className="programme-subtitle">Important Dates and Deadlines for STIS-V 2025</p>
          </div>
        </section>

        {/* Grid Timeline Section */}
        <section className="timeline-section">
          <h2 className="important-dates-heading">Important Dates</h2>

          <div className="grid-timeline-container">

            {/* Row 1 */}
            <div className="grid-timeline-row">
              <div className="timeline-card">
              <span className="strike">30<sup>th</sup> April 2025</span>
                <h3>31<sup>st</sup> May 2025</h3>
                <p>Abstract Submission Deadline</p>
              </div>
              

              <div className="timeline-card">
                <h3>25<sup>th</sup> June 2025</h3>
                <p>Acceptance Notification</p>
              </div>
              

              <div className="timeline-card">
                <h3>15<sup>th</sup> October 2025</h3>
                <p>Final Paper Submission</p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid-timeline-row">
              <div className="timeline-card">
                <h3>15<sup>th</sup> July 2025</h3>
                <p>Early Bird Registration</p>
              </div>
              

              <div className="timeline-card">
                <h3>16<sup>th</sup> July - 20<sup>th</sup> Nov 2025</h3>
                <p>Regular Registration</p>
              </div>
              

              <div className="timeline-card">
                <h3>After 20<sup>th</sup> Nov 2025</h3>
                <p>Late Registration</p>
              </div>
            </div>

          </div>
        </section>

      </div>

      <br /><br /><br /><br />
      <Footer />
    </>
  );
};

export default Programme;
