import GlassCard from "../GlassCard";

function TaskActivity() {
    return (
        <GlassCard minHeight="220px">
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
                {[
                    {
                        title: "Frontend Roles",
                        priority: "High",
                        due: "Tomorrow",
                    },
                    {
                        title: "AI Course Module",
                        priority: "Medium",
                        due: "15 Jun",
                    },
                    {
                        title: "Portfolio Cleanup",
                        priority: "Low",
                        due: "20 Jun",
                    },
                ].map((task) => (
                    <div
                        key={task.title}
                        style={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    marginBottom: "6px",

                                    fontWeight: "300",
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
                            {task.due}
                        </span>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}

export default TaskActivity;