import { X } from "lucide-react";

function ReminderDetailsModal({
    reminder,
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
                        Reminder Details
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
                                fontWeight: "400",
                                marginBottom: "12px",
                            }}
                        >
                            {reminder.title}
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

                                    fontSize: "0.68rem",

                                    background: "#83545c33",

                                    border:
                                        "1px solid #83545c66",
                                }}
                            >
                                Reminder
                            </span>

                            <span
                                style={{
                                    padding: "4px 8px",

                                    borderRadius: "999px",

                                    fontSize: "0.68rem",

                                    background:
                                        reminder.category === "Work"
                                            ? "#063f4733"
                                            : reminder.category ===
                                                "Study"
                                                ? "#29737633"
                                                : reminder.category ===
                                                    "Personal"
                                                    ? "#5c939633"
                                                    : "#10343933",

                                    border:
                                        reminder.category === "Work"
                                            ? "1px solid #063f4766"
                                            : reminder.category ===
                                                "Study"
                                                ? "1px solid #29737666"
                                                : reminder.category ===
                                                    "Personal"
                                                    ? "1px solid #5c939666"
                                                    : "1px solid #10343966",
                                }}
                            >
                                {reminder.category}
                            </span>

                            <span
                                style={{
                                    padding: "4px 8px",

                                    borderRadius: "999px",

                                    fontSize: "0.68rem",

                                    background: "#4d689333",

                                    border:
                                        "1px solid #4d689366",
                                }}
                            >
                                Active
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
                            Placeholder description for
                            reminder details.
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
                            Date
                        </p>

                        <p>{reminder.date}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReminderDetailsModal;