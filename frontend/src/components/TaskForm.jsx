import { useState } from "react";
import GlassCard from "./GlassCard";
import SegmentedControl from "./SegmentedControl";
import GlassInput from "./GlassInput";
import GlassTextarea from "./GlassTextarea";
import PrimaryButton from "./PrimaryButton";

function TaskForm() {
    const [priority, setPriority] =
        useState("Medium");
    return (
        <GlassCard>
            <h2
                style={{
                    marginBottom: "24px",
                }}
            >
                Create Task
            </h2>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}
            >
                <GlassInput
                    placeholder="Task name"
                    style={{
                        background:
                            "rgba(255,255,255,0.04)",

                        border:
                            "1px solid var(--glass-border)",

                        borderRadius: "12px",

                        padding: "12px 16px",

                        color:
                            "var(--text-primary)",

                        outline: "none",
                    }}
                />

                <GlassTextarea
                    placeholder="Description"
                    rows={4}
                    style={{
                        resize: "none",

                        background:
                            "rgba(255,255,255,0.04)",

                        border:
                            "1px solid var(--glass-border)",

                        borderRadius: "12px",

                        padding: "12px 16px",

                        color:
                            "var(--text-primary)",

                        outline: "none",
                    }}
                />

                <div>
                    <p
                        style={{
                            marginBottom: "8px",

                            color:
                                "var(--text-secondary)",

                            fontSize: "0.9rem",
                        }}
                    >
                        Priority
                    </p>

                    <SegmentedControl
                        options={[
                            "Low",
                            "Medium",
                            "High",
                        ]}
                        selected={priority}
                        onSelect={setPriority}
                    />
                </div>

                <input
                    type="date"
                    style={{
                        background:
                            "rgba(255,255,255,0.04)",

                        border:
                            "1px solid var(--glass-border)",

                        borderRadius: "12px",

                        padding: "12px 16px",

                        color:
                            "var(--text-primary)",

                        outline: "none",
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <PrimaryButton
                        style={{
                            padding:
                                "12px 20px",

                            borderRadius:
                                "12px",

                            border: "none",

                            cursor: "pointer",
                        }}
                    >
                        Create Task
                    </PrimaryButton>
                </div>
            </div>
        </GlassCard>
    );
}

export default TaskForm;