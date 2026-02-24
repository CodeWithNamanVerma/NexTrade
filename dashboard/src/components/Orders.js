import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL"); // ALL | BUY | SELL

  useEffect(() => {
    axios.get("http://localhost:3002/allOrders", { withCredentials: true })
      .then((r) => setOrders(r.data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "ALL"
    ? orders
    : orders.filter((o) => o.mode?.toUpperCase() === filter);

  if (loading)
    return <div style={{ padding: 28, color: "var(--text-secondary)" }}>Loading orders...</div>;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>
      <div className="nt-page-header">
        <div>
          <h2>Orders</h2>
          <p>{orders.length} order{orders.length !== 1 ? "s" : ""} placed</p>
        </div>
        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 8 }}>
          {["ALL", "BUY", "SELL"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "6px 16px",
                borderRadius: 7,
                border: `1px solid ${filter === f ? "var(--accent)" : "var(--border)"}`,
                background: filter === f ? "var(--accent-dim)" : "var(--bg-card)",
                color: filter === f ? "var(--accent)" : "var(--text-secondary)",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="nt-card" style={{ textAlign: "center", padding: "60px 24px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
          <h3 style={{ fontFamily: "'Outfit',sans-serif", marginBottom: 8 }}>No Orders Yet</h3>
          <p style={{ color: "var(--text-secondary)" }}>
            Orders you place will appear here. Use the Buy/Sell buttons in the watchlist.
          </p>
        </div>
      ) : (
        <div className="nt-card">
          <div className="nt-table-wrap">
            <table className="nt-table">
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Type</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o, i) => {
                  const isBuy = o.mode?.toUpperCase() === "BUY";
                  return (
                    <tr key={i}>
                      <td style={{ fontWeight: 700 }}>{o.name}</td>
                      <td>
                        <span className={`nt-tag ${isBuy ? "nt-tag-buy" : "nt-tag-sell"}`}>
                          {o.mode?.toUpperCase() || "BUY"}
                        </span>
                      </td>
                      <td>{o.qty}</td>
                      <td style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700 }}>
                        {o.price > 0 ? `₹${o.price}` : "Market"}
                      </td>
                      <td>
                        <span className="nt-tag nt-tag-executed">Executed</span>
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

export default Orders;
