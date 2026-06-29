function DashboardEntityCard({
    title,
    items = [],
    letter,
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
            </div>

            {/* STACKED AVATARS */}

            <div
                style={{
                    display: "flex",
                }}
            >
                {items
                    .slice(0, 4)
                    .map((item, index) => (
                        <div
                            key={item._id}
                            style={{
                                width: "28px",
                                height: "28px",

                                borderRadius: "50%",

                                marginRight: "-6px",

                                zIndex:
                                    index + 1,

                                background:
                                    "linear-gradient(135deg, rgba(87,112,122,0.35), rgba(39,60,65,0.15))",

                                border:
                                    "1px solid rgba(255,255,255,0.06)",

                                backdropFilter:
                                    "blur(20px)",

                                display: "flex",

                                alignItems: "center",

                                justifyContent:
                                    "center",

                                fontSize:
                                    "0.62rem",

                                color:
                                    "var(--text-secondary)",
                            }}
                        >
                            {letter}
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default DashboardEntityCard;