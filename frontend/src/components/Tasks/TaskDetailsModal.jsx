import { X } from "lucide-react";

function TaskDetailsModal({
    task,
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
                justifyContent: "center",
                alignItems: "center",

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

                    boxShadow:
                        "0 30px 80px rgba(0,0,0,0.45)",

                    borderRadius: "32px",

                    backdropFilter:
                        "blur(30px)",

                    padding: "36px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        alignItems: "center",
                        marginBottom: "24px",
                    }}
                >
                    <h2
                        style={{
                            fontWeight: "400",
                        }}
                    >
                        Task Details
                    </h2>

                    <X
                        size={18}
                        strokeWidth={1.5}
                        style={{
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                        }}
                        onClick={onClose}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.opacity =
                                "0.7";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.opacity =
                                "1";
                        }}
                    />
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    <div>
                        <h3
                            style={{
                                fontWeight: "300",

                                fontSize: "1.2rem",

                                marginBottom: "12px",
                            }}
                        >
                            {task.title}
                        </h3>

                        <div
                            style={{
                                display: "flex",

                                gap: "8px",

                                flexWrap: "wrap",
                            }}
                        >
                            <span
                                style={{
                                    padding: "4px 8px",

                                    borderRadius: "999px",

                                    fontSize: "0.7rem",

                                    background: "#72715c33",

                                    border:
                                        "1px solid #72715c66",
                                }}
                            >
                                Task
                            </span>

                            <span
                                style={{
                                    padding: "4px 8px",

                                    borderRadius: "999px",

                                    fontSize: "0.7rem",

                                    background:
                                        task.category === "Work"
                                            ? "#063f4733"
                                            : task.category === "Study"
                                                ? "#29737633"
                                                : task.category === "Personal"
                                                    ? "#5c939633"
                                                    : "#10343933",

                                    border:
                                        task.category === "Work"
                                            ? "1px solid #063f4766"
                                            : task.category === "Study"
                                                ? "1px solid #29737666"
                                                : task.category === "Personal"
                                                    ? "1px solid #5c939666"
                                                    : "1px solid #10343966",
                                }}
                            >
                                {task.category}
                            </span>

                            <span
                                style={{
                                    padding: "4px 8px",

                                    borderRadius: "999px",

                                    fontSize: "0.7rem",

                                    background:
                                        task.priority === "High"
                                            ? "#ab313033"
                                            : task.priority === "Medium"
                                                ? "#62929e33"
                                                : "#ffdb5833",

                                    border:
                                        task.priority === "High"
                                            ? "1px solid #ab313066"
                                            : task.priority === "Medium"
                                                ? "1px solid #62929e66"
                                                : "1px solid #ffdb5866",
                                }}
                            >
                                {task.priority}
                            </span>

                            <span
                                style={{
                                    padding: "4px 8px",

                                    borderRadius: "999px",

                                    fontSize: "0.7rem",

                                    background:
                                        task.status ===
                                            "In Progress"
                                            ? "#e9b95733"
                                            : task.status ===
                                                "Overdue"
                                                ? "#85222f33"
                                                : task.status ===
                                                    "Complete"
                                                    ? "#728a6e33"
                                                    : "#4d689333",

                                    border:
                                        task.status ===
                                            "In Progress"
                                            ? "1px solid #e9b95766"
                                            : task.status ===
                                                "Overdue"
                                                ? "1px solid #85222f66"
                                                : task.status ===
                                                    "Complete"
                                                    ? "1px solid #728a6e66"
                                                    : "1px solid #4d689366",
                                }}
                            >
                                {task.completed
                                    ? "Complete"
                                    : task.status}
                            </span>
                        </div>
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
                            {task.description ||
                                "No description provided."}
                        </p>
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
                            Due Date
                        </p>

                        <p
                            style={{
                                color:
                                    "var(--text-primary)",
                            }}
                        >
                            {task.dueDate}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskDetailsModal;