import { useState, useEffect, useRef } from "react";

import MainLayout from "../layouts/MainLayout";

import {
  getReminders,
  createReminder,
  updateReminder,
  deleteReminder,
  clearAllReminders,
} from "../services/reminderService";

import SearchBar from "../components/SearchBar";
import ReminderOverview from "../components/Reminders/ReminderOverview";

import ReminderCard from "../components/Reminders/ReminderCard";
import ReminderModal from "../components/Reminders/ReminderModal";
import ReminderDetailsModal from "../components/Reminders/ReminderDetailsModal";

import Toast from "../components/Toast";

function Reminders() {
  //COMPONENT STATES
  const sortRef = useRef(null);

  const filterRef = useRef(null);

  const [showReminderModal, setShowReminderModal] =
    useState(false);

  const [openReminderMenu, setOpenReminderMenu] =
    useState(null);

  const [selectedReminder, setSelectedReminder] =
    useState(null);

  const [editingReminder,
    setEditingReminder] =
    useState(null);

  const [reminders, setReminders] =
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

  {/* FOCUS TAB reminder SORT */ }
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

  {/* CATEGORIES TAB*/ }
  {/* WORK */ }
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

  const totalReminders =
    reminders.length;

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

  useEffect(() => {
    loadReminders();
  }, []);

  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(
          event.target
        )
      ) {
        setShowSortMenu(false);
      }

      if (
        filterRef.current &&
        !filterRef.current.contains(
          event.target
        )
      ) {
        setShowFilterMenu(false);
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

  const dropdownItemStyle = {
    width: "100%",

    padding: "10px 12px",

    background: "transparent",

    border: "none",

    borderRadius: "10px",

    color: "var(--text-primary)",

    textAlign: "left",

    fontSize: "0.8rem",

    fontWeight: "300",

    cursor: "pointer",

    transition: "all 0.2s ease",
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
                  Reminders
                </h1>

                <p
                  style={{
                    marginTop: "8px",
                    color:
                      "var(--text-secondary)",
                    fontWeight: "300",
                  }}
                >
                  Manage and organize your reminders.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                {/* SEARCH */}
                <input
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(
                      e.target.value
                    )
                  }
                  placeholder="Search reminders..."
                  style={{
                    width: "240px",

                    padding: "12px 18px",

                    borderRadius: "999px",

                    border:
                      searchTerm
                        ? "1px solid rgba(87,112,122,0.55)"
                        : "1px solid rgba(255,255,255,0.08)",

                    background:
                      searchTerm
                        ? "rgba(87,112,122,0.14)"
                        : "rgba(255,255,255,0.03)",

                    boxShadow:
                      searchTerm
                        ? "0 0 0 1px rgba(87,112,122,0.15)"
                        : "none",

                    color:
                      "var(--text-primary)",

                    fontSize: "0.82rem",

                    fontWeight: "300",

                    outline: "none",

                    backdropFilter:
                      "blur(20px)",

                    transition:
                      "all 0.2s ease",
                  }}
                />

                {/* SORT */}
                <div
                  ref={sortRef}
                  style={{
                    position: "relative",
                  }}
                >
                  <button
                    onClick={() => {
                      setShowFilterMenu(false);

                      setShowSortMenu(
                        !showSortMenu
                      );
                    }}
                    style={{
                      padding: "12px 18px",

                      borderRadius: "999px",

                      border:
                        "1px solid rgba(255,255,255,0.08)",

                      background:
                        showSortMenu ||
                          sortBy !== "newest"
                          ? "rgba(87,112,122,0.10)"
                          : "rgba(255,255,255,0.03)",

                      color:
                        showSortMenu ||
                          sortBy !== "newest"
                          ? "var(--text-primary)"
                          : "var(--text-secondary)",

                      fontSize: "0.82rem",

                      fontWeight: "300",

                      cursor: "pointer",

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
                        showSortMenu ||
                          sortBy !== "newest"
                          ? "rgba(87,112,122,0.10)"
                          : "rgba(255,255,255,0.03)";

                      e.currentTarget.style.color =
                        showSortMenu ||
                          sortBy !== "newest"
                          ? "var(--text-primary)"
                          : "var(--text-secondary)";
                    }}
                  >
                    Sort
                  </button>

                  {showSortMenu && (
                    <div
                      style={{
                        position: "absolute",

                        top: "52px",
                        right: 0,

                        background:
                          "rgba(20,20,20,0.95)",

                        backdropFilter:
                          "blur(20px)",

                        border:
                          "1px solid rgba(255,255,255,0.08)",

                        minWidth: "140px",

                        borderRadius: "16px",

                        overflow: "hidden",

                        zIndex: 100,
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
                          }}
                          style={{
                            ...dropdownItemStyle,

                            background:
                              sortBy === option
                                ? "rgba(255,255,255,0.04)"
                                : "transparent",

                            color:
                              sortBy === option
                                ? "#F5F5F5"
                                : "var(--text-primary)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(255,255,255,0.04)";

                            e.currentTarget.style.color =
                              "#F5F5F5";
                          }}

                          onMouseLeave={(e) => {
                            if (sortBy !== option) {
                              e.currentTarget.style.background =
                                "transparent";

                              e.currentTarget.style.color =
                                "var(--text-primary)";
                            }
                          }}
                        >
                          {option === "dueDate"
                            ? "Due Date"
                            : option ===
                              "alphabetical"
                              ? "A → Z"
                              : option.charAt(0).toUpperCase() +
                              option.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* FILTER */}
                <div
                  ref={filterRef}
                  style={{
                    position: "relative",
                  }}
                >
                  <button
                    onClick={() => {
                      setShowSortMenu(false);

                      setShowFilterMenu(
                        !showFilterMenu
                      );
                    }}
                    style={{
                      padding: "12px 18px",

                      borderRadius: "999px",

                      border:
                        showFilterMenu ||
                          hasFilters
                          ? "1px solid rgba(87,112,122,0.45)"
                          : "1px solid rgba(255,255,255,0.08)",

                      background:
                        showFilterMenu ||
                          hasFilters
                          ? "rgba(87,112,122,0.16)"
                          : "rgba(255,255,255,0.03)",

                      color:
                        showFilterMenu ||
                          hasFilters
                          ? "var(--text-primary)"
                          : "var(--text-secondary)",

                      fontSize: "0.82rem",

                      fontWeight: "300",

                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.06)";

                      e.currentTarget.style.color =
                        "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        showFilterMenu ||
                          hasFilters
                          ? "rgba(87,112,122,0.10)"
                          : "rgba(255,255,255,0.03)";

                      e.currentTarget.style.color =
                        showFilterMenu ||
                          hasFilters
                          ? "var(--text-primary)"
                          : "var(--text-secondary)";
                    }}
                  >
                    Filter
                  </button>

                  {showFilterMenu && (
                    <div
                      style={{
                        position: "absolute",

                        top: "52px",
                        right: 0,

                        width: "220px",

                        background:
                          "rgba(20,20,20,0.95)",

                        backdropFilter:
                          "blur(20px)",

                        border:
                          "1px solid rgba(255,255,255,0.08)",

                        borderRadius: "16px",

                        padding: "12px",

                        zIndex: 100,
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.75rem",
                          opacity: 0.5,
                          marginBottom: "10px",
                        }}
                      >
                        Category
                      </p>

                      {/* CATEGORY OPTIONS */}
                      {[
                        "All",
                        "Work",
                        "Study",
                        "Personal",
                        "Health",
                      ].map((category) => (
                        <button
                          key={category}
                          onClick={() =>
                            setSelectedCategory(category)
                          }
                          style={{
                            ...dropdownItemStyle,

                            background:
                              selectedCategory === category
                                ? "rgba(255,255,255,0.04)"
                                : "transparent",

                            color:
                              selectedCategory === category
                                ? "#F5F5F5"
                                : "var(--text-primary)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(255,255,255,0.04)";

                            e.currentTarget.style.color =
                              "#F5F5F5";
                          }}

                          onMouseLeave={(e) => {
                            if (
                              selectedCategory !== category
                            ) {
                              e.currentTarget.style.background =
                                "transparent";

                              e.currentTarget.style.color =
                                "var(--text-primary)";
                            }
                          }}
                        >
                          {category}
                        </button>
                      ))}

                      <div
                        style={{
                          height: "1px",
                          background:
                            "rgba(255,255,255,0.06)",
                          margin: "14px 0",
                        }}
                      />

                      <p
                        style={{
                          fontSize: "0.75rem",
                          opacity: 0.5,
                          marginBottom: "10px",
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
                          onClick={() =>
                            setSelectedPriority(
                              priority
                            )
                          }
                          style={{
                            ...dropdownItemStyle,

                            background:
                              selectedPriority === priority
                                ? "rgba(255,255,255,0.04)"
                                : "transparent",

                            color:
                              selectedPriority === priority
                                ? "#F5F5F5"
                                : "var(--text-primary)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(255,255,255,0.04)";

                            e.currentTarget.style.color =
                              "#F5F5F5";
                          }}

                          onMouseLeave={(e) => {
                            if (
                              selectedPriority !== priority
                            ) {
                              e.currentTarget.style.background =
                                "transparent";

                              e.currentTarget.style.color =
                                "var(--text-primary)";
                            }
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

                          margin: "14px 0",
                        }}
                      />

                      <button
                        onClick={() => {
                          setSelectedCategory(
                            "All"
                          );

                          setSelectedPriority(
                            "All"
                          );

                          setShowFilterMenu(false);
                        }}
                        style={{
                          width: "100%",

                          background: "none",

                          border: "none",

                          color:
                            "var(--text-secondary)",

                          fontSize: "0.8rem",

                          fontWeight: "300",

                          cursor: "pointer",

                          paddingTop: "6px",

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
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>
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
              {totalReminders + " Reminders" || "No reminders yet"}
            </p>
          </div>

          {/* AVATAR */}

          {/* DIVIDER */}
          <div
            style={{
              height: "1px",
              background:
                "rgba(255,255,255,0.06)",
            }}
          />

          {/* ALL REMINDERS */}
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