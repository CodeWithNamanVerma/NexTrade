import React from "react";
import Awards from "../home/Awards";
import OpenAccount from "../OpenAccount";

function ProductsPage() {
  const categories = [
    {
      title: "Equity",
      icon: "📊",
      desc: "Buy and sell shares of Indian companies listed on NSE and BSE with our ultra-fast execution.",
      highlights: ["Zero brokerage on delivery", "Intraday up to 5x leverage", "Instant order execution"],
    },
    {
      title: "Futures & Options",
      icon: "🔮",
      desc: "Trade index and stock F&O with advanced tools — OI charts, PCR, IV rank, and more.",
      highlights: ["Flat ₹20/order", "Options chain with Greeks", "Strategy builder"],
    },
    {
      title: "Mutual Funds",
      icon: "🏦",
      desc: "Direct plans, zero commission. Start SIPs from ₹100 across 5000+ fund schemes.",
      highlights: ["Zero commission", "SIP from ₹100", "Tax-saving ELSS funds"],
    },
  ];

  return (
    <>
      <div style={{ paddingTop: "68px" }} />
      <section className="nt-about-hero">
        <div className="container-nt">
          <div className="nt-section-tag">Products</div>
          <h1 className="nt-section-title" style={{ fontSize: "clamp(32px,4vw,52px)", maxWidth: 640, margin: "0 auto 16px" }}>
            Everything You Need to <span style={{ color: "var(--accent-cyan)" }}>Build Wealth</span>
          </h1>
          <p className="nt-section-sub" style={{ margin: "0 auto", textAlign: "center" }}>
            From your first SIP to advanced options strategies — all on one platform.
          </p>
        </div>
      </section>

      {/* Product deep-dive */}
      <section style={{ padding: "80px 0" }}>
        <div className="container-nt">
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {categories.map((cat, i) => (
              <div
                key={i}
                className="nt-mock-card"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}
              >
                <div>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>{cat.icon}</div>
                  <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, marginBottom: 12 }}>{cat.title}</h2>
                  <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 20 }}>{cat.desc}</p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                    {cat.highlights.map((h, j) => (
                      <li key={j} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14, color: "var(--text-secondary)" }}>
                        <span style={{ color: "var(--accent-cyan)" }}>✓</span>{h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  style={{
                    height: 200,
                    borderRadius: "var(--radius-md)",
                    background: `linear-gradient(135deg, var(--accent-cyan-dim), rgba(124,92,252,0.1))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 72,
                  }}
                >
                  {cat.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Awards />
      <OpenAccount />
    </>
  );
}

export default ProductsPage;
