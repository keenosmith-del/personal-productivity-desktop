import { X } from "lucide-react";

function NotificationModal({
    notification,
    onClose,
}) {
    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,

                background:
                    "rgba(0,0,0,0.35)",

                backdropFilter:
                    "blur(20px)",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                zIndex: 2000,
            }}
        >
            <div
                onClick={(e) =>
                    e.stopPropagation()
                }
                style={{
                    width: "500px",

                    background:
                        "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",

                    border:
                        "1px solid rgba(255,255,255,0.10)",

                    borderRadius: "36px",

                    backdropFilter:
                        "blur(30px)",

                    boxShadow:
                        "0 20px 60px rgba(0,0,0,0.45)",

                    padding: "32px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "18px",
                }}
            >
                <div
                    style={{
                        display: "flex",

                        justifyContent:
                            "space-between",

                        alignItems: "center",
                    }}
                >
                    <h2
                        style={{
                            fontWeight: "400",
                            letterSpacing:
                                "-0.02em",
                        }}
                    >
                        Notification
                    </h2>

                    <X
                        size={18}
                        strokeWidth={1.5}
                        style={{
                            cursor: "pointer",
                            transition:
                                "all 0.2s ease",
                        }}
                        onClick={onClose}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.opacity =
                                "0.7";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.opacity =
                                "1";
                        }}
                    />
                </div>

                <div>
                    <h3
                        style={{
                            fontWeight:
                                "300",

                            marginBottom:
                                "12px",
                        }}
                    >
                        {
                            notification.title
                        }
                    </h3>

                    <p
                        style={{
                            color:
                                "var(--text-secondary)",

                            lineHeight:
                                1.6,
                        }}
                    >
                        {
                            notification.description
                        }
                    </p>
                </div>

                <small
                    style={{
                        color:
                            "rgba(255,255,255,0.55)",
                    }}
                >
                    {
                        notification.time
                    }
                </small>
            </div>
        </div>
    );
}

export default NotificationModal;