// appears on Alarms.jsx
import { useState } from "react";

function AlarmCard({
    alarm,
    onClick,
    onDelete,
    onToggle,
}) {
    // states
    const [hovered, setHovered] =
        useState(false);

    const toggleStyle = (active) => ({
        width: "46px",
        height: "26px",

        borderRadius: "999px",

        background: active
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.03)",

        border: active
            ? "1px solid rgba(255,255,255,0.12)"
            : "1px solid rgba(255,255,255,0.06)",

        position: "relative",

        cursor: "pointer",

        transition: "all 0.25s ease",

        backdropFilter: "blur(20px)",
    });

    const dayLabels = {
        sun: "S",
        mon: "M",
        tue: "T",
        wed: "W",
        thu: "T",
        fri: "F",
        sat: "S",
    };

    return (
        <div
            onClick={() =>
                onClick(alarm)
            }
            style={{
                // can be changed to be smaller for alarm card 
                height: "220px",
                width: "300px",

                justifyContent: "space-between",

                flexShrink: 0,

                background: "rgba(255, 255, 255, 0.025)",
                border: "1px solid rgba(255,255,255,0.06)",

                borderRadius: "24px",

                padding: "18px",

                display: "flex",
                flexDirection: "column",

                cursor: "pointer",

                transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
                setHovered(true);

                e.currentTarget.style.transform =
                    "translateY(-2px)";

                e.currentTarget.style.background =
                    "rgba(15,15,15,0.2)";
            }}
            onMouseLeave={(e) => {
                setHovered(false);

                e.currentTarget.style.transform =
                    "translateY(0)";

                e.currentTarget.style.background =
                    "rgba(255,255,255,0.025)";
            }}
        >
            {/* ROW 1 */}
            {/* ON HOVER X */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",

                    minHeight: "24px",
                }}
            >
                {hovered && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.(alarm._id);
                        }}
                        style={{
                            width: "26px",
                            height: "26px",

                            borderRadius: "999px",

                            border: "none",

                            background:
                                "rgba(255,255,255,0.04)",

                            color:
                                "var(--text-secondary)",

                            cursor: "pointer",

                            fontSize: "0.8rem",

                            transition: "all 0.2s ease",
                        }}
                    >
                        ×
                    </button>
                )}
            </div>

            {/* ROW 2 */}
            <div
                style={{
                    textAlign: "center",

                    marginTop: "-8px",
                }}
            >
                <div
                    style={{
                        fontSize: "3rem",

                        fontWeight: "200",

                        letterSpacing: "-0.04em",

                        color:
                            "var(--text-primary)",
                    }}
                >
                    {alarm?.time || "09:00"}
                </div>
            </div>

            {/* ROW 3 LABEL / TITLE ALARM OR DEFAULT ALARM TEXT*/}
            <div
                style={{
                    textAlign: "center",

                    marginTop: "-8px",
                }}
            >
                <p
                    style={{
                        margin: 0,

                        fontSize: "0.9rem",

                        fontWeight: "300",

                        color:
                            "var(--text-secondary)",
                    }}
                >
                    {alarm?.label || "Alarm"}
                </p>
            </div>

            {/* ROW 4 REPEATDAYS STACKED AVATARS */}

            <div
                style={{
                    display: "flex",

                    justifyContent: "center",

                    gap: "6px",

                    marginTop: "6px",
                }}
            >
                {(alarm?.repeatDays ?? []).map((day) => (
                    <div
                        key={day}
                        style={{
                            width: "26px",
                            height: "26px",

                            borderRadius:
                                "999px",

                            border: "1px solid rgba(255,255,255,0.06)",

                            background: "rgba(87, 112, 122, 0.35)",

                            color:
                                "var(--text-secondary)",

                            display: "flex",

                            alignItems: "center",

                            justifyContent: "center",

                            fontSize: "0.68rem",

                            fontWeight: "300",
                        }}
                    >
                        {dayLabels[day]}
                    </div>
                ))}
            </div>

            {/* ROW 5 TOGGLE ON/OFF */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",

                    marginTop: "10px",
                }}
            >
                <div
                    onClick={(e) => {
                        e.stopPropagation();

                        onToggle?.(alarm);
                    }}
                    style={toggleStyle(
                        alarm?.enabled ?? true
                    )}
                >
                    <div
                        style={{
                            width: "18px",
                            height: "18px",

                            borderRadius: "50%",

                            background:
                                "rgba(255,255,255,0.9)",

                            position: "absolute",

                            top: "3px",

                            left:
                                alarm?.enabled
                                    ? "23px"
                                    : "3px",

                            transition:
                                "all 0.25s ease",

                            boxShadow:
                                "0 4px 12px rgba(0,0,0,0.25)",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default AlarmCard;