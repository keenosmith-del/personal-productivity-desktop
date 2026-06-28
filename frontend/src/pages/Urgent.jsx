import MainLayout from "../layouts/MainLayout";

import {
    useState,
    useEffect,
    useRef,
} from "react";

// imports to get tasks, reminders, goals, projects from auth OR SERVICE?
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  clearCompletedTasks,
  clearActiveTasks,
} from "../services/taskService";

import Toast from "../components/Toast";

/*
THIS PAGE SHOULD SHOW HIGH PRIORITY TASKS, PROJECTS, GOALS, AND REMINDERS
COLUMN FOR EACH TASK, REMINDER, GOAL, PROJECT 4X4 LIKE TASKS.JSX

*/


function QuickAdd() {
    //COMPONENT STATES
    const sortRef = useRef(null);

    const filterRef = useRef(null);

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

    const matchesFilters = (task) => {
        const categoryMatch =
            selectedCategory === "All" ||
            task.category ===
            selectedCategory;

        const priorityMatch =
            selectedPriority === "All" ||
            task.priority ===
            selectedPriority;

        return (
            categoryMatch &&
            priorityMatch
        );
    };

    const matchesSearch = (task) =>
        task.title
            .toLowerCase()
            .includes(
                searchTerm.toLowerCase()
            ) ||

        (task.description || "")
            .toLowerCase()
            .includes(
                searchTerm.toLowerCase());

    const sortTasks = (tasksToSort) => {
        return [...tasksToSort].sort(
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


    {/* BEGIN TASK SORT VARIABLES */ }
    {/* OVERVIEW TAB TASK SORT */ }
    const activeTasks = sortTasks(
        tasks.filter(
            (task) =>
                !task.completed &&
                task.status === "Active" &&
                matchesSearch(task) &&
                matchesFilters(task)
        )
    );

    const inProgressTasks = sortTasks(
        tasks.filter(
            (task) =>
                !task.completed &&
                task.status ===
                "In Progress" &&
                matchesSearch(task) &&
                matchesFilters(task)
        )
    );

    const pausedTasks = sortTasks(
        tasks.filter(
            (task) =>
                !task.completed &&
                task.status === "Paused" &&
                matchesSearch(task) &&
                matchesFilters(task)
        )
    );

    const completedTasks = sortTasks(
        tasks.filter(
            (task) =>
                task.status ===
                "Completed" &&
                matchesSearch(task) &&
                matchesFilters(task)
        )
    );

    {/* FOCUS TAB TASK SORT */ }
    const urgentTasks = sortTasks(
        tasks.filter(
            (task) =>
                task.priority === "High" &&
                matchesSearch(task) &&
                matchesFilters(task)
        )
    );

    const flaggedTasks = sortTasks(
        tasks.filter(
            (task) =>
                task.flagged &&
                matchesSearch(task) &&
                matchesFilters(task)
        )
    );

    const likedTasks = sortTasks(
        tasks.filter(
            (task) =>
                task.liked &&
                matchesSearch(task) &&
                matchesFilters(task)
        )
    );

    const discussionTasks = sortTasks(
        tasks.filter(
            (task) =>
                task.commentCount > 0 &&
                matchesSearch(task) &&
                matchesFilters(task)
        )
    )

    {/* CATEGORIES TAB*/ }
    {/* WORK */ }
    const workTasks = sortTasks(
        tasks.filter(
            (task) =>
                task.category === "Work" &&
                matchesSearch(task) &&
                matchesFilters(task)
        )
    );

    {/* STUDY */ }
    const studyTasks = sortTasks(
        tasks.filter(
            (task) =>
                task.category === "Study" &&
                matchesSearch(task) &&
                matchesFilters(task)
        )
    );

    {/* PERSONAL */ }
    const personalTasks = sortTasks(
        tasks.filter(
            (task) =>
                task.category === "Personal" &&
                matchesSearch(task) &&
                matchesFilters(task)
        )
    );

    {/* HEALTH */ }
    const healthTasks = sortTasks(
        tasks.filter(
            (task) =>
                task.category === "Health" &&
                matchesSearch(task) &&
                matchesFilters(task)
        )
    );

    const hasFilters =
        selectedCategory !== "All" ||
        selectedPriority !== "All";

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

    useEffect(() => {
        loadTasks();
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

    const handleToggleFlag =
        async (task) => {
            await updateTask(
                task._id,
                {
                    ...task,

                    flagged:
                        !task.flagged,
                }
            );

            loadTasks();
        };

    const handleToggleLike =
        async (task) => {
            await updateTask(
                task._id,
                {
                    ...task,

                    liked:
                        !task.liked,
                }
            );

            loadTasks();
        };

    const handleAddComment =
        async (task) => {
            await updateTask(
                task._id,
                {
                    ...task,

                    commentCount:
                        (task.commentCount || 0) +
                        1,
                }
            );

            loadTasks();
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
                                    Urgent
                                </h1>

                                <p
                                    style={{
                                        marginTop: "8px",
                                        color:
                                            "var(--text-secondary)",
                                        fontWeight: "300",
                                    }}
                                >
                                    Manage and organize your high priority items.
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
                                    placeholder="Search tasks..."
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
                            {totalTasks + " Tasks" || "No tasks yet"}
                        </p>
                    </div>

                    {/* NO TABS FOR URGENT PAGE */}

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
                                            {activeTasks.length}{" "}
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
                                            {inProgressTasks.length}{" "}
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
                                            {pausedTasks.length}{" "}
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
                                            {completedTasks.length}{" "}
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

                    {/* END OVERVIEW TAB*/}

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

export default QuickAdd;