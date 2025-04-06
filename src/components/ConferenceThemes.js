import React from 'react';
import './ConferenceThemes.css';
import Navbar from './Navbar';
import Footer from './Footer';

const themes = [
    "Fundamentals of Iron and Steelmaking.",
    "Raw Materials, use of Low-Grade Ores and Agglomeration.",
    "Coke, PCI, Hydrogen, Syngas, Biomass, and other Auxiliary Fuels.",
    "Blast Furnace and alternative routes for the production of Hot Metal.",
    "DRI/Solid-state Ironmaking processes.",
    "Primary, Secondary Steel making and Clean Steel Technology.",
    "Ingot and Continuous Casting.",
    "Electric arc/Induction furnace steelmaking.",
    "Process modelling and simulation in Iron and Steel making.",
    "Energy, Environment, and Sustainability in Iron and Steel making.",
    "Emerging and Sustainable Iron and Steelmaking processes.",
    "Refractories in Iron and Steel making.",
    <>
      Digital transformation, Industry 4.0, <br />
      and Data Analytics in Iron and Steel making.
    </>,
    <>
      Waste Recycling and Circular Economy <br />
      in Iron and Steel making.
    </>,
  ];
  

const ConferenceThemes = () => {
  return (
    <>
      <Navbar />
      <div className="conference-themes-page">
        {/* Hero Banner */}
        <section className="themes-hero">
          <div className="themes-hero-overlay">
            <h1 className="themes-main-title">Conference Themes</h1>
            <p className="themes-subtitle">Exploring Innovation & Sustainability in Iron and Steelmaking</p>
          </div>
        </section>

        {/* Introduction */}
        <section className="themes-intro">
          <div className="container">
            <p>
              Iron and steelmaking sectors are growing globally and notably in Asia. Since the last two decades, world production of steel has grown by almost 50%. Advances in the technology have contributed to improvements in productivity, quality, cost-effectiveness, and environmental friendliness.
            </p>
            <p>
              Further, advances in the theoretical aspects of iron and steelmaking have contributed to technological advances significantly through research, development, design, and process control. In India also these sectors are growing rapidly. This has given a fillip to organize an international conference in India.
            </p>
            <p>
              This conference will highlight the Science & Technology of ironmaking and steelmaking. Papers on technology illustrating the application of theory would also be welcomed. It is anticipated that the conference will provide significant benefits for the future iron and steel research and its application to industry and provide a road map for the future.
            </p>
          </div>
        </section>

        {/* Theme Cards */}
        <section className="themes-list-section">
  <div className="container">
    <h2 className="themes-section-heading">Conference Topics</h2>

    <div className="themes-grid">
      {themes.slice(0, 12).map((theme, index) => (
        <div className="theme-card" key={index}>
          
          <p>{theme}</p>
        </div>
      ))}
    </div>

    {/* Custom last row */}
    <div className="custom-last-row">
      <div className="theme-card theme-card-custom">
        
        <p>Digital transformation, Industry 4.0, and Data Analytics in Iron and Steel making.</p>
      </div>
      <div className="theme-card theme-card-custom">
        
        <p>Waste Recycling and Circular Economy in Iron and Steel making.</p>
      </div>
    </div>
  </div>
</section>

<br />
      <br />

      <br />
      <br />
      </div>

      
      <Footer />
    </>
  );
};

export default ConferenceThemes;
