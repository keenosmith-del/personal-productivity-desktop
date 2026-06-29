function DashboardNotePreviewCard({
    note,
}) {
    if (!note) return null;

    return (
        <div
            style={{
                width: "100%",

                height: "150px",

                background:
                    "rgba(255,255,255,0.025)",

                border:
                    "1px solid rgba(255,255,255,0.06)",

                borderRadius: "20px",

                padding: "16px",

                display: "flex",

                flexDirection: "column",

                overflow: "hidden",
            }}
        >
            {/* TITLE */}

            <div
                style={{
                    fontSize: "0.82rem",

                    fontWeight: "350",

                    letterSpacing: "-0.02em",

                    marginBottom: "10px",

                    display:
                        "-webkit-box",

                    WebkitLineClamp: 2,

                    WebkitBoxOrient:
                        "vertical",

                    overflow:
                        "hidden",
                }}
            >
                {note.title}
            </div>

            {/* CONTENT */}

            <div
                style={{
                    fontSize: "0.68rem",

                    lineHeight: 1.4,

                    opacity: 0.55,

                    display:
                        "-webkit-box",

                    WebkitLineClamp: 5,

                    WebkitBoxOrient:
                        "vertical",

                    overflow:
                        "hidden",
                }}
            >
                {note.content ||
                    "Empty note."}
            </div>

            <div
                style={{
                    flex: 1,
                }}
            />
        </div>
    );
}

export default DashboardNotePreviewCard;