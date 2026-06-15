import GlassCard from "../GlassCard";
import GoalModal from "./GoalModal";
import { Plus } from "lucide-react";

function GoalOverview({ goals }) {
    const activeGoals = goals.filter(
        (goal) => !goal.completed
    );

    const completedGoals = goals.filter(
        (goal) => goal.completed
    );

    const closestGoal = [...activeGoals].sort(
        (a, b) => b.progress - a.progress
    )[0];

    const recentlyCompleted =
        completedGoals[
        completedGoals.length - 1
        ];

    const overallProgress =
        activeGoals.length > 0
            ? Math.round(
                activeGoals.reduce(
                    (total, goal) =>
                        total + goal.progress,
                    0
                ) / activeGoals.length
            )
            : 0;
    return (
        <GlassCard minHeight="220px">
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "32px",
                }}
            >
                <h2
                    style={{
                        fontWeight: "400",
                        letterSpacing: "-0.02em",
                    }}
                >
                    Goals
                </h2>
            </div>

            <div
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "repeat(4, 1fr)",

                    gap: "24px",
                }}
            >
                {/* FIRST COL */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "18px",
                    }}
                >
                    <p
                        style={{
                            color:
                                "var(--text-secondary)",
                        }}
                    >
                        Overall Progress
                    </p>

                    <h2
                        style={{
                            fontWeight: "400",
                        }}
                    >
                        {overallProgress}%
                    </h2>

                    <div
                        style={{
                            width: "100%",
                            maxWidth: "140px",
                        }}
                    >
                        <div
                            style={{
                                height: "8px",

                                borderRadius: "999px",

                                background:
                                    "rgba(255,255,255,0.08)",

                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    width: `${overallProgress}%`,

                                    height: "100%",

                                    background: "#c59c70",

                                    borderRadius: "999px",
                                }}
                            />
                        </div>
                    </div>

                    <span
                        style={{
                            padding: "4px 8px",

                            borderRadius: "999px",

                            fontSize: "0.68rem",

                            background: "#c59c7033",

                            border: "1px solid #c59c7066",

                            width: "fit-content",
                        }}
                    >
                        {activeGoals.length} Active Goals
                    </span>
                </div>

                {/* SECOND COL */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "18px",
                    }}
                >
                    <p
                        style={{
                            color:
                                "var(--text-secondary)",
                        }}
                    >
                        Closest To Completion
                    </p>

                    <h2
                        style={{
                            fontWeight: "400",
                            fontSize: "1.2rem",
                        }}
                    >
                        {closestGoal?.title ||
                            "Nothing here yet"}
                    </h2>

                    <span
                        style={{
                            color: "var(--text-secondary)",
                            fontSize: "0.8rem",
                        }}
                    >
                        Create a goal to start tracking progress
                    </span>

                    {closestGoal && (
                        <>
                            <span
                                style={{
                                    padding: "4px 8px",

                                    borderRadius: "999px",

                                    fontSize: "0.68rem",

                                    background:
                                        closestGoal.category === "Work"
                                            ? "#063f4733"
                                            : closestGoal.category === "Study"
                                                ? "#29737633"
                                                : closestGoal.category === "Personal"
                                                    ? "#5c939633"
                                                    : "#10343933",

                                    border:
                                        closestGoal.category === "Work"
                                            ? "1px solid #063f4766"
                                            : closestGoal.category === "Study"
                                                ? "1px solid #29737666"
                                                : closestGoal.category === "Personal"
                                                    ? "1px solid #5c939666"
                                                    : "1px solid #10343966",

                                    width: "fit-content",
                                }}
                            >
                                {closestGoal.category}
                            </span>

                            <span
                                style={{
                                    color:
                                        "var(--text-secondary)",

                                    fontSize: "0.8rem",
                                }}
                            >
                                {closestGoal.progress}% Complete
                            </span>
                        </>
                    )}
                </div>

                {/* THIRD COL */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "18px",
                    }}
                >
                    <p
                        style={{
                            color:
                                "var(--text-secondary)",
                        }}
                    >
                        Recently Completed
                    </p>

                    <h2
                        style={{
                            fontWeight: "400",
                            fontSize: "1.2rem",
                        }}
                    >
                        {recentlyCompleted?.title ||
                            "-"}
                    </h2>

                    {recentlyCompleted && (
                        <>
                            <span
                                style={{
                                    padding: "4px 8px",

                                    borderRadius: "999px",

                                    fontSize: "0.68rem",

                                    background:
                                        recentlyCompleted.category === "Work"
                                            ? "#063f4733"
                                            : recentlyCompleted.category === "Study"
                                                ? "#29737633"
                                                : recentlyCompleted.category === "Personal"
                                                    ? "#5c939633"
                                                    : "#10343933",

                                    border:
                                        recentlyCompleted.category === "Work"
                                            ? "1px solid #063f4766"
                                            : recentlyCompleted.category === "Study"
                                                ? "1px solid #29737666"
                                                : recentlyCompleted.category === "Personal"
                                                    ? "1px solid #5c939666"
                                                    : "1px solid #10343966",

                                    width: "fit-content",
                                }}
                            >
                                {recentlyCompleted.category}
                            </span>

                            <span
                                style={{
                                    color:
                                        "var(--text-secondary)",

                                    fontSize: "0.8rem",
                                }}
                            >
                                Recently completed
                            </span>
                        </>
                    )}
                </div>

                {/* FOURTH COL */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "18px",
                    }}
                >
                    <p
                        style={{
                            color:
                                "var(--text-secondary)",
                        }}
                    >
                        Goals Achieved
                    </p>

                    <h2
                        style={{
                            fontWeight: "400",
                        }}
                    >
                        {completedGoals.length}
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            gap: "6px",
                            flexWrap: "wrap",
                        }}
                    >
                        <span
                            style={{
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "0.68rem",
                                background: "#728a6e33",
                                border: "1px solid #728a6e66",
                            }}
                        >
                            Complete {completedGoals.length}
                        </span>

                        <span
                            style={{
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "0.68rem",
                                background: "#4d689333",
                                border: "1px solid #4d689366",
                            }}
                        >
                            Active {activeGoals.length}
                        </span>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}

export default GoalOverview;