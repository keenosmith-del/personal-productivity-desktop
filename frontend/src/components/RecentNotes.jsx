import GlassCard from "./GlassCard";
import {
    Pin,
    Pencil,
    Trash2,
} from "lucide-react";

function RecentNotes() {
    const notes = [
        {
            title: "Meeting Notes",
            preview:
                "Need to review portfolio and update projects...",
        },
        {
            title: "Project Ideas",
            preview:
                "AI productivity dashboard improvements...",
        },
    ];

    return (
        <GlassCard>
            <h2
                style={{
                    marginBottom: "24px",
                }}
            >
                Recent Notes
            </h2>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                {notes.map((note) => (
                    <div
                        key={note.title}
                        style={{
                            padding: "14px",

                            background:
                                "rgba(255,255,255,0.04)",

                            border:
                                "1px solid var(--glass-border)",

                            borderRadius: "12px",

                            transition:
                                "all 0.25s ease",

                            cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(14,17,22,0.75)";

                            e.currentTarget.style.transform =
                                "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.04)";

                            e.currentTarget.style.transform =
                                "translateY(0)";
                        }}
                    >
                        <h4
                            style={{
                                fontWeight: "500",
                                marginBottom: "8px",
                            }}
                        >
                            {note.title}
                        </h4>

                        <p
                            style={{
                                color:
                                    "var(--text-secondary)",

                                display: "-webkit-box",

                                WebkitLineClamp: 2,

                                WebkitBoxOrient:
                                    "vertical",

                                overflow: "hidden",

                                marginTop: "6px",

                                fontSize: "0.85rem",
                            }}
                        >
                            {note.preview}
                        </p>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: "12px",
                                marginTop: "12px",
                            }}
                        >
                            <Pin
                                size={16}
                                strokeWidth={1.5}
                                style={{
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
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
                            />

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
                            />
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}

export default RecentNotes;