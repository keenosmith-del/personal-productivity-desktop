import DashboardPreviewCard from "./DashboardPreviewCard";

function DashboardWideCard({
    title,
    items = [],
    chips = [],
    onClick,
    onPreviewClick,
}) {
    const visibleItems =
        items.slice(0, 1);

    const remainingItems =
        items.length - 1;

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
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
                    }}
                >
                    {chips.map((chip, index) => (
                        <div
                            key={`${chip}-${index}`}
                            style={{
                                width: "35px",
                                height: "35px",

                                borderRadius: "50%",

                                marginRight: "-6px",

                                zIndex:
                                    index + 1,

                                background:
                                    "linear-gradient(135deg, rgba(87,112,122,0.35), rgba(39,60,65,0.15))",

                                border:
                                    "1px solid rgba(255,255,255,0.06)",

                                color:
                                    "var(--text-secondary)",

                                backdropFilter:
                                    "blur(20px)",

                                display: "flex",

                                alignItems: "center",

                                justifyContent:
                                    "center",

                                fontSize:
                                    "0.62rem",

                                fontWeight: "300",

                                transition:
                                    "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-1px) scale(1.08)";

                                e.currentTarget.style.border =
                                    "1px solid rgba(255,255,255,0.12)";

                                e.currentTarget.style.boxShadow =
                                    "0 8px 20px rgba(0,0,0,0.25)";

                                e.currentTarget.style.color =
                                    "var(--text-primary)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0) scale(1)";

                                e.currentTarget.style.border =
                                    "1px solid rgba(255,255,255,0.06)";

                                e.currentTarget.style.boxShadow =
                                    "none";

                                e.currentTarget.style.color =
                                    "var(--text-secondary)";
                            }}
                        >
                            {chip}
                        </div>
                    ))}
                </div>

                {/* TITLES */}

                <div
                    style={{
                        display: "flex",

                        flexDirection: "column",

                        gap: "2px",
                    }}
                >
                    {visibleItems.map(
                        (item) => (
                            <div
                                key={item._id}
                                style={{
                                    fontSize: "0.78rem",

                                    fontWeight: "300",

                                    whiteSpace: "nowrap",

                                    overflow: "hidden",

                                    textOverflow: "ellipsis",

                                    opacity: 0.85,
                                }}
                            >
                                {item.title}
                            </div>
                        )
                    )}

                    {remainingItems > 0 && (
                        <div
                            style={{
                                fontSize: "0.74rem",

                                opacity: 0.4,
                            }}
                        >
                            +{remainingItems} more
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
                        onClick={() =>
                            onPreviewClick?.(items[0])
                        }
                    />
                )}
            </div>
        </div>
    );
}

export default DashboardWideCard;