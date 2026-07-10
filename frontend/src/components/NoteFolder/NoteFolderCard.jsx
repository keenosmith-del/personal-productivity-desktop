import {
    Ellipsis,
    Flag,
    Heart,
    Pin,
    Folder,
} from "lucide-react";

import {
    useEffect,
    useRef,
} from "react";

import NoteFolderPreviewCard from "./NoteFolderPreviewCard";

function NoteFolderCard({
    folder,

    onEdit,
    onView,

    onDelete,

    onToggleFolderPin,
    onToggleFolderLike,
    onToggleFolderFlag,

    openFolderMenu,
    setOpenFolderMenu,
}) {
    // states
    const noteCount = 0;

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

    // refs
    const menuRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(
                    event.target
                )
            ) {
                setOpenFolderMenu(null);
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
    }, [setOpenFolderMenu]);

    // handlers
    return (
        <div
            onClick={() =>
            // open NoteFolderViewModal
            { }}
            style={{
                height: "450px",
                width: "500px",

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
            {/* ROW 1 x and title */}
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

                {/* title */}
                {/* title */}
                <div
                    style={{
                        display: "flex",

                        alignItems: "center",

                        gap: "8px",

                        marginTop: "4px",

                        marginBottom: "10px",
                    }}
                >
                    <Folder
                        size={17}
                        strokeWidth={1.8}
                        style={{
                            color: "var(--text-secondary)",

                            flexShrink: 0,
                        }}
                    />

                    <div
                        style={{
                            fontSize: "1rem",

                            fontWeight: "350",

                            letterSpacing: "-0.02em",

                            lineHeight: 1,
                        }}
                    >
                        {folder.title}
                    </div>
                </div>

                {/* ellipsis */}
                <div
                    ref={menuRef}
                    style={{
                        position: "relative",
                    }}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation()

                            setOpenFolderMenu(
                                openFolderMenu === folder._id
                                    ? null
                                    : folder._id
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
                    {openFolderMenu === folder._id && (
                        <div
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                            style={{
                                position: "absolute",

                                top: "24px",
                                right: 0,

                                minWidth: "180px",

                                background:
                                    "rgba(20, 20, 20, 0)",

                                backdropFilter:
                                    "blur(12px)",

                                border:
                                    "1px solid rgba(255,255,255,0.10)",

                                boxShadow:
                                    "0 20px 50px rgba(0,0,0,0.35)",

                                borderRadius: "18px",

                                overflow: "hidden",

                                zIndex: 100,
                            }}
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();

                                    onView(folder);
                                    setOpenFolderMenu(null);
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

                                    onEdit(folder);
                                    setOpenFolderMenu(null);
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

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();

                                    onDelete(folder._id);
                                    setOpenFolderMenu(null);
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

            {/* DESCRIPTION ?? MIGHT REMOVE */}
            <div
                style={{
                    fontSize: "0.72rem",

                    opacity: 0.45,

                    marginTop: "6px",

                    marginLeft: "25px",

                    whiteSpace: "nowrap",

                    overflow: "hidden",

                    textOverflow: "ellipsis",
                }}
            >
                {folder.description || "No description"}
            </div>

            {/* ROW 2 GAP THEN TWO PREVIEW OF NOTES CONTAINED */}
            <div
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "1fr 1fr",

                    gap: "16px",

                    marginTop: "18px",

                    marginBottom: "20px",
                }}
            >
                <NoteFolderPreviewCard />
                <NoteFolderPreviewCard />
            </div>

            {/* DIVIDER */}
            <div
                style={{
                    height: "1px",

                    background:
                        "rgba(255,255,255,0.05)",

                    marginBottom: "20px",
                }}
            />

            {/* ROW 3 (N) */}
            <div
                style={{
                    display: "flex",

                    marginBottom: "20px",
                }}
            >
                <div
                    style={{
                        ...linkedItemStyle,

                        marginRight: "-6px",
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
                    N
                </div>
            </div>

            {/* ROW 4 numNotes in folder */}
            <div
                style={{
                    fontSize:
                        "0.68rem",

                    opacity: 0.45,

                    marginBottom:
                        "2px",
                }}
            >
                {noteCount} {noteCount === 1 ? "Note" : "Notes"}
            </div>

            {/* ROW 5 folderCreated date */}
            <div
                style={{
                    fontSize:
                        "0.68rem",

                    opacity: 0.45,

                    marginBottom:
                        "18px",
                }}
            >
                Created{" "}
                {new Date(
                    folder.createdAt
                ).toLocaleDateString()}
            </div>

            {/* ROW 6 pin flag heart */}
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

                        onToggleFolderPin?.(folder);
                    }}
                    style={{
                        cursor: "pointer",

                        color: folder.pinned
                            ? "white"
                            : "var(--text-secondary)",

                        transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                            "translateY(-1px) scale(1.08)";

                        if (!folder.flagged) {
                            e.currentTarget.style.color =
                                "white";
                        }
                    }}

                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                            "translateY(0) scale(1)";

                        if (!folder.pinned) {
                            e.currentTarget.style.color =
                                "var(--text-secondary)";
                        }
                    }}
                >
                    <Pin
                        size={18}
                        fill={
                            folder.pinned
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

                            onToggleFolderFlag?.(folder);
                        }}
                        style={{
                            cursor: "pointer",

                            color:
                                folder.flagged
                                    ? "#a45d44"
                                    : "var(--text-secondary)",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(-1px) scale(1.08)";

                            if (!folder.flagged) {
                                e.currentTarget.style.color =
                                    "white";
                            }
                        }}

                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(0) scale(1)";

                            if (!folder.flagged) {
                                e.currentTarget.style.color =
                                    "var(--text-secondary)";
                            }
                        }}
                    >
                        <Flag
                            size={18}
                            fill={
                                folder.flagged
                                    ? "currentColor"
                                    : "none"
                            }
                        />
                    </div>

                    <div
                        onClick={(e) => {
                            e.stopPropagation();

                            onToggleFolderLike?.(folder);
                        }}
                        style={{
                            cursor: "pointer",

                            color: folder.liked ? "#ff6b6b" : "var(--text-secondary)",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(-1px) scale(1.08)";

                            if (!folder.liked) {
                                e.currentTarget.style.color =
                                    "#ff6b6b";
                            }
                        }}

                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(0) scale(1)";

                            if (!folder.liked) {
                                e.currentTarget.style.color =
                                    "var(--text-secondary)";
                            }
                        }}
                    >
                        <Heart
                            size={18.5}
                            fill={
                                folder.liked
                                    ? "currentColor"
                                    : "none"
                            }
                        />
                    </div>
                </div>
            </div>

        </div >
    );
}

export default NoteFolderCard;