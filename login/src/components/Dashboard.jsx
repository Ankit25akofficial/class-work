import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import courses from "../courses";

function Dashboard({ email, onLogout, theme, onToggleTheme }) {
  const [activeLink, setActiveLink] = useState("about");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [formError, setFormError] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Courses filter & search & sort states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSuccess("");
    setFormError("");

    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setFormError("All fields are required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(contactEmail)) {
      setFormError("Please enter a valid email address");
      return;
    }

    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setFormSuccess("Thank you! Your message has been sent successfully.");
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    }, 1200);
  };

  const handleNavClick = (sectionId) => {
    setActiveLink(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Filter and sort logic for courses
  const filteredCourses = courses
    .filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel =
        selectedLevel === "All" || course.level === selectedLevel;
      return matchesSearch && matchesLevel;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") {
        return a.price - b.price;
      }
      if (sortBy === "price-high") {
        return b.price - a.price;
      }
      if (sortBy === "duration") {
        const getHours = (str) => parseInt(str.split(" ")[0]) || 0;
        return getHours(b.duration) - getHours(a.duration);
      }
      return 0; // Default order
    });

  return (
    <div className="website-wrapper">
      {/* Modular Navbar */}
      <Navbar
        email={email}
        onLogout={onLogout}
        activeLink={activeLink}
        onNavClick={handleNavClick}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      <main>
        <section
          id="about"
          className="about-section section-pad"
          style={{ borderTop: "none" }}
        >
          <div className="section-header">
            <h2>About Our Portal</h2>
          </div>

          <div className="about-columns">
            <div className="about-details-left">
              <p></p>
              <p></p>

              <div className="about-stats">
                <div className="about-stat-box">
                  <div className="about-stat-num">heyyyy Welcomeeee </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COURSES SECTION */}
        <section id="courses" className="courses-section section-pad">
          <div className="section-header">
            <h2>Explore Our Courses</h2>
            <p>Accelerate your career with our industry-led specialized courses</p>
          </div>

          {/* Filters Bar */}
          <div className="courses-filters-bar">
            {/* Search Input */}
            <div className="search-wrapper">
              <span className="search-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input
                type="text"
                className="input-control search-input"
                placeholder="Search courses or instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Level Tabs */}
            <div className="level-tabs">
              {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
                <button
                  key={level}
                  className={`level-tab-btn ${selectedLevel === level ? "active" : ""}`}
                  onClick={() => setSelectedLevel(level)}
                >
                  {level}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="sort-wrapper">
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Sort By: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration">Duration: Longest First</option>
              </select>
            </div>
          </div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="courses-grid">
              {filteredCourses.map((course) => (
                <div className="course-card" key={course.id}>
                  <div className="course-card-image-container">
                    <img src={course.image} alt={course.title} className="course-card-img" />
                    <span className={`course-level-badge level-${course.level.toLowerCase()}`}>
                      {course.level}
                    </span>
                  </div>

                  <div className="course-card-content">
                    <h3 className="course-card-title">{course.title}</h3>

                    <div className="course-instructor-row">
                      <div className="instructor-avatar">
                        {course.instructor.charAt(0)}
                      </div>
                      <span className="course-instructor-name">{course.instructor}</span>
                    </div>

                    <div className="course-stats-row">
                      <div className="course-stat-item">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    <div className="course-card-footer">
                      <span className="course-price">${course.price}</span>
                      <button className="btn-enroll-now">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-courses-found">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <h3>No courses found</h3>
              <p>Try adjusting your search query or level filter</p>
            </div>
          )}
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="contact-section section-pad">
          <div className="section-header">
            <h2>Get In Touch</h2>
            <p>Have questions?</p>
          </div>

          <div className="contact-layout">
            <div className="contact-info-left">
              <h3>Let's collaborate </h3>
              <p></p>

              <div className="contact-details-list">
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="contact-detail-text">
                    <h5></h5>
                    <p>India</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="contact-detail-text">
                    <h5>Email Support</h5>
                    <p>support@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-card">
              {formSuccess ? (
                <div className="alert-success" style={{ margin: 0 }}></div>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  {formError && (
                    <div className="alert-danger">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      {formError}
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="contact-name">Full Name</label>
                    <input
                      type="text"
                      id="contact-name"
                      className="input-control"
                      style={{ paddingLeft: "1rem" }}
                      placeholder="Ankit Kumar"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      disabled={isSending}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email">Email Address</label>
                    <input
                      type="email"
                      id="contact-email"
                      className="input-control"
                      style={{ paddingLeft: "1rem" }}
                      placeholder="email@gmail.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      disabled={isSending}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      className="textarea-control"
                      placeholder="Write your message here..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      disabled={isSending}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: "100%" }}
                    disabled={isSending}
                  >
                    {isSending ? "Sending Message..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Modular Footer */}
      <Footer onNavClick={handleNavClick} />
    </div>
  );
}

export default Dashboard;
