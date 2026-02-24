import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,245,196,0.06) 0%, transparent 70%), var(--bg-primary)",
      padding: "32px",
    }}>
      <div style={{ fontSize: 96, marginBottom: 24, opacity: 0.6 }}>🔍</div>
      <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(80px,12vw,140px)", fontWeight: 900, color: "var(--accent-cyan)", lineHeight: 1, marginBottom: 16 }}>
        404
      </h1>
      <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
        Page Not Found
      </h2>
      <p style={{ color: "var(--text-secondary)", fontSize: 16, maxWidth: 400, marginBottom: 36 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <button className="btn-primary-nt" style={{ fontSize: 16, padding: "14px 32px" }}>
          Go Back Home →
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
