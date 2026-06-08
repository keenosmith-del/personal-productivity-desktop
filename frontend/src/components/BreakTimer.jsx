import { useState } from "react";

import GlassCard from "./GlassCard";
import SegmentedControl from "./SegmentedControl";
import PrimaryButton from "./PrimaryButton";

function BreakTimer() {
    const [duration, setDuration] =
        useState("15m");

    const timeMap = {
        "15m": "15:00",
        "30m": "30:00",
        "45m": "45:00",
        "60m": "60:00",
    };

    return (
        <GlassCard minHeight="650px">
            <div
                style={{
                    height: "100%",

                    display: "flex",

                    flexDirection: "column",

                    alignItems: "center",

                    justifyContent: "center",
                }}
            >
                <h1
                    style={{
                        fontSize: "2rem",

                        fontWeight: "500",

                        marginBottom: "48px",
                    }}
                >
                    Need a break?
                </h1>

                <p
                    style={{
                        marginBottom: "40px",

                        color:
                            "var(--text-secondary)",
                    }}
                >
                    Take a moment to reset and
                    recharge.
                </p>

                <div
                    style={{
                        width: "320px",
                        height: "320px",

                        borderRadius: "50%",

                        border:
                            "2px solid rgba(255,255,255,0.08)",

                        display: "flex",

                        alignItems: "center",

                        justifyContent: "center",

                        marginBottom: "48px",

                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            width: "280px",
                            height: "280px",

                            borderRadius: "50%",

                            background:
                                "rgba(255,255,255,0.02)",

                            border:
                                "1px solid rgba(255,255,255,0.04)",

                            display: "flex",

                            alignItems: "center",

                            justifyContent: "center",

                            backdropFilter:
                                "blur(20px)",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "5rem",

                                fontWeight: "300",

                                letterSpacing:
                                    "-4px",

                                lineHeight: 1,
                            }}
                        >
                            {timeMap[duration]}
                        </span>
                    </div>
                </div>

                <div
                    style={{
                        marginBottom: "40px",
                    }}
                >
                    <SegmentedControl
                        options={[
                            "15m",
                            "30m",
                            "45m",
                            "60m",
                        ]}
                        selected={duration}
                        onSelect={setDuration}
                    />
                </div>

                <PrimaryButton>
                    Start Break
                </PrimaryButton>
            </div>
        </GlassCard>
    );
}

export default BreakTimer;