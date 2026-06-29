import DashboardPreviewCard from "./DashboardPreviewCard";

function DashboardWideCard({
    title,
    items = [],
    maxVisibleItems = 3,
    maxAvatars = 5,
    onClick,
}) {
    const visibleItems =
        items.slice(
            0,
            maxVisibleItems
        );

    const remainingItems =
        items.length -
        maxVisibleItems;

    const visibleAvatars =
        items.slice(
            0,
            maxAvatars
        );

    const remainingAvatars =
        items.length -
        maxAvatars;

    const getLetter = (
        item
    ) => {
        if (
            item.reminderDate
        ) {
            return "R";
        }

        if (
            item.targetDate
        ) {
            return "G";
        }

        if (
            item.dueDate &&
            item.linkedProjects !==
            undefined
        ) {
            return "T";
        }

        return "P";
    };

    return (
        <div
            onClick={onClick}
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

                minHeight:
                    "240px",

                padding:
                    "24px",

                cursor:
                    onClick
                        ? "pointer"
                        : "default",

                transition:
                    "all 0.2s ease",

                display: "grid",

                gridTemplateColumns:
                    "1fr 200px",

                gap: "32px",

                alignItems: "start",
            }}
            onMouseEnter={(e) => {
                if (
                    !onClick
                ) {
                    return;
                }

                e.currentTarget.style.transform =
                    "translateY(-1px)";

                e.currentTarget.style.background =
                    "rgba(255,255,255,0.03)";
            }}
            onMouseLeave={(e) => {
                if (
                    !onClick
                ) {
                    return;
                }

                e.currentTarget.style.transform =
                    "translateY(0)";

                e.currentTarget.style.background =
                    "var(--glass-bg)";
            }}
        >
            {/* LEFT*/}
            <div
                style={{
                    display: "flex",

                    flexDirection:
                        "column",

                    gap: "12px",
                }}
            >
                {/* HEADER */}
                <div
                    style={{
                        display: "flex",

                        flexDirection:
                            "column",

                        gap: "14px",
                    }}
                >
                    <div
                        style={{
                            fontSize:
                                "0.82rem",

                            fontWeight:
                                "300",

                            opacity: 0.55,
                        }}
                    >
                        {title}
                    </div>
                </div>

                {/* today count */}
                <div
                    style={{
                        display: "flex",

                        alignItems:
                            "center",

                    }}
                >
                    <div
                        style={{
                            fontSize:
                                "2rem",

                            fontWeight:
                                "300",

                            letterSpacing:
                                "-0.04em",
                        }}
                    >
                        {items.length}
                    </div>
                </div>

                {/* STACKED AVATARS */}
                <div
                    style={{
                        display: "flex",

                        alignItems:
                            "center",
                    }}
                >
                    {visibleAvatars.map(
                        (
                            item,
                            index
                        ) => (
                            <div
                                key={
                                    item._id
                                }
                                style={{
                                    width:
                                        "28px",

                                    height:
                                        "28px",

                                    borderRadius:
                                        "50%",

                                    marginRight:
                                        "-6px",

                                    zIndex:
                                        index +
                                        1,

                                    background:
                                        "linear-gradient(135deg, rgba(87,112,122,0.35), rgba(39,60,65,0.15))",

                                    border:
                                        "1px solid rgba(255,255,255,0.06)",

                                    backdropFilter:
                                        "blur(20px)",

                                    display:
                                        "flex",

                                    alignItems:
                                        "center",

                                    justifyContent:
                                        "center",

                                    fontSize:
                                        "0.62rem",

                                    color:
                                        "var(--text-secondary)",
                                }}
                            >
                                {getLetter(
                                    item
                                )}
                            </div>
                        )
                    )}

                    {remainingAvatars >
                        0 && (
                            <div
                                style={{
                                    marginLeft:
                                        "12px",

                                    fontSize:
                                        "0.72rem",

                                    opacity: 0.45,
                                }}
                            >
                                +
                                {
                                    remainingAvatars
                                }
                            </div>
                        )}
                </div>

                {/* TITLES */}

                <div
                    style={{
                        display: "flex",

                        flexDirection:
                            "column",

                        gap: "2px",

                    }}
                >
                    {visibleItems.map(
                        (
                            item
                        ) => (
                            <div
                                key={
                                    item._id
                                }
                                style={{
                                    fontSize:
                                        "0.78rem",

                                    fontWeight:
                                        "300",

                                    whiteSpace:
                                        "nowrap",

                                    overflow:
                                        "hidden",

                                    textOverflow:
                                        "ellipsis",

                                    opacity:
                                        0.85,
                                }}
                            >
                                {
                                    item.title
                                }
                            </div>
                        )
                    )}

                    {remainingItems >
                        0 && (
                            <div
                                style={{
                                    fontSize:
                                        "0.74rem",

                                    opacity: 0.4,
                                }}
                            >
                                +
                                {
                                    remainingItems
                                }{" "}
                                more
                            </div>
                        )}
                </div>
            </div>

            {/* RIGHT */}

            <div
                style={{
                    display: "flex",

                    justifyContent:
                        "stretch",

                    alignItems:
                        "stretch",

                    height: "100%",
                }}
            >
                {items.length > 0 && (
                    <DashboardPreviewCard
                        item={items[0]}
                    />
                )}
            </div>
        </div>
    );
}

export default DashboardWideCard;