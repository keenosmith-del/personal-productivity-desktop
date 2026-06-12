import GlassCard from "../GlassCard";

import { useState } from "react";

import {
    Pin,
    Pencil,
    Trash2
} from "lucide-react";

function PinnedNotes({
    onEditNote,
    onUnpinNote,
}) {
    // COMPONENT STATES
    const [isPinned,
        setIsPinned] =
        useState(true);

    const note = {
        title: "Portfolio Ideas",
        category: "Goal",
        project: "Portfolio",
        date: "10 Jun 2026",
    };

    // FUNCTIONS
    return (
        <GlassCard minHeight="520px">
            <h2
                style={{
                    marginBottom: "24px",
                    fontWeight: "400",
                    letterSpacing: "-0.02em",
                }}
            >
                Pinned
            </h2>

            <div
                style={{
                    padding: "10px 12px",

                    borderRadius: "12px",

                    transition: "all 0.2s ease",

                    cursor: "pointer",
                }}
                onClick={() =>
                    onEditNote({
                        title: "Portfolio Ideas",
                    })
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
                        fill={
                            isPinned
                                ? "currentColor"
                                : "none"
                        }
                        size={16}
                        strokeWidth={1.5}
                        style={{
                            cursor: "pointer",

                            transition:
                                "all 0.2s ease",

                            flexShrink: 0,
                        }}
                        onClick={(e) => {
                            e.stopPropagation();

                            setIsPinned(
                                (prev) => !prev
                            );

                            onUnpinNote();
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
                        Portfolio Ideas
                    </h4>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginTop: "8px",
                        marginBottom: "12px",
                    }}
                >
                    <span
                        style={{
                            padding: "4px 8px",

                            borderRadius: "999px",

                            fontSize: "0.7rem",

                            background:
                                "rgba(197,156,112,0.20)",

                            border:
                                "1px solid rgba(197,156,112,0.40)",

                            color:
                                "var(--text-secondary)",
                        }}
                    >
                        Goal
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
                        Portfolio
                    </span>
                </div>

                <p
                    style={{
                        color:
                            "var(--text-secondary)",

                        marginTop: "6px",

                        fontSize: "0.85rem",
                    }}
                >
                    Potential improvements for project
                    showcase and UI polish...
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
                    10 Jun 2026
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
        </GlassCard>
    );
}

export default PinnedNotes;