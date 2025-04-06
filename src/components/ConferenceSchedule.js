import React, { useEffect } from 'react';
import './ConferenceSchedule.css';
import Navbar from './Navbar';
import Footer from './Footer';

const ConferenceSchedule = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <>
        <Navbar />
    <div className="conference-schedule-container">
      <div className="schedule-box">
        <h1 className="schedule-heading">Conference Schedule</h1>
        <p className="schedule-message">
          The detailed conference schedule is currently being finalized.<br />
          Please stay tuned — it will be published closer to the event.
        </p>
        <p className="schedule-note">We appreciate your patience and enthusiasm!</p>
      </div>
    </div>
    <br />
    <br />
    <Footer />
    </>
  );
};

export default ConferenceSchedule;
