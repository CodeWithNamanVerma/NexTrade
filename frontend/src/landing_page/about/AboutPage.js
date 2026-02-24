import React from "react";
import { Link } from "react-router-dom";

function AboutPage() {
  const team = [
    { initials: "AK", name: "Arjun Kumar", role: "Co-founder & CEO" },
    { initials: "PS", name: "Priya Sharma", role: "Co-founder & CTO" },
    { initials: "RV", name: "Rahul Verma", role: "Head of Product" },
    { initials: "NM", name: "Neha Mehta", role: "VP of Engineering" },
    { initials: "SK", name: "Sanjay Kapoor", role: "Head of Risk" },
    { initials: "DG", name: "Divya Gupta", role: "Head of Design" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="nt-about-hero">
        <div className="container-nt">
          <div className="nt-section-tag">Our Story</div>
          <h1 className="nt-section-title" style={{ fontSize: "clamp(36px,5vw,56px)", maxWidth: 700, margin: "0 auto 20px" }}>
            We're Building the Future of<br />
            <span style={{ color: "var(--accent-cyan)" }}>Indian Finance</span>
          </h1>
          <p className="nt-section-sub" style={{ margin: "0 auto", maxWidth: 580, textAlign: "center" }}>
            NexTrade was founded in 2020 with a simple mission: make professional-grade
            trading tools accessible to every Indian, regardless of their experience level.
          </p>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "80px 0" }}>
        <div className="container-nt">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[
              { icon: "🎯", title: "Transparency", desc: "No hidden charges. No fine print designed to confuse you." },
              { icon: "⚡", title: "Speed", desc: "Orders execute in under 3 seconds on average across all market conditions." },
              { icon: "🛡️", title: "Security", desc: "Bank-grade 256-bit encryption. Your funds and data are always protected." },
            ].map((v, i) => (
              <div className="nt-feature-card" key={i}>
                <div className="nt-feature-icon" style={{ background: "var(--accent-cyan-dim)" }}>{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "80px 0", background: "var(--bg-secondary)" }}>
        <div className="container-nt">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="nt-section-tag">Leadership</div>
            <h2 className="nt-section-title">Meet the Team</h2>
          </div>
          <div className="nt-team-grid">
            {team.map((m, i) => (
              <div className="nt-team-card" key={i}>
                <div className="nt-team-avatar">{m.initials}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{m.name}</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="nt-cta-section">
        <div className="container-nt" style={{ position: "relative", zIndex: 1 }}>
          <h2 className="nt-section-title">Join the <span style={{ color: "var(--accent-cyan)" }}>NexTrade</span> Family</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 18, marginBottom: 32 }}>12 million traders already trust us with their investments.</p>
          <Link to="/signup"><button className="btn-primary-nt" style={{ fontSize: 16, padding: "16px 36px" }}>Open Free Account →</button></Link>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
