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

import FloatingLayer from "../FloatingLayer";

function ProjectCard({
    project,
    onClick,

    openProjectMenu,
    setOpenProjectMenu,

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
        display: "flex",
        alignItems: "center",
        gap: "10px",

        background: "transparent",

        border: "none",

        color: "var(--text-primary)",

        padding: "10px 14px",

        borderRadius: "999px",

        cursor: "pointer",

        textAlign: "left",

        fontSize: "0.78rem",

        fontWeight: "300",

        transition: "all 0.2s ease",

        width: "100%",
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

    const menuButtonRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(
                    event.target
                )
            ) {
                setOpenProjectMenu(null);
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
    }, [setOpenProjectMenu]);

    const visibleLinks =
        project.linkedItems?.slice(0, 4) || [];

    const remainingLinks =
        (project.linkedItems?.length || 0) - 4;

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const dueDate =
        project.dueDate
            ? new Date(project.dueDate)
            : null;

    if (dueDate) {
        dueDate.setHours(0, 0, 0, 0);
    }

    const isOverdue =
        dueDate &&
        dueDate < today;

    const displayStatus =
        project.completed
            ? "Complete"
            : project.status === "Paused"
                ? "Paused"
                : isOverdue
                    ? "Overdue"
                    : project.status;

    return (
        <div
            onClick={() =>
                onClick(project)
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
                            project.priority === "Low"
                                ? "#273c4133"
                                : project.priority === "Medium"
                                    ? "#5e687433"
                                    : "#6b544733",

                        border:
                            project.priority === "Low"
                                ? "1px solid #273c4166"
                                : project.priority === "Medium"
                                    ? "1px solid #5e687466"
                                    : "1px solid #6b544766",
                    }}
                >
                    {project.priority}
                </span>

                {/* MEATBALL DROPDOWN */}
                <div
                    ref={menuRef}
                    style={{
                        position: "relative",
                    }}
                >
                    <button
                        ref={menuButtonRef}
                        onClick={(e) => {
                            e.stopPropagation();

                            setOpenProjectMenu(
                                openProjectMenu === project._id
                                    ? null
                                    : project._id
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
                    {openProjectMenu === project._id && (
                        <FloatingLayer
                            anchorRef={menuButtonRef}
                            open={true}
                            placement="bottom"
                            offset={8}
                        >
                            <div
                                onClick={(e) =>
                                    e.stopPropagation()
                                }
                                style={{
                                    minWidth: "180px",

                                    background:
                                        "rgba(20, 20, 20, 0)",

                                    backdropFilter:
                                        "blur(8px)",

                                    border:
                                        "1px solid rgba(255,255,255,0.10)",

                                    boxShadow:
                                        "0 20px 50px rgba(0,0,0,0.35)",

                                    borderRadius: "18px",

                                    padding: "8px",

                                    display: "flex",

                                    overflow: "visible",

                                    flexDirection: "column",

                                    gap: "4px",

                                    zIndex: 2001,
                                }}
                            >
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        onView(project);
                                        setOpenProjectMenu(null);
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
                                    View Project
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        onEdit(project);
                                        setOpenProjectMenu(null);
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
                                    Edit Project
                                </button>

                                <div
                                    style={{
                                        height: "1px",
                                        background:
                                            "rgba(255,255,255,0.05)",
                                        margin: "4px 0",
                                    }}
                                />

                                {/* complete */}
                                {project.completed ? (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();

                                            onRestore(project);
                                            setOpenProjectMenu(null);
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

                                            onComplete(project);
                                            setOpenProjectMenu(null);
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

                                        onDelete(project._id);
                                        setOpenProjectMenu(null);
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
                                    Delete Project
                                </button>
                            </div>
                        </FloatingLayer>
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
                        padding:
                            "4px 10px",

                        borderRadius:
                            "999px",

                        fontSize:
                            "0.68rem",

                        background:
                            project.category === "Work"
                                ? "#466a6d33"
                                : project.category === "Study"
                                    ? "#536b8333"
                                    : project.category === "Personal"
                                        ? "#6f5f7a33"
                                        : "#57707a33",

                        border:
                            project.category === "Work"
                                ? "1px solid #466a6d66"
                                : project.category === "Study"
                                    ? "1px solid #536b8366"
                                    : project.category === "Personal"
                                        ? "1px solid #6f5f7a66"
                                        : "1px solid #57707a66",
                    }}
                >
                    {project.category}
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
                    fontSize:
                        "1rem",

                    fontWeight:
                        "350",

                    letterSpacing: "-0.02em",

                    marginBottom: "10px",
                    marginTop: "5px",
                }}
            >
                {project.title}
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
                {project.description || "No description provided."}
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
                {project.dueDate
                    ? `Due ${new Date(
                        project.dueDate
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

                        onToggleFlag(project);
                    }}
                    style={{
                        cursor: "pointer",

                        color: project.flagged
                            ? "#a45d44"
                            : "var(--text-secondary)",

                        transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                            "translateY(-1px) scale(1.08)";

                        if (!project.flagged) {
                            e.currentTarget.style.color =
                                "white";
                        }
                    }}

                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                            "translateY(0) scale(1)";

                        if (!project.flagged) {
                            e.currentTarget.style.color =
                                "var(--text-secondary)";
                        }
                    }}
                >
                    <Flag
                        size={18}
                        fill={
                            project.flagged
                                ? "currentColor"
                                : "none"
                        }
                    />
                </div>

                <div
                    style={{
                        display: "flex",

                        alignItems:
                            "center",

                        gap: "12px",
                    }}
                >
                    <div
                        onClick={(e) => {
                            e.stopPropagation();

                            onAddComment(project);
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
                            {project.commentCount}
                        </span>
                    </div>

                    <div
                        onClick={(e) => {
                            e.stopPropagation();

                            onToggleLike(project);
                        }}
                        style={{
                            cursor: "pointer",

                            color: project.liked
                                ? "#ff6b6b"
                                : "var(--text-secondary)",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(-1px) scale(1.08)";

                            if (!project.liked) {
                                e.currentTarget.style.color =
                                    "#ff6b6b";
                            }
                        }}

                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(0) scale(1)";

                            if (!project.liked) {
                                e.currentTarget.style.color =
                                    "var(--text-secondary)";
                            }
                        }}
                    >
                        <Heart
                            size={18.5}
                            fill={
                                project.liked
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

export default ProjectCard;