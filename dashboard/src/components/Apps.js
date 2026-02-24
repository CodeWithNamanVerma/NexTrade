import React from "react";

const apps = [
  { icon: "📊", name: "SenseiBull", desc: "Options trading platform with visual strategies.", color: "rgba(0,245,196,0.1)" },
  { icon: "🔎", name: "Streak", desc: "Algo trading, no code. Create and backtest strategies.", color: "rgba(124,92,252,0.1)" },
  { icon: "📰", name: "Smallcase", desc: "Thematic stock baskets curated by experts.", color: "rgba(245,166,35,0.1)" },
  { icon: "💡", name: "Tickertape", desc: "Stock screener & portfolio analytics tool.", color: "rgba(0,230,118,0.1)" },
  { icon: "📱", name: "NexMobile", desc: "Our mobile app — trading at your fingertips.", color: "rgba(0,245,196,0.1)" },
  { icon: "📚", name: "NexAcademy", desc: "Free trading education from basics to advanced.", color: "rgba(124,92,252,0.1)" },
];

const Apps = () => (
  <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>
    <div className="nt-page-header">
      <div>
        <h2>Apps & Tools</h2>
        <p>Connect third-party tools to your NexTrade account</p>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
      {apps.map((app, i) => (
        <div
          key={i}
          className="nt-card"
          style={{
            cursor: "pointer",
            transition: "var(--transition)",
            borderTop: `3px solid transparent`,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderTopColor = "var(--accent)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderTopColor = "transparent"; e.currentTarget.style.transform = "none"; }}
        >
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: app.color,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 26, marginBottom: 16,
          }}>
            {app.icon}
          </div>
          <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 8 }}>
            {app.name}
          </h3>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 16 }}>
            {app.desc}
          </p>
          <button style={{
            padding: "7px 16px",
            background: "var(--accent-dim)",
            border: "1px solid rgba(0,245,196,0.3)",
            borderRadius: 7,
            color: "var(--accent)",
            fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}>
            Connect →
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default Apps;
