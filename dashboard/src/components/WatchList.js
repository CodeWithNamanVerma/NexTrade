import React, { useState, useContext } from "react";
import { watchlist } from "../data/data";
import GeneralContext from "./GeneralContext";

const WatchList = () => {
  const [search, setSearch] = useState("");

  const filtered = watchlist.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="nt-watchlist">
      <div className="nt-watchlist-header">
        <h4>Watchlist</h4>
        <div className="nt-search">
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>🔍</span>
          <input
            type="text"
            placeholder="Search stocks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "right" }}>
          {watchlist.length} / 50
        </div>
      </div>

      <ul className="nt-watchlist-list">
        {filtered.map((stock, i) => (
          <WatchListItem stock={stock} key={i} />
        ))}
      </ul>
    </div>
  );
};

const WatchListItem = ({ stock }) => {
  const [hover, setHover] = useState(false);
  const ctx = useContext(GeneralContext);

  return (
    <li
      className="nt-wl-item"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div>
        <div className="nt-wl-name">{stock.name}</div>
        <div className="nt-wl-exch">NSE · EQ</div>
      </div>
      {!hover ? (
        <div className="nt-wl-right">
          <div className="nt-wl-price">₹{stock.price.toLocaleString()}</div>
          <div className={`nt-wl-chg ${stock.isDown ? "nt-wl-down" : "nt-wl-up"}`}>
            {stock.isDown ? "▼" : "▲"} {stock.percent}
          </div>
        </div>
      ) : (
        <div className="nt-wl-actions">
          <button className="nt-btn-buy" onClick={() => ctx.openBuyWindow(stock.name)}>B</button>
          <button className="nt-btn-sell" onClick={() => ctx.openSellWindow(stock.name)}>S</button>
        </div>
      )}
    </li>
  );
};

export default WatchList;
