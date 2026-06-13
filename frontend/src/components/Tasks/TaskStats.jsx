import GlassCard from "../GlassCard";

function TaskStats() {
    return (
        <GlassCard minHeight="220px">
            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "space-between",

                    alignItems: "center",

                    height: "100%",
                }}
            >
                <div>
                    <h2
                        style={{
                            fontWeight: "400",
                            marginBottom: "20px",
                        }}
                    >
                        Task Overview
                    </h2>

                    <p
                        style={{
                            color: "var(--text-secondary)",
                        }}
                    >
                        Active
                    </p>

                    <h1
                        style={{
                            fontWeight: "400",
                        }}
                    >
                        3
                    </h1>

                    <p
                        style={{
                            color:
                                "var(--text-secondary)",
                            marginTop:
                                "12px",
                        }}
                    >
                        Completed
                    </p>

                    <h1
                        style={{
                            fontWeight: "400",
                        }}
                    >
                        12
                    </h1>
                </div>

                <div
                    style={{
                        display: "flex",

                        flexDirection: "column",

                        alignItems: "flex-end",

                        gap: "10px",
                    }}
                >
                    <span
                        style={{
                            padding: "6px 10px",

                            borderRadius: "999px",

                            fontSize: "0.72rem",

                            background: "#ab313033",

                            border:
                                "1px solid #ab313066",
                        }}
                    >
                        High • 1
                    </span>

                    <span
                        style={{
                            padding: "6px 10px",

                            borderRadius: "999px",

                            fontSize: "0.72rem",

                            background: "#62929e33",

                            border:
                                "1px solid #62929e66",
                        }}
                    >
                        Medium • 1
                    </span>

                    <span
                        style={{
                            padding: "6px 10px",

                            borderRadius: "999px",

                            fontSize: "0.72rem",

                            background: "#ffdb5833",

                            border:
                                "1px solid #ffdb5866",
                        }}
                    >
                        Low • 1
                    </span>

                    <span
                        style={{
                            padding: "6px 10px",

                            borderRadius: "999px",

                            fontSize: "0.72rem",

                            background: "#4d689333",

                            border:
                                "1px solid #4d689366",
                        }}
                    >
                        Active • 3
                    </span>

                    <span
                        style={{
                            padding: "6px 10px",

                            borderRadius: "999px",

                            fontSize: "0.72rem",

                            background: "#728a6e33",

                            border:
                                "1px solid #728a6e66",
                        }}
                    >
                        Complete • 12
                    </span>
                </div>
            </div>
        </GlassCard>
    );
}

export default TaskStats;