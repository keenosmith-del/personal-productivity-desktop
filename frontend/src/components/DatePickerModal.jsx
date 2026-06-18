import { X } from "lucide-react";

function DatePickerModal({
    isOpen,
    selectedDate,
    onSelect,
    onClose,
}) {
    if (!isOpen) return null;

    const today = new Date();

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const formatDate = (date) =>
        date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,

                background: "rgba(0,0,0,0.8)",

                backdropFilter: "blur(20px)",

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
                    width: "360px",

                    background:
                        "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",

                    border:
                        "1px solid rgba(255,255,255,0.10)",

                    borderRadius: "28px",

                    backdropFilter:
                        "blur(30px)",

                    padding: "24px",
                }}
            >
                <div
                    style={{
                        display: "flex",

                        justifyContent:
                            "space-between",

                        alignItems: "center",

                        marginBottom: "20px",
                    }}
                >
                    <h3
                        style={{
                            fontWeight: "400",
                        }}
                    >
                        Select Due Date
                    </h3>

                    <p
                        style={{
                            fontSize: "0.75rem",

                            color:
                                "var(--text-secondary)",

                            marginTop: "4px",
                        }}
                    >
                        {selectedDate}
                    </p>

                    <X
                        size={16}
                        strokeWidth={1.5}
                        style={{
                            cursor: "pointer",
                        }}
                        onClick={onClose}
                    />
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <button
                        onClick={() =>
                            onSelect(
                                formatDate(today)
                            )
                        }
                        style={{
                            background: "transparent",

                            border:
                                "1px solid rgba(255,255,255,0.08)",

                            borderRadius: "999px",

                            padding: "10px 14px",

                            color: "var(--text-secondary)",

                            fontSize: "0.8rem",

                            cursor: "pointer",

                            textAlign: "left",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.04)";

                            e.currentTarget.style.color =
                                "var(--text-primary)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "transparent";

                            e.currentTarget.style.color =
                                "var(--text-secondary)";
                        }}
                    >
                        Today
                    </button>

                    <button
                        onClick={() =>
                            onSelect(
                                formatDate(tomorrow)
                            )
                        }
                        style={{
                            background: "transparent",

                            border:
                                "1px solid rgba(255,255,255,0.08)",

                            borderRadius: "999px",

                            padding: "10px 14px",

                            color: "var(--text-secondary)",

                            fontSize: "0.8rem",

                            cursor: "pointer",

                            textAlign: "left",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.04)";

                            e.currentTarget.style.color =
                                "var(--text-primary)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "transparent";

                            e.currentTarget.style.color =
                                "var(--text-secondary)";
                        }}
                    >
                        Tomorrow
                    </button>

                    <button
                        onClick={() =>
                            onSelect(
                                formatDate(nextWeek)
                            )
                        }
                        style={{
                            background: "transparent",

                            border:
                                "1px solid rgba(255,255,255,0.08)",

                            borderRadius: "999px",

                            padding: "10px 14px",

                            color: "var(--text-secondary)",

                            fontSize: "0.8rem",

                            cursor: "pointer",

                            textAlign: "left",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.04)";

                            e.currentTarget.style.color =
                                "var(--text-primary)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "transparent";

                            e.currentTarget.style.color =
                                "var(--text-secondary)";
                        }}
                    >
                        Next Week
                    </button>

                    <button
                        style={{
                            background: "transparent",

                            border:
                                "1px solid rgba(255,255,255,0.08)",

                            borderRadius: "999px",

                            padding: "10px 14px",

                            color: "var(--text-secondary)",

                            fontSize: "0.8rem",

                            cursor: "pointer",

                            textAlign: "left",
                        }}
                    >
                        Custom Date
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DatePickerModal;