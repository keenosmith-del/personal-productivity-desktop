import GlassCard from "./GlassCard";
import ProgressRing from "./ProgressRing";

function GoalOverview() {
    return (
        <GlassCard minHeight="220px">
            <h2
                style={{
                    marginBottom: "24px",
                }}
            >
                Goal Overview
            </h2>

            <div
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "repeat(4, 1fr)",

                    gap: "24px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "18px",
                    }}
                >
                    <p
                        style={{
                            color:
                                "var(--text-secondary)",
                        }}
                    >
                        Active Goals
                    </p>

                    <h2>4</h2>

                    <ProgressRing value={40} />
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "18px",
                    }}
                >
                    <p
                        style={{
                            color:
                                "var(--text-secondary)",
                        }}
                    >
                        Completion Rate
                    </p>

                    <h2>72%</h2>

                    <ProgressRing value={40} />
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "18px",
                    }}
                >
                    <p
                        style={{
                            color:
                                "var(--text-secondary)",
                        }}
                    >
                        Current Streak
                    </p>

                    <h2>14 Days</h2>

                    <ProgressRing value={65} />
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "18px",
                    }}
                >
                    <p
                        style={{
                            color:
                                "var(--text-secondary)",
                        }}
                    >
                        Goals Achieved
                    </p>

                    <h2>8</h2>

                    <ProgressRing value={80} />
                </div>
            </div>
        </GlassCard>
    );
}

export default GoalOverview;