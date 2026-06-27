import {
    Archive,
    BellDot,
    Star,
} from "lucide-react";

function NotificationCard({
    notification,
}) {
    const typeStyles = {
        task: {
            bg: "#4d689333",
            border: "#4d689366",
        },

        project: {
            bg: "#5f5b8733",
            border: "#5f5b8766",
        },

        goal: {
            bg: "#5d766233",
            border: "#5d766266",
        },

        reminder: {
            bg: "#7a685533",
            border: "#7a685566",
        },

        note: {
            bg: "#6d5d7333",
            border: "#6d5d7366",
        },

        system: {
            bg: "#45575b33",
            border: "#45575b66",
        },
    };

    const style =
        typeStyles[
        notification.type
        ] ||
        typeStyles.system;

    const linkedItemStyle = {
        width: "35px",
        height: "35px",

        borderRadius: "50%",

        background:
            "linear-gradient(135deg, rgba(87,112,122,0.35), rgba(39,60,65,0.15))",

        border:
            "1px solid rgba(255,255,255,0.06)",

        backdropFilter:
            "blur(20px)",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        fontSize: "0.68rem",

        color:
            "var(--text-secondary)",

        transition:
            "all 0.2s ease",
    };

    return (
        <div
            style={{
                height: "350px",

                background:
                    "rgba(255,255,255,0.025)",

                border:
                    "1px solid rgba(255,255,255,0.06)",

                borderRadius: "24px",

                padding: "18px",

                display: "flex",
                flexDirection: "column",

                cursor: "pointer",

                transition:
                    "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                    "translateY(-2px)";

                e.currentTarget.style.background =
                    "rgba(15,15,15,0.2)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                    "translateY(0)";

                e.currentTarget.style.background =
                    "rgba(255,255,255,0.025)";
            }}
        >
            {/* TYPE CHIP */}
            <div
                style={{
                    marginBottom: "16px",
                }}
            >
                <span
                    style={{
                        padding: "4px 10px",

                        borderRadius: "999px",

                        fontSize: "0.68rem",

                        background: style.bg,

                        border: `1px solid ${style.border}`,
                    }}
                >
                    {notification.type}
                </span>
            </div>

            {/* TITLE */}
            <div
                style={{
                    fontSize: "1rem",

                    fontWeight: "350",

                    letterSpacing: "-0.02em",

                    marginBottom: "10px",

                    marginTop: "5px",
                }}
            >
                {notification.title}
            </div>

            {/* DESCRIPTION */}
            <div
                style={{
                    minHeight: "30px",

                    fontSize: "0.75rem",

                    opacity: 0.55,

                    lineHeight: 1.4,

                    display: "-webkit-box",

                    WebkitLineClamp: 3,

                    WebkitBoxOrient:
                        "vertical",

                    overflow: "hidden",
                }}
            >
                {notification.description}
            </div>

            <div
                style={{
                    flex: 1,
                }}
            />

            {/* DIVIDER */}
            <div
                style={{
                    height: "1px",

                    background:
                        "rgba(255,255,255,0.05)",

                    marginBottom: "20px",
                }}
            />

            {/* AVATARS */}
            <div
                style={{
                    display: "flex",

                    marginBottom: "20px",
                }}
            >
                <div
                    style={{
                        ...linkedItemStyle,

                        marginRight: "-6px",

                        zIndex: 1,
                    }}
                >
                    T
                </div>

                <div
                    style={{
                        ...linkedItemStyle,

                        marginRight: "-6px",

                        zIndex: 2,
                    }}
                >
                    P
                </div>

                <div
                    style={{
                        ...linkedItemStyle,

                        background:
                            "rgba(255,255,255,0.03)",

                        border:
                            "1px solid rgba(255,255,255,0.08)",

                        zIndex: 3,
                    }}
                >
                    +2
                </div>
            </div>

            {/* DATE */}
            <div
                style={{
                    fontSize: "0.68rem",

                    opacity: 0.45,

                    marginBottom: "14px",
                }}
            >
                {notification.createdAt
                    ? new Date(
                        notification.createdAt
                    ).toLocaleDateString(
                        "en-US",
                        {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        }
                    )
                    : "Today"}
            </div>

            {/* ACTIONS */}
            <div
                style={{
                    display: "flex",

                    justifyContent:
                        "space-between",

                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        color:
                            notification.archived
                                ? "#a45d44"
                                : "var(--text-secondary)",
                    }}
                >
                    <Archive
                        size={18}
                    />
                </div>

                <div
                    style={{
                        display: "flex",

                        gap: "14px",

                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            color:
                                notification.unread
                                    ? "#728a6e"
                                    : "var(--text-secondary)",
                        }}
                    >
                        <BellDot
                            size={18}
                        />
                    </div>

                    <div
                        style={{
                            color:
                                notification.starred
                                    ? "#d2b48c"
                                    : "var(--text-secondary)",
                        }}
                    >
                        <Star
                            size={18}
                            fill={
                                notification.starred
                                    ? "currentColor"
                                    : "none"
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotificationCard;