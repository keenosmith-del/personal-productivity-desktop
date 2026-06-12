import { useState } from "react";
import GlassCard from "../GlassCard";
import {
    Pencil,
    Trash2,
} from "lucide-react";

const reminders = [
    {
        title: "Portfolio Review",
        date: "Friday",
        category: "Work",
        color: "#1a1d29",
    },
    {
        title: "Submit Assignment",
        date: "Tomorrow",
        category: "Study",
        color: "#3d3f4a",
    },
    {
        title: "Apply For Jobs",
        date: "Sunday",
        category: "Personal",
        color: "#52677d",
    },
];

function RemindersCard({
    onNewReminder,
    onViewReminder,
    onEditReminder,
}) {
    const [completedReminders,
        setCompletedReminders] =
        useState([]);
    return (
        <GlassCard minHeight="320px">
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "32px",
                }}
            >
                <h2
                    style={{
                        fontWeight: "400",
                        letterSpacing: "-0.02em",
                    }}
                >
                    Reminders
                </h2>

                <button
                    onClick={onNewReminder}
                    style={{
                        background: "transparent",

                        border: "1px solid rgba(255,255,255,0.08)",

                        borderRadius: "999px",

                        padding: "8px 14px",

                        color: "var(--text-secondary)",

                        fontSize: "0.8rem",

                        fontWeight: "300",

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
                    + New Reminder
                </button>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                {reminders.map((reminder) => {
                    const isCompleted = completedReminders.includes(reminder.title);

                    return (
                        <div
                            key={reminder.title}
                            onClick={() =>
                                onViewReminder(reminder)
                            }
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",

                                padding: "8px 12px",

                                borderRadius: "12px",

                                transition: "all 0.25s ease",

                                cursor: "pointer",
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
                                            (prev) =>
                                                prev.includes(
                                                    reminder.title
                                                )
                                                    ? prev.filter(
                                                        (r) =>
                                                            r !==
                                                            reminder.title
                                                    )
                                                    : [
                                                        ...prev,
                                                        reminder.title,
                                                    ]
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
                                            isCompleted
                                                ? "rgba(245,245,245,0.7)"
                                                : "transparent",

                                        flexShrink: 0,

                                        transition: "all 0.2s ease",

                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",

                                        fontSize: "12px",
                                        fontWeight: "600",

                                        color: "#1a1d29",
                                    }}
                                >
                                    {isCompleted && "✓"}
                                </div>

                                <div>
                                    <div
                                        style={{
                                            fontWeight: "300",

                                            fontSize: "0.9rem",

                                            opacity:
                                                isCompleted
                                                    ? 0.55
                                                    : 1,

                                            letterSpacing:
                                                "-0.015em",
                                        }}
                                    >
                                        {reminder.title}
                                    </div>

                                    <div
                                        style={{
                                            fontSize: "0.8rem",

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
                                <div
                                    style={{
                                        width: "10px",
                                        height: "10px",

                                        borderRadius: "50%",

                                        background:
                                            reminder.color,
                                    }}
                                />

                                <Pencil
                                    size={16}
                                    strokeWidth={1.5}
                                    style={{
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        onEditReminder(reminder);
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            "#F5F5F5";

                                        e.currentTarget.style.transform =
                                            "scale(1.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = "";

                                        e.currentTarget.style.transform =
                                            "scale(1)";
                                    }}
                                />

                                <Trash2
                                    size={16}
                                    strokeWidth={1.5}
                                    style={{
                                        cursor: "pointer",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            "#ff6b6b";

                                        e.currentTarget.style.transform =
                                            "scale(1.1)";
                                    }}

                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = "";

                                        e.currentTarget.style.transform =
                                            "scale(1)";
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </GlassCard>
    );
}

export default RemindersCard;