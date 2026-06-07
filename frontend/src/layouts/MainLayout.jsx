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

function MainLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: "32px",
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default MainLayout;