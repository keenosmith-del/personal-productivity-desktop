import GlassCard from "../GlassCard";
import { Trash2 } from "lucide-react";

function CompletedGoals() {
  const goals = [
    "Learn React",
    "Build Productivity Dashboard",
    "Complete SQL Fundamentals",
  ];

  return (
    <GlassCard>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            fontWeight: "400",
            letterSpacing: "-0.02em",
          }}
        >
          Completed Goals
        </h2>

        <button
          style={{
            background: "transparent",
            border: "none",

            color:
              "var(--text-secondary)",

            display: "flex",
            alignItems: "center",

            gap: "6px",

            cursor: "pointer",

            fontSize: "0.9rem",

            fontWeight: "400",

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
          Clear all
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {goals.map((goal) => (
          <div
            key={goal}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",

              padding: "8px 12px",

              borderRadius: "12px",

              opacity: 0.5,

              transition:
                "all 0.25s ease",

              cursor: "default",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "18px",
                  height: "18px",

                  borderRadius: "50%",

                  background:
                    "rgba(245,245,245,0.45)",

                  border:
                    "1.5px solid rgba(245,245,245,0.45)",

                  flexShrink: 0,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  fontSize: "12px",
                  fontWeight: "600",

                  color: "#1a1d29",
                }}
              >
                ✓
              </div>

              <span
                style={{
                  color: "var(--text-secondary)",

                  fontWeight: "300",

                  color: "rgba(255,255,255,0.7)",

                  fontSize: "0.9rem",

                  letterSpacing: "-0.015em",
                }}
              >
                {goal}
              </span>
            </div>

            <Trash2
              size={16}
              strokeWidth={1.5}
              style={{
                cursor: "pointer",

                transition:
                  "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color =
                  "#ff6b6b";

                e.currentTarget.style.transform =
                  "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  "";

                e.currentTarget.style.transform =
                  "scale(1)";
              }}
            />
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

export default CompletedGoals;