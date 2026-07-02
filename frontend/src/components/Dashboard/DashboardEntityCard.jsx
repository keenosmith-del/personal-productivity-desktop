function DashboardEntityCard({
    title,
    items = [],
    placeholderTitle,
    placeholderFooter,
    chips,
    subtitle,
    onClick,
}) {
    return (
        <div
            onClick={onClick}
            style={{
                background: "var(--glass-bg)",

                border:
                    "1px solid var(--glass-border)",

                borderRadius:
                    "var(--radius-large)",

                backdropFilter: "blur(20px)",

                WebkitBackdropFilter:
                    "blur(20px)",

                minHeight: "240px",

                padding: "24px",

                cursor:
                    onClick
                        ? "pointer"
                        : "default",

                transition:
                    "all 0.2s ease",

                display: "flex",

                flexDirection: "column",

                justifyContent:
                    "space-between",
            }}
            onMouseEnter={(e) => {
                if (!onClick) return;

                e.currentTarget.style.transform =
                    "translateY(-1px)";

                e.currentTarget.style.background =
                    "rgba(255,255,255,0.03)";
            }}
            onMouseLeave={(e) => {
                if (!onClick) return;

                e.currentTarget.style.transform =
                    "translateY(0)";

                e.currentTarget.style.background =
                    "var(--glass-bg)";
            }}
        >
            <div>
                <div
                    style={{
                        fontSize: "0.82rem",

                        fontWeight: "300",

                        opacity: 0.55,

                        marginBottom: "10px",
                    }}
                >
                    {title}
                </div>

                {items.length > 0 ? (
                    <>
                        <div
                            style={{
                                fontSize: "2rem",

                                fontWeight: "300",

                                letterSpacing: "-0.04em",
                            }}
                        >
                            {items.length}
                        </div>

                        {subtitle && (
                            <div
                                style={{
                                    marginTop: "6px",

                                    marginBottom: "10px",

                                    fontSize: "0.74rem",

                                    opacity: 0.45,
                                }}
                            >
                                {subtitle}
                            </div>
                        )}
                    </>
                ) : (
                    <div
                        style={{
                            marginTop: "8px",

                            display: "flex",

                            flexDirection: "column",

                            gap: "6px",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "0.82rem",

                                fontWeight: "300",
                            }}
                        >
                            Nothing here yet.
                        </div>

                        <div
                            style={{
                                fontSize: "0.72rem",

                                opacity: 0.45,

                                lineHeight: 1.5,
                            }}
                        >
                            {placeholderTitle}
                        </div>

                        <div
                            style={{
                                fontSize: "0.72rem",

                                opacity: 0.35,
                            }}
                        >
                            {placeholderFooter}
                        </div>
                    </div>
                )}
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
                                chip.startsWith("L")
                                    ? "#4d689333"
                                    : chip.startsWith("M")
                                        ? "#5b667033"
                                        : chip.startsWith("H")
                                            ? "#72515c33"
                                            : "linear-gradient(135deg, rgba(87,112,122,0.35), rgba(39,60,65,0.15))",

                            border:
                                chip.startsWith("L")
                                    ? "1px solid #4d689366"
                                    : chip.startsWith("M")
                                        ? "1px solid #5b667066"
                                        : chip.startsWith("H")
                                            ? "1px solid #72515c66"
                                            : "1px solid rgba(255,255,255,0.06)",

                            color:
                                chip.startsWith("L")
                                    ? "#8faec0"
                                    : chip.startsWith("M")
                                        ? "#a8b2bb"
                                        : chip.startsWith("H")
                                            ? "#c1a2ad"
                                            : "var(--text-secondary)",

                            backdropFilter:
                                "blur(20px)",

                            display: "flex",

                            alignItems: "center",

                            justifyContent:
                                "center",

                            fontSize:
                                "0.62rem",

                            transition: "all 0.2s ease",

                            // add cursor tooltip?
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
        </div>
    );
}

export default DashboardEntityCard;