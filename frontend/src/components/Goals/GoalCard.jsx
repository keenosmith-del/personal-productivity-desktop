import {
    Ellipsis,
    Flag,
    Heart,
    MessageCircle,
} from "lucide-react";

import {
    useEffect,
    useRef,
} from "react";

function GoalCard({
    goal,
    onClick,

    openGoalMenu,
    setOpenGoalMenu,

    onView,
    onEdit,

    onDelete,

    onComplete,
    onRestore,

    onToggleFlag,
    onToggleLike,
    onAddComment,
}) {
    const menuItemStyle = {
        width: "100%",

        padding: "10px 12px",

        background: "transparent",

        border: "none",

        borderRadius: "10px",

        color: "var(--text-primary)",

        textAlign: "left",

        fontSize: "0.8rem",

        fontWeight: "300",

        cursor: "pointer",

        transition: "all 0.2s ease",
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

    const menuRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(
                    event.target
                )
            ) {
                setOpenGoalMenu(null);
            }
        };

        document.addEventListener(
            "click",
            handleOutsideClick
        );

        return () => {
            document.removeEventListener(
                "click",
                handleOutsideClick
            );
        };
    }, [setOpenGoalMenu]);

    const visibleLinks =
        goal.linkedItems?.slice(0, 3) || [];

    const remainingLinks =
        (goal.linkedItems?.length || 0) - 3;

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const dueDate =
        goal.dueDate
            ? new Date(goal.dueDate)
            : null;

    if (dueDate) {
        dueDate.setHours(0, 0, 0, 0);
    }

    const isOverdue =
        dueDate &&
        dueDate < today;

    const displayStatus =
        goal.completed
            ? "Complete"
            : goal.status === "Paused"
                ? "Paused"
                : isOverdue
                    ? "Overdue"
                    : goal.status;

    return (
        <div
            onClick={() =>
                onClick(goal)
            }
            style={{
                height: "350px",
                maxWidth: "320px",

                flexShrink: 0,

                background: "rgba(255, 255, 255, 0.025)",
                border: "1px solid rgba(255,255,255,0.06)",

                borderRadius: "24px",

                padding: "18px",

                display: "flex",
                flexDirection: "column",

                cursor: "pointer",

                transition: "all 0.2s ease",
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
                    "rgba(255, 255, 255, 0.025)";
            }}
        >
            {/* ROW 1 */}

            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems:
                        "center",

                    marginBottom:
                        "10px",
                }}
            >
                <span
                    style={{
                        padding:
                            "4px 10px",

                        borderRadius:
                            "999px",

                        fontSize:
                            "0.68rem",

                        background:
                            goal.priority === "Low"
                                ? "#273c4133"
                                : goal.priority === "Medium"
                                    ? "#5e687433"
                                    : "#6b544733",

                        border:
                            goal.priority === "Low"
                                ? "1px solid #273c4166"
                                : goal.priority === "Medium"
                                    ? "1px solid #5e687466"
                                    : "1px solid #6b544766",
                    }}
                >
                    {goal.priority}
                </span>

                {/* MEATBALL DROPDOWN */}
                <div
                    ref={menuRef}
                    style={{
                        position: "relative",
                    }}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();

                            setOpenGoalMenu(
                                openGoalMenu === goal._id
                                    ? null
                                    : goal._id
                            );
                        }}
                        style={{
                            background: "none",
                            border: "none",

                            color: "var(--text-secondary)",

                            cursor: "pointer",

                            display: "flex",

                            alignItems: "center",

                            justifyContent: "center",

                            padding: 0,
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
                        <Ellipsis size={18} />
                    </button>

                    {openGoalMenu === goal._id && (
                        <div
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                            style={{
                                position: "absolute",

                                top: "24px",
                                right: 0,

                                minWidth: "140px",

                                background:
                                    "rgba(20,20,20,0.95)",

                                backdropFilter:
                                    "blur(20px)",

                                border:
                                    "1px solid rgba(255,255,255,0.08)",

                                borderRadius: "16px",

                                overflow: "hidden",

                                zIndex: 100,
                            }}
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();

                                    onView(goal);
                                    setOpenGoalMenu(null);
                                }}
                                style={menuItemStyle}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                        "rgba(255,255,255,0.04)";

                                    e.currentTarget.style.color =
                                        "#F5F5F5";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                        "transparent";

                                    e.currentTarget.style.color =
                                        "var(--text-primary)";
                                }}
                            >
                                View
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();

                                    onEdit(goal);
                                    setOpenGoalMenu(null);
                                }}
                                style={menuItemStyle}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                        "rgba(255,255,255,0.04)";

                                    e.currentTarget.style.color =
                                        "#F5F5F5";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                        "transparent";

                                    e.currentTarget.style.color =
                                        "var(--text-primary)";
                                }}
                            >
                                Edit
                            </button>

                            <div
                                style={{
                                    height: "1px",
                                    background:
                                        "rgba(255,255,255,0.05)",
                                    margin: "4px 0",
                                }}
                            />

                            {goal.completed ? (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        onRestore(goal);
                                        setOpenGoalMenu(null);
                                    }}
                                    style={menuItemStyle}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                            "rgba(255,255,255,0.04)";

                                        e.currentTarget.style.color =
                                            "#F5F5F5";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                            "transparent";

                                        e.currentTarget.style.color =
                                            "var(--text-primary)";
                                    }}
                                >
                                    Restore
                                </button>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        onComplete(goal);
                                        setOpenGoalMenu(null);
                                    }}
                                    style={menuItemStyle}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                            "rgba(255,255,255,0.04)";

                                        e.currentTarget.style.color =
                                            "#F5F5F5";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                            "transparent";

                                        e.currentTarget.style.color =
                                            "var(--text-primary)";
                                    }}
                                >
                                    Complete
                                </button>
                            )}

                            <div
                                style={{
                                    height: "1px",
                                    background:
                                        "rgba(255,255,255,0.05)",
                                    margin: "4px 0",
                                }}
                            />

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();

                                    onDelete(goal._id);
                                    setOpenGoalMenu(null);
                                }}
                                style={{
                                    ...menuItemStyle,
                                    color: "#ff6b6b",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                        "rgba(255,255,255,0.04)";

                                    e.currentTarget.style.color =
                                        "#ff6b6b";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                        "transparent";

                                    e.currentTarget.style.color =
                                        "#ff6b6b";
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ROW 2 */}

            <div
                style={{
                    display: "flex",
                    gap: "6px",

                    marginBottom:
                        "16px",
                }}
            >
                <span
                    style={{
                        padding: "4px 10px",

                        borderRadius: "999px",

                        fontSize: "0.68rem",

                        background:
                            goal.category === "Work"
                                ? "#466a6d33"
                                : goal.category === "Study"
                                    ? "#536b8333"
                                    : goal.category === "Personal"
                                        ? "#6f5f7a33"
                                        : "#57707a33",

                        border:
                            goal.category === "Work"
                                ? "1px solid #466a6d66"
                                : goal.category === "Study"
                                    ? "1px solid #536b8366"
                                    : goal.category === "Personal"
                                        ? "1px solid #6f5f7a66"
                                        : "1px solid #57707a66",
                    }}
                >
                    {goal.category}
                </span>

                <span
                    style={{
                        padding: "4px 10px",

                        borderRadius:
                            "999px",

                        fontSize:
                            "0.68rem",

                        background:
                            displayStatus === "Active"
                                ? "#4d689333"
                                : displayStatus === "Paused"
                                    ? "#45575b33"
                                    : displayStatus === "Overdue"
                                        ? "#8b5a5a33"
                                        : displayStatus === "In Progress"
                                            ? "#5d766233"
                                            : "rgba(114,138,110,0.12)",

                        border:
                            displayStatus === "Active"
                                ? "1px solid #4d689366"
                                : displayStatus === "Paused"
                                    ? "1px solid #45575b66"
                                    : displayStatus === "Overdue"
                                        ? "1px solid #8b5a5a66"
                                        : displayStatus === "In Progress"
                                            ? "1px solid #5d766266"
                                            : "1px solid rgba(114,138,110,0.25)",
                    }}
                >
                    {displayStatus}
                </span>
            </div>

            {/* ROW 3 TITLE */}

            <div
                style={{
                    fontSize: "1rem",

                    fontWeight: "350",

                    letterSpacing: "-0.02em",

                    marginBottom: "10px",
                    marginTop: "5px",
                }}
            >
                {goal.title}
            </div>

            {/* Description */}

            <div
                style={{
                    minHeight: "30px",

                    fontSize: "0.75rem",
                    opacity: 0.55,
                    lineHeight: 1.4,

                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                }}
            >
                {goal.description || "No description provided."}
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

                    background: "rgba(255,255,255,0.05)",

                    marginBottom: "20px",
                }}
            />


            {/* ASSOCIATIONS */}

            <div
                style={{
                    display: "flex",

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

            {/* ROW 6 */}

            <div
                style={{
                    fontSize:
                        "0.68rem",

                    opacity: 0.45,

                    marginBottom:
                        "14px",
                }}
            >
                {goal.dueDate
                    ? `Due ${new Date(
                        goal.dueDate
                    ).toLocaleDateString(
                        "en-US",
                        {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        }
                    )}`
                    : "No due date"}
            </div>

            {/* ICONS ROW 7 */}

            <div
                style={{
                    display: "flex",

                    justifyContent:
                        "space-between",

                    alignItems: "center",
                    marginBottom: "0px",
                }}
            >
                <div
                    onClick={(e) => {
                        e.stopPropagation();

                        onToggleFlag(goal);
                    }}
                    style={{
                        cursor: "pointer",

                        color: goal.flagged
                            ? "#a45d44"
                            : "var(--text-secondary)",

                        transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                            "translateY(-1px) scale(1.08)";

                        if (!goal.flagged) {
                            e.currentTarget.style.color =
                                "white";
                        }
                    }}

                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                            "translateY(0) scale(1)";

                        if (!goal.flagged) {
                            e.currentTarget.style.color =
                                "var(--text-secondary)";
                        }
                    }}
                >
                    <Flag
                        size={18}
                        fill={
                            goal.flagged
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
                        onClick={(e) => {
                            e.stopPropagation();

                            onAddComment(goal);
                        }}
                        style={{
                            display: "flex",

                            alignItems: "center",

                            gap: "4px",

                            cursor: "pointer",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color =
                                "white";

                            e.currentTarget.style.transform =
                                "translateY(-1px) scale(1.05)";
                        }}

                        onMouseLeave={(e) => {
                            e.currentTarget.style.color =
                                "var(--text-secondary)";

                            e.currentTarget.style.transform =
                                "translateY(0) scale(1)";
                        }}
                    >
                        <MessageCircle
                            size={18}
                            opacity={0.95}
                        />

                        <span
                            style={{
                                fontSize:
                                    "0.72rem",

                                opacity:
                                    0.55,
                            }}
                        >
                            {goal.commentCount}
                        </span>
                    </div>

                    <div
                        onClick={(e) => {
                            e.stopPropagation();

                            onToggleLike(goal);
                        }}
                        style={{
                            cursor: "pointer",

                            color: goal.liked
                                ? "#ff6b6b"
                                : "var(--text-secondary)",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(-1px) scale(1.08)";

                            if (!goal.liked) {
                                e.currentTarget.style.color =
                                    "#ff6b6b";
                            }
                        }}

                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(0) scale(1)";

                            if (!goal.liked) {
                                e.currentTarget.style.color =
                                    "var(--text-secondary)";
                            }
                        }}
                    >
                        <Heart
                            size={18.5}
                            fill={
                                goal.liked
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

export default GoalCard;