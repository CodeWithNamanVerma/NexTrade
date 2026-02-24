import React, { useState } from "react";

function SupportPage() {
  const [search, setSearch] = useState("");

  const faqs = [
    { q: "How do I open an account?", a: "Click 'Open Account', fill in your details, and complete KYC online in 10 minutes. Aadhaar-based verification is instant." },
    { q: "How long does withdrawal take?", a: "Withdrawals are processed within 24 hours on working days. Funds typically reach your bank within 1 business day." },
    { q: "Is my money safe?", a: "Yes. Client funds are always kept in a separate escrow account. NexTrade cannot use your funds for its own operations." },
    { q: "How do I place a buy order?", a: "Log in, open the dashboard, search for a stock in the watchlist, hover over it, and click Buy. Set quantity, price and order type." },
    { q: "What documents are required for KYC?", a: "You'll need your PAN card, Aadhaar card, bank account details, and a selfie for verification." },
    { q: "Does NexTrade offer IPO applications?", a: "Yes! Apply for IPOs directly through the platform using ASBA facility linked to your bank account." },
    { q: "What is the trading hours?", a: "Equity markets: 9:15 AM – 3:30 PM IST Monday to Friday. Pre-open session: 9:00 – 9:15 AM. F&O: 9:15 AM – 3:30 PM." },
    { q: "How do I contact support?", a: "Email us at support@nextrade.in, call 1800-XXX-XXXX (toll-free), or raise a ticket from your dashboard (8 AM – 8 PM IST)." },
  ];

  const filtered = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div style={{ paddingTop: "68px" }} />
      <section className="nt-support-hero">
        <div className="container-nt">
          <div className="nt-section-tag">Support Center</div>
          <h1 className="nt-section-title" style={{ fontSize: "clamp(32px,4vw,52px)", maxWidth: 640, margin: "0 auto 16px" }}>
            How can we <span style={{ color: "var(--accent-cyan)" }}>help you?</span>
          </h1>
          <p className="nt-section-sub" style={{ margin: "0 auto", textAlign: "center" }}>
            Search our knowledge base or browse frequently asked questions.
          </p>
          <div className="nt-support-search">
            <input
              type="text"
              placeholder="Search for answers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 0" }}>
        <div className="container-nt">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 className="nt-section-title">Frequently Asked Questions</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="nt-faq-grid">
            {filtered.map((f, i) => (
              <div className="nt-faq-item" key={i}>
                <h4>{f.q}</h4>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section style={{ padding: "60px 0", background: "var(--bg-secondary)", borderTop: "1px solid var(--border-glass)" }}>
        <div className="container-nt" style={{ textAlign: "center" }}>
          <h2 className="nt-section-title" style={{ fontSize: 30, marginBottom: 12 }}>Still need help?</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: 28 }}>Our team responds within 2 hours on working days.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { icon: "📧", label: "Email Us", sub: "support@nextrade.in" },
              { icon: "📞", label: "Call Us", sub: "1800-XXX-XXXX (Toll Free)" },
              { icon: "💬", label: "Live Chat", sub: "Available 8 AM – 8 PM IST" },
            ].map((c, i) => (
              <div
                key={i}
                className="nt-feature-card"
                style={{ flex: "1 1 200px", maxWidth: 260, cursor: "pointer", textAlign: "center" }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{c.icon}</div>
                <h3 style={{ fontSize: 16, marginBottom: 4 }}>{c.label}</h3>
                <p style={{ fontSize: 13 }}>{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default SupportPage;
