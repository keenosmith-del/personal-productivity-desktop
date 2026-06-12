import {
    useState,
    useEffect,
    useRef,
} from "react";

import { Bell } from "lucide-react";

import GlassCard from "../GlassCard";
import PrimaryButton from "../PrimaryButton";

function BreakTimer() {
    // COMPONENT STATES
    const [duration, setDuration] =
        useState("30m");

    const [customMinutes, setCustomMinutes] =
        useState("30");

    const durations = [
        "5",
        "10",
        "15m",
        "30m",
        "45m",
        "60m",
    ];

    const [isBreakActive, setIsBreakActive] =
        useState(false);

    const timeMap = {
        "5": "05:00",
        "10": "10:00",
        "15m": "15:00",
        "30m": "30:00",
        "45m": "45:00",
        "60m": "60:00",
    };

    const durationMap = {
        "5": 5 * 60,
        "10": 10 * 60,
        "15m": 15 * 60,
        "30m": 30 * 60,
        "45m": 45 * 60,
        "60m": 60 * 60,
    };

    const [secondsLeft, setSecondsLeft] =
        useState(durationMap[duration]);

    const [isPaused, setIsPaused] =
        useState(false);

    const wheelRef = useRef(null);

    const selectedDuration =
        (Number(
            customMinutes
        ) || 15) * 60;

    const progress =
        secondsLeft /
        selectedDuration;

    const circumference =
        2 * Math.PI * 140;

    const strokeOffset =
        circumference *
        (1 - progress);

    const selectedIndex =
        durations.indexOf(duration);

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

    // FUNCTIONS
    useEffect(() => {
        if (
            !isBreakActive ||
            isPaused
        )
            return;

        const timer = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    setIsBreakActive(false);
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

    useEffect(() => {
        if (!wheelRef.current) return;

        wheelRef.current.scrollTop = 44;
    }, []);

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
        setSecondsLeft(
            (Number(
                customMinutes
            ) || 15) * 60
        );

        setIsPaused(false);

        setIsBreakActive(true);
    };

    return (
        <>
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

                            fontWeight: "400",

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

                            fontWeight: "300",
                            letterSpacing: "-0.01em",
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

                            display: "flex",

                            alignItems: "center",

                            justifyContent: "center",

                            marginBottom: "48px",

                            position: "relative",
                        }}
                    >
                        <svg
                            width="320"
                            height="320"
                            style={{
                                position: "absolute",
                                inset: 0,
                                transform:
                                    "rotate(-90deg)",
                            }}
                        >
                            <circle
                                cx="160"
                                cy="160"
                                r="140"
                                fill="none"
                                stroke="rgba(255,255,255,0.08)"
                                strokeWidth="4"
                            />

                            <circle
                                cx="160"
                                cy="160"
                                r="140"
                                fill="none"
                                stroke="rgba(255,255,255,0.35)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={
                                    circumference
                                }
                                strokeDashoffset={
                                    isBreakActive
                                        ? strokeOffset
                                        : 0
                                }
                                style={{
                                    transition:
                                        "stroke-dashoffset 1s linear",
                                }}
                            />
                        </svg>

                        <div
                            style={{
                                width: "280px",
                                height: "280px",

                                borderRadius: "50%",

                                background:
                                    "rgba(0,0,0,0.30)",

                                border:
                                    "1px solid rgba(255,255,255,0.06)",

                                display: "flex",

                                alignItems: "center",

                                justifyContent: "center",

                                backdropFilter:
                                    "blur(2px)",

                                position: "relative",

                                zIndex: 1,
                            }}
                        >
                            <input
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
                                value={`${customMinutes}:00`}
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

                                    fontSize: "5rem",

                                    fontWeight: "300",

                                    letterSpacing:
                                        "-4px",
                                }}
                            />
                        </div>
                    </div>

                    <div
                        ref={wheelRef}
                        style={{
                            height: "95px",

                            width: "70px",

                            overflowY: "auto",

                            display: "flex",

                            flexDirection: "column",

                            alignItems: "center",

                            gap: "12px",

                            marginBottom: "40px",

                            paddingTop: "20px",

                            paddingBottom: "20px",

                            scrollbarWidth: "none",

                            maskImage:
                                "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",

                            WebkitMaskImage:
                                "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
                        }}
                    >
                        {durations.map(
                            (item, index) => {
                                const distance =
                                    Math.abs(
                                        index -
                                        selectedIndex
                                    );

                                return (
                                    <button
                                        key={item}
                                        onClick={() => {
                                            setDuration(item);

                                            setCustomMinutes(
                                                item.replace("m", "")
                                            );
                                        }}
                                        style={{
                                            background:
                                                "transparent",

                                            border: "none",

                                            cursor: "pointer",

                                            color:
                                                distance === 0
                                                    ? "white"
                                                    : "rgba(255,255,255,0.35)",

                                            fontSize:
                                                distance === 0
                                                    ? "1.4rem"
                                                    : "0.9rem",

                                            fontWeight:
                                                distance === 0
                                                    ? "400"
                                                    : "300",

                                            opacity:
                                                distance === 0
                                                    ? 1
                                                    : distance === 1
                                                        ? 0.65
                                                        : 0.15,

                                            filter:
                                                distance === 0
                                                    ? "none"
                                                    : distance === 1
                                                        ? "none"
                                                        : "blur(1px)",

                                            transform:
                                                distance === 0
                                                    ? "scale(1.1)"
                                                    : "scale(0.9)",

                                            transition:
                                                "all 0.2s ease",

                                            height: "32px",
                                        }}
                                    >
                                        {item.replace(
                                            "m",
                                            ""
                                        )}
                                    </button>
                                );
                            })}
                    </div>

                    <PrimaryButton
                        onClick={startBreak}
                    >
                        Start Break
                    </PrimaryButton>
                </div>
            </GlassCard>
            {isBreakActive && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,

                        background:
                            "rgba(0,0,0,0.75)",

                        backdropFilter:
                            "blur(10px)",

                        display: "flex",

                        justifyContent:
                            "center",

                        alignItems:
                            "center",

                        zIndex: 3000,
                    }}
                >
                    <div
                        style={{
                            textAlign: "center",

                            display: "flex",

                            flexDirection:
                                "column",

                            gap: "24px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",

                                alignItems: "center",

                                justifyContent:
                                    "center",

                                gap: "8px",

                                color:
                                    "rgba(255,255,255,0.45)",

                                fontSize: "1rem",

                                fontWeight: "300",
                            }}
                        >
                            <Bell size={14} />

                            <span>{breakEndTime}</span>
                        </div>

                        <div
                            style={{
                                position: "relative",

                                width: "320px",

                                height: "320px",

                                display: "flex",

                                justifyContent:
                                    "center",

                                alignItems:
                                    "center",
                            }}
                        >
                            <svg
                                width="320"
                                height="320"
                                style={{
                                    position:
                                        "absolute",

                                    transform:
                                        "rotate(-90deg)",
                                }}
                            >
                                <circle
                                    cx="160"
                                    cy="160"
                                    r="140"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.04)"
                                    strokeWidth="3"
                                />

                                <circle
                                    cx="160"
                                    cy="160"
                                    r="140"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.22)"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeDasharray={
                                        circumference
                                    }
                                    strokeDashoffset={
                                        strokeOffset
                                    }
                                    style={{
                                        filter:
                                            "drop-shadow(0 0 8px rgba(255,255,255,0.12))",
                                    }}
                                />
                            </svg>

                            <div
                                style={{
                                    fontSize: "6rem",

                                    fontWeight: "200",

                                    letterSpacing:
                                        "-4px",

                                    position:
                                        "relative",

                                    zIndex: 1,
                                }}
                            >
                                {formatTime(
                                    secondsLeft
                                )}
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",

                                gap: "12px",

                                justifyContent:
                                    "center",
                            }}
                        >
                            <button
                                onClick={() =>
                                    setIsPaused(
                                        !isPaused
                                    )
                                }
                                style={{
                                    background:
                                        "transparent",

                                    border:
                                        "1px solid rgba(255,255,255,0.08)",

                                    borderRadius:
                                        "16px",

                                    padding:
                                        "14px 18px",

                                    color:
                                        "white",

                                    cursor:
                                        "pointer",

                                    minWidth:
                                        "120px",

                                    fontWeight:
                                        "400",

                                    transition:
                                        "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                        "rgba(255,255,255,0.05)";
                                }}

                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                        "transparent";
                                }}
                            >
                                {isPaused
                                    ? "Resume"
                                    : "Pause"}
                            </button>

                            <button
                                onClick={() => {
                                    setIsBreakActive(
                                        false
                                    );

                                    setIsPaused(
                                        false
                                    );

                                    setSecondsLeft(
                                        (Number(
                                            customMinutes
                                        ) || 15) * 60
                                    );
                                }}
                                style={{
                                    background:
                                        "transparent",

                                    border:
                                        "1px solid rgba(255,255,255,0.08)",

                                    borderRadius:
                                        "16px",

                                    padding:
                                        "14px 18px",

                                    color:
                                        "#ff6b6b",

                                    cursor:
                                        "pointer",

                                    minWidth:
                                        "120px",

                                    fontWeight:
                                        "400",

                                    transition:
                                        "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                        "rgba(255,255,255,0.05)";
                                }}

                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                        "transparent";
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BreakTimer;