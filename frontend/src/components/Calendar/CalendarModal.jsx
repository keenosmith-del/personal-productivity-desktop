import {
    CheckSquare,
    FolderKanban,
    Target,
    Bell,
} from "lucide-react";

import { useState } from "react";

import CalendarTaskDetailsModal from "./CalendarTaskDetailsModal";
import CalendarGoalDetailsModal from "./CalendarGoalDetailsModal";
import CalendarProjectDetailsModal from "./CalendarProjectDetailsModal";
import CalendarReminderDetailsModal from "./CalendarReminderDetailsModal";

import TaskModal from "../Tasks/TaskModal";
import GoalModal from "../Goals/GoalModal";
import ProjectModal from "../Projects/ProjectModal";
import ReminderModal from "../Reminders/ReminderModal";

import { createTask }
    from "../../services/taskService";

import { createGoal }
    from "../../services/goalService";

import { createProject }
    from "../../services/projectService";

import { createReminder }
    from "../../services/reminderService";

function CalendarModal({
    selectedDate,
    events = [],
    onClose,

    setToast,

    refreshCalendarData,
}) {
    const eventCounts = events.reduce(
        (acc, event) => {
            acc[event.type] =
                (acc[event.type] || 0) + 1;

            return acc;
        },
        {}
    );

    const [
        selectedTask,
        setSelectedTask,
    ] = useState(null);

    const [
        selectedGoal,
        setSelectedGoal,
    ] = useState(null);

    const [
        selectedProject,
        setSelectedProject,
    ] = useState(null);

    const [
        selectedReminder,
        setSelectedReminder,
    ] = useState(null);

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
        project: FolderKanban,
        goal: Target,
        reminder: Bell,
    };

    // HANDLERS
    const handleCreateTask =
        async (taskData) => {
            await createTask(taskData);

            setShowTaskModal(false);

            refreshCalendarData();

            setToast("Task created");

            setTimeout(() => {
                setToast("");
            }, 3000);
        };

    const handleCreateGoal =
        async (goalData) => {
            await createGoal(goalData);

            setShowGoalModal(false);

            refreshCalendarData();

            setToast("Goal created");

            setTimeout(() => {
                setToast("");
            }, 3000);
        };

    const handleCreateProject =
        async (projectData) => {
            await createProject(projectData);

            setShowProjectModal(false);

            refreshCalendarData();

            setToast("Project created");

            setTimeout(() => {
                setToast("");
            }, 3000);
        };

    const handleCreateReminder =
        async (reminderData) => {
            await createReminder(reminderData);

            setShowReminderModal(false);

            refreshCalendarData();

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
                    "rgba(0,0,0,0.55)",

                backdropFilter:
                    "blur(14px)",

                display: "flex",

                justifyContent:
                    "center",

                alignItems: "center",

                zIndex: 2000,
            }}
        >
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

                    <button
                        onClick={onClose}
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
                        x
                    </button>
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
                                                setShowAddMenu(
                                                    false
                                                );

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
                                        onClick={() => {
                                            if (event.type === "task") {
                                                setSelectedTask(event);
                                            }

                                            if (event.type === "goal") {
                                                setSelectedGoal(event);
                                            }

                                            if (event.type === "project") {
                                                setSelectedProject(event);
                                            }

                                            if (event.type === "reminder") {
                                                setSelectedReminder(event);
                                            }
                                        }}
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
                                        {/* ICON */}

                                        <div
                                            style={{
                                                width: "54px",
                                                height: "54px",

                                                borderRadius: "50%",

                                                background:
                                                    "rgba(255,255,255,0.08)",

                                                border:
                                                    "1px solid rgba(255,255,255,0.10)",

                                                display: "flex",

                                                alignItems: "center",

                                                justifyContent: "center",

                                                backdropFilter:
                                                    "blur(20px)",
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

                    {/* CLEAR DAY */}
                    <button
                        onClick={onClose}
                        style={{
                            padding: "11px 18px",

                            borderRadius: "999px",

                            background:
                                "rgba(255,77,77,0.12)",

                            border:
                                "1px solid rgba(255,77,77,0.25)",

                            color: "var(--danger)",

                            fontSize: "0.8rem",

                            fontWeight: "300",

                            cursor: "pointer",

                            transition:
                                "all 0.2s ease",
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
                        Clear All
                    </button>
                </div>
            </div>
            {selectedTask && (
                <CalendarTaskDetailsModal
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                    setToast={setToast}
                    refreshCalendarData={
                        refreshCalendarData
                    }
                />
            )}
            {selectedProject && (
                <CalendarProjectDetailsModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                    setToast={setToast}
                    refreshCalendarData={
                        refreshCalendarData
                    }
                />
            )}
            {selectedGoal && (
                <CalendarGoalDetailsModal
                    goal={selectedGoal}
                    onClose={() => setSelectedGoal(null)}
                    setToast={setToast}
                    refreshCalendarData={
                        refreshCalendarData
                    }
                />
            )}
            {selectedReminder && (
                <CalendarReminderDetailsModal
                    reminder={selectedReminder}
                    onClose={() => setSelectedReminder(null)}
                    setToast={setToast}
                    refreshCalendarData={
                        refreshCalendarData
                    }
                />
            )}
            {showTaskModal && (
                <TaskModal
                    mode="create"
                    initialDate={date.toISOString()}
                    onClose={() =>
                        setShowTaskModal(false)
                    }
                    onSave={handleCreateTask}
                    calendarMode={true}
                />
            )}

            {showGoalModal && (
                <GoalModal
                    mode="create"
                    initialDate={date.toISOString()}
                    onClose={() =>
                        setShowGoalModal(false)
                    }
                    onSave={handleCreateGoal}
                    calendarMode={true}
                />
            )}

            {showProjectModal && (
                <ProjectModal
                    mode="create"
                    initialDate={date.toISOString()}
                    onClose={() =>
                        setShowProjectModal(false)
                    }
                    onSave={handleCreateProject}
                    calendarMode={true}
                />
            )}

            {showReminderModal && (
                <ReminderModal
                    mode="create"
                    initialDate={date.toISOString()}
                    onClose={() =>
                        setShowReminderModal(false)
                    }
                    onSave={handleCreateReminder}
                    calendarMode={true}
                />
            )}
        </div>
    );
}

export default CalendarModal;