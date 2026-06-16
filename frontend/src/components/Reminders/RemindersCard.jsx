import { useState } from "react";
import GlassCard from "../GlassCard";
import {
    Pencil,
    Trash2,
} from "lucide-react";

function RemindersCard({
    reminders,
    setReminders,
    onNewReminder,
    onViewReminder,
    onEditReminder,
    onClearAll,
    toast,
    setToast,
    setLastCompletedReminder,
    setLastDeletedReminder,
    completionTimeout,
    setCompletionTimeout,
}) {
    return (
        <GlassCard minHeight="520px">
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

                <div
                    style={{
                        display: "flex",
                        gap: "8px",
                    }}
                >
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

                    <button
                        onClick={onClearAll}
                        disabled={reminders.length === 0}
                        style={{
                            background: "transparent",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "999px",
                            padding: "8px 14px",

                            color:
                                reminders.length === 0
                                    ? "rgba(255,255,255,0.25)"
                                    : "var(--text-secondary)",

                            fontSize: "0.8rem",
                            fontWeight: "300",

                            cursor:
                                reminders.length === 0
                                    ? "not-allowed"
                                    : "pointer",

                            opacity:
                                reminders.length === 0
                                    ? 0.5
                                    : 1,
                        }}
                        onMouseEnter={(e) => {
                            if (reminders.length == 0) return;

                            e.currentTarget.style.color =
                                "var(--text-primary)";

                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.04)";
                        }}
                        onMouseLeave={(e) => {
                            if (reminders.length === 0) return;

                            e.currentTarget.style.color =
                                "var(--text-secondary)";

                            e.currentTarget.style.background =
                                "transparent";
                        }}
                    >
                        Clear All
                    </button>
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",

                    maxHeight: "420px",
                    overflowY: "auto",
                }}
            >
                {reminders.map((reminder) => {
                    const isCompleted =
                        reminder.completed;

                    const isPending =
                        reminder.pendingCompletion;

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

                                transition: "all 0.35s ease",

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

                                        setReminders((prev) =>
                                            prev.map((r) =>
                                                r.id === reminder.id
                                                    ? {
                                                        ...r,
                                                        pendingCompletion: true,
                                                    }
                                                    : r
                                            )
                                        );

                                        setToast(
                                            reminder.completed
                                                ? "Reminder restored"
                                                : "Reminder completed"
                                        );

                                        setTimeout(() => {
                                            setToast("");
                                        }, 3000);

                                        setTimeout(() => {
                                            setReminders((prev) =>
                                                prev.map((r) =>
                                                    r.id === reminder.id
                                                        ? {
                                                            ...r,
                                                            completed: !r.completed,
                                                            pendingCompletion: false,
                                                        }
                                                        : r
                                                )
                                            );
                                        }, 350);
                                    }}
                                    style={{
                                        cursor: "pointer",
                                        width: "18px",
                                        height: "18px",

                                        borderRadius: "50%",

                                        border: "1.5px solid rgba(245,245,245,0.7)",

                                        background:
                                            isCompleted || isPending
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
                                    {(isCompleted || isPending) && "✓"}
                                </div>

                                <div>
                                    <div
                                        style={{
                                            fontWeight: "300",

                                            fontSize: "0.9rem",

                                            opacity:
                                                isCompleted || isPending
                                                    ? 0.55
                                                    : 1,

                                            letterSpacing: "-0.015em",

                                            marginBottom: "6px",
                                        }}
                                    >
                                        {reminder.title}
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",

                                            gap: "6px",

                                            flexWrap: "wrap",
                                        }}
                                    >

                                        {reminder.category && (
                                            <span
                                                style={{
                                                    padding: "3px 8px",

                                                    borderRadius: "999px",

                                                    fontSize: "0.68rem",

                                                    background:
                                                        reminder.category === "Work"
                                                            ? "#063f4733"
                                                            : reminder.category ===
                                                                "Study"
                                                                ? "#29737633"
                                                                : reminder.category ===
                                                                    "Personal"
                                                                    ? "#5c939633"
                                                                    : "#10343933",

                                                    border:
                                                        reminder.category === "Work"
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
                                                {reminder.category}
                                            </span>
                                        )}

                                        {reminder.priority && (
                                            <span
                                                style={{
                                                    padding: "3px 8px",
                                                    borderRadius: "999px",
                                                    fontSize: "0.68rem",

                                                    background:
                                                        reminder.priority === "High"
                                                            ? "#ab313033"
                                                            : reminder.priority === "Medium"
                                                                ? "#62929e33"
                                                                : "#ffdb5833",

                                                    border:
                                                        reminder.priority === "High"
                                                            ? "1px solid #ab313066"
                                                            : reminder.priority === "Medium"
                                                                ? "1px solid #62929e66"
                                                                : "1px solid #ffdb5866",
                                                }}
                                            >
                                                {reminder.priority}
                                            </span>
                                        )}
                                        {reminder.linkedType && (
                                            <span
                                                style={{
                                                    padding: "3px 8px",

                                                    borderRadius: "999px",

                                                    fontSize: "0.68rem",

                                                    background: "#4d689333",

                                                    border: "1px solid #4d689366",
                                                }}
                                            >
                                                {reminder.linkedType}
                                            </span>
                                        )}
                                        {reminder.date && (
                                            <span
                                                style={{
                                                    padding: "3px 8px",

                                                    borderRadius: "999px",

                                                    fontSize: "0.68rem",

                                                    background: "#4d689333",

                                                    border:
                                                        "1px solid #4d689366",
                                                }}
                                            >
                                                {reminder.date}
                                            </span>
                                        )}
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
                                        transition: "0.2s ease",
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

                                        setLastDeletedReminder(reminder);

                                        setReminders((prev) =>
                                            prev.filter(
                                                (r) => r.id !== reminder.id
                                            )
                                        );

                                        setToast("Reminder deleted");

                                        setTimeout(() => {
                                            setToast("");
                                        }, 4000);
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