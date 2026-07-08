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
    Heart,
    Flag,
} from "lucide-react";

import { useState } from "react";

import Toast from "../Toast";

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

    // states
    const [editingTask, setEditingTask] =
        useState(null);

    const [editingProject, setEditingProject] =
        useState(null);

    const [editingGoal, setEditingGoal] =
        useState(null);

    const [editingReminder, setEditingReminder] =
        useState(null);

    const [showDashboardContent, setShowDashboardContent] =
        useState(true);

    const [toast, setToast] =
        useState("");

    const [hoveredCard, setHoveredCard] =
        useState(null);

    const [openEventMenu, setOpenEventMenu] =
        useState(null);

    const [showCloseButton, setShowCloseButton] =
        useState(false);

    // handle
    const handleEventClick = (event) => {

        setOpenEventMenu(null);

        setShowDashboardContent(false);

        switch (event.type) {
            case "task":
                setEditingTask(event);
                break;

            case "project":
                setEditingProject(event);
                break;

            case "goal":
                setEditingGoal(event);
                break;

            case "reminder":
                setEditingReminder(event);
                break;

            default:
                break;
        }
    };

    // delete
    const handleDeleteTask = async (taskId) => {

        await deleteTask(taskId);

        await onRefresh();

        setToast("Task deleted");

        setTimeout(() => {
            setToast("");
        }, 3000);

        setEditingTask(null);

        setShowDashboardContent(true);
    };

    const handleDeleteProject = async (projectId) => {

        await deleteProject(projectId);

        await onRefresh();

        setToast("Project deleted");

        setTimeout(() => {
            setToast("");
        }, 3000);

        setEditingProject(null);

        setShowDashboardContent(true);
    };

    const handleDeleteGoal = async (goalId) => {

        await deleteGoal(goalId);

        await onRefresh();

        setToast("Goal deleted");

        setTimeout(() => {
            setToast("");
        }, 3000);

        setEditingGoal(null);

        setShowDashboardContent(true);
    };

    const handleDeleteReminder = async (reminderId) => {

        await deleteReminder(reminderId);

        await onRefresh();

        setToast("Reminder deleted");

        setTimeout(() => {
            setToast("");
        }, 3000);

        setEditingReminder(null);

        setShowDashboardContent(true);
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

        setEditingTask({
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

        setEditingProject({
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

        setEditingGoal({
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

        setEditingReminder({
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

        setEditingTask({
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

        setEditingProject({
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

        setEditingGoal({
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

        setEditingReminder({
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

    // handle toggle flag
    const handleToggleFlag = async (event) => {
        try {
            switch (event.type) {
                case "task":
                    await updateTask(event._id, {
                        ...event,
                        flagged: !event.flagged,
                    });
                    break;

                case "project":
                    await updateProject(event._id, {
                        ...event,
                        flagged: !event.flagged,
                    });
                    break;

                case "goal":
                    await updateGoal(event._id, {
                        ...event,
                        flagged: !event.flagged,
                    });
                    break;

                case "reminder":
                    await updateReminder(event._id, {
                        ...event,
                        flagged: !event.flagged,
                    });
                    break;

                default:
                    return;
            }

            onRefresh();
        } catch (error) {
            console.error(error);
        }
    };

    // handle toggle like
    const handleToggleLike = async (event) => {
        try {
            switch (event.type) {
                case "task":
                    await updateTask(event._id, {
                        ...event,
                        liked: !event.liked,
                    });
                    break;

                case "project":
                    await updateProject(event._id, {
                        ...event,
                        liked: !event.liked,
                    });
                    break;

                case "goal":
                    await updateGoal(event._id, {
                        ...event,
                        liked: !event.liked,
                    });
                    break;

                case "reminder":
                    await updateReminder(event._id, {
                        ...event,
                        liked: !event.liked,
                    });
                    break;

                default:
                    return;
            }

            onRefresh();
        } catch (error) {
            console.error(error);
        }
    };


    // completedDate in (Event)Modal changes format of completedDate
    const formatCompletedDate = (completedDate) => {
        if (!completedDate) {
            return "";
        }

        let eventCompletedDate;

        if (completedDate.includes("/")) {
            const [day, month, year] =
                completedDate.split("/");

            eventCompletedDate = new Date(
                year,
                month - 1,
                day
            );
        } else {
            eventCompletedDate =
                new Date(completedDate);
        }

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

    const menuItemStyle = {
        width: "100%",

        padding: "10px 12px",

        background: "transparent",

        border: "none",

        color: "var(--text-primary)",

        textAlign: "left",

        fontSize: "0.8rem",

        fontWeight: "300",

        cursor: "pointer",

        transition: "all 0.2s ease",
    };

    return (
        <div
            onClick={() => {
                onClose();
            }}
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
                            justifyContent: "flex-end",
                            alignItems: "center",
                            marginBottom: "24px",
                        }}
                    >
                        {/* meatball and x pill - changed to only x */}
                        {/* close x */}
                        <div
                            style={{
                                position: "relative",
                            }}
                            onMouseEnter={() =>
                                setShowCloseButton(true)
                            }
                            onMouseLeave={() =>
                                setShowCloseButton(false)
                            }
                        >
                            <button
                                onClick={() => {
                                    onClose();
                                }}
                                style={{
                                    width: "30px",
                                    height: "30px",

                                    borderRadius: "999px",

                                    border: "none",

                                    background:
                                        "rgba(255,255,255,0.04)",

                                    color:
                                        "var(--text-secondary)",

                                    cursor: "pointer",

                                    fontSize: "0.8rem",

                                    transition: "all 0.2s ease",

                                    opacity: showCloseButton ? 1 : 0,

                                    transition: "opacity 0.2s ease",
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

                                    const displayStatus =
                                        getDisplayStatus(event);

                                    const status =
                                        statusConfig[displayStatus];

                                    return (
                                        <div
                                            key={event._id}
                                            onClick={() =>
                                                handleEventClick(event)
                                            }
                                            style={{
                                                position: "relative",

                                                background: "rgba(255,255,255,0.035)",

                                                border: "1px solid rgba(255,255,255,0.08)",

                                                borderRadius: "24px",

                                                backdropFilter: "blur(24px)",

                                                padding: "18px",

                                                minHeight: "185px",

                                                display: "flex",

                                                flexDirection: "column",

                                                transition: "all 0.25s ease",

                                                cursor: "pointer",

                                                overflow: "hidden",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform =
                                                    "translateY(-2px)";

                                                e.currentTarget.style.border =
                                                    "1px solid rgba(255,255,255,0.12)";
                                            }}

                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform =
                                                    "translateY(0)";

                                                e.currentTarget.style.border =
                                                    "1px solid rgba(255,255,255,0.08)";
                                            }}
                                        >

                                            {/* TOP ROW */}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "flex-start",
                                                    marginBottom: "10px",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        ...chipStyle,

                                                        padding: "5px 10px",

                                                        fontSize: "0.68rem",

                                                        borderRadius: "999px",

                                                        fontWeight: "300",

                                                        background:
                                                            status.background,

                                                        border:
                                                            `1px solid ${status.border}`,

                                                        color:
                                                            status.color,
                                                    }}
                                                >
                                                    {event.type.charAt(0).toUpperCase() +
                                                        event.type.slice(1)}
                                                </span>

                                                <div
                                                    style={{
                                                        transition: "opacity 0.2s ease",
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();

                                                        setOpenEventMenu(
                                                            openEventMenu === event._id
                                                                ? null
                                                                : event._id
                                                        );
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
                                                        size={18}
                                                        strokeWidth={1.6}
                                                    />
                                                    {openEventMenu === event._id && (
                                                        <div
                                                            onClick={(e) => e.stopPropagation()}
                                                            style={{
                                                                position: "absolute",

                                                                top: "26px",
                                                                right: 0,

                                                                width: "165px",

                                                                background:
                                                                    "rgba(20,20,20,0.96)",

                                                                backdropFilter:
                                                                    "blur(20px)",

                                                                border:
                                                                    "1px solid rgba(255,255,255,0.08)",

                                                                borderRadius: "16px",

                                                                overflow: "hidden",

                                                                zIndex: 1000,
                                                            }}
                                                        >

                                                            <div
                                                                style={{
                                                                    height: "1px",
                                                                    background:
                                                                        "rgba(255,255,255,0.06)",
                                                                }}
                                                            />

                                                            <button
                                                                onClick={async () => {
                                                                    switch (event.type) {
                                                                        case "task":
                                                                            await handleDeleteTask(event._id);
                                                                            break;

                                                                        case "project":
                                                                            await handleDeleteProject(event._id);
                                                                            break;

                                                                        case "goal":
                                                                            await handleDeleteGoal(event._id);
                                                                            break;

                                                                        case "reminder":
                                                                            await handleDeleteReminder(event._id);
                                                                            break;

                                                                        default:
                                                                            break;
                                                                    }

                                                                    setOpenEventMenu(null);
                                                                }}
                                                                style={{
                                                                    ...menuItemStyle,
                                                                    color: "#ff6b6b",
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.background =
                                                                        "rgba(255,255,255,0.04)";
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.background =
                                                                        "transparent";
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* ROW 2 STATUS / PRIORITY */}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "8px",
                                                    marginBottom: "12px",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        ...chipStyle,

                                                        padding: "5px 10px",

                                                        fontSize: "0.68rem",

                                                        borderRadius: "999px",

                                                        fontWeight: "300",

                                                        background:
                                                            status.background,

                                                        border:
                                                            `1px solid ${status.border}`,

                                                        color:
                                                            status.color,
                                                    }}
                                                >
                                                    {event.priority}
                                                </span>

                                                <span
                                                    style={{
                                                        padding: "5px 10px",

                                                        fontSize: "0.68rem",

                                                        borderRadius: "999px",

                                                        fontWeight: "300",

                                                        background:
                                                            status.background,

                                                        border:
                                                            `1px solid ${status.border}`,

                                                        color:
                                                            status.color,
                                                    }}
                                                >
                                                    {displayStatus}
                                                </span>
                                            </div>

                                            {/* TITLE */}
                                            <div
                                                style={{
                                                    fontSize: "0.94rem",

                                                    fontWeight: "320",

                                                    letterSpacing: "-0.02em",

                                                    marginBottom: "18px",

                                                    whiteSpace: "nowrap",

                                                    overflow: "hidden",

                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                {event.title}
                                            </div>

                                            {/* DUE */}
                                            <div
                                                style={{
                                                    fontSize: "0.72rem",

                                                    opacity: 0.55,

                                                    marginBottom: "6px",
                                                }}
                                            >
                                                Due {formatDueDate(event.dueDate)}
                                            </div>

                                            {/* COMPLETED */}
                                            <div
                                                style={{
                                                    fontSize: "0.72rem",

                                                    opacity: event.completed
                                                        ? 0.45
                                                        : 0,

                                                    minHeight: "18px",

                                                    marginBottom: "18px",
                                                }}
                                            >
                                                {event.completed
                                                    ? `Completed ${formatCompletedDate(
                                                        event.completedDate
                                                    )}`
                                                    : "Completed"}
                                            </div>

                                            {/* HOVER ACTIONS */}

                                            <div
                                                style={{
                                                    marginTop: "auto",

                                                    display: "flex",

                                                    justifyContent: "space-between",

                                                    alignItems: "center",

                                                    transition:
                                                        "opacity 0.2s ease",
                                                }}
                                            >
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleToggleFlag(event);
                                                    }}
                                                    style={{
                                                        border: "none",

                                                        background:
                                                            "transparent",

                                                        color:
                                                            event.flagged
                                                                ? "#a45d44"
                                                                : "var(--text-secondary)",

                                                        cursor: "pointer",

                                                        display: "flex",

                                                        alignItems: "center",

                                                        justifyContent: "center",

                                                        padding: 0,
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform =
                                                            "translateY(-1px) scale(1.08)";

                                                        if (!event.flagged) {
                                                            e.currentTarget.style.color =
                                                                "white";
                                                        }
                                                    }}

                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform =
                                                            "translateY(0) scale(1)";

                                                        if (!event.flagged) {
                                                            e.currentTarget.style.color =
                                                                "var(--text-secondary)";
                                                        }
                                                    }}
                                                >
                                                    <Flag
                                                        size={16}
                                                        strokeWidth={1.6}
                                                        fill={
                                                            event.flagged
                                                                ? "currentColor"
                                                                : "none"
                                                        }
                                                    />
                                                </button>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleToggleLike(event);
                                                    }}
                                                    style={{
                                                        border: "none",

                                                        background:
                                                            "transparent",

                                                        color:
                                                            event.liked
                                                                ? "#ff6b6b"
                                                                : "var(--text-secondary)",

                                                        cursor: "pointer",

                                                        display: "flex",

                                                        alignItems: "center",

                                                        justifyContent: "center",

                                                        padding: 0,
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform =
                                                            "translateY(-1px) scale(1.08)";

                                                        if (!event.liked) {
                                                            e.currentTarget.style.color =
                                                                "#ff6b6b";
                                                        }
                                                    }}

                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform =
                                                            "translateY(0) scale(1)";

                                                        if (!event.liked) {
                                                            e.currentTarget.style.color =
                                                                "var(--text-secondary)";
                                                        }
                                                    }}
                                                >
                                                    <Heart
                                                        size={16}
                                                        strokeWidth={1.6}
                                                        fill={
                                                            event.liked
                                                                ? "currentColor"
                                                                : "none"
                                                        }
                                                    />
                                                </button>
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
                                padding: "8px 14px",

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
            )
            }
            {/* open modal from individual */}
            {
                editingTask && (
                    <TaskModal
                        mode="edit"
                        task={editingTask}
                        onClose={() => {
                            setEditingTask(null);
                            setShowDashboardContent(true);
                        }}
                        onCompleteTask={
                            handleCompleteTask
                        }
                        onRestoreTask={
                            handleRestoreTask
                        }
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

                            setShowDashboardContent(true);
                        }}
                        onDelete={handleDeleteTask}
                    />
                )
            }
            {
                editingProject && (
                    <ProjectModal
                        mode="edit"
                        project={editingProject}
                        onClose={() => {
                            setEditingProject(null);
                            setShowDashboardContent(true);
                        }}
                        onCompleteProject={
                            handleCompleteProject
                        }

                        onRestoreProject={
                            handleRestoreProject
                        }
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

                            setShowDashboardContent(true);
                        }}
                        onDelete={handleDeleteProject}
                    />
                )
            }
            {
                editingGoal && (
                    <GoalModal
                        mode="edit"
                        goal={editingGoal}
                        onClose={() => {
                            setEditingGoal(null);
                            setShowDashboardContent(true);
                        }}
                        onCompleteGoal={
                            handleCompleteGoal
                        }

                        onRestoreGoal={
                            handleRestoreGoal
                        }
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

                            setShowDashboardContent(true);
                        }}
                        onDelete={handleDeleteGoal}
                    />
                )
            }
            {
                editingReminder && (
                    <ReminderModal
                        mode="edit"
                        reminder={editingReminder}
                        onClose={() => {
                            setEditingReminder(null);
                            setShowDashboardContent(true);
                        }}
                        onCompleteReminder={
                            handleCompleteReminder
                        }

                        onRestoreReminder={
                            handleRestoreReminder
                        }
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

                            setShowDashboardContent(true);
                        }}
                        onDelete={handleDeleteReminder}
                    />
                )
            }
            <Toast
                message={toast}
            />
        </div >
    );
}

export default DashboardModal;