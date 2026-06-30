import DashboardNotePreviewCard from "./DashboardNotePreviewCard";

function DashboardNotesCard({
    notes = [],
    onNoteClick,
}) {
    const visibleNotes =
        notes.slice(0, 2);

    const remainingNotes =
        notes.length - 2;

    return (
        <div
            style={{
                background:
                    "var(--glass-bg)",

                border:
                    "1px solid var(--glass-border)",

                borderRadius:
                    "var(--radius-large)",

                backdropFilter:
                    "blur(20px)",

                WebkitBackdropFilter:
                    "blur(20px)",

                padding: "24px",

                cursor: "default",

                transition:
                    "all 0.2s ease",

                display: "flex",

                flexDirection:
                    "column",

                gap: "18px",

                minHeight: "240px",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                    "translateY(-1px)";

                e.currentTarget.style.background =
                    "rgba(255,255,255,0.03)";
            }}
            onMouseLeave={(e) => {

                e.currentTarget.style.transform =
                    "translateY(0)";

                e.currentTarget.style.background =
                    "var(--glass-bg)";
            }}
        >
            {/* HEADER */}

            <div
                style={{
                    display: "flex",

                    justifyContent:
                        "space-between",

                    alignItems:
                        "center",
                }}
            >
                <div>
                    <div
                        style={{
                            fontSize:
                                "0.82rem",

                            fontWeight:
                                "300",

                            opacity: 0.55,
                        }}
                    >
                        Recent Notes
                    </div>
                </div>
            </div>

            {/* PREVIEWS */}

            <div
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "1fr 1fr",

                    gap: "16px",
                }}
            >
                {visibleNotes.map(
                    (note) => (
                        <DashboardNotePreviewCard
                            key={note._id}
                            note={note}
                            onClick={() =>
                                onNoteClick?.(note)
                            }
                        />
                    )
                )}
            </div>
        </div>
    );
}

export default DashboardNotesCard;