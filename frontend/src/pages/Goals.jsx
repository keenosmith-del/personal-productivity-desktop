import MainLayout from "../layouts/MainLayout";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import GoalOverview from "../components/Goals/GoalOverview";
import ActiveGoals from "../components/Goals/ActiveGoals";
import CompletedGoals from "../components/Goals/CompletedGoals";

import GoalCard from "../components/Goals/GoalCard";
import GoalDetailsModal from "../components/Goals/GoalDetailsModal";
import GoalModal from "../components/Goals/GoalModal";

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
  //COMPONENT STATES
  const sortRef = useRef(null);

  const filterRef = useRef(null);

  const [showGoalModal, setShowGoalModal] =
    useState(false);

  const [openGoalMenu, setOpenGoalMenu] =
    useState(null);

  const [selectedGoal, setSelectedGoal] =
    useState(null);

  const [editingGoal, setEditingGoal] =
    useState(null);

  const [goals, setGoals] = useState([]);

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

  const matchesFilters = (goal) => {
    const categoryMatch =
      selectedCategory === "All" ||
      goal.category ===
      selectedCategory;

    const priorityMatch =
      selectedPriority === "All" ||
      goal.priority ===
      selectedPriority;

    return (
      categoryMatch &&
      priorityMatch
    );
  };

  const matchesSearch = (goal) =>
    goal.title
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      ) ||

    (goal.description || "")
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase());

  const sortGoals = (goalsToSort) => {
    return [...goalsToSort].sort(
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


  {/* BEGIN GOAL SORT VARIABLES */ }
  {/* OVERVIEW TAB GOAL SORT */ }
  const activeGoals = sortGoals(
    goals.filter(
      (goal) =>
        !goal.completed &&
        goal.status === "Active" &&
        matchesSearch(goal) &&
        matchesFilters(goal)
    )
  );

  const inProgressGoals = sortGoals(
    goals.filter(
      (goal) =>
        !goal.completed &&
        goal.status ===
        "In Progress" &&
        matchesSearch(goal) &&
        matchesFilters(goal)
    )
  );

  const pausedGoals = sortGoals(
    goals.filter(
      (goal) =>
        !goal.completed &&
        goal.status === "Paused" &&
        matchesSearch(goal) &&
        matchesFilters(goal)
    )
  );

  const completedGoals = sortGoals(
    goals.filter(
      (goal) =>
        goal.status ===
        "Completed" &&
        matchesSearch(goal) &&
        matchesFilters(goal)
    )
  );

  {/* FOCUS TAB GOAL SORT */ }
  const urgentGoals = sortGoals(
    goals.filter(
      (goal) =>
        goal.priority === "High" &&
        matchesSearch(goal) &&
        matchesFilters(goal)
    )
  );

  const flaggedGoals = sortGoals(
    goals.filter(
      (goal) =>
        goal.flagged &&
        matchesSearch(goal) &&
        matchesFilters(goal)
    )
  );

  const likedGoals = sortGoals(
    goals.filter(
      (goal) =>
        goal.liked &&
        matchesSearch(goal) &&
        matchesFilters(goal)
    )
  );

  const discussionGoals = sortGoals(
    goals.filter(
      (goal) =>
        goal.commentCount > 0 &&
        matchesSearch(goal) &&
        matchesFilters(goal)
    )
  )

  {/* CATEGORIES TAB*/ }
  {/* WORK */ }
  const workGoals = sortGoals(
    goals.filter(
      (goal) =>
        goal.category === "Work" &&
        matchesSearch(goal) &&
        matchesFilters(goal)
    )
  );

  {/* STUDY */ }
  const studyGoals = sortGoals(
    goals.filter(
      (goal) =>
        goal.category === "Study" &&
        matchesSearch(goal) &&
        matchesFilters(goal)
    )
  );

  {/* PERSONAL */ }
  const personalGoals = sortGoals(
    goals.filter(
      (goal) =>
        goal.category === "Personal" &&
        matchesSearch(goal) &&
        matchesFilters(goal)
    )
  );

  {/* HEALTH */ }
  const healthGoals = sortGoals(
    goals.filter(
      (goal) =>
        goal.category === "Health" &&
        matchesSearch(goal) &&
        matchesFilters(goal)
    )
  );

  const hasFilters =
    selectedCategory !== "All" ||
    selectedPriority !== "All";

  const totalGoals = goals.length;

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

  const [activeTab, setActiveTab] =
    useState("overview");

  useEffect(() => {
    loadGoals();
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
    async (goal) => {
      try {
        const updatedGoal =
          await updateGoal(
            goal._id,
            {
              completed: true,
              status: "Completed",
              completedDate:
                new Date().toLocaleDateString(),
            }
          );

        setGoals((prev) =>
          prev.map((g) =>
            g._id === updatedGoal._id
              ? updatedGoal
              : g
          )
        );

        setSelectedGoal((prev) =>
          prev?._id === updatedGoal._id
            ? updatedGoal
            : prev
        );

        setEditingGoal((prev) =>
          prev?._id === updatedGoal._id
            ? updatedGoal
            : prev
        );

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
    async (goal) => {
      try {
        const updatedGoal =
          await updatedGoal(
            goal._id,
            {
              completed: false,
              completedDate: null,
              status: "Active",
            }
          );

        setGoals((prev) =>
          prev.map((g) =>
            g._id === updatedGoal._id
              ? updatedGoal
              : g
          )
        );

        setSelectedGoal((prev) =>
          prev?._id === updatedGoal._id
            ? updatedGoal
            : prev
        );

        setEditingGoal((prev) =>
          prev?._id === updatedGoal._id
            ? updatedGoal
            : prev
        );

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

  const handleClearCompletedGoal =
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

        setToast(
          "Failed to clear completed goals"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  const handleToggleFlag =
    async (goal) => {
      await updateGoal(
        goal._id,
        {
          ...goal,

          flagged:
            !goal.flagged,
        }
      );

      loadGoals();
    };

  const handleToggleLike =
    async (goal) => {
      await updateGoal(
        goal._id,
        {
          ...goal,

          liked:
            !goal.liked,
        }
      );

      loadGoals();
    };

  const handleAddComment =
    async (goal) => {
      await updateGoal(
        goal._id,
        {
          ...goal,

          commentCount:
            (goal.commentCount || 0) +
            1,
        }
      );

      loadGoals();
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

        setToast(
          "Failed to clear active goals"
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
                  Goals
                </h1>

                <p
                  style={{
                    marginTop: "8px",
                    color:
                      "var(--text-secondary)",
                    fontWeight: "300",
                  }}
                >
                  Manage and organize your goals.
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
                  placeholder="Search goals..."
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

                        background: "rgba(20,20,20,0.95)",

                        backdropFilter: "blur(20px)",

                        border: "1px solid rgba(255,255,255,0.08)",

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
              {totalGoals === 1 ? totalGoals + " Goal" : totalGoals + " Goals" || "No goals yet"}
            </p>
          </div>

          {/* TABS SECTION */}
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
                  "focus"
                )
              }
              style={{
                background: "none",

                border: "none",

                color:
                  activeTab === "focus"
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",

                fontSize: "0.9rem",

                fontWeight: "300",

                cursor: "pointer",

                paddingBottom: "12px",

                borderBottom:
                  activeTab === "focus"
                    ? "1px none rgba(255,255,255,0.25)"
                    : "1px none transparent",

                transition:
                  "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (
                  activeTab !==
                  "focus"
                ) {
                  e.currentTarget.style.color =
                    "var(--text-primary)";
                }
              }}

              onMouseLeave={(e) => {
                if (
                  activeTab !==
                  "focus"
                ) {
                  e.currentTarget.style.color =
                    "var(--text-secondary)";
                }
              }}
            >
              Focus
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

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(4, minmax(0, 1fr))",
                gap: "24px",
              }}
            >
              {/* COLUMN ACTIVE */}
              <div
                style={{
                  background: "var(--glass-bg)",

                  border:
                    "1px solid var(--glass-border)",

                  borderRadius: "var(--radius-large)",

                  backdropFilter: "blur(20px)",

                  WebkitBackdropFilter: "blur(20px)",

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
                      {activeGoals.length}{" "}
                      {activeGoals.length === 1 ? ("Goal") : ("Goals")}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setShowGoalModal(true)
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

                      fontSize: "0.85rem",

                      transition:
                        "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.10)";

                      e.currentTarget.style.transform =
                        "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.04)";

                      e.currentTarget.style.transform =
                        "scale(1)";
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

                  {/* INDIVIDUAL ACTIVE GOAL CARDS */}
                  {activeGoals.length === 0 ? (
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
                        No active goals
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
                    activeGoals.map((goal) => (
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

              {/* COLUMN IN PROGRESS */}
              <div
                style={{
                  background: "var(--glass-bg)",

                  border:
                    "1px solid var(--glass-border)",

                  borderRadius:
                    "var(--radius-large)",

                  backdropFilter: "blur(20px)",

                  WebkitBackdropFilter: "blur(20px)",

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

                    borderBottom: "1px solid rgba(255,255,255,0.06)",

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
                      {inProgressGoals.length}{" "}
                      {inProgressGoals.length === 1 ? ("Goal") : ("Goals")}
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

                  {/* INDIVIDUAL IN PROGRESS GOAL CARDS */}
                  {inProgressGoals.length === 0 ? (
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
                        Change the status of a goal to get started
                      </p>
                    </div>
                  ) : (
                    inProgressGoals.map((goal) => (
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
                      {pausedGoals.length}{" "}
                      {pausedGoals.length === 1 ? ("Goal") : ("Goals")}
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

                  {/* INDIVIDUAL PAUSED GOAL CARDS */}
                  {pausedGoals.length === 0 ? (
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
                        No paused goals
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Paused goals will appear here
                      </p>
                    </div>
                  ) : (
                    pausedGoals.map((goal) => (
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
                      {completedGoals.length}{" "}
                      {completedGoals.length === 1 ? ("Goal") : ("Goals")}
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

                  {/* INDIVIDUAL COMPLETED GOAL CARDS */}
                  {completedGoals.length === 0 ? (
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
                        No completed goals
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Complete a goal to see it here
                      </p>
                    </div>
                  ) : (
                    completedGoals.map((goal) => (
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
          )}

          {/* FOCUS TAB */}
          {activeTab === "focus" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(4, minmax(0, 1fr))",
                gap: "24px",
              }}
            >
              {/* COLUMN URGENT */}
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
                      Urgent
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {urgentGoals.length}{" "}
                      {urgentGoals.length === 1 ? ("Goal") : ("Goals")}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setShowGoalModal(true)
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

                      fontSize: "0.85rem",

                      transition:
                        "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.10)";

                      e.currentTarget.style.transform =
                        "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.04)";

                      e.currentTarget.style.transform =
                        "scale(1)";
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

                  {/* INDIVIDUAL URGENT GOALS CARDS */}
                  {urgentGoals.length === 0 ? (
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
                        Nothing here
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Urgent goals will appear here
                      </p>
                    </div>
                  ) : (
                    urgentGoals.map((goal) => (
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

              {/* COLUMN FLAGGED */}
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
                      Flagged
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {flaggedGoals.length}{" "}
                      {flaggedGoals.length === 1 ? ("Goal") : ("Goals")}
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

                  {/* INDIVIDUAL FLAGGED GOAL CARDS */}
                  {flaggedGoals.length === 0 ? (
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
                        Nothing here
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Flagged goals will appear here
                      </p>
                    </div>
                  ) : (
                    flaggedGoals.map((goal) => (
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

              {/* COLUMN FAVOURITES */}
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
                      Favourites
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {likedGoals.length}{" "}
                      {likedGoals.length === 1 ? ("Goal") : ("Goals")}
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

                  {/* INDIVIDUAL FAVOURITED GOAL CARDS */}
                  {likedGoals.length === 0 ? (
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
                        Nothing here
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Goals that have be favourited will appear here
                      </p>
                    </div>
                  ) : (
                    likedGoals.map((goal) => (
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

              {/* COLUMN DISCUSSIONS */}
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
                      Discussions
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {discussionGoals.length}{" "}
                      {discussionGoals.length === 1 ? ("Goal") : ("Goals")}
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

                  {/* INDIVIDUAL DISCUSSION GOAL CARDS */}
                  {discussionGoals.length === 0 ? (
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
                        Nothing here
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Goals that have been commented on appear here
                      </p>
                    </div>
                  ) : (
                    discussionGoals.map((goal) => (
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
          )}


          {/* CATEGORIES TAB */}
          {activeTab === "categories" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(4, minmax(0, 1fr))",
                gap: "24px",
              }}
            >
              {/* COLUMN WORK */}
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
                      Work
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {workGoals.length}{" "}
                      {workGoals.length === 1 ? ("Goal") : ("Goals")}
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

                  {/* INDIVIDUAL ACTIVE GOAL CARDS */}
                  {workGoals.length === 0 ? (
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
                        Nothing here
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Goals in the Work category will appear here
                      </p>
                    </div>
                  ) : (
                    workGoals.map((goal) => (
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

              {/* COLUMN STUDY */}
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
                      Study
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {studyGoals.length}{" "}
                      {studyGoals.length === 1 ? ("Goal") : ("Goals")}
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

                  {/* INDIVIDUAL IN PROGRESS GOAL CARDS */}
                  {studyGoals.length === 0 ? (
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
                        Nothing here
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Goals in the Study category will appear here
                      </p>
                    </div>
                  ) : (
                    studyGoals.map((goal) => (
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

              {/* COLUMN PERSONAL */}
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
                      Personal
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {personalGoals.length}{" "}
                      {personalGoals.length === 1 ? ("Goal") : ("Goals")}
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

                  {/* INDIVIDUAL PAUSED GOAL CARDS */}
                  {personalGoals.length === 0 ? (
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
                        Nothing here
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Goals in the Personal categoy will appear here.
                      </p>
                    </div>
                  ) : (
                    personalGoals.map((goal) => (
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

              {/* COLUMN HEALTH */}
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
                      Health
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {healthGoals.length}{" "}
                      {healthGoals.length === 1 ? ("Goal") : ("Goals")}
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

                  {/* INDIVIDUAL COMPLETED GOAL CARDS */}
                  {healthGoals.length === 0 ? (
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
                        Nothing here
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Goals in the Health category will appear here
                      </p>
                    </div>
                  ) : (
                    healthGoals.map((goal) => (
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
          )}

        </div>
      </div>
      {showGoalModal && (
        <GoalModal
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

      {selectedGoal && (
        <GoalDetailsModal
          goal={selectedGoal}
          onClose={() =>
            setSelectedGoal(null)
          }
          onDeleteGoal={handleDeleteGoal}
          setToast={setToast}
          onEditGoal={setEditingGoal}
          onCompleteGoal={
            handleCompleteGoal
          }
          onRestoreGoal={
            handleRestoreGoal
          }
        />
      )}
      {editingGoal && (
        <GoalModal
          mode="edit"
          goal={editingGoal}
          onCompleteGoal={
            handleCompleteGoal
          }
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
                  await handleClearCompletedGoals();

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
              await handleClearActiveGoals();

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
                  setGoals((prev) =>
                    prev.filter(
                      (goal) =>
                        goal.completed
                    )
                  );

                  setToast("Active goals cleared");

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
      <Toast message={toast} />
    </MainLayout>
  );
}

export default Goals;