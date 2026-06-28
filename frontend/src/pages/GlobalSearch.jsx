import MainLayout from "../layouts/MainLayout";
import GlassCard from "../components/GlassCard";
import { ArrowUpDown, Filter, Search, Trash } from "lucide-react";

import SearchResultCard from "../components/Search/SearchResultCard";

import {
    useState,
    useEffect,
    useRef
} from "react";

import {
    getProjects,
} from "../services/projectService";

import {
    getTasks,
} from "../services/taskService";

import {
    getGoals,
} from "../services/goalService";

import {
    getNotes,
} from "../services/noteService";

import {
    getReminders,
} from "../services/reminderService";

import TaskDetailsModal from "../components/Tasks/TaskDetailsModal";
import ProjectDetailsModal from "../components/Projects/ProjectDetailsModal";
import GoalDetailsModal from "../components/Goals/GoalDetailsModal";
import NoteDetailsModal from "../components/Notes/NoteDetailsModal";
import ReminderDetailsModal from "../components/Reminders/ReminderDetailsModal";

const typeStyles = {
    All: {
        bg: "rgba(255,255,255,0.05)",
        border:
            "rgba(255,255,255,0.12)",
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
    // STATES
    const [searchTerm, setSearchTerm] =
        useState("");

    const sortRef = useRef(null);

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

    //FUNCTIONS 
    {/* DEPRECATED */ }
    {/*
    const loadSearchData =
        async () => {
            try {
                const [
                    projects,
                    tasks,
                    goals,
                    notes,
                    reminders,
                ] = await Promise.all([
                    getProjects(),
                    getTasks(),
                    getGoals(),
                    getNotes(),
                    getReminders(),
                ]);

                const combinedData = [
                    ...projects.map(
                        (project) => ({
                            _id:
                                project._id,

                            title:
                                project.title,

                            type:
                                "Project",

                            subtitle:
                                project.status ||
                                "Project",
                        })
                    ),

                    ...tasks.map(
                        (task) => ({
                            _id:
                                task._id,

                            title:
                                task.title,

                            type:
                                "Task",

                            subtitle:
                                task.priority ||
                                "Task",
                        })
                    ),

                    ...goals.map(
                        (goal) => ({
                            _id:
                                goal._id,

                            title:
                                goal.title,

                            type:
                                "Goal",

                            subtitle:
                                `${goal.progress || 0}% Complete`,
                        })
                    ),

                    ...notes.map(
                        (note) => ({
                            _id:
                                note._id,

                            title:
                                note.title,

                            type:
                                "Note",

                            subtitle:
                                "Note",
                        })
                    ),

                    ...reminders.map(
                        (reminder) => ({
                            _id:
                                reminder._id,

                            title:
                                reminder.title,

                            type:
                                "Reminder",

                            subtitle:
                                reminder.category ||
                                "Reminder",
                        })
                    ),
                ];

                setSearchResults(
                    combinedData
                );

            } catch (error) {
                console.error(error);
            }
        };

    useEffect(() => {
        loadSearchData();
    }, []);

    const projectCount =
        searchResults.filter(
            (item) =>
                item.type === "Project"
        ).length;

    const taskCount =
        searchResults.filter(
            (item) =>
                item.type === "Task"
        ).length;

    const goalCount =
        searchResults.filter(
            (item) =>
                item.type === "Goal"
        ).length;

    const noteCount =
        searchResults.filter(
            (item) =>
                item.type === "Note"
        ).length;

    const reminderCount =
        searchResults.filter(
            (item) =>
                item.type === "Reminder"
        ).length;

    const filterChips = [
        {
            label: `Projects (${projectCount})`,
            value: "Projects",
            bg: "#063f4733",
            border: "#063f4766",
        },
        {
            label: `Tasks (${taskCount})`,
            value: "Tasks",
            bg: "#72715c33",
            border: "#72715c66",
        },
        {
            label: `Goals (${goalCount})`,
            value: "Goals",
            bg: "#c59c7033",
            border: "#c59c7066",
        },
        {
            label: `Notes (${noteCount})`,
            value: "Notes",
            bg: "#52677d33",
            border: "#52677d66",
        },
        {
            label: `Reminders (${reminderCount})`,
            value: "Reminders",
            bg: "#83545c33",
            border: "#83545c66",
        },
    ];
    */}
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
                                    Search across your entire workspace.
                                </p>
                            </div>

                            {/* SEARCH INPUT ONLY */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                }}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        width: "240px",
                                    }}
                                >
                                    <Search
                                        size={15}
                                        opacity={0.6}
                                        style={{
                                            position: "absolute",
                                            left: "16px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            zIndex: 10,
                                            pointerEvents: "none",
                                            color: "var(--text-secondary)",
                                        }}
                                    />

                                    <input
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        placeholder="Search everything..."
                                        style={{
                                            width: "100%",

                                            padding: "12px 18px 12px 42px",

                                            borderRadius: "999px",

                                            border: searchTerm
                                                ? "1px solid rgba(87,112,122,0.55)"
                                                : "1px solid rgba(255,255,255,0.06)",

                                            background: searchTerm
                                                ? "rgba(87,112,122,0.14)"
                                                : "rgba(255,255,255,0.04)",

                                            boxShadow: searchTerm
                                                ? "0 0 0 1px rgba(87,112,122,0.15)"
                                                : "none",

                                            color: "var(--text-primary)",

                                            fontSize: "0.82rem",

                                            fontWeight: "300",

                                            outline: "none",

                                            backdropFilter: "blur(20px)",

                                            transition: "all 0.2s ease",
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.border =
                                                "1px solid rgba(255,255,255,0.18)";

                                            e.target.style.background =
                                                "rgba(255,255,255,0.06)";
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.border =
                                                searchTerm
                                                    ? "1px solid rgba(87,112,122,0.55)"
                                                    : "1px solid rgba(255,255,255,0.06)";

                                            e.target.style.background =
                                                searchTerm
                                                    ? "rgba(87,112,122,0.14)"
                                                    : "rgba(255,255,255,0.04)";
                                        }}
                                    />
                                </div>

                                {/* sort */}
                                <div
                                    style={{
                                        position: "relative",
                                    }}
                                >
                                    <button
                                        style={{
                                            padding: "10px 16px",

                                            borderRadius: "999px",

                                            border:
                                                "1px solid rgba(255,255,255,0.08)",

                                            background:
                                                "rgba(255,255,255,0.03)",

                                            color:
                                                "var(--text-secondary)",

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
                                                "rgba(255,255,255,0.03)";

                                            e.currentTarget.style.color =
                                                "var(--text-secondary)";
                                        }}
                                    >
                                        <ArrowUpDown
                                            size={15}
                                            opacity={0.6}
                                        />
                                    </button>
                                </div>

                                {/* FILTER */}
                                <div
                                    style={{
                                        position: "relative",
                                    }}
                                >
                                    <button
                                        style={{
                                            padding: "10px 16px",

                                            borderRadius: "999px",

                                            border:
                                                "1px solid rgba(255,255,255,0.08)",

                                            background:
                                                "rgba(255,255,255,0.03)",

                                            color:
                                                "var(--text-secondary)",

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
                                                "rgba(255,255,255,0.03)";

                                            e.currentTarget.style.color =
                                                "var(--text-secondary)";
                                        }}
                                    >
                                        <Filter
                                            size={15}
                                            opacity={0.6}
                                        />
                                    </button>
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

                    {/* TYPE CHIPS */}
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                        }}
                    >
                        {[
                            "All",
                            "Task",
                            "Project",
                            "Goal",
                            "Note",
                            "Reminder",
                        ].map((type) => (
                            <button
                                key={type}
                                onClick={() =>
                                    setSelectedType(type)
                                }
                                style={{
                                    padding: "8px 14px",

                                    borderRadius: "999px",

                                    background:
                                        selectedType === type
                                            ? typeStyles[type].bg
                                            : "rgba(255,255,255,0.03)",

                                    border:
                                        selectedType === type
                                            ? `1px solid ${typeStyles[type].border}`
                                            : "1px solid rgba(255,255,255,0.06)",

                                    color:
                                        selectedType === type
                                            ? "var(--text-primary)"
                                            : "var(--text-secondary)",

                                    fontSize: "0.78rem",

                                    fontWeight: "300",

                                    cursor: "pointer",

                                    transition: "all 0.2s ease",
                                }}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    {/* GIANT CARD */}
                    <div
                        style={{
                            background: "var(--glass-bg)",

                            border:
                                "1px solid var(--glass-border)",

                            borderRadius:
                                "var(--radius-large)",

                            backdropFilter: "blur(20px)",

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
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        fontSize: "1rem",
                                        fontWeight: "400",
                                    }}
                                >
                                    Search Results
                                </div>

                                <div
                                    style={{
                                        fontSize: "0.75rem",

                                        opacity: 0.45,

                                        marginTop: "4px",
                                    }}
                                >
                                    {filteredResults.length} items
                                </div>
                            </div>
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

                                        opacity: 0.45,
                                    }}
                                >
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
                                            marginTop: "6px",
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
                <TaskDetailsModal
                    task={selectedTask}
                    onClose={() =>
                        setSelectedTask(null)
                    }
                />
            )}

            {selectedProject && (
                <ProjectDetailsModal
                    project={selectedProject}
                    onClose={() =>
                        setSelectedProject(null)
                    }
                />
            )}

            {selectedGoal && (
                <GoalDetailsModal
                    goal={selectedGoal}
                    onClose={() =>
                        setSelectedGoal(null)
                    }
                />
            )}

            {selectedReminder && (
                <ReminderDetailsModal
                    reminder={selectedReminder}
                    onClose={() =>
                        setSelectedReminder(null)
                    }
                />
            )}

            {selectedNote && (
                <NoteDetailsModal
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