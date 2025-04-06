import React, { useState, useEffect } from 'react';
import './TravelChecklist.css';
import Navbar from './Navbar';
import Footer from './Footer';

const TravelChecklist = () => {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const checklist = [
    {
      id: 'visa',
      title: 'Visa Requirements',
      content: `All foreign nationals must possess a valid Indian visa. We recommend applying at least 2–3 weeks in advance from your nearest Indian consulate.

If attending the conference, select "Attending a Conference" as your visa purpose. A government-approved letter from the Ministry of External Affairs (MEA) is available. If required, the Conference Secretariat can issue an official invitation letter.`,
      link: 'https://indianvisaonline.gov.in/visa/',
      linkText: 'Apply for Indian Visa Online →',
    },
    {
      id: 'flights',
      title: 'Flight Arrangements',
      content: `Direct international flights connect Bengaluru to major cities worldwide. We recommend flying directly into Bengaluru to avoid domestic transfers.

December is a peak season. Please make your reservations well in advance.`,
      link: 'https://www.bengaluruairport.com/travellers/flight-information/international-flights.html',
      linkText: 'View International Arrivals →',
    },
    {
      id: 'electricity',
      title: 'Electrical Specifications',
      content: `India uses 230V/50Hz AC power. Standard plug types are C, D, and M. Ensure compatibility of your devices and carry universal adaptors if needed.`,
      link: 'https://materials.iisc.ac.in/stis2025/#/electricity',
      linkText: 'Check Power Guidelines →',
    },
    {
      id: 'forex',
      title: 'Foreign Exchange & Currency',
      content: `Indian Rupee (INR) is the official currency. While credit cards are widely accepted in urban areas, smaller vendors may prefer cash.

Currency can be exchanged at airport forex counters or ATMs throughout the city.`,
      link: 'https://www.incredibleindia.gov.in/en/currency',
      linkText: 'Currency & Conversion Info →',
    },
    {
      id: 'emergency',
      title: 'Emergency Services',
      content: `Familiarize yourself with local emergency contacts including police, medical aid, and embassy support.

Save important numbers prior to travel.`,
      link: 'https://www.incredibleindia.gov.in/en/emergency',
      linkText: 'View Emergency Contact List →',
    },
  ];

  return (
    <>
        <Navbar />
    <div className="checklist-wrapper">
      <div className="checklist-header">
        <h1>International Travel Checklist</h1>
        <p>
          A curated guide to help you prepare for your visit to Bengaluru and the STIS-V 2025 Conference.
        </p>
      </div>

      <div className="checklist-content">
        {checklist.map((item) => (
          <div
            key={item.id}
            className={`checklist-item ${activeSection === item.id ? 'active' : ''}`}
          >
            <div
              className="checklist-item-header"
              onClick={() =>
                setActiveSection(activeSection === item.id ? null : item.id)
              }
            >
              <h2>{item.title}</h2>
              <span className="toggle-icon">{activeSection === item.id ? '−' : '+'}</span>
            </div>

            {activeSection === item.id && (
              <div className="checklist-item-body">
                {item.content.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
                <a
                  href={item.link}
                  className="checklist-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.linkText}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    <br />
    <br />
    <Footer />
    </>
  );
};

export default TravelChecklist;
