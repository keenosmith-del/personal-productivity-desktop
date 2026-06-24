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

import TaskCard from "../components/Tasks/TaskCard";

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

  const [openTaskMenu, setOpenTaskMenu] =
    useState(null);

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

  const activeTasks = tasks.filter(
    (task) =>
      !task.completed &&
      task.status === "Active"
  );

  const inProgressTasks = tasks.filter(
    (task) =>
      !task.completed &&
      task.status === "In Progress"
  );

  const pausedTasks = tasks.filter(
    (task) =>
      !task.completed &&
      task.status === "Paused"
  );

  const completedTasks = tasks.filter(
    (task) =>
      task.status === "Completed"
  );

  const totalTasks =
    tasks.length;

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

  const [activeTab, setActiveTab] =
    useState("overview");

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

        setSelectedTask((prev) =>
          prev?._id === updatedTask._id
            ? updatedTask
            : prev
        );

        setEditingTask((prev) =>
          prev?._id === updatedTask._id
            ? updatedTask
            : prev
        );

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

        setSelectedTask((prev) =>
          prev?._id === updatedTask._id
            ? updatedTask
            : prev
        );

        setEditingTask((prev) =>
          prev?._id === updatedTask._id
            ? updatedTask
            : prev
        );

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
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* HEADER */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontWeight: "400",
                    letterSpacing:
                      "-0.03em",
                  }}
                >
                  Tasks
                </h1>

                <p
                  style={{
                    marginTop: "8px",
                    color:
                      "var(--text-secondary)",
                    fontWeight: "300",
                  }}
                >
                  Manage and organize your tasks.
                </p>
              </div>

              <div>
                Search / Sort / Filter
              </div>
            </div>

            <p
              style={{
                marginTop: "6px",
                marginBottom: 0,

                fontSize: "0.8rem",

                color: "var(--text-secondary)",

                opacity: 0.65,

                fontWeight: "300",
              }}
            >
              {totalTasks + " Tasks" || "No tasks yet"}
            </p>
          </div>

          {/* AVATAR */}
          <div
            style={{
              display: "flex",
              justifyContent:
                "center",
            }}
          >
            <div
              style={{
                width: "88px",
                height: "88px",

                borderRadius: "50%",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",

                border:
                  "1px solid rgba(255,255,255,0.12)",

                fontSize: "2rem",

                fontWeight: "300",
              }}
            >
              ✓
            </div>
          </div>

          {/* TABS */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "36px",

              position: "relative",
            }}
          >
            <button
              onClick={() =>
                setActiveTab(
                  "overview"
                )
              }
              style={{
                background: "none",

                border: "none",

                color:
                  activeTab === "overview"
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",

                fontSize: "0.9rem",

                fontWeight: "300",

                cursor: "pointer",

                paddingBottom: "12px",

                borderBottom:
                  activeTab === "overview"
                    ? "1px none rgba(255,255,255,0.25)"
                    : "1px none transparent",

                transition:
                  "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (
                  activeTab !==
                  "overview"
                ) {
                  e.currentTarget.style.color =
                    "var(--text-primary)";
                }
              }}

              onMouseLeave={(e) => {
                if (
                  activeTab !==
                  "overview"
                ) {
                  e.currentTarget.style.color =
                    "var(--text-secondary)";
                }
              }}
            >
              Overview
            </button>

            <button
              onClick={() =>
                setActiveTab(
                  "completed"
                )
              }
              style={{
                background: "none",

                border: "none",

                color:
                  activeTab === "completed"
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",

                fontSize: "0.9rem",

                fontWeight: "300",

                cursor: "pointer",

                paddingBottom: "12px",

                borderBottom:
                  activeTab === "completed"
                    ? "1px none rgba(255,255,255,0.25)"
                    : "1px none transparent",

                transition:
                  "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (
                  activeTab !==
                  "completed"
                ) {
                  e.currentTarget.style.color =
                    "var(--text-primary)";
                }
              }}

              onMouseLeave={(e) => {
                if (
                  activeTab !==
                  "completed"
                ) {
                  e.currentTarget.style.color =
                    "var(--text-secondary)";
                }
              }}
            >
              Completed
            </button>

            <button
              onClick={() =>
                setActiveTab(
                  "categories"
                )
              }
              style={{
                background: "none",

                border: "none",

                color:
                  activeTab === "categories"
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",

                fontSize: "0.9rem",

                fontWeight: "300",

                cursor: "pointer",

                paddingBottom: "12px",

                borderBottom:
                  activeTab === "categories"
                    ? "1px none rgba(255,255,255,0.25)"
                    : "1px none transparent",

                transition:
                  "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (
                  activeTab !==
                  "categories"
                ) {
                  e.currentTarget.style.color =
                    "var(--text-primary)";
                }
              }}

              onMouseLeave={(e) => {
                if (
                  activeTab !==
                  "categories"
                ) {
                  e.currentTarget.style.color =
                    "var(--text-secondary)";
                }
              }}
            >
              Categories
            </button>
          </div>

          {/* DIVIDER */}
          <div
            style={{
              height: "1px",
              background:
                "rgba(255,255,255,0.06)",
            }}
          />

          {/* CONTENT */}
          {activeTab === "overview" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(4, minmax(0, 1fr))",
                gap: "24px",
              }}
            >
              {/* COLUMN START */}
              <div
                style={{
                  background: "var(--glass-bg)",

                  border:
                    "1px solid var(--glass-border)",

                  borderRadius:
                    "var(--radius-large)",

                  backdropFilter:
                    "blur(20px)",

                  WebkitBackdropFilter:
                    "blur(20px)",

                  height: "600px",

                  display: "flex",

                  flexDirection: "column",

                  overflow: "hidden",
                }}
              >

                {/* STICKY HEADER */}
                <div
                  style={{
                    padding: "20px 24px",

                    borderBottom:
                      "1px solid rgba(255,255,255,0.06)",

                    display: "flex",

                    justifyContent:
                      "space-between",

                    alignItems: "center",

                    flexShrink: 0,
                  }}
                >

                  {/* TITLE */}
                  <div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                      }}
                    >
                      Active
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {
                        tasks.filter(
                          (task) =>
                            !task.completed &&
                            task.status ===
                            "Active"
                        ).length
                      }{" "}
                      {activeTasks.length === 1 ? ("Task") : ("Tasks")}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setShowTaskModal(true)
                    }
                    style={{
                      width: "32px",
                      height: "32px",

                      borderRadius: "999px",

                      border:
                        "1px solid rgba(255,255,255,0.08)",

                      background:
                        "rgba(255,255,255,0.04)",

                      color:
                        "var(--text-primary)",

                      cursor: "pointer",

                      fontSize: "1rem",

                      transition:
                        "all 0.2s ease",
                    }}
                  >
                    +
                  </button>
                </div>

                {/* SCROLL AREA UNDER HEADER */}
                <div
                  style={{
                    flex: 1,

                    overflowY: "auto",

                    padding: "16px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "12px",
                  }}
                >

                  {/* INDIVIDUAL ACTIVE TASK CARDS */}
                  {activeTasks.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",

                        height: "100%",

                        textAlign: "center",

                        color: "var(--text-secondary)",

                        opacity: 0.45,
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.9rem",
                        }}
                      >
                        No active tasks
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Click + to create one
                      </p>
                    </div>
                  ) : (
                    activeTasks.map((task) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onClick={setSelectedTask}

                        openTaskMenu={openTaskMenu}
                        setOpenTaskMenu={setOpenTaskMenu}

                        onView={setSelectedTask}
                        onEdit={setEditingTask}

                        onDelete={handleDeleteTask}

                        onComplete={handleCompleteTask}
                        onRestore={handleRestoreTask}
                      />
                    ))
                  )}

                </div>
              </div>

              {/* COLUMN IN PROGRESS */}
              <div
                style={{
                  background: "var(--glass-bg)",

                  border:
                    "1px solid var(--glass-border)",

                  borderRadius:
                    "var(--radius-large)",

                  backdropFilter:
                    "blur(20px)",

                  WebkitBackdropFilter:
                    "blur(20px)",

                  height: "600px",

                  display: "flex",

                  flexDirection: "column",

                  overflow: "hidden",
                }}
              >

                {/* STICKY HEADER */}
                <div
                  style={{
                    padding: "20px 24px",

                    borderBottom:
                      "1px solid rgba(255,255,255,0.06)",

                    display: "flex",

                    justifyContent:
                      "space-between",

                    alignItems: "center",

                    flexShrink: 0,
                  }}
                >

                  {/* TITLE */}
                  <div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                      }}
                    >
                      In Progress
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {
                        tasks.filter(
                          (task) =>
                            !task.completed &&
                            task.status ===
                            "In Progress"
                        ).length
                      }{" "}
                      {inProgressTasks.length === 1 ? ("Task") : ("Tasks")}
                    </div>
                  </div>
                </div>

                {/* SCROLL AREA UNDER HEADER */}
                <div
                  style={{
                    flex: 1,

                    overflowY: "auto",

                    padding: "16px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "12px",
                  }}
                >

                  {/* INDIVIDUAL IN PROGRESS TASK CARDS */}
                  {inProgressTasks.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",

                        height: "100%",

                        textAlign: "center",

                        color: "var(--text-secondary)",

                        opacity: 0.45,
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.9rem",
                        }}
                      >
                        Nothing in progress
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Change the status of a task to get started
                      </p>
                    </div>
                  ) : (
                    inProgressTasks.map((task) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onClick={setSelectedTask}

                        openTaskMenu={openTaskMenu}
                        setOpenTaskMenu={setOpenTaskMenu}

                        onView={setSelectedTask}
                        onEdit={setEditingTask}

                        onDelete={handleDeleteTask}
                        onComplete={handleCompleteTask}
                        onRestore={handleRestoreTask}
                      />
                    ))
                  )}

                </div>
              </div>

              {/* COLUMN PAUSED */}
              <div
                style={{
                  background: "var(--glass-bg)",

                  border:
                    "1px solid var(--glass-border)",

                  borderRadius:
                    "var(--radius-large)",

                  backdropFilter:
                    "blur(20px)",

                  WebkitBackdropFilter:
                    "blur(20px)",

                  height: "600px",

                  display: "flex",

                  flexDirection: "column",

                  overflow: "hidden",
                }}
              >

                {/* STICKY HEADER */}
                <div
                  style={{
                    padding: "20px 24px",

                    borderBottom:
                      "1px solid rgba(255,255,255,0.06)",

                    display: "flex",

                    justifyContent:
                      "space-between",

                    alignItems: "center",

                    flexShrink: 0,
                  }}
                >

                  {/* TITLE */}
                  <div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                      }}
                    >
                      Paused
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {
                        tasks.filter(
                          (task) =>
                            !task.completed &&
                            task.status ===
                            "Paused"
                        ).length
                      }{" "}
                      {pausedTasks.length === 1 ? ("Task") : ("Tasks")}
                    </div>
                  </div>
                </div>

                {/* SCROLL AREA UNDER HEADER */}
                <div
                  style={{
                    flex: 1,

                    overflowY: "auto",

                    padding: "16px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "12px",
                  }}
                >

                  {/* INDIVIDUAL PAUSED TASK CARDS */}
                  {pausedTasks.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",

                        height: "100%",

                        textAlign: "center",

                        color: "var(--text-secondary)",

                        opacity: 0.45,
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.9rem",
                        }}
                      >
                        No paused tasks
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Paused items will appear here
                      </p>
                    </div>
                  ) : (
                    pausedTasks.map((task) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onClick={setSelectedTask}

                        openTaskMenu={openTaskMenu}
                        setOpenTaskMenu={setOpenTaskMenu}

                        onView={setSelectedTask}
                        onEdit={setEditingTask}

                        onDelete={handleDeleteTask}
                        onComplete={handleCompleteTask}
                        onRestore={handleRestoreTask}
                      />
                    ))
                  )}

                </div>
              </div>

              {/* COLUMN COMPLETED */}
              <div
                style={{
                  background: "var(--glass-bg)",

                  border:
                    "1px solid var(--glass-border)",

                  borderRadius:
                    "var(--radius-large)",

                  backdropFilter:
                    "blur(20px)",

                  WebkitBackdropFilter:
                    "blur(20px)",

                  height: "600px",

                  display: "flex",

                  flexDirection: "column",

                  overflow: "hidden",
                }}
              >

                {/* STICKY HEADER */}
                <div
                  style={{
                    padding: "20px 24px",

                    borderBottom:
                      "1px solid rgba(255,255,255,0.06)",

                    display: "flex",

                    justifyContent:
                      "space-between",

                    alignItems: "center",

                    flexShrink: 0,
                  }}
                >

                  {/* TITLE */}
                  <div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                      }}
                    >
                      Completed
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {
                        tasks.filter(
                          (task) =>
                            task.status ===
                            "Completed"
                        ).length
                      }{" "}
                      {completedTasks.length === 1 ? ("Task") : ("Tasks")}
                    </div>
                  </div>
                </div>

                {/* SCROLL AREA UNDER HEADER */}
                <div
                  style={{
                    flex: 1,

                    overflowY: "auto",

                    padding: "16px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "12px",
                  }}
                >

                  {/* INDIVIDUAL COMPLETED TASK CARDS */}
                  {completedTasks.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",

                        height: "100%",

                        textAlign: "center",

                        color: "var(--text-secondary)",

                        opacity: 0.45,
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.9rem",
                        }}
                      >
                        No completed tasks
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Complete a task to see it here
                      </p>
                    </div>
                  ) : (
                    completedTasks.map((task) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onClick={setSelectedTask}

                        openTaskMenu={openTaskMenu}
                        setOpenTaskMenu={setOpenTaskMenu}

                        onView={setSelectedTask}
                        onEdit={setEditingTask}

                        onDelete={handleDeleteTask}
                        onComplete={handleCompleteTask}
                        onRestore={handleRestoreTask}
                      />
                    ))
                  )}

                </div>
              </div>
            </div>
          )}

          {activeTab === "completed" && (
            <div>
              Completed Content
            </div>
          )}

          {activeTab === "categories" && (
            <div>
              Categories Content
            </div>
          )}



          {/* DEPRECATED */}
          {/*
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
          */}

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
          onDeleteTask={handleDeleteTask}
          setToast={setToast}
          onEditTask={setEditingTask}
          onCompleteTask={
            handleCompleteTask
          }
          onRestoreTask={
            handleRestoreTask
          }
        />
      )}
      {editingTask && (
        <TaskModal
          mode="edit"
          task={editingTask}
          onCompleteTask={
            handleCompleteTask
          }
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