import React, { useState, useEffect } from "react";

const indices = [
  { name: "NIFTY 50", val: "22,513.70", chg: "+187.20", pct: "+0.84%", up: true },
  { name: "SENSEX", val: "74,119.39", chg: "+573.45", pct: "+0.78%", up: true },
  { name: "BANK NIFTY", val: "47,892.10", chg: "-71.40", pct: "-0.15%", up: false },
  { name: "MIDCAP 100", val: "51,234.80", chg: "+412.50", pct: "+0.81%", up: true },
];

const TopBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isMarketOpen = () => {
    const h = time.getHours(), m = time.getMinutes();
    const mins = h * 60 + m;
    return mins >= 555 && mins <= 930; // 9:15 – 15:30
  };

  return (
    <div className="nt-topbar">
      {indices.map((idx, i) => (
        <div className="nt-index-chip" key={i}>
          <span className="idx-name">{idx.name}</span>
          <span className="idx-val">{idx.val}</span>
          <span className={`idx-chg ${idx.up ? "up" : "down"}`}>
            {idx.chg} ({idx.pct})
          </span>
        </div>
      ))}

      <div className="nt-topbar-right">
        {/* Market status */}
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "4px 12px",
          background: isMarketOpen() ? "rgba(0,230,118,0.1)" : "rgba(255,82,82,0.1)",
          border: `1px solid ${isMarketOpen() ? "rgba(0,230,118,0.3)" : "rgba(255,82,82,0.3)"}`,
          borderRadius: 100,
          fontSize: 11, fontWeight: 700,
          color: isMarketOpen() ? "var(--green)" : "var(--red)",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: isMarketOpen() ? "var(--green)" : "var(--red)",
          }} />
          {isMarketOpen() ? "Market Open" : "Market Closed"}
        </div>

        {/* Clock */}
        <div className="nt-topbar-time">
          {time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </div>

        {/* Avatar */}
        <div className="nt-avatar" style={{ cursor: "pointer" }}>NT</div>
      </div>
    </div>
  );
};

export default TopBar;
