import GlassCard from "../GlassCard";
import TaskDetailsModal from "./TaskDetailsModal";

import {
    Pencil,
    Trash2,
} from "lucide-react";

import { useState } from "react";

function ActiveTasks({
    tasks,
    setTasks,
    onViewTask,
    onEditTask,
    onNewTask,
    toast,
    setToast,
    setLastCompletedTask,
    setLastDeletedTask,
    completionTimeout,
    setCompletionTimeout,
}) {
    // COMPONENT STATES

    return (
        <GlassCard
            style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                borderRadius: "var(--radius-large)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                padding: "24px",
                minHeight: "320px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                }}
            >
                <h2
                    style={{
                        fontWeight: "400",
                        letterSpacing: "-0.02em",
                    }}
                >
                    Active Tasks
                </h2>

                <button
                    onClick={onNewTask}
                    style={{
                        background: "transparent",

                        border: "1px solid rgba(255,255,255,0.08)",

                        borderRadius: "999px",

                        padding: "8px 14px",

                        color: "var(--text-secondary)",

                        fontSize: "0.8rem",

                        fontWeight: "300",

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
                    + New Task
                </button>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                {tasks
                    .filter(
                        (task) =>
                            !task.completed
                    )
                    .map((task) => (
                        <div
                            key={task.title}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",

                                padding: "8px 12px",

                                borderRadius: "12px",

                                transition: "all 0.2s ease",

                                cursor: "pointer",

                                opacity:
                                    task.pendingCompletion
                                        ? 0.55
                                        : 1,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.04)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "transparent";
                            }}
                            onClick={() =>
                                onViewTask(task)
                            }
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                }}
                            >
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        if (task.pendingCompletion) {
                                            return;
                                        }

                                        setLastCompletedTask(task);

                                        setToast(
                                            "Task moved to Completed"
                                        );

                                        setTasks((prev) =>
                                            prev.map((t) =>
                                                t.id === task.id
                                                    ? {
                                                        ...t,
                                                        pendingCompletion: true,
                                                    }
                                                    : t
                                            )
                                        );

                                        const timeout = setTimeout(() => {
                                            setTasks((prev) =>
                                                prev.map((t) =>
                                                    t.id === task.id
                                                        ? {
                                                            ...t,
                                                            completed: true,
                                                            status: "Complete",
                                                            pendingCompletion: false,
                                                            completedDate: "Today",
                                                        }
                                                        : t
                                                )
                                            );
                                        }, 4000);

                                        setCompletionTimeout(timeout);

                                        setTimeout(() => {
                                            setToast("");
                                        }, 4000);
                                    }}
                                    style={{
                                        cursor: "pointer",

                                        width: "18px",
                                        height: "18px",

                                        borderRadius: "50%",

                                        border:
                                            "1.5px solid rgba(245,245,245,0.7)",

                                        background:
                                            task.pendingCompletion
                                                ? "rgba(245,245,245,0.75)"
                                                : "transparent",

                                        transition: "all 0.2s ease",

                                        flexShrink: 0,

                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",

                                        fontSize: "12px",
                                        fontWeight: "600",

                                        color: "#1a1d29",
                                    }}
                                >
                                    {task.pendingCompletion && "✓"}
                                </div>

                                <div>
                                    <div
                                        style={{
                                            fontWeight: "300",

                                            fontSize: "0.9rem",

                                            letterSpacing: "-0.015em",

                                            marginBottom: "6px",
                                        }}
                                    >
                                        {task.title}
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",

                                            gap: "6px",

                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <span
                                            style={{
                                                padding: "3px 8px",

                                                borderRadius: "999px",

                                                fontSize: "0.68rem",

                                                background: "#72715c33",

                                                border:
                                                    "1px solid #72715c66",
                                            }}
                                        >
                                            Task
                                        </span>

                                        <span
                                            style={{
                                                padding: "3px 8px",

                                                borderRadius: "999px",

                                                fontSize: "0.68rem",

                                                background:
                                                    task.category === "Work"
                                                        ? "#063f4733"
                                                        : task.category === "Study"
                                                            ? "#29737633"
                                                            : task.category ===
                                                                "Personal"
                                                                ? "#5c939633"
                                                                : "#10343933",

                                                border:
                                                    task.category === "Work"
                                                        ? "1px solid #063f4766"
                                                        : task.category ===
                                                            "Study"
                                                            ? "1px solid #29737666"
                                                            : task.category ===
                                                                "Personal"
                                                                ? "1px solid #5c939666"
                                                                : "1px solid #10343966",
                                            }}
                                        >
                                            {task.category}
                                        </span>

                                        <span
                                            style={{
                                                padding: "3px 8px",

                                                borderRadius: "999px",

                                                fontSize: "0.68rem",

                                                background:
                                                    task.priority === "High"
                                                        ? "#ab313033"
                                                        : task.priority ===
                                                            "Medium"
                                                            ? "#62929e33"
                                                            : "#ffdb5833",

                                                border:
                                                    task.priority === "High"
                                                        ? "1px solid #ab313066"
                                                        : task.priority ===
                                                            "Medium"
                                                            ? "1px solid #62929e66"
                                                            : "1px solid #ffdb5866",
                                            }}
                                        >
                                            {task.priority}
                                        </span>

                                        <span
                                            style={{
                                                padding: "3px 8px",

                                                borderRadius: "999px",

                                                fontSize: "0.68rem",

                                                background:
                                                    task.status ===
                                                        "In Progress"
                                                        ? "#e9b95733"
                                                        : task.status ===
                                                            "Overdue"
                                                            ? "#85222f33"
                                                            : task.status ===
                                                                "Complete"
                                                                ? "#728a6e33"
                                                                : "#4d689333",

                                                border:
                                                    task.status ===
                                                        "In Progress"
                                                        ? "1px solid #e9b95766"
                                                        : task.status ===
                                                            "Overdue"
                                                            ? "1px solid #85222f66"
                                                            : task.status ===
                                                                "Complete"
                                                                ? "1px solid #728a6e66"
                                                                : "1px solid #4d689366",
                                            }}
                                        >
                                            {task.status}
                                        </span>

                                        <span
                                            style={{
                                                fontSize: "0.68rem",

                                                color:
                                                    "var(--text-secondary)",

                                                alignSelf: "center",
                                            }}
                                        >
                                            {task.dueDate}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                }}
                            >

                                <Pencil
                                    size={16}
                                    strokeWidth={1.5}
                                    style={{
                                        cursor: "pointer",
                                        transition:
                                            "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            "#F5F5F5";

                                        e.currentTarget.style.transform =
                                            "scale(1.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color =
                                            "";

                                        e.currentTarget.style.transform =
                                            "scale(1)";
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        onEditTask(task);
                                    }}
                                />

                                <Trash2
                                    size={16}
                                    strokeWidth={1.5}
                                    style={{
                                        cursor: "pointer",
                                        transition:
                                            "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            "#ff6b6b";

                                        e.currentTarget.style.transform =
                                            "scale(1.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color =
                                            "";

                                        e.currentTarget.style.transform =
                                            "scale(1)";
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        setLastDeletedTask(task);

                                        setTasks((prev) =>
                                            prev.filter(
                                                (t) => t.id !== task.id
                                            )
                                        );

                                        setToast(
                                            "Task deleted"
                                        );

                                        setTimeout(() => {
                                            setToast("");
                                        }, 4000);
                                    }}
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </GlassCard>
    );
}

export default ActiveTasks;