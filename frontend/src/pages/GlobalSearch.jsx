import MainLayout from "../layouts/MainLayout";
import GlassCard from "../components/GlassCard";
import { Search } from "lucide-react";

import {
    useState,
    useEffect,
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

function GlobalSearch() {
    const [
        selectedFilter,
        setSelectedFilter,
    ] = useState("All");

    const [
        searchTerm,
        setSearchTerm,
    ] = useState("");

    const [
        searchResults,
        setSearchResults,
    ] = useState([]);

    //FUNCTIONS
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

    const filteredResults =
        searchResults.filter(
            (item) => {
                const matchesSearch =
                    item.title
                        .toLowerCase()
                        .includes(
                            searchTerm.toLowerCase()
                        );

                const matchesFilter =
                    selectedFilter === "All" ||
                    item.type ===
                    selectedFilter.replace(
                        /s$/,
                        ""
                    );

                return (
                    matchesSearch &&
                    matchesFilter
                );
            }
        );
    return (
        <MainLayout>
            <GlassCard minHeight="700px">
                {/* HEADER */}
                <div
                    style={{
                        marginBottom: "32px",
                    }}
                >
                    {/* SEARCH BAR */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "32px",
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                maxWidth: "700px",

                                display: "flex",
                                alignItems: "center",
                                gap: "12px",

                                padding: "18px 22px",

                                borderRadius: "999px",

                                background:
                                    "rgba(255,255,255,0.04)",

                                border:
                                    "1px solid rgba(255,255,255,0.08)",

                                backdropFilter: "blur(20px)",

                                boxShadow:
                                    "0 8px 32px rgba(0,0,0,0.18)",
                            }}
                        >
                            <Search
                                size={18}
                                strokeWidth={1.5}
                                color="rgba(255,255,255,0.5)"
                            />

                            <input
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(
                                        e.target.value
                                    )
                                }
                                placeholder="Search everything..."
                                style={{
                                    flex: 1,

                                    background:
                                        "transparent",

                                    border: "none",

                                    outline: "none",

                                    color:
                                        "var(--text-primary)",

                                    fontSize: "0.95rem",

                                    fontWeight: "300",
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* FILTER CHIPS */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",

                        gap: "8px",

                        flexWrap: "wrap",

                        marginBottom: "32px",
                    }}
                >
                    {[
                        {
                            label: "All",
                            bg: "rgba(255,255,255,0.08)",
                            border: "rgba(255,255,255,0.08)",
                        },
                        ...filterChips,
                    ].map((chip) => (
                        <button
                            key={chip.label}
                            onClick={() =>
                                setSelectedFilter(
                                    chip.value || "All"
                                )
                            }
                            style={{
                                padding: "6px 12px",

                                borderRadius:
                                    "999px",

                                border:
                                    "1px solid rgba(255,255,255,0.08)",

                                background:
                                    selectedFilter === (chip.value || "All")
                                        ? chip.bg
                                        : "transparent",

                                border:
                                    selectedFilter === (chip.value || "All")
                                        ? `1px solid ${chip.border}`
                                        : "1px solid rgba(255,255,255,0.08)",

                                color:
                                    selectedFilter === (chip.value || "All")
                                        ? "var(--text-primary)"
                                        : "var(--text-secondary)",

                                cursor:
                                    "pointer",

                                fontSize:
                                    "0.8rem",

                                fontWeight:
                                    "300",
                            }}
                        >
                            {chip.label}
                        </button>
                    ))}
                </div>

                {/* RESULTS COUNT */}
                <p
                    style={{
                        fontSize: "0.8rem",
                        fontWeight: "300",
                        color: "var(--text-secondary)",
                        marginBottom: "16px",
                    }}
                >
                    {filteredResults.length} Results Found
                </p>

                {/* RESULTS */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    {filteredResults.length === 0 && (
                        <div
                            style={{
                                textAlign: "center",
                                padding: "80px 20px",
                                color: "var(--text-secondary)",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "0.95rem",
                                    marginBottom: "8px",
                                }}
                            >
                                No results found
                            </p>

                            <p
                                style={{
                                    fontSize: "0.8rem",
                                }}
                            >
                                Try another search term
                            </p>
                        </div>
                    )}
                    {filteredResults.length > 0 && filteredResults.map((item) => (
                        <div
                            key={item._id}
                            style={{
                                borderRadius: "12px",
                                padding: "18px",

                                background: "transparent",

                                border: "none",

                                cursor:
                                    "pointer",

                                transition:
                                    "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.05)";

                                e.currentTarget.style.transform =
                                    "translateY(-1px)";
                            }}

                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "transparent";

                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",

                                    marginBottom: "6px",
                                }}
                            >
                                <div
                                    style={{
                                        fontWeight: "300",
                                        fontSize: "0.95rem",

                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",

                                        flex: 1,
                                        marginRight: "12px",
                                    }}
                                >
                                    {item.title}
                                </div>

                                <span
                                    style={{
                                        padding: "4px 8px",
                                        borderRadius: "999px",
                                        fontSize: "0.68rem",

                                        background:
                                            item.type === "Project"
                                                ? "#063f4733"
                                                : item.type === "Task"
                                                    ? "#72715c33"
                                                    : item.type === "Goal"
                                                        ? "#c59c7033"
                                                        : item.type === "Note"
                                                            ? "#52677d33"
                                                            : "#83545c33",

                                        border:
                                            item.type === "Project"
                                                ? "1px solid #063f4766"
                                                : item.type === "Task"
                                                    ? "1px solid #72715c66"
                                                    : item.type === "Goal"
                                                        ? "1px solid #c59c7066"
                                                        : item.type === "Note"
                                                            ? "1px solid #52677d66"
                                                            : "1px solid #83545c66",
                                    }}
                                >
                                    {item.type}
                                </span>
                            </div>

                            <div
                                style={{
                                    fontSize:
                                        "0.8rem",

                                    color:
                                        "var(--text-secondary)",
                                }}
                            >
                                {item.subtitle}
                            </div>
                        </div>
                    ))}
                </div>
            </GlassCard>
        </MainLayout>
    );
}

export default GlobalSearch;