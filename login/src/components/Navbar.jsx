import React from "react";

function Navbar({ email, onLogout, activeLink, onNavClick, theme, onToggleTheme }) {
  const getAvatarChar = (emailStr) => {
    if (!emailStr) return "U";
    return emailStr.charAt(0).toUpperCase();
  };

  return (
    <header className="website-navbar">
      <div className="nav-logo-group" onClick={() => onNavClick("about")}>
        <div className="nav-logo-icon"></div>
        <span className="nav-logo-text">Home</span>
      </div>

      <nav className="nav-menu-links">
        <span
          className={`nav-menu-item ${activeLink === "about" ? "active" : ""}`}
          onClick={() => onNavClick("about")}
        >
          About Us
        </span>
        <span
          className={`nav-menu-item ${activeLink === "courses" ? "active" : ""}`}
          onClick={() => onNavClick("courses")}
        >
          Courses
        </span>
        <span
          className={`nav-menu-item ${activeLink === "contact" ? "active" : ""}`}
          onClick={() => onNavClick("contact")}
        >
          Contact
        </span>
      </nav>

      <div className="nav-auth-profile">
        <button 
          className="theme-toggle-btn" 
          onClick={onToggleTheme} 
          aria-label="Toggle Theme"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === "light" ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="theme-icon moon-icon"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="theme-icon sun-icon"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          )}
        </button>

        <div className="nav-user-badge">
          <div className="nav-avatar">{getAvatarChar(email)}</div>
          <span className="nav-user-email" title={email}>
            {email}
          </span>
        </div>
        <button className="btn-nav-logout" onClick={onLogout}>
          Sign Out
        </button>
      </div>
    </header>
  );
}

export default Navbar;
