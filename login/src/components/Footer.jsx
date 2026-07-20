import React from "react";

function Footer({ onNavClick }) {
  return (
    <footer className="website-footer">
      <div className="footer-top">
        <div className="footer-brand-column">
          <div className="nav-logo-group" style={{ cursor: "default" }}>
            <div className="nav-logo-icon">P</div>
            <span className="nav-logo-text" style={{ fontSize: "1.15rem" }}>
              Home
            </span>
          </div>
          <p className="footer-brand-desc"></p>
        </div>

        <div className="footer-col">
          <h4>Navigation</h4>
          <ul className="footer-links-list">
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick("about");
                }}
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#courses"
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick("courses");
                }}
              >
                Courses
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick("contact");
                }}
              >
                Get in Touch
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul className="footer-links-list">
            <li>
              <a href="#privacy" onClick={(e) => e.preventDefault()}>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#terms" onClick={(e) => e.preventDefault()}>
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-status">
          <span className="status-dot"></span>
          All Systems Operational
        </div>

        <span>
          &copy; {new Date().getFullYear()} PortalAdmin Inc. All rights
          reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
