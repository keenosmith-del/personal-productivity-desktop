import GlassCard from "../GlassCard";
import { useState } from "react";

import {
    Pin,
    Pencil,
    Trash2,
} from "lucide-react";

function RecentNotes({
    onNewNote,
    onEditNote,
    onPinNote,
}) {
    // COMPONENT STATES
    const notes = [
        {
            title: "Meeting Notes",

            category: "Work",

            project: "Portfolio",

            date: "12 Jun 2026",

            preview: "Need to review portfolio and update projects before the next application cycle begins.",
        },

        {
            title: "Project Ideas",

            category: "Study",

            project:
                "Productivity App",

            date: "8 Jun 2026",

            preview:
                "AI productivity dashboard improvements including calendar integration and project tracking.",
        },
    ];

    const [pinnedNotes, setPinnedNotes] =
        useState([]);

    //FUNCTIONS

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
                    Notes
                </h2>

                <button
                    onClick={onNewNote}
                    style={{
                        background: "transparent",
                        border: "none",

                        color:
                            "var(--text-secondary)",

                        display: "flex",
                        alignItems: "center",

                        gap: "6px",

                        cursor: "pointer",

                        fontSize: "0.9rem",

                        fontWeight: "400",

                        transition:
                            "all 0.2s ease",
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
                    + New Note
                </button>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                {notes.map((note) => (
                    <div
                        onClick={() =>
                            onEditNote(note)
                        }
                        key={note.title}
                        style={{
                            padding: "10px 12px",

                            borderRadius: "12px",

                            transition: "all 0.2s ease",

                            cursor: "pointer",
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
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginBottom: "8px",
                            }}
                        >
                            <Pin
                                size={16}
                                strokeWidth={1.5}
                                style={{
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    flexShrink: 0,
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
                                fill={
                                    pinnedNotes.includes(
                                        note.title
                                    )
                                        ? "currentColor"
                                        : "none"}
                                onClick={(e) => {
                                    e.stopPropagation();

                                    setPinnedNotes((prev) =>
                                        prev.includes(note.title)
                                            ? prev.filter(
                                                (n) =>
                                                    n !== note.title
                                            )
                                            : [
                                                ...prev,
                                                note.title,
                                            ]
                                    );

                                    onPinNote();
                                }}
                            />

                            <h4
                                style={{
                                    fontWeight: "300",
                                }}
                            >
                                {note.title}
                            </h4>
                            </div>

                            <div
                                style={{
                                    display: "flex",

                                    gap: "8px",

                                    marginBottom: "10px",
                                }}
                            >
                                <span
                                    style={{
                                        padding: "4px 8px",

                                        borderRadius: "999px",

                                        fontSize: "0.7rem",

                                        background: "rgba(61,63,74,0.20)",

                                        border: "1px solid rgba(61,63,74,0.40)",

                                        color:
                                            "var(--text-secondary)",
                                    }}
                                >
                                    {note.category}
                                </span>

                                <span
                                    style={{
                                        padding: "4px 8px",

                                        borderRadius: "999px",

                                        fontSize: "0.7rem",

                                        background:
                                            "rgba(82,103,125,0.20)",

                                        border:
                                            "1px solid rgba(82,103,125,0.40)",

                                        color:
                                            "var(--text-secondary)",
                                    }}
                                >
                                    {note.project}
                                </span>
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
                            {note.preview}
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
                            {note.date}
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
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}

export default RecentNotes;