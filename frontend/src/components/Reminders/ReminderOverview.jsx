import GlassCard from "../GlassCard";

function ReminderOverview() {
    return (
        <GlassCard minHeight="520px">
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                }}
            >
                <h2
                    style={{
                        fontWeight: "400",
                    }}
                >
                    Reminder Overview
                </h2>

                <div>
                    <p
                        style={{
                            color:
                                "var(--text-secondary)",
                            marginBottom: "12px",
                        }}
                    >
                        Active Reminders
                    </p>

                    <h2
                        style={{
                            fontWeight: "400",
                            marginBottom: "16px",
                        }}
                    >
                        12
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap",
                        }}
                    >
                        <span
                            style={{
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "0.68rem",
                                background: "#83545c33",
                                border: "1px solid #83545c66",
                            }}
                        >
                            Today 3
                        </span>

                        <span
                            style={{
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "0.68rem",
                                background: "#83545c33",
                                border: "1px solid #83545c66",
                            }}
                        >
                            Tomorrow 4
                        </span>

                        <span
                            style={{
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "0.68rem",
                                background: "#83545c33",
                                border: "1px solid #83545c66",
                            }}
                        >
                            This Week 5
                        </span>
                    </div>
                </div>

                <div>
                    <p
                        style={{
                            color:
                                "var(--text-secondary)",
                            marginBottom: "12px",
                        }}
                    >
                        Categories
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "8px",
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
                            Work 5
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
                            Study 4
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
                            Personal 2
                        </span>

                        <span
                            style={{
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "0.68rem",
                                background: "#10343933",
                                border: "1px solid #10343966",
                            }}
                        >
                            Health 1
                        </span>
                    </div>
                </div>

                <div>
                    <p
                        style={{
                            color:
                                "var(--text-secondary)",
                            marginBottom: "12px",
                        }}
                    >
                        Recent
                    </p>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "14px",
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "6px",
                                    flexWrap: "wrap",
                                    marginBottom: "6px",
                                }}
                            >
                                <span
                                    style={{
                                        padding: "3px 8px",
                                        borderRadius: "999px",
                                        fontSize: "0.68rem",
                                        background: "#83545c33",
                                        border:
                                            "1px solid #83545c66",
                                    }}
                                >
                                    Reminder
                                </span>

                                <span
                                    style={{
                                        padding: "3px 8px",
                                        borderRadius: "999px",
                                        fontSize: "0.68rem",
                                        background: "#063f4733",
                                        border:
                                            "1px solid #063f4766",
                                    }}
                                >
                                    Work
                                </span>
                            </div>

                            <div
                                style={{
                                    fontSize: "0.85rem",
                                }}
                            >
                                Portfolio Review
                            </div>
                        </div>

                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "6px",
                                    flexWrap: "wrap",
                                    marginBottom: "6px",
                                }}
                            >
                                <span
                                    style={{
                                        padding: "3px 8px",
                                        borderRadius: "999px",
                                        fontSize: "0.68rem",
                                        background: "#83545c33",
                                        border:
                                            "1px solid #83545c66",
                                    }}
                                >
                                    Reminder
                                </span>

                                <span
                                    style={{
                                        padding: "3px 8px",
                                        borderRadius: "999px",
                                        fontSize: "0.68rem",
                                        background: "#29737633",
                                        border:
                                            "1px solid #29737666",
                                    }}
                                >
                                    Study
                                </span>
                            </div>

                            <div
                                style={{
                                    fontSize: "0.85rem",
                                }}
                            >
                                Submit Assignment
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}

export default ReminderOverview;