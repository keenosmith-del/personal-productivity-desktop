function DashboardNotePreviewCard({
    note,
    onClick,
}) {
    if (!note) return null;

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();

                onClick?.();
            }}
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

                cursor: "pointer",

                transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                    "translateY(-2px)";

                e.currentTarget.style.background =
                    "rgba(15,15,15,0.2)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                    "translateY(0)";

                e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.025)";
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