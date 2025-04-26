import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fullName = sessionStorage.getItem("fullName");
    setUserName(fullName || null);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setUserName(null);
    navigate("/");
  };

  const handleNavClick = (path) => {
    setIsMobileOpen(false);
    navigate(path);
    window.scrollTo(0, 0);
  };

  const renderDropdown = (label, items) => (
    <div className="navbar-dropdown">
      <span className="dropdown-toggle">{label}</span>
      <div className="dropdown-menu">
        {items.map((item, idx) => (
          <NavLink key={idx} to={item.to} onClick={() => handleNavClick(item.to)}>
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );

  return (
    <header className="navbar">
      <div className="navbar-top">
        <div className="navbar-brand" onClick={() => handleNavClick("/")}>
          <img
            src="https://iisc.ac.in/wp-content/themes/iisc/images/favicon/apple-icon-57x57.png"
            alt="STIS-V"
            className="brand-icon"
          />
          <span>STIS-V 2025</span>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="navbar-auth">
          {userName ? (
            <div className="navbar-user">
              <span className="user-badge">
                {userName.split(" ").map(w => w[0]).join("").toUpperCase()}
              </span>
              <a className="logout-btn" onClick={handleLogout}>Logout</a>
            </div>
          ) : (
            <NavLink to="/login-signup" onClick={() => handleNavClick("/login-signup")}>
              Login / Signup
            </NavLink>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="navbar-toggle" onClick={toggleMobileMenu}>
          ☰
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className={`navbar-menu ${isMobileOpen ? "active" : ""}`}>
        <NavLink to="/" end onClick={() => handleNavClick("/")}>Home</NavLink>

        {renderDropdown("About", [
          { to: "/about", label: "About the Conference" },
          { to: "/message-to-chairman", label: "Chairman's Message" },
          { to: "/official-language", label: "Official Language" },
          { to: "/announcements", label: "Announcements" },
          { to: "/sponsors", label: "Sponsors" },
          { to: "/mediapartners", label: "Media Partner" }
        ])}

      <NavLink to="/distinguished-speaker" end onClick={() => handleNavClick("/distinguished-speaker")}>Speakers</NavLink>

        {renderDropdown("Programme", [
          { to: "/conference-themes", label: "Themes & Topics" },
          { to: "/conference-schedule", label: "Schedule" },
          { to: "/conference-proceedings", label: "Conference Proceedings" },
          { to: "/programme", label: "Important Dates" },
         
        ])}

        {renderDropdown("Abstract", [
          { to: "/abstract-submission", label: "Submit Abstract" },
          { to: "/abstract-submission-status", label: "Submission Status" }
        ])}

        <NavLink to="/conference-registration" onClick={() => handleNavClick("/conference-registration")}>
          Registration
        </NavLink>

        <NavLink to="/sponsorship-opportunities" onClick={() => handleNavClick("/sponsorship-opportunities")}>
          Sponsorship Opportunities
        </NavLink>

        <NavLink to="/committee" onClick={() => handleNavClick("/committee")}>
          Committee
        </NavLink>

        <NavLink to="/contact" onClick={() => handleNavClick("/contact")}>
          Contact Us
        </NavLink>

        {renderDropdown("Venue", [
          { to: "/venue", label: "Conference Venue" },
          { to: "/reach-iisc", label: "Reach IISc" },
          { to: "/accomodation", label: "Accommodation" }
        ])}

        {renderDropdown("Information", [
          { to: "/about-bengaluru", label: "About Bengaluru" },
          { to: "/weather", label: "Weather" },
          { to: "/travel-information", label: "Travel Information" },
          { to: "/tours-and-social-events", label: "Tours & Social Events" }
        ])}

        {/* Mobile Auth Buttons */}
        {isMobileOpen && (
          <div className="navbar-auth-mobile">
            {userName ? (
              <div className="navbar-user">
                <span className="user-badge">
                  {userName.split(" ").map(w => w[0]).join("").toUpperCase()}
                </span>
                <a className="logout-btn" onClick={handleLogout}>Logout</a>
              </div>
            ) : (
              <NavLink to="/login-signup" onClick={() => handleNavClick("/login-signup")}>
                Login / Signup
              </NavLink>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
