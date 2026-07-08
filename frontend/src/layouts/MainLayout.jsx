import Sidebar from "../components/Sidebar";
import AlarmWatcher from "../components/AlarmSystem/AlarmWatcher";

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

      <AlarmWatcher />

      <main
        style={{
          flex: 1,

          marginLeft:
            collapsed
              ? "88px"
              : "280px",

          padding: "24px",

          transition:
            "margin-left 0.25s ease",
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default MainLayout;