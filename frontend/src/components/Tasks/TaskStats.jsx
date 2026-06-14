import GlassCard from "../GlassCard";

function TaskStats({
    tasks,
}) {
    // COMPONENT STATES
    const activeTasks =
        tasks.filter(
            (task) =>
                !task.completed
        );

    const completedTasks =
        tasks.filter(
            (task) =>
                task.completed
        );

    const highCount =
        activeTasks.filter(
            (task) =>
                task.priority === "High"
        ).length;

    const mediumCount =
        activeTasks.filter(
            (task) =>
                task.priority === "Medium"
        ).length;

    const lowCount =
        activeTasks.filter(
            (task) =>
                task.priority === "Low"
        ).length;

    // FUNCTIONS
    return (
        <GlassCard minHeight="220px">
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",

                    height: "100%",

                    padding: "24px",
                    minHeight: "320px",
                }}
            >
                <div>
                    <h2
                        style={{
                            fontWeight: "400",
                            marginBottom: "20px",
                        }}
                    >
                        Task Overview
                    </h2>

                    <p
                        style={{
                            color: "var(--text-secondary)",
                        }}
                    >
                        Active
                    </p>

                    <h1
                        style={{
                            fontWeight: "400",
                        }}
                    >
                        {activeTasks.length}
                    </h1>

                    <p
                        style={{
                            color:
                                "var(--text-secondary)",
                            marginTop:
                                "12px",
                        }}
                    >
                        Completed
                    </p>

                    <h1
                        style={{
                            fontWeight: "400",
                        }}
                    >
                        {completedTasks.length}
                    </h1>
                </div>

                <div
                    style={{
                        display: "flex",

                        flexDirection: "column",

                        alignItems: "flex-end",

                        gap: "10px",
                    }}
                >
                    <span
                        style={{
                            padding: "6px 10px",

                            borderRadius: "999px",

                            fontSize: "0.72rem",

                            background: "#ab313033",

                            border:
                                "1px solid #ab313066",
                        }}
                    >
                        High • {highCount}
                    </span>

                    <span
                        style={{
                            padding: "6px 10px",

                            borderRadius: "999px",

                            fontSize: "0.72rem",

                            background: "#62929e33",

                            border:
                                "1px solid #62929e66",
                        }}
                    >
                        Medium • {mediumCount}
                    </span>

                    <span
                        style={{
                            padding: "6px 10px",

                            borderRadius: "999px",

                            fontSize: "0.72rem",

                            background: "#ffdb5833",

                            border:
                                "1px solid #ffdb5866",
                        }}
                    >
                        Low • {lowCount}
                    </span>

                    <span
                        style={{
                            padding: "6px 10px",

                            borderRadius: "999px",

                            fontSize: "0.72rem",

                            background: "#4d689333",

                            border: "1px solid #4d689366",
                        }}
                    >
                        Active • {activeTasks.length}
                    </span>

                    <span
                        style={{
                            padding: "6px 10px",

                            borderRadius: "999px",

                            fontSize: "0.72rem",

                            background: "#728a6e33",

                            border:
                                "1px solid #728a6e66",
                        }}
                    >
                        Complete • {completedTasks.length}
                    </span>
                </div>
            </div>
        </GlassCard>
    );
}

export default TaskStats;