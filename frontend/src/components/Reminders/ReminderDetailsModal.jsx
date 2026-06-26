import { X } from "lucide-react";
import { useState } from "react";

function ReminderDetailsModal({
    reminder,
    onClose,
    onEditReminder,
    onDeleteReminder,
    onCompleteReminder,
    onRestoreReminder,
    setToast,
}) {
    const formattedCreatedDate =
        reminder?.createdAt
            ? new Date(
                reminder.createdAt
            ).toLocaleDateString(
                "en-US",
                {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                }
            )
            : null;

    const formattedCompletedDate =
        reminder?.comple
            ? new Date(
                reminder.createdAt
            ).toLocaleDateString(
                "en-US",
                {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                }
            )
            : null;

    const [showDeleteConfirm,
        setShowDeleteConfirm] =
        useState(false);

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,

                background: "rgba(0,0,0,0.35)",

                backdropFilter: "blur(20px)",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                zIndex: 1000,
            }}
        >
            <div
                onClick={(e) =>
                    e.stopPropagation()
                }
                style={{
                    width: "500px",

                    background:
                        "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",

                    border:
                        "1px solid rgba(255,255,255,0.10)",

                    boxShadow:
                        "0 30px 80px rgba(0,0,0,0.45)",

                    borderRadius: "36px",

                    backdropFilter:
                        "blur(30px)",

                    padding: "36px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "24px",
                    }}
                >
                    <div>
                        <h2
                            style={{
                                margin: 0,
                                fontSize: "0.95rem",
                                fontWeight: "400",
                            }}
                        >
                            Reminder Details
                        </h2>

                        <p
                            style={{
                                marginTop: "4px",
                                marginBottom: 0,
                                fontSize: "0.8rem",
                                fontWeight: "300",
                                opacity: 0.55,
                            }}
                        >
                            View reminder information
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

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* Avatar */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",

                            marginBottom: "18px",
                        }}
                    >
                        <div
                            style={{
                                width: "88px",
                                height: "88px",

                                borderRadius: "50%",

                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",

                                background:
                                    "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",

                                border:
                                    "1px solid rgba(255,255,255,0.12)",

                                fontSize: "2rem",

                                fontWeight: "300",
                            }}
                        >
                            ✓
                        </div>
                    </div>

                    {formattedCreatedDate && (
                        <p
                            style={{
                                marginTop: "12px",

                                marginBottom: "5px",

                                textAlign: "center",

                                fontSize: "0.72rem",

                                fontWeight: "300",

                                opacity: 0.4,
                            }}
                        >
                            Created on {formattedCreatedDate}
                        </p>
                    )}

                    {reminder.completedDate && (
                        <p
                            style={{
                                marginTop: "2px",

                                marginBottom: "12px",

                                textAlign: "center",

                                fontSize: "0.72rem",

                                fontWeight: "300",

                                opacity: 0.4,
                            }}
                        >
                            Completed on{" "}
                            {reminder.completedDate}
                        </p>
                    )}

                    {/* Title */}
                    <h3
                        style={{
                            textAlign: "center",

                            fontWeight: "300",

                            fontSize: "1.05rem",

                            letterSpacing: "-0.02em",

                            margin: 0,

                            marginBottom: "14px",
                        }}
                    >
                        {reminder.title}
                    </h3>

                    {/* Chips */}
                    <div
                        style={{
                            display: "flex",

                            justifyContent: "center",

                            gap: "8px",

                            flexWrap: "wrap",

                            marginBottom: "22px",

                            fontWeight: "300",
                        }}
                    >
                        <span
                            style={{
                                padding: "6px 12px",
                                minWidth: "78px",
                                textAlign: "center",

                                borderRadius: "999px",

                                fontSize: "0.7rem",

                                background:
                                    reminder.category === "Work"
                                        ? "#466a6d33"
                                        : reminder.category === "Study"
                                            ? "#536b8333"
                                            : reminder.category === "Personal"
                                                ? "#6f5f7a33"
                                                : "#57707a33",

                                border:
                                    reminder.category === "Work"
                                        ? "1px solid #466a6d66"
                                        : reminder.category === "Study"
                                            ? "1px solid #536b8366"
                                            : reminder.category === "Personal"
                                                ? "1px solid #6f5f7a66"
                                                : "1px solid #57707a66",
                            }}
                        >
                            {reminder.category}
                        </span>

                        <span
                            style={{
                                padding: "6px 12px",
                                minWidth: "78px",
                                textAlign: "center",

                                borderRadius: "999px",

                                fontSize: "0.7rem",

                                background:
                                    reminder.priority === "Low"
                                        ? "#273c4133"
                                        : reminder.priority === "Medium"
                                            ? "#5e687433"
                                            : "#6b544733",

                                border:
                                    reminder.priority === "Low"
                                        ? "1px solid #273c4166"
                                        : reminder.priority === "Medium"
                                            ? "1px solid #5e687466"
                                            : "1px solid #6b544766",
                            }}
                        >
                            {reminder.priority}
                        </span>

                        {!reminder.completed && (
                            <span
                                style={{
                                    padding: "6px 12px",
                                    minWidth: "78px",
                                    textAlign: "center",

                                    borderRadius: "999px",

                                    fontSize: "0.7rem",

                                    background:
                                        reminder.status === "Active"
                                            ? "#4d689333"
                                            : reminder.status === "Paused"
                                                ? "#45575b33"
                                                : "#728a6e33",

                                    border:
                                        reminder.status === "Active"
                                            ? "1px solid #4d689366"
                                            : reminder.status === "Paused"
                                                ? "1px solid #45575b66"
                                                : "1px solid #728a6e66",
                                }}
                            >
                                {reminder.status}
                            </span>
                        )}
                    </div>

                    {/* DIVIDER */}
                    <div
                        style={{
                            height: "1px",

                            background:
                                "rgba(255,255,255,0.06)",

                            marginBottom: "20px",
                        }}
                    />

                    {/* Completion */}

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",

                            marginBottom: "24px",
                        }}
                    >
                        {!reminder.completed ? (
                            <button
                                onClick={() =>
                                    onCompleteReminder(reminder)
                                }
                                style={{
                                    padding: "10px 18px",

                                    borderRadius: "999px",

                                    background:
                                        "rgba(114,138,110,0.12)",

                                    border:
                                        "1px solid rgba(114,138,110,0.25)",

                                    color: "#9bc091",

                                    fontSize: "0.8rem",

                                    fontWeight: "300",

                                    cursor: "pointer",

                                    transition:
                                        "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(-1px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(0)";
                                }}
                            >
                                Mark Complete
                            </button>
                        ) : (
                            <button
                                style={{
                                    padding: "10px 18px",

                                    borderRadius: "999px",

                                    background: "rgba(114,138,110,0.12)",

                                    border:
                                        "1px solid rgba(114,138,110,0.25)",

                                    color: "#9bc091",

                                    fontSize: "0.8rem",

                                    fontWeight: "300",

                                    transition: "all 0.2s ease",
                                }}
                            >
                                ✓ Completed
                            </button>
                        )}
                    </div>

                    {/* DIVIDER */}
                    <div
                        style={{
                            height: "1px",

                            background:
                                "rgba(255,255,255,0.06)",

                            marginBottom: "20px",
                        }}
                    />

                    {/* Description */}

                    <div
                        style={{
                            marginBottom: "20px",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "0.8rem",

                                opacity: 0.45,

                                fontWeight: "300",

                                marginBottom: "8px",
                            }}
                        >
                            Description
                        </p>

                        <p
                            style={{
                                fontSize: "0.85rem",

                                fontWeight: "300",

                                lineHeight: 1.6,

                                margin: 0,
                            }}
                        >
                            {reminder.description ||
                                "No description provided."}
                        </p>
                    </div>

                    {/* Due Date */}

                    <div>
                        <p
                            style={{
                                fontSize: "0.8rem",

                                opacity: 0.45,

                                fontWeight: "300",

                                marginBottom: "8px",
                            }}
                        >
                            Due Date
                        </p>

                        <p
                            style={{
                                fontSize: "0.85rem",

                                fontWeight: "300",

                                margin: 0,
                            }}
                        >
                            {reminder.dueDate
                                ? new Date(
                                    reminder.dueDate
                                ).toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    }
                                )
                                : "No due date"}
                        </p>
                    </div>
                </div>


                <div
                    style={{
                        display: "flex",

                        justifyContent: "flex-end",

                        gap: "10px",

                        marginTop: "24px",
                    }}
                >
                    <button
                        onClick={() =>
                            setShowDeleteConfirm(true)
                        }
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

                            transition: "all 0.2s ease",
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
                        Delete
                    </button>

                    {!reminder.completed ? (
                        <button
                            onClick={() => {
                                onEditReminder(reminder);
                                onClose();
                            }}
                            style={{
                                padding: "11px 18px",

                                borderRadius: "999px",

                                background:
                                    "rgba(255,255,255,0.08)",

                                border:
                                    "1px solid rgba(255,255,255,0.10)",

                                color:
                                    "var(--text-primary)",

                                fontSize: "0.8rem",

                                fontWeight: "300",

                                cursor: "pointer",

                                transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.14)";

                                e.currentTarget.style.transform =
                                    "translateY(-1px)";

                                e.currentTarget.style.border =
                                    "1px solid rgba(255,255,255,0.18)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.08)";

                                e.currentTarget.style.transform =
                                    "translateY(0)";

                                e.currentTarget.style.border =
                                    "1px solid rgba(255,255,255,0.10)";
                            }}
                        >
                            Edit
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                onRestoreReminder(reminder);
                            }}
                            style={{
                                padding: "11px 18px",

                                borderRadius: "999px",

                                background:
                                    "rgba(255,255,255,0.08)",

                                border:
                                    "1px solid rgba(255,255,255,0.10)",

                                color:
                                    "var(--text-primary)",

                                fontSize: "0.8rem",

                                fontWeight: "300",

                                cursor: "pointer",

                                transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.14)";

                                e.currentTarget.style.transform =
                                    "translateY(-1px)";

                                e.currentTarget.style.border =
                                    "1px solid rgba(255,255,255,0.18)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.08)";

                                e.currentTarget.style.transform =
                                    "translateY(0)";

                                e.currentTarget.style.border =
                                    "1px solid rgba(255,255,255,0.10)";
                            }}
                        >
                            Restore
                        </button>
                    )}
                </div>
            </div>
            {
                showDeleteConfirm && (
                    <div
                        onClick={() =>
                            setShowDeleteConfirm(false)
                        }
                        style={{
                            position: "fixed",
                            inset: 0,

                            background:
                                "rgba(0,0,0,0.8)",

                            backdropFilter:
                                "blur(20px)",

                            display: "flex",

                            justifyContent:
                                "center",

                            alignItems:
                                "center",

                            zIndex: 3000,
                        }}
                    >
                        <div
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                            style={{
                                width: "400px",

                                padding: "28px",

                                borderRadius: "24px",

                                background:
                                    "rgba(20,20,20,0.90)",

                                border:
                                    "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            <h3
                                style={{
                                    marginBottom: "12px",
                                    fontWeight: "400",
                                    fontSize: "0.95rem",
                                }}
                            >
                                Delete reminder?
                            </h3>

                            <p
                                style={{
                                    color: "var(--text-secondary)",

                                    marginBottom: "24px",

                                    fontSize: "0.8rem",

                                    fontWeight: "300",

                                    opacity: 0.55,
                                }}
                            >
                                This action cannot be undone.
                            </p>

                            <div
                                style={{
                                    display: "flex",

                                    justifyContent:
                                        "flex-end",

                                    gap: "12px",
                                }}
                            >
                                <button
                                    onClick={() =>
                                        setShowDeleteConfirm(false)
                                    }
                                    style={{
                                        padding: "11px 18px",

                                        borderRadius: "999px",

                                        background:
                                            "rgba(255,255,255,0.08)",

                                        border:
                                            "1px solid rgba(255,255,255,0.10)",

                                        color:
                                            "var(--text-primary)",

                                        fontSize: "0.8rem",

                                        fontWeight: "300",

                                        cursor: "pointer",

                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                            "rgba(255,255,255,0.14)";

                                        e.currentTarget.style.transform =
                                            "translateY(-1px)";

                                        e.currentTarget.style.border =
                                            "1px solid rgba(255,255,255,0.18)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                            "rgba(255,255,255,0.08)";

                                        e.currentTarget.style.transform =
                                            "translateY(0)";

                                        e.currentTarget.style.border =
                                            "1px solid rgba(255,255,255,0.10)";
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => {
                                        onDeleteReminder(reminder._id);

                                        setToast(
                                            "Reminder deleted"
                                        );

                                        setTimeout(() => {
                                            setToast("");
                                        }, 4000);

                                        setShowDeleteConfirm(false);

                                        onClose();
                                    }}
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

                                        transition: "all 0.2s ease",
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
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default ReminderDetailsModal;