import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="nt-navbar" style={{ boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none" }}>
      <Link to="/" className="nt-logo">
        <div className="nt-logo-icon">⚡</div>
        Nex<span>Trade</span>
      </Link>

      <ul className="nt-nav-links">
        <li><Link to="/product">Products</Link></li>
        <li><Link to="/pricing">Pricing</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/support">Support</Link></li>
      </ul>

      <div className="nt-nav-actions">
        <Link to="/login"><button className="btn-ghost-nt">Log In</button></Link>
        <Link to="/signup"><button className="btn-primary-nt">Open Account →</button></Link>
      </div>
    </nav>
  );
}

export default Navbar;
