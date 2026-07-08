function DeleteConfirmModal({
    title = "Delete item?",
    message = "This action cannot be undone.",
    onCancel,
    onConfirm,
}) {
    return (
        <div
            onClick={onCancel}
            style={{
                position: "fixed",
                inset: 0,

                // background needs to be more glass / frosty not heavy and dark 
                background:
                    "rgba(20, 20, 20, 0)",

                backdropFilter:
                    "blur(20px)",

                border:
                    "1px solid rgba(255,255,255,0.10)",

                boxShadow:
                    "0 20px 50px rgba(0,0,0,0.35)",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                zIndex: 3000,
            }}
        >
            <div
                onClick={(e) =>
                    e.stopPropagation()
                }
                style={{
                    width: "400px",

                    padding: "28px",

                    borderRadius: "24px",

                    background:
                        "rgba(0, 0, 0, 0.15)",

                    border:
                        "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <h3
                    style={{
                        marginBottom: "12px",

                        fontWeight: "400",

                        fontSize: "0.95rem",
                    }}
                >
                    {title}
                </h3>

                <p
                    style={{
                        color:
                            "var(--text-secondary)",

                        marginBottom: "24px",

                        fontSize: "0.8rem",

                        fontWeight: "300",

                        opacity: 0.55,
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
                        onClick={onCancel}
                        style={{
                            padding: "8px 14px",

                            borderRadius: "999px",

                            background:
                                "rgba(255,255,255,0.08)",

                            border:
                                "1px solid rgba(255,255,255,0.10)",

                            color:
                                "var(--text-primary)",

                            fontSize: "0.8rem",

                            fontWeight: "300",

                            cursor: "pointer",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.14)";

                            e.currentTarget.style.transform =
                                "translateY(-1px)";

                            e.currentTarget.style.border =
                                "1px solid rgba(255,255,255,0.18)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.08)";

                            e.currentTarget.style.transform =
                                "translateY(0)";

                            e.currentTarget.style.border =
                                "1px solid rgba(255,255,255,0.10)";
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        style={{
                            padding: "8px 14px",

                            borderRadius: "999px",

                            background:
                                "rgba(255,77,77,0.12)",

                            border:
                                "1px solid rgba(255,77,77,0.25)",

                            color: "var(--danger)",

                            fontSize: "0.8rem",

                            fontWeight: "300",

                            cursor: "pointer",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,77,77,0.20)";

                            e.currentTarget.style.transform =
                                "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,77,77,0.12)";

                            e.currentTarget.style.transform =
                                "translateY(0)";
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmModal;