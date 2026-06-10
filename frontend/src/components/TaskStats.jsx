import GlassCard from "./GlassCard";

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
                            marginBottom:
                                "20px",
                        }}
                    >
                        Task Stats
                    </h2>

                    <p
                        style={{
                            color:
                                "var(--text-secondary)",
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
                        alignItems: "center",
                        gap: "12px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            gap: "6px",
                        }}
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                            (dot) => (
                                <div
                                    key={dot}
                                    style={{
                                        width: "8px",
                                        height: "8px",

                                        borderRadius: "50%",

                                        background:
                                            dot <= 8
                                                ? "#52677d"
                                                : "rgba(255,255,255,0.12)",
                                    }}
                                />
                            )
                        )}
                    </div>

                    <div
                        style={{
                            textAlign: "center",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "1.4rem",

                                fontWeight: "300",
                            }}
                        >
                            80%
                        </div>

                        <div
                            style={{
                                color:
                                    "var(--text-secondary)",

                                fontSize: "0.8rem",
                            }}
                        >
                            Complete
                        </div>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}

export default TaskStats;