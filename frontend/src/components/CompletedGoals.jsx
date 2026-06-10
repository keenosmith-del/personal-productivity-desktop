import GlassCard from "./GlassCard";
import { Trash2 } from "lucide-react";

function CompletedGoals() {
  const goals = [
    "Learn React",
    "Build Productivity Dashboard",
    "Complete SQL Fundamentals",
  ];

  return (
    <GlassCard>
      <h2
        style={{
          marginBottom: "24px",
          fontWeight: "400",
          letterSpacing: "-0.02em",
        }}
      >
        Completed Goals
      </h2>

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
              justifyContent:
                "space-between",

              padding: "14px",

              background:
                "rgba(255,255,255,0.04)",

              border:
                "1px solid var(--glass-border)",

              borderRadius: "12px",

              opacity: 0.8,

              transition:
                "all 0.25s ease",

              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "rgba(14,17,22,0.75)";

              e.currentTarget.style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "rgba(255,255,255,0.04)";

              e.currentTarget.style.transform =
                "translateY(0)";
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
                    "rgba(245,245,245,0.75)",

                  border:
                    "1.5px solid rgba(245,245,245,0.75)",
                }}
              />

              <span
                style={{
                  textDecoration:
                    "line-through",

                  color:
                    "var(--text-secondary)",

                  fontWeight: "300",

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