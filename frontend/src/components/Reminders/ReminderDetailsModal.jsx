// view modal

import { useState } from "react";

import DeleteConfirmModal from "../DeleteConfirmModal";

import {
    Bell,
    Pause,
    Shield,
    LoaderCircle,
    CircleAlert,
    X,
    Check,
    Ellipsis,
} from "lucide-react";

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
        reminder?.completedDate
            ? (() => {
                const [
                    day,
                    month,
                    year,
                ] =
                    reminder.completedDate.split("/");

                return new Date(
                    year,
                    month - 1,
                    day
                ).toLocaleDateString(
                    "en-US",
                    {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    }
                );
            })()
            : null;

    const linkedItemStyle = {
        width: "35px",
        height: "35px",

        borderRadius: "50%",

        background:
            "linear-gradient(135deg, rgba(87,112,122,0.35), rgba(39,60,65,0.15))",

        border:
            "1px solid rgba(255,255,255,0.06)",

        backdropFilter: "blur(20px)",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        fontSize: "0.68rem",

        color:
            "var(--text-secondary)",

        transition:
            "all 0.2s ease",
    };

    const visibleLinks =
        reminder.linkedItems?.slice(0, 2) || [];

    const remainingLinks =
        (reminder.linkedItems?.length || 0) - 2;

    const [showDeleteConfirm,
        setShowDeleteConfirm] =
        useState(false);

    // THESE ARE THE CORRECT COLORS AND ICONS 
    const statusConfig = {
        Active: {
            icon: Shield,
            label: "Active",

            background: "#4d689333",
            border: "#4d689366",
            color: "#8faec0",
        },

        "In Progress": {
            icon: LoaderCircle,
            label: "In Progress",

            background: "#5d766233",
            border: "#5d766266",
            color: "#a8bf9f",
        },

        // paused takes priority over overdue
        Paused: {
            icon: Pause,
            label: "Paused",

            background: "#45575b33",
            border: "#45575b66",
            color: "#9ca9ad",
        },

        // overdue is system generated 
        Overdue: {
            icon: CircleAlert,
            label: "Overdue",

            background: "#8b5a5a33",
            border: "#8b5a5a66",
            color: "#c79a9a",
        },

        // complete or completed? needs to be consistent
        Complete: {
            icon: Check,
            label: "Complete",

            background: "#728a6e33",
            border: "#728a6e66",
            color: "#9bc091",
        },
    };

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(reminder.dueDate);

    dueDate.setHours(0, 0, 0, 0);

    const isOverdue =
        dueDate < today;

    const displayStatus =
        reminder.completed
            ? "Complete"
            : reminder.status === "Paused"
                ? "Paused"
                : isOverdue
                    ? "Overdue"
                    : reminder.status;

    const currentStatus =
        statusConfig[displayStatus];

    const StatusIcon =
        currentStatus.icon;

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,

                background: "rgba(0, 0, 0, 0.3)",

                backdropFilter: "blur(20px)",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                zIndex: 1000,
            }}
        >
            {!showDeleteConfirm && (
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

                        {/* meatball and x pill */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",

                                gap: "6px",

                                padding: "2px",

                                borderRadius: "999px",

                                background: "rgb(36, 36, 36)",

                                backdropFilter: "blur(28px)",

                                boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                            }}
                        >
                            {/* meatball */}
                            <div
                                style={{
                                    position: "relative",
                                }}
                            >
                                <button
                                    style={{
                                        width: "32px",

                                        height: "32px",

                                        borderRadius: "999px",

                                        border: "none",

                                        background: "transparent",

                                        color: "var(--text-secondary)",

                                        display: "flex",

                                        alignItems: "center",

                                        justifyContent: "center",

                                        cursor: "pointer",

                                        transition:
                                            "all 260ms cubic-bezier(0.22, 1, 0.36, 1)",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform =
                                            "translateY(-1px)";

                                        e.currentTarget.style.color =
                                            "var(--text-primary)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform =
                                            "translateY(0)";

                                        e.currentTarget.style.color =
                                            "var(--text-secondary)";
                                    }}
                                >
                                    <Ellipsis
                                        size={16}
                                    />
                                </button>
                            </div>

                            {/* close x */}
                            <div
                                style={{
                                    position: "relative",
                                }}
                            >
                                <button
                                    onClick={onClose}
                                    style={{
                                        width: "32px",
                                        height: "32px",

                                        borderRadius: "999px",

                                        border: "rgb(33, 33, 33)",

                                        background:
                                            "rgb(33, 33, 33)",

                                        color:
                                            "var(--text-secondary)",

                                        cursor: "pointer",

                                        fontSize: "0.85rem",

                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                            "rgb(33, 33, 33)";

                                        e.currentTarget.style.transform =
                                            "translateY(-1px)";

                                        e.currentTarget.style.color =
                                            "var(--text-primary)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                            "rgb(33, 33, 33)";

                                        e.currentTarget.style.transform =
                                            "translateY(0)";

                                        e.currentTarget.style.color =
                                            "var(--text-secondary)";
                                    }}
                                >
                                    x
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {/* icon */}

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: "20px",
                                opacity: 0.55,
                            }}
                        >
                            <Bell
                                size={28}
                                strokeWidth={1.8}
                            />
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
                                {formattedCompletedDate}
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

                            {/* mark completed */}
                            {!reminder.completed ? (
                                <button
                                    onClick={() =>
                                        onCompleteReminder(reminder)
                                    }
                                    style={{
                                        padding: "6px 12px",
                                        minWidth: "78px",
                                        textAlign: "center",

                                        borderRadius: "999px",

                                        fontSize: "0.7rem",

                                        background: "rgba(114,138,110,0.12)",

                                        border: "1px solid rgba(114,138,110,0.25)",

                                        color: "#9bc091",

                                        cursor: "pointer",

                                        transition: "all 0.2s ease",
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
                                        padding: "6px 12px",
                                        minWidth: "78px",
                                        textAlign: "center",

                                        borderRadius: "999px",

                                        fontSize: "0.7rem",

                                        background: "rgba(114,138,110,0.12)",

                                        border: "1px solid rgba(114,138,110,0.25)",

                                        color: "#9bc091",

                                        cursor: "pointer",

                                        transition: "all 0.2s ease",
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
                                    ✓ Completed
                                </button>
                            )}
                        </div>

                        {/* ASSOCIATIONS */}
                        {reminder.linkedItems?.length > 0 && (
                            <>
                                <div
                                    style={{
                                        display: "flex",

                                        justifyContent: "center",

                                        marginBottom: "20px",
                                    }}
                                >
                                    {visibleLinks.map(
                                        (item, index) => (
                                            <div
                                                key={item}
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
                                                {item}
                                            </div>
                                        )
                                    )}

                                    {remainingLinks > 0 && (
                                        <div
                                            style={{
                                                ...linkedItemStyle,

                                                background:
                                                    "rgba(255,255,255,0.03)",

                                                border:
                                                    "1px solid rgba(255,255,255,0.08)",

                                                zIndex: 10,
                                            }}
                                        >
                                            +{remainingLinks}
                                        </div>
                                    )}
                                </div>

                                <div
                                    style={{
                                        height: "1px",

                                        background:
                                            "rgba(255,255,255,0.06)",

                                        marginBottom: "20px",
                                    }}
                                />
                            </>
                        )}

                        {/* STATUS */}

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",

                                marginBottom: "24px",
                            }}
                        >
                            <button
                                style={{
                                    padding: "10px 18px",

                                    borderRadius: "999px",

                                    background:
                                        currentStatus.background,

                                    border:
                                        `1px solid ${currentStatus.border}`,

                                    color:
                                        currentStatus.color,

                                    fontSize: "0.8rem",

                                    fontWeight: "300",

                                    cursor: "pointer",

                                    transition:
                                        "all 0.2s ease",

                                    display: "flex",

                                    alignItems: "center",

                                    gap: "8px",
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
                                <StatusIcon
                                    size={14}
                                    strokeWidth={1.8}
                                />

                                {currentStatus.label}
                            </button>
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
                                    // since onclose removed, we need to refresh details on detailsmodal or indtead return to main page NOT back to detailsmodal
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
            )}
            {showDeleteConfirm && (
                <DeleteConfirmModal
                    title="Delete reminder?"
                    message="This action cannot be undone."

                    onCancel={() => {
                        setShowDeleteConfirm(false);
                    }}

                    onConfirm={() => {
                        onDeleteReminder(reminder._id);

                        setShowDeleteConfirm(false);

                        onClose();
                    }}
                />
            )}
        </div>
    );
}

export default ReminderDetailsModal;