import MainLayout from "../layouts/MainLayout";

import { useState } from "react";

import TaskModal from "../components/Tasks/TaskModal";
import CompletedTasks from "../components/Tasks/CompletedTasks";
import ActiveTasks from "../components/Tasks/ActiveTasks";
import TaskDetailsModal from "../components/Tasks/TaskDetailsModal";
import TaskStats from "../components/Tasks/TaskStats";
import TaskActivity from "../components/Tasks/TaskActivity";

import Toast from "../components/Toast";

import { initialTasks } from "../data/tasks";

function Tasks() {
  const [showTaskModal, setShowTaskModal] =
    useState(false);

  const [selectedTask, setSelectedTask] =
    useState(null);

  const [editingTask,
    setEditingTask] =
    useState(null);

  const [tasks, setTasks] =
    useState(initialTasks);

  const [toast, setToast] =
    useState("");

  const [lastCompletedTask,
    setLastCompletedTask] =
    useState(null);

  const [lastDeletedTask,
    setLastDeletedTask] =
    useState(null);

  const [completionTimeout,
    setCompletionTimeout] =
    useState(null);

  const [showClearCompleted,
    setShowClearCompleted] =
    useState(false);

  const [showClearActive,
    setShowClearActive] =
    useState(false);

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
            setLastCompletedTask={
              setLastCompletedTask
            }
            setLastDeletedTask={
              setLastDeletedTask
            }
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
          />

          <CompletedTasks
            tasks={tasks}
            setTasks={setTasks}
            onClearAll={() =>
              setShowClearCompleted(true)
            }
            setToast={setToast}
            setLastDeletedTask={
              setLastDeletedTask
            }
            setLastCompletedTask={
              setLastCompletedTask
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
          onSave={(newTask) => {
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
          onSave={(updatedTask) => {
            setTasks((prev) =>
              prev.map((task) =>
                task.id ===
                  updatedTask.id
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
              This action cannot be
              undone.
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
                onClick={() => {
                  setTasks((prev) =>
                    prev.filter(
                      (task) =>
                        !task.completed
                    )
                  );

                  setLastCompletedTask(
                    null
                  );

                  setLastDeletedTask(
                    null
                  );

                  setToast(
                    "Completed tasks cleared"
                  );

                  setTimeout(() => {
                    setToast("");
                  }, 3000);

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
            onClick={(e) =>
              e.stopPropagation()
            }
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

                  setLastCompletedTask(
                    null
                  );

                  setLastDeletedTask(
                    null
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
        actionLabel={
          lastCompletedTask ||
            lastDeletedTask
            ? "Undo"
            : null
        }
        onAction={() => {
          if (lastDeletedTask) {
            const {
              restoreToCompleted,
              ...taskToRestore
            } = lastDeletedTask;

            setTasks((prev) => [
              taskToRestore,
              ...prev,
            ]);

            setLastDeletedTask(
              null
            );

            setToast("");

            return;
          }

          if (completionTimeout) {
            clearTimeout(
              completionTimeout
            );

            setCompletionTimeout(
              null
            );
          }

          if (!lastCompletedTask)
            return;

          setTasks((prev) =>
            prev.map((task) =>
              task.id ===
                lastCompletedTask.id
                ? {
                  ...task,
                  completed: false,
                  pendingCompletion: false,
                }
                : task
            )
          );

          setToast("");

          setLastCompletedTask(
            null
          );

          setLastDeletedTask(
            null
          );
        }}
      />
    </MainLayout>
  );
}

export default Tasks;