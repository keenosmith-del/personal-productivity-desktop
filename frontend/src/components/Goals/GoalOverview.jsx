import GlassCard from "../GlassCard";
import ProgressRing from "../ProgressRing";
import GoalModal from "./GoalModal";
import { Plus } from "lucide-react";

function GoalOverview() {
    return (
        <GlassCard minHeight="220px">
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "32px",
                }}
            >
                <h2
                    style={{
                        fontWeight: "400",
                        letterSpacing: "-0.02em",
                    }}
                >
                    Goals
                </h2>
            </div>

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

                    <h2
                        style={{
                            fontWeight: "400",
                        }}
                    >
                        4
                    </h2>

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

                    <h2
                        style={{
                            fontWeight: "400",
                        }}
                    >
                        72%
                    </h2>

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

                    <h2
                        style={{
                            fontWeight: "400",
                        }}
                    >
                        14 Days
                    </h2>

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

                    <h2
                        style={{
                            fontWeight: "400",
                        }}
                    >
                        8
                    </h2>

                    <ProgressRing value={80} />
                </div>
            </div>
        </GlassCard>
    );
}

export default GoalOverview;