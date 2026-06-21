import GlassCard from "../GlassCard";

import {
    Pin,
    Pencil,
    Trash2
} from "lucide-react";

import {
    updateNote,
    deleteNote,
} from "../../services/noteService";

const categoryColors = {
    Work: {
        background: "#ffefb333",
        border: "#ffefb366",
    },

    Study: {
        background: "#7a553a33",
        border: "#7a553a66",
    },

    Personal: {
        background: "#52677d33",
        border: "#52677d66",
    },

    Health: {
        background: "#b0896833",
        border: "#b0896866",
    },
};

function PinnedNotes({
    notes,
    setNotes,
    setToast,
    onEditNote,
    onClearAll,
}) {
    const pinnedNotes =
        notes.filter(
            (note) => note.pinned
        );
    return (
        <GlassCard minHeight="520px">
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                }}
            >
                <h2
                    style={{
                        fontWeight: "400",
                        letterSpacing: "-0.02em",
                    }}
                >
                    Pinned
                </h2>

                <button
                    onClick={onClearAll}
                    disabled={pinnedNotes.length === 0}
                    style={{
                        background: "transparent",

                        border: "1px solid rgba(255,255,255,0.08)",

                        borderRadius: "999px",

                        padding: "8px 14px",

                        color:
                            pinnedNotes.length === 0
                                ? "rgba(255,255,255,0.25)"
                                : "var(--text-secondary)",

                        fontSize: "0.8rem",

                        fontWeight: "300",

                        cursor:
                            pinnedNotes.length === 0
                                ? "not-allowed"
                                : "pointer",

                        transition: "all 0.2s ease",

                        opacity:
                            pinnedNotes.length === 0
                                ? 0.5
                                : 1,
                    }}
                    onMouseEnter={(e) => {
                        if (pinnedNotes.length === 0) return;

                        e.currentTarget.style.color =
                            "var(--text-primary)";

                        e.currentTarget.style.background =
                            "rgba(255,255,255,0.04)";
                    }}
                    onMouseLeave={(e) => {
                        if (pinnedNotes.length === 0) return;

                        e.currentTarget.style.color =
                            "var(--text-secondary)";

                        e.currentTarget.style.background =
                            "transparent";
                    }}
                >
                    Unpin all
                </button>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",

                    maxHeight: "600px",

                    overflowY: "auto",

                    paddingRight: "4px",
                }}
            >
                {pinnedNotes.length === 0 ? (
                    <p
                        style={{
                            color: "var(--text-secondary)",
                            fontSize: "0.85rem",
                            textAlign: "left",
                            padding: "24px 0",
                        }}
                    >
                        Nothing pinned yet.
                    </p>
                ) : (
                    pinnedNotes.map((note) => (
                        <div
                            key={note._id}
                            style={{
                                padding: "10px 12px",

                                borderRadius: "12px",

                                transition: "all 0.2s ease",

                                cursor: "pointer",
                            }}
                            onClick={() =>
                                onEditNote(note)
                            }
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.04)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "transparent";
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <Pin
                                    fill="currentColor"

                                    size={16}
                                    strokeWidth={1.5}
                                    style={{
                                        cursor: "pointer",

                                        transition:
                                            "all 0.2s ease",

                                        flexShrink: 0,
                                    }}
                                    onClick={async (e) => {
                                        e.stopPropagation();

                                        try {
                                            const updatedNote =
                                                await updateNote(
                                                    note._id,
                                                    {
                                                        pinned: false,
                                                    }
                                                );

                                            setNotes((prev) =>
                                                prev.map((n) =>
                                                    n._id ===
                                                        updatedNote._id
                                                        ? updatedNote
                                                        : n
                                                )
                                            );

                                            setToast(
                                                "Note unpinned"
                                            );

                                            setTimeout(() => {
                                                setToast("");
                                            }, 3000);

                                        } catch (error) {
                                            console.error(error);

                                            setToast(
                                                "Failed to unpin note"
                                            );

                                            setTimeout(() => {
                                                setToast("");
                                            }, 3000);
                                        }
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.opacity =
                                            "0.7";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.opacity =
                                            "1";
                                    }}
                                />

                                <h4
                                    style={{
                                        fontWeight: "300",
                                        letterSpacing: "-0.015em",
                                    }}
                                >
                                    {note.title}
                                </h4>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "8px",
                                    flexWrap: "wrap",
                                    marginTop: "8px",
                                    marginBottom: "12px",
                                }}
                            >
                                {note.categories?.map((item) => (
                                    <span
                                        key={item}
                                        style={{
                                            padding: "4px 8px",

                                            borderRadius: "999px",

                                            fontSize: "0.7rem",

                                            background:
                                                categoryColors[item]
                                                    ?.background,

                                            border:
                                                `1px solid ${categoryColors[item]
                                                    ?.border
                                                }`,

                                            color:
                                                "var(--text-secondary)",
                                        }}
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>

                            <p
                                style={{
                                    color:
                                        "var(--text-secondary)",

                                    display: "-webkit-box",

                                    WebkitLineClamp: 3,

                                    WebkitBoxOrient:
                                        "vertical",

                                    overflow: "hidden",

                                    marginTop: "6px",

                                    fontSize: "0.85rem",
                                }}
                            >
                                {note.content}
                            </p>

                            <p
                                style={{
                                    marginTop: "10px",

                                    fontSize: "0.75rem",

                                    color:
                                        "var(--text-secondary)",

                                    opacity: 0.8,
                                }}
                            >
                                {new Date(
                                    note.createdAt
                                ).toLocaleDateString()}
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    gap: "12px",
                                    marginTop: "12px",
                                }}
                            >
                                <Pencil
                                    size={16}
                                    strokeWidth={1.5}
                                    style={{
                                        cursor: "pointer",
                                        transition:
                                            "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            "#F5F5F5";

                                        e.currentTarget.style.transform =
                                            "scale(1.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color =
                                            "";

                                        e.currentTarget.style.transform =
                                            "scale(1)";
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        onEditNote(note);
                                    }}
                                />

                                <Trash2
                                    size={16}
                                    strokeWidth={1.5}
                                    style={{
                                        cursor: "pointer",
                                        transition:
                                            "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            "#ff6b6b";

                                        e.currentTarget.style.transform =
                                            "scale(1.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color =
                                            "";

                                        e.currentTarget.style.transform =
                                            "scale(1)";
                                    }}
                                    onClick={async (e) => {
                                        e.stopPropagation();

                                        try {
                                            await deleteNote(
                                                note._id
                                            );

                                            setNotes((prev) =>
                                                prev.filter(
                                                    (n) =>
                                                        n._id !== note._id
                                                )
                                            );

                                            setToast(
                                                "Note deleted"
                                            );

                                            setTimeout(() => {
                                                setToast("");
                                            }, 4000);

                                        } catch (error) {
                                            console.error(error);

                                            setToast(
                                                "Failed to delete note"
                                            );

                                            setTimeout(() => {
                                                setToast("");
                                            }, 3000);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </GlassCard>
    );
}

export default PinnedNotes;