import React from "react";
import "./ConferenceRegistration.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ConferenceRegistration = () => {
  return (
    <>
      <Navbar />
      <div className="registration-container">
        <h2 className="reg-title">Conference Registration</h2>

        <section className="registration-info-box">
          <h3>Registration Information</h3>
          <p>
            Welcome to the registration portal for <strong>STIS 2025</strong>.
            Below are the detailed categories and applicable charges.
          </p>

          <h3 className="fee-title">Registration Fees</h3>
          <div className="pricing-flex-wrapper">
            {/* Indian Delegates Table */}
            <div className="pricing-table">
              <h4>For National Delegates (INR)</h4>
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Early Bird<br /><small>(Till 15th July, 2025)</small></th>
                    <th>Regular<br /><small>(16th July - 20th Nov, 2025)</small></th>
                    <th>After 20th Nov &amp; Spot Registration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Speaker / Participant</td>
                    <td>₹13,000 + ₹2,340 (18% GST) = <b>₹15,340</b></td>
                    <td>₹16,000 + ₹2,880 (18% GST) = <b>₹18,880</b></td>
                    <td>₹19,000 + ₹3,420 (18% GST) = <b>₹22,420</b></td>
                  </tr>
                  <tr>
                    <td>Accompanying Person</td>
                    <td colSpan="2">₹7,000 + ₹1,260 (18% GST) = <b>₹8,260</b></td>
                    <td>₹9,000 + ₹1,620 (18% GST) = <b>₹10,620</b></td>
                  </tr>
                  <tr>
                    <td>Student / Speaker</td>
                    <td colSpan="3">₹1,000 + ₹180 (18% GST) = <b>₹1,180</b></td>
                  </tr>
                  <tr>
                    <td>Student / Participant</td>
                    <td colSpan="3">₹4,000 + ₹720 (18% GST) = <b>₹4,720</b></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Foreign Delegates Table */}
            <div className="pricing-table">
              <h4><span className="red-asterisk">*</span> For Foreign Delegates (USD)</h4>
              <table className="styled-table foreign">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Early Bird<br /><small>(Till 15th July, 2025)</small></th>
                    <th>Regular<br /><small>(16th July - 20th Nov, 2025)</small></th>
                    <th>After 20th Nov &amp; Spot Registration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Speaker / Participant</td>
                    <td><b>$350</b></td>
                    <td><b>$400</b></td>
                    <td><b>$500</b></td>
                  </tr>
                  <tr>
                    <td>Accompanying Person</td>
                    <td colSpan="2"><b>$200</b></td>
                    <td><b>$250</b></td>
                  </tr>
                  <tr>
                    <td>Student / Speaker</td>
                    <td colSpan="3"><b>$100</b></td>
                  </tr>
                  <tr>
                    <td>Student / Participant</td>
                    <td colSpan="3"><b>$150</b></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="note">
            <strong>
              <span className="red-asterisk">*</span> Note:
            </strong> Fee includes GST(18%).
          </p>

          <p className="note">
            <strong>
              <span className="red-asterisk">*</span> Note:
            </strong> One registered author can present only one paper/poster.
          </p>
          <div className="important-section-container">
  <div className="important-section">
    <h4>Included in the Registration Fee for Speaker/Participant</h4>
    <p>
      The registration fee includes the admission to all technical sessions, lunches, conference banquet, dinner, and one copy of the conference proceedings.
    </p>
  </div>

  <div className="important-section">
    <h4>Included in the Registration Fee for Accompanying Person</h4>
    <p>
      The registration fee includes dinner, lunches, and participation in social events. Accompanying Persons must be registered by the delegate with whom they are attending and must pay the listed fee.
    </p>
  </div>
</div>


          <div className="refund-policy-box">
            <h4>Refund & Cancellation Policy</h4>
            <ul>
              <li><strong>80%</strong> refund for cancellations made <strong>on or before 15th October 2025</strong>.</li>
              <li><strong>60%</strong> refund for cancellations made  <strong>between 16th October and 20th November 2025</strong>.</li>
            </ul>
            <p><strong>Note:</strong></p>
            <ol>
              <li>No refunds will be provided for cancellations made <strong> after 20th November 2025</strong>.</li>
              <li>In case of <strong>visa denial </strong>, a <strong>full refund</strong> (excluding GST and 5% administrative charges) will be provided upon submission of valid proof of visa refusal issued by the concerned authority.</li>
            </ol>
          </div>
        </section>
      </div>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default ConferenceRegistration;
