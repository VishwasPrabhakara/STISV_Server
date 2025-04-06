import React, { useState, useEffect } from 'react';
import './Bengaluru.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Bengaluru = () => {
  const [activeTab, setActiveTab] = useState('heritage');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = {
    heritage: "Heritage Sites",
    adventure: "Adventure/Activities",
    artFestivals: "Art & Festivals",
    nature: "Nature & Wildlife",
    artCulture: "Art & Culture",
    religious: "Religious Places",
    museums: "Museums",
    attractions: "Tourist Attractions",
    getaways: "Getaways Around Bengaluru"
  };

  const content = {
    heritage: [
        {
            title: "Vidhana Soudha",
            description: "The magnificent Vidhana Soudha, completed in 1956 under the vision of Sri Kengal Hanumanthaiah, then Chief Minister of Mysuru State, stands as Karnataka's seat of state legislature and secretariat. This imposing granite edifice represents one of India's most remarkable legislative buildings and serves as an architectural landmark of Bengaluru.",
            link: "https://tourism.kar.nic.in/destinations/vidhana-soudha",
            displayLink: "Visit Vidhana Soudha Official Page →"
        },
        {
            title: "Freedom Park",
            description: "Transformed from the historic Central Jail, Freedom Park spans 21 acres of reimagined space. Opened to the public in 2008, this multi-functional urban park features a comprehensive library, historical museum, dedicated jogging paths, an open-air amphitheater, children's recreation area, and designated spaces for public demonstrations and civic gatherings.",
            link: "https://www.karnatakatourism.org/tour-item/freedom-park/",
            displayLink: "Explore Freedom Park Details →"
        },
        {
            title: "Bangalore Palace",
            description: "Drawing inspiration from England's Windsor Castle, this majestic palace showcases stunning Tudor-style architecture with ornate turreted parapets, fortified towers, battlements, and Gothic windows. Its sprawling courtyard serves as a premier venue for international concerts, art exhibitions, and cultural celebrations.",
            link: "https://bangalorepalace.in/",
            displayLink: "Visit Bangalore Palace Website →"
        },
        {
            title: "Tipu Sultan's Summer Palace",
            description: "Constructed in 1791, this ornate summer residence of Tipu Sultan exemplifies Indo-Islamic architectural brilliance. The two-story palace showcases intricately carved wooden pillars, decorated balconies, and elegant cusped arches, offering visitors a glimpse into royal heritage.",
            link: "https://www.karnatakatourism.org/tour-item/tipu-sultan-palace/",
            displayLink: "Learn More About Tipu Sultan's Palace →"
        },
        {
            title: "Karnataka High Court",
            description: "This neo-Gothic architectural masterpiece, constructed in red brick and stone, stands as Bengaluru's oldest public building. Located opposite Vidhana Soudha, its Greco-Roman design elements and historical significance make it a prominent landmark housing the state's highest judicial authority.",
            link: "https://karnatakajudiciary.kar.nic.in/history.php",
            displayLink: "Visit High Court History Page →"
        },
        {
            title: "Town Hall",
            description: "The Puttanna Chetty Town Hall, erected in 1935, exemplifies classical European architecture with its prominent Tuscan columns. Now a vital cultural center, it regularly hosts civic events, public functions, and diverse cultural performances.",
            link: "https://www.karnatakatourism.org/tour-item/town-hall/",
            displayLink: "Discover Town Hall History →"
        }
    ],
    adventure: [
        {
            title: "Microlight Flying Experience",
            description: "Experience the thrill of aviation in two-seater microlight aircraft, with popular models like ZenAir and Xair. These guided flights offer a unique perspective of Bengaluru's landscape while providing an introduction to recreational flying.",
            link: "https://jakkuraerodrome.com/",
            displayLink: "Book Your Flying Experience →"
        },
        {
            title: "Adventure Sports Complex",
            description: "Multiple adventure sports facilities across Sarjapur Road, Yashvanthpur, and Kanakapura Road offer exciting activities including ATV riding, tactical paintball games, high-speed go-karting, and various team-building adventures.",
            link: "https://www.thrillophilia.com/cities/bangalore/tags/adventure-sports",
            displayLink: "Browse Adventure Activities →"
        },
        {
            title: "Snow City",
            description: "Established in 2012, this 12,500-square-foot indoor winter wonderland stands as Bengaluru's largest temperature-controlled entertainment center. Visitors can enjoy snow zorbing, winter sports, snow basketball, artificial mountain climbing, and festive snow activities.",
            link: "https://snowcitybangalore.com/",
            displayLink: "Plan Your Snow City Visit →"
        },
        {
            title: "Breakout Escape Rooms",
            description: "Located in Koramangala, these immersive escape room experiences challenge participants with intricate puzzles and time-based scenarios, offering unique team-building and problem-solving adventures.",
            link: "https://breakout.in/bangalore/",
            displayLink: "Book an Escape Room →"
        },
        {
            title: "iPlay Ice Skating",
            description: "Situated in Whitefield, this state-of-the-art ice skating facility brings winter sports to tropical Bengaluru. The arena offers skating lessons, recreational sessions, and professional training opportunities.",
            link: "https://iplayarena.com/",
            displayLink: "Visit iPlay Arena Website →"
        },
        {
            title: "Flight 4 Fantasy",
            description: "Located within Forum Mall, Koramangala, this advanced flight simulation center offers aspiring pilots and aviation enthusiasts the opportunity to experience realistic aircraft operations in professional-grade simulators.",
            link: "https://flight4fantasy.com/",
            displayLink: "Book Flight Simulation Experience →"
        }
    ],
    artFestivals: [
        {
            title: "Bengaluru Karaga",
            description: "This historic nine-day festival, centered at the Dharmaraya Swamy Temple, represents one of Bengaluru's oldest cultural traditions. The highlight features a priest carrying an elaborate flower-decorated pyramid in a grand procession, symbolizing Hindu-Muslim unity through its traditional visit to a Muslim dargah.",
            link: "https://www.karnatakatourism.org/tour-item/karaga/",
            displayLink: "Learn About Bengaluru Karaga →"
        },
        {
            title: "Karnataka Rajyothsava",
            description: "Celebrated annually on November 1st, this state formation day commemorates the 1956 unification of Kannada-speaking regions into Karnataka. The festival features cultural performances, award ceremonies, and state-wide celebrations highlighting Karnataka's rich heritage.",
            link: "https://www.karnataka.gov.in/page/Karnataka+Formation+Day/en",
            displayLink: "Explore Rajyothsava Celebrations →"
        },
        {
            title: "Bengaluru International Film Festival",
            description: "This prestigious week-long February event brings together filmmakers, critics, and cinema enthusiasts from around the world. The festival showcases outstanding international and regional films, fostering cultural exchange through the medium of cinema.",
            link: "https://biffes.org/",
            displayLink: "Visit BIFFES Website →"
        },
        {
            title: "Lalbagh Flower Show",
            description: "This biannual horticultural exhibition, held in January and August within the historic Glass House, displays spectacular floral arrangements, rare plant species, and themed decorative installations, drawing nature enthusiasts and photographers from across the country.",
            link: "https://horticulture.karnataka.gov.in/info-1/Flower+Show/en",
            displayLink: "Learn About Flower Show →"
        },
        {
            title: "Basavanagudi Kadalekai Parishe",
            description: "This centuries-old groundnut fair celebrates the annual harvest, drawing farmers to the iconic Bull Temple for blessings. The festival features local cuisine, cultural performances, and traditional market stalls selling freshly harvested groundnuts.",
            link: "https://www.karnatakatourism.org/tour-item/kadalekai-parishe/",
            displayLink: "Discover Kadalekai Parishe →"
        },
        {
            title: "Ramanavami Music Festival",
            description: "Organized by the prestigious Shree Ramaseva Mandali, this annual classical music festival has hosted legendary performers like Bhimsen Joshi and M.S. Subbulakshmi. The event celebrates Indian classical music through concerts by renowned artists.",
            link: "https://www.karnataka.com/festival/rama-navami/",
            displayLink: "Explore Music Festival Details →"
        }
    ],
    nature: [
        {
            title: "Cubbon Park",
            description: "This 300-acre urban oasis in central Bengaluru houses the State Library, diverse flowering species, ornamental fountains, and historical statues. The park offers peaceful walking trails, recreational spaces, and a perfect escape from city life.",
            link: "https://www.karnatakatourism.org/tour-item/cubbon-park/",
            displayLink: "Visit Cubbon Park Guide →"
        },
        {
            title: "Lalbagh Botanical Garden",
            description: "Established in the 18th century, this 240-acre botanical paradise showcases India's largest collection of tropical plants, a stunning glasshouse, and an ancient rock formation dating back 3,000 million years. The garden serves as a center for botanical research and conservation.",
            link: "https://horticulture.karnataka.gov.in/info-2/Lalbagh+Botanical+Garden/en",
            displayLink: "Explore Lalbagh Gardens →"
        },
        {
            title: "Bannerghatta National Park",
            description: "Spanning 260.51 square kilometers, this biological reserve features guided safari experiences showcasing lions, tigers, and bears. The park complex includes a butterfly conservatory, a modern zoo facility, and various wildlife conservation programs.",
            link: "https://bannerghattabiologicalpark.org/",
            displayLink: "Plan Your Safari Visit →"
        },
        {
            title: "Ulsoor Lake",
            description: "One of Bengaluru's largest water bodies offers recreational boating facilities, landscaped walking paths, and peaceful evening environments. The lake area features exercise stations, food vendors, and frequent cultural events.",
            link: "https://www.karnatakatourism.org/tour-item/ulsoor-lake/",
            displayLink: "Discover Ulsoor Lake →"
        },
        {
            title: "JP Biodiversity Park",
            description: "This 85-acre ecological preserve in Mathikere showcases thousands of plant species, medicinal gardens, an artificial lake, and an entertaining musical fountain display. The park serves as an educational center for environmental awareness.",
            link: "https://www.bbmp.gov.in/",
            displayLink: "Learn About JP Park →"
        },
        {
            title: "Big Banyan Tree",
            description: "Located in Ramohalli Village, this majestic 400-year-old banyan tree spans three acres with a circumference exceeding 250 meters. This natural wonder provides a unique glimpse into Karnataka's botanical heritage.",
            link: "https://www.karnatakatourism.org/tour-item/big-banyan-tree/",
            displayLink: "Visit Big Banyan Tree →"
        }
    ],
    artCulture: [
        {
            title: "Ranga Shankara",
            description: "Built as a tribute to actor Shankar Nag, this JP Nagar theater venue has become a cultural cornerstone for dramatic arts. The space hosts carefully curated theatrical festivals, workshops, and daily performances showcasing diverse theatrical traditions.",
            link: "https://www.rangashankara.org/",
            displayLink: "Check Theater Schedule →"
        },
        {
            title: "Karnataka Chitrakala Parishath",
            description: "This premier fine arts institution houses exceptional works by artists including Nicholas Roerich and Svetoslav Roerich. The center actively promotes visual arts through exhibitions, performances, and educational programs.",
            link: "https://www.karnatakachitrakalaparishath.com/",
            displayLink: "Explore Art Exhibitions →"
        },
        {
            title: "National Gallery of Modern Art",
            description: "Housed in a colonial-era mansion, this gallery showcases an extraordinary collection of Indian art from the 18th century onwards, featuring works by masters like Raja Ravi Varma, Amrita Sher-Gil, and Rabindranath Tagore.",
            link: "http://ngmaindia.gov.in/bengaluru.asp",
            displayLink: "Visit NGMA Bangalore →"
        },
        {
            title: "Indian Music Experience",
            description: "India's first interactive music museum features immersive exhibits across three floors, including a Sound Garden. The facility offers hands-on experiences with instruments and multimedia installations celebrating India's musical heritage.",
            link: "https://indianmusicexperience.org/",
            displayLink: "Plan Your Musical Journey →"
        },
        {
            title: "Ravindra Kalakshetra",
            description: "This cultural center serves as a premier venue for theatrical productions and performances, hosting diverse cultural events throughout the year. The venue supports both traditional and contemporary performing arts.",
            link: "https://www.karnatakatourism.org/tour-item/ravindra-kalakshetra/",
            displayLink: "View Upcoming Events →"
        },
        {
            title: "Comedy Scene",
            description: "Bengaluru's vibrant comedy circuit features regular performances by local and national talent across various venues. The city hosts numerous comedy clubs and events, establishing itself as a major hub for stand-up comedy in India.",
            link: "https://insider.in/bangalore/comedy",
            displayLink: "Browse Comedy Shows →"
        }
    ],
    religious: [
        {
            title: "Bull Temple",
            description: "This 16th-century temple features one of India's largest Nandi statues, measuring 4.5 meters in height and 6.5 meters in length. The site hosts the famous annual groundnut festival and represents significant Dravidian architecture.",
            link: "https://www.karnatakatourism.org/tour-item/bull-temple/",
            displayLink: "Visit Bull Temple Guide →"
        },
        {
            title: "ISKCON Temple",
            description: "One of India's largest Krishna temples, this modern spiritual complex combines traditional design with contemporary architecture, featuring granite, marble, and Korean glass construction. The temple complex hosts cultural programs and an annual Ratha Yatra festival.",
            link: "https://iskconbangalore.org/",
            displayLink: "Explore ISKCON Temple →"
        },
        {
            title: "St. Mary's Basilica",
            description: "Established in 1818 and renovated in 1874, this Gothic-style basilica features stunning stained-glass windows and impressive Corinthian columns. It stands as Bangalore's oldest church and hosts the famous St. Mary's Feast.",
            link: "https://www.bangalorebasilia.org/",
            displayLink: "Learn About St. Mary's Basilica →"
        },
        {
            title: "Gavi Gangadhareshwara Temple",
            description: "This unique cave temple demonstrates remarkable astronomical engineering, where sunlight illuminates the deity during Makara Sankranti through precisely carved stone discs. The temple represents ancient architectural and astronomical knowledge.",
            link: "https://www.karnatakatourism.org/tour-item/gavi-gangadhareshwara-temple/",
            displayLink: "Discover Cave Temple →"
        },
        {
            title: "Jamia Masjid",
            description: "Bangalore's largest mosque, built with white Rajasthani marble, can accommodate 10,000 worshippers. The five-story architectural masterpiece stands as a symbol of religious harmony and architectural excellence.",
            link: "https://www.karnatakatourism.org/tour-item/jamia-masjid/",
            displayLink: "Visit Jamia Masjid →"
        },
        {
            title: "Guru Singh Sabha Gurudwara",
            description: "Established in 1943 on the serene banks of Ulsoor Lake, this largest Sikh shrine in Bangalore combines spiritual significance with community service. The Gurudwara features stunning white marble architecture, hosts daily langar (community kitchen), and operates various educational and charitable initiatives for the local community.",
            link: "https://www.sikhgurudwarabangalore.com",
            displayLink: "Visit Gurudwara Website →"
        }
    ],
    museums: [
        {
            title: "Visvesvaraya Industrial and Technological Museum",
            description: "Dedicated to Bharat Ratna Sir M. Visvesvaraya, this educational museum showcases technological innovations across seven floors. Among its prized exhibits is a 1:1 scale replica of the Wright Brothers' Flyer, along with interactive science demonstrations and technological artifacts.",
            link: "http://www.vismuseum.gov.in/",
            displayLink: "Explore VITM →"
        },
        {
            title: "HAL Heritage Centre and Aerospace Museum",
            description: "India's first aerospace museum, established by Hindustan Aeronautics Limited, displays an impressive collection of aircraft, helicopters, and engines. Visitors can experience flight simulators and explore a mock air traffic control tower while learning about India's aviation history.",
            link: "https://hal-india.co.in/Museum/M__179",
            displayLink: "Visit Aerospace Museum →"
        },
        {
            title: "Government Museum",
            description: "One of India's oldest museums houses an extensive collection of archaeological artifacts, ancient inscriptions, coins, and artwork. Its prized possession includes the first documented Kannada inscription, making it a crucial repository of Karnataka's cultural heritage.",
            link: "https://www.karnatakamuseums.org/",
            displayLink: "Discover Government Museum →"
        },
        {
            title: "NIMHANS Heritage Museum",
            description: "This unique museum chronicles the evolution of mental health care in India, from its origins as a 19th-century mental asylum to its current status as the National Institute of Mental Health and Neurosciences, showcasing the advancement of neuropsychiatric treatment.",
            link: "https://nimhans.ac.in/museum/",
            displayLink: "Explore NIMHANS History →"
        },
        {
            title: "Indian Cartoon Gallery",
            description: "Established in 2007 as India's only dedicated cartoon gallery, this unique space celebrates the art of cartooning. The gallery regularly exhibits works from both Indian and international cartoonists, promoting cartoon art as a powerful medium of expression.",
            link: "https://www.indianinstituteofcartoonists.com/",
            displayLink: "Visit Cartoon Gallery →"
        },
        {
            title: "HMT Heritage Centre",
            description: "This specialized museum preserves the legacy of Hindustan Machine Tools Limited, showcasing the evolution of India's watchmaking and machine tools industry. Visitors can explore vintage timepieces, manufacturing equipment, and interactive displays highlighting industrial heritage.",
            link: "https://www.hmtindia.com/museum",
            displayLink: "Explore HMT Heritage →"
        }
    ],
    attractions: [
        {
            title: "Shopping in Bengaluru",
            description: "Known as a shopper's paradise, Bengaluru offers diverse retail experiences from traditional markets to modern malls. Explore the bustling Commercial Street for fashion, Brigade Road for trendy boutiques, and Cauvery Emporium for authentic Karnataka handicrafts and silks.",
            link: "https://www.karnatakatourism.org/tour-item/shopping-in-bangalore/",
            displayLink: "Discover Shopping Destinations →"
        },
        {
            title: "Culinary Experiences",
            description: "Bengaluru's diverse food scene ranges from historic establishments like MTR and Vidyarthi Bhavan serving traditional South Indian cuisine to contemporary restaurants offering global flavors. The city's coffee culture and street food scenes are equally renowned.",
            link: "https://www.bangalorebest.com/restaurants",
            displayLink: "Explore Food Scene →"
        },
        {
            title: "Bengaluru Turf Club",
            description: "This historic 150-year-old race course spans 85 acres and features world-class equestrian facilities. The complex includes professional stables, training tracks, and an amateur riding school, hosting regular horse racing events throughout the season.",
            link: "https://www.bangaloreturf.com/",
            displayLink: "Visit Turf Club →"
        },
        {
            title: "Health & Wellness Centers",
            description: "As a leading medical tourism destination, Bengaluru offers comprehensive wellness services including traditional Ayurveda treatments, naturopathy centers, holistic healing practices, and state-of-the-art medical facilities with international accreditation.",
            link: "https://www.bangaloremedicaltourism.com/",
            displayLink: "Explore Wellness Options →"
        },
        {
            title: "Educational Institutions",
            description: "Home to prestigious institutions like Indian Institute of Science (IISc), ISRO, Indian Institute of Management (IIMB), and numerous research centers, Bengaluru has earned its reputation as India's science and technology capital.",
            link: "https://www.iisc.ac.in/",
            displayLink: "Discover Educational Hub →"
        },
        {
            title: "Golf Courses",
            description: "Bengaluru's golf scene features world-class facilities including the Karnataka Golf Association's championship 18-hole course and the historic Bangalore Golf Club, established in 1876. These courses offer challenging terrains for both amateur and professional golfers.",
            link: "https://www.kga.in/",
            displayLink: "Explore Golf Courses →"
        }
    ],
    getaways: [
        {
            title: "Nandi Hills",
            description: "This ancient hill fortress at 1,445 meters elevation offers breathtaking sunrise views and historical significance. Visitors can explore walking trails to Amrita Sarovar, ancient temples, and Tipu Sultan's summer residence while enjoying the cool climate.",
            link: "https://www.karnatakatourism.org/tour-item/nandi-hills/",
            displayLink: "Plan Nandi Hills Visit →"
        },
        {
            title: "Wonderla Amusement Park",
            description: "Spread across 82 acres, this premier amusement park features over 60 exhilarating rides and attractions. The park includes water rides, dry rides, and a resort, making it perfect for family outings and adventure enthusiasts.",
            link: "https://wonderla.com/bengaluru/",
            displayLink: "Book Wonderla Tickets →"
        },
        {
            title: "Innovative Film City",
            description: "This entertainment complex combines film production facilities with tourist attractions. Featuring museums, a film school, amphitheater, and various themed experiences, it offers insights into the world of cinema and entertainment.",
            link: "https://innovativefilmcity.com/",
            displayLink: "Explore Film City →"
        },
        {
            title: "Pearl Valley",
            description: "This scenic waterfall destination earned its name from its pearl-like water droplets cascading down rocky terrain. The location offers excellent opportunities for nature photography and peaceful day trips away from the city.",
            link: "https://www.karnatakatourism.org/tour-item/pearl-valley/",
            displayLink: "Visit Pearl Valley →"
        },
        {
            title: "Shivanasamudra Falls",
            description: "These magnificent twin waterfalls, Barachukki and Gaganachukki, are formed by the Cauvery River dropping 75 meters, creating one of Karnataka's most spectacular natural attractions. The site also features Asia's first hydroelectric power station.",
            link: "https://www.karnatakatourism.org/tour-item/shivanasamudra-falls/",
            displayLink: "Explore Waterfalls →"
        },
        {
            title: "Bheemeshwari Adventure Camp",
            description: "Located along the Cauvery River, this adventure camp offers thrilling activities including zip-lining, kayaking, and nature walks. The camp provides opportunities to spot diverse wildlife and birds while enjoying outdoor adventures.",
            link: "https://www.junglelodges.com/bheemeshwari-adventure-camp/",
            displayLink: "Book Adventure Camp →"
        }
    ]
};

  const renderContent = () => {
    const section = content[activeTab];
    if (!section) return <p className="coming-soon">More information coming soon...</p>;

    const filtered = section.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="bengaluru-cards">
        {filtered.length > 0 ? (
          filtered.map((item, index) => (
            <div className="bengaluru-card" key={index}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="bengaluru-link">
                {item.displayLink}
              </a>
            </div>
          ))
        ) : (
          <p className="no-results">No results found for your search.</p>
        )}
      </div>
    );
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearchQuery('');
  }, [activeTab]);

  return (
    <>
      <Navbar />
      <div className="bengaluru-wrapper">
        <header className="bengaluru-header">
          <h1>Explore Bengaluru</h1>
          <p className="subtitle">
            Uncover the cultural charm, scenic beauty, and vibrant experiences the city has to offer.
          </p>
        </header>
    

        <div className="bengaluru-tabs">
          {Object.entries(categories).map(([key, value]) => (
            <button
              key={key}
              className={`bengaluru-tab ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {value}
            </button>
          ))}
        </div>

        <section className="bengaluru-section">
          {renderContent()}
        </section>

        <footer className="bengaluru-footer">
          <p>
            Official tourism resources courtesy of{" "}
            <a href="https://bengaluruurban.nic.in/en/tourism/" target="_blank" rel="noopener noreferrer">
              Bengaluru Urban District
            </a>
          </p>
        </footer>
      </div>
      <br /><br />
      <Footer />
    </>
  );
};

export default Bengaluru;
