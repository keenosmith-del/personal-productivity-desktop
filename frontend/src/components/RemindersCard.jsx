import { useState } from "react";
import GlassCard from "./GlassCard";
import {
    Plus,
    Eye,
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
                        border: "none",

                        color:
                            "var(--text-secondary)",

                        display: "flex",
                        alignItems: "center",

                        gap: "6px",

                        cursor: "pointer",

                        fontSize: "0.9rem",

                        fontWeight: "400",

                        transition:
                            "all 0.2s ease",
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
                    <Plus
                        size={16}
                        strokeWidth={1.5}
                    />
                    New Reminder
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
                    const isCompleted =
                        completedReminders.includes(
                            reminder.title
                        );

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

                                padding: "14px",

                                background:
                                    "rgba(255,255,255,0.04)",

                                border:
                                    "1px solid var(--glass-border)",

                                borderRadius: "12px",

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
                                        width: "18px",
                                        height: "18px",

                                        borderRadius: "50%",

                                        border:
                                            "1.5px solid rgba(245,245,245,0.7)",

                                        background:
                                            isCompleted
                                                ? "rgba(245,245,245,0.7)"
                                                : "transparent",

                                        cursor: "pointer",

                                        flexShrink: 0,
                                    }}
                                />

                                <div>
                                    <div
                                        style={{
                                            fontWeight: "300",

                                            textDecoration:
                                                isCompleted
                                                    ? "line-through"
                                                    : "none",

                                            opacity:
                                                isCompleted
                                                    ? 0.55
                                                    : 1,

                                            fontSize: "0.9rem",

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

                                <Eye
                                    size={16}
                                    strokeWidth={1.5}
                                    style={{
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        onViewReminder(reminder);
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