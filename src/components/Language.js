import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './Language.css';

const Language = () => {
   return (
    <>
      <Navbar />
      <div className="language-page">
  <h1>Official Language</h1>
  <div className="underline" />
  <div className="language-content">
    <ul>
      <li>
        <p>
          The <span>official language</span> of the STIS-V 2025 conference is <span>English</span>. All conference proceedings, presentations, posters, and communications will be conducted in English.
        </p>
      </li>
     
    </ul>
  </div>
</div>
    <br />
    <br />
    <Footer />
    </>
  );
};

export default Language;
