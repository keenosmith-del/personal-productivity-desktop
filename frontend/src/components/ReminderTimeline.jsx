import { useState } from "react";

import GlassCard from "./GlassCard";

function ReminderTimeline() {
    const [selectedDay, setSelectedDay] =
        useState("Today");

    const reminders = {
        Today: [
            "Submit Assignment",
            "Portfolio Review",
        ],

        Tomorrow: [
            "Apply For Jobs",
            "Team Meeting",
        ],

        Friday: [
            "Weekly Review",
            "Goal Check-In",
        ],

        Weekend: [
            "Meal Prep",
            "Exercise Session",
        ],
    };

    const days = [
        "Today",
        "Tomorrow",
        "Friday",
        "Weekend",
    ];

    return (
        <GlassCard minHeight="260px">
            <h2
                style={{
                    marginBottom: "32px",

                    fontWeight: "400",

                    letterSpacing: "-0.02em",
                }}
            >
            </h2>

            <div
                style={{
                    display: "flex",

                    alignItems: "flex-start",

                    justifyContent:
                        "space-between",
                }}
            >
                {days.map((day, index) => (
                    <div
                        key={day}
                        onClick={() =>
                            setSelectedDay(day)
                        }
                        style={{
                            display: "flex",

                            flexDirection: "column",

                            alignItems: "center",

                            flex: 1,

                            position: "relative",

                            cursor: "pointer",
                        }}
                    >
                        <div
                            style={{
                                width: "14px",
                                height: "14px",

                                borderRadius: "50%",

                                background:
                                    selectedDay === day
                                        ? "#F5F5F5"
                                        : "rgba(255,255,255,0.25)",

                                transition:
                                    "all 0.2s ease",

                                marginBottom: "12px",

                                zIndex: 2,
                            }}
                        />

                        <span
                            style={{
                                fontSize: "0.85rem",

                                color:
                                    selectedDay === day
                                        ? "var(--text-primary)"
                                        : "var(--text-secondary)",

                                transition:
                                    "all 0.2s ease",
                            }}
                        >
                            {day}
                        </span>

                        {selectedDay === day && (
                            <div
                                style={{
                                    marginTop: "16px",

                                    display: "flex",

                                    flexDirection: "column",

                                    gap: "8px",

                                    alignItems: "center",
                                }}
                            >
                                {reminders[day].map(
                                    (reminder) => (
                                        <span
                                            key={reminder}
                                            style={{
                                                fontSize: "0.75rem",

                                                color:
                                                    "var(--text-secondary)",

                                                textAlign: "center",

                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            • {reminder}
                                        </span>
                                    )
                                )}
                            </div>
                        )}

                        {index < days.length - 1 && (
                            <div
                                style={{
                                    position:
                                        "absolute",

                                    top: "7px",

                                    left: "50%",

                                    width: "100%",

                                    height: "1px",

                                    background:
                                        "rgba(255,255,255,0.08)",

                                    zIndex: 1,
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}

export default ReminderTimeline;