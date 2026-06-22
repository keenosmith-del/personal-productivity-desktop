import { useState } from "react";

import {
    X,
} from "lucide-react";

function DefaultReminderModal({
    onClose,
    preferences,
    savePreferences,
}) {
    const [
        selectedReminder,
        setSelectedReminder,
    ] = useState(
        preferences?.defaultReminder ||
        "15 mins"
    );
    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,

                background:
                    "rgba(0,0,0,0.55)",

                backdropFilter:
                    "blur(12px)",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                zIndex: 1000,
            }}
        >
            <div
                onClick={(e) =>
                    e.stopPropagation()
                }
                style={{
                    width: "500px",

                    background:
                        "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",

                    border:
                        "1px solid rgba(255,255,255,0.10)",

                    borderRadius: "32px",

                    backdropFilter:
                        "blur(30px)",

                    boxShadow:
                        "0 20px 60px rgba(0,0,0,0.35)",

                    padding: "36px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "20px",
                }}
            >
                <div
                    style={{
                        display: "flex",

                        justifyContent:
                            "space-between",

                        alignItems: "center",
                    }}
                >
                    <h2
                        style={{
                            fontWeight: "400",
                        }}
                    >
                        Default Reminder
                    </h2>

                    <X
                        size={18}
                        strokeWidth={1.5}
                        style={{
                            cursor: "pointer",

                            transition: "all 0.2s ease",
                        }}
                        onClick={onClose}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.opacity =
                                "0.7";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.opacity =
                                "1";
                        }}
                    />
                </div>

                {/* MODAL CHANGE */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                    }}
                >
                    {[
                        "5 mins",
                        "10 mins",
                        "15 mins",
                        "30 mins",
                        "60 mins",
                    ].map((value) => {
                        const selected =
                            value ===
                            selectedReminder;

                        return (
                            <button
                                key={value}
                                onClick={() =>
                                    setSelectedReminder(
                                        value
                                    )
                                }
                                style={{
                                    padding: "14px 18px",

                                    background: selected
                                        ? "rgba(82,103,125,0.25)"
                                        : "rgba(255,255,255,0.05)",

                                    border: "1px solid rgba(255,255,255,0.08)",

                                    borderRadius: "999px",

                                    color: "var(--text-primary)",

                                    cursor: "pointer",

                                    fontWeight: "300",

                                    transition:
                                        "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                        selected
                                            ? "rgba(82,103,125,0.38)"
                                            : "rgba(255,255,255,0.08)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                        selected
                                            ? "rgba(82,103,125,0.25)"
                                            : "rgba(255,255,255,0.05)";
                                }}
                            >
                                {value}
                            </button>
                        );
                    })}
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "flex-end",
                        gap: "12px",
                        marginTop: "8px",
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            background: "transparent",

                            border: "1px solid rgba(255,255,255,0.08)",

                            borderRadius: "999px",

                            padding: "8px 14px",

                            color: "#ff6b6b",

                            fontSize: "0.8rem",

                            fontWeight: "300",

                            cursor: "pointer",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color =
                                "#ff6b6b";

                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.04)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color =
                                "#ff6b6b";

                            e.currentTarget.style.background =
                                "transparent";
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={async () => {
                            try {
                                await savePreferences({
                                    defaultReminder:
                                        selectedReminder,
                                });

                                onClose();

                            } catch (error) {
                                console.error(error);
                            }
                        }}
                        style={{
                            background: "transparent",

                            border: "1px solid rgba(255,255,255,0.08)",

                            borderRadius: "999px",

                            padding: "8px 14px",

                            color: "var(--text-secondary)",

                            fontSize: "0.8rem",

                            fontWeight: "300",

                            cursor: "pointer",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color =
                                "var(--text-primary)";

                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.04)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color =
                                "var(--text-secondary)";

                            e.currentTarget.style.background =
                                "transparent";
                        }}
                    >
                        Save
                    </button>
                </div>

            </div>
        </div>
    );
}

export default DefaultReminderModal;