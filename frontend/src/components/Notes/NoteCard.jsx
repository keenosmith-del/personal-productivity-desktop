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

function NoteCard({
    note,
    onClick,

    openNoteMenu,
    setOpenNoteMenu,

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
                setOpenNoteMenu(null);
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
    }, [setOpenNoteMenu]);

    const visibleLinks =
        note.linkedItems?.slice(0, 3) || [];

    const remainingLinks =
        (note.linkedItems?.length || 0) - 3;

    return (
        <div
            onClick={() =>
                onClick(note)
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
                        "flex-end",
                    alignItems:
                        "center",

                    marginBottom:
                        "10px",
                }}
            >
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

                            setOpenNoteMenu(
                                openNoteMenu === note._id
                                    ? null
                                    : note._id
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

                    {openNoteMenu === note._id && (
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

                                    onEdit(note);
                                    setOpenNoteMenu(null);
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

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
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
                                Add To Folder
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
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
                                Archive
                            </button>

                            {/* divider */}
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

                                    onDelete(note._id);
                                    setOpenNoteMenu(null);
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
                {note.title}
            </div>

            {/* Content */}

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
                {note.content || "No additional notes."}
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
                {note.createdAt
                    ? new Date(
                        note.createdAt
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

                        onToggleFlag(note);
                    }}
                    style={{
                        cursor: "pointer",

                        color: note.flagged
                            ? "#a45d44"
                            : "var(--text-secondary)",

                        transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                            "translateY(-1px) scale(1.08)";

                        if (!note.flagged) {
                            e.currentTarget.style.color =
                                "white";
                        }
                    }}

                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                            "translateY(0) scale(1)";

                        if (!note.flagged) {
                            e.currentTarget.style.color =
                                "var(--text-secondary)";
                        }
                    }}
                >
                    <Flag
                        size={18}
                        fill={
                            note.flagged
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

                            onAddComment(note);
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
                            {note.commentCount}
                        </span>
                    </div>

                    <div
                        onClick={(e) => {
                            e.stopPropagation();

                            onToggleLike(note);
                        }}
                        style={{
                            cursor: "pointer",

                            color: note.liked
                                ? "#ff6b6b"
                                : "var(--text-secondary)",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(-1px) scale(1.08)";

                            if (!note.liked) {
                                e.currentTarget.style.color =
                                    "#ff6b6b";
                            }
                        }}

                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(0) scale(1)";

                            if (!note.liked) {
                                e.currentTarget.style.color =
                                    "var(--text-secondary)";
                            }
                        }}
                    >
                        <Heart
                            size={18.5}
                            fill={
                                note.liked
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

export default NoteCard;