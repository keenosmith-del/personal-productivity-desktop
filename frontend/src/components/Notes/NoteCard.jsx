import {
    Ellipsis,
    Flag,
    Heart,
    MessageCircle,
    Folder,
    EyeOff,
    Archive,
} from "lucide-react";

import {
    useEffect,
    useRef,
} from "react";

import SubmenuTrigger from "../SubmenuTrigger";
import FloatingLayer from "../FloatingLayer";

function NoteCard({
    note,
    onClick,

    openNoteMenu,
    setOpenNoteMenu,

    onView,
    onEdit,

    onDelete,

    folders,
    onAddExistingNote,
    onRemoveFromFolder,

    onCreateFolder,

    onComplete,
    onRestore,

    onToggleFlag,
    onToggleLike,
    onAddComment,

    onToggleHide,
    onToggleArchive,
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

        fontSize: "0.7rem",

        fontWeight: "300",

        transition: "all 0.2s ease",

        width: "100%",
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

    const currentFolder = note.archived
        ? folders?.find((folder) => folder.isSystem)
        : folders?.find(
            (folder) => folder._id === note.folder
        );

    const availableFolders = folders?.filter(
        (folder) => folder._id !== note.folder
    ) || [];

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
                        ref={menuButtonRef}
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
                                {/* ADD TO FOLDER IF NOT IN FOLDER. MOVE TO FOLDER IF IN FOLDER */}
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
                                            {currentFolder
                                                ? "Move to Folder"
                                                : "Add to Folder"}
                                        </button>
                                    }
                                >
                                    {currentFolder && (
                                        <>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();

                                                    setOpenNoteMenu(null);
                                                }}
                                                style={{
                                                    ...menuItemStyle,
                                                    opacity: "0.45",
                                                }}
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
                                                <Folder
                                                    size={14}
                                                    strokeWidth={1.6}
                                                />

                                                {currentFolder.title}
                                            </button>

                                            <div
                                                style={{
                                                    height: "1px",
                                                    background:
                                                        "rgba(255,255,255,0.05)",
                                                    margin: "4px 0",
                                                }}
                                            />
                                        </>
                                    )}

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();

                                            onCreateFolder?.(note);

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
                                        + New Folder
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
                                        {availableFolders.length === 0 ? (
                                            <div
                                                style={{
                                                    padding: "8px 12px",
                                                    fontSize: "0.72rem",
                                                    color: "var(--text-secondary)",
                                                    opacity: 0.55,
                                                    textAlign: "center",
                                                }}
                                            >
                                                No available folders
                                            </div>
                                        ) : (
                                            availableFolders.map((folder) => (
                                                <button
                                                    key={folder._id}
                                                    onClick={(e) => {
                                                        e.stopPropagation();

                                                        onAddExistingNote?.(
                                                            folder,
                                                            note
                                                        );

                                                        setOpenNoteMenu(null);
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
                                                    <Folder
                                                        size={14}
                                                        strokeWidth={1.6}
                                                    />

                                                    {folder.title}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </SubmenuTrigger>

                                {/* ONLY IF ALREADY IN FOLDER */}
                                {currentFolder && (
                                    <button
                                        onClick={async (e) => {
                                            e.stopPropagation();

                                            await onRemoveFromFolder?.(
                                                currentFolder,
                                                note
                                            );

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
                                        Remove from Folder
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

                                        onEdit?.(note);
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
                                    View Note
                                </button>

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
                                    Edit Note
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        onToggleHide?.(note);

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
                                    {note.hidden ? "Unhide Note" : "Hide Note"}
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        onToggleArchive?.(note);

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
                                    {note.archived ? "Unarchive" : "Archive"}
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
                                    Delete Note
                                </button>
                            </div>
                        </FloatingLayer>
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

                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
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
                    WebkitLineClamp: 4,
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

            <div
                style={{
                    fontSize: "0.68rem",
                    opacity: currentFolder ? 0.45 : 0,
                    marginBottom: "1px",
                    minHeight: "16px",

                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                }}
            >
                {currentFolder && (
                    <>
                        <Folder
                            size={12}
                            strokeWidth={1}
                        />

                        {currentFolder.title}
                    </>
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

                    justifyContent: "space-between",

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
                        strokeWidth={1}
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

                    {note.hidden && (
                        <div
                            onClick={(e) => {
                                e.stopPropagation();

                                onToggleHide?.(note);
                            }}
                            style={{
                                cursor: "pointer",

                                color: "var(--text-secondary)",

                                transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-1px) scale(1.08)";

                                e.currentTarget.style.color =
                                    "var(--text-primary)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0) scale(1)";

                                e.currentTarget.style.color =
                                    "var(--text-secondary)";
                            }}
                        >
                            <EyeOff
                                size={18}
                                strokeWidth={1}
                            />
                        </div>
                    )}
                    {note.archived && (
                        <div
                            onClick={(e) => {
                                e.stopPropagation();

                                if (note.archived) {
                                    onToggleArchive?.(note);
                                }
                            }}
                            style={{
                                cursor: "pointer",

                                color: "var(--text-secondary)",

                                transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-1px) scale(1.08)";

                                e.currentTarget.style.color = "var(--text-primary)";
                            }}

                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0) scale(1)";

                                e.currentTarget.style.color =
                                    "var(--text-secondary)";

                            }}
                        >
                            <Archive
                                size={18}
                                strokeWidth={1}
                            />
                        </div>
                    )}

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
                            strokeWidth={1}
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