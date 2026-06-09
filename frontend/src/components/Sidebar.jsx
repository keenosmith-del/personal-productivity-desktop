import { NavLink } from "react-router-dom";

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
} from "lucide-react";

function Sidebar({ collapsed, setCollapsed }) {
  const mainNavItems = [
    {
      label: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      label: "Tasks",
      path: "/tasks",
      icon: CheckSquare,
    },
    {
      label: "Notes",
      path: "/notes",
      icon: NotebookPen,
    },
    {
      label: "Goals",
      path: "/goals",
      icon: Target,
    },
    {
      label: "Calendar",
      path: "/calendar",
      icon: Calendar,
    },
    {
      label: "Reminders",
      path: "/reminders",
      icon: AlarmClock,
    },
    {
      label: "Notifications",
      path: "/notifications",
      icon: Bell,
    },
  ];

  const accountNavItems = [
    {
      label: "Profile",
      path: "/profile",
      icon: User,
    },
    {
      label: "Settings",
      path: "/settings",
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

          padding: "14px",

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
            size={20}
            strokeWidth={1.5}
          />
        </div>

        {!collapsed && (
          <span>{item.label}</span>
        )}
      </NavLink>
    );
  };

  return (
    <aside
      style={{
        width: collapsed
          ? "88px"
          : "280px",

        transition:
          "all 0.25s ease",

        padding: collapsed
          ? "12px"
          : "20px",

        flexShrink: 0,
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

          backdropFilter:
            "blur(20px)",

          WebkitBackdropFilter:
            "blur(20px)",

          display: "flex",
          flexDirection: "column",

          padding: collapsed
            ? "12px"
            : "28px",
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

              gap: "16px",

              marginBottom: "24px",

              paddingBottom: "24px",

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

                fontWeight: "600",
              }}
            >
              KS
            </div>

            {!collapsed && (
              <div>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color:
                      "var(--text-secondary)",
                  }}
                >
                  Welcome back,
                </p>

                <p
                  style={{
                    fontWeight: "600",
                  }}
                >
                  Keeno
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
            gap: "8px",
          }}
        >
          {mainNavItems.map(
            renderNavItem
          )}
        </nav>

        {/* Break Section */}

        <div
          style={{
            marginTop: "24px",
            paddingTop: "24px",

            borderTop:
              "1px solid var(--glass-border)",
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

            gap: "8px",
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