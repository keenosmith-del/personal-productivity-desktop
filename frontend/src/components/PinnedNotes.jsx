import GlassCard from "./GlassCard";
import { Pin } from "lucide-react";

function PinnedNotes({
    onEditNote,
    onUnpinNote,
}) {
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
                onClick={() =>
                    onEditNote({
                        title:
                            "Portfolio Ideas",
                    })
                }
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
                        fontWeight: "300",
                        letterSpacing: "-0.015em",
                    }}
                >
                    Portfolio Ideas
                </h4>

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
                    <Pin
                        fill="currentColor"
                        size={16}
                        strokeWidth={1.5}
                        style={{
                            cursor: "pointer",

                            transition:
                                "all 0.2s ease",
                        }}
                        onClick={(e) => {
                            e.stopPropagation();

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
                </div>
            </div>
        </GlassCard>
    );
}

export default PinnedNotes;