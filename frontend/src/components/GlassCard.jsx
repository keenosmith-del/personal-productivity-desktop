function GlassCard({
    children,
    minHeight = "320px",
}) {
    return (
        <div
            style={{
                background: "var(--glass-bg)",

                border:
                    "1px solid var(--glass-border)",

                borderRadius:
                    "var(--radius-large)",

                // this causes that fucking fuzzy white horizontal line below url
                // maybe if it was darker
                backdropFilter: "blur(20px)",

                WebkitBackdropFilter: "blur(20px)",

                padding: "24px",

                minHeight,

                transition: "all 0.3s ease",

                transform: "translateY(0)",

            }}

            onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                    "translateY(-3px)";
            }}

            onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                    "translateY(0)";
            }}
        >
            {children}
        </div>
    );
}

export default GlassCard;