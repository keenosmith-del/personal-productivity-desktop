import GlassCard from "./GlassCard";
import { Trash2 } from "lucide-react";

function NotificationFeed() {
    const notifications = [
        {
            title: "Task Completed",
            description:
                "Finish Productivity Desktop was completed.",
            time: "5 min ago",
        },
        {
            title: "Goal Progress",
            description:
                "Portfolio Website is now 75% complete.",
            time: "1 hour ago",
        },
        {
            title: "Reminder Due",
            description:
                "Submit Course Assignment tomorrow.",
            time: "3 hours ago",
        },
        {
            title: "Daily Summary",
            description:
                "You completed 3 tasks today.",
            time: "Yesterday",
        },
    ];

    return (
        <GlassCard minHeight="700px">
            <h2
                style={{
                    marginBottom: "24px",
                }}
            >
                Notifications
            </h2>

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
                            style={{
                                padding: "16px",

                                background:
                                    "rgba(255,255,255,0.04)",

                                border:
                                    "1px solid var(--glass-border)",

                                borderRadius: "12px",

                                cursor: "pointer",

                                transition:
                                    "all 0.25s ease",

                                transform:
                                    "translateY(0)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(0,0,0,0.22)";

                                e.currentTarget.style.transform =
                                    "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.04)";

                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >
                            <h4
                                style={{
                                    marginBottom: "6px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                {notification.title}

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
                                />
                            </h4>

                            <p
                                style={{
                                    color:
                                        "var(--text-secondary)",

                                    marginBottom:
                                        "8px",
                                }}
                            >
                                {
                                    notification.description
                                }
                            </p>

                            <small
                                style={{
                                    color:
                                        "var(--text-secondary)",
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
    );
}

export default NotificationFeed;