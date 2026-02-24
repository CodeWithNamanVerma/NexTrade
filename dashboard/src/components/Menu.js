import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { icon: "⊞", label: "Dashboard", to: "/" },
  { icon: "📋", label: "Orders", to: "/orders" },
  { icon: "📦", label: "Holdings", to: "/holdings" },
  { icon: "📊", label: "Positions", to: "/positions" },
  { icon: "💳", label: "Funds", to: "/funds" },
  { icon: "🔧", label: "Apps", to: "/apps" },
];

const Menu = () => {
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <aside className="nt-sidebar">
      {/* Logo */}
      <div className="nt-sidebar-logo">
        <div className="nt-sidebar-logo-icon">⚡</div>
        Nex<span>Trade</span>
      </div>

      {/* Nav items */}
      <ul className="nt-sidebar-nav">
        {navItems.map((item) => {
          const active = location.pathname === item.to ||
            (item.to !== "/" && location.pathname.startsWith(item.to));
          return (
            <li key={item.to}>
              <Link to={item.to} className={active ? "active" : ""}>
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Profile */}
      <div className="nt-sidebar-profile" onClick={() => setProfileOpen(!profileOpen)}>
        <div className="nt-avatar">NT</div>
        <div>
          <div className="name">NexTrader</div>
          <div className="id">NT001 · Active</div>
        </div>
      </div>
    </aside>
  );
};

export default Menu;
