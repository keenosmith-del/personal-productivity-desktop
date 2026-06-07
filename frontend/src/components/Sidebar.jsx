/**
 * Application sidebar navigation.
 */

import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkStyle = {
    color: "var(--text-primary)",
    padding: "12px 16px",
    borderRadius: "12px",
    textDecoration: "none",
    transition: "all 0.2s ease",
  };

  return (
    <aside
      style={{
        width: "260px",
        padding: "24px",
        borderRight: "1px solid var(--glass-border)",
        backdropFilter: "blur(20px)",
      }}
    >
      <h2
        style={{
          marginBottom: "40px",
        }}
      >
        Productivity
      </h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <NavLink to="/analytics" style={linkStyle}>
          Analytics
        </NavLink>

        <NavLink to="/tasks" style={linkStyle}>
          Tasks
        </NavLink>

        <NavLink to="/goals" style={linkStyle}>
          Goals
        </NavLink>

        <NavLink to="/calendar" style={linkStyle}>
          Calendar
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;