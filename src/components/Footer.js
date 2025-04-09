import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { ref, onValue, runTransaction } from 'firebase/database';
import { database } from '../firebase/firebase-config';
import './Footer.css';

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const countingRef = useRef(null);

  useEffect(() => {
    const countRef = ref(database, 'visitors/count');
    const sessionKey = 'visitRecorded';

    onValue(countRef, (snapshot) => {
      const count = snapshot.val() || 0;
      setVisitorCount(count);
      setDisplayCount(count);
    });

    if (!sessionStorage.getItem(sessionKey)) {
      runTransaction(countRef, (current) => (current || 0) + 1);
      sessionStorage.setItem(sessionKey, 'true');
    }

    return () => clearInterval(countingRef.current);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1: Logo & Info */}
        <div className="footer-column brand-column">
          <div className="logo-box">
            <img src="https://iisc.ac.in/wp-content/themes/iisc/images/favicon/apple-icon-57x57.png" alt="STIS-V" />
            <h2>STIS-V 2025</h2>
          </div>
          <p className="tagline">Advancing Innovation in Iron & Steelmaking</p>
          <p><strong>Hosted by:</strong> IISc, Bengaluru</p>
          <p><strong>Dates:</strong> Dec 9–12, 2025</p>
          <p><strong>Email:</strong> <a href="mailto:stis.mte@iisc.ac.in">stis.mte@iisc.ac.in</a></p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column footer-links">
          <h4>Quick Links</h4>
          <div className="footer-links-grid">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/distinguished-speaker">Speakers</NavLink>
            <NavLink to="/committee">Committee</NavLink>
            <NavLink to="/conference-schedule">Schedule</NavLink>
            <NavLink to="/venue">Venue</NavLink>
            <NavLink to="/announcements">Announcements</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/cancellation-and-refunds">Cancellation & Refund</NavLink> 
            <NavLink to="/terms-and-conditions">Terms & Conditions</NavLink>
          </div>
        </div>

        {/* Column 3: Socials & Visitors */}
        <div className="footer-column connect-column">
          <h4>Stay Connected</h4>
          <div className="social-icons">
            <a href="https://x.com/stis_v2025" target="_blank"  className='twitter'  rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://www.instagram.com/stisv25/" target="_blank"  className='instagram' rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/stis-v-221269344/" target="_blank" className='linkedin' rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
          <p className="social-note">
            Follow us for updates on deadlines, keynotes, and more.
          </p>
          <div className="visitor-box">
            <h4>Conference Reach</h4>
            <span>{String(displayCount).padStart(4, '0')} Website Visits So Far</span>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-base">
        <p>&copy; {new Date().getFullYear()} STIS-V 2025. All rights reserved.</p>
      
      </div>
    </footer>
  );
};

export default Footer;
