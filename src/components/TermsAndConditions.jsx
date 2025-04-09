import React from 'react';
import './TermsAndConditions.css';
import Footer from './Footer';
import Navbar from './Navbar';


const TermsAndConditions = () => {
  return (
<>
    <Navbar />
    <div className="terms-container">
      <h1>Standard Terms and Conditions of Sale</h1>
      <h2>STIS V – Fifth International Conference on the Science & Technology of Ironmaking and Steelmaking</h2>

      <section>
        <h3>1. General Provisions</h3>
        <ul>
          <li>These Standard Terms and Conditions of Sale (“T&amp;Cs”) govern all registrations, payments, and related services for STIS V, organized by the Department of Materials Engineering, Indian Institute of Science (IISc), Bengaluru, India.</li>
          <li>By completing the registration and submitting payment via the official conference website, the participant agrees to be bound by these T&amp;Cs.</li>
          <li>These terms supersede any other participant-issued conditions. Any modification must be explicitly approved in writing by the Organizing Committee.</li>
        </ul>
      </section>

      <section>
        <h3>2. Pricing & Payment Terms</h3>
        <ul>
          <li>All registration fees are to be paid in full through the official payment gateway integrated into the STIS V conference website: <a href="https://materials.iisc.ac.in/stis2025/" target="_blank" rel="noreferrer">https://materials.iisc.ac.in/stis2025/</a></li>
          <li>All fees are quoted in Indian Rupees (INR) and are exclusive of GST unless otherwise mentioned.</li>
          <li>Upon successful payment, participants will receive an automated confirmation email along with a digital receipt.</li>
          <li>Participants are responsible for any additional transaction fees, currency conversion charges, or bank processing fees incurred during payment.</li>
        </ul>
      </section>

      <section>
        <h3>3. Service Delivery & Conference Access</h3>
        <ul>
          <li>Upon confirmation of registration, participants will be granted access to the conference sessions and services corresponding to their selected category (e.g., student, academic, industry).</li>
          <li>The Organizing Committee will make all reasonable efforts to ensure a smooth and enriching conference experience. However, specific outcomes are not guaranteed.</li>
          <li>Access to workshops, presentations, meals, and conference materials is governed by the registration package selected by the participant.</li>
        </ul>
      </section>

      <section>
        <h3>4. Cancellations & Refunds</h3>
        <ul>
          <li>Refund requests must be submitted in writing to <a href="mailto:stis.mte@iisc.ac.in">stis.mte@iisc.ac.in</a> along with valid payment and registration details.</li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>Date of Cancellation Request</th>
              <th>Refund Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>On or before 15th October 2025</td>
              <td>80% of total registration fee</td>
            </tr>
            <tr>
              <td>Between 16th October and 20th November 2025</td>
              <td>60% of total registration fee</td>
            </tr>
            <tr>
              <td>After 20th November 2025</td>
              <td>No refund</td>
            </tr>
          </tbody>
        </table>
        <ul>
          <li>All refunds are calculated excluding applicable GST, which is non-refundable.</li>
          <li>Refunds will be processed to the original payment source within 30 working days from approval.</li>
          <li>In case of visa denial, a full refund (excluding taxes and 5% administrative charges) will be provided upon valid proof of visa refusal.</li>
          <li>The Organizing Committee is not responsible for additional costs such as travel, accommodation, or third-party bookings.</li>
          <li>In the event of force majeure, the committee reserves the right to reschedule, cancel, provide partial/full refund, or transfer the registration.</li>
        </ul>
      </section>

      <section>
        <h3>5. Claims & Dispute Resolution</h3>
        <ul>
          <li>Claims or disputes must be submitted to <a href="mailto:stis.mte@iisc.ac.in">stis.mte@iisc.ac.in</a> within 7 days of event conclusion.</li>
          <li>The Organizing Committee is not liable for indirect or consequential damages.</li>
          <li>These T&amp;Cs are governed by Indian law and subject to courts in Bengaluru, Karnataka.</li>
        </ul>
      </section>

      <section>
        <h3>6. Data Protection & Privacy</h3>
        <ul>
          <li>Participant information is handled per applicable Indian data protection laws.</li>
          <li>No participant data will be shared with third parties unless legally required or essential for operations.</li>
          <li>By registering, participants consent to receiving conference communications via email.</li>
        </ul>
      </section>

      <section>
        <h3>7. Amendments to Terms</h3>
        <ul>
          <li>The Organizing Committee may amend these T&amp;Cs at any time.</li>
          <li>Updates will be posted on the official website and emailed if necessary.</li>
          <li>Continued participation implies acceptance of updated terms.</li>
        </ul>
      </section>

      <section>
        <h3>8. Contact Information</h3>
        <p>For any questions regarding these Terms and Conditions, payment, or registration:</p>
        <ul>
          <li>Email: <a href="mailto:stis.mte@iisc.ac.in">stis.mte@iisc.ac.in</a></li>
          <li>Phone: +91 80 2293 3240</li>
          <li>Website: <a href="https://materials.iisc.ac.in/stis2025/" target="_blank" rel="noreferrer">https://materials.iisc.ac.in/stis2025/</a></li>
        </ul>
        <p><strong>Organized by:</strong><br/>
        Department of Materials Engineering<br/>
        Indian Institute of Science (IISc)<br/>
        Bengaluru – 560012, India</p>
      </section>
    </div>
    <br />
    <br />
    <Footer />
    </>
  );
};

export default TermsAndConditions;
