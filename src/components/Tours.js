import React from 'react';
import './Tours.css';
import Navbar from './Navbar';
import Footer from './Footer';

const toursData = {
  postConference: [
    {
      id: 1,
      title: 'Jindal (JSW Steel Ltd.) only',
      status: 'YET TO BE CONFIRMED',
      departure: 'To be updated',
      return: 'To be updated',
      notes: ['Minimum 8 and Maximum 14 people', 'A/C 2-Tier Sleeper Class Train', '8-hour one-way journey'],
    },
    {
      id: 2,
      title: 'Jindal (JSW Steel Ltd.) + Hampi',
      status: 'YET TO BE CONFIRMED',
      departure: 'To be updated',
      return: 'To be updated',
      notes: ['Minimum 8 and Maximum 14 people', 'A/C 2-Tier Sleeper Class Train', '8-hour one-way journey'],
    },
    {
      id: 3,
      title: 'Day Return Trip to Mysore',
      departure: 'To be updated',
      return: 'To be updated',
      notes: ['A/C Bus', 'Minimum 10 people required'],
    },
    {
      id: 4,
      title: 'Day Return Trip to Hassan',
      departure: 'To be updated',
      return: 'To be updated',
      notes: ['A/C Bus', 'Minimum 10 people required'],
    },
  ],
  other: [
    {
      id: 5,
      title: 'Bengaluru City Sightseeing',
      departure: 'To be updated',
      return: 'To be updated',
      notes: ['A/C Bus', 'Minimum 10 people required'],
    },
    {
      id: 6,
      title: 'Taj Kuteeram & Nrityagram (Day Return)',
      departure: 'To be updated',
      return: 'To be updated',
      notes: ['A/C Bus', 'Minimum 10 people required'],
    },
    {
      id: 7,
      title: 'Bannerghatta National Park (Day Return)',
      departure: 'To be updated',
      return: 'To be updated',
      notes: ['A/C Bus', 'Minimum 10 people required'],
    },
  ],
};

const TourCard = ({ tour }) => (
  <div className={`tour-card ${tour.status ? 'pending' : ''}`}>
    <h3 className="tour-title">{tour.title}</h3>
    {tour.status && <div className="tour-status">{tour.status}</div>}
    <div className="tour-info">
      <p><strong>Departure:</strong> {tour.departure}</p>
      <p><strong>Return:</strong> {tour.return}</p>
    </div>
    <ul className="tour-notes">
      {tour.notes.map((note, idx) => (
        <li key={idx}>{note}</li>
      ))}
    </ul>
  </div>
);

const Tours = () => {
  return (
    <>
        <Navbar />
    <main className="tours-container">
      <header className="tours-header">
        <h1>Tentative Tour Schedule</h1>
        <p className="tours-subtext">Below is a tentative list of excursions planned in conjunction with the conference.</p>
      </header>

      <section className="tours-section">
        <h2>Post-Conference Tours</h2>
        <div className={`tours-grid post-conference ${toursData.postConference.length === 4 ? 'center-last-card' : ''}`}>
            {toursData.postConference.map((tour, idx) => (
            <TourCard key={tour.id} tour={tour} />
            ))}
        </div>
        </section>

      <section className="tours-section">
        <h2>Local & Day Tours</h2>
        <div className="tours-grid">
          {toursData.other.map(tour => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>

      <section className="tours-notes">
        <h3>Important Information</h3>
        <ul>
          <li>All pickups and drop-offs will be arranged from the conference venue.</li>
          <li>Entrance fees and meals are not included unless specified.</li>
          <li>Tours are subject to cancellation in case of low participation.</li>
          <li>Full refunds will be provided for organizer-cancelled tours.</li>
          <li>Tour fees and final schedules will be communicated shortly.</li>
        </ul>
      </section>
    </main>
    <br />
    <br />
    <Footer />
    </>
  );
};

export default Tours;
