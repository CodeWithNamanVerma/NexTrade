import React, { useEffect, useState } from "react";
import axios from "axios";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3002/allPositions", { withCredentials: true })
      .then((r) => setPositions(r.data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const totalPnL = positions.reduce((s, p) => {
    const dayChg = parseFloat(p.day || "0") / 100;
    return s + p.price * p.qty * dayChg;
  }, 0);

  if (loading)
    return <div style={{ padding: 28, color: "var(--text-secondary)" }}>Loading positions...</div>;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>
      <div className="nt-page-header">
        <div>
          <h2>Positions</h2>
          <p>{positions.length} open position{positions.length !== 1 ? "s" : ""} today</p>
        </div>
        <div className="nt-pnl-card" style={{ padding: "10px 16px" }}>
          <div className="nt-pnl-label">Day P&L</div>
          <div className="nt-pnl-value" style={{
            fontSize: 18,
            color: totalPnL >= 0 ? "var(--green)" : "var(--red)",
          }}>
            {totalPnL >= 0 ? "+" : ""}₹{Math.abs(totalPnL).toFixed(0)}
          </div>
        </div>
      </div>

      {positions.length === 0 ? (
        <div className="nt-card" style={{ textAlign: "center", padding: "60px 24px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
          <h3 style={{ fontFamily: "'Outfit',sans-serif", marginBottom: 8 }}>No Open Positions</h3>
          <p style={{ color: "var(--text-secondary)" }}>Your intraday positions will appear here.</p>
        </div>
      ) : (
        <div className="nt-card">
          <div className="nt-table-wrap">
            <table className="nt-table">
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Avg Price</th>
                  <th>LTP</th>
                  <th>Net Chg</th>
                  <th>Day Chg</th>
                  <th>P&L</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((p, i) => {
                  const pnl = (p.price - p.avg) * p.qty;
                  const isUp = !p.isLoss;
                  return (
                    <tr key={i}>
                      <td style={{ fontWeight: 700 }}>{p.name}</td>
                      <td><span className="nt-tag nt-tag-pending">{p.product}</span></td>
                      <td>{p.qty}</td>
                      <td>₹{p.avg}</td>
                      <td style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700 }}>₹{p.price}</td>
                      <td style={{ color: isUp ? "var(--green)" : "var(--red)", fontWeight: 600 }}>{p.net}</td>
                      <td style={{ color: p.day?.startsWith("-") ? "var(--red)" : "var(--green)", fontWeight: 600 }}>{p.day}</td>
                      <td style={{ color: isUp ? "var(--green)" : "var(--red)", fontWeight: 600 }}>
                        {isUp ? "+" : ""}₹{pnl.toFixed(0)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Positions;
