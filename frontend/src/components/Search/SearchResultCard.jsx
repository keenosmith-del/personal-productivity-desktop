import {
    Flag,
    Heart,
    MessageCircle,
} from "lucide-react";

import TaskModal from "../Tasks/TaskModal";
import ProjectModal from "../Projects/ProjectModal";
import GoalModal from "../Goals/GoalModal";
import ReminderModal from "../Reminders/ReminderModal";
import NoteModal from "../Notes/NoteModal";

function SearchResultCard({
    item,
    onClick,
}) {
    const typeStyles = {
        Task: {
            bg: "#4d689333",
            border: "#4d689366",
        },

        Project: {
            bg: "#5f5b8733",
            border: "#5f5b8766",
        },

        Goal: {
            bg: "#5d766233",
            border: "#5d766266",
        },

        Reminder: {
            bg: "#7a685533",
            border: "#7a685566",
        },

        Note: {
            bg: "#6d5d7333",
            border: "#6d5d7366",
        },
    };

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

        color: "var(--text-secondary)",

        transition: "all 0.2s ease",

        cursor: "default",
    };

    const typeStyle =
        typeStyles[item.type];

    return (
        <div
            onClick={onClick}
            style={{
                height: "350px",
                maxWidth: "320px",

                flexShrink: 0,

                background:
                    "rgba(255,255,255,0.025)",

                border:
                    "1px solid rgba(255,255,255,0.06)",

                borderRadius: "24px",

                padding: "18px",

                display: "flex",
                flexDirection: "column",

                cursor: "pointer",

                transition:
                    "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                    "translateY(-2px)";

                e.currentTarget.style.background =
                    "rgba(15,15,15,0.2)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                    "translateY(0)";

                e.currentTarget.style.background =
                    "rgba(255,255,255,0.025)";
            }}
        >
            {/* ROW 1 */}
            <div
                style={{
                    marginBottom: "12px",
                }}
            >
                <span
                    style={{
                        padding: "4px 10px",

                        borderRadius: "999px",

                        fontSize: "0.68rem",

                        background:
                            typeStyle.bg,

                        border:
                            `1px solid ${typeStyle.border}`,
                    }}
                >
                    {item.type}
                </span>
            </div>

            {/* ROW 2 */}
            <div
                style={{
                    display: "flex",

                    gap: "6px",

                    marginBottom: "16px",
                }}
            >
                <span
                    style={{
                        padding: "4px 10px",

                        borderRadius: "999px",

                        fontSize: "0.68rem",

                        background:
                            item.category === "Work"
                                ? "#466a6d33"
                                : item.category ===
                                    "Study"
                                    ? "#536b8333"
                                    : item.category ===
                                        "Personal"
                                        ? "#6f5f7a33"
                                        : "#57707a33",

                        border:
                            item.category === "Work"
                                ? "1px solid #466a6d66"
                                : item.category ===
                                    "Study"
                                    ? "1px solid #536b8366"
                                    : item.category ===
                                        "Personal"
                                        ? "1px solid #6f5f7a66"
                                        : "1px solid #57707a66",
                    }}
                >
                    {item.category}
                </span>

                <span
                    style={{
                        padding: "4px 10px",

                        borderRadius: "999px",

                        fontSize: "0.68rem",

                        background:
                            item.priority === "Low"
                                ? "#273c4133"
                                : item.priority ===
                                    "Medium"
                                    ? "#5e687433"
                                    : "#6b544733",

                        border:
                            item.priority === "Low"
                                ? "1px solid #273c4166"
                                : item.priority ===
                                    "Medium"
                                    ? "1px solid #5e687466"
                                    : "1px solid #6b544766",
                    }}
                >
                    {item.priority}
                </span>
            </div>

            {/* TITLE */}
            <div
                style={{
                    fontSize: "1rem",

                    fontWeight: "350",

                    letterSpacing: "-0.02em",

                    marginBottom: "10px",

                    marginTop: "5px",
                }}
            >
                {item.title}
            </div>

            {/* DESCRIPTION */}
            <div
                style={{
                    minHeight: "30px",

                    fontSize: "0.75rem",

                    opacity: 0.55,

                    lineHeight: 1.4,

                    display: "-webkit-box",

                    WebkitLineClamp: 3,

                    WebkitBoxOrient:
                        "vertical",

                    overflow: "hidden",
                }}
            >
                {item.description ||
                    "No description provided."}
            </div>

            <div
                style={{
                    flex: 1,
                }}
            />

            {/* DIVIDER */}
            <div
                style={{
                    height: "1px",

                    background:
                        "rgba(255,255,255,0.05)",

                    marginBottom: "18px",
                }}
            />

            {/* AVATARS */}

            <div
                style={{
                    display: "flex",

                    marginBottom:
                        "20px",
                }}
            >
                <div
                    style={{
                        ...linkedItemStyle,

                        marginRight: "-6px",

                        zIndex: 1,

                        opacity: 0.9,
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
                    G
                </div>

                <div
                    style={{
                        ...linkedItemStyle,

                        marginRight: "-6px",

                        zIndex: 2,
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
                    P
                </div>

                <div
                    style={{
                        ...linkedItemStyle,

                        background:
                            "rgba(255,255,255,0.03)",

                        border:
                            "1px solid rgba(255,255,255,0.08)",

                        zIndex: 3,
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
                    +2
                </div>
            </div>

            {/* DATE */}
            <div
                style={{
                    fontSize: "0.68rem",

                    opacity: 0.45,

                    marginBottom: "16px",
                }}
            >
                {item.createdAt
                    ? new Date(
                        item.createdAt
                    ).toLocaleDateString(
                        "en-US",
                        {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        }
                    )
                    : "Today"}
            </div>

            {/* ICONS */}
            <div
                style={{
                    display: "flex",

                    justifyContent:
                        "space-between",

                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        color: item.flagged
                            ? "#a45d44"
                            : "var(--text-secondary)",
                    }}
                >
                    <Flag
                        size={18}
                        strokeWidth={1}
                        fill={
                            item.flagged
                                ? "currentColor"
                                : "none"
                        }
                    />
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
                            display: "flex",

                            alignItems: "center",

                            gap: "4px",
                        }}
                    >
                        <MessageCircle
                            size={18}
                            strokeWidth={1}
                        />

                        <span
                            style={{
                                fontSize: "0.72rem",

                                opacity: 0.55,
                            }}
                        >
                            {item.commentCount ||
                                0}
                        </span>
                    </div>

                    <div
                        style={{
                            color: item.liked
                                ? "#ff6b6b"
                                : "var(--text-secondary)",
                        }}
                    >
                        <Heart
                            size={18}
                            strokeWidth={1}
                            fill={
                                item.liked
                                    ? "currentColor"
                                    : "none"
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchResultCard;