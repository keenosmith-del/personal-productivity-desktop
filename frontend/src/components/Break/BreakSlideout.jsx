import {
    useEffect,
    useState,
} from "react";

import { Coffee } from "lucide-react";

function BreakSlideout({
    duration,
    onClose,
}) {
    const [hovered, setHovered] =
        useState(false);

    const [closing, setClosing] =
        useState(false);

    const closeSlideout = (
        callback
    ) => {

        setClosing(true);

        setTimeout(() => {

            callback?.();

            onClose();

        }, 280);
    };

    useEffect(() => {

        const timer = setTimeout(() => {

            closeSlideout();

        }, 30000);

        return () =>
            clearTimeout(timer);

    }, [onClose]);

    useEffect(() => {

        const audio = new Audio(
            "/sounds/alarm.mp3"
        );

        audio.volume = 0.4;

        audio.play().catch(() => { });

    }, []);

    return (
        <div
            onMouseEnter={() =>
                setHovered(true)
            }
            onMouseLeave={() =>
                setHovered(false)
            }
            style={{
                position: "fixed",

                top: "86px",
                right: "24px",

                width: "360px",
                minHeight: "108px",

                padding: "12px 18px",

                background:
                    "rgba(0, 0, 0, 0)",

                backdropFilter:
                    "blur(6px)",

                border:
                    "1px solid rgba(255,255,255,0.08)",

                borderRadius: "22px",

                justifyContent: "space-between",

                gap: 0,

                boxShadow:
                    "0 20px 50px rgba(0, 0, 0, 0.15)",

                zIndex: 5000,

                display: "flex",

                flexDirection: "column",

                animation: closing
                    ? "slideOut .28s ease forwards"
                    : "slideIn .28s ease forwards",
            }}
        >
            {/* Close */}

            <div
                style={{
                    display: "flex",

                    justifyContent:
                        "flex-start",

                    minHeight: "20px",
                }}
            >
                {hovered && (
                    <button
                        onClick={() =>
                            closeSlideout()
                        }
                        style={{
                            width: "24px",
                            height: "24px",

                            borderRadius:
                                "999px",

                            border: "none",

                            background:
                                "rgba(255,255,255,0.04)",

                            color:
                                "var(--text-secondary)",

                            cursor: "pointer",

                            fontSize: "0.82rem",

                            transition:
                                "all .2s ease",
                        }}
                    >
                        ×
                    </button>
                )}
            </div>

            {/* Time + Label */}

            <div
                style={{
                    display: "flex",

                    alignItems: "center",

                    gap: "10px",

                    marginTop: "6px",

                    marginBottom: "20px",
                }}
            >
                <Coffee
                    size={20}
                    strokeWidth={1.5}
                    color="var(--text-secondary)"
                    style={{
                        opacity: 0.65,
                        flexShrink: 0,
                    }}
                />

                <div
                    style={{
                        fontSize: "1.8rem",

                        fontWeight: "220",

                        letterSpacing: "-0.05em",

                        lineHeight: 1,

                        whiteSpace: "nowrap",
                    }}
                >
                    {duration} min
                </div>

                <div
                    style={{
                        fontSize: "0.82rem",

                        fontWeight: "300",

                        color: "var(--text-secondary)",

                        opacity: 0.75,

                        overflow: "hidden",

                        textOverflow: "ellipsis",

                        whiteSpace: "nowrap",

                        flex: 1,
                    }}
                >
                    Break complete.
                </div>
            </div>

            <style>
                {`
        @keyframes slideIn {

            from {
                opacity: 0;
                transform: translateX(40px);
            }

            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideOut {

            from {
                opacity: 1;
                transform: translateX(0);
            }

            to {
                opacity: 0;
                transform: translateX(40px);
            }
        }
    `}
            </style>

        </div>
    );
}

export default BreakSlideout;