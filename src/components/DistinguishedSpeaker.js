import React, { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "./DistinguishedSpeaker.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

  const plenarySpeakers = [
    {
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
  ];
  
  const invitedSpeakers = [
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
      name: " G.A Brooks",
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
      name: " Gour Gopal Roy",
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
      name: " Amarendra K Singh",
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
    },

    {
      name: " Seshadri Seetharaman ",
      affiliation: "Emeritus Professor at the Royal Institute of Technology, KTH, Sweden",
      url: "http://www.femri.org/team-detail-indiv-2.aspx#:~:text=Sheshadri%20Seetharaman,of%20Technology%2C%20KTH%2C%20Sweden",
      imagePath: "/stis2025/assets/speakers_upscaled/Seshadri Seetharaman.jpeg"
    },
  
    {
      name: " Narasimha Mangadoddy",
      affiliation: "Indian Institute of Technology, Hyderabad",
      url: "https://www.iith.ac.in/che/narasimha/",
      imagePath: "/stis2025/assets/speakers_upscaled/Dr. Narasimha Mangadoddy.jpeg"
    },
  
    {
      name: "Shatrughan Soren",
      affiliation: "Indian Institute of Technology (Indian School of Mines), Dhanbad",
      url: "https://www.iitism.ac.in/faculty-details?faculty=ssoren",
      imagePath: "/stis2025/assets/speakers_upscaled/Dr. Shatrughan Soren.jpeg"
    },
  
    {
      name: "Nikhil Dhawan",
      affiliation: "Indian Institute of Technology, Roorkee",
      url: "https://iitr.ac.in/Departments/Metallurgical%20and%20Materials%20Engineering%20Department/People/Faculty/100714.html",
      imagePath: "/stis2025/assets/speakers_upscaled/Dr. Nikhil Dhawan .jpeg"
    },
  
    {
      name: "Sabita Sarkar",
      affiliation: "Indian Institute of Technology, Madras",
      url: "https://mme.iitm.ac.in/faculty-inner.php?id=26&fc=1",
      imagePath: "/stis2025/assets/speakers_upscaled/Dr. Sabita Sarkar.jpeg"
    },
  ];
  

  const DistinguishedSpeaker = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
      { loop: true, align: "start", speed: 5 },
      [Autoplay({ delay: 2000, stopOnInteraction: false })]
    );
  
    const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
    const scrollNext = () => emblaApi && emblaApi.scrollNext();
  
    const renderSpeakerCard = (speaker, index) => (
      <a
        key={index}
        href={speaker.url || "#!"}
        target="_blank"
        rel="noopener noreferrer"
        className="speaker-card"
      >
        <div className="speaker-avatar">
          <img src={speaker.imagePath} alt={speaker.name} />
        </div>
        <div className="speaker-info">
          <h4>{speaker.name}</h4>
          <p>{speaker.affiliation}</p>
        </div>
      </a>
    );
  
    return (
      <>
        <Navbar />
        <div className="distinguished-speakers-container">
          {/* === Plenary Speakers === */}
          <section className="speakers-section">
          <div className="section-title-wrapper">
            <h2 className="section-title">Plenary Speakers</h2>
          </div>
            <div className="static-scroll">
              {plenarySpeakers.map((s, i) => renderSpeakerCard(s, i))}
            </div>
          </section>
  
          {/* === Invited Speakers (Embla Carousel) === */}
          <section className="speakers-section">
          <div className="section-title-wrapper">
            <h2 className="section-title">Invited Speakers</h2>
          </div>
            <div className="invited-box">
              <div className="embla">
                <div className="embla__viewport" ref={emblaRef}>
                  <div className="embla__container">
                  {invitedSpeakers.map((speaker, i) => (
                  <div className="embla__slide" key={`invited-${i}`}>
                    {renderSpeakerCard(speaker)}
                  </div>
                ))}

                  </div>
                </div>
                <button className="embla__prev" onClick={scrollPrev}>‹</button>
                <button className="embla__next" onClick={scrollNext}>›</button>
              </div>
            </div>
          </section>
        </div>
        <br/>
        <br /> <br/>
        <br />
        <Footer />
      </>
    );
  };
  
  export default DistinguishedSpeaker;