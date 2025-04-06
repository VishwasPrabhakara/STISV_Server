import React from 'react';
import { Link } from 'react-router-dom';
import './Travel.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Travel = () => {
  return (
    <>
        <Navbar />
    <div className="travel-container">
      <div className="travel-hero">
        <h1 className="travel-title">Conference Travel Essentials</h1>
        <p className="travel-subtitle">
          Everything you need to know to reach and move around Bengaluru smoothly.
        </p>
      </div>

      <div className="travel-section">
        <h2 className="section-heading">Travel Resources</h2>
        <ul className="travel-list">
          <li>
            <Link to="/travel-checklist" className="travel-link">
              Travel Checklist
            </Link>
          </li>
          <li>
            <Link to="/international-travel" className="travel-link">
              International Travel to Bengaluru
            </Link>
          </li>
          <li>
            <Link to="/transport" className="travel-link">
              Airport Transfers & Transport
            </Link>
          </li>
          <li>
            <Link to="/local-bengaluru" className="travel-link">
              Getting Around Bengaluru
            </Link>
          </li>
          <li>
            <Link to="/electricity" className="travel-link">
              Electrical Specifications in India
            </Link>
          </li>
        </ul>
      </div>

      <div className="travel-section">
        <h2 className="section-heading">Airport Information</h2>
        <p className="travel-text">
          Bengaluru’s Kempegowda International Airport (BLR) is located ~35 km from the city center.
          Delegates can find detailed flight and terminal info on the official website:
        </p>
        <a
          href="http://www.bengaluruairport.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="external-link"
        >
          www.bengaluruairport.com →
        </a>
      </div>

      <div className="travel-section">
        <h2 className="section-heading">Rail Tour Packages</h2>
        <p className="travel-text">
          Planning to explore India after the conference? Book railway tickets and curated rail tour
          packages via the Indian Railway Catering & Tourism Corporation (IRCTC). Options include:
          <strong> Heritage, Spiritual, Adventure, Wildlife & Hill Station themes.</strong>
        </p>
        <a
          href="https://www.irctc.co.in/nget/train-search"
          target="_blank"
          rel="noopener noreferrer"
          className="external-link"
        >
          Explore IRCTC Rail Tours →
        </a>
      </div>
    </div>
    <br />
    <br />
    <Footer />
    </>
  );
};

export default Travel;
