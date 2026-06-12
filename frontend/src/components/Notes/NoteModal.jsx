import {
    useState,
    useRef,
    useEffect,
} from "react";

import { X } from "lucide-react";

function NoteModal({
    onClose,
    mode = "create",
    note = null,
}) {
    const noteInputRef = useRef(null);

    useEffect(() => {
        noteInputRef.current?.focus();
    }, []);

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
                    width: "600px",

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

                        justifyContent:
                            "space-between",

                        alignItems: "center",
                    }}
                >
                    <h2
                        style={{
                            fontWeight: "400",
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
                    placeholder="Title"
                    style={inputStyle}
                />

                <textarea
                    rows={12}
                    placeholder="Start writing..."
                    style={{
                        ...inputStyle,

                        resize: "none",

                        fontFamily:
                            "inherit",

                        lineHeight: 1.2,
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
                            padding: "14px 18px",

                            background:
                                "transparent",

                            border:
                                "1px solid rgba(255,255,255,0.08)",

                            borderRadius: "16px",

                            color: "#ff6b6b",

                            cursor: "pointer",

                            fontWeight: "400",

                            transition:
                                "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,107,107,0.08)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "transparent";
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        style={{
                            padding: "14px 18px",

                            background:
                                "var(--glass-bg)",

                            border:
                                "1px solid var(--glass-border)",

                            borderRadius: "16px",

                            color:
                                "var(--text-primary)",

                            cursor: "pointer",

                            fontWeight: "400",

                            transition:
                                "var(--transition)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "var(--glass-hover)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "var(--glass-bg)";
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