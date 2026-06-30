import { X } from "lucide-react";
import { useState } from "react";

import {
    CheckSquare,
} from "lucide-react";

function TaskDetailsModal({
    task,
    onClose,
    onEditTask,
    onDeleteTask,
    onCompleteTask,
    onRestoreTask,
    setToast,

    dashboardMode = false,
}) {
    const formattedCreatedDate =
        task?.createdAt
            ? new Date(
                task.createdAt
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
        task?.completedDate
            ? (() => {
                const [
                    day,
                    month,
                    year,
                ] =
                    task.completedDate.split("/");

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
        task.linkedItems?.slice(0, 2) || [];

    const remainingLinks =
        (task.linkedItems?.length || 0) - 2;

    const [showDeleteConfirm,
        setShowDeleteConfirm] =
        useState(false);

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,

                background: dashboardMode
                    ? "rgba(0, 0, 0, 0.7)"
                    : "rgba(0, 0, 0, 0.35)",

                backdropFilter: dashboardMode
                    ? "blur(30px)"
                    : "blur(20px)",

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
                            Task Details
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
                            View task information
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
                                width: "72px",
                                height: "72px",

                                borderRadius: "50%",

                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",

                                background:
                                    "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",

                                border:
                                    "1px solid rgba(255,255,255,0.12)",

                                backdropFilter:
                                    "blur(24px)",

                                WebkitBackdropFilter:
                                    "blur(24px)",

                                boxShadow:
                                    "0 12px 30px rgba(0,0,0,0.18)",
                            }}
                        >
                            <CheckSquare
                                size={28}
                                strokeWidth={1.8}
                            />
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

                    {task.completedDate && (
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
                        {task.title}
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
                                    task.category === "Work"
                                        ? "#466a6d33"
                                        : task.category === "Study"
                                            ? "#536b8333"
                                            : task.category === "Personal"
                                                ? "#6f5f7a33"
                                                : "#57707a33",

                                border:
                                    task.category === "Work"
                                        ? "1px solid #466a6d66"
                                        : task.category === "Study"
                                            ? "1px solid #536b8366"
                                            : task.category === "Personal"
                                                ? "1px solid #6f5f7a66"
                                                : "1px solid #57707a66",
                            }}
                        >
                            {task.category}
                        </span>

                        <span
                            style={{
                                padding: "6px 12px",
                                minWidth: "78px",
                                textAlign: "center",

                                borderRadius: "999px",

                                fontSize: "0.7rem",

                                background:
                                    task.priority === "Low"
                                        ? "#273c4133"
                                        : task.priority === "Medium"
                                            ? "#5e687433"
                                            : "#6b544733",

                                border:
                                    task.priority === "Low"
                                        ? "1px solid #273c4166"
                                        : task.priority === "Medium"
                                            ? "1px solid #5e687466"
                                            : "1px solid #6b544766",
                            }}
                        >
                            {task.priority}
                        </span>

                        {!task.completed && (
                            <span
                                style={{
                                    padding: "6px 12px",
                                    minWidth: "78px",
                                    textAlign: "center",

                                    borderRadius: "999px",

                                    fontSize: "0.7rem",

                                    background:
                                        task.status === "Active"
                                            ? "#4d689333"
                                            : task.status === "Paused"
                                                ? "#45575b33"
                                                : "#728a6e33",

                                    border:
                                        task.status === "Active"
                                            ? "1px solid #4d689366"
                                            : task.status === "Paused"
                                                ? "1px solid #45575b66"
                                                : "1px solid #728a6e66",
                                }}
                            >
                                {task.status}
                            </span>
                        )}
                    </div>

                    {/* ASSOCIATIONS */}
                    {task.linkedItems?.length > 0 && (
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

                    {/* Completion */}

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",

                            marginBottom: "24px",
                        }}
                    >
                        {!task.completed ? (
                            <button
                                onClick={() =>
                                    onCompleteTask(task)
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
                            {task.description ||
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
                            {
                                new Date(
                                    task.dueDate
                                ).toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    }
                                )
                            }
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

                    {!task.completed ? (
                        <button
                            onClick={() => {
                                onEditTask(task);
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
                                onRestoreTask(task);
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
            {showDeleteConfirm && (
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
                            Delete task?
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
                                    onDeleteTask(task._id);

                                    setToast(
                                        "Task deleted"
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

export default TaskDetailsModal;