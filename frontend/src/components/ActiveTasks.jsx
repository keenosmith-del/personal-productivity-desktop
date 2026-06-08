import GlassCard from "./GlassCard";

import {
    Circle,
    CheckCircle2,
    Pencil,
    Trash2,
} from "lucide-react";

import { useState } from "react";

function ActiveTasks() {
    const tasks = [
        {
            title: "Finish Productivity Desktop",
            priority: "High",
        },
        {
            title: "Apply for Frontend Roles",
            priority: "Medium",
        },
        {
            title: "Complete AI Course Module",
            priority: "Low",
        },
    ];

    const [checkedTasks, setCheckedTasks] =
        useState({});

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
            <h2
                style={{
                    marginBottom: "24px",
                }}
            >
                Active Tasks
            </h2>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                {tasks.map((task) => (
                    <div
                        key={task.title}
                        style={{
                            display: "flex",
                            alignItems: "center",

                            justifyContent:
                                "space-between",

                            padding: "14px",

                            background:
                                "rgba(255,255,255,0.04)",

                            border:
                                "1px solid var(--glass-border)",

                            borderRadius: "12px",

                            transition:
                                "all 0.25s ease",

                            cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(14,17,22,0.75)";

                            e.currentTarget.style.transform =
                                "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.04)";

                            e.currentTarget.style.transform =
                                "translateY(0)";
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

                                    setCheckedTasks(
                                        (prev) => ({
                                            ...prev,
                                            [task.title]:
                                                !prev[task.title],
                                        })
                                    );
                                }}
                                style={{
                                    cursor: "pointer",

                                    width: "18px",
                                    height: "18px",

                                    borderRadius: "50%",

                                    border:
                                        "1.5px solid rgba(245,245,245,0.7)",

                                    background:
                                        checkedTasks[
                                            task.title
                                        ]
                                            ? "rgba(245,245,245,0.75)"
                                            : "transparent",

                                    transition:
                                        "all 0.2s ease",

                                    flexShrink: 0,
                                }}
                            />

                            <span>
                                {task.title}
                            </span>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                            }}
                        >
                            <div
                                style={{
                                    width: "10px",
                                    height: "10px",

                                    borderRadius: "50%",

                                    background:
                                        task.priority === "High"
                                            ? "#ff6b6b"
                                            : task.priority ===
                                                "Medium"
                                                ? "#f5b041"
                                                : "#7f8c8d",
                                }}
                            />

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
                            />
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}

export default ActiveTasks;