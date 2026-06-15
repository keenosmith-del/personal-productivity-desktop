import MainLayout from "../layouts/MainLayout";

import { useState } from "react";

import GoalDetailsModal from "../components/Goals/GoalDetailsModal";
import GoalModal from "../components/Goals/GoalModal";
import GoalOverview from "../components/Goals/GoalOverview";
import ActiveGoals from "../components/Goals/ActiveGoals";
import CompletedGoals from "../components/Goals/CompletedGoals";

import { initialGoals } from "../data/goals";
import Toast from "../components/Toast";

function Goals() {
  // COMPONENT STATES
  const [selectedGoal, setSelectedGoal] =
    useState(null);

  const [showGoalModal, setShowGoalModal] =
    useState(false);

  const [editingGoal, setEditingGoal] =
    useState(null);

  const [goals, setGoals] =
    useState(initialGoals);

  const [toast, setToast] =
    useState("");

  const [lastCompletedGoal,
    setLastCompletedGoal] =
    useState(null);

  const [lastAction,
    setLastAction] =
    useState(null);

  const [lastDeletedGoal,
    setLastDeletedGoal] =
    useState(null);

  const [completionTimeout,
    setCompletionTimeout] =
    useState(null);

  const [showClearActiveGoals,
    setShowClearActiveGoals] =
    useState(false);

  const [showClearCompletedGoals,
    setShowClearCompletedGoals] =
    useState(false);

  // FUNCTIONS
  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >

        <GoalOverview />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",

            gap: "24px",
          }}
        >
          <ActiveGoals
            goals={goals}
            setGoals={setGoals}
            onViewGoal={setSelectedGoal}
            onEditGoal={setEditingGoal}
            onNewGoal={() =>
              setShowGoalModal(true)
            }
            onClearAll={() =>
              setShowClearActiveGoals(true)
            }
            toast={toast}
            setToast={setToast}
            setLastCompletedGoal={
              setLastCompletedGoal
            }
            completionTimeout={
              completionTimeout
            }

            setCompletionTimeout={
              setCompletionTimeout
            }
            setLastDeletedGoal={
              setLastDeletedGoal
            }
            setLastAction={setLastAction}
          />

          <CompletedGoals
            goals={goals}
            setGoals={setGoals}
            setToast={setToast}
            setLastCompletedGoal={setLastCompletedGoal}
            setLastDeletedGoal={setLastDeletedGoal}
            setLastAction={setLastAction}
            onClearAll={() =>
              setShowClearCompletedGoals(true)
            }
          />

        </div>
      </div>
      {selectedGoal && (
        <GoalDetailsModal
          goal={selectedGoal}
          onClose={() =>
            setSelectedGoal(null)
          }
        />
      )}
      {showGoalModal && (
        <GoalModal
          onClose={() =>
            setShowGoalModal(false)
          }
          onSave={(newGoal) => {
            setGoals((prev) => [
              newGoal,
              ...prev,
            ]);

            setToast(
              "Goal created"
            );

            setTimeout(() => {
              setToast("");
            }, 3000);

            setShowGoalModal(false);
          }}
        />
      )}
      {editingGoal && (
        <GoalModal
          mode="edit"
          goal={editingGoal}
          onClose={() =>
            setEditingGoal(null)
          }
          onSave={(updatedGoal) => {
            setGoals((prev) =>
              prev.map((goal) =>
                goal.id ===
                  updatedGoal.id
                  ? updatedGoal
                  : goal
              )
            );

            setToast(
              "Goal updated"
            );

            setTimeout(() => {
              setToast("");
            }, 3000);

            setEditingGoal(null);
          }}
        />
      )}

      {showClearActiveGoals && (
        <div
          onClick={() =>
            setShowClearActiveGoals(
              false
            )
          }
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(12px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              width: "400px",
              padding: "28px",
              borderRadius: "24px",
              background:
                "rgba(20,20,20,0.85)",
              border:
                "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h3
              style={{
                marginBottom: "12px",
                fontWeight: "400",
              }}
            >
              Clear active goals?
            </h3>

            <p
              style={{
                color:
                  "var(--text-secondary)",
                marginBottom: "24px",
              }}
            >
              This action cannot be undone.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "flex-end",
                gap: "12px",
              }}
            >
              <button
                onClick={() =>
                  setShowClearActiveGoals(
                    false
                  )
                }
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "999px",
                  padding: "8px 14px",
                  color: "#ff6b6b",
                  fontSize: "0.85rem",
                  fontWeight: "400",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setGoals((prev) =>
                    prev.filter(
                      (goal) =>
                        goal.completed
                    )
                  );

                  setLastCompletedGoal(
                    null
                  );

                  setToast(
                    "Active goals cleared"
                  );

                  setTimeout(() => {
                    setToast("");
                  }, 3000);

                  setShowClearActiveGoals(
                    false
                  );
                }}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "999px",
                  padding: "8px 14px",
                  color:
                    "var(--text-secondary)",
                  fontSize: "0.85rem",
                  fontWeight: "400",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {showClearCompletedGoals && (
        <div
          onClick={() =>
            setShowClearCompletedGoals(
              false
            )
          }
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(12px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              width: "400px",
              padding: "28px",
              borderRadius: "24px",
              background:
                "rgba(20,20,20,0.85)",
              border:
                "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h3
              style={{
                marginBottom: "12px",
                fontWeight: "400",
              }}
            >
              Clear completed goals?
            </h3>

            <p
              style={{
                color:
                  "var(--text-secondary)",
                marginBottom: "24px",
              }}
            >
              This action cannot be undone.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "flex-end",
                gap: "12px",
              }}
            >
              <button
                onClick={() =>
                  setShowClearCompletedGoals(
                    false
                  )
                }
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "999px",
                  padding: "8px 14px",
                  color: "#ff6b6b",
                  fontSize: "0.85rem",
                  fontWeight: "400",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setGoals((prev) =>
                    prev.filter(
                      (goal) =>
                        !goal.completed
                    )
                  );

                  setLastCompletedGoal(
                    null
                  );

                  setToast(
                    "Completed goals cleared"
                  );

                  setTimeout(() => {
                    setToast("");
                  }, 3000);

                  setShowClearCompletedGoals(
                    false
                  );
                }}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "999px",
                  padding: "8px 14px",
                  color:
                    "var(--text-secondary)",
                  fontSize: "0.85rem",
                  fontWeight: "400",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
      <Toast
        message={toast}
        actionLabel={
          lastCompletedGoal ||
            lastDeletedGoal
            ? "Undo"
            : null
        }
        onAction={() => {
          if (completionTimeout) {
            clearTimeout(
              completionTimeout
            );

            setCompletionTimeout(
              null
            );
          }

          if (lastAction === "delete") {
            setGoals((prev) => [
              lastDeletedGoal,
              ...prev,
            ]);

            setLastDeletedGoal(null);

            setLastAction(null);

            setToast("");

            return;
          }

          if (lastAction !== "complete")
            return;

          setGoals((prev) =>
            prev.map((goal) =>
              goal.id ===
                lastCompletedGoal.id
                ? {
                  ...goal,
                  completed: false,
                  pendingCompletion: false,
                  status: "Active",
                }
                : goal
            )
          );

          setToast("");

          setLastCompletedGoal(
            null
          );

          setLastDeletedGoal(
            null
          );

          setLastAction(
            null
          );
        }}
      />
    </MainLayout>
  );
}

export default Goals;