import React from "react";
import { Link } from "react-router-dom";

function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "0",
      sub: "Forever free",
      featured: false,
      features: [
        "Zero brokerage on equity delivery",
        "Up to 20 stocks in watchlist",
        "Basic charting tools",
        "Email support",
        "Mobile app access",
      ],
    },
    {
      name: "Pro",
      price: "20",
      sub: "per executed order for F&O",
      featured: true,
      badge: "Most Popular",
      features: [
        "Everything in Free",
        "Unlimited F&O trading at ₹20/order",
        "Advanced charting (100+ indicators)",
        "Unlimited watchlist",
        "Priority support",
        "API access",
      ],
    },
    {
      name: "Elite",
      price: "999",
      sub: "per month (unlimited orders)",
      featured: false,
      features: [
        "Everything in Pro",
        "Algo trading terminal",
        "Dedicated relationship manager",
        "Basket orders & GTT",
        "Direct MF investments",
        "1:1 onboarding support",
      ],
    },
  ];

  return (
    <section className="nt-pricing">
      <div className="container-nt">
        <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto" }}>
          <div className="nt-section-tag">Pricing</div>
          <h2 className="nt-section-title">Simple, Transparent Pricing</h2>
          <p className="nt-section-sub" style={{ margin: "0 auto" }}>
            No hidden fees. No surprises. Pay only when you trade.
          </p>
        </div>
        <div className="nt-pricing-cards">
          {plans.map((plan, i) => (
            <div className={`nt-pricing-card ${plan.featured ? "featured" : ""}`} key={i}>
              {plan.badge && <div className="badge">{plan.badge}</div>}
              <h3>{plan.name}</h3>
              <div className="price">
                <span className="unit">₹</span>{plan.price}
              </div>
              <p className="price-sub">{plan.sub}</p>
              <ul className="feature-list">
                {plan.features.map((f, j) => (
                  <li key={j}><span className="chk">✓</span>{f}</li>
                ))}
              </ul>
              <Link to="/signup">
                <button
                  className={plan.featured ? "btn-primary-nt" : "btn-ghost-nt"}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Get Started
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
