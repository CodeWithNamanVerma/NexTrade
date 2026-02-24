import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="nt-footer">
      <div className="container-nt">
        <div className="nt-footer-grid">
          <div className="nt-footer-brand">
            <Link to="/" className="nt-logo" style={{ display: "inline-flex", marginBottom: "12px" }}>
              <div className="nt-logo-icon">⚡</div>
              Nex<span>Trade</span>
            </Link>
            <p>
              India's next-generation trading platform. Built for speed,
              designed for clarity.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              {["𝕏", "in", "▶"].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: 36, height: 36,
                    background: "var(--bg-glass)",
                    border: "1px solid var(--border-glass)",
                    borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, color: "var(--text-secondary)",
                    transition: "var(--transition)",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent-cyan)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-glass)"}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="nt-footer-col">
            <h4>Platform</h4>
            <ul>
              <li><Link to="/product">Products</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><a href="#">API Docs</a></li>
              <li><a href="#">Mobile App</a></li>
            </ul>
          </div>

          <div className="nt-footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
              <li><Link to="/support">Support</Link></li>
            </ul>
          </div>

          <div className="nt-footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Risk Disclosure</a></li>
              <li><a href="#">Grievance Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="nt-footer-bottom">
          <span>© 2025 NexTrade Financial Technologies Pvt. Ltd. · SEBI Reg: INZ000012345</span>
          <span>NSE: 90287 · BSE: 6738 · CDSL: IN-DP-431-2019</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
