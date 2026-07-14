import {
    Folder,
    Ellipsis,
    Heart,
    Flag,
    EyeOff,
    Archive,
} from "lucide-react";

// MAKING CHANGES

import { useState, useEffect, useRef } from "react";

import Toast from "../Toast";

import NoteModal from "../Notes/NoteModal";
import NoteFolderCreateModal from "../NoteFolder/NoteFolderCreateModal";

import { updateNote, deleteNote } from "../../services/noteService";

import FloatingLayer from "../FloatingLayer";
import SubmenuTrigger from "../SubmenuTrigger";

import DeleteConfirmModal from "../DeleteConfirmModal";

function NoteFolderViewModal({
    folder,

    onShowAll,
    onShowLess,

    onToggleLike,
    onToggleFlag,
    onToggleHide,
    onToggleArchive,

    onRemoveNote,
    onDeleteNote,

    onUpdateNote,

    onClose,

    onEditFolder,
    onDeleteFolder,
    onUpdateFolder,
    onClearFolder,

    onCreateNote,
    onAddExistingNote,

    notes,
    showHidden,

    // expanded,
    // remainingCount,
    // notes,
}) {
    const folderNotes = showHidden
        ? (folder.notes || [])
        : (folder.notes || []).filter(
            (note) => !note.hidden
        );

    const availableNotes = notes.filter(
        (note) =>
            !folderNotes.some(
                (folderNote) =>
                    folderNote._id.toString() ===
                    note._id.toString()
            )
    );

    const [expanded, setExpanded] =
        useState(false);

    const visibleNotes = expanded
        ? folderNotes
        : folderNotes.slice(0, 4);

    const remainingCount =
        Math.max(folderNotes.length - 4, 0);

    const date = new Date();

    // states
    const [editingNote, setEditingNote] =
        useState(null);

    const [editingFolder, setEditingFolder] =
        useState(null);

    const [creatingNote, setCreatingNote] =
        useState(false);

    const [showClearConfirm, setShowClearConfirm] =
        useState(false);

    const [toast, setToast] =
        useState("");

    const [hoveredCard, setHoveredCard] =
        useState(null);

    // ellipsis on note preview card
    const [openNoteMenu, setOpenNoteMenu] =
        useState(null);

    // ellipsis on modal
    const [openFolderMenu, setOpenFolderMenu] =
        useState(null);

    // one modal open at a time
    const [showMainContent, setShowMainContent] = useState(true);

    const [showCloseButton, setShowCloseButton] =
        useState(false);

    const [showDeleteConfirm, setShowDeleteConfirm] =
        useState(false);

    const menuButtonRef = useRef(null);

    const menuRef = useRef(null);

    const [menuAnchorEl, setMenuAnchorEl] =
        useState(null);

    const menuRefCard = useRef(null);

    const formatCreatedDate = (date) =>
        new Date(date).toLocaleDateString(
            "en-GB",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );

    // handle
    const handleNoteClick = (note) => {

        setShowMainContent(false);

        setEditingNote(note);
    };

    const handleShowAll = () => {
        setExpanded(true);
    };

    const handleShowLess = () => {
        setExpanded(false);
    };

    useEffect(() => {
        if (!editingNote) return;

        const updatedNote = folder.notes?.find(
            (note) =>
                note._id === editingNote._id
        );

        if (updatedNote) {
            setEditingNote(updatedNote);
        }
    }, [folder, editingNote]);

    // outside click modal meatball 
    useEffect(() => {
        function handleClickOutside(e) {
            if (
                openFolderMenu &&
                !menuRef.current?.contains(e.target) &&
                !menuButtonRef.current?.contains(e.target)
            ) {
                setOpenFolderMenu(null);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, [openFolderMenu]);

    // outside click individual meatball on card
    useEffect(() => {
        function handleCardMenuOutsideClick(e) {
            if (
                openNoteMenu &&
                !menuRefCard.current?.contains(e.target) &&
                !menuAnchorEl?.contains(e.target)
            ) {
                setOpenNoteMenu(null);
                setMenuAnchorEl(null);
            }
        }

        document.addEventListener(
            "mousedown",
            handleCardMenuOutsideClick
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleCardMenuOutsideClick
            );
        };
    }, [openNoteMenu, menuAnchorEl]);


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

        // added
        overflow: "hidden",

        whiteSpace: "nowrap",

        textOverflow: "ellipsis",

        display: "flex",
    };

    return (
        <div
            onClick={() => {
                onClose();
            }}
            style={{
                position: "fixed",
                inset: 0,

                background:
                    "rgba(20, 20, 20, 0)",

                backdropFilter:
                    "blur(12px)",

                border:
                    "1px solid rgba(255,255,255,0.10)",

                boxShadow:
                    "0 20px 50px rgba(0,0,0,0.35)",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                zIndex: 1000,
            }}
        >
            {/* panel */}
            {showMainContent && (
                <div
                    onClick={(e) =>
                        e.stopPropagation()
                    }
                    style={{
                        width: "520px",

                        maxHeight: "80vh",

                        overflowY: "auto",

                        background:
                            "rgba(0, 0, 0, 0.15)",

                        border:
                            "1px solid rgba(255,255,255,0.08)",

                        borderRadius:
                            "36px",

                        backdropFilter:
                            "blur(30px)",

                        boxShadow:
                            "0 30px 80px rgba(0,0,0,0.45)",

                        padding: "36px",
                    }}
                >
                    {/* HEADER */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            marginBottom: "24px",
                        }}
                    >
                        {/* close x */}

                        <div
                            style={{
                                position: "relative",
                            }}
                        >
                            {/* ellipsis */}
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
                                <Ellipsis
                                    size={18}
                                    strokeWidth={1}
                                />
                            </button>
                            {openFolderMenu === folder._id && (
                                <FloatingLayer
                                    anchorRef={menuButtonRef}
                                    open={true}
                                    placement="bottom"
                                    offset={8}
                                >
                                    <div
                                        ref={menuRef}
                                        onClick={(e) =>
                                            e.stopPropagation()
                                        }
                                        style={{
                                            // change for width of dropdown
                                            width: "196px",

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

                                                    setOpenFolderMenu(null);

                                                    setShowMainContent(false);

                                                    setCreatingNote(true);
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
                                                {availableNotes.length === 0 ? (
                                                    <div
                                                        style={{
                                                            padding: "8px 12px",
                                                            fontSize: "0.72rem",
                                                            color: "var(--text-secondary)",
                                                            opacity: 0.55,
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        No available notes
                                                    </div>
                                                ) : (
                                                    availableNotes.map((note) => (
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
                                                    ))
                                                )}
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

                                                setOpenFolderMenu(null);

                                                setShowMainContent(false);

                                                setEditingFolder(folder);
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

                                                setOpenFolderMenu(null);

                                                setShowMainContent(false);

                                                setShowDeleteConfirm(true);
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

                    {/* Folder Title */}

                    <div
                        style={{
                            textAlign: "center",
                            marginBottom: "20px",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "2rem",

                                fontWeight: "300",

                                letterSpacing:
                                    "-0.04em",
                            }}
                        >
                            {folder.title}
                        </div>

                        <div
                            style={{
                                fontSize: "0.9rem",

                                opacity: 0.55,

                                marginTop: "10px",
                            }}
                        >
                            {folder.description || "No description"}
                        </div>

                        {!expanded && (
                            <div
                                style={{
                                    fontSize: "0.75rem",

                                    opacity: 0.4,

                                    marginTop: "8px",
                                }}
                            >
                                {folderNotes.length === 0
                                    ? "No notes"
                                    : !expanded
                                        ? <>
                                            Showing{" "}
                                            {Math.min(folderNotes.length, 4)}{" "}
                                            out of{" "}
                                            {folderNotes.length}{" "}
                                            {folderNotes.length === 1
                                                ? "note"
                                                : "notes"}
                                        </>
                                        : null}
                            </div>
                        )}
                    </div>


                    {/* DIVIDER */}

                    <div
                        style={{
                            height: "1px",

                            background:
                                "rgba(255,255,255,0.05)",

                            marginBottom: "24px",
                        }}
                    />

                    {/* NOTES */}
                    <div
                        style={{
                            marginBottom: "32px",
                        }}
                    >

                        {folderNotes.length === 0 ? (
                            <div
                                style={{
                                    fontSize: "0.8rem",
                                    opacity: 0.45,
                                    lineHeight: 1.7,
                                    textAlign: "center",
                                    padding: "24px 12px",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "0.92rem",
                                        marginBottom: "12px",
                                        opacity: 0.8,
                                    }}
                                >
                                    No notes yet
                                </div>

                                Add a note to the folder
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: "grid",

                                    gridTemplateColumns:
                                        "1fr 1fr",

                                    gap: "14px",
                                }}
                            >
                                {visibleNotes.map((note) => {
                                    return (
                                        <div
                                            key={note._id}
                                            onClick={() =>
                                                handleNoteClick(note)
                                            }
                                            style={{
                                                position: "relative",

                                                background: "rgba(255,255,255,0.035)",

                                                border: "1px solid rgba(255,255,255,0.08)",

                                                borderRadius: "24px",

                                                backdropFilter: "blur(24px)",

                                                padding: "18px",

                                                minHeight: "185px",

                                                display: "flex",

                                                flexDirection: "column",

                                                transition: "all 0.25s ease",

                                                cursor: "pointer",

                                                overflow: "hidden",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform =
                                                    "translateY(-2px)";

                                                e.currentTarget.style.border =
                                                    "1px solid rgba(255,255,255,0.12)";
                                            }}

                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform =
                                                    "translateY(0)";

                                                e.currentTarget.style.border =
                                                    "1px solid rgba(255,255,255,0.08)";
                                            }}
                                        >

                                            {/* TOP ROW TITLE AND ELLIPSIS */}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "flex-start",
                                                    marginBottom: "10px",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontSize: "0.94rem",

                                                        fontWeight: "320",

                                                        letterSpacing: "-0.02em",

                                                        marginBottom: "18px",

                                                        flex: 1,

                                                        minWidth: 0,
                                                        maxWidth: "140px", // truncate title

                                                        marginRight: "10px",

                                                        whiteSpace: "nowrap",

                                                        overflow: "hidden",

                                                        textOverflow: "ellipsis",
                                                    }}
                                                >
                                                    {note.title || "Note"}
                                                </span>

                                                <div
                                                    style={{
                                                        transition: "opacity 0.2s ease",
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();

                                                        if (openNoteMenu === note._id) {
                                                            setOpenNoteMenu(null);
                                                            setMenuAnchorEl(null);
                                                        } else {
                                                            setOpenNoteMenu(note._id);
                                                            setMenuAnchorEl(e.currentTarget);
                                                        }
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
                                                        size={17}
                                                        strokeWidth={1}
                                                    />
                                                    {/* Floating Layer */}
                                                    {openNoteMenu === note._id && (
                                                        <FloatingLayer
                                                            anchorRef={{
                                                                current: menuAnchorEl,
                                                            }}
                                                            open={true}
                                                            placement="bottom"
                                                            offset={8}
                                                        >
                                                            <div
                                                                ref={menuRefCard}
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
                                                                    onClick={async () => {
                                                                        await onRemoveNote(folder, note);

                                                                        setToast("Note removed");

                                                                        setTimeout(() => {
                                                                            setToast("");
                                                                        }, 3000);

                                                                        setOpenNoteMenu(null);
                                                                    }}
                                                                    style={{
                                                                        ...menuItemStyle,
                                                                        color: "#ff6b6b",
                                                                    }}
                                                                    onMouseEnter={(e) => {
                                                                        e.currentTarget.style.background =
                                                                            "rgba(255,255,255,0.04)";
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        e.currentTarget.style.background =
                                                                            "transparent";
                                                                    }}
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </FloatingLayer>
                                                    )}
                                                </div>
                                            </div>

                                            {/* ROW 2 CLAMPED NOTE CONTENT */}
                                            <div
                                                style={{
                                                    fontSize: "0.68rem",

                                                    lineHeight: 1.4,

                                                    opacity: 0.55,

                                                    display:
                                                        "-webkit-box",

                                                    WebkitLineClamp: 2,

                                                    WebkitBoxOrient:
                                                        "vertical",

                                                    overflow:
                                                        "hidden",

                                                    minHeight: "38px",
                                                }}
                                            >
                                                {note.content || "Empty note."}
                                            </div>

                                            <div
                                                style={{
                                                    flex: 1,
                                                }}
                                            />


                                            {/* ROW 3 NOTE CREATED DATE ? */}
                                            {/* MUST SIT RIGHT ON TOP OF ICON ROW*/}
                                            <div
                                                style={{
                                                    fontSize: "0.72rem",

                                                    opacity: 0.55,

                                                    marginBottom: "4px",
                                                    marginTop: "8px",
                                                }}
                                            >
                                                Created {formatCreatedDate(note.createdAt)}
                                            </div>

                                            {/* ROW 4 HOVER ACTIONS */}

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
                                                        border: "none",

                                                        background:
                                                            "transparent",

                                                        color:
                                                            note.flagged
                                                                ? "#a45d44"
                                                                : "var(--text-secondary)",

                                                        cursor: "pointer",

                                                        display: "flex",

                                                        alignItems: "center",

                                                        justifyContent: "center",

                                                        padding: 0,
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
                                                        size={16}
                                                        strokeWidth={1.6}
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
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",

                                                                padding: 0,

                                                                background: "transparent",

                                                                border: "none",

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
                                                                size={16}
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
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",

                                                                padding: 0,

                                                                background: "transparent",

                                                                border: "none",

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
                                                                size={16}
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
                                                            border: "none",

                                                            background:
                                                                "transparent",

                                                            color:
                                                                note.liked
                                                                    ? "#ff6b6b"
                                                                    : "var(--text-secondary)",

                                                            cursor: "pointer",

                                                            display: "flex",

                                                            alignItems: "center",

                                                            justifyContent: "center",

                                                            padding: 0,
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
                                                            size={16}
                                                            strokeWidth={1.6}
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
                                })}
                            </div>
                        )}
                    </div>

                    {/* expand / collapse */}
                    {/* ONLY SHOW PREVIEW OF MAX 4 NOTES. IF MORE THAN 4, EXPAND TO SHOW MORE */}
                    {!expanded && remainingCount > 0 && (
                        <div
                            onClick={handleShowAll}
                            style={{
                                marginTop: "18px",

                                textAlign: "center",

                                fontSize: "0.74rem",

                                opacity: 0.4,

                                fontWeight: "300",

                                cursor: "pointer",

                                transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.opacity =
                                    "0.65";

                                e.currentTarget.style.transform =
                                    "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.opacity =
                                    "0.4";

                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >
                            +{remainingCount}{" "}
                            {remainingCount === 1
                                ? "other"
                                : "others"}
                        </div>
                    )}

                    {expanded && (
                        <div
                            onClick={handleShowLess}
                            style={{
                                marginTop: "18px",

                                textAlign: "center",

                                fontSize: "0.74rem",

                                opacity: 0.4,

                                fontWeight: "300",

                                cursor: "pointer",

                                transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.opacity =
                                    "0.65";

                                e.currentTarget.style.transform =
                                    "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.opacity =
                                    "0.4";

                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >
                            Show less
                        </div>
                    )}

                    {/* BUTTONS */}

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "10px",
                            marginTop: "24px",
                        }}
                    >
                        {/* CLEAR FOLDER BUTTON ONLY ENDABLED IF NOTES.LENGTH > 0 */}
                        <button
                            onClick={() => {
                                if (folder.notes.length === 0) return;

                                setShowMainContent(false);

                                setShowClearConfirm(true);
                            }}
                            style={{
                                padding: "8px 14px",

                                borderRadius: "999px",

                                background:
                                    "rgba(255,77,77,0.12)",

                                border:
                                    "1px solid rgba(255,77,77,0.25)",

                                color: "var(--danger)",

                                fontSize: "0.8rem",

                                fontWeight: "300",

                                opacity:
                                    folder.notes.length === 0
                                        ? 0.35
                                        : 1,

                                cursor:
                                    folder.notes.length === 0
                                        ? "default"
                                        : "pointer",

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
                            Clear Folder
                        </button>

                        <button
                            onClick={() => {
                                setShowMainContent(false);

                                setShowDeleteConfirm(true);
                            }}
                            style={{
                                padding: "8px 14px",

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
                            Delete Folder
                        </button>
                    </div>

                </div>
            )
            }
            {/* open modal from modal: note modal from view folder modal */}
            {
                editingNote && (
                    <NoteModal
                        mode="edit"
                        note={editingNote}
                        onClose={() => {
                            setEditingNote(null);
                            setShowMainContent(true);
                        }}
                        onSave={async (noteData) => {
                            await onUpdateNote(
                                editingNote._id,
                                noteData
                            );

                            setToast("Note updated");

                            setTimeout(() => {
                                setToast("");
                            }, 3000);

                            // possible remove
                            const updatedNote =
                                await onUpdateNote(
                                    editingNote._id,
                                    noteData
                                );

                            setEditingNote(null);

                            setShowMainContent(true);
                        }}
                        onDelete={onDeleteNote}
                    />
                )
            }
            {/* open edit folder NoteFolderCreateModal from NoteFolderViewModal */}
            {
                editingFolder && (
                    <NoteFolderCreateModal
                        mode="edit"
                        folder={editingFolder}

                        onClose={() => {
                            setEditingFolder(null);
                            setShowMainContent(true);
                        }}

                        onUpdate={async (folderId, folderData) => {
                            await onUpdateFolder(folderId, folderData);

                            setEditingFolder(null);

                            setShowMainContent(true);
                        }}

                        onDelete={onDeleteFolder}
                    />
                )
            }
            {
                creatingNote && (
                    <NoteModal
                        folder={folder}
                        onClose={() => {
                            setCreatingNote(false);
                            setShowMainContent(true);
                        }}
                        onSave={async (noteData) => {
                            await onCreateNote(folder, noteData);

                            setCreatingNote(false);

                            setShowMainContent(true);
                        }}
                    />
                )
            }
            {
                showDeleteConfirm && (
                    <DeleteConfirmModal
                        title="Delete Folder"
                        message={`Delete "${folder.title}"?`}
                        onCancel={() => {
                            setShowDeleteConfirm(false);
                            setShowMainContent(true);
                        }}
                        onConfirm={async () => {
                            await onDeleteFolder(folder._id);

                            setShowDeleteConfirm(false);

                            onClose();
                        }}
                    />
                )
            }
            {
                showClearConfirm && (
                    <DeleteConfirmModal
                        title="Clear Folder"
                        message="This will remove all notes."
                        confirmText="Clear"
                        cancelText="Cancel"
                        onCancel={() => {
                            setShowClearConfirm(false);
                            setShowMainContent(true);
                        }}
                        onConfirm={async () => {
                            await onClearFolder(folder);

                            setShowClearConfirm(false);

                            setShowMainContent(true);
                        }}
                    />
                )
            }
            <Toast
                message={toast}
            />
        </div >
    );
}

export default NoteFolderViewModal;