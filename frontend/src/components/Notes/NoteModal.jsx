import {
    useState,
    useRef,
    useEffect,
} from "react";

import { X } from "lucide-react";

function NoteModal({
    onClose,
    onSave,
    mode = "create",
    note = null,
}) {
    const noteInputRef = useRef(null);

    const [title, setTitle] =
        useState("");

    const [content, setContent] =
        useState("");

    useEffect(() => {
        noteInputRef.current?.focus();

        if (mode === "edit" && note) {
            setTitle(note.title || "");

            setContent(
                note.content || ""
            );
        }
    }, [mode, note]);

    const inputStyle = {
        width: "100%",

        padding: "14px 18px",

        background:
            "rgba(255,255,255,0.05)",

        border:
            "1px solid rgba(255,255,255,0.08)",

        borderRadius: "16px",

        color:
            "var(--text-primary)",

        fontSize: "0.95rem",

        outline: "none",
    };

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,

                background:
                    "rgba(0,0,0,0.55)",

                backdropFilter:
                    "blur(12px)",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                zIndex: 1000,
            }}
        >
            <div
                onClick={(e) =>
                    e.stopPropagation()
                }
                style={{
                    width: "650px",

                    background:
                        "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",

                    border:
                        "1px solid rgba(255,255,255,0.10)",

                    borderRadius: "32px",

                    backdropFilter:
                        "blur(30px)",

                    boxShadow:
                        "0 20px 60px rgba(0,0,0,0.35)",

                    padding: "36px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "20px",
                }}
            >
                <div
                    style={{
                        display: "flex",

                        justifyContent: "space-between",

                        alignItems: "center",
                    }}
                >
                    <h2
                        style={{
                            fontWeight: "400",
                            fontSize: "1.4rem",
                        }}
                    >
                        {mode === "edit"
                            ? "Edit Note"
                            : "New Note"}
                    </h2>

                    <X
                        size={18}
                        strokeWidth={1.5}
                        style={{
                            cursor: "pointer",

                            transition:
                                "all 0.2s ease",
                        }}
                        onClick={onClose}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.opacity =
                                "0.7";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.opacity =
                                "1";
                        }}
                    />
                </div>

                <input
                    ref={noteInputRef}
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    placeholder="Title"
                    style={{
                        width: "100%",

                        background: "transparent",

                        border: "none",

                        outline: "none",

                        color:
                            "var(--text-primary)",

                        fontSize: "1.2rem",

                        fontWeight: "300",

                        letterSpacing: "-0.03em",

                        padding: "0 0 12px 0",

                        borderBottom:
                            "1px solid rgba(255,255,255,0.06)",
                    }}
                />

                <textarea
                    value={content}
                    onChange={(e) =>
                        setContent(e.target.value)
                    }
                    rows={3}
                    placeholder="Start Writing..."
                    style={{
                        width: "100%",
                        height: "300px",

                        background:
                            "transparent",

                        border: "none",

                        outline: "none",

                        resize: "none",

                        color: "var(--text-primary)",

                        fontFamily: "inherit",

                        fontSize: "0.95rem",
                    }}
                />

                <div
                    style={{
                        display: "flex",

                        justifyContent:
                            "flex-end",

                        gap: "12px",

                        marginTop: "8px",
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            background: "transparent",

                            border: "1px solid rgba(255,255,255,0.08)",

                            borderRadius: "999px",

                            padding: "8px 14px",

                            color: "#ff6b6b",

                            fontSize: "0.85rem",

                            fontWeight: "400",

                            cursor: "pointer",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color =
                                "#ff6b6b";

                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.04)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color =
                                "#ff6b6b";

                            e.currentTarget.style.background =
                                "transparent";
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => {
                            onSave({
                                ...note,

                                title,

                                content,
                            });
                        }}
                        style={{
                            background: "transparent",

                            border: "1px solid rgba(255,255,255,0.08)",

                            borderRadius: "999px",

                            padding: "8px 14px",

                            color: "var(--text-secondary)",

                            fontSize: "0.85rem",

                            fontWeight: "400",

                            cursor: "pointer",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color =
                                "var(--text-primary)";

                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.04)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color =
                                "var(--text-secondary)";

                            e.currentTarget.style.background =
                                "transparent";
                        }}
                    >
                        {mode === "edit"
                            ? "Save Note"
                            : "Create Note"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NoteModal;