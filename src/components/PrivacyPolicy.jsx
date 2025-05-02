import React from "react";
import "./PrivacyPolicy.css"; // Optional: link a CSS file for custom styles
import Navbar from "./Navbar";
import Footer from "./Footer";

const PrivacyPolicy = () => {
  return (
    <>
        <Navbar />
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>
      <p><strong>STIS V – Fifth International Conference on the Science & Technology of Ironmaking and Steelmaking</strong></p>
      <p><em>Last updated: [Insert Date]</em></p>

      <h2>1. Introduction</h2>
      <p>
        This Privacy Policy outlines how we collect, use, store, and protect your personal information when you interact with the STIS V conference website and services. By using our website or submitting your data, you agree to the practices described here.
      </p>

      <h2>2. Information We Collect</h2>
      <ul>
        <li>Name, email address, phone number, and institutional affiliation</li>
        <li>Designation, nationality, and address</li>
        <li>Abstract submissions, dietary preferences, registration category</li>
        <li>Payment information (via secure third-party gateways)</li>
        <li>Website usage data (cookies, IP address, browser type)</li>
      </ul>

      <h2>3. Purpose of Data Collection</h2>
      <p>Your data is used for:</p>
      <ul>
        <li>Managing registration, abstracts, and communication</li>
        <li>Issuing confirmations and receipts</li>
        <li>Creating badges, certificates, and event materials</li>
        <li>Legal and tax compliance</li>
        <li>Website improvements</li>
      </ul>

      <h2>4. Data Sharing & Disclosure</h2>
      <ul>
        <li>We do <strong>not</strong> sell your data.</li>
        <li>Shared only with trusted vendors for operational purposes.</li>
        <li>Disclosed if legally required.</li>
      </ul>

      <h2>5. Data Security</h2>
      <p>We use reasonable safeguards to protect your data from unauthorized access or misuse.</p>

      <h2>6. Cookies & Analytics</h2>
      <p>Cookies and analytics tools may be used to enhance your experience. You may disable cookies in browser settings.</p>

      <h2>7. Your Rights</h2>
      <p>You may have the right to:</p>
      <ul>
        <li>Access, correct, or delete your data</li>
        <li>Withdraw consent or object to processing</li>
        <li>Request data portability</li>
      </ul>
      <p>To exercise rights, contact: <strong>stis.mte@iisc.ac.in</strong></p>

      <h2>8. Retention</h2>
      <p>Your data is kept only as long as needed for the purposes outlined or as required by law.</p>

      <h2>9. Third-Party Links</h2>
      <p>We are not responsible for privacy practices of external websites linked from our site.</p>

      <h2>10. Policy Updates</h2>
      <p>This policy may be updated. Changes will be posted with a revised date.</p>

      <h2>Contact</h2>
      <p>
        Email: <strong>stis.mte@iisc.ac.in</strong><br />
        Phone: <strong>+91 80 2293 3240</strong><br />
        Organizer: Dept. of Materials Engineering, IISc Bengaluru – 560012, India
      </p>
    </div>
    <br />
    <br />
    <Footer/>
    </>
  );
};

export default PrivacyPolicy;
