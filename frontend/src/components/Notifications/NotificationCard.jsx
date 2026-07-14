import {
    Archive,
    Bell,
    Ellipsis,
    Star,
} from "lucide-react";

function NotificationCard({
    notification,

    openNotificationMenu,
    setOpenNotificationMenu,

    onDelete,

    onToggleArchive,
    onToggleStar,
    onToggleRead,
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

    const menuItemStyle = {
        width: "100%",

        padding: "10px 12px",

        background: "transparent",

        border: "none",

        borderRadius: "10px",

        color: "var(--text-primary)",

        textAlign: "left",

        fontSize: "0.8rem",

        fontWeight: "300",

        cursor: "pointer",

        transition: "all 0.2s ease",
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
                height: "250px",
                maxWidth: "320px",

                flexShrink: 0,

                background: "rgba(255, 255, 255, 0.025)",

                border: "1px solid rgba(255,255,255,0.06)",

                borderRadius: "24px",

                padding: "18px",

                display: "flex",
                flexDirection: "column",

                cursor: "pointer",

                transition: "all 0.2s ease",
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
                    "rgba(255, 255, 255, 0.025)";
            }}
        >

            {/* TYPE CHIP */}
            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "space-between",

                    alignItems: "center",

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
                    {notification.type.charAt(0).toUpperCase() +
                        notification.type.slice(1)}
                </span>

                <div
                    style={{
                        position: "relative",
                    }}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();

                            setOpenNotificationMenu(
                                openNotificationMenu ===
                                    notification._id
                                    ? null
                                    : notification._id
                            );
                        }}
                        style={{
                            background: "none",

                            border: "none",

                            color:
                                "var(--text-secondary)",

                            cursor: "pointer",

                            padding: 0,

                            display: "flex",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color =
                                "var(--text-primary)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color =
                                "var(--text-secondary)";
                        }}
                    >
                        <Ellipsis
                            size={18}
                            strokeWidth={1}
                        />
                    </button>

                    {openNotificationMenu ===
                        notification._id && (
                            <div
                                style={{
                                    position: "absolute",

                                    top: "24px",
                                    right: 0,

                                    minWidth: "140px",

                                    background:
                                        "rgba(20,20,20,0.95)",

                                    backdropFilter:
                                        "blur(20px)",

                                    border:
                                        "1px solid rgba(255,255,255,0.08)",

                                    borderRadius: "16px",

                                    overflow: "hidden",

                                    zIndex: 100,
                                }}
                            >
                                <button
                                    onClick={() => {
                                        onDelete(
                                            notification._id
                                        );

                                        setOpenNotificationMenu(
                                            null
                                        );
                                    }}
                                    style={{
                                        ...menuItemStyle,

                                        color: "#ff6b6b",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                            "rgba(255,255,255,0.04)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                            "transparent";
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                </div>
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

                    WebkitLineClamp: 2,

                    WebkitBoxOrient: "vertical",

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

            {/* BOTTOM ROW */}
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
                        display: "flex",

                        gap: "14px",

                        alignItems: "center",
                    }}
                >
                    <div
                        onClick={(e) => {
                            e.stopPropagation();

                            onToggleStar(
                                notification
                            );
                        }}
                        style={{
                            color:
                                notification.starred
                                    ? "#d2b48c"
                                    : "var(--text-secondary)",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(-1px) scale(1.08)";

                            e.currentTarget.style.color =
                                "white";
                        }}

                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(0) scale(1)";

                            e.currentTarget.style.color =
                                notification.starred
                                    ? "#d2b48c"
                                    : "var(--text-secondary)";
                        }}
                    >
                        <Star
                            size={18}
                            strokeWidth={1}
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