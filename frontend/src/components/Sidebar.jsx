import { NavLink } from "react-router-dom";

import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";

import {
  BarChart3,
  CheckSquare,
  Target,
  Calendar,
  Bell,
  AlarmClock,
  Coffee,
  User,
  Settings,
  NotebookPen,
  Folder,
  Search,
  Plus,
} from "lucide-react";

function Sidebar({ collapsed, setCollapsed }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser =
          await getCurrentUser();

        setUser(currentUser);

      } catch (error) {
        console.error(
          "Failed to load user",
          error
        );
      }
    };

    loadUser();
  }, []);

  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "?";

  const mainNavItems = [
    {
      label: "Dashboard",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      label: "Tasks",
      path: "/tasks",
      icon: CheckSquare,
    },
    {
      label: "Goals",
      path: "/goals",
      icon: Target,
    },
    {
      label: "Projects",
      path: "/projects",
      icon: Folder,
    },
    {
      label: "Reminders",
      path: "/reminders",
      icon: AlarmClock,
    },
    {
      label: "Notes",
      path: "/notes",
      icon: NotebookPen,
    },
    {
      label: "Calendar",
      path: "/calendar",
      icon: Calendar,
    },
    {
      label: "Notifications",
      path: "/notifications",
      icon: Bell,
    },
    {
      label: "Search",
      path: "/search",
      icon: Search,
    },
  ];

  const accountNavItems = [
    {
      label: "Account",
      path: "/account",
      icon: Settings,
    },
  ];

  const renderNavItem = (item) => {
    const Icon = item.icon;

    return (
      <NavLink
        key={item.path}
        to={item.path}
        style={({ isActive }) => ({
          display: "flex",
          alignItems: "center",

          justifyContent: collapsed
            ? "center"
            : "flex-start",

          gap: collapsed ? "0" : "12px",

          padding: "8px 12px",

          borderRadius:
            "var(--radius-small)",

          textDecoration: "none",

          color:
            "var(--text-primary)",

          background: isActive
            ? "rgba(255,255,255,0.08)"
            : "transparent",

          border: isActive
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid transparent",

          transition:
            "all 0.2s ease",
        })}
        onMouseEnter={(e) => {
          const bg =
            window.getComputedStyle(
              e.currentTarget
            ).backgroundColor;

          if (
            bg ===
            "rgba(0, 0, 0, 0)"
          ) {
            e.currentTarget.style.background =
              "rgba(255,255,255,0.05)";
          }
        }}
        onMouseLeave={(e) => {
          const bg =
            window.getComputedStyle(
              e.currentTarget
            ).backgroundColor;

          if (
            bg !==
            "rgba(255, 255, 255, 0.08)"
          ) {
            e.currentTarget.style.background =
              "transparent";
          }
        }}
      >
        <div
          style={{
            width: "24px",
            height: "24px",
            minWidth: "24px",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon
            size={18}
            strokeWidth={1.2}
          />
        </div>

        {!collapsed && (
          <span
            style={{
              fontSize: "0.82rem",
              fontWeight: "300",
              letterSpacing: "-0.01em",
            }}
          >
            {item.label}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <aside
      style={{
        position: "fixed",

        top: 0,
        left: 0,

        height: "100vh",

        width: collapsed
          ? "88px"
          : "280px",

        transition:
          "all 0.25s ease",

        padding: collapsed
          ? "12px"
          : "20px",

        flexShrink: 0,

        zIndex: 100,
      }}
    >
      <div
        style={{
          height: "100%",

          background:
            "var(--glass-bg)",

          border:
            "1px solid var(--glass-border)",

          borderRadius:
            "var(--radius-large)",

          display: "flex",
          flexDirection: "column",

          padding: collapsed
            ? "12px"
            : "20px",
        }}
      >
        {/* Header */}

        <div
          style={{
            display: "flex",
            alignItems: "center",

            justifyContent: collapsed
              ? "center"
              : "space-between",

            marginBottom: "24px",
          }}
        >

          <button
            onClick={() =>
              setCollapsed(!collapsed)
            }
            style={{
              background:
                "transparent",

              border: "none",

              color:
                "var(--text-secondary)",

              cursor: "pointer",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              fontSize: "1rem",

              fontWeight: "300",

              lineHeight: 1,

              transition:
                "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color =
                "var(--text-primary)";
            }}

            onMouseLeave={(e) => {
              e.currentTarget.style.color =
                "var(--text-secondary)";
            }}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        {/* User Section */}

        <NavLink
          to="/profile"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
              display: "flex",

              flexDirection: collapsed
                ? "column"
                : "row",

              alignItems: "center",

              gap: "10px",

              marginBottom: "16px",

              paddingBottom: "16px",

              borderBottom:
                "1px solid var(--glass-border)",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",

                borderRadius: "50%",

                background:
                  "rgba(255,255,255,0.08)",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                fontWeight: "400",
                fontSize: "1rem",
              }}
            >
              {initials}
            </div>

            {!collapsed && (
              <div>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  Hi,
                </p>

                <p
                  style={{
                    fontWeight: "400",
                  }}
                >
                  {user?.name || "Loading..."}
                </p>
              </div>
            )}
          </div>
        </NavLink>

        {/* Main Navigation */}

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {mainNavItems.map(
            renderNavItem
          )}
        </nav>

        {/* Break Section */}

        <div
          style={{
            marginTop: "4px",

            display: "flex",
            flexDirection: "column",

            gap: "4px",
          }}
        >
          {renderNavItem({
            label: "Need a break?",
            path: "/break",
            icon: Coffee,
          })}
        </div>

        <div
          style={{
            flex: 1,
            minHeight: "18px",
          }}
        />

        {/* Account Section */}

        <div
          style={{
            borderTop:
              "1px solid var(--glass-border)",

            paddingTop: "16px",

            display: "flex",
            flexDirection: "column",

            gap: "4px",
          }}
        >
          {accountNavItems.map(
            renderNavItem
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;