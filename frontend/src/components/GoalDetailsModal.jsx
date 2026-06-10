import { X } from "lucide-react";

function GoalDetailsModal({
    goal,
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

                justifyContent:
                    "center",

                alignItems:
                    "center",

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

                    borderRadius:
                        "32px",

                    backdropFilter:
                        "blur(30px)",

                    boxShadow:
                        "0 30px 80px rgba(0,0,0,0.45)",

                    padding: "36px",
                }}
            >
                <div
                    style={{
                        display: "flex",

                        justifyContent:
                            "space-between",

                        alignItems:
                            "center",

                        marginBottom:
                            "24px",
                    }}
                >
                    <h2
                        style={{
                            fontWeight:
                                "400",
                        }}
                    >
                        Goal Details
                    </h2>

                    <X
                        size={18}
                        strokeWidth={
                            1.5
                        }
                        style={{
                            cursor:
                                "pointer",

                            transition:
                                "all 0.2s ease",
                        }}
                        onClick={
                            onClose
                        }
                        onMouseEnter={(
                            e
                        ) => {
                            e.currentTarget.style.opacity =
                                "0.7";
                        }}
                        onMouseLeave={(
                            e
                        ) => {
                            e.currentTarget.style.opacity =
                                "1";
                        }}
                    />
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection:
                            "column",

                        gap: "20px",
                    }}
                >
                    <div>
                        <p
                            style={{
                                color:
                                    "var(--text-secondary)",

                                fontSize:
                                    "0.8rem",

                                marginBottom:
                                    "6px",
                            }}
                        >
                            Goal
                        </p>

                        <h3
                            style={{
                                fontWeight:
                                    "400",
                            }}
                        >
                            {goal}
                        </h3>
                    </div>

                    <div>
                        <p
                            style={{
                                color:
                                    "var(--text-secondary)",

                                fontSize:
                                    "0.8rem",

                                marginBottom:
                                    "6px",
                            }}
                        >
                            Progress
                        </p>

                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "6px",
                                    marginBottom: "10px",
                                }}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(
                                    (dot) => (
                                        <div
                                            key={dot}
                                            style={{
                                                width: "8px",
                                                height: "8px",

                                                borderRadius: "50%",

                                                background:
                                                    dot <= 5
                                                        ? "#52677d"
                                                        : "rgba(255,255,255,0.12)",
                                            }}
                                        />
                                    )
                                )}
                            </div>

                            <p>63% Complete</p>
                        </div>
                    </div>

                    <div>
                        <p
                            style={{
                                color:
                                    "var(--text-secondary)",

                                fontSize:
                                    "0.8rem",

                                marginBottom:
                                    "6px",
                            }}
                        >
                            Target Date
                        </p>

                        <p>
                            December
                            2026
                        </p>
                    </div>

                    <div>
                        <p
                            style={{
                                color:
                                    "var(--text-secondary)",

                                fontSize:
                                    "0.8rem",

                                marginBottom:
                                    "6px",
                            }}
                        >
                            Milestones
                        </p>

                        <p>
                            • Learn
                            React
                        </p>

                        <p>
                            • Learn
                            Node.js
                        </p>

                        <p>
                            • Launch
                            Portfolio
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GoalDetailsModal;