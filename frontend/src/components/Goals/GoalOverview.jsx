import GlassCard from "../GlassCard";
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

                    <div
                        style={{
                            display: "flex",
                            gap: "6px",
                            flexWrap: "wrap",
                        }}
                    >
                        <span
                            style={{
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "0.68rem",
                                background: "#063f4733",
                                border: "1px solid #063f4766",
                            }}
                        >
                            Work 1
                        </span>

                        <span
                            style={{
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "0.68rem",
                                background: "#29737633",
                                border: "1px solid #29737666",
                            }}
                        >
                            Study 2
                        </span>

                        <span
                            style={{
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "0.68rem",
                                background: "#5c939633",
                                border: "1px solid #5c939666",
                            }}
                        >
                            Personal 1
                        </span>
                    </div>
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

                    <div
                        style={{
                            width: "100%",
                            maxWidth: "140px",
                        }}
                    >
                        <div
                            style={{
                                height: "8px",

                                borderRadius: "999px",

                                background:
                                    "rgba(255,255,255,0.08)",

                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    width: "72%",

                                    height: "100%",

                                    background: "#c59c70",

                                    borderRadius: "999px",
                                }}
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            marginTop: "10px",
                        }}
                    >
                        <span
                            style={{
                                padding: "4px 8px",

                                borderRadius: "999px",

                                fontSize: "0.68rem",

                                background: "#728a6e33",

                                border: "1px solid #728a6e66",
                            }}
                        >
                            +8 Completed
                        </span>
                    </div>
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

                    <div
                        style={{
                            display: "flex",
                            gap: "6px",
                            flexWrap: "wrap",
                        }}
                    >
                        <span
                            style={{
                                padding: "4px 8px",

                                borderRadius: "999px",

                                fontSize: "0.68rem",

                                background: "#e9b95733",

                                border: "1px solid #e9b95766",
                            }}
                        >
                            Best 21 Days
                        </span>

                        <span
                            style={{
                                padding: "4px 8px",

                                borderRadius: "999px",

                                fontSize: "0.68rem",

                                background: "#728a6e33",

                                border: "1px solid #728a6e66",
                            }}
                        >
                            +14 Current
                        </span>
                    </div>
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

                    <div
                        style={{
                            display: "flex",
                            gap: "6px",
                            flexWrap: "wrap",
                        }}
                    >
                        <span
                            style={{
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "0.68rem",
                                background: "#728a6e33",
                                border: "1px solid #728a6e66",
                            }}
                        >
                            Complete 8
                        </span>

                        <span
                            style={{
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "0.68rem",
                                background: "#4d689333",
                                border: "1px solid #4d689366",
                            }}
                        >
                            Active 4
                        </span>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}

export default GoalOverview;