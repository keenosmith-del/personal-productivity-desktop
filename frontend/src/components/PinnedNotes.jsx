import GlassCard from "./GlassCard";
import {
    Pin,
    Pencil,
    Trash2,
} from "lucide-react";

function PinnedNotes() {
    return (
        <GlassCard>
            <h2
                style={{
                    marginBottom: "24px",
                }}
            >
                Pinned Notes
            </h2>

            <div
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
                <h4>Portfolio Ideas</h4>

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

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "12px",
                        marginTop: "12px",
                    }}
                >
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
        </GlassCard>
    );
}

export default PinnedNotes;