import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './HomePage.css';

const calculateTimeRemaining = (endTime) => {
  const now = new Date().getTime();
  const diff = endTime - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const speakers  =  [              {
  name: " Hiroshi Nogami",
  affiliation: "Tohoku University, Japan",
  url: "https://www.r-info.tohoku.ac.jp/en/3ace24fb652e45919a59410fd85caede.html",
  imagePath: "/stis2025/assets/speakers_upscaled/Hiroshi Nogami.jpeg"
},
{
  name: " Nirupam Chakraborti",
  affiliation: "Czech Technical University, Prague",
  url: "https://scholar.google.co.kr/citations?user=RONBrJ0AAAAJ&hl=en",
  imagePath: "/stis2025/assets/speakers_upscaled/Nirupam_Chakraborti.jpeg"
},
{
  name: " Henrik Saxén",
  affiliation: "Abo Akademi University, Finland",
  url: "https://users.abo.fi/hsaxen/",
  imagePath: "/stis2025/assets/speakers_upscaled/Henrik Saxen.jpeg"
},
{
  name: " Shigeru Ueda",
  affiliation: "Tohoku University, Japan",
  url: "https://www.r-info.tohoku.ac.jp/en/56a8d0a4aa0365e3d0e525661c8675b7.html",
  imagePath: "/stis2025/assets/speakers_upscaled/shigeru ueda.jpeg"
},
{
  name: " Ronald O'Malley",
  affiliation: "Missouri University of Science and Technology, USA",
  url: "https://scholar.google.com/citations?user=S_R3hM0AAAAJ&hl=en",
  imagePath: "/stis2025/assets/speakers_upscaled/Ronald J. O'Malley.jpeg"
},
{
  name: " Y Gordon",
  affiliation: "Hatch, Canada",
  url: "https://www.linkedin.com/in/iakov-gordon-a1976a15/?originalSubdomain=ca",
  imagePath: "/stis2025/assets/speakers_upscaled/Dr. Y Gordon.jpeg"
},
{
  name: "  Joohyun Park",
  affiliation: "Hanyang University, Korea",
  url: "http://hitep2.hanyang.ac.kr/member01.html",
  imagePath: "/stis2025/assets/speakers_upscaled/JOO HYUN PARK.jpeg"
},
{
  name: " H. Matsuura",
  affiliation: "University of Tokyo, Japan",
  url: "https://www.material.t.u-tokyo.ac.jp/faculty/hiroyuki_matsuura_e.html",
  imagePath: "/stis2025/assets/speakers_upscaled/Hiroyuki Matsuura.jpeg"
},
{
  name: " Alberto Conejo",
  affiliation: "USTB, China",
  url: "https://www.researchgate.net/profile/Alberto-Conejo",
  imagePath: "/stis2025/assets/speakers_upscaled/Alberto Conjego.jpeg"
},
{
  name: " Geoff Wang",
  affiliation: "University of Queensland, Australia",
  url: "https://about.uq.edu.au/experts/525",
  imagePath: "/stis2025/assets/speakers_upscaled/Geoff Wang.png"
},
{
  name: " Jung-Wook Cho",
  affiliation: "POSTECH, Korea",
  url: "https://www.researchgate.net/profile/Jungwook-Cho",
  imagePath: "/stis2025/assets/speakers_upscaled/Jungwook Cho.jpeg"
},
{
  name: " Konstantin V. Grigorovich",
  affiliation: "RAS, Russia",
  url: "https://www.researchgate.net/profile/Konstantin-Grigorovich",
  imagePath: "/stis2025/assets/speakers_upscaled/Konstantin Grigorovich.jpeg"
},
{
  name: " Miroslaw Karbowniczek",
  affiliation: "AGH University, Poland",
  url: "https://skos.agh.edu.pl/osoba/miroslaw-karbowniczek-1329.html",
  imagePath: "/stis2025/assets/speakers_upscaled/Mirosław Karbowniczek.jpeg"
},
{
  name: " Paulo Santos Assis",
  affiliation: "UFOP, Brazil",
  url: "https://www.researchgate.net/profile/Paulo-Assis-2",
  imagePath: "/stis2025/assets/speakers_upscaled/Paulo S Assis.jpeg"
},
{
  name: " Pasquale D Cavaliere",
  affiliation: "University of Salento, Italy",
  url: "https://www.unisalento.it/scheda-utente/-/people/pasquale.cavaliere",
  imagePath: "/stis2025/assets/speakers_upscaled/Pasquale Daniele CAVALIERE.jpeg"
},
{
  name: " Kazuki Morita",
  affiliation: "Tokyo, Japan",
  url: "https://www.material.t.u-tokyo.ac.jp/faculty/morita_e.html",
  imagePath: "/stis2025/assets/speakers_upscaled/Kazuki Morita.png"
},
{
  name: " Geoffrey Brooks",
  affiliation: "Swinburne University, Australia",
  url: "https://www.swinburne.edu.au/research/our-research/access-our-research/find-a-researcher-or-supervisor/researcher-profile/?id=gbrooks/",
  imagePath: "/stis2025/assets/speakers_upscaled/Geoffrey Brooks.jpeg"
},
{
  name: " Olena Volkova",
  affiliation: "Technical University Frieberg, Germany",
  url: "https://www.researchgate.net/profile/Olena-Volkova-2",
  imagePath: "/stis2025/assets/speakers_upscaled/Olena Volkova.png"
},
{
  name: " S.J. KIM",
  affiliation: "Chosun University, Korea",
  url: "https://www.unlv.edu/people/sj-kim",
  imagePath: "/stis2025/assets/speakers_upscaled/Sun-Joong Kim.jpeg"
},
{
  name: " M. Hayashi",
  affiliation: "Institute of Science, Tokyo, Japan",
  url: "",
  imagePath: "/stis2025/assets/speakers_upscaled/miyuki hayashi.jpeg"
},
{
  name: " Ricardo Carli",
  affiliation: "Prosimet, Italy",
  url: "https://www.linkedin.com/in/riccardo-carli-431a1446/?originalSubdomain=it",
  imagePath: "/stis2025/assets/speakers_upscaled/Riccardo Carli.jpeg"
},
{
  name: " Jorge Madias",
  affiliation: "Metallion, Argentina",
  url: "https://www.researchgate.net/profile/Jorge-Madias",
  imagePath: "/stis2025/assets/speakers_upscaled/Jorge-Madias.png"
},

{
  name: " Charlotte Anderson",
  affiliation: "Lulea University of Technology, Sweden",
  url: "https://www.physicaltherapy.utoronto.ca/charlotte-anderson",
  imagePath: "/stis2025/assets/speakers_upscaled/Charlotte Anderson.jpg"
},

{
  name: " Brahma Deo",
  affiliation: "IIT Bhubaneswar, India ",
  url: "https://www.iitbbs.ac.in/index.php/bdeo",
  imagePath: "/stis2025/assets/speakers_upscaled/Brahma Deo.jpg"
},

{
  name: " Dipak Mazumdar",
  affiliation: "IIT Kanpur, India",
  url: "https://home.iitk.ac.in/~dipak/",
  imagePath: "/stis2025/assets/speakers_upscaled/Dipak Mazumdar.jpg"
},

{
  name: " R H Tupkary",
  affiliation: "Former Prof VNIT Nagpur, India",
  url: "",
  imagePath: "/stis2025/assets/speakers_upscaled/R H Tupkary.jpeg"
},

{
  name: " GG Roy",
  affiliation: "IIT Kharagpur, India",
  url: "http://www.metal.iitkgp.ac.in/People/facultyDetails/6",
  imagePath: "/stis2025/assets/speakers_upscaled/GG Roy.png"
},

{
  name: " Keith Vining",
  affiliation: "CSIRO, Australia",
  url: "https://people.csiro.au/V/K/Keith-Vining",
  imagePath: "/stis2025/assets/speakers_upscaled/Keith-Vining.jpeg"
},

{
  name: " AK Singh",
  affiliation: " IIT Kanpur, India",
  url: "https://www.iitk.ac.in/new/amarendra-kumar-singh ",
  imagePath: "/stis2025/assets/speakers_upscaled/amrendra-singh.jpeg"
},

{
  name: " LIU Jianhua",
  affiliation: "USTB, China",
  url: "https://ieten.ustb.edu.cn/Discipline/yjgcly/2019-12-07/ed15a296dd6f480d97ec60ea1b7d5af3.htm",
  imagePath: "/stis2025/assets/speakers_upscaled/LIU Jianhua.jpeg"
},

{
  name: " Kamalesh Mandal",
  affiliation: "Steel Dynamics",
  url: "https://www.linkedin.com/in/kamalesh-mandal-phd-49140626/",
  imagePath: "/stis2025/assets/speakers_upscaled/Kamalesh Mandal.jpeg"
}];

const pastImages = [{}]

const HomePage = () => {
  const [timeRemaining, setTimeRemaining] = useState({});
  const [fadeIn, setFadeIn] = useState(false);
  const [activeSpeakerIndex, setActiveSpeakerIndex] = useState(null);


  useEffect(() => {
    const endTime = new Date('2025-12-09T00:00:00').getTime();
    const update = () => setTimeRemaining(calculateTimeRemaining(endTime));

    update();
    const interval = setInterval(update, 1000);
    setFadeIn(true);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      {/* Announcement Banner */}
      <div className="announcement-bar">
        <marquee behavior="scroll" direction="left" scrollamount="15">
          📢 Last Date of Abstract Submission: 30th April 2025
          &nbsp;&nbsp;&nbsp; • Acceptance Notification: 30th May 2025
          &nbsp;&nbsp;&nbsp; • Final Submission: 30th September 2025
          &nbsp;&nbsp;&nbsp; • Abstract Template is now available for download
        </marquee>
      </div>

      {/* Hero Section */}
      <section className={`hero-section ${fadeIn ? 'fade-in' : ''}`}>
        <div className="hero-content">
          <h1 className="hero-title">
            Fifth International Conference on the
            Science & <br />Technology of Ironmaking and Steelmaking
          </h1>
          <h2 className="hero-subtitle">STIS - V 2025</h2>

          <p className="conference-info">
            9 - 12 December 2025 |{' '}
            <a
              className="location"
              href="https://www.google.com/maps/place/IISc+Bengaluru/@13.0170414,77.5633512,17z"
              target="_blank"
              rel="noopener noreferrer"
            >
              Indian Institute of Science, Bengaluru
            </a>
          </p>

          <p className="abstract-template-note">
            Abstract Template is now available for download.
          </p>

          <div className="cta-buttons">
            <a
              href="/stis2025/assets/Abstract-Template.docx"
              className="cta-btn cta-download"
              download
            >
              Download Abstract Template
            </a>
            <a
              href="/stis2025/register"
              className="cta-btn cta-register"
            >
              Join the Conference
            </a>
          </div>

          <div className="countdown-wrapper">
            {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
              <div className="countdown-box" key={unit}>
                <span className="countdown-value">
                  {String(timeRemaining[unit]).padStart(2, '0')}
                </span>
                <span className="countdown-label">
                  {unit.charAt(0).toUpperCase() + unit.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPLIT LAYOUT */}
      <section className="split-section">
        {/* Speakers Vertical Scroll (Left) */}
        <div className="left-speakers-column">
          <h2 className="section-title">Our Esteemed Speakers</h2>
          <div className="vertical-scroller">
  <div className="scroller-content">
    {[...speakers, ...speakers].map((speaker, idx) => (
      <a
        key={idx}
        href={speaker.url || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="speaker-card-vertical"
      >
        <div className="speaker-img-wrapper">
          <img
            src={speaker.imagePath}
            alt={speaker.name}
            className="speaker-img-rect"
          />
          <div className="speaker-info-slide">
            <h3>{speaker.name}</h3>
            <p>{speaker.affiliation}</p>
          </div>
        </div>
      </a>
    ))}
  </div>
</div>

        </div>

        {/* Past Events Gallery (Right) */}
        <div className="right-gallery-column">
          <h2 className="section-title">Glimpses from Past Conferences</h2>
          <div className="gallery-grid">
            {pastImages.map((src, index) => (
              <div className="gallery-item" key={index}>
                <img src={src} alt={`Past Event ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <br />
      <br />
      
      <Footer />
    </>
  );
};

export default HomePage;
