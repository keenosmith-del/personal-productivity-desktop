/**
 * Main application layout.
 *
 * Used by:
 * - Dashboard
 * - Tasks
 * - Goals
 * - Calendar
 *
 * Not used by:
 * - Login
 */

import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

function MainLayout({ children }) {
  const [collapsed, setCollapsed] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "sidebarCollapsed"
        );

      return saved === null
        ? true
        : JSON.parse(saved);
    });

  useEffect(() => {
    localStorage.setItem(
      "sidebarCollapsed",
      JSON.stringify(collapsed)
    );
  }, [collapsed]);
  
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main
        style={{
          flex: 1,
          padding: "24px",
          overflow: "hidden",
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default MainLayout;