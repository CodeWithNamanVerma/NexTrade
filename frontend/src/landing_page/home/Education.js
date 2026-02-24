import React from "react";

function Education() {
  const cards = [
    {
      icon: "🎓",
      title: "NexTrade Academy",
      desc: "Free courses from basics to advanced options strategies. Learn at your own pace.",
      link: "#",
    },
    {
      icon: "📰",
      title: "Market Pulse",
      desc: "Daily curated news, stock ideas, and macro analysis from our research team.",
      link: "#",
    },
    {
      icon: "🔬",
      title: "Stock Screener",
      desc: "Filter 5000+ stocks by fundamentals, technicals, and custom criteria.",
      link: "#",
    },
  ];

  return (
    <section className="nt-features" style={{ background: "var(--bg-primary)" }}>
      <div className="container-nt">
        <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto" }}>
          <div className="nt-section-tag">Learn & Grow</div>
          <h2 className="nt-section-title">Knowledge is Your Edge</h2>
          <p className="nt-section-sub" style={{ margin: "0 auto" }}>
            We invest in your education so you can invest with confidence.
          </p>
        </div>
        <div className="nt-features-grid">
          {cards.map((c, i) => (
            <div className="nt-feature-card" key={i}>
              <div className="nt-feature-icon" style={{ background: "var(--accent-cyan-dim)", fontSize: "30px" }}>
                {c.icon}
              </div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <a
                href={c.link}
                style={{ display: "inline-block", marginTop: "16px", color: "var(--accent-cyan)", fontSize: "14px", fontWeight: 600 }}
              >
                Explore →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
