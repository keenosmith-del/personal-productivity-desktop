import {
    useState,
    useEffect,
} from "react";

import { Bell } from "lucide-react";
import BreakSlideout from "./BreakSlideout";

function BreakTimer() {
    // STATES
    const [customMinutes, setCustomMinutes] =
        useState("30");

    const [isBreakActive, setIsBreakActive] =
        useState(false);

    const [showBreakSlideout, setShowBreakSlideout] =
        useState(false);

    const [isPaused, setIsPaused] =
        useState(false);

    const [secondsLeft, setSecondsLeft] =
        useState(30 * 60);

    const [isBreakComplete, setIsBreakComplete] =
        useState(false);


    // TIMER VALUES
    const selectedDuration =
        (Number(customMinutes) || 15) * 60;

    const progress =
        secondsLeft /
        selectedDuration;

    const circumference =
        2 * Math.PI * 185;

    const breakEndTime =
        new Date(
            Date.now() +
            secondsLeft * 1000
        ).toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        );

    useEffect(() => {
        if (
            !isBreakActive ||
            isPaused
        ) {
            return;
        }

        const timer =
            setInterval(() => {
                setSecondsLeft((prev) => {
                    if (prev <= 1) {
                        setIsBreakActive(false);

                        setIsBreakComplete(true);

                        setShowBreakSlideout(true);

                        setTimeout(() => {

                            setIsBreakComplete(false);

                            setSecondsLeft(
                                (Number(customMinutes) || 15) * 60
                            );

                        }, 30000);

                        return 0;
                    }

                    return prev - 1;
                });
            }, 1000);

        return () =>
            clearInterval(timer);
    }, [
        isBreakActive,
        isPaused,
    ]);

    // HELPERS
    const formatTime = (seconds) => {
        const mins = Math.floor(
            seconds / 60
        );

        const secs =
            seconds % 60;

        return `${String(mins).padStart(
            2,
            "0"
        )}:${String(secs).padStart(
            2,
            "0"
        )}`;
    };


    const startBreak = () => {
        const minutes =
            Number(customMinutes) || 15;

        setSecondsLeft(
            minutes * 60
        );

        setIsPaused(false);

        setIsBreakActive(true);
    };

    const buttonStyle = {
        background: "transparent",

        border:
            "1px solid rgba(255,255,255,0.08)",

        borderRadius: "999px",

        padding: "8px 14px",

        color:
            "var(--text-secondary)",

        fontSize: "0.8rem",

        fontWeight: "300",

        cursor: "pointer",

        transition:
            "all 0.2s ease",
    };
    return (
        <div
            style={{
                height: "calc(100vh - 100px)",

                display: "flex",

                flexDirection: "column",

                justifyContent: "center",

                alignItems: "center",
            }}
        >
            <div
                style={{
                    marginBottom: "42px",

                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        fontSize: "0.82rem",

                        fontWeight: "300",

                        letterSpacing: "0.18em",

                        textTransform: "uppercase",

                        color: "var(--text-secondary)",

                        opacity: 0.5,
                    }}
                >
                    Break Timer
                </div>
            </div>

            <div
                style={{
                    width: "420px",
                    height: "420px",

                    borderRadius: "50%",

                    position: "relative",

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    marginBottom: "48px",
                }}
            >
                <svg
                    width="420"
                    height="420"
                    style={{
                        position: "absolute",

                        transform: "rotate(-90deg)",
                    }}
                >
                    <circle
                        cx="210"
                        cy="210"
                        r="185"
                        fill="none"
                        stroke="rgba(255,255,255,0.04)"
                        strokeWidth="2"
                    />

                    {isBreakActive && (
                        <circle
                            cx="210"
                            cy="210"
                            r="185"
                            fill="none"
                            stroke="rgba(255,255,255,0.22)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={
                                circumference *
                                (1 - progress)
                            }
                            style={{
                                transition:
                                    "stroke-dashoffset 1s linear",
                            }}
                        />
                    )}
                </svg>

                <div
                    style={{
                        width: "360px",
                        height: "360px",

                        background:
                            "linear-gradient(135deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015))",

                        border:
                            "1px solid rgba(255,255,255,0.06)",

                        backdropFilter:
                            "blur(24px)",

                        boxShadow: isBreakComplete
                            ? "0 0 120px rgba(255,255,255,0.08)"
                            : isBreakActive
                                ? "0 50px 100px rgba(0,0,0,0.45)"
                                : "0 40px 80px rgba(0,0,0,0.35)",

                        transform: isBreakActive
                            ? "scale(1.015)"
                            : "scale(1)",

                        transition:
                            "all 0.6s ease",

                        borderRadius: "50%",

                        display: "flex",

                        alignItems: "center",

                        justifyContent: "center",

                        position: "relative",

                        zIndex: 1,
                    }}
                    onMouseEnter={(e) => {
                        if (!isBreakActive) {
                            e.currentTarget.style.transform =
                                "scale(1.01)";

                            e.currentTarget.style.boxShadow =
                                "0 55px 110px rgba(0,0,0,0.42)";
                        }
                    }}

                    onMouseLeave={(e) => {
                        if (!isBreakActive) {
                            e.currentTarget.style.transform =
                                "scale(1)";

                            e.currentTarget.style.boxShadow =
                                "0 40px 80px rgba(0,0,0,0.35)";
                        }
                    }}
                >
                    {isBreakActive && (
                        <div
                            style={{
                                position: "absolute",

                                top: "88px",

                                display: "flex",

                                alignItems: "center",

                                gap: "8px",

                                fontSize: "0.78rem",

                                color:
                                    "var(--text-secondary)",

                                opacity: 0.5,

                                letterSpacing: "0.04em",
                            }}
                        >
                            <Bell size={13} />

                            <span>
                                Ends {breakEndTime}
                            </span>
                        </div>
                    )}
                    <input
                        disabled={isBreakActive}
                        onKeyDown={(e) => {
                            const cursor =
                                e.target.selectionStart;

                            if (
                                cursor >
                                customMinutes.length
                            ) {
                                e.preventDefault();
                            }

                            if (e.key === "Enter") {
                                e.target.blur();

                                startBreak();
                            }
                        }}
                        type="text"
                        value={
                            isBreakActive
                                ? formatTime(secondsLeft)
                                : `${customMinutes}:00`
                        }
                        onChange={(e) => {
                            let value =
                                e.target.value.match(
                                    /^\d{0,2}/
                                )?.[0] || "";

                            if (value !== "") {
                                const num =
                                    Number(value);

                                if (num > 99) {
                                    value = "99";
                                }
                            }

                            setCustomMinutes(value);
                        }}
                        onBlur={() => {
                            const mins =
                                Number(
                                    customMinutes
                                ) || 15;

                            setSecondsLeft(
                                mins * 60
                            );
                        }}
                        style={{
                            background:
                                "transparent",

                            border: "none",

                            outline: "none",

                            color: "white",

                            width: "240px",

                            textAlign:
                                "center",

                            fontSize: "5.8rem",

                            fontWeight: "200",

                            letterSpacing: "-0.06em",
                            lineHeight: 1,

                            textShadow:
                                "0 0 30px rgba(255,255,255,0.03)",

                            fontFamily:
                                "-apple-system, BlinkMacSystemFont, sans-serif",

                            cursor:
                                isBreakActive
                                    ? "default"
                                    : "text",

                        }}
                    />

                    <div
                        style={{
                            position: "absolute",
                            bottom: "95px",

                            opacity:
                                isBreakActive ? 0 : 0.45,

                            transform:
                                isBreakActive
                                    ? "translateY(8px)"
                                    : "translateY(0)",

                            transition:
                                "all 0.4s ease",

                            fontSize: "0.8rem",

                            letterSpacing: "0.3em",

                            textTransform: "uppercase",

                            color: "var(--text-secondary)",
                        }}
                    >
                        Minutes
                    </div>
                </div>
            </div>

            <div
                style={{
                    display: "flex",

                    gap: "12px",

                    marginTop: "8px",
                }}
            >
                {!isBreakActive ? (
                    <button
                        onClick={startBreak}
                        style={buttonStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.04)";

                            e.currentTarget.style.color =
                                "var(--text-primary)";

                            e.currentTarget.style.transform =
                                "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "transparent";

                            e.currentTarget.style.color =
                                "var(--text-secondary)";

                            e.currentTarget.style.transform =
                                "translateY(0)";
                        }}
                    >
                        Start break
                    </button>
                ) : (
                    <>
                        <button
                            onClick={() =>
                                setIsPaused(
                                    !isPaused
                                )
                            }
                            style={buttonStyle}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.04)";

                                e.currentTarget.style.color =
                                    "var(--text-primary)";

                                e.currentTarget.style.transform =
                                    "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "transparent";

                                e.currentTarget.style.color =
                                    "var(--text-secondary)";

                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >
                            {isPaused
                                ? "Resume"
                                : "Pause"}
                        </button>

                        <button
                            onClick={() => {
                                setIsBreakActive(false);

                                setIsPaused(false);

                                setIsBreakComplete(false);

                                setShowBreakSlideout(false);

                                setSecondsLeft(
                                    (Number(
                                        customMinutes
                                    ) || 15) * 60
                                );
                            }}
                            style={{
                                ...buttonStyle,

                                color: "#ff6b6b",

                                border:
                                    "1px solid rgba(255,107,107,0.12)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(255,107,107,0.12)";

                                e.currentTarget.style.transform =
                                    "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "transparent";

                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >
                            Cancel
                        </button>
                    </>
                )}
            </div>

            <div
                style={{
                    marginTop: "24px",

                    fontSize: "0.82rem",

                    color: "var(--text-secondary)",

                    opacity: 0.35,

                    letterSpacing: "0.04em",
                }}
            >
                {
                    isBreakComplete
                        ? "Break complete. Welcome back."
                        : isBreakActive
                            ? "Disconnect. Recharge."
                            : "Step away. Breathe. Reset."
                }
            </div>
            {showBreakSlideout && (
                <BreakSlideout
                    duration={customMinutes}
                    onClose={() =>
                        setShowBreakSlideout(false)
                    }
                />
            )}
        </div>
    );
}

export default BreakTimer;
