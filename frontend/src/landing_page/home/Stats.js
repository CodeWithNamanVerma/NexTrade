import React, { useEffect, useRef } from "react";

function Stats() {
  const statsRef = useRef([]);

  useEffect(() => {
    const animate = (el, target, suffix = "", duration = 2000) => {
      let start = null;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = Number(el.dataset.target);
            const suffix = el.dataset.suffix || "";
            animate(el, target, suffix);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    statsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: "👥", target: 12000000, suffix: "+", label: "Registered Users", display: "12M+" },
    { icon: "🏢", target: 4250000, suffix: "+", label: "Orders Per Day", display: "4.25M+" },
    { icon: "💰", target: 100000, suffix: "Cr+", label: "Daily Turnover", display: "₹1L Cr+" },
    { icon: "⭐", target: 5, suffix: "/5", label: "App Store Rating", display: "4.9/5" },
  ];

  return (
    <section className="nt-stats">
      <div className="container-nt">
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
          <div className="nt-section-tag">By The Numbers</div>
          <h2 className="nt-section-title">Trusted by Millions of Indians</h2>
          <p className="nt-section-sub" style={{ margin: "0 auto" }}>
            From first-time investors to professional traders, NexTrade powers
            India's most active trading community.
          </p>
        </div>
        <div className="nt-stats-grid">
          {stats.map((s, i) => (
            <div className="nt-stat-card" key={i}>
              <div className="icon">{s.icon}</div>
              <div
                className="number"
                ref={(el) => (statsRef.current[i] = el)}
                data-target={s.target}
                data-suffix={s.suffix}
              >
                {s.display}
              </div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
