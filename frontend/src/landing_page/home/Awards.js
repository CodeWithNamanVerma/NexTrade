import React from "react";

function Awards() {
  const features = [
    {
      icon: "📈",
      color: "rgba(0,245,196,0.15)",
      title: "Equity & F&O Trading",
      desc: "Trade NSE & BSE stocks, futures and options with lightning-fast order execution and advanced charting tools.",
    },
    {
      icon: "🏦",
      color: "rgba(124,92,252,0.15)",
      title: "Mutual Funds",
      desc: "Invest in 5000+ direct mutual fund schemes with zero commission. SIPs starting from ₹100.",
    },
    {
      icon: "🌐",
      color: "rgba(245,166,35,0.15)",
      title: "US Stocks",
      desc: "Invest in Apple, Tesla, Google and more. Fractional shares available from $1.",
    },
    {
      icon: "💎",
      color: "rgba(0,230,118,0.15)",
      title: "Digital Gold",
      desc: "Buy 24K certified digital gold backed by physical gold stored in secure vaults.",
    },
    {
      icon: "📊",
      color: "rgba(0,245,196,0.15)",
      title: "Advanced Analytics",
      desc: "Professional charting with 100+ technical indicators, screeners, and portfolio analytics.",
    },
    {
      icon: "🛡️",
      color: "rgba(124,92,252,0.15)",
      title: "SEBI Regulated",
      desc: "Your investments are safe. We are SEBI registered, CDSL DP, and member of NSE & BSE.",
    },
  ];

  return (
    <section className="nt-features">
      <div className="container-nt">
        <div style={{ maxWidth: "560px" }}>
          <div className="nt-section-tag">Products</div>
          <h2 className="nt-section-title">Everything You Need to Trade & Invest</h2>
          <p className="nt-section-sub">
            A complete suite of investment products — all accessible from one powerful platform.
          </p>
        </div>
        <div className="nt-features-grid">
          {features.map((f, i) => (
            <div className="nt-feature-card" key={i}>
              <div className="nt-feature-icon" style={{ background: f.color }}>
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Awards;
