function Toast({
    message,
    actionLabel,
    onAction,
}) {
    if (!message) return null;

    return (
        <div
            // pill 
            style={{
                position: "fixed",

                bottom: "32px",

                left: "50%",

                transform:
                    "translateX(-50%)",

                padding:
                    "8px 14px",

                background:
                    "rgba(20, 20, 20, 0)",

                backdropFilter:
                    "blur(12px)",

                border:
                    "1px solid rgba(255,255,255,0.10)",

                boxShadow:
                    "0 20px 50px rgba(0,0,0,0.35)",

                borderRadius:
                    "999px",

                color:
                    "var(--text-primary)",

                fontWeight: "300",

                fontSize: "0.85rem",

                zIndex: 3000,

                display: "flex",

                alignItems: "center",

                gap: "12px",
            }}
        >
            <span>{message}</span>
            {/* deprecated actionLabel */}
        </div>
    );
}

export default Toast;