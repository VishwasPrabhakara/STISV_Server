import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post("https://stisv.onrender.com/submit-query", formData);
            setResponseMessage(response.data.message);
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            setResponseMessage("Failed to send message. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />
            <main className="contact-container">
                <div className="contact-wrapper">
                    {/* Left: Contact Info */}
                    <section className="contact-details-section">
                        <h1 className="contact-title">Contact & Support</h1>
                        <p className="organizer-name">
                            <strong>Organized by</strong><br />
                            Indian Institute of Science (IISc), Bengaluru, India
                        </p>

                        <div className="secretariat-info">
                            <h2>Conference Secretariat</h2>
                            <p>
                                Ms. Roopashree Gowda<br />
                                Prof. Govind S. Gupta<br />
                                Department of Materials Engineering<br />
                                Indian Institute of Science (IISc)<br />
                                Bengaluru – 560012, India
                            </p>
                            <p>
                                <strong>Email:</strong><br />
                                <a href="mailto:stis.mte@iisc.ac.in">stis.mte@iisc.ac.in</a>
                            </p>
                            <p>
                                <strong>Website:</strong><br />
                                <a href="https://materials.iisc.ac.in/stis2025/" target="_blank" rel="noopener noreferrer">
                                    https://materials.iisc.ac.in/stis2025/
                                </a>
                            </p>
                            <p>
                                <strong>Phone:</strong> +91 80 2293 3240
                            </p>
                        </div>
                    </section>

                    {/* Right: Query Form */}
                    <section className="contact-form-section">
  <h3 className="contact-title">Submit Your Query/Feedback</h3>
  <form className="query-form" onSubmit={handleSubmit}>
    <div className="floating-label-group">
      <input
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        placeholder=" "
        required
      />
      <label htmlFor="name">Full Name</label>
    </div>

    <div className="floating-label-group">
      <input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        placeholder=" "
        required
      />
      <label htmlFor="email">Email Address</label>
    </div>

    <div className="floating-label-group">
      <textarea
        name="message"
        id="message"
        rows="5"
        value={formData.message}
        onChange={handleChange}
        placeholder=" "
        required
      ></textarea>
      <label htmlFor="message">Message</label>
    </div>

    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? "Sending..." : "Submit"}
    </button>

    {responseMessage && <p className="form-response">{responseMessage}</p>}
  </form>
</section>

                </div>

                {/* Fullscreen Loader */}
                {isSubmitting && (
                    <div className="fullscreen-loader">
                        <div className="loader-circle"></div>
                        <p className="loader-text">Sending your query...</p>
                    </div>
                )}
            </main>
            <br /><br />
            <Footer />
        </>
    );
};

export default Contact;
