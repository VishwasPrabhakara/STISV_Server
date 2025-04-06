import React from "react";
import "./ChairmanMessage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ChairmanMessage = () => {
  return (
  <>
    <Navbar />
    <section className="chairman-message-wrapper">
      <div className="message-header">
        <h1>Message from the Conference Chair</h1>
        <div className="underline" />
      </div>

      <div className="message-body">
        <p>
          It is our great honour to host the Fifth International Conference on the Science & Technology
          of Ironmaking and Steelmaking (STIS – V) at the Indian Institute of Science (IISc), Bengaluru
          from December 9 -12, 2025. It is indeed a privilege for us to welcome you to this quadrennial
          event in the series, the inaugural edition of which was organized in IISc in December 2009.
        </p>

        <p>
          India is known for its ancient heritage in minerals and metals. The non-corroding Delhi Iron
          pillar (more than 1600 years old), the legendary Wootz steel from which famous Damascus swords
          were made, the ruins of ancient retorts that were used to produce thousands of tons of zinc in
          Rajasthan, the exquisitely crafted bronze icons from south India made by the "lost wax" process
          – are all testimony to the level of technological excellence achieved by the Indian
          sub-continent. Minerals and metals industry continues to be of great importance to India and
          it is going through resurgence in recent times. Impressive growth projections in the production
          of iron and steel promise huge investments in the industry.
        </p>

        <p>
          The mining, minerals and metals industry globally and particularly in India is confronted with
          new challenges of reducing its environmental and carbon footprint. Land, energy and water are
          extremely scarce resources in India. The STIS Conference series has been an excellent forum
          for the best professionals from the industry, academia and the research institutions to meet
          and deliberate on the challenges and the opportunities in the field. The members of the
          Organizing Committee are working hard to make STIS-V a professionally rewarding and socially
          enjoyable experience for all our delegates.
        </p>

        <p>
          We look forward to your participation in STIS-V 2025 and we will make every effort to ensure
          you have a pleasant and fruitful stay in Bengaluru.
        </p>

        <div className="chair-signature">
          <p>Prof. S. Subramanian</p>
          <p>Chair, Organizing Committee, STIS-V</p>
        </div>
      </div>
    </section>
    <Footer />
  </>
  );
};

export default ChairmanMessage;
