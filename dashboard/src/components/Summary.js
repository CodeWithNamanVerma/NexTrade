import React, { useEffect, useState } from "react";
import axios from "axios";

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3002/allHoldings", { withCredentials: true }),
      axios.get("http://localhost:3002/allPositions", { withCredentials: true }),
    ])
      .then(([h, p]) => {
        setHoldings(h.data);
        setPositions(p.data);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  // Calculations
  const totalInvested = holdings.reduce((s, h) => s + h.avg * h.qty, 0);
  const totalCurrent = holdings.reduce((s, h) => s + h.price * h.qty, 0);
  const totalPnL = totalCurrent - totalInvested;
  const totalPnLPct = totalInvested > 0 ? ((totalPnL / totalInvested) * 100).toFixed(2) : "0.00";

  const dayPnL = holdings.reduce((s, h) => {
    const dayChg = parseFloat(h.day || "0") / 100;
    return s + h.price * h.qty * dayChg;
  }, 0);

  const cards = [
    {
      label: "Total Invested",
      value: `₹${totalInvested.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
      sub: `${holdings.length} stocks`,
      up: null,
    },
    {
      label: "Current Value",
      value: `₹${totalCurrent.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
      sub: "",
      up: totalCurrent >= totalInvested,
    },
    {
      label: "Total P&L",
      value: `${totalPnL >= 0 ? "+" : ""}₹${Math.abs(totalPnL).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
      sub: `${totalPnL >= 0 ? "+" : ""}${totalPnLPct}%`,
      up: totalPnL >= 0,
    },
    {
      label: "Day's P&L",
      value: `${dayPnL >= 0 ? "+" : ""}₹${Math.abs(dayPnL).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
      sub: "Today",
      up: dayPnL >= 0,
    },
  ];

  if (loading)
    return (
      <div style={{ padding: 28, color: "var(--text-secondary)" }}>Loading portfolio...</div>
    );

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px" }}>
      <div className="nt-page-header">
        <div>
          <h2>Dashboard</h2>
          <p>Portfolio overview & summary</p>
        </div>
        <div style={{
          padding: "6px 14px",
          background: "var(--accent-dim)",
          border: "1px solid rgba(0,245,196,0.3)",
          borderRadius: 100,
          fontSize: 12, fontWeight: 700,
          color: "var(--accent)",
        }}>
          NSE · Live
        </div>
      </div>

      {/* P&L Cards */}
      <div className="nt-summary-grid">
        {cards.map((c, i) => (
          <div className="nt-pnl-card" key={i}>
            <div className="nt-pnl-label">{c.label}</div>
            <div
              className="nt-pnl-value"
              style={{ color: c.up === null ? "var(--text-primary)" : c.up ? "var(--green)" : "var(--red)" }}
            >
              {c.value}
            </div>
            {c.sub && (
              <div className={`nt-pnl-sub ${c.up === null ? "" : c.up ? "nt-pnl-up" : "nt-pnl-down"}`}>
                {c.sub}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Holdings mini table */}
      <div className="nt-card">
        <div className="nt-card-title" style={{ marginBottom: 14 }}>Holdings</div>
        <div className="nt-table-wrap">
          <table className="nt-table">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Qty</th>
                <th>Avg Price</th>
                <th>LTP</th>
                <th>Net P&L</th>
                <th>Day Chg</th>
              </tr>
            </thead>
            <tbody>
              {holdings.slice(0, 5).map((h, i) => {
                const pnl = (h.price - h.avg) * h.qty;
                const isUp = pnl >= 0;
                return (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{h.name}</td>
                    <td>{h.qty}</td>
                    <td>₹{h.avg.toLocaleString()}</td>
                    <td style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700 }}>₹{h.price.toLocaleString()}</td>
                    <td style={{ color: isUp ? "var(--green)" : "var(--red)", fontWeight: 600 }}>
                      {isUp ? "+" : ""}₹{pnl.toFixed(0)} ({h.net})
                    </td>
                    <td style={{ color: h.day?.startsWith("-") ? "var(--red)" : "var(--green)", fontWeight: 600 }}>
                      {h.day}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Positions mini */}
      {positions.length > 0 && (
        <div className="nt-card" style={{ marginTop: 16 }}>
          <div className="nt-card-title" style={{ marginBottom: 14 }}>Open Positions</div>
          <div className="nt-table-wrap">
            <table className="nt-table">
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Avg</th>
                  <th>LTP</th>
                  <th>Day Chg</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((p, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{p.name}</td>
                    <td><span className="nt-tag nt-tag-pending">{p.product}</span></td>
                    <td>{p.qty}</td>
                    <td>₹{p.avg}</td>
                    <td style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700 }}>₹{p.price}</td>
                    <td style={{ color: p.isLoss ? "var(--red)" : "var(--green)", fontWeight: 600 }}>{p.day}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
