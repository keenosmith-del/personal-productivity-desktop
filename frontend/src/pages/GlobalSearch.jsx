import MainLayout from "../layouts/MainLayout";
// test
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
    Plus,
} from "lucide-react";

import {
    useState,
    useEffect,
    useRef,
} from "react";

import SearchResultCard from "../components/Search/SearchResultCard";

import { getProjects } from "../services/projectService";
import { getTasks } from "../services/taskService";
import { getGoals } from "../services/goalService";
import { getNotes } from "../services/noteService";
import { getReminders } from "../services/reminderService";

import TaskModal from "../components/Tasks/TaskModal";
import ProjectModal from "../components/Projects/ProjectModal";
import GoalModal from "../components/Goals/GoalModal";
import ReminderModal from "../components/Reminders/ReminderModal";
import NoteModal from "../components/Notes/NoteModal";

import Toast from "../components/Toast";

const typeStyles = {
    All: {
        bg: "rgba(255,255,255,0.05)",
        border: "rgba(255,255,255,0.12)",
    },

    Task: {
        bg: "#4d689333",
        border: "#4d689366",
    },

    Project: {
        bg: "#5f5b8733",
        border: "#5f5b8766",
    },

    Goal: {
        bg: "#5d766233",
        border: "#5d766266",
    },

    Reminder: {
        bg: "#7a685533",
        border: "#7a685566",
    },

    Note: {
        bg: "#6d5d7333",
        border: "#6d5d7366",
    },
};

function GlobalSearch() {
    // REFS
    const sortRef = useRef(null);

    const filterRef = useRef(null);

    const searchInputRef = useRef(null);

    const moreRef = useRef(null);

    // COMPONENT STATES
    const [selectedType, setSelectedType] =
        useState("All");

    const [tasks, setTasks] =
        useState([]);

    const [projects, setProjects] =
        useState([]);

    const [goals, setGoals] =
        useState([]);

    const [notes, setNotes] =
        useState([]);

    const [reminders, setReminders] =
        useState([]);

    const [selectedTask, setSelectedTask] =
        useState(null);

    const [selectedProject, setSelectedProject] =
        useState(null);

    const [selectedGoal, setSelectedGoal] =
        useState(null);

    const [selectedReminder, setSelectedReminder] =
        useState(null);

    const [selectedNote, setSelectedNote] =
        useState(null);

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

    const [searchTerm, setSearchTerm] =
        useState("");

    const [showActions, setShowActions] =
        useState(false);

    const [showSearchBar, setShowSearchBar] =
        useState(false);

    const [actionsPinned, setActionsPinned] =
        useState(false);

    const [showMoreMenu, setShowMoreMenu] =
        useState(false);

    //LOADERS
    useEffect(() => {
        async function fetchData() {
            try {
                const [
                    taskData,
                    projectData,
                    goalData,
                    noteData,
                    reminderData,
                ] = await Promise.all([
                    getTasks(),
                    getProjects(),
                    getGoals(),
                    getNotes(),
                    getReminders(),
                ]);

                setTasks(taskData);
                setProjects(projectData);
                setGoals(goalData);
                setNotes(noteData);
                setReminders(reminderData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    // ARRAY
    const searchData = [
        ...tasks.map((item) => ({
            ...item,
            type: "Task",
        })),

        ...projects.map((item) => ({
            ...item,
            type: "Project",
        })),

        ...goals.map((item) => ({
            ...item,
            type: "Goal",
        })),

        ...notes.map((item) => ({
            ...item,
            type: "Note",
        })),

        ...reminders.map((item) => ({
            ...item,
            type: "Reminder",
        })),
    ];

    // FILTERING
    const filteredResults =
        searchData.filter((item) => {
            const query =
                searchTerm.toLowerCase();

            const matchesSearch =
                item.title
                    ?.toLowerCase()
                    .includes(query) ||

                item.description
                    ?.toLowerCase()
                    .includes(query) ||

                item.category
                    ?.toLowerCase()
                    .includes(query) ||

                item.priority
                    ?.toLowerCase()
                    .includes(query) ||

                item.status
                    ?.toLowerCase()
                    .includes(query) ||

                item.type
                    ?.toLowerCase()
                    .includes(query) ||

                (query === "completed" &&
                    item.completed) ||

                (query === "flagged" &&
                    item.flagged) ||

                (query === "liked" &&
                    item.liked) ||

                (query === "pinned" &&
                    item.pinned);

            const matchesType =
                selectedType === "All" ||
                item.type === selectedType;

            return (
                matchesSearch &&
                matchesType
            );
        });

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
                                    Search
                                </h1>

                                <p
                                    style={{
                                        marginTop: "8px",
                                        color: "var(--text-secondary)",
                                        fontWeight: "300",
                                    }}
                                >
                                    Search across your entire workspace
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
                                                        ? "330px"
                                                        : "200px"
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
                                                            placeholder="Search tasks..."
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
                                                                setShowTaskModal(true);
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
                                                            Create Task
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
                            {filteredResults.length} results
                        </p>
                    </div>

                    {/* DIVIDER */}
                    <div
                        style={{
                            height: "1px",
                            background: "rgba(255,255,255,0.06)",
                        }}
                    />

                    {/* GIANT CARD */}
                    <div
                        style={{

                            backdropFilter: "blur(20px)",

                            WebkitBackdropFilter: "blur(20px)",

                            height: "700px",

                            display: "flex",

                            flexDirection: "column",

                            overflow: "hidden",
                        }}
                    >

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
                            {filteredResults.length === 0 ? (
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
                                        <Search
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
                                        No results found
                                    </p>

                                    <p
                                        style={{
                                            marginTop: "2px",
                                            fontSize: "0.75rem",
                                        }}
                                    >
                                        Try another keyword or filter.
                                    </p>
                                </div>
                            ) : (
                                filteredResults.map((item) => (
                                    <SearchResultCard
                                        key={`${item.type}-${item._id}`}
                                        item={item}
                                        onClick={() => {
                                            switch (item.type) {
                                                case "Task":
                                                    setSelectedTask(item);
                                                    break;

                                                case "Project":
                                                    setSelectedProject(item);
                                                    break;

                                                case "Goal":
                                                    setSelectedGoal(item);
                                                    break;

                                                case "Reminder":
                                                    setSelectedReminder(item);
                                                    break;

                                                case "Note":
                                                    setSelectedNote(item);
                                                    break;

                                                default:
                                                    break;
                                            }
                                        }}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {selectedTask && (
                <TaskModal
                    task={selectedTask}
                    onClose={() =>
                        setSelectedTask(null)
                    }
                />
            )}

            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() =>
                        setSelectedProject(null)
                    }
                />
            )}

            {selectedGoal && (
                <GoalModal
                    goal={selectedGoal}
                    onClose={() =>
                        setSelectedGoal(null)
                    }
                />
            )}

            {selectedReminder && (
                <ReminderModal
                    reminder={selectedReminder}
                    onClose={() =>
                        setSelectedReminder(null)
                    }
                />
            )}

            {selectedNote && (
                <NoteModal
                    note={selectedNote}
                    onClose={() =>
                        setSelectedNote(null)
                    }
                />
            )}
        </MainLayout>
    );
}

export default GlobalSearch;