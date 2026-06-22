import GlassCard from "../GlassCard";

import {
    Trash2,
    Star,
} from "lucide-react";

import { useState } from "react";

import NotificationModal from "./NotificationModal";

import {
    toggleStarNotification,
    deleteNotification,
} from "../../services/notificationService";

function NotificationFeed({
    notifications,
    setNotifications,
    toast,
    setToast,
    onClearAll,
}) {
    const [
        selectedNotification,
        setSelectedNotification,
    ] = useState(null);

    const getTimeAgo = (date) => {
        const seconds = Math.floor(
            (new Date() - new Date(date)) /
            1000
        );

        const minutes = Math.floor(
            seconds / 60
        );

        const hours = Math.floor(
            minutes / 60
        );

        const days = Math.floor(
            hours / 24
        );

        if (seconds < 60)
            return "Just now";

        if (minutes < 60)
            return `${minutes} min${minutes !== 1 ? "s" : ""
                } ago`;

        if (hours < 24)
            return `${hours} hour${hours !== 1 ? "s" : ""
                } ago`;

        if (days === 1)
            return "Yesterday";

        if (days < 7)
            return `${days} days ago`;

        return new Date(
            date
        ).toLocaleDateString();
    };

    return (
        <>
            <GlassCard
                style={{
                    background: "var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "var(--radius-large)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    padding: "24px",
                    minHeight: "400px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "24px",
                    }}
                >
                    <h2
                        style={{
                            fontWeight: "400",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Notifications
                    </h2>

                    <button
                        disabled={notifications.length === 0}
                        onClick={onClearAll}
                        style={{
                            background: "transparent",

                            border: "1px solid rgba(255,255,255,0.08)",

                            borderRadius: "999px",

                            padding: "8px 14px",

                            color:
                                notifications.length === 0
                                    ? "rgba(255,255,255,0.25)"
                                    : "var(--text-secondary)",

                            cursor:
                                notifications.length === 0
                                    ? "not-allowed"
                                    : "pointer",

                            opacity:
                                notifications.length === 0
                                    ? 0.5
                                    : 1,

                            fontSize: "0.8rem",

                            fontWeight: "300",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            if (notifications.length === 0)
                                return;

                            e.currentTarget.style.color =
                                "var(--text-primary)";

                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.04)";
                        }}
                        onMouseLeave={(e) => {
                            if (notifications.length === 0)
                                return;
                            e.currentTarget.style.color =
                                "var(--text-secondary)";

                            e.currentTarget.style.background =
                                "transparent";
                        }}
                    >
                        Clear All
                    </button>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",

                        maxHeight: "750px",

                        overflow: "auto",

                        paddingRight: "4px",
                    }}
                >
                    {notifications.length === 0 ? (
                        <p
                            style={{
                                color:
                                    "var(--text-secondary)",
                                fontSize: "0.85rem",
                                padding: "24px 0",
                            }}
                        >
                            No notifications.
                        </p>
                    ) : (
                        notifications.map((notification) => (
                            <div
                                key={notification._id}
                                onClick={() =>
                                    setSelectedNotification(
                                        notification
                                    )
                                }
                                style={{
                                    padding: "16px",

                                    borderRadius: "12px",

                                    cursor: "pointer",

                                    transition: "all 0.2s ease",

                                    transform: "translateY(0)",
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
                                <h4
                                    style={{
                                        marginBottom: "6px",

                                        fontWeight: "300",

                                        letterSpacing: "-0.015em",

                                        display: "flex",

                                        justifyContent:
                                            "space-between",

                                        alignItems: "center",
                                    }}
                                >
                                    {notification.title}

                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        <Star
                                            size={16}
                                            strokeWidth={1.5}
                                            fill={
                                                notification.starred
                                                    ? "currentColor"
                                                    : "none"
                                            }

                                            style={{
                                                cursor: "pointer",

                                                color:
                                                    notification.starred
                                                        ? "#F5F5F5"
                                                        : "",

                                                transition:
                                                    "all 0.2s ease",
                                            }}
                                            onClick={async (e) => {
                                                e.stopPropagation();

                                                try {
                                                    const updated =
                                                        await toggleStarNotification(
                                                            notification._id
                                                        );

                                                    setNotifications((prev) =>
                                                        prev.map((item) =>
                                                            item._id === updated._id
                                                                ? updated
                                                                : item
                                                        )
                                                    );

                                                    setToast(
                                                        updated.starred
                                                            ? "Notification starred"
                                                            : "Notification unstarred"
                                                    );
                                                } catch (error) {
                                                    console.error(error);

                                                    setToast(
                                                        "Failed to update notification"
                                                    );
                                                }
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform =
                                                    "scale(1.1)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform =
                                                    "scale(1)";
                                            }}
                                        />

                                        <Trash2
                                            size={16}
                                            strokeWidth={1.5}
                                            style={{
                                                cursor: "pointer",

                                                transition:
                                                    "all 0.2s ease",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color =
                                                    "#ff6b6b";

                                                e.currentTarget.style.transform =
                                                    "scale(1.1)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color =
                                                    "";

                                                e.currentTarget.style.transform =
                                                    "scale(1)";
                                            }}
                                            onClick={async (e) => {
                                                e.stopPropagation();

                                                try {
                                                    await deleteNotification(
                                                        notification._id
                                                    );

                                                    setNotifications((prev) =>
                                                        prev.filter(
                                                            (item) =>
                                                                item._id !==
                                                                notification._id
                                                        )
                                                    );

                                                    setToast(
                                                        "Notification deleted"
                                                    );
                                                } catch (error) {
                                                    console.error(error);

                                                    setToast(
                                                        "Failed to delete notification"
                                                    );
                                                }
                                            }}
                                        />
                                    </div>
                                </h4>

                                {notification.type && (
                                    <div
                                        style={{
                                            marginBottom: "10px",
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

                                        display:
                                            "-webkit-box",

                                        WebkitLineClamp: 2,

                                        WebkitBoxOrient:
                                            "vertical",

                                        overflow: "hidden",

                                        marginBottom:
                                            "8px",

                                        fontSize: "0.9rem",
                                    }}
                                >
                                    {
                                        notification.description
                                    }
                                </p>

                                <small
                                    style={{
                                        color:
                                            "rgba(255,255,255,0.55)",

                                        fontWeight: "300",

                                        letterSpacing: "-0.01em",
                                    }}
                                >
                                    {
                                        getTimeAgo(
                                            notification.createdAt
                                        )
                                    }
                                </small>
                            </div>
                        ))
                    )}
                </div>
            </GlassCard>
            {selectedNotification && (
                <NotificationModal
                    notification={
                        selectedNotification
                    }
                    onClose={() =>
                        setSelectedNotification(
                            null
                        )
                    }
                />
            )}
        </>
    );
}

export default NotificationFeed;