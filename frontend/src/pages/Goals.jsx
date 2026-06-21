import MainLayout from "../layouts/MainLayout";

import {
  useState,
  useEffect,
} from "react";

import GoalDetailsModal from "../components/Goals/GoalDetailsModal";
import GoalModal from "../components/Goals/GoalModal";
import GoalOverview from "../components/Goals/GoalOverview";
import ActiveGoals from "../components/Goals/ActiveGoals";
import CompletedGoals from "../components/Goals/CompletedGoals";

import Toast from "../components/Toast";

import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  clearCompletedGoals,
  clearActiveGoals,
} from "../services/goalService";

import {
  getTasks,
} from "../services/taskService";

function Goals() {
  // COMPONENT STATES
  const [selectedGoal, setSelectedGoal] =
    useState(null);

  const [showGoalModal, setShowGoalModal] =
    useState(false);

  const [editingGoal, setEditingGoal] =
    useState(null);

  const [goals, setGoals] =
    useState([]);

  const [tasks, setTasks] =
    useState([]);

  const [toast, setToast] =
    useState("");

  const [showClearActiveGoals,
    setShowClearActiveGoals] =
    useState(false);

  const [showClearCompletedGoals,
    setShowClearCompletedGoals] =
    useState(false);

  // FUNCTIONS
  const loadGoals = async () => {
    try {
      const data =
        await getGoals();

      setGoals(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadTasks = async () => {
    try {
      const data =
        await getTasks();

      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGoal =
    async (goalId) => {
      try {
        await deleteGoal(goalId);

        setGoals((prev) =>
          prev.filter(
            (goal) =>
              goal._id !== goalId
          )
        );

        setToast(
          "Goal deleted"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);

      } catch (error) {
        console.error(error);

        setToast(
          "Failed to delete goal"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  const handleCompleteGoal =
    async (goalId) => {
      try {
        const updatedGoal =
          await updateGoal(
            goalId,
            {
              completed: true,
              status: "Complete",
              completedDate:
                new Date()
                  .toISOString()
                  .split("T")[0],
            }
          );

        setGoals((prev) =>
          prev.map((goal) =>
            goal._id === goalId
              ? updatedGoal
              : goal
          )
        );

        setToast(
          "Goal completed"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);

      } catch (error) {
        console.error(error);

        setToast(
          "Failed to complete goal"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  const handleRestoreGoal =
    async (goalId) => {
      try {
        const updatedGoal =
          await updateGoal(
            goalId,
            {
              completed: false,
              status: "Active",
              completedDate: null,
            }
          );

        setGoals((prev) =>
          prev.map((goal) =>
            goal._id === goalId
              ? updatedGoal
              : goal
          )
        );

        setToast(
          "Goal restored"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);

      } catch (error) {
        console.error(error);

        setToast(
          "Failed to restore goal"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  const handleClearActiveGoals =
    async () => {
      try {
        await clearActiveGoals();

        setGoals((prev) =>
          prev.filter(
            (goal) =>
              goal.completed
          )
        );

        setToast(
          "Active goals cleared"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);

      } catch (error) {
        console.error(error);
      }
    };

  const handleClearCompletedGoals =
    async () => {
      try {
        await clearCompletedGoals();

        setGoals((prev) =>
          prev.filter(
            (goal) =>
              !goal.completed
          )
        );

        setToast(
          "Completed goals cleared"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);

      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    loadGoals();
    loadTasks();
  }, []);

  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >

        <GoalOverview
          goals={goals}
          tasks={tasks}
        />

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
            tasks={tasks}
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

            onDeleteGoal={
              handleDeleteGoal
            }
            onCompleteGoal={
              handleCompleteGoal
            }
          />

          <CompletedGoals
            goals={goals}
            setGoals={setGoals}
            setToast={setToast}
            onClearAll={() =>
              setShowClearCompletedGoals(true)
            }
            onDeleteGoal={
              handleDeleteGoal
            }
            onRestoreGoal={
              handleRestoreGoal
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
          tasks={tasks}
          onClose={() =>
            setShowGoalModal(false)
          }
          onSave={(goalData) => {
            createGoal(goalData)
              .then((newGoal) => {
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
              })
              .catch((error) => {
                console.error(error);

                setToast(
                  "Failed to create goal"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);
              });
          }}
        />
      )}
      {editingGoal && (
        <GoalModal
          mode="edit"
          goal={editingGoal}
          tasks={tasks}
          onClose={() =>
            setEditingGoal(null)
          }
          onSave={(goalData) => {
            updateGoal(
              editingGoal._id,
              goalData
            )
              .then((updatedGoal) => {
                setGoals((prev) =>
                  prev.map((goal) =>
                    goal._id ===
                      updatedGoal._id
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
              })
              .catch((error) => {
                console.error(error);

                setToast(
                  "Failed to update goal"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);
              });
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
                onClick={async () => {
                  await handleClearActiveGoals();

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
                onClick={async () => {
                  await handleClearCompletedGoals();

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
      <Toast message={toast} />
    </MainLayout>
  );
}

export default Goals;