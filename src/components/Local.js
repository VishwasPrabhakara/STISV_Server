import React, { useState, useEffect } from 'react';
import './Local.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Local = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "Getting Around Bengaluru",
      content: `Auto-rickshaws are a convenient mode of transport in Bengaluru. Most drivers are multilingual and familiar with the city's layout.

Fare Details:
• Base fare: ₹30 for first 2 km
• ₹15 per additional km
• Night Charges (10 PM - 5 AM): 1.5x normal fare
• Waiting charges: ₹5 per 15 minutes

Pro Tips:
• Use ride-hailing apps for fixed prices
• Keep Google Maps handy
• Pre-paid auto services available at major locations`
    },
    {
      title: "Metro Rail System",
      content: `Namma Metro is Bengaluru's rapid transit system.

Key Information:
• Operating Hours: 5 AM - 11 PM
• Purple Line: Whitefield to Challaghatta
• Green Line: Madavara to Silk Institute
• Frequency: Every 5-10 minutes during peak hours

Benefits:
• Faster than road transport
• Air-conditioned comfort
• Digital payment options
• Free WiFi at stations`
    },
    {
      title: "Cultural Hotspots",
      content: `Must-Visit Cultural Venues:
• Ravindra Kalakshetra - Traditional performances
• Chowdiah Memorial Hall - Classical music concerts
• National Gallery of Modern Art
• Bengaluru Palace - Historical architecture
• Karnataka Chitrakala Parishath - Art exhibitions

Annual Events:
• Bengaluru International Film Festival (February)
• Bengaluru Habba (December)
• Karaga Festival (March-April)
• Kadalekai Parishe (November)`
    },
    {
      title: "Food & Dining",
      content: `Famous Local Delicacies:
• Masala Dosa at CTR (Central Tiffin Room)
• Filter Coffee at Indian Coffee House
• Biryani at Meghana Foods
• Street Food at VV Puram Food Street

Popular Areas for Dining:
• Koramangala - Modern cafes and pubs
• Indiranagar - Rooftop restaurants
• Brigade Road - Fast food and casual dining
• Church Street - Iconic eateries

Must-Try Local Specialties:
• Benne Masala Dosa
• Dharwad Butter
• Mysore Pak
• Ragi Mudde`
    },
    {
      title: "Shopping Districts",
      content: `Popular Shopping Areas:
• Commercial Street - Fashion & accessories
• Brigade Road - Modern retail
• MG Road - Mix of traditional and modern
• UB City - Luxury shopping

Traditional Markets:
• Krishna Rajendra Market (City Market) - Flowers & produce
• Malleswaram Market - Traditional items
• Russell Market - Fresh produce

Shopping Tips:
• Bargaining is acceptable in traditional markets
• Weekends are usually crowded
• Many shops close by 9 PM
• Most malls open from 10 AM - 10 PM`
    }
  ];

  const filteredSections = sections.filter(({ title, content }) =>
    title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
        <Navbar />
    <main className="local-container">
      <header className="local-header">
        <h1 className="page-title">Bengaluru City Guide</h1>
        <p className="intro">
          Explore transport, culture, dining, and local experiences in one of India's most dynamic cities.
        </p>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search e.g. metro, food, shopping..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search city guide content"
          />
        </div>
      </header>

      <section className="accordion">
        {filteredSections.length === 0 ? (
          <p className="no-results">No results found for “{searchTerm}”.</p>
        ) : (
          filteredSections.map((section, index) => (
            <article
              key={index}
              className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
            >
              <button
                className="accordion-header"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                aria-expanded={activeIndex === index}
              >
                <h2 className="accordion-title">{section.title}</h2>
                <span className="toggle-icon">{activeIndex === index ? '−' : '+'}</span>
              </button>
              {activeIndex === index && (
                <div className="accordion-content">
                  {section.content.split('\n').map((line, i) => (
                    <p key={i}>{line.trim()}</p>
                  ))}
                </div>
              )}
            </article>
          ))
        )}
      </section>
    </main>
    <br />
    <br />
    <Footer />
    </>
  );
};

export default Local;
