import {
    Folder,
    Ellipsis,
    Heart,
    Flag,
} from "lucide-react";

import { useState, useEffect } from "react";

import Toast from "../Toast";

import NoteModal from "../Notes/NoteModal";
import { updateNote, deleteNote } from "../../services/noteService";

function NoteFolderViewModal({
    folder,

    onShowAll,
    onShowLess,

    onToggleLike,
    onToggleFlag,

    onRemoveNote,
    onDeleteNote,

    onUpdateNote,

    onClose,

    // expanded,
    // remainingCouunt,
    // notes,
}) {
    // placeholder until folder-note relationship is wired
    const notes =
        folder.notes || [];

    const expanded = false;

    const remainingCount = 0;

    const date = new Date();

    // states
    const [editingNote, setEditingNote] =
        useState(null);

    const [toast, setToast] =
        useState("");

    const [hoveredCard, setHoveredCard] =
        useState(null);

    // ellipsis on note preview card
    const [openNoteMenu, setOpenNoteMenu] =
        useState(null);

    // one modal open at a time
    const [showMainContent, setShowMainContent] = useState(true);

    const [showCloseButton, setShowCloseButton] =
        useState(false);

    const [showDeleteConfirm, setShowDeleteConfirm] =
        useState(false);

    // handle
    const handleNoteClick = (note) => {

        setShowMainContent(false);

        setEditingNote(note);
    };

    const handleShowAll = () => {
        // build
    };

    const handleShowLess = () => {
        // build
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

    // need const formatCreatedDate


    // glass drop down needs to be redesigned across app
    const menuItemStyle = {
        width: "100%",

        padding: "10px 12px",

        background: "transparent",

        border: "none",

        color: "var(--text-primary)",

        textAlign: "left",

        fontSize: "0.8rem",

        fontWeight: "300",

        cursor: "pointer",

        transition: "all 0.2s ease",
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
                            onMouseEnter={() =>
                                setShowCloseButton(true)
                            }
                            onMouseLeave={() =>
                                setShowCloseButton(false)
                            }
                        >
                            <button
                                onClick={() => {
                                    onClose();
                                }}
                                style={{
                                    width: "30px",
                                    height: "30px",

                                    borderRadius: "999px",

                                    border: "none",

                                    background:
                                        "rgba(255,255,255,0.04)",

                                    color:
                                        "var(--text-secondary)",

                                    cursor: "pointer",

                                    fontSize: "0.8rem",

                                    transition: "all 0.2s ease",

                                    opacity: showCloseButton ? 1 : 0,

                                    transition: "opacity 0.2s ease",
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

                    {/* Folder Title */}
                    {!expanded && (
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
                                <Folder
                                    size={18}
                                    strokeWidth={1.8}
                                    style={{
                                        marginRight: "8px",
                                        verticalAlign: "middle",
                                        color: "var(--text-secondary)",
                                    }}
                                />

                                {folder.title}
                            </div>

                            <div
                                style={{
                                    fontSize: "0.9rem",

                                    opacity: 0.55,

                                    marginTop: "4px",
                                }}
                            >
                                {folder.description || "No description"}
                            </div>

                            <div
                                style={{
                                    fontSize: "0.75rem",

                                    opacity: 0.4,

                                    marginTop: "8px",
                                }}
                            >
                                Showing 4 out of 6 notes
                            </div>
                        </div>
                    )}

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

                        {notes.length === 0 ? (
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
                                {notes.map((note) => {
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

                                                        setOpenNoteMenu(
                                                            openNoteMenu === note._id
                                                                ? null
                                                                : note._id
                                                        );
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
                                                        size={18}
                                                        strokeWidth={1.6}
                                                    />
                                                    {openNoteMenu === note._id && (
                                                        <div
                                                            onClick={(e) => e.stopPropagation()}
                                                            style={{
                                                                position: "absolute",

                                                                top: "26px",
                                                                right: 0,

                                                                width: "165px",

                                                                background:
                                                                    "rgba(20,20,20,0.96)",

                                                                backdropFilter:
                                                                    "blur(20px)",

                                                                border:
                                                                    "1px solid rgba(255,255,255,0.08)",

                                                                borderRadius: "16px",

                                                                overflow: "hidden",

                                                                zIndex: 1000,
                                                            }}
                                                        >

                                                            <div
                                                                style={{
                                                                    height: "1px",
                                                                    background: "rgba(255,255,255,0.06)",
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

                                                    WebkitLineClamp: 3,

                                                    WebkitBoxOrient:
                                                        "vertical",

                                                    overflow:
                                                        "hidden",
                                                }}
                                            >
                                                {note.content || "Empty note."}
                                            </div>


                                            {/* ROW 3 NOTE CREATED DATE ? */}
                                            <div
                                                style={{
                                                    fontSize: "0.72rem",

                                                    opacity: 0.55,

                                                    marginBottom: "6px",
                                                }}
                                            >
                                                Created 12 July, 2026
                                            </div>

                                            {/* ROW 4 HOVER ACTIONS */}

                                            <div
                                                style={{
                                                    marginTop: "auto",

                                                    display: "flex",

                                                    justifyContent: "space-between",

                                                    alignItems: "center",

                                                    transition:
                                                        "opacity 0.2s ease",
                                                }}
                                            >
                                                <button
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
                                                </button>

                                                <button
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
                                                </button>
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
                            +2 others
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
                            onClick={() =>
                                setShowDeleteConfirm(true)
                            }
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
                            Clear Folder
                        </button>

                        <button
                            onClick={() =>
                                setShowDeleteConfirm(true)
                            }
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
            )}
            {/* open modal from individual */}
            {editingNote && (
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
            )}
            <Toast
                message={toast}
            />
        </div >
    );
}

export default NoteFolderViewModal;