import {
    CheckSquare,
    FolderKanban,
    Target,
    Bell,
} from "lucide-react";

function CalendarModal({
    selectedDate,
    events = [],
    onClose,
}) {
    const eventCounts = events.reduce(
        (acc, event) => {
            acc[event.type] =
                (acc[event.type] || 0) + 1;

            return acc;
        },
        {}
    );

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

    const chipStyles = {
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
    };

    const date = new Date(
        selectedDate.year,
        selectedDate.month,
        selectedDate.day
    );

    const eventIcons = {
        task: CheckSquare,
        project: FolderKanban,
        goal: Target,
        reminder: Bell,
    };

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,

                background:
                    "rgba(0,0,0,0.55)",

                backdropFilter:
                    "blur(14px)",

                display: "flex",

                justifyContent:
                    "center",

                alignItems: "center",

                zIndex: 2000,
            }}
        >
            <div
                onClick={(e) =>
                    e.stopPropagation()
                }
                style={{
                    width: "520px",

                    maxHeight: "80vh",

                    overflowY: "auto",

                    background:
                        "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",

                    border:
                        "1px solid rgba(255,255,255,0.10)",

                    borderRadius: "36px",

                    backdropFilter: "blur(30px)",

                    boxShadow:
                        "0 30px 80px rgba(0,0,0,0.45)",

                    padding: "36px",
                }}
            >
                {/* HEADER */}

                <div
                    style={{
                        display: "flex",

                        justifyContent:
                            "space-between",

                        alignItems: "center",

                        marginBottom: "32px",
                    }}
                >
                    <div>
                        <h2
                            style={{
                                margin: 0,

                                fontWeight: "350",

                                letterSpacing:
                                    "-0.03em",
                            }}
                        >
                            Calendar Details
                        </h2>

                        <p
                            style={{
                                marginTop: "8px",

                                fontSize: "0.82rem",

                                opacity: 0.55,
                            }}
                        >
                            View everything
                            scheduled for this
                            day.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        style={{
                            width: "32px",
                            height: "32px",

                            borderRadius: "999px",

                            border:
                                "1px solid rgba(255,255,255,0.08)",

                            background:
                                "rgba(255,255,255,0.04)",

                            color:
                                "var(--text-secondary)",

                            cursor: "pointer",

                            fontSize: "0.85rem",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.10)";

                            e.currentTarget.style.transform =
                                "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.04)";

                            e.currentTarget.style.transform =
                                "scale(1)";
                        }}
                    >
                        x
                    </button>
                </div>

                {/* DATE */}

                <div
                    style={{
                        textAlign: "center",

                        marginBottom: "28px",
                    }}
                >
                    <div
                        style={{
                            fontSize: "2rem",

                            fontWeight: "300",

                            letterSpacing:
                                "-0.04em",
                        }}
                    >
                        {date.toLocaleDateString(
                            "en-US",
                            {
                                month: "long",
                                day: "numeric",
                            }
                        )}
                    </div>

                    <div
                        style={{
                            fontSize: "0.9rem",

                            opacity: 0.55,

                            marginTop: "4px",
                        }}
                    >
                        {date.toLocaleDateString(
                            "en-US",
                            {
                                weekday: "long",
                            }
                        )}
                    </div>

                    <div
                        style={{
                            fontSize: "0.75rem",

                            opacity: 0.4,

                            marginTop: "10px",
                        }}
                    >
                        {events.length} event
                        {events.length !== 1
                            ? "s"
                            : ""}{" "}
                        scheduled
                    </div>
                </div>

                {/* CHIPS */}

                <div
                    style={{
                        display: "flex",

                        gap: "8px",

                        flexWrap: "wrap",

                        marginBottom: "24px",
                    }}
                >
                    {events.length === 0 ? (
                        <span
                            style={{
                                padding: "4px 10px",

                                borderRadius:
                                    "999px",

                                fontSize: "0.68rem",

                                background:
                                    "rgba(255,255,255,0.03)",

                                border:
                                    "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            Empty Day
                        </span>
                    ) : (
                        Object.entries(
                            eventCounts
                        ).map(
                            ([type, count]) => (
                                <span
                                    key={type}
                                    style={{
                                        padding:
                                            "4px 10px",

                                        borderRadius:
                                            "999px",

                                        fontSize:
                                            "0.68rem",

                                        background:
                                            chipStyles[
                                                type
                                            ]?.bg,

                                        border: `1px solid ${chipStyles[
                                            type
                                        ]?.border
                                            }`,
                                    }}
                                >
                                    {count}{" "}
                                    {type.charAt(0).toUpperCase() +
                                        type.slice(1)}
                                    {count > 1
                                        ? "s"
                                        : ""}
                                </span>
                            )
                        )
                    )}
                </div>

                {/* DIVIDER */}

                <div
                    style={{
                        height: "1px",

                        background:
                            "rgba(255,255,255,0.05)",

                        marginBottom: "24px",
                    }}
                />

                {/* STACKED CIRCLES */}

                <div
                    style={{
                        display: "flex",

                        marginBottom: "24px",
                    }}
                >
                    {Object.keys(
                        eventCounts
                    )
                        .slice(0, 3)
                        .map((type, index) => (
                            <div
                                key={type}
                                style={{
                                    ...linkedItemStyle,

                                    marginRight: "-6px",

                                    zIndex: index + 1,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(-1px) scale(1.08)";

                                    e.currentTarget.style.border =
                                        "1px solid rgba(255,255,255,0.12)";

                                    e.currentTarget.style.boxShadow =
                                        "0 8px 20px rgba(0,0,0,0.25)";

                                    e.currentTarget.style.color =
                                        "var(--text-primary)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(0) scale(1)";

                                    e.currentTarget.style.border =
                                        "1px solid rgba(255,255,255,0.06)";

                                    e.currentTarget.style.boxShadow =
                                        "none";

                                    e.currentTarget.style.color =
                                        "var(--text-secondary)";
                                }}
                            >
                                {type
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>
                        ))}
                </div>

                {/* EVENTS */}

                <div
                    style={{
                        marginBottom: "32px",
                    }}
                >
                    <div
                        style={{
                            fontSize: "0.82rem",

                            opacity: 0.5,

                            marginBottom: "12px",
                        }}
                    >
                        Events
                    </div>

                    {events.length === 0 ? (
                        <div
                            style={{
                                fontSize: "0.8rem",

                                opacity: 0.45,

                                lineHeight: 1.6,
                            }}
                        >
                            No events scheduled.

                            <br />
                            <br />

                            Tasks, reminders,
                            goals and projects
                            assigned to this date
                            will appear here.
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "flex",

                                flexDirection:
                                    "column",

                                gap: "10px",
                            }}
                        >
                            {events.map((event) => {
                                const chipStyle =
                                    chipStyles[event.type] ||
                                    chipStyles.task;

                                const secondaryLabel =
                                    event.priority ||
                                    event.category ||
                                    "Scheduled";

                                const Icon =
                                    eventIcons[event.type];

                                return (
                                    <div
                                        key={event.title}
                                        style={{
                                            background:
                                                "rgba(255,255,255,0.025)",

                                            border:
                                                "1px solid rgba(255,255,255,0.06)",

                                            borderRadius: "20px",

                                            padding: "16px",

                                            transition:
                                                "all 0.2s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform =
                                                "translateY(-1px)";

                                            e.currentTarget.style.background =
                                                "rgba(255,255,255,0.035)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform =
                                                "translateY(0)";

                                            e.currentTarget.style.background =
                                                "rgba(255,255,255,0.025)";
                                        }}
                                    >
                                        {/* CHIPS */}

                                        <div
                                            style={{
                                                display: "flex",

                                                gap: "6px",

                                                marginBottom: "14px",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    padding: "4px 10px",

                                                    borderRadius:
                                                        "999px",

                                                    fontSize: "0.68rem",

                                                    textTransform:
                                                        "capitalize",

                                                    background:
                                                        chipStyle.bg,

                                                    border: `1px solid ${chipStyle.border}`,
                                                }}
                                            >
                                                {event.type}
                                            </span>

                                            <span
                                                style={{
                                                    padding: "4px 10px",

                                                    borderRadius:
                                                        "999px",

                                                    fontSize: "0.68rem",

                                                    background:
                                                        "rgba(255,255,255,0.04)",

                                                    border:
                                                        "1px solid rgba(255,255,255,0.08)",

                                                    opacity: 0.8,
                                                }}
                                            >
                                                {secondaryLabel}
                                            </span>
                                        </div>

                                        {/* TITLE */}

                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: "28px",
                                                    height: "28px",

                                                    borderRadius: "50%",

                                                    background:
                                                        chipStyle.bg,

                                                    border: `1px solid ${chipStyle.border}`,

                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",

                                                    flexShrink: 0,
                                                }}
                                            >
                                                <Icon size={14} />
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: "0.95rem",

                                                    fontWeight: "350",

                                                    letterSpacing: "-0.02em",
                                                }}
                                            >
                                                {event.title}
                                            </div>
                                        </div>

                                        {/* DESCRIPTION */}

                                        <div
                                            style={{
                                                fontSize: "0.74rem",

                                                opacity: 0.5,

                                                lineHeight: 1.5,

                                                minHeight: "22px",
                                            }}
                                        >
                                            {event.type === "task" &&
                                                "Scheduled task"}

                                            {event.type === "project" &&
                                                "Project milestone"}

                                            {event.type === "goal" &&
                                                "Goal target date"}

                                            {event.type ===
                                                "reminder" &&
                                                "Reminder notification"}
                                        </div>

                                        {/* DIVIDER */}

                                        <div
                                            style={{
                                                height: "1px",

                                                background:
                                                    "rgba(255,255,255,0.05)",

                                                margin:
                                                    "16px 0 12px",
                                            }}
                                        />

                                        {/* FOOTER */}

                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* BUTTON */}

                <div
                    style={{
                        display: "flex",

                        justifyContent:
                            "flex-end",
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            padding: "11px 18px",

                            borderRadius: "999px",

                            background:
                                "rgba(255,77,77,0.12)",

                            border:
                                "1px solid rgba(255,77,77,0.25)",

                            color: "var(--danger)",

                            fontSize: "0.8rem",

                            fontWeight: "300",

                            cursor: "pointer",

                            transition:
                                "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,77,77,0.20)";

                            e.currentTarget.style.transform =
                                "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,77,77,0.12)";

                            e.currentTarget.style.transform =
                                "translateY(0)";
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CalendarModal;