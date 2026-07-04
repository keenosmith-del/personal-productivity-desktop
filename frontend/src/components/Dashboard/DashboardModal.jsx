import {
    CheckSquare,
    Folder,
    AlarmClock,
    Sprout,
    Check,
    CircleAlert,
    Shield,
    Pause,
    LoaderCircle,
    Ellipsis,
} from "lucide-react";

import { useState } from "react";

import Toast from "../Toast";

import TaskDetailsModal from "../Tasks/TaskDetailsModal";
import ProjectDetailsModal from "../Projects/ProjectDetailsModal";
import GoalDetailsModal from "../Goals/GoalDetailsModal";
import ReminderDetailsModal from "../Reminders/ReminderDetailsModal";

import TaskModal from "../Tasks/TaskModal";
import ProjectModal from "../Projects/ProjectModal";
import GoalModal from "../Goals/GoalModal";
import ReminderModal from "../Reminders/ReminderModal";

import { updateTask, deleteTask } from "../../services/taskService";
import { updateProject, deleteProject } from "../../services/projectService";
import { updateGoal, deleteGoal } from "../../services/goalService";
import { updateReminder, deleteReminder } from "../../services/reminderService";

function DashboardModal({
    title,
    subtitle,

    events,

    tasks,
    projects,
    goals,
    reminders,

    remainingCount,

    expanded,
    onShowAll,
    onShowLess,

    onRefresh,

    onClose,
}) {
    // props
    const date = new Date();

    const [selectedTask, setSelectedTask] =
        useState(null);

    const [selectedProject, setSelectedProject] =
        useState(null);

    const [selectedGoal, setSelectedGoal] =
        useState(null);

    const [selectedReminder, setSelectedReminder] =
        useState(null);

    // states
    const [editingTask, setEditingTask] =
        useState(null);

    const [editingProject, setEditingProject] =
        useState(null);

    const [editingGoal, setEditingGoal] =
        useState(null);

    const [editingReminder, setEditingReminder] =
        useState(null);

    const [previousTask, setPreviousTask] =
        useState(null);

    const [previousProject, setPreviousProject] =
        useState(null);

    const [previousGoal, setPreviousGoal] =
        useState(null);

    const [previousReminder, setPreviousReminder] =
        useState(null);

    const [showDashboardContent, setShowDashboardContent] =
        useState(true);

    const [toast, setToast] =
        useState("");

    const [returnToDashboard, setReturnToDashboard] =
        useState(true);

    const handleEventClick = (event) => {

        setShowDashboardContent(false);

        switch (event.type) {
            case "task":
                setSelectedTask(event);
                break;

            case "project":
                setSelectedProject(event);
                break;

            case "goal":
                setSelectedGoal(event);
                break;

            case "reminder":
                setSelectedReminder(event);
                break;

            default:
                break;
        }
    };

    // edit
    const handleEditTask = (task) => {
        setSelectedTask(null);
        setReturnToDashboard(false);
        setPreviousTask(task);
        setEditingTask(task);
    };

    const handleEditProject = (project) => {
        setSelectedProject(null);
        setReturnToDashboard(false);
        setPreviousProject(project);
        setEditingProject(project);
    };

    const handleEditGoal = (goal) => {
        setSelectedGoal(null);
        setReturnToDashboard(false);
        setPreviousGoal(goal);
        setEditingGoal(goal);
    };

    const handleEditReminder = (reminder) => {
        setSelectedReminder(null);
        setReturnToDashboard(false);
        setPreviousReminder(reminder);
        setEditingReminder(reminder);
    };

    // delete
    const handleDeleteTask = async (taskId) => {

        await deleteTask(taskId);

        await onRefresh();

        setToast("Task deleted");

        setTimeout(() => {
            setToast("");
        }, 3000);

        setSelectedTask(null);

        setShowDashboardContent(true);

        setReturnToDashboard(true);
    };

    const handleDeleteProject = async (projectId) => {

        await deleteProject(projectId);

        await onRefresh();

        setToast("Project deleted");

        setTimeout(() => {
            setToast("");
        }, 3000);

        setSelectedProject(null);

        setShowDashboardContent(true);

        setReturnToDashboard(true);
    };

    const handleDeleteGoal = async (goalId) => {

        await deleteGoal(goalId);

        await onRefresh();

        setToast("Goal deleted");

        setTimeout(() => {
            setToast("");
        }, 3000);

        setSelectedGoal(null);

        setShowDashboardContent(true);

        setReturnToDashboard(true);
    };

    const handleDeleteReminder = async (reminderId) => {

        await deleteReminder(reminderId);

        await onRefresh();

        setToast("Reminder deleted");

        setTimeout(() => {
            setToast("");
        }, 3000);

        setSelectedReminder(null);

        setShowDashboardContent(true);

        setReturnToDashboard(true);
    };

    // complete
    const handleCompleteTask = async (task) => {

        await updateTask(task._id, {
            ...task,

            completed: true,

            status: "Complete",

            completedDate:
                new Date()
                    .toLocaleDateString(
                        "en-GB"
                    ),
        });

        await onRefresh();

        setSelectedTask({
            ...task,

            completed: true,

            status: "Complete",

            completedDate:
                new Date()
                    .toLocaleDateString(
                        "en-GB"
                    ),
        });
    };

    const handleCompleteProject = async (project) => {

        await updateProject(project._id, {
            ...project,

            completed: true,

            status: "Complete",

            completedDate:
                new Date()
                    .toLocaleDateString(
                        "en-GB"
                    ),
        });

        await onRefresh();

        setSelectedProject({
            ...project,

            completed: true,

            status: "Complete",

            completedDate:
                new Date()
                    .toLocaleDateString(
                        "en-GB"
                    ),
        });
    };

    const handleCompleteGoal = async (goal) => {

        await updateGoal(goal._id, {
            ...goal,

            completed: true,

            status: "Complete",

            completedDate:
                new Date()
                    .toLocaleDateString(
                        "en-GB"
                    ),
        });

        await onRefresh();

        setSelectedGoal({
            ...goal,

            completed: true,

            status: "Complete",

            completedDate:
                new Date()
                    .toLocaleDateString(
                        "en-GB"
                    ),
        });
    };

    const handleCompleteReminder = async (reminder) => {

        await updateReminder(reminder._id, {
            ...reminder,

            completed: true,

            status: "Complete",

            completedDate:
                new Date()
                    .toLocaleDateString(
                        "en-GB"
                    ),
        });

        await onRefresh();

        setSelectedReminder({
            ...reminder,

            completed: true,

            status: "Complete",

            completedDate:
                new Date()
                    .toLocaleDateString(
                        "en-GB"
                    ),
        });
    };

    // restore
    const handleRestoreTask = async (task) => {

        await updateTask(task._id, {
            ...task,

            completed: false,

            status: "Active",

            completedDate: null,
        });

        await onRefresh();

        setSelectedTask({
            ...task,

            completed: false,

            status: "Active",

            completedDate: null,
        });
    };

    const handleRestoreProject = async (project) => {

        await updateProject(project._id, {
            ...project,

            completed: false,

            status: "Active",

            completedDate: null,
        });

        await onRefresh();

        setSelectedProject({
            ...project,

            completed: false,

            status: "Active",

            completedDate: null,
        });
    };

    const handleRestoreGoal = async (goal) => {

        await updateGoal(goal._id, {
            ...goal,

            completed: false,

            status: "Active",

            completedDate: null,
        });

        await onRefresh();

        setSelectedGoal({
            ...goal,

            completed: false,

            status: "Active",

            completedDate: null,
        });
    };

    const handleRestoreReminder = async (reminder) => {

        await updateReminder(reminder._id, {
            ...reminder,

            completed: false,

            status: "Active",

            completedDate: null,
        });

        await onRefresh();

        setSelectedReminder({
            ...reminder,

            completed: false,

            status: "Active",

            completedDate: null,
        });
    };

    const eventIcons = {
        task: CheckSquare,
        project: Folder,
        goal: Sprout,
        reminder: AlarmClock,
    };

    const formatDueDate = (dueDate) => {
        if (!dueDate) return "";

        const today = new Date();
        const tomorrow = new Date();

        tomorrow.setDate(
            tomorrow.getDate() + 1
        );

        const eventDate =
            new Date(dueDate);

        const todayString =
            today.toDateString();

        const tomorrowString =
            tomorrow.toDateString();

        if (
            eventDate.toDateString() ===
            todayString
        ) {
            return "Today";
        }

        if (
            eventDate.toDateString() ===
            tomorrowString
        ) {
            return "Tomorrow";
        }

        return eventDate.toLocaleDateString(
            "en-GB",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        );
    };

    // completedDate in (Event)Modal changes format of completedDate
    const formatCompletedDate = (
        completedDate
    ) => {
        if (!completedDate) {
            return "";
        }

        const [
            day,
            month,
            year,
        ] = completedDate.split("/");

        const eventCompletedDate =
            new Date(
                year,
                month - 1,
                day
            );

        const today = new Date();
        const tomorrow = new Date();

        tomorrow.setDate(
            tomorrow.getDate() + 1
        );

        if (
            eventCompletedDate.toDateString() ===
            today.toDateString()
        ) {
            return "Today";
        }

        if (
            eventCompletedDate.toDateString() ===
            tomorrow.toDateString()
        ) {
            return "Tomorrow";
        }

        return eventCompletedDate.toLocaleDateString(
            "en-GB",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        );
    };

    const getDisplayStatus = (event) => {
        if (event.completed) {
            return "Complete";
        }

        if (event.status === "Paused") {
            return "Paused";
        }

        const eventDate = new Date(event.dueDate);

        eventDate.setHours(0, 0, 0, 0);

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        if (eventDate < today) {
            return "Overdue";
        }

        return event.status || "Active";
    };

    const statusConfig = {
        Active: {
            icon: Shield,
            label: "Active",

            background: "#4d689333",
            border: "#4d689366",
            color: "#8faec0",
        },

        "In Progress": {
            icon: LoaderCircle,
            label: "In Progress",

            background: "#5d766233",
            border: "#5d766266",
            color: "#a8bf9f",
        },

        Paused: {
            icon: Pause,
            label: "Paused",

            background: "#45575b33",
            border: "#45575b66",
            color: "#9ca9ad",
        },

        Overdue: {
            icon: CircleAlert,
            label: "Overdue",

            background: "#8b5a5a33",
            border: "#8b5a5a66",
            color: "#c79a9a",
        },

        // complete or completed? needs to be consistent
        Complete: {
            icon: Check,
            label: "Complete",

            background: "#728a6e33",
            border: "#728a6e66",
            color: "#9bc091",
        },
    };

    // tinted card colors
    const chipStyles = {
        task: {
            bg: "#4d689333",
            border: "#4d689366",
        },

        goal: {
            bg: "#bf877633",
            border: "#bf877666",
        },

        reminder: {
            bg: "#5d766233",
            border: "#5d766266",
        },

        project: {
            bg: "#72515c33",
            border: "#72515c66",
        },
    };

    const emptyStates = {
        Urgent: {
            title: "Nothing urgent right now.",
            message:
                "You're in good shape. High-priority tasks, projects, goals and reminders will appear here when they need attention.",
        },

        Projects: {
            title: "No projects yet.",
            message:
                "Create a project to start organising larger pieces of work and long-term plans.",
        },

        Tasks: {
            title: "No tasks yet.",
            message:
                "Tasks you create will appear here so you can keep track of what needs to be done.",
        },

        Goals: {
            title: "No goals yet.",
            message:
                "Set a goal to begin tracking progress toward something meaningful.",
        },

        Reminders: {
            title: "No reminders yet.",
            message:
                "Important reminders and follow-ups will appear here once you've added them.",
        },
    };
    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,

                background:
                    "rgba(0,0,0,0.35)",

                backdropFilter:
                    "blur(20px)",

                display: "flex",

                justifyContent:
                    "center",

                alignItems: "center",

                zIndex: 2000,
            }}
        >
            {/* dashboard panel */}
            {showDashboardContent && (
                <div
                    onClick={(e) =>
                        e.stopPropagation()
                    }
                    style={{
                        width: "520px",

                        maxHeight: "80vh",

                        overflowY: "auto",

                        background:
                            "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",

                        border:
                            "1px solid rgba(255,255,255,0.10)",

                        borderRadius: "36px",

                        backdropFilter: "blur(30px)",

                        boxShadow:
                            "0 30px 80px rgba(0,0,0,0.45)",

                        padding: "36px",
                    }}
                >
                    {/* HEADER */}

                    <div
                        style={{
                            display: "flex",

                            justifyContent:
                                "space-between",

                            alignItems: "center",

                            marginBottom: "32px",
                        }}
                    >
                        <div>
                            <h2
                                style={{
                                    margin: 0,

                                    fontWeight: "350",

                                    letterSpacing:
                                        "-0.03em",
                                }}
                            >
                                {title}
                            </h2>

                            <p
                                style={{
                                    marginTop: "8px",

                                    fontSize: "0.82rem",

                                    opacity: 0.55,
                                }}
                            >
                                {subtitle}
                            </p>
                        </div>

                        {/* meatball and x pill*/}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",

                                gap: "6px",

                                padding: "2px",

                                borderRadius: "999px",

                                background: "rgb(36, 36, 36)",

                                backdropFilter: "blur(28px)",

                                boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                            }}
                        >
                            {/* meatball */}
                            <div
                                style={{
                                    position: "relative",
                                }}
                            >
                                <button
                                    style={{
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
                                    }}
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
                                    />
                                </button>
                            </div>
                            {/* close x */}
                            <div
                                style={{
                                    position: "relative",
                                }}
                            >
                                <button
                                    onClick={onClose}
                                    style={{
                                        width: "32px",
                                        height: "32px",

                                        borderRadius: "999px",

                                        border: "rgb(33, 33, 33)",

                                        background:
                                            "rgb(33, 33, 33)",

                                        color:
                                            "var(--text-secondary)",

                                        cursor: "pointer",

                                        fontSize: "0.85rem",

                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                            "rgb(33, 33, 33)";

                                        e.currentTarget.style.transform =
                                            "translateY(-1px)";

                                        e.currentTarget.style.color =
                                            "var(--text-primary)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                            "rgb(33, 33, 33)";

                                        e.currentTarget.style.transform =
                                            "translateY(0)";

                                        e.currentTarget.style.color =
                                            "var(--text-secondary)";
                                    }}
                                >
                                    x
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* TODAY'S DATE TITLE */}

                    {!expanded && (
                        <div
                            style={{
                                textAlign: "center",
                                marginBottom: "20px",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "2rem",

                                    fontWeight: "300",

                                    letterSpacing:
                                        "-0.04em",
                                }}
                            >
                                {date.toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "long",
                                        day: "numeric",
                                    }
                                )}
                            </div>

                            <div
                                style={{
                                    fontSize: "0.9rem",

                                    opacity: 0.55,

                                    marginTop: "4px",
                                }}
                            >
                                {date.toLocaleDateString(
                                    "en-US",
                                    {
                                        weekday: "long",
                                    }
                                )}
                            </div>

                            <div
                                style={{
                                    fontSize: "0.75rem",

                                    opacity: 0.4,

                                    marginTop: "8px",
                                }}
                            >
                                Showing {events.length} out of{" "}
                                {events.length + remainingCount}{" "}
                                {title === "High Priority"
                                    ? "urgent items"
                                    : title.toLowerCase()}

                                {events.length + remainingCount !== 1
                                    ? ""
                                    : ""}
                            </div>
                        </div>
                    )}

                    {/* DIVIDER */}

                    <div
                        style={{
                            height: "1px",

                            background:
                                "rgba(255,255,255,0.05)",

                            marginBottom: "24px",
                        }}
                    />

                    {/* EVENTS */}
                    <div
                        style={{
                            marginBottom: "32px",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "0.82rem",

                                opacity: 0.5,

                                marginBottom: "12px",
                            }}
                        >
                            {events.length > 0 &&
                                (expanded
                                    ? `${events.length} event${events.length !== 1
                                        ? "s"
                                        : ""
                                    }`
                                    : "Events")}
                        </div>

                        {events.length === 0 ? (
                            <div
                                style={{
                                    fontSize: "0.8rem",
                                    opacity: 0.45,
                                    lineHeight: 1.7,
                                    textAlign: "center",
                                    padding: "24px 12px",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "0.92rem",
                                        marginBottom: "12px",
                                        opacity: 0.8,
                                    }}
                                >
                                    {emptyStates[title]?.title}
                                </div>

                                {emptyStates[title]?.message}
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: "grid",

                                    gridTemplateColumns:
                                        "1fr 1fr",

                                    gap: "14px",
                                }}
                            >
                                {events.map((event) => {
                                    const chipStyle =
                                        chipStyles[event.type];

                                    const Icon =
                                        eventIcons[event.type];

                                    const displayStatus =
                                        getDisplayStatus(event);

                                    const status =
                                        statusConfig[displayStatus];

                                    const StatusIcon =
                                        status.icon;

                                    return (
                                        <div
                                            key={event.title}
                                            onClick={() =>
                                                handleEventClick(event)
                                            }
                                            style={{
                                                background: `
                                                linear-gradient(
                                                    135deg,
                                                    ${chipStyle.bg},
                                                    rgba(255,255,255,0.02)
                                                )
                                            `,

                                                border: `1px solid ${chipStyle.border}`,

                                                borderRadius: "28px",

                                                minHeight: "190px",

                                                padding: "20px",

                                                backdropFilter: "blur(30px)",

                                                display: "flex",

                                                flexDirection: "column",

                                                alignItems: "center",

                                                justifyContent: "space-between",

                                                transition: "all 0.2s ease",

                                                cursor: "pointer",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform =
                                                    "translateY(-2px) scale(1.01)";

                                                e.currentTarget.style.boxShadow =
                                                    "0 16px 32px rgba(0,0,0,0.18)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform =
                                                    "translateY(0) scale(1)";

                                                e.currentTarget.style.boxShadow =
                                                    "none";
                                            }}
                                        >
                                            {/* top row meatball */}
                                            {/* HOW DO I MAKE THESE DAMN MEATBALLS GO TO THE RIGHT!! */}
                                            <div
                                                style={{
                                                    position: "right",

                                                    display: "flex",
                                                    justifyItems: "right",
                                                    alignItems: "right",
                                                }}
                                            >
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                    style={{
                                                        background: "none",
                                                        border: "none",

                                                        color: "var(--text-secondary)",

                                                        cursor: "pointer",

                                                        display: "flex",

                                                        alignItems: "center",

                                                        justifyContent: "center",

                                                        padding: 0,
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
                                                    <Ellipsis size={18} />
                                                </button>
                                            </div>

                                            {/* ICON */}
                                            <div
                                                style={{
                                                    width: "54px",
                                                    height: "54px",

                                                    borderRadius: "50%",

                                                    display: "flex",

                                                    alignItems: "center",

                                                    justifyContent: "center",

                                                }}
                                            >
                                                <Icon size={22} />
                                            </div>

                                            {/* TITLE */}

                                            <div
                                                style={{
                                                    textAlign: "center",

                                                    marginTop: "18px",

                                                    width: "100%",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        fontSize: "0.92rem",

                                                        fontWeight: "350",

                                                        letterSpacing: "-0.02em",

                                                        marginBottom: "8px",

                                                        whiteSpace: "nowrap",

                                                        overflow: "hidden",

                                                        textOverflow: "ellipsis",

                                                        width: "100%",

                                                        maxWidth: "160px",

                                                        marginLeft: "auto",

                                                        marginRight: "auto",
                                                    }}
                                                >
                                                    {event.title}
                                                </div>

                                                <div
                                                    style={{
                                                        fontSize: "0.72rem",

                                                        opacity: 0.55,

                                                        display: "flex",

                                                        flexDirection: "column",

                                                        gap: "4px",

                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <div>
                                                        Due{" "}{formatDueDate(
                                                            event.dueDate
                                                        )}
                                                    </div>

                                                    {event.completed && (
                                                        <div
                                                            style={{
                                                                fontSize: "0.68rem",

                                                                opacity: 0.45,
                                                            }}
                                                        >
                                                            {event.completedDate
                                                                ? `Completed ${formatCompletedDate(
                                                                    event.completedDate
                                                                )}`
                                                                : "Completed"}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* STATUS CHIP */}
                                            <div
                                                style={{
                                                    marginTop: "18px",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "inline-flex",

                                                        alignItems: "center",

                                                        gap: "8px",

                                                        padding: "10px 18px",

                                                        borderRadius: "999px",

                                                        background:
                                                            status.background,

                                                        border:
                                                            `1px solid ${status.border}`,

                                                        color:
                                                            status.color,

                                                        fontSize: "0.8rem",

                                                        fontWeight: "300",

                                                        transition:
                                                            "all 0.2s ease",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform =
                                                            "translateY(-1px)";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform =
                                                            "translateY(0)";
                                                    }}
                                                >
                                                    <StatusIcon size={14} />

                                                    {status.label}
                                                </div>
                                            </div>

                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    {/* expand / collapse */}
                    {!expanded && remainingCount > 0 && (
                        <div
                            onClick={onShowAll}
                            style={{
                                marginTop: "18px",

                                textAlign: "center",

                                fontSize: "0.74rem",

                                opacity: 0.4,

                                fontWeight: "300",

                                cursor: "pointer",

                                transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.opacity =
                                    "0.65";

                                e.currentTarget.style.transform =
                                    "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.opacity =
                                    "0.4";

                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >
                            +{remainingCount} other
                            {remainingCount !== 1
                                ? "s"
                                : ""}
                        </div>
                    )}

                    {expanded && (
                        <div
                            onClick={onShowLess}
                            style={{
                                marginTop: "18px",

                                textAlign: "center",

                                fontSize: "0.74rem",

                                opacity: 0.4,

                                fontWeight: "300",

                                cursor: "pointer",

                                transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.opacity =
                                    "0.65";

                                e.currentTarget.style.transform =
                                    "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.opacity =
                                    "0.4";

                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >
                            Show less
                        </div>
                    )}

                    {/* BUTTON */}

                    <div
                        style={{
                            display: "flex",

                            justifyContent: "flex-end",

                            gap: "10px",

                            marginTop: "24px",
                        }}
                    >
                        <button
                            onClick={onClose}
                            style={{
                                padding: "11px 18px",

                                borderRadius: "999px",

                                background:
                                    "rgba(255,77,77,0.12)",

                                border:
                                    "1px solid rgba(255,77,77,0.25)",

                                color:
                                    "var(--danger)",

                                fontSize: "0.8rem",

                                fontWeight: "300",

                                cursor: "pointer",

                                transition: "all 0.2s ease",

                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(255,77,77,0.20)";

                                e.currentTarget.style.transform =
                                    "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(255,77,77,0.12)";

                                e.currentTarget.style.transform =
                                    "translateY(0)";

                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            {/* open modal from individual */}
            {selectedTask && (
                <TaskDetailsModal
                    task={selectedTask}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask}
                    onCompleteTask={handleCompleteTask}
                    onRestoreTask={handleRestoreTask}
                    onClose={() => {
                        setSelectedTask(null);

                        if (returnToDashboard) {
                            setShowDashboardContent(true);
                        }

                        setShowDashboardContent(true);
                    }}
                />
            )}
            {editingTask && (
                <TaskModal
                    mode="edit"
                    task={editingTask}
                    onClose={() => {
                        setEditingTask(null);
                        setSelectedTask(previousTask);
                    }}
                    onSave={async (taskData) => {
                        await updateTask(
                            editingTask._id,
                            taskData
                        );

                        await onRefresh();

                        setToast("Task updated");

                        setTimeout(() => {
                            setToast("");
                        }, 3000);

                        setEditingTask(null);

                        setSelectedTask({
                            ...previousTask,
                            ...taskData,
                        });
                    }}
                />
            )}

            {selectedProject && (
                <ProjectDetailsModal
                    project={selectedProject}
                    onEditProject={handleEditProject}
                    onDeleteProject={handleDeleteProject}
                    onCompleteProject={handleCompleteProject}
                    onRestoreProject={handleRestoreProject}
                    onClose={() => {
                        setSelectedProject(null);

                        if (returnToDashboard) {
                            setShowDashboardContent(true);
                        }

                        setShowDashboardContent(true);
                    }}
                />
            )}
            {editingProject && (
                <ProjectModal
                    mode="edit"
                    project={editingProject}
                    onClose={() => {
                        setEditingProject(null);
                        setSelectedProject(previousProject);
                    }}
                    onSave={async (projectData) => {
                        await updateProject(
                            editingProject._id,
                            projectData
                        );

                        await onRefresh();

                        setToast("Project updated");

                        setTimeout(() => {
                            setToast("");
                        }, 3000);

                        setEditingProject(null);

                        setSelectedProject({
                            ...previousProject,
                            ...projectData,
                        });
                    }}
                />
            )}

            {selectedGoal && (
                <GoalDetailsModal
                    goal={selectedGoal}
                    onEditGoal={handleEditGoal}
                    onDeleteGoal={handleDeleteGoal}
                    onCompleteGoal={handleCompleteGoal}
                    onRestoreGoal={handleRestoreGoal}
                    onClose={() => {
                        setSelectedGoal(null);

                        if (returnToDashboard) {
                            setShowDashboardContent(true);
                        }

                        setShowDashboardContent(true);
                    }}
                />
            )}
            {editingGoal && (
                <GoalModal
                    mode="edit"
                    goal={editingGoal}
                    onClose={() => {
                        setEditingGoal(null);
                        setSelectedGoal(previousGoal);
                    }}
                    onSave={async (goalData) => {
                        await updateGoal(
                            editingGoal._id,
                            goalData
                        );

                        await onRefresh();

                        setToast("Goal updated");

                        setTimeout(() => {
                            setToast("");
                        }, 3000);

                        setEditingGoal(null);

                        setSelectedGoal({
                            ...previousGoal,
                            ...goalData,
                        });
                    }}
                />
            )}

            {selectedReminder && (
                <ReminderDetailsModal
                    reminder={selectedReminder}
                    onEditReminder={handleEditReminder}
                    onDeleteReminder={handleDeleteReminder}
                    onCompleteReminder={handleCompleteReminder}
                    onRestoreReminder={handleRestoreReminder}
                    onClose={() => {
                        setSelectedReminder(null);

                        if (returnToDashboard) {
                            setShowDashboardContent(true);
                        }

                        setShowDashboardContent(true);
                    }}
                />
            )}
            {editingReminder && (
                <ReminderModal
                    mode="edit"

                    reminder={editingReminder}

                    onClose={() => {
                        setEditingReminder(null);
                        setSelectedReminder(previousReminder);
                    }}

                    onSave={async (reminderData) => {
                        await updateReminder(
                            editingReminder._id,
                            reminderData
                        );

                        await onRefresh();

                        setToast("Reminder updated");

                        setTimeout(() => {
                            setToast("");
                        }, 3000);

                        setEditingReminder(null);

                        setSelectedReminder({
                            ...previousReminder,
                            ...reminderData,
                        });
                    }}
                />
            )}
            <Toast
                message={toast}
            />
        </div>
    );
}

export default DashboardModal;