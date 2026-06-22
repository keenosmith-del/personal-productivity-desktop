import { X } from "lucide-react";

function ConfirmationModal({
    title,
    message,
    confirmText,
    onConfirm,
    onClose,
}) {
    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                background:
                    "rgba(0,0,0,0.55)",
                backdropFilter:
                    "blur(12px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
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

                    borderRadius: "32px",

                    backdropFilter:
                        "blur(30px)",

                    boxShadow:
                        "0 20px 60px rgba(0,0,0,0.35)",

                    padding: "36px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "24px",
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
                        }}
                    >
                        {title}
                    </h2>

                    <X
                        size={18}
                        strokeWidth={1.5}
                        style={{
                            cursor: "pointer",
                        }}
                        onClick={onClose}
                    />
                </div>

                <p
                    style={{
                        color:
                            "var(--text-secondary)",
                        fontWeight: "300",
                        lineHeight: "1.6",
                    }}
                >
                    {message}
                </p>

                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "flex-end",
                        gap: "12px",
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            background:
                                "transparent",

                            border:
                                "1px solid rgba(255,255,255,0.08)",

                            borderRadius:
                                "999px",

                            padding:
                                "8px 14px",

                            color: "var(--text-secondary)",

                            fontSize:
                                "0.8rem",

                            fontWeight:
                                "300",

                            cursor:
                                "pointer",
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        style={{
                            background:
                                "transparent",

                            border:
                                "1px solid rgba(255,107,107,0.25)",

                            borderRadius:
                                "999px",

                            padding:
                                "8px 14px",

                            color: "#d97c7c",

                            fontSize:
                                "0.8rem",

                            fontWeight:
                                "300",

                            cursor:
                                "pointer",
                        }}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;