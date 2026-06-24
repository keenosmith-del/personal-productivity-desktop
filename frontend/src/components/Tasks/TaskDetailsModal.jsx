import { X } from "lucide-react";

function TaskDetailsModal({
    task,
    onClose,
    onEditTask,
    onDeleteTask,
    setToast,
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

                    borderRadius: "36px",

                    backdropFilter:
                        "blur(30px)",

                    padding: "36px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "24px",
                    }}
                >
                    <div>
                        <h2
                            style={{
                                margin: 0,
                                fontSize: "0.95rem",
                                fontWeight: "400",
                            }}
                        >
                            Task Details
                        </h2>

                        <p
                            style={{
                                marginTop: "4px",
                                marginBottom: 0,
                                fontSize: "0.8rem",
                                fontWeight: "300",
                                opacity: 0.55,
                            }}
                        >
                            View task information
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        style={{
                            width: "32px",
                            height: "32px",

                            borderRadius: "999px",

                            border:
                                "1px solid rgba(255,255,255,0.08)",

                            background:
                                "rgba(255,255,255,0.04)",

                            color:
                                "var(--text-secondary)",

                            cursor: "pointer",

                            fontSize: "0.85rem",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.10)";

                            e.currentTarget.style.transform =
                                "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.04)";

                            e.currentTarget.style.transform =
                                "scale(1)";
                        }}
                    >
                        x
                    </button>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* Avatar */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",

                            marginBottom: "18px",
                        }}
                    >
                        <div
                            style={{
                                width: "88px",
                                height: "88px",

                                borderRadius: "50%",

                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",

                                background:
                                    "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",

                                border:
                                    "1px solid rgba(255,255,255,0.12)",

                                fontSize: "2rem",

                                fontWeight: "300",
                            }}
                        >
                            ✓
                        </div>
                    </div>

                    {/* Title */}
                    <h3
                        style={{
                            textAlign: "center",

                            fontWeight: "300",

                            fontSize: "1.05rem",

                            letterSpacing: "-0.02em",

                            margin: 0,

                            marginBottom: "14px",
                        }}
                    >
                        {task.title}
                    </h3>

                    {/* Chips */}
                    <div
                        style={{
                            display: "flex",

                            justifyContent: "center",

                            gap: "8px",

                            flexWrap: "wrap",

                            marginBottom: "22px",

                            fontWeight: "300",
                        }}
                    >
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

                        {!task.completed && (
                            <span
                                style={{
                                    padding: "4px 8px",

                                    borderRadius: "999px",

                                    fontSize: "0.7rem",

                                    background:
                                        task.status === "In Progress"
                                            ? "#e9b95733"
                                            : task.status === "Overdue"
                                                ? "#85222f33"
                                                : "#4d689333",

                                    border:
                                        task.status === "In Progress"
                                            ? "1px solid #e9b95766"
                                            : task.status === "Overdue"
                                                ? "1px solid #85222f66"
                                                : "1px solid #4d689366",
                                }}
                            >
                                {task.status}
                            </span>
                        )}
                    </div>

                    {/* Divider */}

                    <div
                        style={{
                            height: "1px",

                            background:
                                "rgba(255,255,255,0.06)",

                            marginBottom: "20px",
                        }}
                    />

                    {/* Completion Area */}

                    {!task.completed ? (
                        <button
                            style={{
                                alignSelf: "center",

                                padding: "10px 18px",

                                borderRadius: "999px",

                                background:
                                    "rgba(114,138,110,0.12)",

                                border:
                                    "1px solid rgba(114,138,110,0.25)",

                                color: "#9bc091",

                                fontSize: "0.8rem",

                                fontWeight: "300",

                                cursor: "pointer",

                                marginBottom: "20px",
                            }}
                        >
                            Mark Complete
                        </button>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",

                                marginBottom: "20px",
                            }}
                        >
                            <div
                                style={{
                                    textAlign: "center",

                                    padding: "12px",

                                    borderRadius: "14px",

                                    background:
                                        "rgba(114,138,110,0.10)",

                                    border:
                                        "1px solid rgba(114,138,110,0.18)",

                                    fontSize: "0.8rem",

                                    fontWeight: "300",
                                }}
                            >
                                ✓ Completed
                            </div>

                            <button
                                style={{
                                    alignSelf: "center",

                                    padding: "10px 18px",

                                    borderRadius: "999px",

                                    background:
                                        "rgba(255,255,255,0.08)",

                                    border:
                                        "1px solid rgba(255,255,255,0.10)",

                                    color:
                                        "var(--text-primary)",

                                    fontSize: "0.8rem",

                                    fontWeight: "300",

                                    cursor: "pointer",
                                }}
                            >
                                Restore Task
                            </button>
                        </div>
                    )}

                    {/* DIVIDER */}
                    <div
                        style={{
                            height: "1px",

                            background:
                                "rgba(255,255,255,0.06)",

                            marginBottom: "20px",
                        }}
                    />

                    {/* Description */}

                    <div
                        style={{
                            marginBottom: "20px",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "0.8rem",

                                opacity: 0.45,

                                fontWeight: "300",

                                marginBottom: "8px",
                            }}
                        >
                            Description
                        </p>

                        <p
                            style={{
                                fontSize: "0.85rem",

                                fontWeight: "300",

                                lineHeight: 1.6,

                                margin: 0,
                            }}
                        >
                            {task.description ||
                                "No description provided."}
                        </p>
                    </div>

                    {/* Due Date */}

                    <div>
                        <p
                            style={{
                                fontSize: "0.8rem",

                                opacity: 0.45,

                                fontWeight: "300",

                                marginBottom: "8px",
                            }}
                        >
                            Due Date
                        </p>

                        <p
                            style={{
                                fontSize: "0.85rem",

                                fontWeight: "300",

                                margin: 0,
                            }}
                        >
                            {task.dueDate}
                        </p>
                    </div>
                </div>


                <div
                    style={{
                        display: "flex",

                        justifyContent: "flex-end",

                        gap: "10px",

                        marginTop: "24px",
                    }}
                >
                    <button
                        onClick={() => {
                            onDeleteTask(task._id);

                            setToast("Task deleted");

                            setTimeout(() => {
                                setToast("");
                            }, 4000);

                            onClose();
                        }}
                        style={{
                            padding: "11px 18px",

                            borderRadius: "999px",

                            background:
                                "rgba(255,77,77,0.12)",

                            border:
                                "1px solid rgba(255,77,77,0.25)",

                            color: "var(--danger)",

                            fontSize: "0.8rem",

                            fontWeight: "300",

                            cursor: "pointer",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,77,77,0.20)";

                            e.currentTarget.style.transform =
                                "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,77,77,0.12)";

                            e.currentTarget.style.transform =
                                "translateY(0)";
                        }}
                    >
                        Delete
                    </button>

                    <button
                        onClick={() => {
                            onEditTask(task);

                            onClose();
                        }}
                        style={{
                            padding: "11px 18px",

                            borderRadius: "999px",

                            background:
                                "rgba(255,255,255,0.08)",

                            border:
                                "1px solid rgba(255,255,255,0.10)",

                            color:
                                "var(--text-primary)",

                            fontSize: "0.8rem",

                            fontWeight: "300",

                            cursor: "pointer",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.14)";

                            e.currentTarget.style.transform =
                                "translateY(-1px)";

                            e.currentTarget.style.border =
                                "1px solid rgba(255,255,255,0.18)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.08)";

                            e.currentTarget.style.transform =
                                "translateY(0)";

                            e.currentTarget.style.border =
                                "1px solid rgba(255,255,255,0.10)";
                        }}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskDetailsModal;