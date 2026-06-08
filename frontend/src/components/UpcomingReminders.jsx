import { useState } from "react";

import GlassCard from "./GlassCard";

import {
    Pencil,
    Trash2,
} from "lucide-react";

function UpcomingReminders() {
    const [completedReminders, setCompletedReminders] =
        useState({});

    const reminders = [
        {
            title:
                "Submit Course Assignment",
            date: "Tomorrow",
        },
        {
            title:
                "Portfolio Review",
            date: "Friday",
        },
        {
            title:
                "Apply For Jobs",
            date: "Sunday",
        },
    ];

    return (
        <GlassCard>
            <h2
                style={{
                    marginBottom: "24px",
                }}
            >
                Upcoming Reminders
            </h2>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                {reminders.map(
                    (reminder) => (
                        <div
                            key={reminder.title}
                            style={{
                                display: "flex",

                                alignItems: "center",

                                justifyContent:
                                    "space-between",

                                padding: "14px",

                                background:
                                    "rgba(255,255,255,0.04)",

                                border:
                                    "1px solid var(--glass-border)",

                                borderRadius:
                                    "12px",

                                transition:
                                    "all 0.25s ease",

                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(14,17,22,0.75)";

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
                            <div
                                style={{
                                    display: "flex",

                                    alignItems: "center",

                                    gap: "12px",
                                }}
                            >
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        setCompletedReminders(
                                            (prev) => ({
                                                ...prev,
                                                [reminder.title]:
                                                    !prev[
                                                    reminder.title
                                                    ],
                                            })
                                        );
                                    }}
                                    style={{
                                        cursor: "pointer",

                                        width: "18px",
                                        height: "18px",

                                        borderRadius: "50%",

                                        border:
                                            "1.5px solid rgba(245,245,245,0.7)",

                                        background:
                                            completedReminders[
                                                reminder.title
                                            ]
                                                ? "rgba(245,245,245,0.75)"
                                                : "transparent",

                                        transition:
                                            "all 0.2s ease",

                                        flexShrink: 0,
                                    }}
                                />

                                <div>
                                    <div>
                                        {reminder.title}
                                    </div>

                                    <div
                                        style={{
                                            fontSize:
                                                "0.8rem",

                                            color:
                                                "var(--text-secondary)",
                                        }}
                                    >
                                        {reminder.date}
                                    </div>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "flex",

                                    alignItems: "center",

                                    gap: "12px",
                                }}
                            >
                                <Pencil
                                    size={16}
                                    strokeWidth={1.5}
                                    style={{
                                        cursor:
                                            "pointer",

                                        transition:
                                            "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            "#F5F5F5";

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

                                <Trash2
                                    size={16}
                                    strokeWidth={1.5}
                                    style={{
                                        cursor:
                                            "pointer",

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
                            </div>
                        </div>
                    )
                )}
            </div>
        </GlassCard>
    );
}

export default UpcomingReminders;