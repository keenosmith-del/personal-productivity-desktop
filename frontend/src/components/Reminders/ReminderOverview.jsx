import GlassCard from "../GlassCard";

function ReminderOverview({
    reminders,
}) {
    const activeReminders =
        reminders.filter(
            (reminder) =>
                !reminder.completed
        );

    const categoryCounts =
        activeReminders.reduce(
            (acc, reminder) => {
                if (!reminder.category)
                    return acc;

                acc[reminder.category] =
                    (acc[
                        reminder.category
                    ] || 0) + 1;

                return acc;
            },
            {}
        );

    const recentReminders =
        reminders
            .slice(-2)
            .reverse();

    return (
        <GlassCard minHeight="520px">
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                }}
            >
                <h2
                    style={{
                        fontWeight: "400",
                    }}
                >
                    Reminder Overview
                </h2>

                <div>
                    <p
                        style={{
                            color:
                                "var(--text-secondary)",
                            marginBottom: "12px",
                        }}
                    >
                        Active Reminders
                    </p>

                    <h2
                        style={{
                            fontWeight: "400",
                            marginBottom: "16px",
                        }}
                    >
                        {activeReminders.length}
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap",
                        }}
                    >
                        <span
                            style={{
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "0.68rem",
                                background: "#83545c33",
                                border: "1px solid #83545c66",
                            }}
                        >
                            Today {
                                activeReminders.filter(
                                    (r) => r.date === "Today"
                                ).length
                            }
                        </span>

                        <span
                            style={{
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "0.68rem",
                                background: "#83545c33",
                                border: "1px solid #83545c66",
                            }}
                        >
                            Tomorrow {
                                activeReminders.filter(
                                    (r) => r.date === "Tomorrow"
                                ).length
                            }
                        </span>

                        <span
                            style={{
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "0.68rem",
                                background: "#83545c33",
                                border: "1px solid #83545c66",
                            }}
                        >
                            This Week {
                                activeReminders.filter(
                                    (r) =>
                                        r.date === "Friday" ||
                                        r.date === "Monday" ||
                                        r.date === "Next Week"
                                ).length
                            }
                        </span>
                    </div>
                </div>

                <div>
                    <p
                        style={{
                            color:
                                "var(--text-secondary)",
                            marginBottom: "12px",
                        }}
                    >
                        Categories
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap",
                        }}
                    >
                        <span
                            style={{
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "0.68rem",
                                background: "#063f4733",
                                border: "1px solid #063f4766",
                            }}
                        >
                            Work {
                                categoryCounts.Work || 0
                            }
                        </span>

                        <span
                            style={{
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "0.68rem",
                                background: "#29737633",
                                border: "1px solid #29737666",
                            }}
                        >
                            Study {
                                categoryCounts.Study || 0
                            }
                        </span>

                        <span
                            style={{
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "0.68rem",
                                background: "#5c939633",
                                border: "1px solid #5c939666",
                            }}
                        >
                            Personal {
                                categoryCounts.Personal || 0
                            }
                        </span>

                        <span
                            style={{
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "0.68rem",
                                background: "#10343933",
                                border: "1px solid #10343966",
                            }}
                        >
                            Health {
                                categoryCounts.Health || 0
                            }
                        </span>
                    </div>
                </div>

                <div>
                    <p
                        style={{
                            color:
                                "var(--text-secondary)",
                            marginBottom: "12px",
                        }}
                    >
                        Recent
                    </p>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "14px",
                        }}
                    >
                        {recentReminders.length === 0 ? (
                            <p
                                style={{
                                    color:
                                        "var(--text-secondary)",
                                    fontSize: "0.85rem",
                                }}
                            >
                                No reminders.
                            </p>
                        ) : (
                            recentReminders.map(
                                (reminder) => (
                                    <div
                                        key={reminder._id}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "6px",
                                                flexWrap:
                                                    "wrap",
                                                marginBottom:
                                                    "6px",
                                            }}
                                        >

                                            {reminder.category && (
                                                <span
                                                    style={{
                                                        padding:
                                                            "3px 8px",
                                                        borderRadius:
                                                            "999px",
                                                        fontSize:
                                                            "0.68rem",

                                                        background:
                                                            reminder.category ===
                                                                "Work"
                                                                ? "#063f4733"
                                                                : reminder.category ===
                                                                    "Study"
                                                                    ? "#29737633"
                                                                    : reminder.category ===
                                                                        "Personal"
                                                                        ? "#5c939633"
                                                                        : "#10343933",

                                                        border:
                                                            reminder.category ===
                                                                "Work"
                                                                ? "1px solid #063f4766"
                                                                : reminder.category ===
                                                                    "Study"
                                                                    ? "1px solid #29737666"
                                                                    : reminder.category ===
                                                                        "Personal"
                                                                        ? "1px solid #5c939666"
                                                                        : "1px solid #10343966",
                                                    }}
                                                >
                                                    {
                                                        reminder.category
                                                    }
                                                </span>
                                            )}
                                        </div>

                                        <div
                                            style={{
                                                fontSize:
                                                    "0.85rem",
                                            }}
                                        >
                                            {
                                                reminder.title
                                            }
                                        </div>
                                    </div>
                                )
                            )
                        )}
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}

export default ReminderOverview;