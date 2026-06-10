import GlassCard from "./GlassCard";
import { Plus } from "lucide-react";
import { useState } from "react";

function TaskOverview({
    onNewTask,
}) {
    return (
        <GlassCard minHeight="180px">
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
                    }}
                >
                    Tasks
                </h2>

                <button
                    onClick={onNewTask}
                    style={{
                        background: "transparent",

                        border: "none",

                        color:
                            "var(--text-secondary)",

                        display: "flex",

                        alignItems: "center",

                        gap: "6px",

                        cursor: "pointer",

                        fontSize: "0.9rem",

                        fontWeight: "400",

                        transition:
                            "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color =
                            "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color =
                            "var(--text-secondary)";
                    }}
                >
                    <Plus
                        size={16}
                        strokeWidth={1.5}
                    />
                    New Task
                </button>
            </div>

            <div
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "repeat(3, 1fr)",

                    gap: "24px",
                }}
            >
                <div>
                    <p
                        style={{
                            color:
                                "var(--text-secondary)",

                            fontSize: "0.85rem",
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
                </div>

                <div>
                    <p
                        style={{
                            color:
                                "var(--text-secondary)",

                            fontSize: "0.85rem",
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

                <div>
                    <p
                        style={{
                            color:
                                "var(--text-secondary)",

                            fontSize: "0.85rem",
                        }}
                    >
                        Completion Rate
                    </p>

                    <h1
                        style={{
                            fontWeight: "400",
                        }}
                    >
                        80%
                    </h1>
                </div>
            </div>
        </GlassCard>
    );
}

export default TaskOverview;