import React, { useState } from "react";
import axios from "axios";

const BuyActionWindow = ({ uid, initialMode = "BUY", onClose }) => {
  const [mode, setMode] = useState(initialMode); // "BUY" | "SELL"
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState("");
  const [orderType, setOrderType] = useState("MARKET"); // MARKET | LIMIT | SL
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const estimated = price ? (qty * parseFloat(price)).toFixed(2) : "—";

  const handleSubmit = async () => {
    setLoading(true);
    setMsg("");
    try {
      await axios.post(
        "http://localhost:3002/newOrder",
        { name: uid, qty: Number(qty), price: Number(price) || 0, mode },
        { withCredentials: true }
      );
      setMsg(`✓ ${mode} order placed for ${uid}!`);
      setTimeout(onClose, 1500);
    } catch (err) {
      setMsg(err.response?.data?.error || "Order failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="nt-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="nt-modal">
        {/* Tab header */}
        <div className="nt-modal-tabs">
          <button
            className={`nt-modal-tab ${mode === "BUY" ? "buy-active" : ""}`}
            onClick={() => setMode("BUY")}
          >
            ↑ BUY
          </button>
          <button
            className={`nt-modal-tab ${mode === "SELL" ? "sell-active" : ""}`}
            onClick={() => setMode("SELL")}
          >
            ↓ SELL
          </button>
          <button
            className="nt-modal-close"
            onClick={onClose}
            style={{ marginLeft: "auto", marginRight: 10 }}
          >
            ✕
          </button>
        </div>

        <div className="nt-modal-body">
          {/* Stock info */}
          <div className="nt-modal-stock">
            <h3>{uid}</h3>
            <p>NSE · Equity · Normal</p>
          </div>

          {/* Order type */}
          <div className="nt-modal-type-row">
            {["MARKET", "LIMIT", "SL"].map((t) => (
              <button
                key={t}
                className={`nt-modal-type-btn ${orderType === t ? "active" : ""}`}
                onClick={() => setOrderType(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Qty + Price */}
          <div className="nt-modal-row">
            <div className="nt-modal-field">
              <label>Qty</label>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </div>
            <div className="nt-modal-field">
              <label>Price (₹)</label>
              <input
                type="number"
                placeholder={orderType === "MARKET" ? "Market" : "0.00"}
                value={price}
                disabled={orderType === "MARKET"}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Product type */}
          <div className="nt-modal-row">
            <div className="nt-modal-field">
              <label>Product</label>
              <select defaultValue="CNC">
                <option value="CNC">CNC (Delivery)</option>
                <option value="MIS">MIS (Intraday)</option>
                <option value="NRML">NRML (F&O)</option>
              </select>
            </div>
            <div className="nt-modal-field">
              <label>Validity</label>
              <select defaultValue="DAY">
                <option value="DAY">Day</option>
                <option value="IOC">IOC</option>
              </select>
            </div>
          </div>

          {/* Feedback */}
          {msg && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 7,
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 4,
                background: msg.startsWith("✓") ? "var(--green-dim)" : "var(--red-dim)",
                color: msg.startsWith("✓") ? "var(--green)" : "var(--red)",
              }}
            >
              {msg}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="nt-modal-footer">
          <div className="nt-modal-total">
            <span>Est. Total</span>
            {estimated === "—" ? "Market Price" : `₹${estimated}`}
          </div>
          <button
            className={mode === "BUY" ? "nt-modal-submit-buy" : "nt-modal-submit-sell"}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Placing..." : `Place ${mode}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
