import MainLayout from "../layouts/MainLayout";

import {
  Search,
  ArrowUpDown,
  Filter,
  Ellipsis,
  ArrowLeft,
  ArrowRight,
  LayoutGrid,
  Sparkles,
  Shapes,
  ChartLine,
  CircleAlert,
  Siren,
} from "lucide-react";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  getTasks,
  updateTask,
  deleteTask,
} from "../services/taskService";

import {
  getProjects,
  updateProject,
  deleteProject,
} from "../services/projectService";

import {
  getGoals,
  updateGoal,
  deleteGoal,
} from "../services/goalService";

import {
  getReminders,
  updateReminder,
  deleteReminder,
} from "../services/reminderService";

import TaskModal from "../components/Tasks/TaskModal";
import ProjectModal from "../components/Projects/ProjectModal";
import GoalModal from "../components/Goals/GoalModal";
import ReminderModal from "../components/Reminders/ReminderModal";

import Toast from "../components/Toast";

import TaskCard from "../components/Tasks/TaskCard";
import ProjectCard from "../components/Projects/ProjectCard";
import GoalCard from "../components/Goals/GoalCard";
import ReminderCard from "../components/Reminders/ReminderCard";

function Urgent() {
  // REFS
  const sortRef = useRef(null);

  const filterRef = useRef(null);

  const searchInputRef = useRef(null);

  const moreRef = useRef(null);

  // GET
  const [tasks, setTasks] =
    useState([]);

  const [projects, setProjects] =
    useState([]);

  const [goals, setGoals] =
    useState([]);

  const [reminders, setReminders] =
    useState([]);

  const isOverdue = (item) => {
    if (item.completed) {
      return false;
    }

    if (item.status === "Paused") {
      return false;
    }

    if (!item.dueDate) {
      return false;
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(item.dueDate);

    dueDate.setHours(0, 0, 0, 0);

    return dueDate < today;
  };

  // COMPONENT STATES
  const highPriorityTasks =
    tasks.filter(
      (task) =>
        task.priority === "High" &&
        !task.completed
    );

  const highPriorityProjects =
    projects.filter(
      (project) =>
        project.priority === "High" &&
        !project.completed
    );

  const highPriorityGoals =
    goals.filter(
      (goal) =>
        goal.priority === "High" &&
        !goal.completed
    );

  const highPriorityReminders =
    reminders.filter(
      (reminder) =>
        reminder.priority === "High" &&
        !reminder.completed
    );

  const overdueTasks =
    tasks.filter(isOverdue);

  const overdueProjects =
    projects.filter(isOverdue);

  const overdueGoals =
    goals.filter(isOverdue);

  const overdueReminders =
    reminders.filter(isOverdue);

  const totalHighPriority =
    highPriorityTasks.length +
    highPriorityProjects.length +
    highPriorityGoals.length +
    highPriorityReminders.length;

  const totalOverdue =
    overdueTasks.length +
    overdueProjects.length +
    overdueGoals.length +
    overdueReminders.length;

  const [searchTerm, setSearchTerm] =
    useState("");

  const [sortBy, setSortBy] =
    useState("newest");

  const [showSortMenu, setShowSortMenu] =
    useState(false);

  const [showFilterMenu, setShowFilterMenu] =
    useState(false);

  const [showClearActive, setShowClearActive] =
    useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [selectedPriority, setSelectedPriority] =
    useState("All");

  const [showActions, setShowActions] =
    useState(false);

  const [showSearchBar, setShowSearchBar] =
    useState(false);

  const [actionsPinned, setActionsPinned] =
    useState(false);

  const [showMoreMenu, setShowMoreMenu] =
    useState(false);

  const [openTaskMenu, setOpenTaskMenu] =
    useState(null);

  const [openProjectMenu, setOpenProjectMenu] =
    useState(null);

  const [openGoalMenu, setOpenGoalMenu] =
    useState(null);

  const [openReminderMenu, setOpenReminderMenu] =
    useState(null);

  // 
  const [selectedTask, setSelectedTask] =
    useState(null);

  const [editingTask, setEditingTask] =
    useState(null);

  const [selectedProject, setSelectedProject] =
    useState(null);

  const [editingProject, setEditingProject] =
    useState(null);

  const [selectedGoal, setSelectedGoal] =
    useState(null);

  const [editingGoal, setEditingGoal] =
    useState(null);

  const [selectedReminder, setSelectedReminder] =
    useState(null);

  const [editingReminder, setEditingReminder] =
    useState(null);

  const [toast, setToast] =
    useState("");

  // LOAD FUNCTIONS
  const loadUrgentData =
    async () => {
      try {
        const [
          taskData,
          projectData,
          goalData,
          reminderData,
        ] = await Promise.all([
          getTasks(),
          getProjects(),
          getGoals(),
          getReminders(),
        ]);

        setTasks(taskData);
        setProjects(projectData);
        setGoals(goalData);
        setReminders(reminderData);

      } catch (error) {
        console.error(error);
      }
    };

  // TASK
  const handleDeleteTask =
    async (taskId) => {
      try {
        await deleteTask(taskId);

        await loadUrgentData();

        setSelectedTask(null);

        setToast("Task deleted");

        setTimeout(() => {
          setToast("");
        }, 3000);

      } catch (error) {
        console.error(error);
      }
    };

  const handleCompleteTask =
    async (task) => {
      try {
        await updateTask(task._id, {
          completed: true,
          status: "Completed",
          completedDate:
            new Date().toLocaleDateString(),
        });

        await loadUrgentData();

        setSelectedTask(null);

      } catch (error) {
        console.error(error);
      }
    };

  const handleRestoreTask =
    async (task) => {
      try {
        await updateTask(task._id, {
          completed: false,
          completedDate: null,
          status: "Active",
        });

        await loadUrgentData();

        setSelectedTask(null);

      } catch (error) {
        console.error(error);
      }
    };

  const handleToggleTaskFlag =
    async (task) => {
      await updateTask(task._id, {
        ...task,
        flagged: !task.flagged,
      });

      await loadUrgentData();
    };

  const handleToggleTaskLike =
    async (task) => {
      await updateTask(task._id, {
        ...task,
        liked: !task.liked,
      });

      await loadUrgentData();
    };

  const handleAddTaskComment =
    async (task) => {
      await updateTask(task._id, {
        ...task,
        commentCount:
          (task.commentCount || 0) + 1,
      });

      await loadUrgentData();
    };

  // PROJECT
  const handleDeleteProject =
    async (projectId) => {
      try {
        await deleteProject(projectId);

        await loadUrgentData();

        setSelectedProject(null);

        setToast("Project deleted");

        setTimeout(() => {
          setToast("");
        }, 3000);

      } catch (error) {
        console.error(error);
      }
    };

  const handleCompleteProject =
    async (project) => {
      try {
        await updateProject(project._id, {
          completed: true,
          status: "Completed",
          completedDate:
            new Date().toLocaleDateString(),
        });

        await loadUrgentData();

        setSelectedProject(null);

      } catch (error) {
        console.error(error);
      }
    };

  const handleRestoreProject =
    async (project) => {
      try {
        await updateProject(project._id, {
          completed: false,
          completedDate: null,
          status: "Active",
        });

        await loadUrgentData();

        setSelectedProject(null);

      } catch (error) {
        console.error(error);
      }
    };

  const handleToggleProjectFlag =
    async (project) => {
      await updateProject(project._id, {
        ...project,
        flagged: !project.flagged,
      });

      await loadUrgentData();
    };

  const handleToggleProjectLike =
    async (project) => {
      await updateProject(project._id, {
        ...project,
        liked: !project.liked,
      });

      await loadUrgentData();
    };

  const handleAddProjectComment =
    async (project) => {
      await updateProject(project._id, {
        ...project,
        commentCount:
          (project.commentCount || 0) + 1,
      });

      await loadUrgentData();
    };

  // GOAL
  const handleDeleteGoal =
    async (goalId) => {
      try {
        await deleteGoal(goalId);

        await loadUrgentData();

        setSelectedGoal(null);

        setToast("Goal deleted");

        setTimeout(() => {
          setToast("");
        }, 3000);

      } catch (error) {
        console.error(error);
      }
    };

  const handleCompleteGoal =
    async (goal) => {
      try {
        await updateGoal(goal._id, {
          completed: true,
          status: "Completed",
          completedDate:
            new Date().toLocaleDateString(),
        });

        await loadUrgentData();

        setSelectedGoal(null);

      } catch (error) {
        console.error(error);
      }
    };

  const handleRestoreGoal =
    async (goal) => {
      try {
        await updateGoal(goal._id, {
          completed: false,
          completedDate: null,
          status: "Active",
        });

        await loadUrgentData();

        setSelectedGoal(null);

      } catch (error) {
        console.error(error);
      }
    };

  const handleToggleGoalFlag =
    async (goal) => {
      await updateGoal(goal._id, {
        ...goal,
        flagged: !goal.flagged,
      });

      await loadUrgentData();
    };

  const handleToggleGoalLike =
    async (goal) => {
      await updateGoal(goal._id, {
        ...goal,
        liked: !goal.liked,
      });

      await loadUrgentData();
    };

  const handleAddGoalComment =
    async (goal) => {
      await updateGoal(goal._id, {
        ...goal,
        commentCount:
          (goal.commentCount || 0) + 1,
      });

      await loadUrgentData();
    };

  // REMINDER
  const handleDeleteReminder =
    async (reminderId) => {
      try {
        await deleteReminder(reminderId);

        await loadUrgentData();

        setSelectedReminder(null);

        setToast("Reminder deleted");

        setTimeout(() => {
          setToast("");
        }, 3000);

      } catch (error) {
        console.error(error);
      }
    };

  const handleCompleteReminder =
    async (reminder) => {
      try {
        await updateReminder(reminder._id, {
          completed: true,
          status: "Completed",
          completedDate:
            new Date().toLocaleDateString(),
        });

        await loadUrgentData();

        setSelectedReminder(null);

      } catch (error) {
        console.error(error);
      }
    };

  const handleRestoreReminder =
    async (reminder) => {
      try {
        await updateReminder(reminder._id, {
          completed: false,
          completedDate: null,
          status: "Active",
        });

        await loadUrgentData();

        setSelectedReminder(null);

      } catch (error) {
        console.error(error);
      }
    };

  const handleToggleReminderFlag =
    async (reminder) => {
      await updateReminder(reminder._id, {
        ...reminder,
        flagged: !reminder.flagged,
      });

      await loadUrgentData();
    };

  const handleToggleReminderLike =
    async (reminder) => {
      await updateReminder(reminder._id, {
        ...reminder,
        liked: !reminder.liked,
      });

      await loadUrgentData();
    };

  const handleAddReminderComment =
    async (reminder) => {
      await updateReminder(reminder._id, {
        ...reminder,
        commentCount:
          (reminder.commentCount || 0) + 1,
      });

      await loadUrgentData();
    };

  //
  useEffect(() => {
    loadUrgentData();
  }, []);

  const urgentTabs = [
    {
      key: "high_priority",
      icon: CircleAlert,
    },
    {
      key: "overdue",
      icon: Siren,
    },
  ];

  const [activeTab, setActiveTab] =
    useState("high_priority");

  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
      if (
        showSortMenu &&
        sortRef.current &&
        !sortRef.current.contains(
          event.target
        )
      ) {
        setShowSortMenu(false);
      }

      if (
        showFilterMenu &&
        filterRef.current &&
        !filterRef.current.contains(
          event.target
        )
      ) {
        setShowFilterMenu(false);
      }

      if (
        showMoreMenu &&
        moreRef.current &&
        !moreRef.current.contains(
          event.target
        )
      ) {
        setShowMoreMenu(false);
      }
    };

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

  const actionIconStyle = {
    width: "32px",

    height: "32px",

    borderRadius: "999px",

    border: "none",

    background: "transparent",

    color: "var(--text-secondary)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    cursor: "pointer",

    transition:
      "all 260ms cubic-bezier(0.22, 1, 0.36, 1)",
  };

  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
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
          <div
            style={{
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* WITHIN HEADER */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontWeight: "400",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Urgent
                </h1>

                <p
                  style={{
                    marginTop: "8px",
                    color: "var(--text-secondary)",
                    fontWeight: "300",
                  }}
                >
                  Manage your high priority and overdue events.
                </p>
              </div>

              {/* TOP RIGHT */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                {/* ALL */}
                <div
                  onMouseEnter={() =>
                    setShowActions(true)
                  }
                  onMouseLeave={() => {
                    if (
                      !actionsPinned &&
                      !showSortMenu &&
                      !showFilterMenu &&
                      !showMoreMenu
                    ) {
                      setShowActions(false);
                    }
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",

                    justifyContent: "flex-end",

                    position: "relative",
                  }}
                >
                  {/* EXPAND ARROW */}
                  <button
                    onClick={() => {
                      if (showActions && actionsPinned) {
                        setShowActions(false);

                        setActionsPinned(false);

                        setShowSearchBar(false);

                        setSearchTerm("");

                        setShowSortMenu(false);

                        setShowFilterMenu(false);
                      }
                    }}
                    style={{
                      width: "36px",
                      height: "36px",

                      borderRadius: "999px",

                      border: "none",

                      background:
                        "rgba(255,255,255,0.025)",

                      color:
                        "var(--text-secondary)",

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      cursor: "pointer",

                      backdropFilter: "blur(28px)",

                      boxShadow:
                        "0 6px 20px rgba(0,0,0,0.28)",

                      transition:
                        "all 320ms cubic-bezier(0.22, 1, 0.36, 1)",

                      transform: showActions
                        ? "translateX(2px)"
                        : "translateX(0)",
                    }}
                  >
                    {actionsPinned ? (
                      <ArrowRight
                        size={16}
                        strokeWidth={1.5}
                      />
                    ) : (
                      <ArrowLeft
                        size={16}
                        strokeWidth={1.5}
                      />
                    )}
                  </button>

                  {/* ACTIONS */}
                  <div
                    style={{
                      width:
                        showActions
                          ? showSearchBar
                            ? "420px"
                            : "280px"
                          : "0px",

                      overflow: "visible",

                      transition: "all 340ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",

                        gap: "8px",

                        overflow: "visible",

                        width:
                          showActions
                            ? showSearchBar
                              ? "500px"
                              : "360px"
                            : "0px",

                        opacity: showActions
                          ? 1
                          : 0,

                        transform: showActions
                          ? "translateX(0)"
                          : "translateX(12px)",

                        transition:
                          "all 340ms cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    >
                      {/* SEARCH / SORT / FILTER */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",

                          gap: "6px",

                          padding: "4px",

                          borderRadius: "999px",

                          background: "rgba(255,255,255,0.025)",

                          backdropFilter: "blur(28px)",

                          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                        }}
                      >
                        {/* search wrapper */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",

                            overflow: "hidden",

                            width: showSearchBar
                              ? "170px"
                              : "32px",

                            minWidth: "32px",

                            borderRadius: "999px",

                            transition: "width 320ms cubic-bezier(0.22, 1, 0.36, 1)",
                          }}
                        >
                          {/* SEARCH ICON */}
                          <button
                            onClick={() => {
                              if (!showSearchBar) {
                                setShowSearchBar(true);

                                setActionsPinned(true);

                                setTimeout(() => {
                                  searchInputRef.current?.focus();
                                }, 50);
                              }
                            }}
                            style={actionIconStyle}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform =
                                "translateY(-1px)";

                              e.currentTarget.style.color =
                                "var(--text-primary)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform =
                                "translateY(0)";

                              e.currentTarget.style.color =
                                "var(--text-secondary)";
                            }}
                          >
                            <Search
                              size={15}
                              strokeWidth={1.6}
                            />
                          </button>

                          {/* INPUT */}
                          {showSearchBar && (
                            <input
                              ref={searchInputRef}
                              onFocus={() => {
                                setActionsPinned(true);

                                setShowSortMenu(false);

                                setShowFilterMenu(false);

                                setShowMoreMenu(false);
                              }}
                              value={searchTerm}
                              onChange={(e) =>
                                setSearchTerm(e.target.value)
                              }
                              placeholder="Search..."
                              style={{
                                background: "none",

                                border: "none",

                                outline: "none",

                                color:
                                  "var(--text-primary)",

                                fontSize: "0.82rem",

                                fontWeight: "300",

                                width: "100%",

                                paddingRight: "12px",
                              }}
                            />
                          )}
                        </div>

                        {/* SORT BUTTON */}
                        <div
                          ref={sortRef}
                          style={{
                            position: "relative",
                          }}
                        >
                          <button
                            onClick={() => {
                              setShowSortMenu(!showSortMenu);

                              setShowFilterMenu(false);

                              setActionsPinned(true);

                              setShowActions(true);

                              setShowMoreMenu(false);
                            }}
                            style={actionIconStyle}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform =
                                "translateY(-1px)";

                              e.currentTarget.style.color =
                                "var(--text-primary)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform =
                                "translateY(0)";

                              e.currentTarget.style.color =
                                "var(--text-secondary)";
                            }}
                          >
                            <ArrowUpDown
                              size={15}
                              strokeWidth={1.6}
                            />
                          </button>

                          {showSortMenu && (
                            <div
                              style={{
                                position: "fixed",

                                top: "42px",
                                right: 0,

                                width: "170px",

                                background:
                                  "rgba(20,20,20,0.92)",

                                backdropFilter:
                                  "blur(24px)",

                                border:
                                  "1px solid rgba(255,255,255,0.10)",

                                boxShadow:
                                  "0 20px 50px rgba(0,0,0,0.35)",

                                borderRadius: "18px",

                                padding: "8px",

                                display: "flex",

                                flexDirection: "column",

                                gap: "4px",

                                zIndex: 9999999,
                              }}
                            >
                              {[
                                "newest",
                                "oldest",
                                "priority",
                                "dueDate",
                                "alphabetical",
                              ].map((option) => (
                                <button
                                  key={option}
                                  onClick={() => {
                                    setSortBy(option);

                                    setShowSortMenu(false);

                                    setShowFilterMenu(false);
                                  }}
                                  style={{
                                    background: "transparent",

                                    border: "none",

                                    color:
                                      sortBy === option
                                        ? "var(--text-primary)"
                                        : "var(--text-secondary)",

                                    padding: "10px 14px",

                                    borderRadius: "12px",

                                    cursor: "pointer",

                                    textAlign: "left",

                                    fontSize: "0.78rem",

                                    fontWeight: "300",

                                    transition:
                                      "all 0.2s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                      "rgba(255,255,255,0.06)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                      "transparent";
                                  }}
                                >
                                  {option === "dueDate"
                                    ? "Due Date"
                                    : option === "alphabetical"
                                      ? "A → Z"
                                      : option.charAt(0).toUpperCase() +
                                      option.slice(1)}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* FILTER BUTTON */}
                        <div
                          ref={filterRef}
                          style={{
                            position: "relative",
                          }}
                        >
                          <button
                            onClick={() => {
                              setShowFilterMenu(!showFilterMenu);

                              setShowSortMenu(false);

                              setActionsPinned(true);

                              setShowActions(true);

                              setShowMoreMenu(false);
                            }}
                            style={actionIconStyle}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform =
                                "translateY(-1px)";

                              e.currentTarget.style.color =
                                "var(--text-primary)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform =
                                "translateY(0)";

                              e.currentTarget.style.color =
                                "var(--text-secondary)";
                            }}
                          >
                            <Filter
                              size={15}
                              strokeWidth={1.6}
                            />
                          </button>

                          {showFilterMenu && (
                            <div
                              style={{
                                position: "absolute",

                                top: "42px",
                                right: 0,

                                width: "200px",

                                background:
                                  "rgba(20,20,20,0.92)",

                                backdropFilter:
                                  "blur(24px)",

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
                              <p
                                style={{
                                  fontSize: "0.72rem",
                                  opacity: 0.45,
                                  padding: "8px 12px 4px",
                                  margin: 0,
                                }}
                              >
                                Category
                              </p>

                              {[
                                "All",
                                "Work",
                                "Study",
                                "Personal",
                                "Health",
                              ].map((category) => (
                                <button
                                  key={category}
                                  onClick={() => {
                                    setSelectedCategory(category);

                                    setShowFilterMenu(false);
                                  }}
                                  style={{
                                    background: "transparent",

                                    border: "none",

                                    color:
                                      selectedCategory === category
                                        ? "var(--text-primary)"
                                        : "var(--text-secondary)",

                                    padding: "10px 14px",

                                    borderRadius: "12px",

                                    cursor: "pointer",

                                    textAlign: "left",

                                    fontSize: "0.78rem",

                                    fontWeight: "300",

                                    transition:
                                      "all 0.2s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                      "rgba(255,255,255,0.06)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                      "transparent";
                                  }}
                                >
                                  {category}
                                </button>
                              ))}

                              <div
                                style={{
                                  height: "1px",
                                  background: "rgba(255,255,255,0.06)",
                                  margin: "8px 0",
                                }}
                              />

                              <p
                                style={{
                                  fontSize: "0.72rem",
                                  opacity: 0.45,
                                  padding: "8px 12px 4px",
                                  margin: 0,
                                }}
                              >
                                Priority
                              </p>

                              {[
                                "All",
                                "High",
                                "Medium",
                                "Low",
                              ].map((priority) => (
                                <button
                                  key={priority}
                                  onClick={() => {
                                    setSelectedPriority(priority);

                                    setShowFilterMenu(false);
                                  }}
                                  style={{
                                    background: "transparent",

                                    border: "none",

                                    color:
                                      selectedPriority === priority
                                        ? "var(--text-primary)"
                                        : "var(--text-secondary)",

                                    padding: "10px 14px",

                                    borderRadius: "12px",

                                    cursor: "pointer",

                                    textAlign: "left",

                                    fontSize: "0.78rem",

                                    fontWeight: "300",

                                    transition:
                                      "all 0.2s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                      "rgba(255,255,255,0.06)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                      "transparent";
                                  }}
                                >
                                  {priority}
                                </button>
                              ))}

                              <div
                                style={{
                                  height: "1px",
                                  background:
                                    "rgba(255,255,255,0.06)",

                                  margin: "8px 0",
                                }}
                              />

                              <button
                                onClick={() => {
                                  setSelectedCategory("All");
                                  setSelectedPriority("All");
                                  setShowFilterMenu(false);
                                }}
                                style={{
                                  background: "transparent",

                                  border: "none",

                                  color:
                                    "var(--text-secondary)",

                                  padding: "10px 14px",

                                  borderRadius: "12px",

                                  cursor: "pointer",

                                  textAlign: "left",

                                  fontSize: "0.78rem",

                                  fontWeight: "300",

                                  transition:
                                    "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background =
                                    "rgba(255,255,255,0.06)";

                                  e.currentTarget.style.color =
                                    "var(--text-primary)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background =
                                    "transparent";

                                  e.currentTarget.style.color =
                                    "var(--text-secondary)";
                                }}
                              >
                                Clear Filters
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* ALL / FOLDERS */}
                      {/* TABS */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",

                          gap: "6px",

                          padding: "4px",

                          borderRadius: "999px",

                          background:
                            "rgba(255,255,255,0.025)",

                          backdropFilter: "blur(28px)",

                          boxShadow:
                            "0 6px 20px rgba(0,0,0,0.2)",
                        }}
                      >
                        {urgentTabs.map((tab) => {
                          const Icon = tab.icon;

                          const active =
                            activeTab === tab.key;

                          return (
                            <button
                              key={tab.key}
                              onClick={() => {
                                setActiveTab(tab.key);

                                setShowSortMenu(false);

                                setShowFilterMenu(false);

                                setShowMoreMenu(false);
                              }}
                              style={{
                                ...actionIconStyle,

                                background: active
                                  ? "rgba(255,255,255,0.025)"
                                  : "transparent",

                                boxShadow: active
                                  ? "0 4px 10px rgba(0,0,0,0.18)"
                                  : "none",

                                color: active
                                  ? "rgba(255,255,255,0.85)"
                                  : "var(--text-secondary)",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                  "translateY(-1px)";

                                if (!active) {
                                  e.currentTarget.style.color =
                                    "var(--text-primary)";
                                }
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                  "translateY(0)";

                                if (!active) {
                                  e.currentTarget.style.color =
                                    "var(--text-secondary)";
                                }
                              }}
                            >
                              <Icon
                                size={15}
                                strokeWidth={1.6}
                              />
                            </button>
                          );
                        })}
                      </div>

                      {/* MORE */}
                      <div
                        ref={moreRef}
                        style={{
                          position: "relative",
                        }}
                      >
                        <button
                          onClick={() => {
                            setShowMoreMenu(!showMoreMenu);

                            setActionsPinned(true);

                            setShowActions(true);

                            setShowSortMenu(false);

                            setShowFilterMenu(false);
                          }}
                          style={actionIconStyle}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                              "translateY(-1px)";

                            e.currentTarget.style.color =
                              "var(--text-primary)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform =
                              "translateY(0)";

                            e.currentTarget.style.color =
                              "var(--text-secondary)";
                          }}
                        >
                          <Ellipsis
                            size={16}
                            strokeWidth={1.6}
                          />
                        </button>

                        {showMoreMenu && (
                          <div
                            style={{
                              position: "fixed",

                              top: "42px",
                              right: 0,

                              width: "180px",

                              background: "rgba(20,20,20,0.92)",

                              backdropFilter: "blur(24px)",
                              WebkitBackdropFilter: "blur(24px)",

                              border: "1px solid rgba(255,255,255,0.10)",

                              boxShadow: "0 20px 50px rgba(0,0,0,0.35)",

                              borderRadius: "18px",

                              overflow: "hidden",

                              padding: "8px",

                              display: "flex",
                              flexDirection: "column",

                              gap: "4px",

                              zIndex: 2001,
                            }}
                          >
                            <button
                              onClick={() => {
                                setShowMoreMenu(false);
                                setShowClearActive(true);
                              }}
                              style={{
                                background: "transparent",

                                border: "none",

                                color: "var(--text-secondary)",

                                padding: "10px 14px",

                                borderRadius: "12px",

                                cursor: "pointer",

                                textAlign: "left",

                                fontSize: "0.78rem",

                                fontWeight: "300",

                                transition: "all 0.2s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(255,255,255,0.06)";

                                e.currentTarget.style.color =
                                  "var(--text-primary)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "transparent";

                                e.currentTarget.style.color =
                                  "var(--text-secondary)";
                              }}
                            >
                              Clear All
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div> {/* END ACTIONS CONTAINER */}
                </div>
              </div> {/* END TOP RIGHT */}
            </div> {/* END WITHIN HEADER */}

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
              {activeTab === "high_priority"
                ? totalHighPriority > 0
                  ? `${totalHighPriority} urgent item${totalHighPriority === 1 ? "" : "s"}`
                  : "Nothing here yet"
                : totalOverdue > 0
                  ? `${totalOverdue} overdue item${totalOverdue === 1 ? "" : "s"}`
                  : "Nothing overdue"}
            </p>
          </div> {/* END HEADER */}

          {/* DIVIDER */}
          <div
            style={{
              height: "1px",
              background:
                "rgba(255,255,255,0.06)",
            }}
          />

          {/* ALL URGENT (HIGH PRIORITY ) */}
          {activeTab === "high_priority" && (
            <div
              style={{

                borderRadius:
                  "var(--radius-large)",

                backdropFilter:
                  "blur(20px)",

                WebkitBackdropFilter:
                  "blur(20px)",

                height: "700px",

                display: "flex",

                flexDirection: "column",

                overflow: "hidden",
              }}
            >
              {/* HEADER REMOVED */}

              {/* GRID */}
              <div
                style={{
                  flex: 1,

                  overflowY: "auto",

                  padding: "24px",

                  display: "grid",

                  gridTemplateColumns:
                    "repeat(4, 1fr)",

                  gap: "18px",

                  alignContent: "start",
                }}
              >

                {totalHighPriority === 0 ? (
                  <div
                    style={{
                      gridColumn: "1 / -1",

                      display: "flex",
                      flexDirection: "column",

                      justifyContent: "center",
                      alignItems: "center",

                      minHeight: "500px",

                      textAlign: "center",

                      color: "var(--text-secondary)",

                      opacity: 0.85,
                    }}
                  >

                    <div
                      style={{
                        marginBottom: "8px",
                      }}
                    >
                      <CircleAlert
                        size={60}
                        strokeWidth={1.8}
                        opacity={0.85}
                      />
                    </div>

                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.9rem",
                      }}
                    >
                      Nothing urgent
                    </p>
                  </div>
                ) : (
                  <>
                    {highPriorityTasks.map((task) => (
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
                        onToggleFlag={handleToggleTaskFlag}
                        onToggleLike={handleToggleTaskLike}
                        onAddComment={handleAddTaskComment}
                      />
                    ))}

                    {highPriorityProjects.map((project) => (
                      <ProjectCard
                        key={project._id}
                        project={project}
                        onClick={setSelectedProject}
                        openProjectMenu={openProjectMenu}
                        setOpenProjectMenu={setOpenProjectMenu}
                        onView={setSelectedProject}
                        onEdit={setEditingProject}
                        onDelete={handleDeleteProject}
                        onComplete={handleCompleteProject}
                        onRestore={handleRestoreProject}
                        onToggleFlag={handleToggleProjectFlag}
                        onToggleLike={handleToggleProjectLike}
                        onAddComment={handleAddProjectComment}
                      />
                    ))}

                    {highPriorityGoals.map((goal) => (
                      <GoalCard
                        key={goal._id}
                        goal={goal}
                        onClick={setSelectedGoal}
                        openGoalMenu={openGoalMenu}
                        setOpenGoalMenu={setOpenGoalMenu}
                        onView={setSelectedGoal}
                        onEdit={setEditingGoal}
                        onDelete={handleDeleteGoal}
                        onComplete={handleCompleteGoal}
                        onRestore={handleRestoreGoal}
                        onToggleFlag={handleToggleGoalFlag}
                        onToggleLike={handleToggleGoalLike}
                        onAddComment={handleAddGoalComment}
                      />
                    ))}

                    {highPriorityReminders.map((reminder) => (
                      <ReminderCard
                        key={reminder._id}
                        reminder={reminder}
                        onClick={setSelectedReminder}
                        openReminderMenu={openReminderMenu}
                        setOpenReminderMenu={setOpenReminderMenu}
                        onView={setSelectedReminder}
                        onEdit={setEditingReminder}
                        onDelete={handleDeleteReminder}
                        onComplete={handleCompleteReminder}
                        onRestore={handleRestoreReminder}
                        onToggleFlag={handleToggleReminderFlag}
                        onToggleLike={handleToggleReminderLike}
                        onAddComment={handleAddReminderComment}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          )}

          {/* ALL URGENT (OVERDUE) */}
          {activeTab === "overdue" && (
            <div
              style={{

                borderRadius:
                  "var(--radius-large)",

                backdropFilter:
                  "blur(20px)",

                WebkitBackdropFilter:
                  "blur(20px)",

                height: "700px",

                display: "flex",

                flexDirection: "column",

                overflow: "hidden",
              }}
            >
              {/* HEADER REMOVED */}

              {/* GRID */}
              <div
                style={{
                  flex: 1,

                  overflowY: "auto",

                  padding: "24px",

                  display: "grid",

                  gridTemplateColumns:
                    "repeat(4, 1fr)",

                  gap: "18px",

                  alignContent: "start",
                }}
              >

                {totalOverdue === 0 ? (
                  <div
                    style={{
                      gridColumn: "1 / -1",

                      display: "flex",
                      flexDirection: "column",

                      justifyContent: "center",
                      alignItems: "center",

                      minHeight: "500px",

                      textAlign: "center",

                      color: "var(--text-secondary)",

                      opacity: 0.85,
                    }}
                  >

                    <div
                      style={{
                        marginBottom: "8px",
                      }}
                    >
                      <Siren
                        size={60}
                        strokeWidth={1.8}
                        opacity={0.85}
                      />
                    </div>

                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.9rem",
                      }}
                    >
                      Nothing overdue
                    </p>
                  </div>
                ) : (
                  <>
                    {overdueTasks.map((task) => (
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
                        onToggleFlag={handleToggleTaskFlag}
                        onToggleLike={handleToggleTaskLike}
                        onAddComment={handleAddTaskComment}
                      />
                    ))}

                    {overdueProjects.map((project) => (
                      <ProjectCard
                        key={project._id}
                        project={project}
                        onClick={setSelectedProject}
                        openProjectMenu={openProjectMenu}
                        setOpenProjectMenu={setOpenProjectMenu}
                        onView={setSelectedProject}
                        onEdit={setEditingProject}
                        onDelete={handleDeleteProject}
                        onComplete={handleCompleteProject}
                        onRestore={handleRestoreProject}
                        onToggleFlag={handleToggleProjectFlag}
                        onToggleLike={handleToggleProjectLike}
                        onAddComment={handleAddProjectComment}
                      />
                    ))}

                    {overdueGoals.map((goal) => (
                      <GoalCard
                        key={goal._id}
                        goal={goal}
                        onClick={setSelectedGoal}
                        openGoalMenu={openGoalMenu}
                        setOpenGoalMenu={setOpenGoalMenu}
                        onView={setSelectedGoal}
                        onEdit={setEditingGoal}
                        onDelete={handleDeleteGoal}
                        onComplete={handleCompleteGoal}
                        onRestore={handleRestoreGoal}
                        onToggleFlag={handleToggleGoalFlag}
                        onToggleLike={handleToggleGoalLike}
                        onAddComment={handleAddGoalComment}
                      />
                    ))}

                    {overdueReminders.map((reminder) => (
                      <ReminderCard
                        key={reminder._id}
                        reminder={reminder}
                        onClick={setSelectedReminder}
                        openReminderMenu={openReminderMenu}
                        setOpenReminderMenu={setOpenReminderMenu}
                        onView={setSelectedReminder}
                        onEdit={setEditingReminder}
                        onDelete={handleDeleteReminder}
                        onComplete={handleCompleteReminder}
                        onRestore={handleRestoreReminder}
                        onToggleFlag={handleToggleReminderFlag}
                        onToggleLike={handleToggleReminderLike}
                        onAddComment={handleAddReminderComment}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
      {/* show modals */}
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() =>
            setSelectedTask(null)
          }
          onEditTask={(task) => {
            setSelectedTask(null);
            setEditingTask(task);
          }}
          onDeleteTask={handleDeleteTask}
          onCompleteTask={handleCompleteTask}
          onRestoreTask={handleRestoreTask}
        />
      )}

      {editingTask && (
        <TaskModal
          mode="edit"
          task={editingTask}
          onClose={() =>
            setEditingTask(null)
          }
          onSave={async (taskData) => {
            const updatedTask =
              await updateTask(
                editingTask._id,
                taskData
              );

            setTasks((prev) =>
              prev.map((task) =>
                task._id === updatedTask._id
                  ? updatedTask
                  : task
              )
            );

            setToast("Task updated");

            setTimeout(() => {
              setToast("");
            }, 3000);

            setEditingTask(null);
          }}
        />
      )}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() =>
            setSelectedProject(null)
          }
          onEditProject={(project) => {
            setSelectedProject(null);
            setEditingProject(project);
          }}
          onDeleteProject={handleDeleteProject}
          onCompleteProject={handleCompleteProject}
          onRestoreProject={handleRestoreProject}
        />
      )}

      {editingProject && (
        <ProjectModal
          mode="edit"
          project={editingProject}
          onClose={() =>
            setEditingProject(null)
          }
          onSave={async (projectData) => {
            const updatedProject =
              await updateProject(
                editingProject._id,
                projectData
              );

            setProjects((prev) =>
              prev.map((project) =>
                project._id === updatedProject._id
                  ? updatedProject
                  : project
              )
            );

            setToast("Project updated");

            setTimeout(() => {
              setToast("");
            }, 3000);

            setEditingProject(null);
          }}
        />
      )}
      {selectedGoal && (
        <GoalModal
          goal={selectedGoal}
          onClose={() =>
            setSelectedGoal(null)
          }
          onEditGoal={(goal) => {
            setSelectedGoal(null);
            setEditingGoal(goal);
          }}
          onDeleteGoal={handleDeleteGoal}
          onCompleteGoal={handleCompleteGoal}
          onRestoreGoal={handleRestoreGoal}
        />
      )}

      {editingGoal && (
        <GoalModal
          mode="edit"
          goal={editingGoal}
          onClose={() =>
            setEditingGoal(null)
          }
          onSave={async (goalData) => {
            const updatedGoal =
              await updateGoal(
                editingGoal._id,
                goalData
              );

            setGoals((prev) =>
              prev.map((goal) =>
                goal._id === updatedGoal._id
                  ? updatedGoal
                  : goal
              )
            );

            setToast("Goal updated");

            setTimeout(() => {
              setToast("");
            }, 3000);

            setEditingGoal(null);
          }}
        />
      )}
      {selectedReminder && (
        <ReminderModal
          reminder={selectedReminder}
          onClose={() =>
            setSelectedReminder(null)
          }
          onEditReminder={(reminder) => {
            setSelectedReminder(null);
            setEditingReminder(reminder);
          }}
          onDeleteReminder={handleDeleteReminder}
          onCompleteReminder={handleCompleteReminder}
          onRestoreReminder={handleRestoreReminder}
        />
      )}

      {editingReminder && (
        <ReminderModal
          mode="edit"
          reminder={editingReminder}
          onClose={() =>
            setEditingReminder(null)
          }
          onSave={async (reminderData) => {
            const updatedReminder =
              await updateReminder(
                editingReminder._id,
                reminderData
              );

            setReminders((prev) =>
              prev.map((reminder) =>
                reminder._id === updatedReminder._id
                  ? updatedReminder
                  : reminder
              )
            );

            setToast("Reminder updated");

            setTimeout(() => {
              setToast("");
            }, 3000);

            setEditingReminder(null);
          }}
        />
      )}
      <Toast
        message={toast}
      />
    </MainLayout>
  );
}

export default Urgent;