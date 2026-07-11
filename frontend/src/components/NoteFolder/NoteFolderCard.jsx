import {
    Ellipsis,
    Flag,
    Heart,
    Pin,
    Folder,
} from "lucide-react";

import {
    useState,
    useEffect,
    useRef,
} from "react";

import NoteFolderPreviewCard from "./NoteFolderPreviewCard";
import SubmenuTrigger from "../SubmenuTrigger";
import FloatingLayer from "../FloatingLayer";

function NoteFolderCard({
    folder,

    onEdit,
    onView,

    onCreateNote,
    onEditNote,

    onRemoveNote,
    onAddNote,
    onAddExistingNote,
    notes,

    onDelete,

    onToggleFolderPin,
    onToggleFolderLike,
    onToggleFolderFlag,

    openFolderMenu,
    setOpenFolderMenu,
}) {
    // states
    const previewNotes =
        folder.notes?.slice(0, 2) || [];

    const noteCount =
        folder.notes?.length || 0;

    const previewSlots = [
        previewNotes[0] || null,
        previewNotes[1] || null,
    ];

    const menuButtonRef = useRef(null);

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
            onClick={() => {
                console.log("CARD CLICK", folder.title);
                onView?.(folder);
            }}
            style={{
                // 450 x 420 desktop
                height: "450px",
                width: "420px",

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
                        ref={menuButtonRef}
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
                                {/* add note to folder */}
                                {/* will eventually be a second glass panel that opens existing notes and add new note */}
                                <SubmenuTrigger
                                    trigger={
                                        <button
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
                                            Add Note
                                        </button>
                                    }
                                >
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();

                                            onCreateNote?.(folder);

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
                                        + New Note
                                    </button>
                                    <div
                                        style={{
                                            height: "1px",
                                            background:
                                                "rgba(255,255,255,0.05)",
                                            margin: "4px 0",
                                        }}
                                    />

                                    <div
                                        style={{
                                            maxHeight: "220px",
                                            overflowY: "auto",
                                        }}
                                    >
                                        {notes.map((note) => (
                                            <button
                                                key={note._id}
                                                onClick={(e) => {
                                                    e.stopPropagation();

                                                    onAddExistingNote?.(
                                                        folder,
                                                        note
                                                    );

                                                    setOpenFolderMenu(null);
                                                }}
                                                style={menuItemStyle}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background =
                                                        "rgba(255,255,255,0.04)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background =
                                                        "transparent";
                                                }}
                                            >
                                                {note.title || "Untitled"}
                                            </button>
                                        ))}
                                    </div>
                                </SubmenuTrigger>

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

                                        onView?.(folder);
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
                                    View Folder
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
                                    Edit Folder
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
                                    Delete Folder
                                </button>
                            </div>
                        </FloatingLayer>
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
                {previewSlots.map((note, index) => (
                    <NoteFolderPreviewCard
                        key={note?._id || `placeholder-${index}`}
                        note={note}
                        onClick={() =>
                            onEditNote?.(note)
                        }
                        onCreate={() =>
                            onCreateNote(folder)
                        }
                        onRemove={(note) =>
                            onRemoveNote?.(
                                folder,
                                note
                            )
                        }
                    />
                ))}
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