import { useState } from "react";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

function MiniCalendarModal({
    selectedDate,
    onSelectDate,
    onClose,
}) {
    const [currentDate, setCurrentDate] =
        useState(() => {
            if (
                !selectedDate ||
                selectedDate === "Choose a date"
            ) {
                return new Date();
            }

            const parsedDate =
                new Date(selectedDate);

            return Number.isNaN(
                parsedDate.getTime()
            )
                ? new Date()
                : parsedDate;
        });

    const currentMonth =
        currentDate.getMonth();

    const currentYear =
        currentDate.getFullYear();

    const monthName =
        currentDate.toLocaleString(
            "default",
            {
                month: "long",
            }
        );

    const firstDay =
        new Date(
            currentYear,
            currentMonth,
            1
        );

    const lastDay =
        new Date(
            currentYear,
            currentMonth + 1,
            0
        );

    const daysInMonth =
        lastDay.getDate();

    let startDay =
        firstDay.getDay();

    startDay =
        startDay === 0
            ? 6
            : startDay - 1;

    const days = [];

    for (
        let i = 0;
        i < startDay;
        i++
    ) {
        days.push(null);
    }

    for (
        let i = 1;
        i <= daysInMonth;
        i++
    ) {
        days.push(i);
    }

    const todayDate = new Date();

    todayDate.setHours(0, 0, 0, 0);

    const today = todayDate.toDateString();

    const selected =
        selectedDate
            ? new Date(
                selectedDate
            ).toDateString()
            : null;

    const handleDateSelect = (
        day
    ) => {
        const date =
            new Date(
                currentYear,
                currentMonth,
                day
            );

        onSelectDate(
            date.toISOString()
        );

        onClose();
    };

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,

                background: "rgba(0,0,0,0.8)",

                backdropFilter: "blur(20px)",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                zIndex: 5000,
            }}
        >
            <div
                onClick={(e) =>
                    e.stopPropagation()
                }
                style={{
                    width: "320px",

                    background:
                        "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",

                    border:
                        "1px solid rgba(255,255,255,0.10)",

                    borderRadius:
                        "28px",

                    backdropFilter:
                        "blur(30px)",

                    boxShadow:
                        "0 30px 80px rgba(0,0,0,0.45)",

                    padding: "24px",
                }}
            >
                {/* HEADER */}

                <div
                    style={{
                        display: "flex",

                        alignItems:
                            "center",

                        justifyContent:
                            "space-between",

                        marginBottom:
                            "24px",
                    }}
                >
                    <button
                        onClick={() =>
                            setCurrentDate(
                                new Date(
                                    currentYear,
                                    currentMonth -
                                    1,
                                    1
                                )
                            )
                        }
                        style={{
                            width: "32px",
                            height:
                                "32px",

                            borderRadius:
                                "999px",

                            border:
                                "1px solid rgba(255,255,255,0.08)",

                            background:
                                "rgba(255,255,255,0.04)",

                            color:
                                "var(--text-primary)",

                            display:
                                "flex",

                            alignItems:
                                "center",

                            justifyContent:
                                "center",

                            cursor:
                                "pointer",
                        }}
                    >
                        <ChevronLeft
                            size={16}
                        />
                    </button>

                    <div
                        style={{
                            fontSize:
                                "0.9rem",

                            fontWeight:
                                "300",
                        }}
                    >
                        {monthName}{" "}
                        {currentYear}
                    </div>

                    <button
                        onClick={() =>
                            setCurrentDate(
                                new Date(
                                    currentYear,
                                    currentMonth +
                                    1,
                                    1
                                )
                            )
                        }
                        style={{
                            width: "32px",
                            height:
                                "32px",

                            borderRadius:
                                "999px",

                            border:
                                "1px solid rgba(255,255,255,0.08)",

                            background:
                                "rgba(255,255,255,0.04)",

                            color:
                                "var(--text-primary)",

                            display:
                                "flex",

                            alignItems:
                                "center",

                            justifyContent:
                                "center",

                            cursor:
                                "pointer",
                        }}
                    >
                        <ChevronRight
                            size={16}
                        />
                    </button>
                </div>

                {/* DAYS */}

                <div
                    style={{
                        display: "grid",

                        gridTemplateColumns:
                            "repeat(7, 1fr)",

                        marginBottom:
                            "12px",

                        gap: "6px",
                    }}
                >
                    {[
                        "M",
                        "T",
                        "W",
                        "T",
                        "F",
                        "S",
                        "S",
                    ].map((day, index) => (
                        <div
                            key={`${day}-${index}`}
                            style={{
                                textAlign:
                                    "center",

                                fontSize:
                                    "0.72rem",

                                opacity:
                                    0.45,

                                fontWeight:
                                    "300",
                            }}
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* DATES */}

                <div
                    style={{
                        display: "grid",

                        gridTemplateColumns:
                            "repeat(7, 1fr)",

                        gap: "3.5px",
                    }}
                >
                    {days.map(
                        (
                            day,
                            index
                        ) => {
                            if (
                                !day
                            ) {
                                return (
                                    <div
                                        key={
                                            index
                                        }
                                    />
                                );
                            }

                            const date =
                                new Date(
                                    currentYear,
                                    currentMonth,
                                    day
                                );

                            const isToday =
                                date.toDateString() ===
                                today;

                            const isSelected =
                                date.toDateString() ===
                                selected;

                            const isPast =
                                date < todayDate;

                            return (
                                <button
                                    key={
                                        day
                                    }
                                    onClick={() => {
                                        if (isPast) return;

                                        handleDateSelect(day);
                                    }}
                                    style={{
                                        width:
                                            "36px",

                                        height:
                                            "36px",

                                        margin:
                                            "0 auto",

                                        borderRadius:
                                            "999px",

                                        border:
                                            isSelected
                                                ? "1px solid rgba(255,255,255,0.18)"
                                                : "1px solid transparent",

                                        background:
                                            isSelected
                                                ? "rgba(255,255,255,0.12)"
                                                : "transparent",

                                        color: isPast
                                            ? "rgba(255,255,255,0.18)"
                                            : isToday
                                                ? "#ff6b6b"
                                                : "var(--text-primary)",

                                        fontSize:
                                            "0.8rem",

                                        fontWeight:
                                            "300",

                                        cursor:
                                            isPast
                                                ? "default"
                                                : "pointer",

                                        opacity:
                                            isPast
                                                ? 0.4
                                                : 1,

                                        transition:
                                            "all 0.2s ease",
                                    }}
                                    onMouseEnter={(
                                        e
                                    ) => {
                                        if (
                                            !isSelected &&
                                            !isPast
                                        ) {
                                            e.currentTarget.style.background =
                                                "rgba(255,255,255,0.05)";
                                        }
                                    }}
                                    onMouseLeave={(
                                        e
                                    ) => {
                                        if (
                                            !isSelected &&
                                            !isPast
                                        ) {
                                            e.currentTarget.style.background =
                                                "transparent";
                                        }
                                    }}
                                >
                                    {day}
                                </button>
                            );
                        }
                    )}
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                        marginTop: "24px",
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            padding: "11px 18px",

                            borderRadius: "999px",

                            background:
                                "rgba(255,77,77,0.12)",

                            border:
                                "1px solid rgba(255,77,77,0.25)",

                            color: "var(--danger)",

                            fontSize: "0.8rem",

                            fontWeight: "300",

                            cursor: "pointer",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,77,77,0.20)";

                            e.currentTarget.style.transform =
                                "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,77,77,0.12)";

                            e.currentTarget.style.transform =
                                "translateY(0)";
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MiniCalendarModal;