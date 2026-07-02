import MainLayout from "../layouts/MainLayout";

import {
  Search,
  ArrowUpDown,
  Filter,
  Ellipsis,
  ArrowRight,
  ArrowLeft,
  AlarmClock,
  Infinity,
} from "lucide-react";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import ReminderCard from "../components/Reminders/ReminderCard";
import ReminderModal from "../components/Reminders/ReminderModal";
import ReminderDetailsModal from "../components/Reminders/ReminderDetailsModal";

import Toast from "../components/Toast";

import {
  getReminders,
  createReminder,
  updateReminder,
  deleteReminder,
  clearAllReminders,
} from "../services/reminderService";

function Reminders() {
  // REFS
  const sortRef = useRef(null);

  const filterRef = useRef(null);

  const searchInputRef = useRef(null);

  const moreRef = useRef(null);

  //COMPONENT STATES
  const [showReminderModal, setShowReminderModal] =
    useState(false);

  const [openReminderMenu, setOpenReminderMenu] =
    useState(null);

  const [selectedReminder, setSelectedReminder] =
    useState(null);

  const [editingReminder, setEditingReminder] =
    useState(null);

  const [reminders, setReminders] =
    useState([]);

  const [toast, setToast] =
    useState("");

  const [completionTimeout, setCompletionTimeout] =
    useState(null);

  const [showClearCompleted, setShowClearCompleted] =
    useState(false);

  const [showClearActive, setShowClearActive] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [sortBy, setSortBy] =
    useState("newest");

  const [showSortMenu, setShowSortMenu] =
    useState(false);

  const [showFilterMenu, setShowFilterMenu] =
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

  const matchesFilters = (reminder) => {
    const categoryMatch =
      selectedCategory === "All" ||
      reminder.category ===
      selectedCategory;

    const priorityMatch =
      selectedPriority === "All" ||
      reminder.priority ===
      selectedPriority;

    return (
      categoryMatch &&
      priorityMatch
    );
  };

  const matchesSearch = (reminder) =>
    reminder.title
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      ) ||

    (reminder.description || "")
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase());

  const sortReminders = (remindersToSort) => {
    return [...remindersToSort].sort(
      (a, b) => {
        switch (sortBy) {
          case "oldest":
            return (
              new Date(a.createdAt) -
              new Date(b.createdAt)
            );

          case "priority": {
            const order = {
              High: 0,
              Medium: 1,
              Low: 2,
            };

            return (
              order[a.priority] -
              order[b.priority]
            );
          }

          case "dueDate":
            return (
              new Date(a.dueDate || 0) -
              new Date(b.dueDate || 0)
            );

          case "alphabetical":
            return a.title.localeCompare(
              b.title
            );

          case "newest":
          default:
            return (
              new Date(b.createdAt) -
              new Date(a.createdAt)
            );
        }
      }
    );
  };


  {/* BEGIN REMINDERS SORT VARIABLES */ }
  {/* NO COLS */ }
  const allReminders = sortReminders(
    reminders.filter(
      (reminder) =>
        matchesSearch(reminder) &&
        matchesFilters(reminder)
    )
  );

  const activeReminders = sortReminders(
    reminders.filter(
      (reminder) =>
        !reminder.completed &&
        reminder.status === "Active" &&
        matchesSearch(reminder) &&
        matchesFilters(reminder)
    )
  );

  const inProgressReminders = sortReminders(
    reminders.filter(
      (reminder) =>
        !reminder.completed &&
        reminder.status ===
        "In Progress" &&
        matchesSearch(reminder) &&
        matchesFilters(reminder)
    )
  );

  const pausedReminders = sortReminders(
    reminders.filter(
      (reminder) =>
        !reminder.completed &&
        reminder.status === "Paused" &&
        matchesSearch(reminder) &&
        matchesFilters(reminder)
    )
  );

  const completedReminders = sortReminders(
    reminders.filter(
      (reminder) =>
        reminder.status ===
        "Completed" &&
        matchesSearch(reminder) &&
        matchesFilters(reminder)
    )
  );

  {/* FOCUS SORT */ }
  const urgentReminders = sortReminders(
    reminders.filter(
      (reminder) =>
        reminder.priority === "High" && //
        matchesSearch(reminder) &&
        matchesFilters(reminder)
    )
  );

  const flaggedReminders = sortReminders(
    reminders.filter(
      (reminder) =>
        reminder.flagged &&
        matchesSearch(reminder) &&
        matchesFilters(reminder)
    )
  );

  const likedReminders = sortReminders(
    reminders.filter(
      (reminder) =>
        reminder.liked &&
        matchesSearch(reminder) &&
        matchesFilters(reminder)
    )
  );

  const discussionReminders = sortReminders(
    reminders.filter(
      (reminder) =>
        reminder.commentCount > 0 &&
        matchesSearch(reminder) &&
        matchesFilters(reminder)
    )
  )

  {/* CATEGORIES SORT */ }
  const workReminders = sortReminders(
    reminders.filter(
      (reminder) =>
        reminder.category === "Work" &&
        matchesSearch(reminder) &&
        matchesFilters(reminder)
    )
  );

  {/* STUDY */ }
  const studyReminders = sortReminders(
    reminders.filter(
      (reminder) =>
        reminder.category === "Study" &&
        matchesSearch(reminder) &&
        matchesFilters(reminder)
    )
  );

  {/* PERSONAL */ }
  const personalReminders = sortReminders(
    reminders.filter(
      (reminder) =>
        reminder.category === "Personal" &&
        matchesSearch(reminder) &&
        matchesFilters(reminder)
    )
  );

  {/* HEALTH */ }
  const healthReminders = sortReminders(
    reminders.filter(
      (reminder) =>
        reminder.category === "Health" &&
        matchesSearch(reminder) &&
        matchesFilters(reminder)
    )
  );

  const hasFilters =
    selectedCategory !== "All" ||
    selectedPriority !== "All";

  const totalReminders = reminders.length;

  // FUNCTIONS
  const loadReminders = async () => {
    try {
      const data =
        await getReminders();

      setReminders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const reminderTabs = [
    {
      key: "alarms",
      icon: AlarmClock,
    },
    {
      key: "all",
      icon: Infinity,
    },
  ];

  const [activeTab, setActiveTab] =
    useState("alarms");

  useEffect(() => {
    loadReminders();
  }, []);

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

  // HANDLERS
  const handleDeleteReminder =
    async (reminderId) => {
      try {
        await deleteReminder(reminderId);

        setReminders((prev) =>
          prev.filter(
            (reminder) =>
              reminder._id !== reminderId
          )
        );

        setToast(
          "Reminder deleted"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      } catch (error) {
        console.error(error);

        setToast(
          "Failed to delete reminder"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  const handleCompleteReminder =
    async (reminder) => {
      try {
        const updatedReminder =
          await updateReminder(
            reminder._id,
            {
              completed: true,
              status: "Completed",
              completedDate:
                new Date().toLocaleDateString(),
            }
          );

        setReminders((prev) =>
          prev.map((t) =>
            t._id === updatedReminder._id
              ? updatedReminder
              : t
          )
        );

        setSelectedReminder((prev) =>
          prev?._id === updatedReminder._id
            ? updatedReminder
            : prev
        );

        setEditingReminder((prev) =>
          prev?._id === updatedReminder._id
            ? updatedReminder
            : prev
        );

      } catch (error) {
        console.error(error);

        setToast(
          "Failed to complete reminder"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  const handleRestoreReminder =
    async (reminder) => {
      try {
        const updatedReminder =
          await updateReminder(
            reminder._id,
            {
              completed: false,
              completedDate: null,
              status: "Active",
            }
          );

        setReminders((prev) =>
          prev.map((t) =>
            t._id === updatedReminder._id
              ? updatedReminder
              : t
          )
        );

        setSelectedReminder((prev) =>
          prev?._id === updatedReminder._id
            ? updatedReminder
            : prev
        );

        setEditingReminder((prev) =>
          prev?._id === updatedReminder._id
            ? updatedReminder
            : prev
        );

      } catch (error) {
        console.error(error);

        setToast(
          "Failed to restore reminder"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  const handleClearCompletedReminders =
    async () => {
      try {
        await clearCompletedReminders();

        setReminders((prev) =>
          prev.filter(
            (reminder) =>
              !reminder.completed
          )
        );

        setToast(
          "Completed reminders cleared"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);

      } catch (error) {
        console.error(error);

        setToast(
          "Failed to clear completed reminders"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  const handleToggleFlag =
    async (reminder) => {
      await updateReminder(
        reminder._id,
        {
          ...reminder,

          flagged:
            !reminder.flagged,
        }
      );

      loadReminders();
    };

  const handleToggleLike =
    async (reminder) => {
      await updateReminder(
        reminder._id,
        {
          ...reminder,

          liked:
            !reminder.liked,
        }
      );

      loadReminders();
    };

  const handleAddComment =
    async (reminder) => {
      await updateReminder(
        reminder._id,
        {
          ...reminder,

          commentCount:
            (reminder.commentCount || 0) +
            1,
        }
      );

      loadReminders();
    };

  const handleClearActiveReminders =
    async () => {
      try {
        await clearActiveReminders();

        setReminders((prev) =>
          prev.filter(
            (reminder) =>
              reminder.completed
          )
        );

        setToast(
          "Active reminders cleared"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);

      } catch (error) {
        console.error(error);

        setToast(
          "Failed to clear active reminders"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

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
          <div
            style={{
              position: "relative",
              zIndex: 100,
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
                  Reminders and Alarms
                </h1>

                <p
                  style={{
                    marginTop: "8px",
                    color: "var(--text-secondary)",
                    fontWeight: "300",
                  }}
                >
                  Manage and organize your reminders and alarms.
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
                            ? "500px"
                            : "360px"
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
                              placeholder="Search reminders..."
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

                      {/* ALARMS / ALL REMINDERS */}
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
                        {reminderTabs.map((tab) => {
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
                                setShowReminderModal(true);
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
                              Create Reminder
                            </button>

                            <button
                              onClick={() => {
                                setShowMoreMenu(false);
                                setShowClearCompleted(true);
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
                              Clear Completed
                            </button>

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
              {totalReminders + " Reminders" || "No reminders yet"}
            </p>
          </div>

          {/* DIVIDER */}
          <div
            style={{
              height: "1px",
              background:
                "rgba(255,255,255,0.06)",
            }}
          />

          {/* ALARMS TAB */}
          {activeTab === "alarms" && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                minHeight: "300px",

                borderRadius: "32px",

                backdropFilter:
                  "blur(20px)",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  opacity: 0.85,
                  color: "var(--text-secondary)",
                }}
              >
                <div
                  style={{
                    marginBottom: "8px",

                  }}
                >
                  <AlarmClock
                    size={60}
                    strokeWidth={1.8}
                    opacity={0.85}
                  />
                </div>

                <p
                  style={{
                    margin: 0,
                    fontWeight: "300",
                    fontSize: "0.75rem",
                  }}
                >
                  No Alarms
                </p>
              </div>
            </div>
          )}

          {/* ALL REMINDERS TAB */}
          {activeTab === "all" && (
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

                height: "700px",

                display: "flex",

                flexDirection: "column",

                overflow: "hidden",
              }}
            >
              {/* HEADER */}
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
                <div>
                  <div
                    style={{
                      fontSize: "1rem",
                      fontWeight: "400",
                    }}
                  >
                    All Reminders
                  </div>

                  <div
                    style={{
                      fontSize: "0.75rem",

                      opacity: 0.45,

                      marginTop: "4px",
                    }}
                  >
                    {reminders.length} reminders
                  </div>
                </div>

                <button
                  onClick={() =>
                    setShowReminderModal(
                      true
                    )
                  }
                  style={{
                    width: "32px",
                    height: "32px",

                    borderRadius:
                      "999px",

                    border:
                      "1px solid rgba(255,255,255,0.08)",

                    background:
                      "rgba(255,255,255,0.04)",

                    color:
                      "var(--text-primary)",

                    cursor: "pointer",

                    fontSize: "1rem",
                  }}
                >
                  +
                </button>
              </div>

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

                {allReminders.length === 0 ? (
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

                      opacity: 0.45,
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.9rem",
                      }}
                    >
                      No reminders
                    </p>

                    <p
                      style={{
                        marginTop: "6px",
                        fontSize: "0.75rem",
                      }}
                    >
                      Click + to create one
                      {/* or try searching a different term */}
                    </p>
                  </div>
                ) : (
                  allReminders.map((reminder) => (
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

                      onToggleFlag={
                        handleToggleFlag
                      }

                      onToggleLike={
                        handleToggleLike
                      }

                      onAddComment={
                        handleAddComment
                      }
                    />
                  ))
                )}
              </div>
            </div>
          )}

        </div>
      </div>
      {showReminderModal && (
        <ReminderModal
          onClose={() =>
            setShowReminderModal(false)
          }
          onSave={(reminderData) => {
            createReminder(reminderData)
              .then((newReminder) => {
                setReminders((prev) => [
                  newReminder,
                  ...prev,
                ]);

                setToast(
                  "Reminder created"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);
              })
              .catch((error) => {
                console.error(error);

                setToast(
                  "Failed to create reminder"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);
              });
          }}
        />
      )}

      {selectedReminder && (
        <ReminderDetailsModal
          reminder={selectedReminder}
          onClose={() =>
            setSelectedReminder(null)
          }
          onDeleteReminder={handleDeleteReminder}
          setToast={setToast}
          onEditReminder={setEditingReminder}
          onCompleteReminder={
            handleCompleteReminder
          }
          onRestoreReminder={
            handleRestoreReminder
          }
        />
      )}
      {editingReminder && (
        <ReminderModal
          mode="edit"
          reminder={editingReminder}
          onCompleteReminder={
            handleCompleteReminder
          }
          onClose={() =>
            setEditingReminder(null)
          }
          onSave={(reminderData) => {
            updateReminder(
              editingReminder._id,
              reminderData
            )
              .then((updatedReminder) => {
                setReminders((prev) =>
                  prev.map((reminder) =>
                    reminder._id ===
                      updatedReminder._id
                      ? updatedReminder
                      : reminder
                  )
                );

                setToast(
                  "Reminder updated"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);

                setEditingReminder(null);
              })
              .catch((error) => {
                console.error(error);

                setToast(
                  "Failed to update reminder"
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
              Clear completed reminders?
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
                  await handleClearCompletedReminders();

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
              await handleClearActiveReminders();

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
              Clear active reminders?
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
                  setReminders((prev) =>
                    prev.filter(
                      (reminder) =>
                        reminder.completed
                    )
                  );

                  setToast("Active reminders cleared");

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

export default Reminders;