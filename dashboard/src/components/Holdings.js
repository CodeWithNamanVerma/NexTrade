import React, { useEffect, useState } from "react";
import axios from "axios";

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3002/allHoldings", { withCredentials: true })
      .then((r) => setHoldings(r.data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const handleSort = (key) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const sorted = [...holdings].sort((a, b) => {
    let av = a[sortKey], bv = b[sortKey];
    if (typeof av === "string") av = av.toLowerCase();
    if (typeof bv === "string") bv = bv.toLowerCase();
    return sortAsc ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
  });

  const totalInvested = holdings.reduce((s, h) => s + h.avg * h.qty, 0);
  const totalCurrent = holdings.reduce((s, h) => s + h.price * h.qty, 0);
  const totalPnL = totalCurrent - totalInvested;

  const SortIcon = ({ k }) => (
    <span style={{ marginLeft: 4, opacity: sortKey === k ? 1 : 0.3 }}>
      {sortKey === k ? (sortAsc ? "▲" : "▼") : "⇅"}
    </span>
  );

  if (loading)
    return <div style={{ padding: 28, color: "var(--text-secondary)" }}>Loading holdings...</div>;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>
      <div className="nt-page-header">
        <div>
          <h2>Holdings</h2>
          <p>{holdings.length} stocks · Long-term portfolio</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <div className="nt-pnl-card" style={{ padding: "10px 16px", minWidth: 140 }}>
            <div className="nt-pnl-label">Invested</div>
            <div className="nt-pnl-value" style={{ fontSize: 18, color: "var(--text-primary)" }}>
              ₹{totalInvested.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </div>
          </div>
          <div className="nt-pnl-card" style={{ padding: "10px 16px", minWidth: 140 }}>
            <div className="nt-pnl-label">Total P&L</div>
            <div className="nt-pnl-value" style={{ fontSize: 18, color: totalPnL >= 0 ? "var(--green)" : "var(--red)" }}>
              {totalPnL >= 0 ? "+" : ""}₹{Math.abs(totalPnL).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </div>
          </div>
        </div>
      </div>

      <div className="nt-card">
        <div className="nt-table-wrap">
          <table className="nt-table">
            <thead>
              <tr>
                {[["name", "Stock"], ["qty", "Qty"], ["avg", "Avg Price"], ["price", "LTP"], ["net", "Net Rtn"], ["day", "Day Chg"]].map(([k, label]) => (
                  <th key={k} onClick={() => handleSort(k)} style={{ cursor: "pointer", userSelect: "none" }}>
                    {label}<SortIcon k={k} />
                  </th>
                ))}
                <th>P&L</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((h, i) => {
                const pnl = (h.price - h.avg) * h.qty;
                const isUp = pnl >= 0;
                const barW = Math.min(Math.abs(pnl / 100), 60);
                return (
                  <tr key={i}>
                    <td style={{ fontWeight: 700, display: "flex", flexDirection: "column", gap: 2 }}>
                      <span>{h.name}</span>
                      <span style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 400 }}>NSE · EQ</span>
                    </td>
                    <td>{h.qty}</td>
                    <td>₹{h.avg.toLocaleString()}</td>
                    <td style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700 }}>₹{h.price.toLocaleString()}</td>
                    <td style={{
                      color: h.net?.startsWith("+") || h.net?.startsWith("-") ?
                        (h.net.startsWith("+") ? "var(--green)" : "var(--red)") : "var(--text-primary)",
                      fontWeight: 600
                    }}>
                      {h.net}
                    </td>
                    <td style={{ color: h.day?.startsWith("-") ? "var(--red)" : "var(--green)", fontWeight: 600 }}>
                      {h.day}
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{
                          height: 4, width: `${barW}px`, minWidth: 4, maxWidth: 60,
                          background: isUp ? "var(--green)" : "var(--red)",
                          borderRadius: 4, opacity: 0.7,
                        }} />
                        <span style={{ color: isUp ? "var(--green)" : "var(--red)", fontWeight: 600, fontSize: 13 }}>
                          {isUp ? "+" : ""}₹{pnl.toFixed(0)}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Holdings;
