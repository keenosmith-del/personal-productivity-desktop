import GlassCard from "../GlassCard";

function TaskActivity({
    tasks,
}) {
    // COMPONENT STATES
    const upcomingTasks =
        tasks
            .filter(
                (task) =>
                    !task.completed
            )
            .slice(0, 3);
    return (
        <GlassCard minHeight="220px">
            <div
                style={{
                    justifyContent: "space-between",

                    height: "100%",

                    padding: "24px",
                    minHeight: "320px",
                }}
            >
                <h2
                    style={{
                        fontWeight: "400",
                        marginBottom: "20px",
                    }}
                >
                    Upcoming Deadlines
                </h2>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                    }}
                >
                    {upcomingTasks.length === 0 && (
                        <p
                            style={{
                                color:
                                    "var(--text-secondary)",

                                fontSize: "0.85rem",
                            }}
                        >
                            No upcoming deadlines.
                        </p>
                    )}
                    {upcomingTasks.map((task) => (
                        <div
                            key={task.title}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        marginBottom: "6px",

                                        fontWeight: "300",

                                        maxWidth: "180px",

                                        whiteSpace: "nowrap",

                                        overflow: "hidden",

                                        textOverflow: "ellipsis",

                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "12px",

                                        maxHeight: "250px",

                                        overflowY: "auto",

                                        paddingRight: "4px",
                                    }}
                                >
                                    {task.title}
                                </div>

                                <span
                                    style={{
                                        padding: "4px 8px",

                                        borderRadius: "999px",

                                        fontSize: "0.68rem",

                                        background:
                                            task.priority ===
                                                "High"
                                                ? "#ab313033"
                                                : task.priority ===
                                                    "Medium"
                                                    ? "#62929e33"
                                                    : "#ffdb5833",

                                        border:
                                            task.priority ===
                                                "High"
                                                ? "1px solid #ab313066"
                                                : task.priority ===
                                                    "Medium"
                                                    ? "1px solid #62929e66"
                                                    : "1px solid #ffdb5866",
                                    }}
                                >
                                    {task.priority}
                                </span>
                            </div>

                            <span
                                style={{
                                    color:
                                        "var(--text-secondary)",

                                    fontSize: "0.8rem",
                                }}
                            >
                                {task.dueDate}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </GlassCard>
    );
}

export default TaskActivity;