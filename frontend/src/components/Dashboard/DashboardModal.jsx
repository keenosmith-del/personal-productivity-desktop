import { Trash2, X, } from "lucide-react";

function DashboardModal({
    title,
    items,
    onClose,
}) {
    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,

                background: "rgba(0,0,0,0.55)",

                backdropFilter: "blur(12px)",

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

                    background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",

                    border: "1px solid rgba(255,255,255,0.10)",

                    borderRadius: "32px",

                    backdropFilter: "blur(30px)",

                    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",

                    padding: "36px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "24px",
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
                            transition: "all 0.2s ease",
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

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                    }}
                >
                    {items.length === 0 ? (
                        <div
                            style={{
                                padding: "24px",
                                textAlign: "center",
                                color: "var(--text-secondary)",
                                fontSize: "0.85rem",
                            }}
                        >
                            No items found.
                        </div>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item.title}
                                style={{
                                    padding: "14px",

                                    borderRadius: "12px",

                                    display: "flex",

                                    justifyContent: "space-between",

                                    alignItems: "flex-start",
                                }}
                            >
                                <div>
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "8px",
                                            marginBottom: "8px",
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <span
                                            style={{
                                                padding: "4px 8px",

                                                borderRadius: "999px",

                                                fontSize: "0.7rem",

                                                background:
                                                    item.entity === "Task"
                                                        ? "#72715c33"
                                                        : item.entity === "Goal"
                                                            ? "#c59c7033"
                                                            : item.entity === "Project"
                                                                ? "#854c4933"
                                                                : item.entity === "Note"
                                                                    ? "#52677d33"
                                                                    : "#83545c33",

                                                border:
                                                    item.entity === "Task"
                                                        ? "1px solid #72715c66"
                                                        : item.entity === "Goal"
                                                            ? "1px solid #c59c7066"
                                                            : item.entity === "Project"
                                                                ? "1px solid #854c4966"
                                                                : item.entity === "Note"
                                                                    ? "1px solid #52677d66"
                                                                    : "1px solid #83545c66",
                                            }}
                                        >
                                            {item.entity}
                                        </span>

                                        {item.priority && (
                                            <span
                                                style={{
                                                    padding: "4px 8px",

                                                    borderRadius: "999px",

                                                    fontSize: "0.7rem",

                                                    background:
                                                        item.priority === "High"
                                                            ? "#ab313033"
                                                            : item.priority === "Medium"
                                                                ? "#62929e33"
                                                                : "#ffdb5833",

                                                    border:
                                                        item.priority === "High"
                                                            ? "1px solid #ab313066"
                                                            : item.priority === "Medium"
                                                                ? "1px solid #62929e66"
                                                                : "1px solid #ffdb5866",
                                                }}
                                            >
                                                {item.priority}
                                            </span>
                                        )}

                                        {item.category && (
                                            <span
                                                style={{
                                                    padding: "4px 8px",

                                                    borderRadius: "999px",

                                                    fontSize: "0.7rem",

                                                    background:
                                                        item.category === "Work"
                                                            ? "#063f4733"
                                                            : item.category === "Study"
                                                                ? "#29737633"
                                                                : item.category === "Personal"
                                                                    ? "#5c939633"
                                                                    : "#10343933",

                                                    border:
                                                        item.category === "Work"
                                                            ? "1px solid #063f4766"
                                                            : item.category === "Study"
                                                                ? "1px solid #29737666"
                                                                : item.category === "Personal"
                                                                    ? "1px solid #5c939666"
                                                                    : "1px solid #10343966",
                                                }}
                                            >
                                                {item.category}
                                            </span>
                                        )}
                                    </div>

                                    <span
                                        style={{
                                            fontWeight: "300",
                                            letterSpacing: "-0.01em",
                                        }}
                                    >
                                        {item.title}
                                    </span>
                                </div>

                                <Trash2
                                    size={16}
                                    strokeWidth={1.5}
                                    style={{
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            "#ff6b6b";

                                        e.currentTarget.style.transform =
                                            "scale(1.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color =
                                            "";

                                        e.currentTarget.style.transform =
                                            "scale(1)";
                                    }}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default DashboardModal;