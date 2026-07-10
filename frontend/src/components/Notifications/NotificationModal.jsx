// why do I have this???

import { X } from "lucide-react";

function NotificationModal({
    notification,
    onClose,
}) {
    const formattedDate =
        notification.createdAt
            ? new Date(
                notification.createdAt
            ).toLocaleString()
            : "";
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

                zIndex: 2000,
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

                    borderRadius: "36px",

                    backdropFilter:
                        "blur(30px)",

                    boxShadow:
                        "0 20px 60px rgba(0,0,0,0.45)",

                    padding: "32px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "18px",
                }}
            >
                <div
                    style={{
                        display: "flex",

                        justifyContent:
                            "space-between",

                        alignItems: "center",
                    }}
                >
                    <h2
                        style={{
                            fontWeight: "400",
                            letterSpacing:
                                "-0.02em",
                        }}
                    >
                        Notification
                    </h2>

                    <X
                        size={18}
                        strokeWidth={1.5}
                        style={{
                            cursor: "pointer",
                            transition:
                                "all 0.2s ease",
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

                <div>
                    <h3
                        style={{
                            fontWeight:
                                "300",

                            marginBottom:
                                "12px",
                        }}
                    >
                        {
                            notification.title
                        }
                    </h3>

                    {notification.type && (
                        <div
                            style={{
                                marginBottom: "14px",
                            }}
                        >
                            <span
                                style={{
                                    padding: "4px 8px",

                                    borderRadius: "999px",

                                    fontSize: "0.7rem",

                                    background:
                                        notification.type === "goal"
                                            ? "rgba(197,156,112,0.20)"
                                            : notification.type === "task"
                                                ? "rgba(114,113,92,0.20)"
                                                : notification.type === "reminder"
                                                    ? "rgba(131,84,92,0.20)"
                                                    : "rgba(133,76,73,0.20)",

                                    border:
                                        notification.type === "goal"
                                            ? "1px solid rgba(197,156,112,0.40)"
                                            : notification.type === "task"
                                                ? "1px solid rgba(114,113,92,0.40)"
                                                : notification.type === "reminder"
                                                    ? "1px solid rgba(131,84,92,0.40)"
                                                    : "1px solid rgba(133,76,73,0.40)",

                                    color:
                                        "var(--text-secondary)",
                                }}
                            >
                                {notification.type.charAt(0).toUpperCase() +
                                    notification.type.slice(1)}
                            </span>
                        </div>
                    )}

                    <p
                        style={{
                            color:
                                "var(--text-secondary)",

                            lineHeight:
                                1.6,
                        }}
                    >
                        {
                            notification.description
                        }
                    </p>
                </div>

                <small
                    style={{
                        color:
                            "rgba(255,255,255,0.55)",
                    }}
                >
                    {
                        formattedDate
                    }
                </small>
            </div>
        </div>
    );
}

export default NotificationModal;