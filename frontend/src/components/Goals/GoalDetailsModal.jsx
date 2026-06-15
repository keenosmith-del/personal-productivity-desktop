import { X } from "lucide-react";

function GoalDetailsModal({
    goal,
    onClose,
}) {
    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,

                background:
                    "rgba(0,0,0,0.35)",

                backdropFilter:
                    "blur(20px)",

                display: "flex",

                justifyContent:
                    "center",

                alignItems:
                    "center",

                zIndex: 1000,
            }}
        >
            <div
                onClick={(e) =>
                    e.stopPropagation()
                }
                style={{
                    width: "500px",

                    background:
                        "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",

                    border:
                        "1px solid rgba(255,255,255,0.10)",

                    borderRadius:
                        "32px",

                    backdropFilter:
                        "blur(30px)",

                    boxShadow:
                        "0 30px 80px rgba(0,0,0,0.45)",

                    padding: "36px",
                }}
            >
                <div
                    style={{
                        display: "flex",

                        justifyContent:
                            "space-between",

                        alignItems:
                            "center",

                        marginBottom:
                            "24px",
                    }}
                >
                    <h2
                        style={{
                            fontWeight: "400",
                        }}
                    >
                        Goal Details
                    </h2>

                    <X
                        size={18}
                        strokeWidth={
                            1.5
                        }
                        style={{
                            cursor:
                                "pointer",

                            transition:
                                "all 0.2s ease",
                        }}
                        onClick={
                            onClose
                        }
                        onMouseEnter={(
                            e
                        ) => {
                            e.currentTarget.style.opacity =
                                "0.7";
                        }}
                        onMouseLeave={(
                            e
                        ) => {
                            e.currentTarget.style.opacity =
                                "1";
                        }}
                    />
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection:
                            "column",

                        gap: "20px",
                    }}
                >
                    <div>
                        <p
                            style={{
                                color:
                                    "var(--text-secondary)",

                                fontSize:
                                    "0.8rem",

                                marginBottom:
                                    "6px",
                            }}
                        >
                            Goal
                        </p>

                        <h3
                            style={{
                                fontWeight:
                                    "400",
                            }}
                        >
                            {goal.title}
                        </h3>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap",
                            marginTop: "10px",
                        }}
                    >
                        <span
                            style={{
                                padding: "4px 10px",
                                borderRadius: "999px",
                                fontSize: "0.75rem",

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
                                padding: "4px 10px",
                                borderRadius: "999px",
                                fontSize: "0.75rem",

                                background:
                                    goal.status === "In Progress"
                                        ? "#e9b95733"
                                        : "#4d689333",

                                border:
                                    goal.status === "In Progress"
                                        ? "1px solid #e9b95766"
                                        : "1px solid #4d689366",
                            }}
                        >
                            {goal.status}
                        </span>
                    </div>

                    <div>
                        <p
                            style={{
                                color:
                                    "var(--text-secondary)",
                                fontSize: "0.8rem",
                                marginBottom: "6px",
                            }}
                        >
                            Description
                        </p>

                        <p>
                            {goal.description ||
                                "No description"}
                        </p>
                    </div>

                    <div>
                        <p
                            style={{
                                color:
                                    "var(--text-secondary)",

                                fontSize:
                                    "0.8rem",

                                marginBottom:
                                    "6px",
                            }}
                        >
                            Progress
                        </p>

                        <div>
                            <div
                                style={{
                                    width: "100%",
                                    height: "8px",
                                    borderRadius: "999px",
                                    background:
                                        "rgba(255,255,255,0.08)",
                                    overflow: "hidden",
                                    marginBottom: "10px",
                                }}
                            >
                                <div
                                    style={{
                                        width: `${goal.progress}%`,
                                        height: "100%",
                                        background: "#c59c70",
                                    }}
                                />
                            </div>

                            <p>{goal.progress}% Complete</p>
                        </div>
                    </div>

                    <div>
                        <p
                            style={{
                                color:
                                    "var(--text-secondary)",

                                fontSize:
                                    "0.8rem",

                                marginBottom:
                                    "6px",
                            }}
                        >
                            Target Date
                        </p>

                        <p>{goal.targetDate}</p>
                    </div>

                    <div>
                        <p
                            style={{
                                color:
                                    "var(--text-secondary)",

                                fontSize: "0.8rem",

                                marginBottom: "10px",
                            }}
                        >
                            Associated Tasks
                        </p>

                        <div
                            style={{
                                display: "flex",
                                gap: "8px",
                                flexWrap: "wrap",
                            }}
                        >
                            {goal.associatedTasks?.length ? (
                                goal.associatedTasks.map(
                                    (task) => (
                                        <span
                                            key={task}
                                            style={{
                                                padding: "4px 10px",
                                                borderRadius:
                                                    "999px",
                                                fontSize: "0.75rem",
                                                background:
                                                    "#72715c33",
                                                border:
                                                    "1px solid #72715c66",
                                            }}
                                        >
                                            {task}
                                        </span>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GoalDetailsModal;