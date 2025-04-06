import React, { useEffect } from 'react';
import './Transport.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Transport = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
        <Navbar />
    <main className="transport-container">
      <div className="content-wrapper">
        <header className="transport-header">
          <h1>Transport to and from Bengaluru International Airport (BLR)</h1>
          <p>
            Kempegowda International Airport (BLR) is approximately 35 km from Bengaluru city center.
            IISc (Indian Institute of Science) is easily accessible via taxis, ride-hailing apps, or shuttle services.
            For local reference, IISc is also known as <strong>“Tata Institute”</strong>.
          </p>
        </header>

        {/* Emergency Contacts */}
        <section className="info-section">
          <h2>Emergency Contact Numbers</h2>
          <p><strong>Area Code for Bengaluru Landlines:</strong> +91-80</p>
          <ul className="service-list">
            <li><strong>Airport Helpline:</strong> <a href="tel:+91-80-4058-1111">+91-80-4058-1111</a></li>
            <li><strong>Flight Enquiry (Toll-Free):</strong> <a href="tel:18004254425">1800-425-4425</a></li>
          </ul>
        </section>

        {/* Taxi Services */}
        <section className="info-section">
          <h2>Taxi Services</h2>
          <ul className="service-list">
            <li><strong>AirLift:</strong> <a href="tel:+91-80-4052-8888">+91-80-4052-8888</a></li>
            <li><strong>CelCabs:</strong> <a href="tel:+91-80-6060-9090">+91-80-6060-9090</a></li>
            <li><strong>SGL Tours & Travels:</strong> <a href="tel:+91-80-4299-4399">+91-80-4299-4399</a></li>
          </ul>
          <p>
            These services are available at the airport or can be pre-booked.
            Metered fares apply. Most providers accept credit cards and offer printed receipts.
          </p>
        </section>

        {/* Taxi Fare & Payment */}
        <section className="info-section">
          <h2>Fare & Payment Guidelines</h2>
          <ul className="service-list">
            <li>Base Fare: ₹15/km</li>
            <li>Waiting Charges: ₹60/hour</li>
            <li>Pay after the trip based on fare meter</li>
            <li>Digital receipts and credit card payment available</li>
            <li>Recommended: Use apps like Uber and Ola for convenience</li>
          </ul>
        </section>

        {/* Executive Car Rentals */}
        <section className="info-section">
          <h2>Limousine & Executive Car Rentals</h2>
          <ul className="service-list">
            <li><strong>Akbar Travels:</strong> <a href="tel:1800226000">1800-226-000</a></li>
            <li><strong>Hertz India:</strong> <a href="tel:+91-99725-02292">+91-99725-02292</a></li>
          </ul>
          <p>
            Both chauffeur-driven and self-drive options are available.
            Approximate cost for 25 km is ₹1,200.
          </p>
        </section>

        {/* BMTC Shuttle */}
        <section className="info-section">
          <h2>BMTC Airport Shuttle Service</h2>
          <p>
            The Bengaluru Metropolitan Transport Corporation (BMTC) operates air-conditioned Vayu Vajra buses
            connecting BLR Airport to multiple city destinations. Buses run every 30 minutes.
          </p>

          <h3>Key BMTC Contacts</h3>
          <ul className="service-list">
            <li><strong>Control Room:</strong> <a href="tel:+91-80-2295-2522">2295-2522</a>, <a href="tel:+91-80-2295-2422">2295-2422</a></li>
            <li><strong>Kempegowda Bus Stand:</strong> <a href="tel:+91-80-2295-2311">2295-2311</a>, <a href="tel:+91-80-2295-2314">2295-2314</a></li>
            <li><strong>Shivajinagar Bus Stand:</strong> <a href="tel:+91-80-2295-2321">2295-2321</a>, <a href="tel:+91-80-2295-2324">2295-2324</a></li>
          </ul>

          <h3>Service Features</h3>
          <ul className="highlight-list">
            <li>Dedicated luggage space on all buses</li>
            <li>Digital route display with announcements</li>
            <li>Fare includes luggage fee</li>
            <li>Stops available across all major Bengaluru zones</li>
          </ul>

          <p className="ticket-info">
            For live schedules and booking, visit: <a href="http://www.viaworld.in" target="_blank" rel="noopener noreferrer">viaworld.in</a>{' '}
            or call <a href="tel:+91-80-41431000">+91-80-41431000</a>
          </p>
        </section>
      </div>
    </main>
    <br />
    <br />
    <Footer />
    </> 
  );
};

export default Transport;
