import MainLayout from "../layouts/MainLayout";

import {
  useState,
  useEffect,
} from "react";

import TaskModal from "../components/Tasks/TaskModal";
import CompletedTasks from "../components/Tasks/CompletedTasks";
import ActiveTasks from "../components/Tasks/ActiveTasks";
import TaskDetailsModal from "../components/Tasks/TaskDetailsModal";
import TaskStats from "../components/Tasks/TaskStats";
import TaskActivity from "../components/Tasks/TaskActivity";

import Toast from "../components/Toast";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  clearCompletedTasks,
  clearActiveTasks,
} from "../services/taskService";

import {
  getGoals,
  updateGoal,
} from "../services/goalService";

function Tasks() {
  //COMPONENT STATES
  const [showTaskModal, setShowTaskModal] =
    useState(false);

  const [selectedTask, setSelectedTask] =
    useState(null);

  const [editingTask,
    setEditingTask] =
    useState(null);

  const [tasks, setTasks] =
    useState([]);

  const [toast, setToast] =
    useState("");

  const [completionTimeout,
    setCompletionTimeout] =
    useState(null);

  const [showClearCompleted,
    setShowClearCompleted] =
    useState(false);

  const [showClearActive,
    setShowClearActive] =
    useState(false);

  // FUNCTIONS
  const loadTasks = async () => {
    try {
      const data =
        await getTasks();

      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // HANDLERS
  const handleDeleteTask =
    async (taskId) => {
      try {
        await deleteTask(taskId);

        setTasks((prev) =>
          prev.filter(
            (task) =>
              task._id !== taskId
          )
        );

        setToast(
          "Task deleted"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      } catch (error) {
        console.error(error);

        setToast(
          "Failed to delete task"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  const handleCompleteTask =
    async (task) => {
      try {
        const updatedTask =
          await updateTask(
            task._id,
            {
              completed: true,
              status: "Completed",
              completedDate:
                new Date().toLocaleDateString(),
            }
          );

        setTasks((prev) =>
          prev.map((t) =>
            t._id === updatedTask._id
              ? updatedTask
              : t
          )
        );

        setToast(
          "Task completed"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);

      } catch (error) {
        console.error(error);

        setToast(
          "Failed to complete task"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  const handleRestoreTask =
    async (task) => {
      try {
        const updatedTask =
          await updateTask(
            task._id,
            {
              completed: false,
              completedDate: null,
              status: "Active",
            }
          );

        setTasks((prev) =>
          prev.map((t) =>
            t._id === updatedTask._id
              ? updatedTask
              : t
          )
        );

        setToast(
          "Task restored"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);

      } catch (error) {
        console.error(error);

        setToast(
          "Failed to restore task"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  const handleClearCompletedTasks =
    async () => {
      try {
        await clearCompletedTasks();

        setTasks((prev) =>
          prev.filter(
            (task) =>
              !task.completed
          )
        );

        setToast(
          "Completed tasks cleared"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);

      } catch (error) {
        console.error(error);

        setToast(
          "Failed to clear completed tasks"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  const handleClearActiveTasks =
    async () => {
      try {
        await clearActiveTasks();

        setTasks((prev) =>
          prev.filter(
            (task) =>
              task.completed
          )
        );

        setToast(
          "Active tasks cleared"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);

      } catch (error) {
        console.error(error);

        setToast(
          "Failed to clear active tasks"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "24px",
          }}
        >
          <ActiveTasks
            tasks={tasks}
            setTasks={setTasks}
            toast={toast}
            setToast={setToast}
            onViewTask={setSelectedTask}
            onEditTask={setEditingTask}
            onNewTask={() =>
              setShowTaskModal(true)
            }
            completionTimeout={completionTimeout}
            setCompletionTimeout={setCompletionTimeout}
            onClearAll={() =>
              setShowClearActive(true)
            }
            onDeleteTask={
              handleDeleteTask
            }
            onCompleteTask={
              handleCompleteTask
            }
          />

          <CompletedTasks
            tasks={tasks}
            setTasks={setTasks}
            onClearAll={() =>
              setShowClearCompleted(true)
            }
            setToast={setToast}
            onRestoreTask={
              handleRestoreTask
            }
            onDeleteTask={
              handleDeleteTask
            }
          />

          <TaskStats tasks={tasks} />

          <TaskActivity tasks={tasks} />
        </div>
      </div>
      {showTaskModal && (
        <TaskModal
          onClose={() =>
            setShowTaskModal(false)
          }
          onSave={(taskData) => {
            createTask(taskData)
              .then((newTask) => {
                setTasks((prev) => [
                  newTask,
                  ...prev,
                ]);

                setToast(
                  "Task created"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);
              })
              .catch((error) => {
                console.error(error);

                setToast(
                  "Failed to create task"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);
              });
          }}
        />
      )}
      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={() =>
            setSelectedTask(null)
          }
        />
      )}
      {editingTask && (
        <TaskModal
          mode="edit"
          task={editingTask}
          onClose={() =>
            setEditingTask(null)
          }
          onSave={(taskData) => {
            updateTask(
              editingTask._id,
              taskData
            )
              .then((updatedTask) => {
                setTasks((prev) =>
                  prev.map((task) =>
                    task._id ===
                      updatedTask._id
                      ? updatedTask
                      : task
                  )
                );

                setToast(
                  "Task updated"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);

                setEditingTask(null);
              })
              .catch((error) => {
                console.error(error);

                setToast(
                  "Failed to update task"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);
              });
          }}
        />
      )}
      {showClearCompleted && (
        <div
          onClick={() =>
            setShowClearCompleted(
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
              borderRadius:
                "24px",
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
              Clear completed tasks?
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
                  setShowClearCompleted(
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

                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    "#ff6b6b";

                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    "#ff6b6b";

                  e.currentTarget.style.background =
                    "transparent";
                }}
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await handleClearCompletedTasks();

                  setShowClearCompleted(
                    false
                  );
                }}

                style={{
                  background: "transparent",

                  border: "1px solid rgba(255,255,255,0.08)",

                  borderRadius: "999px",

                  padding: "8px 14px",

                  color: "var(--text-secondary)",

                  fontSize: "0.85rem",

                  fontWeight: "400",

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
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
      {/* showClearActive */}
      {showClearActive && (
        <div
          onClick={() =>
            setShowClearActive(
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
            onClick={async () => {
              await handleClearActiveTasks();

              setShowClearActive(
                false
              );
            }}
            style={{
              width: "400px",
              padding: "28px",
              borderRadius: "24px",
              background: "rgba(20,20,20,0.85)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h3
              style={{
                marginBottom: "12px",
                fontWeight: "400",
              }}
            >
              Clear active tasks?
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
                  setShowClearActive(
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

                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    "#ff6b6b";

                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    "#ff6b6b";

                  e.currentTarget.style.background =
                    "transparent";
                }}
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setTasks((prev) =>
                    prev.filter(
                      (task) =>
                        task.completed
                    )
                  );

                  setToast("Active tasks cleared");

                  setTimeout(() => {
                    setToast("");
                  }, 3000);

                  setShowClearActive(
                    false
                  );
                }}

                style={{
                  background: "transparent",

                  border: "1px solid rgba(255,255,255,0.08)",

                  borderRadius: "999px",

                  padding: "8px 14px",

                  color: "var(--text-secondary)",

                  fontSize: "0.85rem",

                  fontWeight: "400",

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
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
      <Toast
        message={toast}
      />
    </MainLayout>
  );
}

export default Tasks;