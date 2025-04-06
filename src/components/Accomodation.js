import './Accomodation.css';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import {
  MapPin,
  Clock,
  Info,
  Coffee,
  Wifi,
  Car,
  Building2,
  Utensils,
  Dumbbell,
  Heart,
  CalendarCheck,
  AlertCircle,
  BadgeCheck,
  Bath,
  Home,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

const Accommodation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const hotels = [
    {
      id: 1,
      name: "ITC Windsor Manor",
      category: "5★ Deluxe",
      website: "https://www.itchotels.com/in/en/itcwindsor-bengaluru",
      distance: "3 km from Venue",
      description: "Experience signature hospitality with elegant rooms, fine dining, and premium facilities.",
      rates: {
        single: { inr: 12500, usd: 150, tax: 18 },
        double: { inr: 15000, usd: 180, tax: 18 }
      },
      amenities: [
        { name: "Breakfast Included", icon: Coffee },
        { name: "Premium Service", icon: ShieldCheck },
        { name: "Fine Dining", icon: Utensils },
        { name: "Fitness Center", icon: Dumbbell },
        { name: "Airport Transfer", icon: Car }
      ]
    },

    {
      id: 3,
      name: "The Lalit Ashok",
      category: "5★",
      website: "https://www.thelalit.com/",
      distance: "3 km from Venue",
      description: "Elegant stay featuring refined service, grand interiors, and a blend of comfort and class.",
      rates: {
        single: { inr: 10000, usd: 120, tax: 18 },
        double: { inr: 12000, usd: 145, tax: 18 }
      },
      amenities: [
        { name: "Breakfast Included", icon: Coffee },
        { name: "Luxury Rooms", icon: Heart },
        { name: "Multi-cuisine Dining", icon: Utensils },
        { name: "Conference Facilities", icon: Building2 },
        { name: "Premium WiFi", icon: Wifi }
      ]
    },
    {
      id: 4,
      name: "The Solitaire Hotel",
      category: "4★",
      website: "https://the-solitaire.hotels-in-bangalore.com/en/",
      distance: "4 km from Venue",
      description: "Business-friendly hotel with modern amenities and excellent value.",
      rates: {
        single: { inr: 7500, usd: 90, tax: 18 },
        double: { inr: 9000, usd: 108, tax: 18 }
      },
      amenities: [
        { name: "Breakfast Included", icon: Coffee },
        { name: "WiFi Access", icon: Wifi },
        { name: "Business Services", icon: Building2 },
        { name: "Restaurant", icon: Utensils },
        { name: "Shuttle Service", icon: Car }
      ]
    },
    {
      id: 5,
      name: "Hotel Monarch Luxor",
      category: "4★",
      website: "https://www.monarchhotels.in/",
      distance: "4 km from Venue",
      description: "Comfortable, business-friendly rooms in a well-connected part of the city.",
      rates: {
        single: { inr: 6500, usd: 78, tax: 18 },
        double: { inr: 8000, usd: 96, tax: 18 }
      },
      amenities: [
        { name: "Breakfast Included", icon: Coffee },
        { name: "WiFi", icon: Wifi },
        { name: "Business Center", icon: Building2 },
        { name: "Dining", icon: Utensils },
        { name: "Parking", icon: Car }
      ]
    },
    {
      id: 6,
      name: "The Green Path Eco Apartments",
      category: "Service Apartment",
      website: "https://thegreenpath.in/",
      distance: "2-3 km from Venue",
      description: "Eco-friendly service apartments providing comfort and self-catering options.",
      rates: {
        luxurySingle: { inr: 5000, usd: 60, tax: 12 },
        penthouse: { inr: 7000, usd: 84, tax: 12 }
      },
      amenities: [
        { name: "Breakfast Included", icon: Coffee },
        { name: "Full Kitchen", icon: Utensils },
        { name: "WiFi", icon: Wifi },
        { name: "Workspace", icon: Building2 },
        { name: "Premium Facilities", icon: Home }
      ]
    },
    {
      id: 7,
      name: "Krishinton Suites",
      category: "Boutique",
      website: "https://krishinton-suites.hotels-in-bangalore.com/en/",
      distance: "1.5 km from Venue",
      description: "Affordable boutique option just minutes from the venue. Ideal for compact, elegant stays.",
      rates: {
        single: { inr: 5500, usd: 66, tax: 12 },
        double: { inr: 6500, usd: 78, tax: 12 }
      },
      amenities: [
        { name: "Breakfast Included", icon: Coffee },
        { name: "WiFi Access", icon: Wifi },
        { name: "Kitchenette", icon: Utensils },
        { name: "Work Desk", icon: Building2 },
        { name: "Local Transport", icon: Car }
      ]
    }
  ];

  const cancellationPolicies = [
    {
      period: "Within 7 Days of Arrival",
      charge: "100% of one night charges",
      icon: AlertCircle
    },
    {
      period: "7 to 30 Days Before Arrival",
      charge: "50% of one night charges",
      icon: Info
    },
    {
      period: "More than 30 Days Before Arrival",
      charge: "No charges applied",
      icon: CalendarCheck
    }
  ];

  return (
    <>
      <Navbar />
      <div className={`accommodation-container ${isVisible ? "fade-in" : ""}`}>
        <section className="intro-section">
          <h1 className="accommodation-title">Accommodation Options</h1>
          <p className="accommodation-subtext">
            Delegates can choose from a variety of hotel options, all located within close proximity to the conference venue.
          </p>

          <div className="key-info-grid">
            <div className="key-info-card"><Clock /><h3>Check-in / out</h3><p>12 Noon</p></div>
            <div className="key-info-card"><BadgeCheck /><h3>Inclusive</h3><p>Breakfast & Wi-Fi</p></div>
            <div className="key-info-card"><Info /><h3>Booking</h3><p>First-come-first-serve</p></div>
          </div>
        </section>

        <section className="hotels-section">
  {hotels.map((hotel, idx) => (
    <div key={hotel.id} className="hotel-card" style={{ animationDelay: `${idx * 0.1}s` }}>
      <div className="hotel-header">
        <span className="hotel-category">{hotel.category}</span>
        <span className="hotel-distance"><MapPin size={14} /> {hotel.distance}</span>
      </div>

      <h2 className="hotel-name">{hotel.name}</h2>
      <p className="hotel-description">{hotel.description}</p>

      <div className="amenities-list">
        {hotel.amenities.map((a, i) => (
          <div key={i} className="amenity">
            <a.icon size={16} />
            <span>{a.name}</span>
          </div>
        ))}
      </div>

      <div className="hotel-bottom">
        <div className="rates-section">
          {hotel.id !== 6 ? (
            <>
              <div className="rate-card">
                <span>Single</span>
                <strong>₹{hotel.rates.single.inr.toLocaleString()}</strong>
                <small>${hotel.rates.single.usd} + {hotel.rates.single.tax}% tax</small>
              </div>
              <div className="rate-card">
                <span>Double</span>
                <strong>₹{hotel.rates.double.inr.toLocaleString()}</strong>
                <small>${hotel.rates.double.usd} + {hotel.rates.double.tax}% tax</small>
              </div>
            </>
          ) : (
            <>
              <div className="rate-card">
                <span>Luxury Single</span>
                <strong>₹{hotel.rates.luxurySingle.inr.toLocaleString()}</strong>
                <small>${hotel.rates.luxurySingle.usd} + {hotel.rates.luxurySingle.tax}% tax</small>
              </div>
              <div className="rate-card">
                <span>Penthouse</span>
                <strong>₹{hotel.rates.penthouse.inr.toLocaleString()}</strong>
                <small>${hotel.rates.penthouse.usd} + {hotel.rates.penthouse.tax}% tax</small>
              </div>
            </>
          )}
        </div>

        <button
          className="book-button"
          onClick={() => window.open(hotel.website, "_blank")}
        >
          Book Now <ExternalLink size={16} />
        </button>
      </div>
    </div>
  ))}
</section>


        <section className="cancellation-policy">
          <h2>Cancellation Policy</h2>
          <div className="policy-grid">
            {cancellationPolicies.map((policy, index) => (
              <div key={index} className="policy-card">
                <policy.icon size={24} className="policy-icon" />
                <h3>{policy.period}</h3>
                <p>{policy.charge}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Accommodation;
