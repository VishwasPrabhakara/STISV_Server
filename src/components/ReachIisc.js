import React, { useEffect, useState } from 'react';
import './ReachIisc.css';
import Navbar from './Navbar';
import Footer from './Footer';

const ReachIisc = () => {
  const [activeAirportTab, setActiveAirportTab] = useState('shuttle');
  const [activeStation, setActiveStation] = useState('mainStation');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const airportTabs = {
    shuttle: {
      title: 'KSTDC Flybus (Shuttle)',
      heading: 'Airport Shuttle Service',
      info: [
        'Frequent AC Flybus service from Kempegowda International Airport (BIAL)',
        'Available 24/7 at 30-minute intervals',
        'Disembark at Mekhri Circle and take an auto/taxi (~2 km to IISc)',
        'Fare: ₹250–300 per person',
        'Online booking available on BMTC/ViaWorld portals',
        'Airport helpline: +91-80-4058-1111 | Booking: www.viaworld.in'
      ],
      link: 'https://www.bengaluruairport.com/transport/flybus.html'
    },
    taxi: {
      title: 'Prepaid Airport Taxis',
      heading: 'Official Airport Taxi Service',
      info: [
        'Available at prepaid counters near the arrival area',
        'Multiple operators: Meru, Mega Cabs, KSTDC etc.',
        'Travel Time: 60–90 mins | Distance: 35 km',
        'Fare: ₹800–1000 (fixed rates)',
        'Premium taxis & AC options available',
        'Taxi Services: SGL (+91-80-4299-4399), Akbar (+91-1800-226-000)'
      ],
      link: 'https://www.bengaluruairport.com/transport/taxi.html'
    },
    rideshare: {
      title: 'Ride-Sharing (Uber/Ola)',
      heading: 'App-Based Cab Services',
      info: [
        'Pickup from designated Ride Zones (follow airport signs)',
        'Affordable with live GPS tracking',
        'Payment via app (cash/card/UPI)',
        'Fare: ₹700–900 depending on traffic',
        'EasyCab: +91-94105-61625 | Support: In-app'
      ],
      link: 'https://www.bengaluruairport.com/transport/ride-hailing.html'
    }
  };

  const stationTabs = {
    mainStation: {
      title: 'Bengaluru City Railway Station',
      distance: '7 km',
      details: [
        'Prepaid auto available at the exit',
        'BMTC Bus Routes: 252E, 258C, 271E, 273C, 275, 276, 99A/B',
        'Bus stop: Tata Institute (IISc)'
      ]
    },
    cantonmentStation: {
      title: 'Cantonment Railway Station',
      distance: '7 km',
      details: [
        'Prepaid autos and city buses available',
        'BMTC Routes: 94A/E, 252A, 270A, 272, 276A'
      ]
    },
    yeshwantpurStation: {
      title: 'Yeshwantpur Railway Station',
      distance: '3 km',
      details: [
        'Nearest station to IISc',
        'Auto and BMTC buses available',
        'Limited train halts – check schedule before booking'
      ]
    }
  };

  const transportOptions = [
    {
      mode: 'Taxi',
      points: [
        'Say "Tata Institute" to the driver',
        'Available across city and airport',
        'Recommended apps: Uber, Ola',
        'Fare: ₹15/km + ₹60/hour wait time',
        'Reliable providers: ',
        'Meru (+91-80-4422-4422), CelCabs (+91-80-6060-9090)'
      ]
    },
    {
      mode: 'Auto Rickshaw',
      points: [
        'Confirm meter usage or fix fare in advance',
        'Inexpensive for short distances',
        'Ola Auto/Uber Auto options available'
      ]
    },
    {
      mode: 'BMTC Bus',
      points: [
        'Say "Tata Institute" to conductor',
        'Multiple buses from all major junctions',
        'Fare: ₹20–40 depending on route',
        'Enquiry: BMTC Control Room (+91-80-2295-2522)'
      ]
    }
  ];

  return (
    <>
        <Navbar />
    <div className="reach-iisc-container">
      <h1 className="page-title">How to Reach IISc, Bengaluru</h1>
      <p className="tagline">A comprehensive travel guide for our conference delegates</p>

      <section className="info-section highlight-box">
        <h2>Quick Facts</h2>
        <ul>
          <li><strong>IISc is locally referred to as:</strong> Tata Institute</li>
          <li><strong>Distance from Airport:</strong> 35 km (60–90 minutes by road)</li>
          <li><strong>City Code for landlines:</strong> +91-80</li>
        </ul>
      </section>

      <section className="airport-section">
        <h2>Traveling from Bengaluru International Airport (BIAL)</h2>
        <div className="airport-tabs">
          {Object.keys(airportTabs).map((key) => (
            <button
              key={key}
              className={`airport-tab ${activeAirportTab === key ? 'active' : ''}`}
              onClick={() => setActiveAirportTab(key)}
            >
              {airportTabs[key].title}
            </button>
          ))}
        </div>
        <div className="airport-details">
          <h3>{airportTabs[activeAirportTab].heading}</h3>
          <ul>
            {airportTabs[activeAirportTab].info.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <a
            href={airportTabs[activeAirportTab].link}
            target="_blank"
            rel="noopener noreferrer"
            className="external-link"
          >
            Learn more →
          </a>
        </div>
      </section>

      <section className="transport-section">
        <h2>Local Transport Options</h2>
        <div className="transport-cards">
          {transportOptions.map((option, index) => (
            <div className="transport-card" key={index}>
              <h4>{option.mode}</h4>
              <ul>
                {option.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="railway-section">
        <h2>Reaching via Train</h2>
        <div className="railway-tabs">
          {Object.keys(stationTabs).map((key) => (
            <button
              key={key}
              className={`station-tab ${activeStation === key ? 'active' : ''}`}
              onClick={() => setActiveStation(key)}
            >
              {stationTabs[key].title}
            </button>
          ))}
        </div>
        <div className="station-details">
          <h4>{stationTabs[activeStation].title} <span>({stationTabs[activeStation].distance})</span></h4>
          <ul>
            {stationTabs[activeStation].details.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="map-section">
        <h2>Campus Location</h2>
        <p>IISc is situated in central Bengaluru and is easily accessible from all parts of the city.</p>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15553.867420936048!2d77.5652489!3d13.0148257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae166b2e68f1a3%3A0x8583c93d79113b6f!2sIndian%20Institute%20of%20Science!5e0!3m2!1sen!2sin!4v1693847769244!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: "0", borderRadius: "10px" }}
            allowFullScreen=""
            loading="lazy"
            title="IISc Campus Location"
          ></iframe>
        </div>
        <button
          className="directions-button"
          onClick={() =>
            window.open('https://www.google.com/maps/dir/?api=1&destination=Indian+Institute+of+Science,+Bengaluru', '_blank')
          }
        >
          Get Directions
        </button>
      </section>
    </div>
    <br />
    <br />
    <Footer />
    </>
  );
};

export default ReachIisc;
