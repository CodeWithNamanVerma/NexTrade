import React from "react";
import Pricing from "../home/Pricing";
import OpenAccount from "../OpenAccount";

function PricingPage() {
  const faq = [
    { q: "What is the brokerage for equity delivery?", a: "Zero brokerage. You only pay statutory charges like STT, exchange fees, and GST." },
    { q: "What are F&O charges?", a: "Flat ₹20 per executed order or 0.03% of trade value, whichever is lower." },
    { q: "Are there any account maintenance fees?", a: "No account opening or maintenance fee for the first year. ₹300/year from year two." },
    { q: "Is there a minimum balance requirement?", a: "No minimum balance. Fund your account with as little as ₹1." },
  ];

  return (
    <>
      <div style={{ paddingTop: "68px" }} />

      <Pricing />

      {/* FAQ */}
      <section style={{ padding: "80px 0", background: "var(--bg-secondary)" }}>
        <div className="container-nt">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="nt-section-tag">FAQ</div>
            <h2 className="nt-section-title">Pricing Questions</h2>
          </div>
          <div className="nt-faq-grid">
            {faq.map((f, i) => (
              <div className="nt-faq-item" key={i}>
                <h4>{f.q}</h4>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <OpenAccount />
    </>
  );
}

export default PricingPage;
