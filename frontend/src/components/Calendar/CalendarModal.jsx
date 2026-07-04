import {
    CheckSquare,
    Folder,
    Sprout,
    AlarmClock,
    Ellipsis,
} from "lucide-react";

// test 

import { useState } from "react";

import Toast from "../Toast";
import DeleteConfirmModal from "../DeleteConfirmModal";

import TaskDetailsModal from "../Tasks/TaskDetailsModal";
import ProjectDetailsModal from "../Projects/ProjectDetailsModal";
import GoalDetailsModal from "../Goals/GoalDetailsModal";
import ReminderDetailsModal from "../Reminders/ReminderDetailsModal";

import TaskModal from "../Tasks/TaskModal";
import GoalModal from "../Goals/GoalModal";
import ProjectModal from "../Projects/ProjectModal";
import ReminderModal from "../Reminders/ReminderModal";

import { createTask, deleteTask, updateTask } from "../../services/taskService";
import { createGoal, deleteGoal, updateGoal } from "../../services/goalService";
import { createProject, deleteProject, updateProject } from "../../services/projectService";
import { createReminder, deleteReminder, updateReminder } from "../../services/reminderService";

function CalendarModal({
    selectedDate,
    events = [],
    onClose,

    onRefresh,

    tasks,
    projects,
    goals,
    reminders,

    remainingCount,

    expanded,
    onShowAll,
    onShowLess,
}) {
    const eventCounts = events.reduce(
        (acc, event) => {
            acc[event.type] =
                (acc[event.type] || 0) + 1;

            return acc;
        },
        {}
    );

    // props
    const [selectedTask, setSelectedTask] = useState(null);

    const [selectedGoal, setSelectedGoal] = useState(null);

    const [selectedProject, setSelectedProject] = useState(null);

    const [selectedReminder, setSelectedReminder] = useState(null);

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

    const [showCalendarContent, setShowCalendarContent] =
        useState(true);

    const [toast, setToast] =
        useState("");

    const [returnToCalendar, setReturnToCalendar] =
        useState(true);

    // handle
    const handleEventClick = (event) => {

        setShowCalendarContent(false);

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
        setReturnToCalendar(false);
        setPreviousTask(task);
        setEditingTask(task);
    };

    const handleEditProject = (project) => {
        setSelectedProject(null);
        setReturnToCalendar(false);
        setPreviousProject(project);
        setEditingProject(project);
    };

    const handleEditGoal = (goal) => {
        setSelectedGoal(null);
        setReturnToCalendar(false);
        setPreviousGoal(goal);
        setEditingGoal(goal);
    };

    const handleEditReminder = (reminder) => {
        setSelectedReminder(null);
        setReturnToCalendar(false);
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

        setShowCalendarContent(true);

        setReturnToCalendar(true);
    };

    const handleDeleteProject = async (projectId) => {

        await deleteProject(projectId);

        await onRefresh();

        setToast("Project deleted");

        setTimeout(() => {
            setToast("");
        }, 3000);

        setSelectedProject(null);

        setShowCalendarContent(true);

        setReturnToCalendar(true);
    };

    const handleDeleteGoal = async (goalId) => {

        await deleteGoal(goalId);

        await onRefresh();

        setToast("Goal deleted");

        setTimeout(() => {
            setToast("");
        }, 3000);

        setSelectedGoal(null);

        setShowCalendarContent(true);

        setReturnToCalendar(true);
    };

    const handleDeleteReminder = async (reminderId) => {

        await deleteReminder(reminderId);

        await onRefresh();

        setToast("Reminder deleted");

        setTimeout(() => {
            setToast("");
        }, 3000);

        setSelectedReminder(null);

        setShowCalendarContent(true);

        setReturnToCalendar(true);
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

    // glass dropdown
    const [
        showAddMenu,
        setShowAddMenu,
    ] = useState(false);

    const [
        showTaskModal,
        setShowTaskModal,
    ] = useState(false);

    const [
        showGoalModal,
        setShowGoalModal,
    ] = useState(false);

    const [
        showProjectModal,
        setShowProjectModal,
    ] = useState(false);

    const [
        showReminderModal,
        setShowReminderModal,
    ] = useState(false);

    const [
        showClearConfirm,
        setShowClearConfirm,
    ] = useState(false);

    const linkedItemStyle = {
        width: "35px",
        height: "35px",

        borderRadius: "50%",

        background:
            "linear-gradient(135deg, rgba(87,112,122,0.35), rgba(39,60,65,0.15))",

        border:
            "1px solid rgba(255,255,255,0.06)",

        backdropFilter:
            "blur(20px)",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        fontSize: "0.68rem",

        color:
            "var(--text-secondary)",

        transition:
            "all 0.2s ease",
    };

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

    const date = new Date(
        selectedDate.year,
        selectedDate.month,
        selectedDate.day
    );

    const eventIcons = {
        task: CheckSquare,
        project: Folder,
        goal: Sprout,
        reminder: AlarmClock,
    };

    // HANDLERS
    const handleClearAll =
        async () => {
            try {
                for (const event of events) {
                    if (event.type === "task") {
                        await deleteTask(event._id);
                    }

                    if (event.type === "goal") {
                        await deleteGoal(event._id);
                    }

                    if (event.type === "project") {
                        await deleteProject(event._id);
                    }

                    if (event.type === "reminder") {
                        await deleteReminder(event._id);
                    }
                }

                await onRefresh();

                setToast("Day cleared");

                setTimeout(() => {
                    setToast("");
                }, 3000);

                setShowClearConfirm(false);

                setShowCalendarContent(true);

                setSelectedTask(null);
                setSelectedGoal(null);
                setSelectedProject(null);
                setSelectedReminder(null);

            } catch (error) {
                console.error(error);
            }
        };

    // create
    const handleCreateTask =
        async (taskData) => {
            await createTask(taskData);

            setShowTaskModal(false);

            setShowCalendarContent(true);

            onRefresh();

            setToast("Task created");

            setTimeout(() => {
                setToast("");
            }, 3000);
        };

    const handleCreateGoal =
        async (goalData) => {
            await createGoal(goalData);

            setShowGoalModal(false);

            setShowCalendarContent(true);

            onRefresh();

            setToast("Goal created");

            setTimeout(() => {
                setToast("");
            }, 3000);
        };

    const handleCreateProject =
        async (projectData) => {
            await createProject(projectData);

            setShowProjectModal(false);

            setShowCalendarContent(true);

            onRefresh();

            setToast("Project created");

            setTimeout(() => {
                setToast("");
            }, 3000);
        };

    const handleCreateReminder =
        async (reminderData) => {
            await createReminder(reminderData);

            setShowReminderModal(false);

            setShowCalendarContent(true);

            onRefresh();

            setToast("Reminder created");

            setTimeout(() => {
                setToast("");
            }, 3000);
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
            {showCalendarContent && (
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
                                Calendar Details
                            </h2>

                            <p
                                style={{
                                    marginTop: "8px",

                                    fontSize: "0.82rem",

                                    opacity: 0.55,
                                }}
                            >
                                View everything
                                scheduled for this
                                day.
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

                    {/* DATE */}

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
                            {events.length} event
                            {events.length !== 1
                                ? "s"
                                : ""}{" "}
                            scheduled
                        </div>
                    </div>

                    {/* CHIPS REMOVED */}

                    {/* FLOATING ACTION PILL + */}
                    <div
                        style={{
                            display: "flex",

                            justifyContent: "center",

                            marginBottom: "20px",
                        }}
                    >
                        <div
                            style={{
                                position: "relative",
                            }}
                        >
                            <button
                                onClick={() =>
                                    setShowAddMenu(
                                        !showAddMenu
                                    )
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
                                        "var(--text-secondary)",

                                    cursor: "pointer",

                                    fontSize: "0.85rem",

                                    transition: "all 0.2s ease",
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

                            {/* glass dropdown */}
                            {/* favourite dropdown -- implement on other dropdowns */}
                            {showAddMenu && (
                                <div
                                    style={{
                                        position: "absolute",

                                        top: "42px",

                                        left: "50%",

                                        transform:
                                            "translateX(-50%)",

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

                                        zIndex: 2001,
                                    }}
                                >
                                    {[
                                        {
                                            label: "Task",
                                            action:
                                                setShowTaskModal,
                                        },

                                        {
                                            label: "Goal",
                                            action:
                                                setShowGoalModal,
                                        },

                                        {
                                            label: "Project",
                                            action:
                                                setShowProjectModal,
                                        },

                                        {
                                            label: "Reminder",
                                            action:
                                                setShowReminderModal,
                                        },
                                    ].map(
                                        ({
                                            label,
                                            action,
                                        }) => (
                                            <button
                                                key={label}
                                                onClick={() => {

                                                    setShowAddMenu(false);

                                                    setShowCalendarContent(false);

                                                    action(true);
                                                }}
                                                style={{
                                                    background:
                                                        "transparent",

                                                    border:
                                                        "none",

                                                    color:
                                                        "var(--text-primary)",

                                                    padding:
                                                        "10px 14px",

                                                    borderRadius:
                                                        "12px",

                                                    cursor:
                                                        "pointer",

                                                    textAlign:
                                                        "left",

                                                    fontSize:
                                                        "0.78rem",

                                                    fontWeight:
                                                        "300",

                                                    transition:
                                                        "all 0.2s ease",
                                                }}
                                                onMouseEnter={(
                                                    e
                                                ) => {
                                                    e.currentTarget.style.background =
                                                        "rgba(255,255,255,0.06)";
                                                }}
                                                onMouseLeave={(
                                                    e
                                                ) => {
                                                    e.currentTarget.style.background =
                                                        "transparent";
                                                }}
                                            >
                                                {label}
                                            </button>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* DIVIDER */}

                    <div
                        style={{
                            height: "1px",

                            background:
                                "rgba(255,255,255,0.05)",

                            marginBottom: "24px",
                        }}
                    />

                    {/* STACKED CIRCLES REMOVED */}

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
                            Events
                        </div>

                        {events.length === 0 ? (
                            <div
                                style={{
                                    fontSize: "0.8rem",

                                    opacity: 0.45,

                                    lineHeight: 1.6,
                                }}
                            >
                                No events scheduled.

                                <br />
                                <br />

                                Tasks, reminders,
                                goals and projects
                                assigned to this date
                                will appear here.
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
                                        chipStyles[event.type] ||
                                        chipStyles.task;

                                    const Icon =
                                        eventIcons[event.type];

                                    return (
                                        <div
                                            key={event.title}
                                            onClick={() => handleEventClick(event)}
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
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        fontSize: "0.92rem",

                                                        fontWeight: "350",

                                                        letterSpacing: "-0.02em",

                                                        marginBottom: "8px",
                                                    }}
                                                >
                                                    {event.title}
                                                </div>

                                                {event.completed ? (
                                                    <div
                                                        style={{
                                                            display: "inline-flex",

                                                            alignItems: "center",

                                                            gap: "6px",

                                                            padding: "6px 12px",

                                                            borderRadius: "999px",

                                                            background:
                                                                "rgba(93,118,98,0.16)",

                                                            border:
                                                                "1px solid rgba(93,118,98,0.28)",

                                                            fontSize: "0.7rem",

                                                            fontWeight: "300",

                                                            opacity: 0.9,
                                                        }}
                                                    >
                                                        ✓ Completed
                                                    </div>
                                                ) : (
                                                    <div
                                                        style={{
                                                            fontSize: "0.72rem",

                                                            opacity: 0.55,
                                                        }}
                                                    >
                                                        {event.category} · {event.priority}
                                                    </div>
                                                )}
                                            </div>

                                            {/* ASSOCIATIONS */}

                                            {!event.completed &&
                                                event.linkedItems?.length > 0 && (
                                                    <div
                                                        style={{
                                                            display: "flex",

                                                            marginTop: "18px",
                                                        }}
                                                    >
                                                        {event.linkedItems
                                                            .slice(0, 3)
                                                            .map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        key={item}
                                                                        style={{
                                                                            ...linkedItemStyle,

                                                                            marginRight:
                                                                                "-6px",

                                                                            zIndex:
                                                                                index + 1,

                                                                            width: "30px",

                                                                            height: "30px",

                                                                            fontSize:
                                                                                "0.62rem",
                                                                        }}
                                                                    >
                                                                        {item}
                                                                    </div>
                                                                )
                                                            )}
                                                    </div>
                                                )}

                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

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
                                    "rgba(255,255,255,0.08)",

                                border:
                                    "1px solid rgba(255,255,255,0.10)",

                                color:
                                    "var(--text-primary)",

                                fontSize: "0.8rem",

                                fontWeight: "300",

                                cursor: "pointer",

                                transition: "all 0.2s ease",

                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.14)";

                                e.currentTarget.style.transform =
                                    "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.08)";

                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >
                            Cancel
                        </button>

                        {/* CLEAR ALL */}
                        <button
                            disabled={events.length === 0}
                            onClick={() => {

                                setShowCalendarContent(false);

                                setShowClearConfirm(true);
                            }}
                            style={{
                                padding: "11px 18px",

                                borderRadius: "999px",

                                background:
                                    events.length === 0
                                        ? "rgba(255,77,77,0.05)"
                                        : "rgba(255,77,77,0.12)",

                                border:
                                    events.length === 0
                                        ? "1px solid rgba(255,77,77,0.08)"
                                        : "1px solid rgba(255,77,77,0.25)",

                                color:
                                    events.length === 0
                                        ? "rgba(255,255,255,0.25)"
                                        : "var(--danger)",

                                fontSize: "0.8rem",

                                fontWeight: "300",

                                cursor: "pointer",

                                transition:
                                    "all 0.2s ease",
                            }}
                            // remove if disabled 
                            onMouseEnter={(e) => {
                                if (events.length === 0) return;

                                e.currentTarget.style.background =
                                    "rgba(255,77,77,0.20)";

                                e.currentTarget.style.transform =
                                    "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                if (events.length === 0) return;
                                e.currentTarget.style.background =
                                    "rgba(255,77,77,0.12)";

                                e.currentTarget.style.transform =
                                    "translateY(0)";

                            }}
                        >
                            Clear All
                        </button>
                    </div>
                </div>
            )}
            {selectedTask && (
                <TaskDetailsModal
                    task={selectedTask}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask}
                    onCompleteTask={handleCompleteTask}
                    onRestoreTask={handleRestoreTask}
                    onClose={() => {
                        setSelectedTask(null);

                        if (returnToCalendar) {
                            setShowCalendarContent(true);
                        }

                        setShowCalendarContent(true);
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

                        if (returnToCalendar) {
                            setShowCalendarContent(true);
                        }

                        setShowCalendarContent(true);
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

                        if (returnToCalendar) {
                            setShowCalendarContent(true);
                        }

                        setShowCalendarContent(true);
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

                        if (returnToCalendar) {
                            setShowCalendarContent(true);
                        }

                        setShowCalendarContent(true);
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
            {showTaskModal && (
                <TaskModal
                    mode="create"
                    initialDate={date.toISOString()}
                    onClose={() => {

                        setShowTaskModal(false);

                        setShowCalendarContent(true);
                    }}
                    onSave={handleCreateTask}
                />
            )}

            {showGoalModal && (
                <GoalModal
                    mode="create"
                    initialDate={date.toISOString()}
                    onClose={() => {

                        setShowGoalModal(false);

                        setShowCalendarContent(true);
                    }}
                    onSave={handleCreateGoal}
                />
            )}

            {showProjectModal && (
                <ProjectModal
                    mode="create"
                    initialDate={date.toISOString()}
                    onClose={() => {

                        setShowProjectModal(false);

                        setShowCalendarContent(true);
                    }}
                    onSave={handleCreateProject}
                />
            )}
            {showReminderModal && (
                <ReminderModal
                    mode="create"
                    initialDate={date.toISOString()}
                    onClose={() => {

                        setShowReminderModal(false);

                        setShowCalendarContent(true);
                    }}
                    onSave={handleCreateReminder}
                />
            )}
            {showClearConfirm && (
                <DeleteConfirmModal
                    title="Clear all events?"
                    message="This permanently deletes every task, project, goal and reminder scheduled for this day."

                    onCancel={() => {

                        setShowClearConfirm(false);

                        setShowCalendarContent(true);
                    }}

                    onConfirm={handleClearAll}
                />
            )}
            <Toast
                message={toast}
            />
        </div>
    );
}

export default CalendarModal;