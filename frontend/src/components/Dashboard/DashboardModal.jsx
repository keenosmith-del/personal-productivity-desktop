import { Trash2, X, } from "lucide-react";

function DashboardModal({
    title,
    items,
    onClose,
    onNavigate,
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
                    width: "560px",

                    background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",

                    border: "1px solid rgba(255,255,255,0.10)",

                    borderRadius: "36px",

                    backdropFilter: "blur(30px)",

                    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",

                    padding: "36px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "24px",
                    }}
                >
                    <div>
                        <h2
                            style={{
                                margin: 0,
                                fontSize: "0.95rem",
                                fontWeight: "400",
                            }}
                        >
                            {title}
                        </h2>

                        <p
                            style={{
                                marginTop: "4px",
                                marginBottom: 0,
                                fontSize: "0.8rem",
                                fontWeight: "300",
                                opacity: 0.55,
                            }}
                        >
                            View matching items
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        style={{
                            width: "32px",
                            height: "32px",

                            borderRadius: "999px",

                            border:
                                "1px solid rgba(255,255,255,0.08)",

                            background:
                                "rgba(255,255,255,0.04)",

                            color:
                                "var(--text-secondary)",

                            cursor: "pointer",

                            fontSize: "0.85rem",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.10)";

                            e.currentTarget.style.transform =
                                "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.04)";

                            e.currentTarget.style.transform =
                                "scale(1)";
                        }}
                    >
                        x
                    </button>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",

                        maxHeight: "45vh",

                        overflowY: "auto",

                        paddingRight: "4px",
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
                                    padding: "10px 12px",
                                    borderRadius: "14px",

                                    cursor: "pointer",

                                    transition: "all 0.2s ease",

                                    display: "flex",

                                    justifyContent: "space-between",

                                    alignItems: "flex-start",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                        "rgba(255,255,255,0.04)";
                                }}

                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                        "transparent";
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
                                            fontSize: "0.85rem",
                                            letterSpacing: "-0.015em",
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
                                            "translateY(-1px)";
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
                <div
                    style={{
                        display: "flex",

                        justifyContent: "flex-end",

                        gap: "10px",

                        marginTop: "20px",
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            padding: "11px 18px",

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
                        Cancel
                    </button>

                    <button
                        onClick={() => {
                            if (
                                title === "Projects"
                            ) {
                                onNavigate("/projects");
                            } else if (
                                title === "Goals"
                            ) {
                                onNavigate("/goals");
                            } else {
                                onNavigate("/tasks");
                            }
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
                        style={{
                            padding: "11px 18px",

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
                    >
                        {title === "Projects"
                            ? "Go To Projects"
                            : title === "Goals"
                                ? "Go To Goals"
                                : "Go To Tasks"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DashboardModal;