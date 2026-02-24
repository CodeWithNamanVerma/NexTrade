import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  const bars = [30, 50, 40, 70, 55, 80, 65, 90, 75, 85];

  return (
    <>
      {/* Ticker bar */}
      <div className="nt-ticker">
        <div className="nt-ticker-inner">
          {[
            { name: "NIFTY 50", val: "22,513.70", chg: "+0.83%", up: true },
            { name: "SENSEX", val: "74,119.39", chg: "+0.78%", up: true },
            { name: "BANK NIFTY", val: "47,892.10", chg: "-0.15%", up: false },
            { name: "IT INDEX", val: "35,204.55", chg: "+1.24%", up: true },
            { name: "RELIANCE", val: "₹2,874.00", chg: "+1.05%", up: true },
            { name: "TCS", val: "₹3,812.30", chg: "-0.42%", up: false },
            { name: "HDFC BANK", val: "₹1,532.15", chg: "+0.67%", up: true },
            { name: "INFY", val: "₹1,741.80", chg: "-0.89%", up: false },
            /* repeat once for seamless loop */
            { name: "NIFTY 50", val: "22,513.70", chg: "+0.83%", up: true },
            { name: "SENSEX", val: "74,119.39", chg: "+0.78%", up: true },
            { name: "BANK NIFTY", val: "47,892.10", chg: "-0.15%", up: false },
            { name: "IT INDEX", val: "35,204.55", chg: "+1.24%", up: true },
            { name: "RELIANCE", val: "₹2,874.00", chg: "+1.05%", up: true },
            { name: "TCS", val: "₹3,812.30", chg: "-0.42%", up: false },
            { name: "HDFC BANK", val: "₹1,532.15", chg: "+0.67%", up: true },
            { name: "INFY", val: "₹1,741.80", chg: "-0.89%", up: false },
          ].map((t, i) => (
            <div className="nt-ticker-item" key={i}>
              <span className="name">{t.name}</span>
              <span className="val">{t.val}</span>
              <span className={t.up ? "up" : "down"}>{t.chg}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="nt-hero">
        <div className="nt-hero-bg" />
        <div className="nt-hero-grid" />

        <div className="nt-hero-content">
          {/* Left */}
          <div className="fade-up">
            <div className="nt-hero-badge">India's Fastest Growing Platform</div>
            <h1 className="nt-hero-title">
              Trade Smarter.<br />
              <span className="grad">Grow Faster.</span>
            </h1>
            <p className="nt-hero-sub">
              NexTrade gives you institutional-grade tools in a beautifully simple
              interface. Stocks, F&O, mutual funds — all in one place.
            </p>
            <div className="nt-hero-cta">
              <Link to="/signup"><button className="btn-primary-nt" style={{ fontSize: "16px", padding: "14px 32px" }}>Start for Free →</button></Link>
              <Link to="/product"><button className="btn-ghost-nt" style={{ fontSize: "16px", padding: "14px 32px" }}>See Products</button></Link>
            </div>
            <div className="nt-hero-stats">
              <div className="nt-hero-stat-item">
                <strong>12M+</strong>
                <span>Active Traders</span>
              </div>
              <div className="nt-hero-stat-item">
                <strong>₹0</strong>
                <span>Brokerage on Delivery</span>
              </div>
              <div className="nt-hero-stat-item">
                <strong>3 sec</strong>
                <span>Avg Order Speed</span>
              </div>
            </div>
          </div>

          {/* Right — Visual */}
          <div className="nt-hero-visual">
            <div className="nt-mock-card">
              <div className="nt-mock-card-header">
                <span className="nt-mock-symbol">RELIANCE NSE</span>
                <span className="nt-mock-badge-up">+1.05%</span>
              </div>
              <div className="nt-mock-price">₹2,874.00</div>
              <div className="nt-mock-sub">Updated just now · NSE</div>
              <div className="nt-mock-chart-bar">
                {bars.map((h, i) => (
                  <span key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="nt-mock-card">
                <div className="nt-mock-card-header">
                  <span style={{ fontSize: "14px", fontWeight: 600 }}>TCS</span>
                  <span className="nt-mock-badge-down">-0.42%</span>
                </div>
                <div style={{ fontSize: "20px", fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>₹3,812</div>
              </div>
              <div className="nt-mock-card">
                <div className="nt-mock-card-header">
                  <span style={{ fontSize: "14px", fontWeight: 600 }}>INFY</span>
                  <span className="nt-mock-badge-up">+0.67%</span>
                </div>
                <div style={{ fontSize: "20px", fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>₹1,741</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
