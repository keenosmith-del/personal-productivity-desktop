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
                        <p
                            style={{
                                color:
                                    "var(--text-secondary)",
                                fontSize: "0.8rem",
                                marginBottom: "6px",
                            }}
                        >
                            Reminder
                        </p>

                        <h3
                            style={{
                                fontWeight: "400",
                            }}
                        >
                            {reminder.title}
                        </h3>
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
                            Category
                        </p>

                        <p>{reminder.category}</p>
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

                        <p>June 15, 2026</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReminderDetailsModal;