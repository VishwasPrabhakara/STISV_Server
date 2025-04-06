import React, { useState } from 'react';
import './Committee.css';
import Navbar from './Navbar';
import Footer from './Footer';

const committeeData = [
  {
    title: 'International Advisory Committee',
    members: [
      'Bart Blanpain, KU Leuven, Belgium',
      'Brian Monaghan, Univ. of Wollongong, Australia',
      'Geoff Wang, The Univ. of Queensland, Australia',
      'H Nogami, Tohoku University, Japan',
      'Henrik Saxen, Abo Akademi Univ., Finland',
      'Hong Yong Sohn, Univ. of Utah, USA',
      'Jianliang Zhang, USTB, China',
      'Jung-Wook Cho, POSTECH, South Korea',
      'Keith Vining, CSIRO, Australia',
      'Konstantin V Grigorovich, RAS, Russia',
      'Lifeng Zhang, NCUT, China',
      'Liu Jianhua, USTB, China',
      'Mansoor Barati Sedeh, Univ. of Toronto, Canada',
      'Miroslaw KARBOWNICZEK, AGH UST, Poland',
      'N Chakraborti, Czech Technical Univ., Prague',
      'Pasquale D Cavaliere, Univ. of Salento, Italy',
      'Paulo Santos Assis, UFOP, Brazil',
      'Pinakin Chaubal, ArcelorMittal, USA',
      'Roderick I L Guthrie, McGill Univ., Canada',
      'S Kitamura, Tohoku University, Japan',
      'S Seetharaman, Sweden',
      'Shigeru Ueda, Tohoku Univ., Japan',
      'Volodymyr Shatokha, NAS, Ukraine'
    ]
  },
  {
    title: 'National Advisory Committee',
    members: [
      'Brahma Deo, IIT Bhubaneswar',
      'Dipak Mazumdar (Emer. Prof.), IIT Kanpur',
      'G V Kiran, CMD, KIOCL, Bengaluru',
      'K T Jacob (Emer. Prof.), IISc Bengaluru',
      'Narasimha Mangadoddy, IIT Hyderabad',
      'Naresh Sharma, ArcelorMittal, India',
      'Nikhil Dhawan, IIT Roorkee',
      'R H Tupkary (Former Prof.), VNIT Nagpur',
      'Shatrughan Soren, IIT-ISM Dhanbad'
    ]
  },
  {
    title: 'National Executive Committee (NEC)',
    members: [
      'Ahindra Ghosh, NEC – Advisor, Former Prof., IIT Kanpur',
      'Govind S Gupta, NEC - Chair, IISc Bengaluru',
      'G G Roy, NEC - Co-ordinator, IIT-Kharagpur',
      'Alok Chandra, Five Point Zero Consultants, Mumbai',
      'Atul Bhatt, CMD, RINL, Visakhapatnam',
      'A K Singh, IIT – Kanpur',
      'Bharat Bhushan, VP & CIO, TSDPL, Kolkata',
      'Damodar Mittal, ED – Projects, JSPL, Angul',
      'N N Viswanathan, IIT – Bombay',
      'P K Murugan, President, JSW Steel Ltd',
      'R K Goel, MD, SLR Metalik Ltd., Bellary',
      'Sabita Sarkar, IIT - Madras',
      'Sachin Bhambure, VP, Mahindra Sanyo, Mumbai',
      'Siddhartha Misra, Chief - Process Research, Tata Steel R&D, Jamshedpur'
    ]
  },
  {
    title: 'Organizing Committee',
    subSections: [
      {
        title: 'Chair',
        members: ['S. Subramanian (Emer. Prof.), IISc Bengaluru']
      },
      {
        title: 'Convenor',
        members: ['Govind S Gupta, IISc Bengaluru']
      },
      {
        title: 'Co-Convenor',
        members: ['Lakshminarayana Rao, IISc Bengaluru']
      },
      {
        title: 'Members',
        members: [
          'Ashok M Raichur, IISc Bengaluru',
          'Babu Sathian, M.D., Process Pumps Pvt. ltd.',
          'Pikee Priya, IISc Bengaluru',
          'Praveen Ramamurthy, IISc Bengaluru',
          'Prosenjit Das, IISc Bengaluru',
          'R Ravi, IISc Bengaluru',
          'Subodh Kumar, IISc Bengaluru',
          'Satyam Suwas, IISc Bengaluru',
          'T R R Rao, Director, Dhruvdesh Metasteel, Bengaluru'
        ]
      }
    ]
  }
];

const Committee = () => {
  const [activeSection, setActiveSection] = useState('International Advisory Committee');

  const toggleSection = (title) => {
    setActiveSection(prev => (prev === title ? null : title));
  };

  return (
    <>
      <Navbar />
      <div className="committee-container">
        <div className="committee-heading">
          <h1 className="committee-title">Organizing Committees</h1>
        </div>
        <p className="committee-subtext">
          The strength of this conference lies in the expertise and global participation of our committee members.
        </p>

        {committeeData.map((section, index) => (
          <div key={index} className="committee-section">
            <div className="committee-subheading" onClick={() => toggleSection(section.title)}>
              {section.title}
              <span className="toggle-icon">{activeSection === section.title ? '−' : '+'}</span>
            </div>

            {activeSection === section.title && (
              <>
                {Array.isArray(section.subSections) ? (
                  section.subSections.map((sub, subIdx) => (
                    <div key={subIdx} className="subcommittee-block">
                      <h4 className="subcommittee-title">{sub.title}</h4>
                      {Array.isArray(sub.members) && sub.members.length > 0 ? (
                        <div className="committee-cards">
                          {sub.members.map((name, nameIdx) => (
                            <div key={nameIdx} className="committee-card">{name}</div>
                          ))}
                        </div>
                      ) : (
                        <p className="coming-soon">Details will be updated soon.</p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="committee-cards">
                    {section.members.map((name, idx) => (
                      <div key={idx} className="committee-card">{name}</div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Committee;
