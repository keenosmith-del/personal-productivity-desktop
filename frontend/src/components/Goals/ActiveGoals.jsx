import { useState } from "react";

import GlassCard from "../GlassCard";
import GoalModal from "./GoalModal";

import {
    Pencil,
    Trash2,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

function ActiveGoals({
    goals,
    setGoals,
    onViewGoal,
    onEditGoal,
    onNewGoal,
    onClearAll,
    toast,
    setToast,
    setLastCompletedGoal,
    setLastAction,
    setLastDeletedGoal,
    completionTimeout,
    setCompletionTimeout,
}) {

    // COMPONENT STATES
    const activeGoals =
        goals.filter(
            (goal) =>
                !goal.completed
        );

    const [expandedGoal,
        setExpandedGoal] =
        useState(null);

    // FUNCTIONS
    const handleClearAll = () => {
        setGoals((prev) =>
            prev.filter(
                (goal) => goal.completed
            )
        );
    };
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

                <div
                    style={{
                        display: "flex",
                        gap: "8px",
                    }}
                >

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

                    <button
                        onClick={onClearAll}
                        disabled={
                            activeGoals.length === 0
                        }
                        style={{
                            background: "transparent",

                            border: "1px solid rgba(255,255,255,0.08)",

                            borderRadius: "999px",

                            padding: "8px 14px",

                            color:
                                activeGoals.length === 0
                                    ? "rgba(255,255,255,0.25)"
                                    : "var(--text-secondary)",

                            fontSize: "0.8rem",

                            fontWeight: "300",

                            cursor:
                                activeGoals.length === 0
                                    ? "not-allowed"
                                    : "pointer",

                            transition: "all 0.2s ease",

                            opacity:
                                activeGoals.length === 0
                                    ? 0.5
                                    : 1,
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
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",

                    maxHeight: "380px",
                    overflowY: "auto",
                    paddingRight: "4px",
                }}
            >
                {activeGoals.length === 0 ? (
                    <p
                        style={{
                            color:
                                "var(--text-secondary)",
                            fontSize: "0.85rem",
                            textAlign: "left",
                            padding: "24px 0",
                        }}
                    >
                        No active goals.
                    </p>
                ) : (
                    activeGoals.map((goal) => (
                        <div
                            key={goal.title}
                            style={{
                                display: "flex",
                                flexDirection: "column",

                                padding: "8px 12px",

                                borderRadius: "12px",

                                transition: "all 0.25s ease",

                                cursor: "pointer",

                                opacity:
                                    goal.pendingCompletion
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
                                onViewGoal(goal)
                            }
                        >

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
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

                                            if (
                                                goal.pendingCompletion
                                            ) {
                                                return;
                                            }

                                            setLastCompletedGoal(goal);

                                            setLastAction("complete");

                                            setToast(
                                                "Goal completed"
                                            );

                                            setGoals((prev) =>
                                                prev.map((g) =>
                                                    g.id === goal.id
                                                        ? {
                                                            ...g,
                                                            pendingCompletion: true,
                                                        }
                                                        : g
                                                )
                                            );

                                            const timeout =
                                                setTimeout(() => {
                                                    setGoals((prev) =>
                                                        prev.map((g) =>
                                                            g.id === goal.id
                                                                ? {
                                                                    ...g,
                                                                    completed: true,
                                                                    status: "Complete",
                                                                    progress: 100,
                                                                    pendingCompletion: false,
                                                                    completedDate: "Today",
                                                                }
                                                                : g
                                                        )
                                                    );
                                                }, 4000);

                                            setCompletionTimeout(
                                                timeout
                                            );

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
                                                goal.pendingCompletion
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
                                        {goal.pendingCompletion && "✓"}
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

                                                    border: "1px solid #c59c7066",
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
                                                    padding: "3px 8px",

                                                    borderRadius: "999px",

                                                    fontSize: "0.68rem",

                                                    background:
                                                        goal.status ===
                                                            "In Progress"
                                                            ? "#e9b95733"
                                                            : goal.status ===
                                                                "Overdue"
                                                                ? "#85222f33"
                                                                : goal.status ===
                                                                    "Complete"
                                                                    ? "#728a6e33"
                                                                    : "#4d689333",

                                                    border:
                                                        goal.status ===
                                                            "In Progress"
                                                            ? "1px solid #e9b95766"
                                                            : goal.status ===
                                                                "Overdue"
                                                                ? "1px solid #85222f66"
                                                                : goal.status ===
                                                                    "Complete"
                                                                    ? "1px solid #728a6e66"
                                                                    : "1px solid #4d689366",
                                                }}
                                            >
                                                {goal.status}
                                            </span>

                                            <span
                                                style={{
                                                    padding: "3px 8px",

                                                    borderRadius: "999px",

                                                    fontSize: "0.68rem",

                                                    background: "#72715c33",

                                                    border: "1px solid #72715c66",
                                                }}
                                            >
                                                {Math.min(
                                                    goal.associatedTasks?.length || 0,
                                                    2
                                                )}
                                                {" / "}
                                                {goal.associatedTasks?.length || 0}
                                                {" Tasks"}
                                            </span>

                                            <span
                                                style={{
                                                    fontSize: "0.68rem",

                                                    color: "var(--text-secondary)",

                                                    alignSelf: "center",
                                                }}
                                            >
                                                {goal.progress}%
                                            </span>
                                        </div>

                                        {/* PROGRESS BAR */}
                                        <div
                                            style={{
                                                width: "100%",

                                                height: "6px",

                                                borderRadius: "999px",

                                                background: "rgba(255,255,255,0.08)",

                                                overflow: "hidden",

                                                marginTop: "10px",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width:
                                                        `${goal.progress}%`,

                                                    height: "100%",

                                                    background: "#c59c70",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: "flex",

                                        alignItems: "flex-start",

                                        gap: "12px",

                                        paddingTop: "4px",
                                    }}
                                >
                                    {expandedGoal === goal.id ? (
                                        <ChevronUp
                                            size={16}
                                            strokeWidth={1.5}
                                            style={{
                                                cursor: "pointer",
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();

                                                setExpandedGoal(
                                                    null
                                                );
                                            }}
                                        />
                                    ) : (
                                        <ChevronDown
                                            size={16}
                                            strokeWidth={1.5}
                                            style={{
                                                cursor: "pointer",
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();

                                                setExpandedGoal(
                                                    goal.id
                                                );
                                            }}
                                        />
                                    )}

                                    <Pencil
                                        size={16}
                                        strokeWidth={1.5}
                                        style={{
                                            cursor: "pointer",

                                            transition: "all 0.2s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = "#F5F5F5";

                                            e.currentTarget.style.transform = "scale(1.1)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color =
                                                "";

                                            e.currentTarget.style.transform = "scale(1)";
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
                                            e.currentTarget.style.color = "#ff6b6b";

                                            e.currentTarget.style.transform = "scale(1.1)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color =
                                                "";

                                            e.currentTarget.style.transform = "scale(1)";
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();

                                            setLastDeletedGoal(goal);

                                            setLastAction("delete");

                                            setGoals((prev) =>
                                                prev.filter(
                                                    (g) => g.id !== goal.id
                                                )
                                            );

                                            setToast("Goal deleted");

                                            setTimeout(() => {
                                                setToast("");
                                            }, 3000);
                                        }}
                                    />
                                </div>
                            </div>
                            {expandedGoal === goal.id && (
                                <div
                                    style={{
                                        marginTop: "12px",

                                        paddingTop: "16px",

                                        borderTop: "1px solid rgba(255,255,255,0.06)",

                                        display: "flex",

                                        flexDirection: "column",

                                        gap: "10px",

                                        paddingLeft: "30px",
                                    }}
                                >
                                    {goal.associatedTasks?.length ? (
                                        goal.associatedTasks.map(
                                            (task, index) => (
                                                <div
                                                    key={task}
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "10px",

                                                        fontSize: "0.85rem",

                                                        padding: "6px 0",

                                                        color: "var(--text-secondary)",
                                                    }}
                                                >
                                                    <span>
                                                        {index < 2
                                                            ? "✓"
                                                            : "○"}
                                                    </span>

                                                    <span>{task}</span>
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <span
                                            style={{
                                                color:
                                                    "var(--text-secondary)",
                                                fontSize: "0.8rem",
                                            }}
                                        >
                                            No tasks linked
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </GlassCard>
    );
}

export default ActiveGoals;