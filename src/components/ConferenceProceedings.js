import React, { useEffect } from 'react';
import './ConferenceProceedings.css';
import Navbar from './Navbar';
import Footer from './Footer';

const ConferenceProceedings = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
        <Navbar />
    <div className="conference-proceedings-container">
      {/* Hero Banner */}
      <section className="hero-banner-proceedings">
        
          <h1 className="proceedings-heading">Conference Proceedings</h1>
          <section className="proceedings-content">
        <p>
          All submitted papers or extended abstracts will undergo a thorough peer-review process. Accepted papers or extended abstracts will be
          published in the official Conference Proceedings volume with an ISBN. Selected high-quality papers will be
          recommended for publication in reputed international journals, subject to their individual review policies.
        </p>
      </section>
          
      </section>

      {/* Description */}
      

        {/* Highlights + Timeline in 2-column layout */}
<section className="proceedings-side-section">
  {/* Highlights Section */}
  <div className="proceedings-highlights">
    <h2>Publication Highlights</h2>
    <ul className="highlight-list">
      <li>✅ Peer-reviewed submission process</li>
      <li>✅ Conference Proceedings with ISBN</li>
      <li>✅ Potential inclusion in Scopus/SCI indexed journals</li>
      
    </ul>
  </div>

  {/* Timeline */}
  <div className="proceedings-timeline">
    <h2>Submission & Review Process</h2>
    <div className="timeline">
      <div className="timeline-step">
        <div className="step-circle">1</div>
        <p>Submit Paper / Extended Abstract</p>
      </div>
      <div className="timeline-step">
        <div className="step-circle">2</div>
        <p>Peer Review Process</p>
      </div>
      <div className="timeline-step">
        <div className="step-circle">3</div>
        <p>Author Revisions (if required)</p>
      </div>
      <div className="timeline-step">
        <div className="step-circle">4</div>
        <p>Final Acceptance & Publication</p>
      </div>
    </div>
  </div>

</section>
<br />
    <br />
    <br />
</div>
    
    <Footer />
    </>
     
    
  );
};

export default ConferenceProceedings;
