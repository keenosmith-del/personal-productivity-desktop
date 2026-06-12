import GlassCard from "../GlassCard";

function TaskActivity() {
    const days = [
        {
            day: "Mon",
            priorities: [
                "High",
                "Medium",
            ],
        },
        {
            day: "Tue",
            priorities: [
                "High",
                "High",
                "Medium",
                "Low",
            ],
        },
        {
            day: "Wed",
            priorities: ["Low"],
        },
        {
            day: "Thu",
            priorities: [
                "High",
                "High",
                "Medium",
                "Medium",
                "Low",
            ],
        },
        {
            day: "Fri",
            priorities: [
                "Medium",
                "Medium",
                "Low",
            ],
        },
        {
            day: "Sat",
            priorities: ["Low"],
        },
        {
            day: "Sun",
            priorities: [
                "High",
                "Medium",
                "Medium",
                "Low",
            ],
        },
    ];

    return (
        <GlassCard minHeight="220px">
            <h2
                style={{
                    fontWeight: "400",
                    marginBottom:
                        "20px",
                }}
            >
                Task Activity
            </h2>

            <div
                style={{
                    display: "flex",
                    flexDirection:
                        "column",

                    gap: "12px",
                }}
            >
                {days.map((day) => (
                    <div
                        key={day.day}
                        style={{
                            display: "flex",

                            alignItems:
                                "center",

                            gap: "12px",
                        }}
                    >
                        <span
                            style={{
                                width:
                                    "40px",

                                fontWeight:
                                    "300",

                                color:
                                    "var(--text-secondary)",
                            }}
                        >
                            {day.day}
                        </span>

                        <div
                            style={{
                                display:
                                    "flex",

                                gap: "6px",
                            }}
                        >
                            {day.priorities.map(
                                (
                                    priority,
                                    index
                                ) => (
                                    <div
                                        key={index}
                                        style={{
                                            width: "8px",
                                            height: "8px",

                                            borderRadius:
                                                "50%",

                                            background:
                                                priority ===
                                                    "High"
                                                    ? "#3d3f4a"
                                                    : priority ===
                                                        "Medium"
                                                        ? "#52677d"
                                                        : "#7d8491",
                                        }}
                                    />
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}

export default TaskActivity;