import React from "react";
import Menu from "./Menu";
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";
import AuthGuard from "./AuthGuard";

const Home = () => {
  return (
    <AuthGuard>
      <div className="nt-layout">
        {/* Left sidebar */}
        <Menu />

        {/* Right: topbar + content */}
        <div className="nt-main">
          <TopBar />
          <Dashboard />
        </div>
      </div>
    </AuthGuard>
  );
};

export default Home;
