import React from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
  return (
    <section className="nt-cta-section">
      <div className="container-nt" style={{ position: "relative", zIndex: 1 }}>
        <h2 className="nt-section-title">
          Ready to Start <span style={{ color: "var(--accent-cyan)" }}>Trading?</span>
        </h2>
        <p>
          Open your free account in 10 minutes. No minimum balance required.
        </p>
        <div className="nt-cta-btns">
          <Link to="/signup">
            <button className="btn-primary-nt" style={{ fontSize: "16px", padding: "16px 36px" }}>
              Open Free Account →
            </button>
          </Link>
          <Link to="/product">
            <button className="btn-ghost-nt" style={{ fontSize: "16px", padding: "16px 36px" }}>
              Explore Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default OpenAccount;
