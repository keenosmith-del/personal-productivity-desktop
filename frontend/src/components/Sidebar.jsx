import { NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { useState, useEffect, useRef } from "react";

import TaskModal from "../components/Tasks/TaskModal";
import ProjectModal from "../components/Projects/ProjectModal";
import GoalModal from "../components/Goals/GoalModal";
import ReminderModal from "../components/Reminders/ReminderModal";
import NoteModal from "../components/Notes/NoteModal";
import AlarmModal from "../components/Alarms/AlarmModal";

import { createTask } from "../services/taskService";
import { createProject } from "../services/projectService";
import { createGoal } from "../services/goalService";
import { createReminder } from "../services/reminderService";
import { createNote } from "../services/noteService";
import { createAlarm } from "../services/alarmService";

import Toast from "../components/Toast";
import FloatingLayer from "../components/FloatingLayer";

const API_BASE_URL =
  "http://localhost:5050";

import {
  Grip,
  CheckSquare,
  Sprout,
  Calendar,
  Bell,
  AlarmClock,
  Coffee,
  User,
  Settings,
  NotebookPen,
  Folder,
  Search,
  Plus,
  CircleArrowLeft,
  Megaphone,
  CircleAlert,
} from "lucide-react";

function Sidebar({ collapsed, setCollapsed }) {
  const { user } = useAuth();

  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "?";

  const quickAddRef =
    useRef(null);

  const navItemRef = useRef(null);

  const [showQuickAdd, setShowQuickAdd] =
    useState(false);

  const [showTaskModal, setShowTaskModal] =
    useState(false);

  const [showGoalModal, setShowGoalModal] =
    useState(false);

  const [showProjectModal, setShowProjectModal] =
    useState(false);

  const [showReminderModal, setShowReminderModal] =
    useState(false);

  const [showNoteModal, setShowNoteModal] =
    useState(false);

  const [showAlarmModal, setShowAlarmModal] =
    useState(false);

  const [showTooltip, setShowTooltip] =
    useState(null);

  const [toast, setToast] =
    useState("");

  // HANDLERS
  // task
  const handleCreateTask = async (
    taskData
  ) => {
    try {
      await createTask(taskData);

      window.dispatchEvent(
        new Event("data-changed")
      );

      setShowTaskModal(false);

      setShowQuickAdd(false);

      setToast("Task created");

      setTimeout(() => {
        setToast("");
      }, 3000);

    } catch (error) {
      console.error(error);
    }
  };

  // project
  const handleCreateProject = async (
    projectData
  ) => {
    try {
      await createProject(projectData);

      window.dispatchEvent(
        new Event("data-changed")
      );

      setShowProjectModal(false);

      setShowQuickAdd(false);

      setToast("Project created");

      setTimeout(() => {
        setToast("");
      }, 3000);

    } catch (error) {
      console.error(error);
    }
  };

  // goal
  const handleCreateGoal = async (
    goalData
  ) => {
    try {
      await createGoal(goalData);

      window.dispatchEvent(
        new Event("data-changed")
      );

      setShowGoalModal(false);

      setShowQuickAdd(false);

      setToast("Goal created");

      setTimeout(() => {
        setToast("");
      }, 3000);

    } catch (error) {
      console.error(error);
    }
  };

  // reminder
  const handleCreateReminder = async (
    reminderData
  ) => {
    try {
      await createReminder(reminderData);

      window.dispatchEvent(
        new Event("data-changed")
      );

      setShowReminderModal(false);

      setShowQuickAdd(false);

      setToast("Reminder created");

      setTimeout(() => {
        setToast("");
      }, 3000);

    } catch (error) {
      console.error(error);
    }
  };

  // note
  const handleCreateNote = async (
    noteData
  ) => {
    try {
      await createNote(noteData);

      window.dispatchEvent(
        new Event("data-changed")
      );

      setShowNoteModal(false);

      setShowQuickAdd(false);

      setToast("Note created");

      setTimeout(() => {
        setToast("");
      }, 3000);

    } catch (error) {
      console.error(error);
    }
  };

  // alarm
  const handleCreateAlarm = async (
    alarmData
  ) => {
    try {
      await createAlarm(alarmData);

      window.dispatchEvent(
        new Event("data-changed")
      );

      setShowAlarmModal(false);

      setShowQuickAdd(false);

      setToast("Alarm created");

      setTimeout(() => {
        setToast("");
      }, 3000);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        quickAddRef.current &&
        !quickAddRef.current.contains(
          event.target
        )
      ) {
        setShowQuickAdd(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const mainNavItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: Grip,
    },
    {
      label: "Urgent",
      path: "/urgent",
      icon: CircleAlert,
    },
    {
      label: "Tasks",
      path: "/tasks",
      icon: CheckSquare,
    },
    {
      label: "Goals",
      path: "/goals",
      icon: Sprout,
    },
    {
      label: "Projects",
      path: "/projects",
      icon: Folder,
    },
    {
      label: "Reminders",
      path: "/reminders",
      icon: Bell,
    },
    {
      label: "Alarms",
      path: "/alarms",
      icon: AlarmClock,
    },
    {
      label: "Notes",
      path: "/notes",
      icon: NotebookPen,
    },
    {
      label: "Calendar",
      path: "/calendar",
      icon: Calendar,
    },
    {
      label: "Notifications",
      path: "/notifications",
      icon: Megaphone,
    },
    {
      label: "Search",
      path: "/search",
      icon: Search,
    },
  ];

  const accountNavItems = [
    {
      label: "Logout",
      path: "/",
      icon: CircleArrowLeft,
    },
    {
      label: "Account",
      path: "/account",
      icon: Settings,
    },
  ];

  const renderNavItem = (item) => {
    const Icon = item.icon;

    return (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={() =>
          setShowTooltip(null)
        }
        style={({ isActive }) => ({
          display: "flex",
          alignItems: "center",

          justifyContent: collapsed
            ? "center"
            : "flex-start",

          gap: collapsed ? "0" : "8px",

          padding: "6px 10px",

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

          if (collapsed) {
            setShowTooltip(item.label);

            setShowQuickAdd(false);
          }

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
          setShowTooltip(null);

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
          ref={
            showTooltip === item.label
              ? navItemRef
              : null
          }
          style={{
            width: "24px",
            height: "24px",
            minWidth: "24px",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            position: "relative",
          }}
        >
          <Icon
            size={18}
            strokeWidth={1.2}
          />
        </div>

        {!collapsed && (
          <span
            style={{
              fontSize: "0.82rem",
              fontWeight: "250",
              letterSpacing: "-0.01em",
            }}
          >
            {item.label}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <aside
      style={{
        position: "fixed",

        top: 0,
        left: 0,

        height: "100vh",

        width: collapsed
          ? "88px"
          : "280px",

        transition:
          "all 0.25s ease",

        padding: collapsed
          ? "12px"
          : "20px",

        flexShrink: 0,

        zIndex: 100,
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

          display: "flex",
          flexDirection: "column",

          padding: collapsed
            ? "12px"
            : "20px",
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

              fontWeight: "250",

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
          to="/account"
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

              gap: "10px",

              marginBottom: "16px",

              paddingBottom: "16px",

              borderBottom:
                "1px solid var(--glass-border)",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",

                borderRadius: "50%",

                background:
                  "rgba(255,255,255,0.08)",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                fontWeight: "300",
                fontSize: "1rem",
              }}
            >
              {user?.avatar ? (
                <img
                  src={`${API_BASE_URL}${user.avatar}`}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                initials
              )}
            </div>

            {!collapsed && (
              <div>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  Hi,
                </p>

                <p
                  style={{
                    fontWeight: "400",
                  }}
                >
                  {user?.name.split(" ")[0] || "Loading..."}
                </p>
              </div>
            )}
          </div>
        </NavLink>

        <div
          ref={quickAddRef}
          style={{
            position: "relative",
            marginBottom: "8px",
          }}
        >
          <button
            onClick={() => {
              setShowTooltip(false);

              setShowQuickAdd(
                !showQuickAdd
              );
            }}
            style={{
              width: "100%",

              display: "flex",

              alignItems: "center",

              justifyContent: collapsed
                ? "center"
                : "flex-start",

              gap: collapsed
                ? "0"
                : "8px",

              padding: "6px 10px",

              borderRadius:
                "var(--radius-small)",

              border: "none",

              background:
                "transparent",

              color:
                "var(--text-primary)",

              cursor: "pointer",

              transition:
                "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "rgba(255,255,255,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "transparent";
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
              <Plus
                size={18}
                strokeWidth={1.2}
              />
            </div>

            {!collapsed && (
              <span
                style={{
                  fontSize: "0.82rem",
                  fontWeight: "250",
                  letterSpacing:
                    "-0.01em",
                }}
              >
                Quick Add
              </span>
            )}
          </button>

          {showQuickAdd && (
            <div
              style={{
                position: "absolute",

                top: "42px",

                left: collapsed ? "52px" : "0",

                width: "180px",

                background:
                  "rgba(20, 20, 20, 0)",

                backdropFilter:
                  "blur(8px)",

                border:
                  "1px solid rgba(255,255,255,0.10)",

                boxShadow:
                  "0 20px 50px rgba(0,0,0,0.35)",

                borderRadius: "18px",

                padding: "8px",

                display: "flex",

                flexDirection: "column",

                gap: "4px",

                zIndex: 2001,
              }}
            >
              <div
                onClick={() => {
                  setShowQuickAdd(false);
                  setShowTaskModal(true);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",

                  background: "transparent",

                  border: "none",

                  color: "var(--text-primary)",

                  padding: "10px 14px",

                  borderRadius: "999px",

                  cursor: "pointer",

                  textAlign: "left",

                  fontSize: "0.78rem",

                  fontWeight: "300",

                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.05)";

                  e.currentTarget.style.transform =
                    "translateX(2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "transparent";

                  e.currentTarget.style.transform =
                    "translateX(0)";
                }}
              >
                <CheckSquare
                  size={15}
                  strokeWidth={1.4}
                  style={{
                    opacity: 0.65,
                  }}
                />

                <span>Task</span>
              </div>

              <div
                onClick={() => {
                  setShowQuickAdd(false);
                  setShowGoalModal(true);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",

                  background: "transparent",

                  border: "none",

                  color: "var(--text-primary)",

                  padding: "10px 14px",

                  borderRadius: "999px",

                  cursor: "pointer",

                  textAlign: "left",

                  fontSize: "0.78rem",

                  fontWeight: "300",

                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.05)";

                  e.currentTarget.style.transform =
                    "translateX(2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "transparent";

                  e.currentTarget.style.transform =
                    "translateX(0)";
                }}
              >
                <Sprout
                  size={15}
                  strokeWidth={1.4}
                  style={{
                    opacity: 0.65,
                  }}
                />

                <span>Goal</span>
              </div>

              <div
                onClick={() => {
                  setShowQuickAdd(false);
                  setShowProjectModal(true);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",

                  background: "transparent",

                  border: "none",

                  color: "var(--text-primary)",

                  padding: "10px 14px",

                  borderRadius: "999px",

                  cursor: "pointer",

                  textAlign: "left",

                  fontSize: "0.78rem",

                  fontWeight: "300",

                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.05)";

                  e.currentTarget.style.transform =
                    "translateX(2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "transparent";

                  e.currentTarget.style.transform =
                    "translateX(0)";
                }}
              >
                <Folder
                  size={15}
                  strokeWidth={1.4}
                  style={{
                    opacity: 0.65,
                  }}
                />

                <span>Project</span>
              </div>

              <div
                onClick={() => {
                  setShowQuickAdd(false);
                  setShowReminderModal(true);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",

                  background: "transparent",

                  border: "none",

                  color: "var(--text-primary)",

                  padding: "10px 14px",

                  borderRadius: "999px",

                  cursor: "pointer",

                  textAlign: "left",

                  fontSize: "0.78rem",

                  fontWeight: "300",

                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.05)";

                  e.currentTarget.style.transform =
                    "translateX(2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "transparent";

                  e.currentTarget.style.transform =
                    "translateX(0)";
                }}
              >
                <Bell
                  size={15}
                  strokeWidth={1.4}
                  style={{
                    opacity: 0.65,
                  }}
                />

                <span>Reminder</span>
              </div>

              <div
                onClick={() => {
                  setShowQuickAdd(false);
                  setShowNoteModal(true);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",

                  background: "transparent",

                  border: "none",

                  color: "var(--text-primary)",

                  padding: "10px 14px",

                  borderRadius: "999px",

                  cursor: "pointer",

                  textAlign: "left",

                  fontSize: "0.78rem",

                  fontWeight: "300",

                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.05)";

                  e.currentTarget.style.transform =
                    "translateX(2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "transparent";

                  e.currentTarget.style.transform =
                    "translateX(0)";
                }}
              >
                <NotebookPen
                  size={15}
                  strokeWidth={1.4}
                  style={{
                    opacity: 0.65,
                  }}
                />

                <span>Note</span>
              </div>

              <div
                onClick={() => {
                  setShowQuickAdd(false);
                  setShowAlarmModal(true);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",

                  background: "transparent",

                  border: "none",

                  color: "var(--text-primary)",

                  padding: "10px 14px",

                  borderRadius: "999px",

                  cursor: "pointer",

                  textAlign: "left",

                  fontSize: "0.78rem",

                  fontWeight: "300",

                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.05)";

                  e.currentTarget.style.transform =
                    "translateX(2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "transparent";

                  e.currentTarget.style.transform =
                    "translateX(0)";
                }}
              >
                <AlarmClock
                  size={15}
                  strokeWidth={1.4}
                  style={{
                    opacity: 0.65,
                  }}
                />

                <span>Alarm</span>
              </div>
            </div>
          )}
        </div>

        {/* Main Navigation */}

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {mainNavItems.map(
            renderNavItem
          )}
        </nav>

        {/* Break Section */}

        <div
          style={{
            marginTop: "2px",

            display: "flex",
            flexDirection: "column",

            gap: "2px",
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
            minHeight: "12px",
          }}
        />

        {/* Account Section */}

        <div
          style={{
            borderTop:
              "1px solid var(--glass-border)",

            paddingTop: "10px",

            display: "flex",
            flexDirection: "column",

            gap: "2px",
          }}
        >
          {accountNavItems.map(
            renderNavItem
          )}
        </div>
      </div>
      {/* tooltips */}
      <FloatingLayer
        anchorRef={navItemRef}
        open={collapsed && Boolean(showTooltip)}
        placement="right"
        offset={12}
        refreshKey={showTooltip}
      >
        <div
          style={{
            minWidth: "120px",

            padding: "8px 14px",

            borderRadius: "36px",

            background:
              "rgba(18, 18, 18, 0)",

            backdropFilter:
              "blur(3px)",

            border:
              "1px solid rgba(255,255,255,0.02)",

            boxShadow:
              "0 14px 40px rgba(0,0,0,0.2)",

            textAlign: "center",

            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontSize: "0.6rem",

              fontWeight: "250",

              color:
                "var(--text-secondary)",
            }}
          >
            {showTooltip}
          </div>
        </div>
      </FloatingLayer>

      {/* quick add modals */}
      {showTaskModal && (
        <TaskModal
          mode="create"

          onClose={() =>
            setShowTaskModal(false)
          }

          onSave={handleCreateTask}
        />
      )}
      {showGoalModal && (
        <GoalModal
          mode="create"

          onClose={() =>
            setShowGoalModal(false)
          }

          onSave={handleCreateGoal}
        />
      )}
      {showProjectModal && (
        <ProjectModal
          mode="create"

          onClose={() =>
            setShowProjectModal(false)
          }

          onSave={handleCreateProject}
        />
      )}
      {showReminderModal && (
        <ReminderModal
          mode="create"

          onClose={() =>
            setShowReminderModal(false)
          }

          onSave={handleCreateReminder}
        />
      )}
      {showNoteModal && (
        <NoteModal
          mode="create"

          onClose={() =>
            setShowNoteModal(false)
          }

          onSave={handleCreateNote}
        />
      )}
      {showAlarmModal && (
        <AlarmModal
          mode="create"

          onClose={() =>
            setShowAlarmModal(false)
          }

          onSave={handleCreateAlarm}
        />
      )}
      <Toast message={toast} />
    </aside>
  );
}

export default Sidebar;