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
      name: "Radisson Blu Atria Bengaluru",
      category: "5★",
      website: "https://www.radissonhotels.com/en-us/hotels/radisson-blu-bengaluru-atria",
      distance: "4-5 km from Venue",
      description: "Eco-friendly service apartments providing comfort and self-catering options.",
      
      amenities: [
        { name: "Breakfast ", icon: Coffee },
        { name: "Dining", icon: Utensils },
        { name: "WiFi", icon: Wifi },
        { name: "Workspace", icon: Building2 },
        { name: "Premium Facilities", icon: Home },
        { name: "Parking", icon: Car }
      ]
    },
    {
      id: 7,
      name: "Krishinton Suites",
      category: "Boutique",
      website: "https://krishinton-suites.hotels-in-bangalore.com/en/",
      distance: "1.5 km from Venue",
      description: "Affordable boutique option just minutes from the venue. Ideal for compact, elegant stays.",
      
      amenities: [
        { name: "Breakfast Included", icon: Coffee },
        { name: "WiFi Access", icon: Wifi },
        { name: "Kitchenette", icon: Utensils },
        { name: "Work Desk", icon: Building2 },
        { name: "Local Transport", icon: Car }
      ]
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

      

        <button
          className="book-button"
          onClick={() => window.open(hotel.website, "_blank")}
        >
          Book Now <ExternalLink size={16} />
        </button>
      </div>
   
  ))}
</section>


        
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Accommodation;
