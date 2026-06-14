function Toast({
    message,
    actionLabel,
    onAction,
}) {
    if (!message) return null;

    return (
        <div
            style={{
                position: "fixed",

                bottom: "32px",

                left: "50%",

                transform:
                    "translateX(-50%)",

                padding:
                    "12px 18px",

                background:
                    "rgba(20,20,20,0.75)",

                backdropFilter:
                    "blur(20px)",

                border:
                    "1px solid rgba(255,255,255,0.08)",

                borderRadius:
                    "999px",

                color:
                    "var(--text-primary)",

                fontWeight: "300",

                fontSize: "0.9rem",

                zIndex: 3000,

                boxShadow:
                    "0 8px 30px rgba(0,0,0,0.35)",

                display: "flex",

                alignItems: "center",

                gap: "12px",
            }}
        >
            <span>{message}</span>

            {actionLabel && (
                <button
                    onClick={onAction}
                    style={{
                        background:
                            "transparent",

                        border: "none",

                        cursor: "pointer",

                        fontSize: "0.85rem",

                        color:
                            "var(--text-secondary)",

                        fontWeight: "400",

                        opacity: 0.9,

                        padding: 0,

                        marginLeft: "12px",
                    }}
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
}

export default Toast;