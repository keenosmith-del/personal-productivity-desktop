import { useState } from "react";
import GlassCard from "../GlassCard";

import {
    Pencil,
    Trash2,
} from "lucide-react";

import {
    updateReminder,
    deleteReminder,
} from "../../services/reminderService";

function RemindersCard({
    reminders,
    setReminders,
    onNewReminder,
    onViewReminder,
    onEditReminder,
    onClearAll,
    toast,
    setToast,
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
                            key={reminder._id}
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
                                    onClick={async (e) => {
                                        e.stopPropagation();

                                        try {
                                            const updatedReminder =
                                                await updateReminder(
                                                    reminder._id,
                                                    {
                                                        completed:
                                                            !reminder.completed,
                                                    }
                                                );

                                            setReminders((prev) =>
                                                prev.map((r) =>
                                                    r._id ===
                                                        updatedReminder._id
                                                        ? updatedReminder
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

                                        } catch (error) {
                                            console.error(error);

                                            setToast(
                                                "Failed to update reminder"
                                            );

                                            setTimeout(() => {
                                                setToast("");
                                            }, 3000);
                                        }
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

                                        {reminder.reminderDate && (
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
                                                {reminder.reminderDate}
                                            </span>
                                        )}
                                    </div>
                                    
                                    {/* created at date */}
                                    <div
                                        style={{
                                            fontSize: "0.68rem",
                                            color: "var(--text-secondary)",
                                            marginTop: "6px",
                                            opacity: 0.75,
                                        }}
                                    >
                                        Created{" "}
                                        {new Date(
                                            reminder.createdAt
                                        ).toLocaleDateString()}
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
                                    onClick={async (e) => {
                                        e.stopPropagation();

                                        try {
                                            await deleteReminder(
                                                reminder._id
                                            );

                                            setReminders((prev) =>
                                                prev.filter(
                                                    (r) =>
                                                        r._id !== reminder._id
                                                )
                                            );

                                            setToast(
                                                "Reminder deleted"
                                            );

                                            setTimeout(() => {
                                                setToast("");
                                            }, 4000);

                                        } catch (error) {
                                            console.error(error);

                                            setToast(
                                                "Failed to delete reminder"
                                            );

                                            setTimeout(() => {
                                                setToast("");
                                            }, 3000);
                                        }
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