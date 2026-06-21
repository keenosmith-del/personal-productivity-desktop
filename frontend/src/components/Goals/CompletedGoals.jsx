import GlassCard from "../GlassCard";

import {
  Trash2,
  RotateCcw,
} from "lucide-react";

import { useState } from "react";

function CompletedGoals({
  goals,
  setGoals,
  setToast,
  onClearAll,
  onDeleteGoal,
  updateGoal,
  onRestoreGoal,
}) {
  // COMPONENT STATES
  const completedGoals =
    goals.filter(
      (goal) =>
        goal.completed
    );

  const [hoveredGoal,
    setHoveredGoal] =
    useState(null);

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
          onClick={onClearAll}
          disabled={
            completedGoals.length === 0
          }
          style={{
            background: "transparent",

            border:
              "1px solid rgba(255,255,255,0.08)",

            borderRadius: "999px",

            padding: "8px 14px",

            color:
              completedGoals.length === 0
                ? "rgba(255,255,255,0.25)"
                : "var(--text-secondary)",

            fontSize: "0.8rem",

            fontWeight: "300",

            cursor:
              completedGoals.length === 0
                ? "not-allowed"
                : "pointer",

            opacity:
              completedGoals.length === 0
                ? 0.5
                : 1,
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

          maxHeight: "380px",
          overflowY: "auto",
          paddingRight: "4px",
        }}
      >
        {completedGoals.length === 0 ? (
          <p
            style={{
              color:
                "var(--text-secondary)",
              fontSize: "0.85rem",
              textAlign: "left",
              padding: "24px 0",
            }}
          >
            No completed goals.
          </p>
        ) : (
          completedGoals.map((goal) => (
            <div
              key={goal.title}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",

                padding: "8px 12px",

                borderRadius: "12px",

                opacity: 0.5,

                transition: "all 0.25s ease",

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
                  onClick={() => {
                    onRestoreGoal(goal._id);

                    setToast("Goal restored");

                    setTimeout(() => {
                      setToast("");
                    }, 3000);
                  }}
                  onMouseEnter={() =>
                    setHoveredGoal(goal._id)
                  }
                  onMouseLeave={() =>
                    setHoveredGoal(null)
                  }
                  style={{
                    cursor: "pointer",

                    width: "18px",
                    height: "18px",

                    borderRadius: "50%",

                    background:
                      hoveredGoal === goal._id
                        ? "rgba(245,245,245,0.75)"
                        : "rgba(245,245,245,0.45)",

                    border:
                      hoveredGoal === goal._id
                        ? "1.5px solid rgba(245,245,245,0.75)"
                        : "1.5px solid rgba(245,245,245,0.45)",

                    flexShrink: 0,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    transition: "all 0.2s ease",

                    color: "#1a1d29",
                  }}
                >
                  {hoveredGoal === goal._id ? (
                    <RotateCcw
                      size={10}
                      strokeWidth={2}
                    />
                  ) : (
                    "✓"
                  )}
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
                    {goal.title}
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
                      {goal.completed}
                    </span>
                  </div>
                </div>
              </div>

              <Trash2
                size={16}
                strokeWidth={1.5}
                style={{
                  cursor: "pointer",

                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ff6b6b";

                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    "";

                  e.currentTarget.style.transform = "scale(1)";
                }}
                onClick={(e) => {
                  e.stopPropagation();

                  onDeleteGoal(goal._id);
                }}
              />
            </div>
          ))
        )}
      </div>
    </GlassCard>
  );
}

export default CompletedGoals;