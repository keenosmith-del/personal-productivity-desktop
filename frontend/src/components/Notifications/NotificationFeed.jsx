import GlassCard from "../GlassCard";

import {
    Trash2,
    Star,
} from "lucide-react";

import { useState } from "react";

import NotificationModal from "./NotificationModal";

function NotificationFeed() {
    const notifications = [
        {
            title: "Task Completed",
            type: "task",
            description: "Finish Productivity Desktop was completed.",
            time: "5 min ago",
        },
        {
            title: "Goal Progress",
            type: "goal",
            description: "Portfolio Website is now 75% complete.",
            time: "1 hour ago",
        },
        {
            title: "Reminder Due",
            type: "reminder",
            description: "Submit Course Assignment tomorrow.",
            time: "3 hours ago",
        },
        {
            title: "Daily Summary",
            type: null,
            description:
                "You completed 3 tasks today.",
            time: "Yesterday",
        },
    ];

    const [
        selectedNotification,
        setSelectedNotification,
    ] = useState(null);

    const [
        favourites,
        setFavourites,
    ] = useState([]);

    return (
        <>
            <GlassCard minHeight="700px">
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
                        style={{
                            background: "transparent",

                            border: "1px solid rgba(255,255,255,0.08)",

                            borderRadius: "999px",

                            padding: "8px 14px",

                            color: "var(--text-secondary)",

                            fontSize: "0.85rem",

                            fontWeight: "400",

                            cursor: "pointer",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color =
                                "var(--text-primary)";

                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.04)";
                        }}
                        onMouseLeave={(e) => {
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
                    }}
                >
                    {notifications.map(
                        (notification) => (
                            <div
                                key={notification.title}
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
                                                favourites.includes(
                                                    notification.title
                                                )
                                                    ? "currentColor"
                                                    : "none"
                                            }
                                            style={{
                                                cursor: "pointer",

                                                color:
                                                    favourites.includes(
                                                        notification.title
                                                    )
                                                        ? "#F5F5F5"
                                                        : "",

                                                transition:
                                                    "all 0.2s ease",
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();

                                                setFavourites((prev) =>
                                                    prev.includes(
                                                        notification.title
                                                    )
                                                        ? prev.filter(
                                                            (item) =>
                                                                item !==
                                                                notification.title
                                                        )
                                                        : [
                                                            ...prev,
                                                            notification.title,
                                                        ]
                                                );
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
                                            onClick={(e) => {
                                                e.stopPropagation();
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
                                        notification.time
                                    }
                                </small>
                            </div>
                        )
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