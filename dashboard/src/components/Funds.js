import React from "react";

const Funds = () => {
  const segments = [
    { key: "Available Margin", val: "₹24,832.00", sub: "Cash available for trading" },
    { key: "Used Margin", val: "₹12,450.50", sub: "Blocked in open positions" },
    { key: "Total Balance", val: "₹37,282.50", sub: "Net account balance" },
    { key: "Withdrawable", val: "₹18,000.00", sub: "Available to withdraw" },
  ];

  const breakdown = [
    { key: "Opening Balance", val: "₹37,000.00" },
    { key: "Credits (P&L)", val: "+₹2,480.00" },
    { key: "Realized P&L Today", val: "+₹482.50" },
    { key: "Unrealized P&L", val: "-₹680.00" },
    { key: "Charges & Taxes", val: "-₹45.30" },
    { key: "STT", val: "-₹12.80" },
  ];

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>
      <div className="nt-page-header">
        <div>
          <h2>Funds</h2>
          <p>Margin & balance overview</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            style={{
              padding: "9px 20px",
              background: "var(--green-dim)",
              border: "1px solid rgba(0,230,118,0.3)",
              borderRadius: 7,
              color: "var(--green)",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            + Add Funds
          </button>
          <button
            style={{
              padding: "9px 20px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 7,
              color: "var(--text-secondary)",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="nt-summary-grid" style={{ marginBottom: 24 }}>
        {segments.map((s, i) => (
          <div className="nt-pnl-card" key={i}>
            <div className="nt-pnl-label">{s.key}</div>
            <div className="nt-pnl-value" style={{ fontSize: 22, color: "var(--text-primary)" }}>
              {s.val}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Breakdown table */}
      <div className="nt-funds-grid">
        <div className="nt-card">
          <div className="nt-card-title" style={{ marginBottom: 12 }}>Balance Breakdown</div>
          {breakdown.map((r, i) => (
            <div className="nt-funds-row" key={i}>
              <span className="key">{r.key}</span>
              <span className="val" style={{
                color: r.val.startsWith("+") ? "var(--green)" : r.val.startsWith("-") ? "var(--red)" : "var(--text-primary)",
              }}>
                {r.val}
              </span>
            </div>
          ))}
        </div>

        <div className="nt-card">
          <div className="nt-card-title" style={{ marginBottom: 12 }}>Segment-wise Margin</div>
          {[
            { key: "Equity Delivery (CNC)", val: "₹24,832.00" },
            { key: "Equity Intraday (MIS)", val: "₹49,664.00" },
            { key: "F&O Margin", val: "₹49,664.00" },
            { key: "Commodity", val: "₹0.00" },
            { key: "Currency", val: "₹0.00" },
          ].map((r, i) => (
            <div className="nt-funds-row" key={i}>
              <span className="key">{r.key}</span>
              <span className="val">{r.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Funds;
