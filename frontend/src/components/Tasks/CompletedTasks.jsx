import GlassCard from "../GlassCard";

import { Trash2, RotateCcw } from "lucide-react";

import { useState } from "react";

function CompletedTasks({
    tasks,
    setTasks,
}) {
    const [hoveredTask,
        setHoveredTask] =
        useState(null);
    return (
        <GlassCard
            style={{
                background: "var(--glass-bg)",
                border:
                    "1px solid var(--glass-border)",
                borderRadius:
                    "var(--radius-large)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter:
                    "blur(20px)",
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
                    Completed Tasks
                </h2>

                <button
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
                    Clear all
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
                            task.completed
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

                                opacity: 0.5,

                                transition: "all 0.25s ease",

                                cursor: "default",
                            }}
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

                                        setTasks((prev) =>
                                            prev.map((t) =>
                                                t.id === task.id
                                                    ? {
                                                        ...t,
                                                        completed: false,
                                                        completedDate: null,
                                                    }
                                                    : t
                                            )
                                        );
                                    }}
                                    onMouseEnter={() =>
                                        setHoveredTask(task.id)
                                    }
                                    onMouseLeave={() =>
                                        setHoveredTask(null)
                                    }
                                    style={{
                                        cursor: "pointer",

                                        width: "18px",
                                        height: "18px",

                                        borderRadius: "50%",

                                        background:
                                            hoveredTask === task.id
                                                ? "rgba(245,245,245,0.75)"
                                                : "rgba(245,245,245,0.45)",

                                        border:
                                            hoveredTask === task.id
                                                ? "1.5px solid rgba(245,245,245,0.75)"
                                                : "1.5px solid rgba(245,245,245,0.45)",

                                        flexShrink: 0,

                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",

                                        transition:
                                            "all 0.2s ease",

                                        color: "#1a1d29",
                                    }}
                                >
                                    {hoveredTask === task.id ? (
                                        <RotateCcw
                                            size={10}
                                            strokeWidth={2}
                                        />
                                    ) : (
                                        "✓"
                                    )}
                                </div>

                                <div>
                                    <div
                                        style={{
                                            fontWeight: "300",

                                            color:
                                                "rgba(255,255,255,0.7)",

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
                                                            : "#5c939633",

                                                border:
                                                    task.category === "Work"
                                                        ? "1px solid #063f4766"
                                                        : task.category === "Study"
                                                            ? "1px solid #29737666"
                                                            : "1px solid #5c939666",
                                            }}
                                        >
                                            {task.category}
                                        </span>

                                        <span
                                            style={{
                                                padding: "3px 8px",

                                                borderRadius: "999px",

                                                fontSize: "0.68rem",

                                                background: "#728a6e33",

                                                border:
                                                    "1px solid #728a6e66",
                                            }}
                                        >
                                            Complete
                                        </span>

                                        <span
                                            style={{
                                                fontSize: "0.68rem",

                                                color:
                                                    "var(--text-secondary)",

                                                alignSelf: "center",
                                            }}
                                        >
                                            {task.completed}
                                        </span>
                                    </div>
                                </div>
                            </div>

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

                                    setTasks((prev) =>
                                        prev.filter(
                                            (t) => t.id !== task.id
                                        )
                                    );
                                }}
                            />
                        </div>
                    ))}
            </div>
        </GlassCard>
    );
}

export default CompletedTasks;