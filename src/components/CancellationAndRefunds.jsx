import React from 'react';
import './CancellationAndRefunds.css';
import Navbar from './Navbar';
import Footer from './Footer';

const CancellationAndRefunds = () => {
  return (
    <>
    <Navbar />
    <div className="cancellation-container">
      <h1>Cancellation & Refund Policy</h1>
      <h2>STIS V – Fifth International Conference on the Science & Technology of Ironmaking and Steelmaking</h2>

      <section>
        <h3>1. General Policy</h3>
        <ul>
          <li>All refund requests must be submitted in writing to <a href="mailto:stis.mte@iisc.ac.in">stis.mte@iisc.ac.in</a> with valid payment and registration details.</li>
          <li>Refunds are applicable only for registration cancellations. No refunds will be provided for travel, accommodation, or third-party expenses.</li>
          <li>Refunds will be processed to the original payment source within 30 working days from approval.</li>
          <li>All refunds are calculated excluding GST, which is non-refundable under Indian government regulations.</li>
        </ul>
      </section>

      <section>
        <h3>2. Refund Schedule</h3>
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
              <td>80% of total registration charges</td>
            </tr>
            <tr>
              <td>Between 16th October and 20th November 2025</td>
              <td>60% of total registration charges</td>
            </tr>
            <tr>
              <td>After 20th November 2025</td>
              <td><strong>No refund</strong></td>
            </tr>
          </tbody>
        </table>
        <p><strong>Note:</strong></p>
        <ul>
          <li>All refund calculations exclude applicable taxes (e.g., GST).</li>
          <li>In the event of a visa denial, a full refund (excluding taxes and 5% administrative fee) will be provided upon valid proof of visa refusal issued by the concerned authority.</li>
        </ul>
      </section>

      <section>
        <h3>3. Force Majeure</h3>
        <ul>
          <li>In case of unforeseeable circumstances such as natural disasters, pandemics, or government-imposed restrictions, the Organizing Committee reserves the right to:
            <ul>
              <li>Reschedule or cancel the conference.</li>
              <li>Provide a full or partial refund.</li>
              <li>Transfer the registration to a future edition of the conference.</li>
            </ul>
          </li>
        </ul>
      </section>

      <section>
        <h3>4. Contact for Cancellation</h3>
        <p>All cancellation and refund requests must be addressed to:</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:stis.mte@iisc.ac.in">stis.mte@iisc.ac.in</a></li>
          <li><strong>Phone:</strong> +91 80 2293 3240</li>
        </ul>
        <p><strong>Organized by:</strong><br />
          Department of Materials Engineering<br />
          Indian Institute of Science (IISc), Bengaluru – 560012, India
        </p>
      </section>
    </div>
    <br />
    <br />
    <Footer />
    </>
  );
};

export default CancellationAndRefunds;
