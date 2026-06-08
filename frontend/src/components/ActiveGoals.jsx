import { useState } from "react";

import GlassCard from "./GlassCard";

import {
    Pencil,
    Trash2,
} from "lucide-react";

function ActiveGoals() {
    const [completedGoals, setCompletedGoals] =
        useState({});

    const goals = [
        "Become Full-Stack Developer",
        "Complete Generative AI Course",
        "Launch Portfolio Website",
    ];

    return (
        <GlassCard>
            <h2
                style={{
                    marginBottom: "24px",
                }}
            >
                Active Goals
            </h2>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                {goals.map((goal) => (
                    <div
                        key={goal}
                        style={{
                            display: "flex",

                            alignItems: "center",

                            justifyContent:
                                "space-between",

                            padding: "14px",

                            background:
                                "rgba(255,255,255,0.04)",

                            border:
                                "1px solid var(--glass-border)",

                            borderRadius: "12px",

                            transition:
                                "all 0.25s ease",

                            cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(14,17,22,0.75)";

                            e.currentTarget.style.transform =
                                "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.04)";

                            e.currentTarget.style.transform =
                                "translateY(0)";
                        }}
                    >
                        <div
                            style={{
                                display: "flex",

                                alignItems: "center",

                                gap: "12px",
                            }}
                        >
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();

                                    setCompletedGoals(
                                        (prev) => ({
                                            ...prev,
                                            [goal]:
                                                !prev[goal],
                                        })
                                    );
                                }}
                                style={{
                                    cursor: "pointer",

                                    width: "18px",
                                    height: "18px",

                                    borderRadius: "50%",

                                    border:
                                        "1.5px solid rgba(245,245,245,0.7)",

                                    background:
                                        completedGoals[goal]
                                            ? "rgba(245,245,245,0.75)"
                                            : "transparent",

                                    transition:
                                        "all 0.2s ease",

                                    flexShrink: 0,
                                }}
                            />

                            <span>
                                {goal}
                            </span>
                        </div>

                        <div
                            style={{
                                display: "flex",

                                alignItems: "center",

                                gap: "12px",
                            }}
                        >
                            <Pencil
                                size={16}
                                strokeWidth={1.5}
                                style={{
                                    cursor: "pointer",

                                    transition:
                                        "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color =
                                        "#F5F5F5";

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

                            <Trash2
                                size={16}
                                strokeWidth={1.5}
                                style={{
                                    cursor: "pointer",

                                    transition:
                                        "all 0.2s ease",
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
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}

export default ActiveGoals;