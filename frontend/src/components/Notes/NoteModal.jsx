// create note ONLY (no edit)
// test

import {
    useState,
    useRef,
    useEffect
} from "react";

import DeleteConfirmModal from "../DeleteConfirmModal";

import {
    NotebookPen,
    Shield,
    LoaderCircle,
    Archive,
    Ellipsis,
} from "lucide-react";

function NoteModal({
    onClose,
    mode = "create",
    note = null,
    onSave,
    onDelete,
}) {
    const noteInputRef = useRef(null);

    const categoryRef = useRef(null);

    const priorityRef = useRef(null);

    const statusRef = useRef(null);

    const [noteName,
        setNoteName] =
        useState(
            note?.title || ""
        );

    const [content,
        setContent] =
        useState(
            note?.content || ""
        );

    const [priority, setPriority] =
        useState(
            note?.priority ||
            "Medium"
        );

    const [category, setCategory] =
        useState(
            note?.category ||
            "Personal"
        );

    const [status, setStatus] =
        useState(
            note?.status ||
            "Active"
        );

    const [activeSelector, setActiveSelector] =
        useState(null);

    const [showDeleteConfirm, setShowDeleteConfirm] =
        useState(false);

    const [titleFocused,
        setTitleFocused] =
        useState(false);

    const [contentFocused,
        setContentFocused] =
        useState(false);

    const [titleError, setTitleError] =
        useState(false);

    const [linkedItems, setLinkedItems] =
        useState(
            note?.linkedItems?.length
                ? note.linkedItems
                : ["NL"]
        );

    const [showCloseButton, setShowCloseButton] =
        useState(false);

    useEffect(() => {
        noteInputRef.current?.focus();
    }, []);

    {/* outside-click of chip dropdown */ }
    useEffect(() => {
        const handleClickOutside = (
            event
        ) => {
            if (
                categoryRef.current &&
                categoryRef.current.contains(
                    event.target
                )
            ) {
                return;
            }

            if (
                priorityRef.current &&
                priorityRef.current.contains(
                    event.target
                )
            ) {
                return;
            }

            if (
                statusRef.current &&
                statusRef.current.contains(
                    event.target
                )
            ) {
                return;
            }

            setActiveSelector(null);
        };

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
    }, []);

    const formattedCreatedDate =
        note?.createdAt
            ? new Date(
                note.createdAt
            ).toLocaleDateString(
                "en-US",
                {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                }
            )
            : null;

    const handleModalOverlayClick = () => {
        onClose();
    };

    const associationOptions = [
        "G",
        "P",
        "N",
        "R",
        "T",
        "NL",
    ];

    const handleSave = () => {
        if (!noteName.trim()) {
            setTitleError(true);

            noteInputRef.current?.focus();

            setTimeout(() => {
                setTitleError(false);
            }, 400);

            return;
        }

        onSave({
            id:
                note?.id ||
                Date.now(),

            title: noteName,

            content,

            priority,

            category,

            status,

            linkedItems,
        });

        onClose();
    };

    const inputStyle = {
        width: "100%",

        padding: "14px 18px",

        background:
            "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",

        border:
            "1px solid rgba(255,255,255,0.12)",

        borderRadius: "16px",

        color:
            "var(--text-primary)",

        fontSize: "0.95rem",

        outline: "none",
    };

    const statusConfig = {
        Active: {
            icon: Shield,
            label: "Active",

            background: "#4d689333",
            border: "#4d689366",
            color: "#8faec0",
        },

        "In Progress": {
            icon: LoaderCircle,
            label: "In Progress",

            background: "#5d766233",
            border: "#5d766266",
            color: "#a8bf9f",
        },

        // paused takes priority over overdue
        Archived: {
            icon: Archive,
            label: "Archived",

            background: "#45575b33",
            border: "#45575b66",
            color: "#9ca9ad",
        },
    };

    const currentStatus =
        statusConfig[status];

    const StatusIcon =
        currentStatus.icon;

    return (
        <div
            onClick={handleModalOverlayClick}
            style={{
                position: "fixed",
                inset: 0,

                background: "rgba(0,0,0,0.35)",

                backdropFilter: "blur(20px)",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                zIndex: 1000,
            }}
        >
            {!showDeleteConfirm && (
                <div
                    onClick={(e) =>
                        e.stopPropagation()
                    }
                    style={{
                        width: "500px",

                        background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",

                        border: "1px solid rgba(255,255,255,0.10)",

                        borderRadius: "36px",

                        backdropFilter: "blur(30px)",

                        boxShadow:
                            "0 30px 80px rgba(0,0,0,0.45)",

                        padding: "36px",

                        display: "flex",

                        flexDirection: "column",

                        // gap: "10px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                            marginBottom: "24px",
                        }}
                    >

                        {/* meatball and x pill - changed to only x */}
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

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >

                        {/* TITLE */}
                        <input
                            ref={noteInputRef}
                            value={noteName}
                            onChange={(e) =>
                                setNoteName(e.target.value)
                            }
                            placeholder="Note"
                            style={{
                                background: "transparent",

                                border: "none",

                                outline: "none",

                                textAlign: "center",

                                color:
                                    "var(--text-primary)",

                                fontSize: "2rem",

                                fontWeight: "300",

                                letterSpacing: "-0.04em",

                                marginBottom: "24px",
                            }}
                        />

                        {/* CONTENT */}
                        <div
                            style={{
                                marginBottom: "20px",
                            }}
                        >

                            <textarea
                                value={content}

                                onChange={(e) =>
                                    setContent(
                                        e.target.value
                                    )
                                }
                                rows={3}
                                placeholder="Start writing..."
                                style={{
                                    width: "100%",

                                    minHeight: "200px",

                                    background:
                                        contentFocused
                                            ? "rgba(255,255,255,0.02)"
                                            : "transparent",

                                    borderRadius: "12px",

                                    padding: "10px 12px",

                                    transition:
                                        "all 0.2s ease",

                                    border: "none",

                                    outline: "none",

                                    resize: "none",

                                    color: "var(--text-primary)",

                                    fontFamily: "inherit",

                                    fontSize: "0.9rem",

                                    fontWeight: "300",
                                }}
                                onFocus={() =>
                                    setContentFocused(true)
                                }

                                onBlur={() =>
                                    setContentFocused(false)
                                }
                            />
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
                        {mode === "edit" && (
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
                                Delete
                            </button>
                        )}

                        <button
                            onClick={handleSave}
                            style={{
                                padding: "8px 14px",

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
                            {mode === "edit"
                                ? "Save"
                                : "Create"}
                        </button>
                    </div>
                </div>
            )}
            {showDeleteConfirm && (
                <DeleteConfirmModal
                    title="Delete note?"
                    message="This action cannot be undone."

                    onCancel={() => {
                        setShowDeleteConfirm(false);
                    }}

                    onConfirm={async () => {
                        await onDelete(note._id);

                        setShowDeleteConfirm(false);

                        onClose();
                    }}
                />
            )}
        </div>
    );
}

export default NoteModal;