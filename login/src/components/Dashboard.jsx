import React, { useState, useEffect } from "react";

function Dashboard({ email, onLogout }) {
  const [seconds, setSeconds] = useState(0);

  // Active session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const pad = (num) => String(num).padStart(2, "0");
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  const getAvatarChar = (emailStr) => {
    if (!emailStr) return "U";
    return emailStr.charAt(0).toUpperCase();
  };

  return (
    <div className="glass-card dashboard-card">
      <div className="dashboard-header">
        <div className="dashboard-title-area">
          <h2>Dashboard</h2>
          <p>Welcome back </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div className="user-badge">
            <div className="user-avatar">{getAvatarChar(email)}</div>
            <span className="user-email" title={email}>
              {email}
            </span>
          </div>

          <button className="btn-logout" onClick={onLogout}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Stats Widgets */}
      <div className="stats-grid">
        <div className="stat-widget">
          <div className="stat-header">
            <span>Active Session</span>
            <span className="stat-icon">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12,6 12,12 16,14"></polyline>
              </svg>
            </span>
          </div>
          <div
            className="stat-value"
            style={{ fontFamily: "Fira Code, monospace", fontSize: "1.6rem" }}
          >
            {formatTime(seconds)}
          </div>
          <div className="stat-footer">
            <span
              style={{
                display: "inline-block",
                width: "6px",
                height: "6px",
                backgroundColor: "var(--accent-green)",
                borderRadius: "50%",
                marginRight: "4px",
                animation: "pulse 1.5s infinite",
              }}
            ></span>
            Realtime session active
          </div>
        </div>

        <div className="stat-widget">
          <div className="stat-header">
            <span>Security Status </span>
            <span
              className="stat-icon"
              style={{ color: "var(--accent-green)" }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </span>
          </div>
          <div className="stat-value" style={{ color: "var(--accent-green)" }}>
            Protected
          </div>
          <div className="stat-footer">SSL & Sandbox secure</div>
        </div>

        <div className="stat-widget">
          <div className="stat-header">
            <span>System Load</span>
            <span className="stat-icon" style={{ color: "var(--accent-blue)" }}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </span>
          </div>
          <div className="stat-value">2.4%</div>
          <div className="stat-footer">Optimized performance</div>
        </div>
      </div>

      {/* Activities Panel */}
      <div className="panel-section">
        <h3 className="panel-title">Recent Activity Log</h3>

        <div className="activity-list">
          <div className="activity-item success">
            <div className="activity-info">
              <span className="activity-title">
                User authenticated successfully
              </span>
              <span className="activity-time">Logged in as {email}</span>
            </div>
            <span className="activity-badge success">Success</span>
          </div>

          <div className="activity-item">
            <div className="activity-info">
              <span className="activity-title">API Connection established</span>
              <span className="activity-time">
                Connected to secure sandbox server
              </span>
            </div>
            <span className="activity-badge">Active</span>
          </div>

          <div className="activity-item">
            <div className="activity-info">
              <span className="activity-title">
                Loaded dashboard workspace layout
              </span>
              <span className="activity-time">
                CSS glassmorphism stylesheet applied
              </span>
            </div>
            <span className="activity-badge">Ready</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 0.3; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0.3; transform: scale(0.9); }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
