function DashboardPreviewCard({
    item,
    onClick,
}) {
    if (!item) return null;

    const priorityStyles = {
        Low: {
            bg: "#273c4133",
            border: "#273c4166",
        },

        Medium: {
            bg: "#5e687433",
            border: "#5e687466",
        },

        High: {
            bg: "#6b544733",
            border: "#6b544766",
        },
    };

    const categoryStyles = {
        Work: {
            bg: "#466a6d33",
            border: "#466a6d66",
        },

        Study: {
            bg: "#536b8333",
            border: "#536b8366",
        },

        Personal: {
            bg: "#6f5f7a33",
            border: "#6f5f7a66",
        },

        default: {
            bg: "#57707a33",
            border: "#57707a66",
        },
    };

    const statusStyles = {
        Active: {
            bg: "#4d689333",
            border: "#4d689366",
        },

        Paused: {
            bg: "#45575b33",
            border: "#45575b66",
        },

        "In Progress": {
            bg: "#a45d4433",
            border: "#a45d4466",
        },

        default: {
            bg: "rgba(114,138,110,0.12)",
            border:
                "rgba(114,138,110,0.25)",
        },
    };

    const priorityStyle =
        priorityStyles[
        item.priority
        ] ||
        priorityStyles.Medium;

    const categoryStyle =
        categoryStyles[
        item.category
        ] ||
        categoryStyles.default;

    const statusStyle =
        statusStyles[
        item.status
        ] ||
        statusStyles.default;

    const chips =
        item.linkedItems?.length > 0
            ? item.linkedItems
            : ["NL"];

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
            style={{
                width: "100%",
                height: "100%",

                cursor: "pointer",

                transition: "all 0.2s ease",

                background:
                    "rgba(255,255,255,0.025)",

                border:
                    "1px solid rgba(255,255,255,0.06)",

                borderRadius: "20px",

                padding: "14px",

                display: "flex",

                flexDirection: "column",
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
            {/* PRIORITY */}

            <span
                style={{
                    alignSelf: "flex-start",

                    padding: "3px 8px",

                    borderRadius:
                        "999px",

                    fontSize: "0.62rem",

                    background:
                        priorityStyle.bg,

                    border: `1px solid ${priorityStyle.border}`,
                }}
            >
                {item.priority}
            </span>

            {/* CATEGORY + STATUS */}

            <div
                style={{
                    display: "flex",

                    gap: "6px",

                    marginTop: "8px",

                    marginBottom:
                        "10px",
                }}
            >
                <span
                    style={{
                        padding:
                            "3px 8px",

                        borderRadius:
                            "999px",

                        fontSize:
                            "0.6rem",

                        background:
                            categoryStyle.bg,

                        border: `1px solid ${categoryStyle.border}`,
                    }}
                >
                    {item.category}
                </span>

                <span
                    style={{
                        padding:
                            "3px 8px",

                        borderRadius:
                            "999px",

                        fontSize:
                            "0.6rem",

                        background:
                            statusStyle.bg,

                        border: `1px solid ${statusStyle.border}`,
                    }}
                >
                    {item.status}
                </span>
            </div>

            {/* TITLE */}

            <div
                style={{
                    fontSize: "0.82rem",

                    fontWeight: "350",

                    letterSpacing:
                        "-0.02em",

                    marginBottom: "8px",

                    display:
                        "-webkit-box",

                    WebkitLineClamp: 2,

                    WebkitBoxOrient:
                        "vertical",

                    overflow:
                        "hidden",
                }}
            >
                {item.title}
            </div>

            {/* DESCRIPTION */}

            <div
                style={{
                    fontSize: "0.68rem",

                    opacity: 0.55,

                    lineHeight: 1.2,

                    display:
                        "-webkit-box",

                    WebkitLineClamp: 2,

                    WebkitBoxOrient:
                        "vertical",

                    overflow:
                        "hidden",
                }}
            >
                {item.description ||
                    "No description provided."}
            </div>

            {/* DIVIDER */}

            <div
                style={{
                    height: "1px",

                    background:
                        "rgba(255,255,255,0.05)",

                    marginTop: "10px",
                    marginBottom: "8px",
                }}
            />

            {/* STACKED ASSOCIATIONS */}

            <div
                style={{
                    display: "flex",
                }}
            >
                {chips.map(
                    (chip, index) => (
                        <div
                            key={`${chip}-${index}`}
                            style={{
                                width: "28px",
                                height: "28px",

                                borderRadius: "50%",

                                marginRight: "-6px",

                                zIndex: index + 1,

                                background:
                                    "linear-gradient(135deg, rgba(87,112,122,0.35), rgba(39,60,65,0.15))",

                                border:
                                    "1px solid rgba(255,255,255,0.06)",

                                backdropFilter:
                                    "blur(20px)",

                                display: "flex",

                                alignItems: "center",

                                justifyContent: "center",

                                fontSize: "0.62rem",

                                color:
                                    "var(--text-secondary)",
                            }}
                        >
                            {chip}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default DashboardPreviewCard;