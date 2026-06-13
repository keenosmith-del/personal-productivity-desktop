import { useState } from "react";

import GlassCard from "../GlassCard";
import GoalModal from "./GoalModal";

import {
    Pencil,
    Trash2,
} from "lucide-react";

function ActiveGoals({
    onViewGoal,
    onEditGoal,
    onNewGoal,
}) {
    const [completedGoals, setCompletedGoals] =
        useState({});

    const goals = [
        {
            title: "Become Full-Stack Developer",
            category: "Study",
            priority: "High",
            progress: "72%",
        },
        {
            title: "Complete Generative AI Course",
            category: "Study",
            priority: "Medium",
            progress: "58%",
        },
        {
            title: "Launch Portfolio Website",
            category: "Work",
            priority: "Low",
            progress: "91%",
        },
    ];
    return (
        <GlassCard>
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
                    Active Goals
                </h2>

                <button
                    onClick={onNewGoal}
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
                    + New Goal
                </button>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                {goals.map((goal) => (
                    <div
                        key={goal.title}
                        style={{
                            display: "flex",
                            alignItems: "center",

                            justifyContent: "space-between",

                            padding: "8px 12px",

                            borderRadius: "12px",

                            transition: "all 0.25s ease",

                            cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(14,17,22,0.75)";

                            e.currentTarget.style.transform =
                                "translateY(-2px)";
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
                            onViewGoal(goal)
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

                                    setCompletedGoals(
                                        (prev) => ({
                                            ...prev,
                                            [goal.title]: !prev[goal.title],
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
                                        completedGoals[goal.title]
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
                                {completedGoals[goal.title] && "✓"}
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
                                    {goal.title}
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

                                            background: "#c59c7033",

                                            border:
                                                "1px solid #c59c7066",
                                        }}
                                    >
                                        Goal
                                    </span>

                                    <span
                                        style={{
                                            padding: "3px 8px",

                                            borderRadius: "999px",

                                            fontSize: "0.68rem",

                                            background:
                                                goal.category === "Work"
                                                    ? "#063f4733"
                                                    : goal.category === "Study"
                                                        ? "#29737633"
                                                        : goal.category === "Personal"
                                                            ? "#5c939633"
                                                            : "#10343933",

                                            border:
                                                goal.category === "Work"
                                                    ? "1px solid #063f4766"
                                                    : goal.category === "Study"
                                                        ? "1px solid #29737666"
                                                        : goal.category === "Personal"
                                                            ? "1px solid #5c939666"
                                                            : "1px solid #10343966",
                                        }}
                                    >
                                        {goal.category}
                                    </span>

                                    <span
                                        style={{
                                            padding: "3px 8px",

                                            borderRadius: "999px",

                                            fontSize: "0.68rem",

                                            background:
                                                goal.priority === "High"
                                                    ? "#ab313033"
                                                    : goal.priority === "Medium"
                                                        ? "#62929e33"
                                                        : "#ffdb5833",

                                            border:
                                                goal.priority === "High"
                                                    ? "1px solid #ab313066"
                                                    : goal.priority === "Medium"
                                                        ? "1px solid #62929e66"
                                                        : "1px solid #ffdb5866",
                                        }}
                                    >
                                        {goal.priority}
                                    </span>

                                    <span
                                        style={{
                                            fontSize: "0.68rem",

                                            color:
                                                "var(--text-secondary)",

                                            alignSelf: "center",
                                        }}
                                    >
                                        {goal.progress}
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

                                    onEditGoal(goal);
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
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}

export default ActiveGoals;