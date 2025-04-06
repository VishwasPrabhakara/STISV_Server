import React from 'react';
import './SponsorshipOpportunities.css';
import Navbar from './Navbar';
import Footer from './Footer';

const sponsorshipTiers = [
  {
    title: 'Platinum Sponsor',
    amount: '₹7,00,000',
    benefits: [
      'Name would appear in all official correspondence',
      'Complimentary registration for 4 delegates',
      'One page advertisement in souvenir & a stall in exhibition'
    ],
  },
  {
    title: 'Gold Sponsor',
    amount: '₹5,00,000',
    benefits: [
      'Name would appear in all official correspondence',
      'Complimentary registration for 3 delegates',
      'One page advertisement in souvenir',
    ],
  },
  {
    title: 'Silver Sponsor',
    amount: '₹3,00,000',
    benefits: [
      'Name would appear in all official correspondence',
      'Complimentary registration for 2 delegates',
      'Half-page advertisement in souvenir',
    ],
  },
];

const eventSponsorships = [
  {
    title: 'Conference Banquet',
    amount: '₹7,00,000',
    benefits: [
      'Announcement & banner display at the banquet',
      'Complimentary registration for 4 delegates',
      'One page advertisement in souvenir & a stall in exhibition'
    ],
  },
  {
    title: 'Dinner Sponsor',
    amount: '₹4,50,000',
    benefits: [
      'Special announcement and banner display at the dinner',
      'Complimentary registration for 3 delegates',
      'One page advertisement in souvenir',
    ],
  },
  {
    title: 'Lunch Sponsorship (3 Days)',
    amount: '₹2,50,000 (Per Lunch)',
    benefits: [
      'Announcement & banner display at the banquet',
      'Complimentary registration for 1 delegate',
      'Half-page advertisement in souvenir',
    ],
  },
];

const stallOptions = [
  { size: '12 m²', tariff: '₹2,00,000' },
  { size: '9 m²', tariff: '₹1,50,000' },
  { size: '6 m²', tariff: '₹1,00,000' },
];

const SponsorshipOpportunities = () => {
  return (
    <>
      <Navbar />
    <div className="sponsorship-container">
      <h1 className="sponsorship-heading">Sponsorship & Exhibition Opportunities</h1>
      <p className="sponsorship-intro">
        The STIS-V 2025 offers a unique platform to showcase your organization to an international audience of researchers, industry experts, and academicians. The various sponsorship and exhibition opportunities are highlighted below-
      </p>

      {/* Sponsorship Tiers */}
      <section className="sponsorship-section">
        <h2 className="section-title">Sponsorship Tiers</h2>
        <div className="sponsorship-cards">
          {sponsorshipTiers.map((sponsor, index) => (
            <div className="sponsor-card" key={index}>
              <h3>{sponsor.title}</h3>
              <p className="sponsor-amount">{sponsor.amount}</p>
              <ul>
                {sponsor.benefits.map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Event-Based Sponsorships */}
      <section className="sponsorship-section">
        <h2 className="section-title">Event Sponsorships</h2>
        <div className="sponsorship-cards">
          {eventSponsorships.map((event, index) => (
            <div className="sponsor-card" key={index}>
              <h3>{event.title}</h3>
              <p className="sponsor-amount">{event.amount}</p>
              <ul>
                {event.benefits.map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Stall Tariffs */}
      <section className="stall-section">
        <h2 className="section-title">Exhibition Stall Tariffs</h2>
        <p className="stall-description">
          Book a stall at the STIS-V 2025 Exhibition to showcase your innovations, products, or services. Stall tariffs are listed below:
        </p>
        <table className="stall-table">
          <thead>
            <tr>
              <th>Stall Size</th>
              <th>Tariff</th>
            </tr>
          </thead>
          <tbody>
            {stallOptions.map((stall, index) => (
              <tr key={index}>
                <td>{stall.size}</td>
                <td>{stall.tariff}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="stall-note">
          <strong>Note:</strong> Every stall will be equipped with one plug point, two chairs, one table, and two spotlights.
        </p>
      </section>
    </div>
    <br />
    <br />
    <Footer />
    </>
    
  );
};

export default SponsorshipOpportunities;
