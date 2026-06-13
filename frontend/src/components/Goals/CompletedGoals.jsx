import GlassCard from "../GlassCard";
import { Trash2 } from "lucide-react";

function CompletedGoals() {
  const completedGoals = [
    {
      title: "Learn React",
      category: "Study",
      completed: "03 Jun",
    },
    {
      title: "Build Portfolio Website",
      category: "Work",
      completed: "28 May",
    },
    {
      title: "Complete JavaScript Course",
      category: "Study",
      completed: "15 May",
    },
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

            border: "1px solid rgba(255,255,255,0.08)",

            borderRadius: "999px",

            padding: "8px 14px",

            color: "var(--text-secondary)",

            fontSize: "0.8rem",

            fontWeight: "300",

            cursor: "pointer",

            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color =
              "var(--text-primary)";

            e.currentTarget.style.background =
              "rgba(255,255,255,0.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color =
              "var(--text-secondary)";

            e.currentTarget.style.background =
              "transparent";
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
        {completedGoals.map((completed) => (
          <div
            key={completed.title}
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

              <div>
                <div
                  style={{
                    fontWeight: "300",

                    color:
                      "rgba(255,255,255,0.7)",

                    fontSize: "0.9rem",

                    letterSpacing: "-0.015em",

                    marginBottom: "6px",
                  }}
                >
                  {completed.title}
                </div>

                <div
                  style={{
                    display: "flex",

                    gap: "6px",

                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      padding: "3px 8px",

                      borderRadius: "999px",

                      fontSize: "0.68rem",

                      background: "#c59c7033",

                      border:
                        "1px solid #c59c7066",
                    }}
                  >
                    Goal
                  </span>

                  <span
                    style={{
                      padding: "3px 8px",

                      borderRadius: "999px",

                      fontSize: "0.68rem",

                      background:
                        completedGoals.category === "Work"
                          ? "#063f4733"
                          : "#29737633",

                      border:
                        completedGoals.category === "Work"
                          ? "1px solid #063f4766"
                          : "1px solid #29737666",
                    }}
                  >
                    {completed.category}
                  </span>

                  <span
                    style={{
                      padding: "3px 8px",

                      borderRadius: "999px",

                      fontSize: "0.68rem",

                      background: "#728a6e33",

                      border:
                        "1px solid #728a6e66",
                    }}
                  >
                    Complete
                  </span>

                  <span
                    style={{
                      fontSize: "0.68rem",

                      color:
                        "var(--text-secondary)",

                      alignSelf: "center",
                    }}
                  >
                    {completed.completed}
                  </span>
                </div>
              </div>
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